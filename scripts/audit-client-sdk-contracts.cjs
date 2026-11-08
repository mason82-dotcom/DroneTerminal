#!/usr/bin/env node
'use strict';
// Static, offline OpenAPI / TypeScript-SDK contract verification.
// Does not execute generated API methods, create sockets, or alter source files.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const supportedMethods = new Set(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']);
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const requireFile = file => {
  const stat = fs.lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('Not a regular source file: ' + file);
  return fs.readFileSync(file);
};
const camelcasify = val => val.toLowerCase().replace(/[^a-z0-9]/g, '_')
  .split('_').filter(Boolean)
  .map((word, i) => i === 0 ? word : word[0].toUpperCase() + word.slice(1)).join('');
const sdkPath = path => path.replace(/\{([^}]+)\}/g, (_, name) => '{' + camelcasify(name) + '}');
const keyOf = entry => entry.method + ' ' + entry.path;

function parseOpenApi(text) {
  const lines = text.split(/\r?\n/);
  const infoStart = lines.findIndex(x => x === 'info:');
  if (infoStart < 0) throw new Error('OpenAPI info section missing');
  const topAfterInfo = lines.findIndex((x, i) => i > infoStart && /^[a-z][a-z0-9_-]*:\s*$/.test(x));
  const info = lines.slice(infoStart + 1, topAfterInfo < 0 ? lines.length : topAfterInfo);
  const versionLine = info.find(line => /^  version:\s*/.test(line));
  if (!versionLine) throw new Error('OpenAPI info.version missing');
  const version = versionLine.replace(/^  version:\s*/, '').trim().replace(/^['"]|['"]$/g, '');

  let paths = false;
  let url = null;
  let operation = null;
  let section = null;
  const operations = [];
  for (const line of lines) {
    if (line === 'paths:') { paths = true; continue; }
    if (!paths) continue;
    if (/^[a-zA-Z][^\n]*:\s*$/.test(line)) break;
    const route = line.match(/^  (\/[^:\s]+):\s*$/);
    if (route) {
      url = route[1];
      operation = null;
      section = null;
      continue;
    }
    const verb = line.match(/^    (get|post|put|patch|delete|options|head):\s*$/);
    if (verb && url) {
      operation = { path: sdkPath(url), method: verb[1], form: false, excluded: false };
      operations.push(operation);
      section = null;
      continue;
    }
    if (!operation) continue;
    const outer = line.match(/^      ([a-zA-Z][a-zA-Z0-9_-]*):/);
    if (outer) section = outer[1];
    if (/^      x-no-sdk:\s*true(?:\s*#.*)?\s*$/.test(line)) operation.excluded = true;
    if (section === 'requestBody' && /^          multipart\/form-data:\s*$/.test(line)) operation.form = true;
  }
  if (operations.length === 0) throw new Error('No REST endpoints detected in OpenAPI spec');
  if (new Set(operations.map(keyOf)).size !== operations.length) throw new Error('Duplicated OpenAPI operation');
  return { version, operations };
}

function parseSdk(text) {
  const version = text.match(/\bAPI_VERSION:\s*'([^']+)'/)?.[1];
  if (!version) throw new Error('SDK API_VERSION missing');
  const expressions = [...text.matchAll(/\burl:\s*'([^']+)',\s*\r?\n\s*method:\s*'([^']+)',\s*\r?\n\s*isFormData:\s*(true|false)/g)];
  const operations = expressions.map(x => ({ path: x[1], method: x[2], form: x[3] === 'true' }));
  if (!operations.length) throw new Error('No generated REST SDK operations detected');
  if (operations.some(o => !supportedMethods.has(o.method))) throw new Error('Invalid SDK HTTP method');
  if (new Set(operations.map(keyOf)).size !== operations.length) throw new Error('Duplicate SDK endpoint');
  return { version, operations };
}

function compareRest(spec, sdk) {
  const expected = spec.operations.filter(o => !o.excluded);
  const wanted = new Map(expected.map(x => [keyOf(x), x]));
  const have = new Map(sdk.operations.map(x => [keyOf(x), x]));
  const missing = expected.filter(x => !have.has(keyOf(x))).map(keyOf);
  const extra = sdk.operations.filter(x => !wanted.has(keyOf(x))).map(keyOf);
  const formMismatches = expected.filter(x => have.has(keyOf(x)) && x.form !== have.get(keyOf(x)).form)
    .map(x => ({ operation: keyOf(x), expectedForm: x.form, actualForm: have.get(keyOf(x)).form }));
  return {
    apiVersionMatch: spec.version === sdk.version,
    apiVersion: spec.version,
    sdkApiVersion: sdk.version,
    documentedOperations: spec.operations.length,
    explicitlyExcluded: spec.operations.filter(x => x.excluded).length,
    expectedSdkOperations: expected.length,
    actualSdkOperations: sdk.operations.length,
    missing, extra, formMismatches,
    pass: spec.version === sdk.version && !missing.length && !extra.length && !formMismatches.length,
  };
}

function audit(workRoot) {
  const api = path.join(workRoot, 'services/api/upstream');
  const sdk = path.join(workRoot, 'vendor/openflighthub/api-client-sdk-typescript');
  const app = path.join(workRoot, 'apps/web-app');
  const sourceOpenApi = requireFile(path.join(api, 'openapi_spec.yaml'));
  const generatedRest = requireFile(path.join(sdk, 'src/generated/rest_api_structure.ts'));
  const result = {
    format: 'droneterminal-sdk-contract-v1',
    execution: 'static-offline-readonly',
    sourceOpenApiSha256: sha(sourceOpenApi),
    sourceSdkStructureSha256: sha(generatedRest),
    rest: compareRest(parseOpenApi(sourceOpenApi.toString('utf8')), parseSdk(generatedRest.toString('utf8'))),
    websocket: [],
  };

  for (const filename of ['client_to_server.ts', 'server_to_client.ts']) {
    const backend = requireFile(path.join(api, 'src/live-websocket/definitions', filename));
    const client = requireFile(path.join(sdk, 'src/generated/websocket-definitions', filename));
    result.websocket.push({
      file: filename,
      equal: backend.equals(client),
      backendSha256: sha(backend),
      sdkSha256: sha(client),
    });
  }
  const packageFile = JSON.parse(requireFile(path.join(sdk, 'package.json')).toString('utf8'));
  const sdkVersion = requireFile(path.join(sdk, 'dev/client_sdk.version')).toString('utf8').trim();
  const lock = JSON.parse(requireFile(path.join(app, 'package-lock.json')).toString('utf8'));
  const actual = lock.packages?.['node_modules/openflighthub-api-client-sdk']?.version;
  const requested = lock.packages?.['']?.dependencies?.['openflighthub-api-client-sdk'];
  result.dependency = {
    vendorVersion: packageFile.version,
    versionFile: sdkVersion,
    webAppLockVersion: actual ?? null,
    webAppDeclaredRange: requested ?? null,
    pass: packageFile.version === sdkVersion && sdkVersion === actual && requested === '^' + actual,
  };
  result.pass = result.rest.pass && result.websocket.every(x => x.equal) && result.dependency.pass;
  return result;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length > 2 || (args.length && (args.length !== 2 || args[0] !== '--report'))) {
    throw new Error('Usage: node scripts/audit-client-sdk-contracts.cjs [--report new-report.json]');
  }
  const result = audit(root);
  for (const [key, value] of Object.entries(result.rest)) {
    if (key === 'pass' || key.endsWith('Operations') || key === 'explicitlyExcluded') {
      console.log('REST ' + key + ': ' + JSON.stringify(value));
    }
  }
  for (const item of result.websocket) console.log('WS ' + item.file + ': ' + (item.equal ? 'MATCH' : 'DRIFT'));
  console.log('DEPENDENCY web-app SDK lock: ' + (result.dependency.pass ? 'MATCH' : 'DRIFT'));
  console.log('SDK CONTRACT: ' + (result.pass ? 'PASS' : 'FAIL'));
  if (args.length) {
    const dest = path.resolve(args[1]);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
    console.log('Report: ' + dest);
  }
  if (!result.pass) process.exitCode = 1;
}

if (require.main === module) {
  try { main(); } catch (err) {
    console.error('SDK CONTRACT FAIL: ' + (err.stack || err));
    process.exitCode = 1;
  }
}
module.exports = { parseOpenApi, parseSdk, compareRest, audit, sdkPath };
