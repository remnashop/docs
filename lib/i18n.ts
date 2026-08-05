import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'ru'],
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

export const LOCALE_STORAGE_KEY = 'remnashop-docs.locale';

// With output: 'export' there is no middleware and no Accept-Language header, so the
// locale can only be picked in the browser. This runs synchronously in <head>, before the
// body paints, which keeps the wrong language from flashing. The path rebuilding mirrors
// localeSwitchPath above — an inline script cannot import it, so the two live side by side.
export function localeRedirectScript(): string {
  const languages = JSON.stringify(i18n.languages);
  const defaultLanguage = JSON.stringify(i18n.defaultLanguage);
  const key = JSON.stringify(LOCALE_STORAGE_KEY);

  return `(function(){try{
if(/bot|crawl|spider|slurp/i.test(navigator.userAgent))return;
var langs=${languages},def=${defaultLanguage},saved=null;
try{saved=localStorage.getItem(${key})}catch(e){}
var want=langs.indexOf(saved)>-1?saved:null;
if(!want){
var nav=navigator.languages||[navigator.language||''];
for(var i=0;i<nav.length&&!want;i++){
var base=String(nav[i]).toLowerCase().split('-')[0];
if(langs.indexOf(base)>-1)want=base}
want=want||def}
var segs=location.pathname.split('/').filter(Boolean);
var cur=langs.indexOf(segs[0])>-1?segs[0]:def;
if(cur===want)return;
if(langs.indexOf(segs[0])>-1)segs.shift();
if(want!==def)segs.unshift(want);
var path=segs.length?'/'+segs.join('/')+'/':'/';
location.replace(path+location.search+location.hash)}catch(e){}})()`;
}
