import Link from 'next/link';
import { getLanding, getDocsHref } from '@/lib/landing-content';
import { gitConfig, telegramUrl } from '@/lib/shared';
import { Particles } from '@/components/landing/particles';

export function Hero({ lang }: { lang: string }) {
  const { hero } = getLanding(lang);
  const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  // The wrapper spans the page and clips the particle layer itself rather than letting it spill
  // past the viewport: a layer wider than the page makes the document horizontally scrollable on
  // mobile Safari, which does not honour the root-level overflow clip.
  return (
    <div className="relative isolate w-full overflow-hidden">
      {/* Wider than the page so particles drift in from off-screen; masked top and bottom so
          they never read as drifting over the navbar or the next section. */}
      <div
        className="pointer-events-none absolute inset-x-[-50%] inset-y-0 -z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)',
        }}
      >
        <Particles />
      </div>
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">{hero.title}</h1>
        <p className="text-fd-muted-foreground max-w-2xl text-lg text-balance">{hero.subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={getDocsHref(lang)}
            className="bg-fd-primary text-fd-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          >
            {hero.primaryCta}
          </Link>
          <a
            href={repoUrl}
            className="border-fd-border bg-fd-card/80 hover:bg-fd-accent rounded-lg border px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors"
          >
            {hero.githubCta}
          </a>
          <a
            href={telegramUrl}
            className="border-fd-border bg-fd-card/80 hover:bg-fd-accent rounded-lg border px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors"
          >
            {hero.telegramCta}
          </a>
        </div>
      </section>
    </div>
  );
}
