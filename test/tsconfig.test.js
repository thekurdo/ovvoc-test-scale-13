const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) { try { fn(); passed++; } catch (e) { console.error(`FAIL: ${name} - ${e.message}`); failed++; } }
function assert(condition, msg) { if (!condition) throw new Error(msg || 'Assertion failed'); }

const tsconfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tsconfig.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

test('typescript is 4.9.x', () => assert(pkg.devDependencies.typescript.startsWith('4.9')));
test('strict mode', () => assert(tsconfig.compilerOptions.strict === true));
test('experimentalDecorators', () => assert(tsconfig.compilerOptions.experimentalDecorators === true));
test('importsNotUsedAsValues', () => assert(tsconfig.compilerOptions.importsNotUsedAsValues === 'remove'));
test('suppressImplicitAnyIndexErrors', () => assert(tsconfig.compilerOptions.suppressImplicitAnyIndexErrors === true));
test('15 source files', () => {
  const files = fs.readdirSync(path.join(__dirname, '..', 'src')).filter(f => f.endsWith('.ts'));
  assert(files.length === 15, `Expected 15, got ${files.length}`);
});
test('declaration enabled', () => assert(tsconfig.compilerOptions.declaration === true));
test('sourceMap enabled', () => assert(tsconfig.compilerOptions.sourceMap === true));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
