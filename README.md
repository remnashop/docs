# remnashop docs

Landing page and documentation for [Remnashop](https://github.com/snoups/remnashop), built with
[Fumadocs](https://fumadocs.dev).

Site: <https://remnashop.dev>

## Quick start

Fork the repository on GitHub, then:

```bash
git clone https://github.com/<your-user>/docs.git remnashop-docs
cd remnashop-docs
npm install
npm run dev
```

The dev server runs on <http://localhost:3000>. Edits to files under `content/docs` show up
without a restart.

To publish the site on your own domain, point `siteUrl`, `gitConfig` and `telegramUrl` in
`lib/shared.ts` at your project and put your domain in `public/CNAME`.

## Editing the documentation

Every page is an MDX file in `content/docs`, and its URL mirrors the path on disk:
`content/docs/getting-started/installation.mdx` becomes `/docs/getting-started/installation`.

To add a page, create the file with a `title` and `description` in the frontmatter:

```mdx
---
title: My page
description: What this page covers
---

The content goes here.
```

Then list its filename (without the extension) in the `pages` array of the `meta.json` next to
it — that array is what builds the sidebar. A page left out of `pages` is still reachable by URL,
but it never shows up in the navigation.

Adding a whole section means creating a directory with its own `meta.json` and naming that
directory in `content/docs/meta.json`.

## Translations

The English version of a page is the file without a suffix (`installation.mdx`), the Russian one
carries a locale suffix (`installation.ru.mdx`). Section order and titles come from `meta.json`
and `meta.ru.json`.

Interface translations (not content) live in `lib/translations.ts`.

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
