import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { getInstallHref, getLanding, type Landing } from '@/lib/landing-content';

type QuickStartContent = Landing['quickStart'];

function DocsLink({ lang, text }: { lang: string; text: string }) {
  return (
    <Link
      href={getInstallHref(lang)}
      className="border-fd-primary/35 bg-fd-primary/15 text-fd-primary hover:bg-fd-primary/20 inline-flex border h-10 items-center gap-1.5 rounded-full px-5 text-sm font-medium transition-colors"
    >
      {text}
      <ArrowRight className="size-4" />
    </Link>
  );
}

function Heading({ quickStart }: { quickStart: QuickStartContent }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{quickStart.title}</h2>
      <p className="text-fd-muted-foreground mt-3 text-[15px]">{quickStart.description}</p>
    </div>
  );
}

// Each step draws the line from its number down to the next one; the last one's fades out.
function Timeline({ lang, quickStart }: { lang: string; quickStart: QuickStartContent }) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-10">
      <Heading quickStart={quickStart} />
      <ol className="flex w-full flex-col gap-5">
        {quickStart.steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-4">
            {/* -bottom-5 bridges the list's gap-5 to the next number */}
            <span
              className={`absolute top-9 left-[17px] w-px ${
                index === quickStart.steps.length - 1
                  ? 'from-fd-primary/25 bottom-0 bg-linear-to-b to-transparent'
                  : 'bg-fd-primary/25 -bottom-5'
              }`}
            />
            <span className="glass-panel text-fd-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold backdrop-blur-[28px] backdrop-saturate-150">
              {index + 1}
            </span>
            <div className="glass-panel flex min-w-0 flex-1 flex-col gap-2 rounded-3xl p-4 backdrop-blur-[28px] backdrop-saturate-150">
              <h3 className="text-[15px] font-semibold tracking-tight">{step.title}</h3>
              {step.code ? <DynamicCodeBlock lang="bash" code={step.code} /> : null}
              {step.hint ? <p className="text-fd-muted-foreground text-sm">{step.hint}</p> : null}
            </div>
          </li>
        ))}
      </ol>
      <DocsLink lang={lang} text={quickStart.docsCta} />
    </div>
  );
}

export function QuickStart({ lang }: { lang: string }) {
  const { quickStart } = getLanding(lang);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-12 sm:pt-24 sm:pb-16">
      <Timeline lang={lang} quickStart={quickStart} />
    </section>
  );
}
