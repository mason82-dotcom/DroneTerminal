#!/usr/bin/env node
'use strict';
// CI LAB ONLY. This is deliberately not the original OpenFlightHub Express
// backend. It implements a tiny read-only compatible surface against real
// PostGIS, with synthetic users, without MQTT, DJI, MinIO or mail services.
const { createServer } = require('node:http');
const { randomBytes, createHash, timingSafeEqual } = require('node:crypto');
const { createRequire } = require('node:module');
const path = require('node:path');

if (process.env.DRONETERMINAL_LAB_ONLY !== '1') {
  throw new Error('Fail closed: DRONETERMINAL_LAB_ONLY=1 is mandatory');
}
for (const name of ['PGHOST', 'PGDATABASE', 'PGUSER', 'PGPASSWORD', 'DRONETERMINAL_LAB_LOGIN_PASSWORD']) {
  if (!process.env[name]) throw new Error('Missing lab-only environment value: ' + name);
}
if (process.env.PGUSER !== 'dt_lab_reader' || process.env.PGHOST !== 'db') {
  throw new Error('Fail closed: only the internal read-only lab PostgreSQL role is permitted');
}

const fromApi = createRequire(path.resolve(__dirname, '../api/upstream/package.json'));
const pgp = fromApi('pg-promise');
const WebSocketServer = fromApi('ws').Server;

const db = pgp({})({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  max: 3,
  application_name: 'droneterminal-readonly-lab',
});

const SESSION_TTL_MS = 120000;
const sessions = new Map();
const wss = new WebSocketServer({
  noServer: true,
  maxPayload: 4096,
  clientTracking: true,
  perMessageDeflate: false,
});

function equalSecrets(a, b) {
  const hash = value => createHash('sha256').update(value).digest();
  return timingSafeEqual(hash(a), hash(b));
}
function respond(res, status, data, headers = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  });
  res.end(JSON.stringify(data));
}
function currentSession(req) {
  const cookie = req.headers.cookie || '';
  const parts = cookie.split(';').map(x => x.trim());
  const candidate = parts.find(x => x.startsWith('user-auth='))?.slice('user-auth='.length);
  if (!candidate || !/^[A-Za-z0-9_-]{43}$/.test(candidate)) return null;
  const entry = sessions.get(candidate);
  if (!entry) return null;
  if (entry.expires < Date.now()) {
    sessions.delete(candidate);
    return null;
  }
  return entry;
}
async function getUser(id) {
  return db.oneOrNone(
    'SELECT id, name, email, team_id, created_at, locale FROM public.users WHERE id = $1 AND state = 1',
    [id],
  );
}
async function readJson(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw new Error('JSON required');
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > 4096) throw new Error('JSON request body too large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
function eligibleWorkspace(userId, workspaceId) {
  return db.oneOrNone(
    'SELECT w.id FROM public.workspaces w JOIN public.workspace_permissions p ON p.workspace_id = w.id JOIN public.users u ON u.team_id = p.team_id WHERE w.id = $1 AND u.id = $2 AND u.state = 1',
    [workspaceId, userId],
  );
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', 'http://internal.invalid');
    const route = url.pathname;
    if (req.method === 'GET' && route === '/health') {
      const check = await db.one('SELECT 1::int AS ok');
      respond(res, check.ok === 1 ? 200 : 503, { status: check.ok === 1 ? 'ok' : 'unavailable', lab: true });
      return;
    }
    if (route === '/auth/login' && req.method === 'POST') {
      let payload;
      try { payload = await readJson(req); } catch {
        respond(res, 400, { error: 'invalid JSON request' });
        return;
      }
      if (typeof payload.username !== 'string' || typeof payload.password !== 'string' ||
          payload.username.length > 128 || payload.password.length > 128) {
        respond(res, 400, { error: 'invalid credentials' });
        return;
      }
      // Both factors are CI-generated/fictional. The real OpenFlightHub
      // password hashing, user onboarding and RBAC are NOT simulated here.
      const expected = process.env.DRONETERMINAL_LAB_LOGIN_PASSWORD;
      const user = payload.username === 'lab-pilot@example.invalid'
        ? await db.oneOrNone('SELECT id FROM public.users WHERE email = $1 AND state = 1', [payload.username])
        : null;
      if (!user || !equalSecrets(payload.password, expected)) {
        respond(res, 401, { error: 'unauthorized' });
        return;
      }
      const token = randomBytes(32).toString('base64url');
      sessions.set(token, { userId: user.id, expires: Date.now() + SESSION_TTL_MS });
      respond(res, 200, { id: user.id }, {
        'Set-Cookie': 'user-auth=' + token + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=120',
      });
      return;
    }
    const session = currentSession(req);
    if (route === '/auth/check' && req.method === 'GET') {
      if (!session) respond(res, 401, { error: 'unauthorized' });
      else respond(res, 200, { id: session.userId });
      return;
    }
    if (route === '/auth/logout' && req.method === 'POST') {
      if (session) {
        for (const [token, value] of sessions) {
          if (value === session) sessions.delete(token);
        }
      }
      respond(res, 200, { ok: true }, {
        'Set-Cookie': 'user-auth=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0',
      });
      return;
    }
    if (route === '/user/self' && req.method === 'GET') {
      if (!session) { respond(res, 401, { error: 'unauthorized' }); return; }
      const user = await getUser(session.userId);
      if (!user) { respond(res, 401, { error: 'unauthorized' }); return; }
      respond(res, 200, {
        id: user.id, name: user.name, email: user.email, team_id: user.team_id,
        created_at: user.created_at.toISOString(), locale: user.locale, registration_incomplete: false,
      });
      return;
    }
    if (route === '/workspace/my-workspaces' && req.method === 'GET') {
      if (!session) { respond(res, 401, { error: 'unauthorized' }); return; }
      const user = await getUser(session.userId);
      if (!user) { respond(res, 401, { error: 'unauthorized' }); return; }
      const rows = await db.manyOrNone(
        'SELECT w.id, w.name, w.longitude, w.latitude, w.owner_team_id FROM public.workspaces w JOIN public.workspace_permissions p ON p.workspace_id = w.id WHERE p.team_id = $1 ORDER BY w.id',
        [user.team_id],
      );
      respond(res, 200, rows);
      return;
    }
    // No POST /workspace, no DJI routes and no writable endpoints.
    respond(res, 404, { error: 'not found in read-only lab' });
  } catch (err) {
    console.error('LAB API ERROR: ', err?.code || err?.name || 'unknown');
    respond(res, 500, { error: 'internal lab error' });
  }
});

server.on('upgrade', async (req, socket, head) => {
  const session = currentSession(req);
  const pathName = (req.url || '').split('?')[0];
  if (pathName !== '/live' || !session || (req.headers.origin &&
      !['http://api:6001', 'http://localhost:6001'].includes(req.headers.origin))) {
    socket.end('HTTP/1.1 401 Unauthorized\r\nConnection: close\r\nContent-Length: 0\r\n\r\n');
    return;
  }
  const user = await getUser(session.userId).catch(() => null);
  if (!user) {
    socket.end('HTTP/1.1 401 Unauthorized\r\nConnection: close\r\nContent-Length: 0\r\n\r\n');
    return;
  }
  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit('connection', ws, user);
  });
});

wss.on('connection', (ws, user) => {
  ws.on('message', async raw => {
    try {
      const data = JSON.parse(raw.toString('utf8'));
      if (data?.type !== 'subscribe' ||
          data?.data?.event !== 'workspace_drones_position' ||
          !/^[0-9]{1,10}$/.test(data?.data?.filter || '') ||
          !Number.isSafeInteger(data?.messageId)) {
        ws.send(JSON.stringify({ type: 'answer', messageId: data?.messageId ?? 0,
          data: { success: false, result: 'unsupported subscription in read-only lab' } }));
        return;
      }
      const allowed = await eligibleWorkspace(user.id, Number(data.data.filter));
      ws.send(JSON.stringify({ type: 'answer', messageId: data.messageId,
        data: { success: Boolean(allowed), result: allowed ? null : 'forbidden' } }));
    } catch {
      ws.close(1003, 'invalid message');
    }
  });
});

// 0.0.0.0 is reachable only inside the Docker Compose internal network;
// the Compose file publishes NO ports, so no host can contact this lab API.
server.listen(6001, '0.0.0.0', () => {
  console.log('Read-only lab API online on internal port 6001');
});
