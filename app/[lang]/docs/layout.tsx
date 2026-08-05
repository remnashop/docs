import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';
import { SocialLinks } from '@/components/social-links';

export default async function Layout({ params, children }: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;

  return (
    <DocsLayout
      tree={source.getPageTree(lang)}
      sidebar={{ footer: <SocialLinks /> }}
      {...docsOptions(lang)}
    >
      {children}
    </DocsLayout>
  );
}
