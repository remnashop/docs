import Link from 'next/link';
import { getLanding, getDocsHref } from '@/lib/landing-content';
import { gitConfig, telegramUrl } from '@/lib/shared';

export function Hero({ lang }: { lang: string }) {
  const { hero } = getLanding(lang);
  const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
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
          className="border-fd-border hover:bg-fd-accent rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
        >
          {hero.githubCta}
        </a>
        <a
          href={telegramUrl}
          className="border-fd-border hover:bg-fd-accent rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
        >
          {hero.telegramCta}
        </a>
      </div>
    </section>
  );
}
