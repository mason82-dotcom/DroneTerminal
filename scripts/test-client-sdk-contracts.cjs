'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { parseOpenApi, parseSdk, compareRest, sdkPath } = require('./audit-client-sdk-contracts.cjs');

const spec = [
  'openapi: 3.0.3',
  'info:',
  '  title: Test API',
  '  version: 0.22.0',
  'paths:',
  '  /auth/login:',
  '    post:',
  '      requestBody:',
  '        content:',
  '          application/json:',
  '            schema:',
  '              type: object',
  '  /file/{file_id}/upload:',
  '    post:',
  '      requestBody:',
  '        content:',
  '          multipart/form-data:',
  '            schema:',
  '              type: object',
  '  /hidden:',
  '    get:',
  '      x-no-sdk: true',
  '  /health:',
  '    get:',
  '      responses:',
  '        "200":',
  '          description: okay',
  'components:',
  '  schemas: {}',
].join('\n');

const sdk = [
  "API_VERSION: '0.22.0'",
  "url: '/auth/login',",
  "  method: 'post',",
  '  isFormData: false,',
  "url: '/file/{fileId}/upload',",
  "  method: 'post',",
  '  isFormData: true,',
  "url: '/health',",
  "  method: 'get',",
  '  isFormData: false,',
].join('\n');

test('checks 3 generated REST methods and one explicitly excluded endpoint', () => {
  const a = parseOpenApi(spec);
  const b = parseSdk(sdk);
  const result = compareRest(a, b);
  assert.equal(a.operations.length, 4);
  assert.equal(result.explicitlyExcluded, 1);
  assert.equal(result.expectedSdkOperations, 3);
  assert.equal(result.actualSdkOperations, 3);
  assert.equal(result.pass, true);
});
test('detects omitted SDK endpoints', () => {
  const b = parseSdk(sdk.replace(/url: '\/health',[\s\S]*?isFormData: false,/g, ''));
  const result = compareRest(parseOpenApi(spec), b);
  assert.equal(result.pass, false);
  assert.deepEqual(result.missing, ['get /health']);
});
test('detects unexpected SDK endpoint', () => {
  const extra = sdk + "\nurl: '/intruder',\nmethod: 'delete',\nisFormData: false,\n";
  const r = compareRest(parseOpenApi(spec), parseSdk(extra));
  assert.equal(r.pass, false);
  assert.deepEqual(r.extra, ['delete /intruder']);
});
test('detects FormData mismatch', () => {
  const mismatch = sdk.replace("isFormData: true,", "isFormData: false,");
  const r = compareRest(parseOpenApi(spec), parseSdk(mismatch));
  assert.equal(r.pass, false);
  assert.deepEqual(r.formMismatches.map(x => x.operation), ['post /file/{fileId}/upload']);
});
test('detects differing API versions', () => {
  const wrong = sdk.replace('0.22.0', '0.21.0');
  assert.equal(compareRest(parseOpenApi(spec), parseSdk(wrong)).apiVersionMatch, false);
});
test('rejects duplicate generated endpoint operations', () => {
  const dupe = sdk + "\nurl: '/health',\nmethod: 'get',\nisFormData: false,\n";
  assert.throws(() => parseSdk(dupe), /Duplicate SDK endpoint/);
});
test('normalizes underscore and hyphen path parameter names', () => {
  assert.equal(sdkPath('/data/{file_id}/{team-name}'), '/data/{fileId}/{teamName}');
});
