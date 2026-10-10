import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { NavbarStuck } from '@/components/landing/navbar-stuck';
import { ShaderBackground } from '@/components/shader-background';

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  return (
    <HomeLayout {...baseOptions(lang)}>
      <ShaderBackground lang={lang} />
      <NavbarStuck />
      {children}
    </HomeLayout>
  );
}
