import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createHash } from 'node:crypto'
import { resolveDroneTerminalEndpoints, postDroneTerminalMultipart } from '../../apps/web-app/src/api/transport-compat.ts'
import { makeWorkspaceFileUpload } from '../../apps/web-app/src/api/workspace-upload.ts'

function location(protocol, hostname, host) {
  return { protocol, hostname, host }
}

test('Localhost uses the actual API listener for REST and WS (not legacy :9001)', () => {
  assert.deepEqual(resolveDroneTerminalEndpoints(location('http:', 'localhost', 'localhost:5173')), {
    restApiBaseUrl: 'http://localhost:6001',
    liveWebsocketBaseUrl: 'ws://localhost:6001/live',
  })
  assert.deepEqual(resolveDroneTerminalEndpoints(location('http:', '127.0.0.1', '127.0.0.1:5173')), {
    restApiBaseUrl: 'http://127.0.0.1:6001',
    liveWebsocketBaseUrl: 'ws://127.0.0.1:6001/live',
  })
})

test('Production paths stay on same origin and choose wss for TLS', () => {
  assert.deepEqual(resolveDroneTerminalEndpoints(location('https:', 'ground.example', 'ground.example')), {
    restApiBaseUrl: 'https://ground.example/api',
    liveWebsocketBaseUrl: 'wss://ground.example/api/live',
  })
  assert.deepEqual(resolveDroneTerminalEndpoints(location('http:', 'ground.example', 'ground.example:8080')), {
    restApiBaseUrl: 'http://ground.example:8080/api',
    liveWebsocketBaseUrl: 'ws://ground.example:8080/api/live',
  })
})

test('Multipart requires a relative, non-traversing endpoint path', async () => {
  for (const bad of ['https://evil.test/upload', '//evil.test/upload', '/../upload', '/x/../upload', '/x//upload', '/x?u=1', 'upload']) {
    await assert.rejects(
      postDroneTerminalMultipart('http://127.0.0.1:6001', bad, { safe: 'value' }),
      /safe relative API path/,
      bad,
    )
  }
})

test('Browser request carries credential mode but never a manual Content-Type or Cookie header', async () => {
  let captured = null
  const fetchImpl = async (input, init) => {
    captured = { input, init }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const reply = await postDroneTerminalMultipart(
    'http://127.0.0.1:6001',
    '/file/upload',
    { name: 'test', array: ['first', 'second'] },
    { fetchImpl },
  )
  assert.deepEqual(reply, { ok: true })
  assert.equal(captured.input, 'http://127.0.0.1:6001/file/upload')
  assert.equal(captured.init.credentials, 'include')
  assert.equal(captured.init.headers.Accept, 'application/json')
  assert.equal('Content-Type' in captured.init.headers, false)
  assert.equal('Cookie' in captured.init.headers, false)
  assert.equal(captured.init.body instanceof FormData, true)
  assert.deepEqual(captured.init.body.getAll('array'), ['first', 'second'])
})

test('Isolated loopback HTTP + multipart + genuine WS Upgrade smoke', async (t) => {
  const inbound = []
  const sockets = new Set()
  const server = createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/auth/check') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ session: 'synthetic' }))
      return
    }
    if (req.method === 'POST' && req.url === '/file/upload') {
      const parts = []
      req.on('data', chunk => parts.push(chunk))
      req.on('end', () => {
        inbound.push({ headers: req.headers, body: Buffer.concat(parts).toString('latin1') })
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ upload: 'synthetic', stored: false }))
      })
      return
    }
    res.writeHead(404)
    res.end()
  })
  server.on('connection', socket => {
    sockets.add(socket)
    socket.on('close', () => sockets.delete(socket))
  })
  server.on('upgrade', (req, socket) => {
    if (req.url !== '/live' || req.headers.upgrade?.toLowerCase() !== 'websocket') {
      socket.destroy()
      return
    }
    const key = req.headers['sec-websocket-key']
    if (typeof key !== 'string') {
      socket.destroy()
      return
    }
    const accept = createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')
    socket.write(
      'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      'Sec-WebSocket-Accept: ' + accept + '\r\n\r\n',
    )
    socket.once('data', () => {
      if (!socket.destroyed) socket.end(Buffer.from([0x88, 0x00]))
    })
  })
  t.after(() => {
    for (const socket of sockets) socket.destroy()
    server.close()
  })
  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })
  const port = server.address().port
  const base = 'http://127.0.0.1:' + port

  const rest = await fetch(base + '/auth/check')
  assert.equal(rest.status, 200)
  assert.deepEqual(await rest.json(), { session: 'synthetic' })

  const response = await postDroneTerminalMultipart(base, '/file/upload', {
    title: 'Synthetic terrain file',
    file: new Blob(['fixture-only'], { type: 'text/plain' }),
  })
  assert.deepEqual(response, { upload: 'synthetic', stored: false })
  assert.equal(inbound.length, 1)
  assert.match(inbound[0].headers['content-type'], /^multipart\/form-data;\s*boundary=/)
  assert.match(inbound[0].body, /name="title"/)
  assert.match(inbound[0].body, /name="file"/)
  assert.match(inbound[0].body, /fixture-only/)
  assert.equal(inbound[0].headers.cookie, undefined)

  // Actual network WebSocket handshake, but the backend is an isolated fixture.
  const ws = new WebSocket('ws://127.0.0.1:' + port + '/live')
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', reject, { once: true })
  })
  assert.equal(ws.readyState, WebSocket.OPEN)
  ws.close()
  await new Promise(resolve => ws.addEventListener('close', resolve, { once: true }))
})

test('HTTP errors reject without exposing response payload or cookies', async () => {
  const fetchImpl = async () => new Response('sensitive-body', { status: 415 })
  await assert.rejects(
    postDroneTerminalMultipart('http://127.0.0.1:6001', '/upload', { field: 'x' }, { fetchImpl }),
    /^Error: Multipart request failed: HTTP 415$/,
  )
})

test('Workspace upload routes exactly to generated multipart endpoint and keeps the file', async () => {
  let observed
  const fetchImpl = async (endpoint, options) => {
    observed = { endpoint, options }
    return new Response(JSON.stringify({ id: 11, file: 'fixture' }), { status: 200 })
  }
  const upload = makeWorkspaceFileUpload('http://127.0.0.1:6001', { fetchImpl })
  const fixture = new File(['read-only fixture'], 'test.txt', { type: 'text/plain' })
  const result = await upload({ params: { workspaceId: 11 }, data: { file: fixture, filename: 'test.txt' } })
  assert.deepEqual(result, { id: 11, file: 'fixture' })
  assert.equal(observed.endpoint, 'http://127.0.0.1:6001/workspace/11/file')
  assert.equal(observed.options.body.get('filename'), 'test.txt')
  assert.equal(observed.options.body.get('file').name, 'test.txt')
  assert.equal(observed.options.headers['Content-Type'], undefined)
  assert.equal(observed.options.credentials, 'include')
  await assert.rejects(upload({ params: { workspaceId: -1 }, data: { file: fixture, filename: 'x' } }), /positive safe integer/)
  await assert.rejects(upload({ params: { workspaceId: 11 }, data: { file: 'not a file', filename: 'x' } }), /requires a file/)
})
