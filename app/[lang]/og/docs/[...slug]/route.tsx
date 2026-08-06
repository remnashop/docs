import { getPageImageUrl, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { OgCard, ogSize } from '@/lib/og-card';
import { siteUrl } from '@/lib/shared';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/[lang]/og/docs/[...slug]'>) {
  const { lang, slug } = await params;
  const page = source.getPage(slug.slice(0, -1), lang);
  if (!page) notFound();

  return new ImageResponse(
    <OgCard
      title={page.data.title}
      description={page.data.description}
      footer={new URL(siteUrl).host}
    />,
    ogSize,
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale as string,
    slug: getPageImageUrl(page).segments,
  }));
}
