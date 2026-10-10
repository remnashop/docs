import { loader, type LoaderPlugin } from 'fumadocs-core/source';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { i18n } from './i18n';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons';

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    // navTitle: a shorter label for the sidebar, where a long title would wrap or crowd its
    // row; the page itself keeps the full title.
    schema: pageSchema.extend({ navTitle: pageSchema.shape.title.optional() }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

const navTitlePlugin: LoaderPlugin = {
  transformPageTree: {
    file(node, filePath) {
      const file = filePath ? this.storage.read(filePath) : undefined;
      if (file?.format === 'page' && 'navTitle' in file.data && typeof file.data.navTitle === 'string') {
        node.name = file.data.navTitle;
      }
      return node;
    },
  },
};

export const source = loader({
  baseUrl: docsRoute,
  i18n,
  source: docs.toFumadocsSource(),
  // `icon:` in a page's frontmatter names a lucide icon, the dashboard sidebar's set.
  plugins: [lucideIconsPlugin(), navTitlePlugin],
});

// Keep the default locale out of generated URLs, matching hideLocale: 'default-locale'.
function localePrefix(locale: string | undefined) {
  return locale && locale !== i18n.defaultLanguage ? locale : undefined;
}

export function getPageImageUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url:
      '/' +
      [localePrefix(page.locale), ...docsImageRoute.split('/'), ...segments]
        .filter(Boolean)
        .join('/'),
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url:
      '/' +
      [localePrefix(page.locale), ...docsContentRoute.split('/'), ...segments]
        .filter(Boolean)
        .join('/'),
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
