#!/usr/bin/env node
'use strict';
// Read-only, dependency-free SDK/API wire-contract audit.
// The original upstream sources are inspected, never loaded or modified.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const apiRoot = path.join(root, 'services/api/upstream');
const sdkRoot = path.join(root, 'vendor/openflighthub/api-client-sdk-typescript');
const webRoot = path.join(root, 'apps/web-app');
const SUPPORTED_METHODS = 'get|post|put|patch|delete|options|head|trace';
const KEY_PATTERN = new RegExp('^    (' + SUPPORTED_METHODS + '):\\s*(?:#.*)?$');

function file(relative) {
  const absolute = path.resolve(root, relative);
  if (absolute === root || !absolute.startsWith(root + path.sep)) {
    throw new Error('Outside repository: ' + relative);
  }
  const info = fs.lstatSync(absolute);
  if (!info.isFile() || info.isSymbolicLink()) throw new Error('Not a plain file: ' + relative);
  return fs.readFileSync(absolute);
}
function hash(data) { return crypto.createHash('sha256').update(data).digest('hex'); }
function key(x) { return x.method + ' ' + x.path; }
function camel(name) {
  const parts = name.toLowerCase().replace(/[^a-z0-9]/g, '_').split('_').filter(Boolean);
  if (!parts.length) throw new Error('Unsupported OpenAPI parameter: ' + name);
  return parts.map((part, i) => i ? part[0].toUpperCase() + part.slice(1) : part).join('');
}
function sdkPath(pathname) {
  return pathname.replace(/\{([^}]+)\}/g, (_all, param) => '{' + camel(param) + '}');
}

// A constrained parser for this repository's established OpenAPI YAML layout.
// If formatting or structure changes, fail closed rather than silently
// undercounting endpoints. x-no-sdk is a method-level OpenAPI extension.
function parseOpenApi(content) {
  const header = content.split(/^paths:\s*$/m)[0];
  const version = (header.match(/^  version:\s*['"]?([^'"\s#]+)/m) || [])[1];
  if (!version) throw new Error('Missing info.version in OpenAPI header');
  const lines = content.split(/\r?\n/);
  let inPaths = false, route = null, current = null, currentSection = null;
  const operations = [];
  for (const line of lines) {
    if (line === 'paths:') { inPaths = true; continue; }
    if (!inPaths) continue;
    if (/^[a-zA-Z_][\w-]*:\s*(?:#.*)?$/.test(line)) break;
    const pathMatch = line.match(/^  (\/[^ ]+):\s*(?:#.*)?$/);
    if (pathMatch) {
      route = pathMatch[1];
      current = null;
      currentSection = null;
      continue;
    }
    const methodMatch = line.match(KEY_PATTERN);
    if (methodMatch && route) {
      current = { path: sdkPath(route), method: methodMatch[1], excluded: false, multipart: false };
      operations.push(current);
      currentSection = null;
      continue;
    }
    if (!current) continue;
    const sectionMatch = line.match(/^      ([a-zA-Z][\w-]*):/);
    if (sectionMatch) currentSection = sectionMatch[1];
    if (/^      x-no-sdk:\s*true\s*(?:#.*)?$/.test(line)) current.excluded = true;
    if (currentSection === 'requestBody' && /^          multipart\/form-data:\s*(?:#.*)?$/.test(line)) {
      current.multipart = true;
    }
  }
  if (operations.length < 50) throw new Error('OpenAPI parse unexpectedly found only ' + operations.length + ' operations');
  const keys = new Set(operations.map(key));
  if (keys.size !== operations.length) throw new Error('Duplicate OpenAPI operation');
  return { version, operations };
}
function parseSdkRest(content) {
  const version = (content.match(/\bAPI_VERSION:\s*'([^']+)'/) || [])[1];
  if (!version) throw new Error('SDK API_VERSION not found');
  const operations = [];
  const expr = /\burl:\s*'([^']+)',\s*\r?\n\s*method:\s*'([^']+)',\s*\r?\n\s*isFormData:\s*(true|false)/g;
  for (const m of content.matchAll(expr)) {
    operations.push({ path: m[1], method: m[2], multipart: m[3] === 'true' });
  }
  if (operations.length < 50) throw new Error('SDK parse unexpectedly found only ' + operations.length + ' operations');
  if (new Set(operations.map(key)).size !== operations.length) throw new Error('Duplicate SDK operation');
  return { version, operations };
}
function compareRest(api, sdk) {
  const errors = [];
  const expected = new Map(api.operations.filter(x => !x.excluded).map(x => [key(x), x]));
  const actual = new Map(sdk.operations.map(x => [key(x), x]));
  for (const [k, value] of expected) {
    const other = actual.get(k);
    if (!other) errors.push('Missing SDK operation: ' + k);
    else if (value.multipart !== other.multipart) errors.push('Request encoding mismatch: ' + k);
  }
  for (const k of actual.keys()) if (!expected.has(k)) errors.push('Unexpected SDK operation: ' + k);
  if (api.version !== sdk.version) errors.push('OpenAPI version mismatch: ' + api.version + ' vs ' + sdk.version);
  return { errors, expected: expected.size, actual: actual.size, excluded: api.operations.length - expected.size };
}
function audit() {
  const failures = [];
  const warnings = [];
  const openApiData = file('services/api/upstream/openapi_spec.yaml');
  const restData = file('vendor/openflighthub/api-client-sdk-typescript/src/generated/rest_api_structure.ts');
  const api = parseOpenApi(openApiData.toString('utf8'));
  const sdk = parseSdkRest(restData.toString('utf8'));
  const rest = compareRest(api, sdk);
  failures.push(...rest.errors);

  const websocket = [];
  for (const name of ['client_to_server.ts', 'server_to_client.ts']) {
    const server = file('services/api/upstream/src/live-websocket/definitions/' + name);
    const client = file('vendor/openflighthub/api-client-sdk-typescript/src/generated/websocket-definitions/' + name);
    const same = server.equals(client);
    websocket.push({ name, same, serverSha256: hash(server), sdkSha256: hash(client) });
    if (!same) failures.push('WebSocket contract drift: ' + name);
  }

  const pkg = JSON.parse(file('vendor/openflighthub/api-client-sdk-typescript/package.json'));
  const generatedVersion = file('vendor/openflighthub/api-client-sdk-typescript/src/generated/client_sdk_version.ts').toString();
  const v = (generatedVersion.match(/CLIENT_SDK_VERSION\s*=\s*"([^"]+)"/) || [])[1];
  const canonical = file('vendor/openflighthub/api-client-sdk-typescript/dev/client_sdk.version').toString().trim();
  if (!v || pkg.version !== v || canonical !== v) {
    failures.push('SDK package, generated version and canonical version disagree');
  }
  const webPackage = JSON.parse(file('apps/web-app/package.json'));
  const webLock = JSON.parse(file('apps/web-app/package-lock.json'));
  const range = webPackage.dependencies['openflighthub-api-client-sdk'];
  const locked = webLock.packages?.['node_modules/openflighthub-api-client-sdk']?.version;
  if (range !== '^' + v || locked !== v) {
    failures.push('Web-App SDK dependency diverges from local SDK: ' + range + ' / ' + locked + ' / ' + v);
  }
  const webApi = file('apps/web-app/src/api/index.ts').toString();
  if (!webApi.includes("from 'openflighthub-api-client-sdk'")) {
    failures.push('Web-App SDK import no longer matches the audited SDK');
  }

  const serverApp = file('services/api/upstream/src/app.ts').toString();
  const liveRoute = file('services/api/upstream/src/routes/live.ts').toString();
  const sdkLive = file('vendor/openflighthub/api-client-sdk-typescript/src/live_websocket.ts').toString();
  const sdkRest = file('vendor/openflighthub/api-client-sdk-typescript/src/rest_api.ts').toString();
  if (!serverApp.includes("app.use('/live', liveRoute)") || !liveRoute.includes("router.ws('/',")) {
    failures.push('API WebSocket path /live has changed');
  }
  if (!sdkLive.includes("'/api/live'") || !sdkRest.includes("'/api'")) {
    failures.push('SDK deployment URL conventions have changed');
  }
  // Deliberately non-blocking: the upstream development default points to
  // websocket port 9001, while the included API launcher uses 6001.
  const launch = file('services/api/upstream/src/launch.ts').toString();
  if (sdkLive.includes('ws://localhost:9001/live') && launch.includes('const PORT = 6001')) {
    warnings.push('Local SDK WebSocket defaults to :9001/live, API launcher listens on :6001; no WS forwarding proven');
  }
  if (sdkRest.includes("'Content-Type': 'application/json'") && sdkRest.includes('isFormData ? config.data')) {
    warnings.push('Upstream REST transport sets JSON Content-Type for multipart FormData; runtime fix required');
  }

  return {
    schema: 'droneterminal-sdk-contract-audit-v1',
    status: failures.length ? 'FAIL' : 'PASS',
    apiVersion: api.version,
    sdkVersion: v || null,
    rest: { specOperations: api.operations.length, sdkOperations: rest.actual,
      expectedSdkOperations: rest.expected, explicitlyExcluded: rest.excluded,
      missingOrMismatched: rest.errors.length },
    websocket,
    provenance: { openApiSha256: hash(openApiData), sdkRoutesSha256: hash(restData) },
    failures,
    warnings,
  };
}
function main() {
  const args = process.argv.slice(2);
  let reportPath = null;
  if (args.length === 2 && args[0] === '--report') reportPath = path.resolve(args[1]);
  else if (args.length !== 0) throw new Error('Usage: node scripts/check-sdk-contracts.cjs [--report NEW_REPORT.json]');
  const result = audit();
  console.log('REST: ' + result.rest.expectedSdkOperations + '/' + result.rest.sdkOperations
    + ' operations, ' + result.rest.explicitlyExcluded + ' excluded by x-no-sdk');
  for (const ws of result.websocket) console.log('WS: ' + ws.name + ' ' + (ws.same ? 'MATCH' : 'DRIFT'));
  console.log('Versions: API ' + result.apiVersion + ', SDK ' + result.sdkVersion);
  for (const warn of result.warnings) console.warn('WARN: ' + warn);
  for (const fail of result.failures) console.error('FAIL: ' + fail);
  console.log('RESULT: ' + result.status);
  if (reportPath) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
  }
  if (result.failures.length) process.exitCode = 1;
}
if (require.main === module) {
  try { main(); } catch (e) { console.error('FAIL: ' + e.stack); process.exitCode = 1; }
}
module.exports = { parseOpenApi, parseSdkRest, compareRest, audit };
