import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, telegramUrl } from './shared';
import { TelegramIcon } from '@/components/icons/telegram';
import { GitHubLink } from '@/components/github-link';
import { withLocale } from './i18n';

export function baseOptions(lang: string): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 text-[15px] font-bold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="size-8 shrink-0" />
          {appName}
        </span>
      ),
      url: withLocale(lang, '/'),
      // Let the page gradient show through instead of painting a solid bar over it.
      transparentMode: 'always',
    },
    // GitHub is rendered as a custom item so the star count sits inside the same link.
    themeSwitch: { enabled: false },
    links: [
      {
        text: lang === 'ru' ? 'Документация' : 'Documentation',
        url: withLocale(lang, '/docs/overview/introduction'),
      },
      {
        text: lang === 'ru' ? 'Релизы' : 'Releases',
        url: withLocale(lang, '/docs/overview/whats-new'),
      },
      {
        type: 'custom',
        secondary: true,
        children: <GitHubLink />,
      },
      {
        type: 'icon',
        label: 'Telegram',
        icon: <TelegramIcon />,
        text: 'Telegram',
        url: telegramUrl,
        external: true,
      },
    ],
  };
}

// The docs sidebar lists every page itself, so the landing's links would only duplicate
// it as a vertical list. GitHub and Telegram move to the sidebar footer instead.
export function docsOptions(lang: string): BaseLayoutProps {
  const base = baseOptions(lang);
  return {
    ...base,
    nav: {
      ...base.nav,
      // The dashboard sidebar's brand block: the mark, the name and a tagline under it.
      title: (
        <span className="inline-flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="size-8 shrink-0" />
          <span className="flex flex-col">
            <span className="text-[15px] leading-[22px] font-bold tracking-tight">{appName}</span>
            <span className="text-fd-muted-foreground text-[11px] leading-4 font-medium">
              {lang === 'ru' ? 'Документация' : 'Documentation'}
            </span>
          </span>
        </span>
      ),
    },
    links: [],
  };
}
