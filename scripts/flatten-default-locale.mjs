// При output: 'export' middleware Next.js не выполняется, поэтому Fumadocs не может
// убрать префикс дефолтной локали на лету: ссылки ведут на /docs/..., а файлы лежат
// в out/ru/docs/... Этот скрипт поднимает содержимое дефолтной локали в корень out/.
import { cp, rm, access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const out = join(process.cwd(), 'out');
const defaultLocale = 'ru';
const localeDir = join(out, defaultLocale);

try {
  await access(localeDir);
} catch {
  console.error(`flatten-default-locale: каталог out/${defaultLocale} не найден, сборка неполная`);
  process.exit(1);
}

const moved = await readdir(localeDir);
await cp(localeDir, out, { recursive: true });
await rm(localeDir, { recursive: true, force: true });

console.log(
  `flatten-default-locale: out/${defaultLocale} поднят в корень (${moved.length} записей)`,
);
