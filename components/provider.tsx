'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { provider } from '@/lib/translations';
import { localeSwitchPath, LOCALE_STORAGE_KEY } from '@/lib/i18n';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

export function Provider({ lang, children }: { lang: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
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
  );
}
