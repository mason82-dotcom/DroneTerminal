#!/usr/bin/env node
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const path = require('node:path');

if (process.env.DRONETERMINAL_LAB_ONLY !== '1') throw new Error('Refusing to test outside private integration lab');
if (!process.env.DRONETERMINAL_LAB_LOGIN_PASSWORD) throw new Error('Missing isolated CI credential');
const fromApi = createRequire(path.resolve(__dirname, '../api/upstream/package.json'));
const { WebSocket } = fromApi('ws');
const pgp = fromApi('pg-promise');
const base = 'http://api:6001';

function connectWs(cookie) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://api:6001/live', { headers: { Cookie: cookie } });
    socket.once('open', () => resolve(socket));
    socket.once('error', reject);
  });
}
function ask(socket, id, event, filter) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('WS reply timeout')), 4500);
    const listener = raw => {
      try {
        const data = JSON.parse(raw.toString('utf8'));
        if (data.messageId !== id) return;
        clearTimeout(timeout);
        socket.off('message', listener);
        resolve(data);
      } catch (err) {
        clearTimeout(timeout);
        socket.off('message', listener);
        reject(err);
      }
    };
    socket.on('message', listener);
    socket.send(JSON.stringify({ type: 'subscribe', messageId: id, data: { event, filter } }));
  });
}

test('PostGIS lab API health is DB-backed and read-only', { timeout: 15000 }, async () => {
  const health = await fetch(base + '/health');
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: 'ok', lab: true });

  const db = pgp({})({
    host: 'db', user: 'dt_lab_reader', password: process.env.PGPASSWORD,
    database: 'droneterminal', port: 5432, max: 1,
  });
  try {
    const row = await db.one('SELECT count(*)::int AS n FROM public.users');
    assert.equal(row.n, 2);
    const scope = await db.one("SELECT current_setting('default_transaction_read_only') AS setting");
    assert.equal(scope.setting, 'on');
    await assert.rejects(
      db.none("UPDATE public.workspaces SET name = 'SHOULD NOT WRITE' WHERE id = 7401"),
      /read-only transaction|permission denied/i,
    );
    const unchanged = await db.one('SELECT name FROM public.workspaces WHERE id = $1', [7401]);
    assert.equal(unchanged.name, 'Visible Synthetic Workspace');
  } finally {
    pgp.end();
  }
});

test('Unauthorized REST and pre-upgrade WebSocket access are denied', { timeout: 15000 }, async () => {
  for (const route of ['/auth/check', '/user/self', '/workspace/my-workspaces']) {
    const r = await fetch(base + route);
    assert.equal(r.status, 401, route);
  }

  const failure = await new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://api:6001/live');
    let opened = false;
    socket.on('open', () => { opened = true; });
    socket.once('unexpected-response', (_request, res) => {
      res.resume();
      resolve({ status: res.statusCode, opened });
    });
    socket.once('error', error => {
      if (!opened && error.message.includes('401')) resolve({ status: 401, opened });
      else reject(error);
    });
    setTimeout(() => reject(new Error('Unauthorized WS handshake not rejected promptly')), 4500).unref();
  });
  assert.deepEqual(failure, { status: 401, opened: false });
});

test('Synthetic login, DB-backed workspace isolation and authorized WS subscription', { timeout: 22000 }, async () => {
  const incorrect = await fetch(base + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'lab-pilot@example.invalid', password: 'definitely-incorrect' }),
  });
  assert.equal(incorrect.status, 401);

  const login = await fetch(base + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'lab-pilot@example.invalid',
      password: process.env.DRONETERMINAL_LAB_LOGIN_PASSWORD,
    }),
  });
  assert.equal(login.status, 200);
  assert.deepEqual(await login.json(), { id: 7001 });
  const setCookie = login.headers.get('set-cookie');
  assert.match(setCookie, /^user-auth=[A-Za-z0-9_-]{43};/);
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Strict/);
  const cookie = setCookie.split(';')[0];
  const authenticatedGet = route => fetch(base + route, { headers: { Cookie: cookie } });

  const checked = await authenticatedGet('/auth/check');
  assert.equal(checked.status, 200);
  assert.deepEqual(await checked.json(), { id: 7001 });
  const selfResponse = await authenticatedGet('/user/self');
  assert.equal(selfResponse.status, 200);
  const self = await selfResponse.json();
  assert.equal(self.id, 7001);
  assert.equal(self.name, 'Synthetic Lab Pilot');
  assert.equal(self.team_id, 7301);
  assert.equal(self.registration_incomplete, false);

  const workplacesResponse = await authenticatedGet('/workspace/my-workspaces');
  assert.equal(workplacesResponse.status, 200);
  const workspaces = await workplacesResponse.json();
  assert.equal(workspaces.length, 1);
  assert.equal(workspaces[0].id, 7401);
  assert.equal(workspaces[0].owner_team_id, 7301);
  assert.equal(JSON.stringify(workspaces).includes('Hidden Synthetic Workspace'), false);

  const noWrites = await fetch(base + '/workspace', {
    method: 'POST',
    headers: { Cookie: cookie, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'SHOULD NOT INSERT' }),
  });
  assert.equal(noWrites.status, 404);

  const ws = await connectWs(cookie);
  try {
    const permitted = await ask(ws, 1, 'workspace_drones_position', '7401');
    assert.equal(permitted.type, 'answer');
    assert.equal(permitted.data.success, true);
    const forbidden = await ask(ws, 2, 'workspace_drones_position', '7402');
    assert.equal(forbidden.data.success, false);
    const command = await ask(ws, 3, 'flight_control', '7401');
    assert.equal(command.data.success, false);
  } finally {
    ws.close();
  }

  const logout = await fetch(base + '/auth/logout', { method: 'POST', headers: { Cookie: cookie } });
  assert.equal(logout.status, 200);
  const invalidSession = await authenticatedGet('/auth/check');
  assert.equal(invalidSession.status, 401);
});
