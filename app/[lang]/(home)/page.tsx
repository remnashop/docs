import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { QuickStart } from '@/components/landing/quick-start';
import { Screenshots } from '@/components/landing/screenshots';
import { Footer } from '@/components/landing/footer';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;

  return (
    <main className="flex flex-1 flex-col">
      <Hero lang={lang} />
      <Features lang={lang} />
      <QuickStart lang={lang} />
      <Screenshots lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
