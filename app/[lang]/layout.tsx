import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import { i18n } from '@/lib/i18n';
import { appName, siteUrl } from '@/lib/shared';
import type { Metadata } from 'next';
import '../global.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s — ${appName}`,
  },
  description: 'Telegram-бот для продажи VPN-подписок с интеграцией Remnawave',
};

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider lang={lang}>{children}</Provider>
      </body>
    </html>
  );
}
