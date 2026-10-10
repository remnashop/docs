import { getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { Footer } from 'fumadocs-ui/layouts/docs/page/slots/footer';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { withSectionHeadings } from '@/lib/section-toc';

// The same glass pill as the search beside them (the dashboard header's HeaderSearch).
const pageButton =
  'h-9 gap-2 rounded-full border border-fd-border bg-white/[0.05] px-3.5 text-[13px] font-normal text-fd-muted-foreground hover:bg-white/[0.08] hover:text-fd-foreground [&_svg]:size-4';

export default async function Page(props: PageProps<'/[lang]/docs/[[...slug]]'>) {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  // Depth 4 and below stays out of the table of contents: the install steps live inside tabs,
  // so listing them would repeat every step once per tab.
  // Titled cards (<Section>, <Accordions title>) are added in too, see lib/section-toc.ts.
  const toc = withSectionHeadings(await page.data.getText('raw'), page.data.toc).filter((item) => item.depth <= 3);

  return (
    <DocsPage toc={toc} full={page.data.full} breadcrumb={{ enabled: false }} footer={{ enabled: false }}>
      {/* The dashboard card's header (widgets/header/Header.tsx): the page title, then the
          search pill and the page actions. It stays put; the content scrolls below it. The
          actions don't grow, so justify-between keeps them right beside the title and starts
          them at the left edge when they wrap to a line of their own. */}
      <header className="docs-header flex flex-wrap items-center justify-between gap-3 py-3 md:gap-5 md:py-5">
        <h1 className="shrink-0 text-[21px] font-bold tracking-tight">{page.data.title}</h1>
        <div className="flex min-w-0 items-center gap-3.5">
          <FullSearchTrigger className="hidden h-9 w-56 min-w-28 shrink rounded-full border-fd-border bg-white/[0.05] px-3.5 ps-3.5 text-[13px] hover:bg-white/[0.08] md:inline-flex" />
          <div className="flex shrink-0 items-center gap-2">
            <MarkdownCopyButton markdownUrl={markdownUrl} className={pageButton} />
            <ViewOptionsPopover
              className={pageButton}
              markdownUrl={markdownUrl}
              githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.docsRepo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
            />
          </div>
        </div>
      </header>
      {/* The card's scrolling body, under the header like the dashboard's page area. The
          previous/next links are drawn here, inside it, rather than by DocsPage after it. */}
      <div className="docs-scroll flex flex-col gap-4">
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
        <Footer className="docs-pager mt-6" />
      </div>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/[lang]/docs/[[...slug]]'>,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const image = getPageImageUrl(page).url;

  // Both cards are set explicitly: the layout declares a twitter card for the landing, and
  // a partial override here would leave the page sharing the landing image.
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: image,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: image,
    },
  };
}
