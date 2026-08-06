import { ImageResponse } from 'next/og';
import { OgCard, ogSize } from '@/lib/og-card';
import { siteUrl } from '@/lib/shared';
import { getLanding } from '@/lib/landing-content';
import { i18n } from '@/lib/i18n';

export const revalidate = false;

// The landing had no share image of its own, so links to the root rendered without a card.
export async function GET(_req: Request, { params }: RouteContext<'/[lang]/og/image.png'>) {
  const { lang } = await params;
  const landing = getLanding(lang);

  return new ImageResponse(
    <OgCard title={landing.hero.title} footer={new URL(siteUrl).host} />,
    ogSize,
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
