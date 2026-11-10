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
import { icons as lucideIcons } from 'lucide-react';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { withSectionHeadings } from '@/lib/section-toc';

const pageButton =
  'h-9 gap-1.5 rounded-full border border-fd-border bg-white/[0.03] px-3.5 text-[13px] font-medium text-fd-foreground/90 hover:bg-white/[0.06] hover:text-fd-foreground [&_svg]:size-4';

export default async function Page(props: PageProps<'/[lang]/docs/[[...slug]]'>) {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const PageIcon = page.data.icon ? lucideIcons[page.data.icon as keyof typeof lucideIcons] : undefined;

  // Depth 4 and below stays out of the table of contents: the install steps live inside tabs,
  // so listing them would repeat every step once per tab.
  // Titled cards (<Section>, <Accordions title>) are added in too, see lib/section-toc.ts.
  const toc = withSectionHeadings(await page.data.getText('raw'), page.data.toc).filter((item) => item.depth <= 3);

  return (
    <DocsPage toc={toc} full={page.data.full} breadcrumb={{ enabled: false }} footer={{ enabled: false }}>
      {/* stays put while the body scrolls; below xl the actions wrap to a line of their own */}
      <header className="docs-header py-3 md:py-5">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5 xl:glass-panel xl:h-12 xl:flex-nowrap xl:rounded-full xl:p-1.5">
        <div className="flex shrink-0 items-center gap-2.5">
          {PageIcon ? (
            <span className="border-fd-border hidden size-9 shrink-0 items-center justify-center rounded-full border bg-white/[0.05] xl:flex">
              <PageIcon className="size-4" />
            </span>
          ) : null}
          <h1 className="shrink-0 text-[21px] font-bold tracking-tight xl:text-[17px] xl:font-semibold">{page.data.title}</h1>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <FullSearchTrigger className="hidden h-9 w-56 min-w-28 shrink gap-2.5 rounded-full border-fd-border bg-white/[0.03] px-3 ps-3 text-[13px] font-medium hover:bg-white/[0.06] hover:text-fd-foreground md:inline-flex" />
          <div className="flex shrink-0 items-center gap-2">
            <MarkdownCopyButton markdownUrl={markdownUrl} className={pageButton} />
            <ViewOptionsPopover
              className={pageButton}
              markdownUrl={markdownUrl}
              githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.docsRepo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
            />
          </div>
        </div>
        </div>
      </header>
      {/* the previous/next links are drawn inside the scrolling body, not by DocsPage after it */}
      <div className="docs-scroll flex flex-col gap-5">
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={getMDXComponents(
              {
                a: createRelativeLink(source, page),
              },
              lang,
            )}
          />
        </DocsBody>
        <Footer className="docs-pager" />
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
