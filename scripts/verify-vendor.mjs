#!/usr/bin/env node
// Check the curated MIT-licensed source snapshot without networking or installing dependencies.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'vendor', 'openflighthub');
const expected = new Map([
  ['api-client-sdk-typescript', 34],
  ['beast-decoder', 23],
  ['mode-s-adsb-parser', 27],
  ['phstl', 8],
  ['convert-dem-to-stl', 10],
]);
function countFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).reduce((total, ent) => {
    const full = join(dir, ent.name);
    if (ent.isSymbolicLink()) throw new Error('Unexpected symlink: ' + full);
    return total + (ent.isDirectory() ? countFiles(full) : statSync(full).isFile() ? 1 : 0);
  }, 0);
}
let ok = true, total = 0;
for (const [name, count] of expected) {
  const dir = join(root, name);
  const license = join(dir, 'LICENSE');
  const sourcePresent = existsSync(dir) && existsSync(license);
  const licenseText = sourcePresent ? readFileSync(license, 'utf8') : '';
  const files = sourcePresent ? countFiles(dir) : 0;
  const pass = sourcePresent && /MIT License|The MIT License/i.test(licenseText) && files === count;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}: ${files}/${count} files; MIT license ${licenseText ? 'present' : 'missing'}`);
  if (!pass) ok = false;
  total += files;
}
console.log(`Imported files: ${total}; expected: 102.`);
if (!ok || total !== 102) process.exitCode = 1;
