# remnashop docs

Landing page and documentation for [Remnashop](https://github.com/snoups/remnashop), built with
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

`npm run build` exports the static site into `out/` and then lifts the contents of `out/en` up to
the root. This is needed because Next.js middleware never runs with `output: 'export'`, so Fumadocs
cannot strip the default locale prefix at request time. The result:

| URL | Content |
| --- | --- |
| `/` | landing page, English |
| `/docs/...` | documentation, English |
| `/ru/` | landing page, Russian |
| `/ru/docs/...` | documentation, Russian |

## Content structure

Pages live in `content/docs`. The English version is the file without a suffix
(`installation.mdx`), the Russian one carries a locale suffix (`installation.ru.mdx`). Section
order and titles come from `meta.json` and `meta.ru.json`.

Interface translations (not content) live in `lib/translations.ts`.

## Landing page screenshots

The screenshot tiles are empty placeholders showing an icon. Swap them for real images in
`components/landing/screenshots.tsx` once the screenshots exist.

## Deployment

Pushing to `main` triggers the `deploy` workflow: it builds the site and publishes it to GitHub
Pages. The custom domain is pinned in `public/CNAME`.
