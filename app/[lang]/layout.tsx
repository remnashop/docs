import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import { i18n } from '@/lib/i18n';
import { appName, siteUrl } from '@/lib/shared';
import { getLanding } from '@/lib/landing-content';
import type { Metadata, Viewport } from 'next';
import '../global.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
});

// Tints the browser chrome in Safari and on mobile; matches the top of the page gradient.
export const viewport: Viewport = {
  themeColor: '#0b102a',
  colorScheme: 'dark',
};

// Description follows the landing subtitle, so the two never drift apart.
export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: appName,
      template: `%s — ${appName}`,
    },
    description: getLanding(lang).hero.subtitle,
    icons: { icon: '/logo.svg' },
  };
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`dark ${inter.className}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider lang={lang}>{children}</Provider>
      </body>
    </html>
  );
}
