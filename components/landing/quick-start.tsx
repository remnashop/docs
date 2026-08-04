import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { getLanding } from '@/lib/landing-content';

export function QuickStart({ lang }: { lang: string }) {
  const { quickStart } = getLanding(lang);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="mb-2 text-center text-2xl font-semibold">{quickStart.title}</h2>
      <p className="text-fd-muted-foreground mb-6 text-center text-sm">{quickStart.description}</p>
      <DynamicCodeBlock lang="bash" code={quickStart.code} />
    </section>
  );
}
