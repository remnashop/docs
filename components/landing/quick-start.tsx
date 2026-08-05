import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { getInstallHref, getLanding } from '@/lib/landing-content';

export function QuickStart({ lang }: { lang: string }) {
  const { quickStart } = getLanding(lang);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16">
      <h2 className="mb-2 text-center text-2xl font-semibold">{quickStart.title}</h2>
      <p className="text-fd-muted-foreground mb-8 text-center text-sm">{quickStart.description}</p>

      <ol className="space-y-6">
        {quickStart.steps.map((step, index) => (
          <li key={step.title}>
            <div className="flex items-center gap-4">
              <span className="border-fd-border bg-fd-primary/10 text-fd-primary flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                {index + 1}
              </span>
              <h3 className="text-sm font-medium">{step.title}</h3>
            </div>
            {/* 2.75rem = the badge plus the gap, so the body lines up with the title. */}
            <div className="mt-2 ml-11 space-y-2">
              {step.hint ? (
                <p className="text-fd-muted-foreground text-sm">{step.hint}</p>
              ) : null}
              {step.code ? <DynamicCodeBlock lang="bash" code={step.code} /> : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 text-center">
        <Link
          href={getInstallHref(lang)}
          className="text-fd-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        >
          {quickStart.docsCta}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
