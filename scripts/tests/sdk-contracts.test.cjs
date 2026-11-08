'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { parseOpenApi, parseSdkRest, compareRest, audit } = require('../check-sdk-contracts.cjs');
function fixtures() {
  const spec = ['openapi: 3.0.3', 'info:', '  version: 0.22.0', 'paths:'];
  const sdk = ["API_VERSION: '0.22.0',"];
  for (let i = 0; i < 52; i++) {
    const route = i === 0 ? '/upload/{file_id}' : '/example/' + i;
    const endpoint = i === 0 ? '/upload/{fileId}' : route;
    const method = i % 2 ? 'get' : 'post';
    spec.push('  ' + route + ':', '    ' + method + ':');
    if (i === 1) spec.push('      x-no-sdk: true');
    if (i === 0) {
      spec.push('      requestBody:', '        content:', '          multipart/form-data:', '            schema:', '              type: object');
    }
    if (i !== 1) sdk.push("url: '" + endpoint + "',", "method: '" + method + "',",
                          'isFormData: ' + (i === 0 ? 'true' : 'false') + ',');
  }
  return { spec: spec.join('\n'), sdk: sdk.join('\n') };
}
test('REST parser honors method-level x-no-sdk, path parameter naming and multipart', () => {
  const { spec, sdk } = fixtures();
  const a = parseOpenApi(spec), b = parseSdkRest(sdk);
  const result = compareRest(a, b);
  assert.equal(result.expected, 51);
  assert.equal(result.actual, 51);
  assert.equal(result.excluded, 1);
  assert.deepEqual(result.errors, []);
});
test('REST contract audit rejects missing, extra and wrong request encodings', () => {
  const { spec, sdk } = fixtures();
  const a = parseOpenApi(spec), b = parseSdkRest(sdk);
  assert.ok(compareRest(a, { ...b, operations: b.operations.slice(1) }).errors
    .some(x => x.includes('Missing SDK operation')));
  assert.ok(compareRest(a, { ...b, operations: b.operations.concat(
    { path: '/not-in-openapi', method: 'get', multipart: false }) }).errors
    .some(x => x.includes('Unexpected SDK operation')));
  assert.ok(compareRest(a, { ...b, operations: b.operations.map(
    x => x.path === '/upload/{fileId}' ? { ...x, multipart: false } : x) }).errors
    .some(x => x.includes('Request encoding mismatch')));
});
test('REST contract audit rejects a changed API version', () => {
  const { spec, sdk } = fixtures();
  const a = parseOpenApi(spec), b = parseSdkRest(sdk);
  assert.ok(compareRest(a, { ...b, version: '0.23.0' }).errors.some(x => x.includes('version mismatch')));
});
test('Real imported API, SDK and WebSocket definitions are internally consistent', () => {
  const result = audit();
  assert.deepEqual(result.failures, []);
  assert.equal(result.rest.expectedSdkOperations, 94);
  assert.equal(result.rest.sdkOperations, 94);
  assert.equal(result.rest.explicitlyExcluded, 12);
  assert.ok(result.websocket.every(x => x.same));
});

test('REST SDK parser rejects duplicate method/path declarations', () => {
  const { sdk } = fixtures();
  const repeated = sdk + "\nurl: '/example/2',\nmethod: 'post',\nisFormData: false,\n";
  assert.throws(() => parseSdkRest(repeated), /Duplicate SDK operation/);
});
test('OpenAPI parser rejects duplicate method/path declarations', () => {
  const { spec } = fixtures();
  const repeated = spec + "\n  /example/3:\n    get:\n";
  assert.throws(() => parseOpenApi(repeated), /Duplicate OpenAPI operation/);
});
test('REST contract parser fails closed on unexpectedly short or empty SDK output', () => {
  assert.throws(() => parseSdkRest("API_VERSION: '0.22.0'\n"), /unexpectedly found only 0 operations/);
});
