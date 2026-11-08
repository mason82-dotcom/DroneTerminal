#!/usr/bin/env node
'use strict';

// Compatibility audit only. The upstream generator is called from a throwaway
// working directory and never gets paths to live files as output destinations.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const generator = path.join(root, 'tools/openflighthub/definition-generator');
const api = path.join(root, 'services/api/upstream');
const database = path.join(root, 'services/database/upstream');
const files = [
  'api/ApiTypes.ts',
  'api/ApiSchemas.ts',
  'db/DBTypes.ts',
  'db/DBHelpers.ts',
];
const args = process.argv.slice(2);
let reportFile = null;
let failOnDrift = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--report' && i + 1 < args.length) {
    reportFile = path.resolve(args[++i]);
  } else if (args[i] === '--fail-on-drift') {
    failOnDrift = true;
  } else {
    throw new Error('Usage: node scripts/check-generated-contracts.cjs [--report OUTPUT.json] [--fail-on-drift]');
  }
}

function assertPlainFile(file) {
  const info = fs.lstatSync(file);
  if (!info.isFile() || info.isSymbolicLink()) {
    throw new Error('Source must be a regular file: ' + file);
  }
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function blockNetworkDuringGeneration() {
  const http = require('node:http');
  const https = require('node:https');
  const net = require('node:net');
  const dns = require('node:dns');
  const forbidden = () => { throw new Error('Network access forbidden by offline contract audit'); };
  http.request = forbidden;
  http.get = forbidden;
  https.request = forbidden;
  https.get = forbidden;
  net.connect = forbidden;
  net.createConnection = forbidden;
  net.Socket.prototype.connect = forbidden;
  dns.lookup = forbidden;
  globalThis.fetch = async () => { throw new Error('Network fetch forbidden by offline contract audit'); };
}

async function main() {
  const spec = path.join(api, 'openapi_spec.yaml');
  const schema = path.join(database, 'schema.dbml');
  for (const file of [spec, schema]) assertPlainFile(file);
  if (!fs.existsSync(path.join(generator, 'node_modules/ts-node/register/transpile-only.js'))) {
    throw new Error('Install locked generator dependencies first: npm ci --ignore-scripts');
  }
  const specText = fs.readFileSync(spec, 'utf8');
  if (/^\s*\$ref\s*:\s*['"]?(?:https?:|file:|\/\/)/mi.test(specText)) {
    throw new Error('External OpenAPI refs are disallowed by the offline audit');
  }

  const staging = fs.mkdtempSync(path.join(os.tmpdir(), 'dt-contract-audit-'));
  const savedCwd = process.cwd();
  try {
    const workingDir = path.join(staging, 'definition-generator');
    const stagingApi = path.join(staging, 'api');
    const stagingDb = path.join(staging, 'database');
    fs.mkdirSync(workingDir, { recursive: true });
    fs.mkdirSync(stagingDb, { recursive: true });
    fs.mkdirSync(path.join(stagingApi, 'src/generated-definitions'), { recursive: true });
    fs.copyFileSync(spec, path.join(stagingApi, 'openapi_spec.yaml'));
    fs.copyFileSync(schema, path.join(stagingDb, 'schema.dbml'));

    blockNetworkDuringGeneration();
    process.env.TS_NODE_PROJECT = path.join(generator, 'tsconfig.json');
    require(path.join(generator, 'node_modules/ts-node/register/transpile-only'));
    const makeDb = require(path.join(generator, 'src/database/index.ts')).generateDatabaseTypesAndSchemas;
    const makeApi = require(path.join(generator, 'src/api/index.ts')).generateApiTypesAndSchemas;

    process.chdir(workingDir);
    await makeDb();
    await makeApi();
    process.chdir(savedCwd);

    const items = [];
    for (const name of files) {
      const generated = path.join(stagingApi, 'src/generated-definitions', name);
      const existing = path.join(api, 'src/generated-definitions', name);
      assertPlainFile(generated);
      assertPlainFile(existing);
      const generatedData = fs.readFileSync(generated);
      const existingData = fs.readFileSync(existing);
      const match = generatedData.equals(existingData);
      const row = {
        file: name,
        status: match ? 'MATCH' : 'DRIFT',
        generatedSha256: sha256(generatedData),
        existingSha256: sha256(existingData),
        generatedBytes: generatedData.length,
        existingBytes: existingData.length,
      };
      items.push(row);
      console.log(row.status + ' ' + name + ' generated=' + row.generatedSha256.substring(0, 12) +
                  ' existing=' + row.existingSha256.substring(0, 12));
    }
    const report = {
      schema: 'droneterminal-contract-audit-v1',
      execution: 'ephemeral-offline',
      modifiedSource: false,
      sourceOpenApiSha256: sha256(fs.readFileSync(spec)),
      sourceDbmlSha256: sha256(fs.readFileSync(schema)),
      matchCount: items.filter(x => x.status === 'MATCH').length,
      driftCount: items.filter(x => x.status === 'DRIFT').length,
      files: items,
    };
    if (reportFile) {
      fs.mkdirSync(path.dirname(reportFile), { recursive: true });
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
      console.log('Report: ' + reportFile);
    }
    console.log('AUDIT: ' + report.matchCount + '/4 equal; ' + report.driftCount + ' drift(s)');
    if (failOnDrift && report.driftCount > 0) process.exitCode = 2;
  } finally {
    process.chdir(savedCwd);
    fs.rmSync(staging, { recursive: true, force: true });
  }
}

main().catch(err => {
  console.error('FAIL: offline contract audit: ' + (err && err.stack ? err.stack : String(err)));
  process.exitCode = 1;
});
