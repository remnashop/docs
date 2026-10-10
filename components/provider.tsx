'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/base';
import { FrameworkProvider, type Framework } from 'fumadocs-core/framework';
import { provider } from '@/lib/translations';
import { i18n, localeSwitchPath, LOCALE_STORAGE_KEY } from '@/lib/i18n';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { type ReactNode } from 'react';

// The default locale is prerendered under /en/... and only lifted to the root after the
// build (scripts/flatten-default-locale.mjs), so on the server Next reports /en/docs/x
// while the page tree and the browser have /docs/x. Fumadocs matches the sidebar's active
// item and the previous/next links against this path; left as is, it broke hydration.
const defaultPrefix = `/${i18n.defaultLanguage}`;

function useDocsPathname() {
  const pathname = usePathname();
  if (pathname === defaultPrefix) return '/';
  return pathname.startsWith(`${defaultPrefix}/`) ? pathname.slice(defaultPrefix.length) : pathname;
}

export function Provider({ lang, children }: { lang: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <FrameworkProvider
      usePathname={useDocsPathname}
      useParams={useParams}
      useRouter={useRouter}
      Link={Link as Framework['Link']}
      Image={Image as Framework['Image']}
    >
      <RootProvider
        i18n={{
          ...provider(lang),
          onLocaleChange: (target) => {
            // Remembering the choice switches the head script off: a reader who picked a
            // language keeps it even when the browser asks for the other one.
            try {
              localStorage.setItem(LOCALE_STORAGE_KEY, target);
            } catch {
              // private mode: the choice simply is not remembered
            }

            router.push(localeSwitchPath(pathname, target));
          },
        }}
        search={{ SearchDialog }}
        theme={{ enabled: false }}
      >
        {children}
      </RootProvider>
    </FrameworkProvider>
  );
}
