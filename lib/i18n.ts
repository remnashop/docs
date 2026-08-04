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

// The language switcher in fumadocs-ui always writes the locale as the first path
// segment, which would send the default locale to /ru/... — a path that does not exist
// because the build lifts it to the root. This rebuilds the target path instead.
export function localeSwitchPath(pathname: string, target: string) {
  const languages: readonly string[] = i18n.languages;
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && languages.includes(segments[0])) segments.shift();
  if (target !== i18n.defaultLanguage) segments.unshift(target);

  const path = segments.join('/');
  return path ? `/${path}/` : '/';
}
