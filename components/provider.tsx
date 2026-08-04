'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { provider } from '@/lib/translations';
import { type ReactNode } from 'react';

export function Provider({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <RootProvider i18n={provider(lang)} search={{ SearchDialog }}>
      {children}
    </RootProvider>
  );
}
