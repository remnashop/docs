import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import { i18n, localeRedirectScript, withLocale } from '@/lib/i18n';
import { appName, siteUrl } from '@/lib/shared';
import { getLanding } from '@/lib/landing-content';
import type { Metadata, Viewport } from 'next';
import '../global.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
});

// Tints the browser chrome in Safari and on mobile; matches the page canvas.
export const viewport: Viewport = {
  themeColor: '#111111',
  colorScheme: 'dark',
};

// Description follows the landing subtitle, so the two never drift apart.
export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const { subtitle } = getLanding(lang).hero;
  // Docs pages override the image with their own; this is what the landing shares.
  const image = withLocale(lang, '/og/image.png');

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: appName,
      template: `%s — ${appName}`,
    },
    description: subtitle,
    icons: { icon: '/logo.svg' },
    openGraph: {
      type: 'website',
      siteName: appName,
      title: appName,
      description: subtitle,
      url: withLocale(lang, '/'),
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: appName,
      description: subtitle,
      images: [image],
    },
  };
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`dark ${inter.className}`} suppressHydrationWarning>
      <head>
        {/* Must stay synchronous and first: it redirects before the body paints. */}
        <script dangerouslySetInnerHTML={{ __html: localeRedirectScript() }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <Provider lang={lang}>{children}</Provider>
      </body>
    </html>
  );
}
