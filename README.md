# remnashop docs

Landing page and documentation for [remnashop](https://github.com/snoups/remnashop), built with
[Fumadocs](https://fumadocs.dev).

Site: <https://remnashop.dev>

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npx serve out
```

`npm run build` exports the static site into `out/` and then lifts the contents of `out/ru` up to
the root. This is needed because Next.js middleware never runs with `output: 'export'`, so Fumadocs
cannot strip the default locale prefix at request time. The result:

| URL | Content |
| --- | --- |
| `/` | landing page, Russian |
| `/docs/...` | documentation, Russian |
| `/en/` | landing page, English |
| `/en/docs/...` | documentation, English |

## Content structure

Pages live in `content/docs`. The Russian version is the file without a suffix (`docker.mdx`), the
English one carries a locale suffix (`docker.en.mdx`). Section order and titles come from
`meta.json` and `meta.en.json`.

Interface translations (not content) live in `lib/translations.ts`.

## Landing page screenshots

`public/screenshots` holds four placeholders, `1.png` through `4.png`. Replace them with real bot
screenshots — no code changes required.

## Deployment

Pushing to `main` triggers the `deploy` workflow: it builds the site and publishes it to GitHub
Pages. The custom domain is pinned in `public/CNAME`.
