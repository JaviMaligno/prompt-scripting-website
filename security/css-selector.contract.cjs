require('./deny-io.cjs');
const assert = require('node:assert/strict');
const path = require('node:path');
const { createRequire } = require('node:module');
const root = path.resolve(__dirname, '..');
const local = createRequire(path.join(root, 'package.json'));
const typography = createRequire(local.resolve('@tailwindcss/typography/package.json'));
const tailwind = createRequire(local.resolve('tailwindcss/package.json'));
async function main() {
  process.chdir(root);
  assert.equal(typography('postcss-selector-parser/package.json').version, '6.1.5');
  const config = local('tailwindcss/loadConfig')(path.join(root, 'tailwind.config.ts'));
  config.content = [{ raw: '<article class="prose prose-lg prose-a:text-red-500 group-hover:opacity-75 peer-checked:block [&>span]:font-bold [&:nth-child(2)]:text-blue-500 md:p-4"><span>offline fixture</span></article>', extension: 'html' }];
  const postcss = local('postcss');
  const output = await postcss([local('tailwindcss')(config), local('autoprefixer')]).process('@tailwind base;\n@tailwind components;\n@tailwind utilities;\n', { from: undefined });
  for (const fragment of ['.prose', 'prose-a', 'group-hover', 'peer-checked', 'nth-child(2)', 'font-weight: 700', 'min-width: 768px']) assert.ok(output.css.includes(fragment), fragment);
  const nested = await postcss([tailwind('postcss-nested')]).process('.probe-card,.probe-alt { & > .item:hover { color:red; margin:1px; } @media(min-width:1px) { &:focus { color:blue } } }', { from: undefined });
  assert.equal(nested.css, '.probe-card > .item:hover, .probe-alt > .item:hover { color:red; margin:1px; } @media(min-width:1px) { .probe-card:focus, .probe-alt:focus { color:blue } }');
  const parser = typography('postcss-selector-parser');
  const ast = parser().astSync('.first.second');
  const visits = [];
  ast.walkClasses(node => {
    visits.push(node.value);
    if (node.value === 'first') node.parent.insertBefore(node, parser.className({ value: 'inserted' }));
  });
  assert.deepEqual(visits, ['first', 'second'], 'Retained major6 iteration semantics');
  assert.deepEqual(globalThis.__offlineDependencyAttempts, { network: 0, processes: 0, envReads: 0 });
  console.log('PASS: actual Typography/Tailwind variants, nesting, iteration consumer');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
