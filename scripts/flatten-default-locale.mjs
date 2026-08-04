// With output: 'export' Next.js middleware never runs, so Fumadocs cannot strip the
// default locale prefix at request time: links point at /docs/... while the files are
// emitted to out/ru/docs/... This script lifts the default locale up to the out/ root.
import { cp, rm, access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const out = join(process.cwd(), 'out');
const defaultLocale = 'ru';
const localeDir = join(out, defaultLocale);

try {
  await access(localeDir);
} catch {
  console.error(`flatten-default-locale: out/${defaultLocale} is missing, the build is incomplete`);
  process.exit(1);
}

const moved = await readdir(localeDir);
await cp(localeDir, out, { recursive: true });
await rm(localeDir, { recursive: true, force: true });

console.log(`flatten-default-locale: moved out/${defaultLocale} to the root (${moved.length} entries)`);
