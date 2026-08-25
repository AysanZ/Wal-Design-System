#!/usr/bin/env node
/**
 * Environment check that runs before `storybook` and `build`.
 *
 * The v2 refactor DELETED files as well as adding them. Unpacking the new tree
 * over an old checkout leaves those files behind, and the failure they cause is
 * miserable to diagnose: a leftover v3 `postcss.config.js` makes Vite serve
 * `iframe.html` as a 500, so Storybook's sidebar loads fine and the canvas
 * spins forever with nothing useful in the browser console.
 *
 * This turns that silent 500 into a readable error.
 *
 *   node scripts/doctor.mjs        report
 *   node scripts/doctor.mjs --fix  delete the leftovers
 */
import { existsSync, rmSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const fix = process.argv.includes('--fix');
const problems = [];

// ── files this refactor removed ────────────────────────────────────────────
const REMOVED = [
  ['postcss.config.js', 'Tailwind v4 runs through @tailwindcss/vite, not PostCSS. Vite auto-discovers this file and the whole CSS pipeline throws.'],
  ['tailwind.config.js', 'Tokens live in src/styles/*.css now. A stale config silently overrides them.'],
  ['.eslintrc.js', 'Replaced by the flat config in eslint.config.js.'],
  ['src/App.tsx', 'This is a library, not an app.'],
  ['src/main.tsx', 'This is a library, not an app.'],
  ['index.html', 'This is a library, not an app.'],
  ['src/setupTests.ts', 'Replaced by src/test/setup.ts.'],
  ['src/components/icon/utils', 'Replaced by src/icons/.'],
  ['src/components/icon/types', 'Moved to src/icons/names/.'],
  ['public/fonts/english', 'Roboto was replaced by Inter.'],
  ['public/fonts/farsi', 'YekanBakh was replaced by Vazirmatn (YekanBakh is commercially licensed).'],
  ['Dockerfile', 'The Storybook deploy image is gone; publish the package instead.'],
];

for (const [path, why] of REMOVED) {
  if (!existsSync(path)) continue;
  if (fix) {
    rmSync(path, { recursive: true, force: true });
    console.log(`  removed  ${path}`);
  } else {
    problems.push(`Leftover from the old structure: ${path}\n    ${why}`);
  }
}

// ── node version ───────────────────────────────────────────────────────────
const major = Number(process.versions.node.split('.')[0]);
if (major < 20) {
  problems.push(
    `Node ${process.versions.node} is too old. Tailwind v4 and Vite 6 need Node 20+.`,
  );
}

// ── mismatched storybook copies ────────────────────────────────────────────
function versionsOf(pkg) {
  const found = new Set();
  const walk = (dir, depth) => {
    if (depth > 4 || !existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const child = join(dir, entry.name);
      if (entry.name === pkg.split('/').pop() && child.includes(pkg.split('/')[0])) {
        const manifest = join(child, 'package.json');
        if (existsSync(manifest)) {
          found.add(JSON.parse(readFileSync(manifest, 'utf8')).version);
        }
      }
      if (entry.name === 'node_modules' || entry.name.startsWith('@') || depth < 2) {
        walk(child, depth + 1);
      }
    }
  };
  walk('node_modules', 0);
  return [...found];
}

if (existsSync('node_modules')) {
  const shims = versionsOf('@storybook/react-dom-shim');
  if (shims.length > 1) {
    problems.push(
      `Two copies of @storybook/react-dom-shim are installed (${shims.join(', ')}).\n` +
        `    Storybook mounts stories through this module; two copies means the canvas\n` +
        `    never reports as rendered and hangs on the loading spinner.\n` +
        `    Fix: rm -rf node_modules package-lock.json && npm install`,
    );
  }
  if (existsSync('node_modules/tailwindcss/package.json')) {
    const tw = JSON.parse(
      readFileSync('node_modules/tailwindcss/package.json', 'utf8'),
    ).version;
    if (!tw.startsWith('4')) {
      problems.push(`tailwindcss ${tw} is installed but this project needs v4.`);
    }
  }
}

// ── stale vite dep cache ───────────────────────────────────────────────────
if (existsSync('node_modules/.cache/storybook')) {
  if (fix) {
    rmSync('node_modules/.cache/storybook', { recursive: true, force: true });
    console.log('  removed  node_modules/.cache/storybook');
  } else {
    console.log(
      'note: node_modules/.cache/storybook exists. If Storybook behaves oddly\n' +
        '      after a dependency change, delete it.',
    );
  }
}

if (problems.length) {
  console.error('\n✖ Environment problems found:\n');
  problems.forEach((p, i) => console.error(`  ${i + 1}. ${p}\n`));
  console.error('  Run `npm run doctor:fix` to delete the leftover files.\n');
  process.exit(1);
}

console.log('✓ environment looks good');
