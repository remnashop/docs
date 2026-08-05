'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { provider } from '@/lib/translations';
import { localeSwitchPath } from '@/lib/i18n';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

export function Provider({ lang, children }: { lang: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <RootProvider
      i18n={{
        ...provider(lang),
        onLocaleChange: (target) => router.push(localeSwitchPath(pathname, target)),
      }}
      search={{ SearchDialog }}
      theme={{ enabled: false }}
    >
      {children}
    </RootProvider>
  );
}
