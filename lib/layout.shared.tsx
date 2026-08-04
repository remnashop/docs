import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig, telegramUrl } from './shared';
import { withLocale } from './i18n';

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
