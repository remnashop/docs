import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';
import { SocialLinks } from '@/components/social-links';
import { ShaderBackground } from '@/components/shader-background';

export default async function Layout({ params, children }: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;

  return (
    <>
      <ShaderBackground lang={lang} />
      <DocsLayout
        tree={source.getPageTree(lang)}
        sidebar={{ footer: <SocialLinks /> }}
        {...docsOptions(lang)}
      >
        {children}
      </DocsLayout>
    </>
  );
}
