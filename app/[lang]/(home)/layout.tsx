import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { NavbarStuck } from '@/components/landing/navbar-stuck';

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  return (
    <HomeLayout {...baseOptions(lang)}>
      <NavbarStuck />
      {children}
    </HomeLayout>
  );
}
