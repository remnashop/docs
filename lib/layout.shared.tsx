import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig, telegramUrl } from './shared';
import { i18n } from './i18n';

export function withLocale(lang: string, path: string) {
  return lang === i18n.defaultLanguage ? path : `/${lang}${path}`;
}

export function baseOptions(lang: string): BaseLayoutProps {
  return {
    nav: {
      title: appName,
      url: withLocale(lang, '/'),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: lang === 'ru' ? 'Документация' : 'Documentation',
        url: withLocale(lang, '/docs'),
      },
      {
        text: 'Telegram',
        url: telegramUrl,
        external: true,
      },
    ],
  };
}
