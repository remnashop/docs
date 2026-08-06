import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName, siteUrl } from '@/lib/shared';
import { getLanding } from '@/lib/landing-content';
import { i18n } from '@/lib/i18n';

export const revalidate = false;

// The landing had no share image of its own, so links to the root rendered without a card.
// Same generator as the docs pages use, so both look like one site in a chat preview.
// The hero headline stands in for the subtitle: the template does not shrink its text, and
// the longer russian subtitle overflowed into the footer.
export async function GET(_req: Request, { params }: RouteContext<'/[lang]/og/image.png'>) {
  const { lang } = await params;
  const landing = getLanding(lang);

  return new ImageResponse(
    <DefaultImage title={appName} description={landing.hero.title} site={new URL(siteUrl).host} />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
