import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'ru',
  languages: ['ru', 'en'],
  hideLocale: 'default-locale',
  parser: 'dot',
});

/** The default locale is served without a prefix, every other locale keeps one. */
export function withLocale(lang: string, path: string) {
  return lang === i18n.defaultLanguage ? path : `/${lang}${path}`;
}
