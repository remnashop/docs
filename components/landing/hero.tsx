import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getLanding, getDocsHref } from '@/lib/landing-content';
import { gitConfig, telegramUrl } from '@/lib/shared';
import { GitHubIcon } from '@/components/icons/github';
import { TelegramIcon } from '@/components/icons/telegram';
import { DashboardPreview } from '@/components/landing/dashboard-preview';

// The dashboard's Button (shared/ui/Button.tsx) a size up for the hero: solid for the main
// action, outline for the rest. active:scale is its bounceTap (1 + 0.05 * BOUNCE_STRENGTH).
const button =
  'inline-flex h-10 items-center gap-1.5 rounded-full border px-5 text-sm transition-[color,background-color,scale] active:scale-[1.015]';
const solidButton = `${button} border-transparent bg-fd-primary font-semibold text-fd-primary-foreground hover:bg-[#67e8f9]`;
const outlineButton = `${button} border-fd-border font-medium text-fd-foreground/80 hover:bg-white/5`;

export function Hero({ lang }: { lang: string }) {
  const { hero } = getLanding(lang);
  const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-16 sm:pt-24">
      <span className="border-fd-border text-fd-muted-foreground inline-flex items-center gap-2 rounded-full border bg-white/[0.05] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase backdrop-blur-xl">
        <span className="bg-fd-primary size-1.5 rounded-full shadow-[0_0_8px_var(--color-fd-primary)]" />
        {hero.note}
      </span>
      <h1 className="mt-6 max-w-3xl text-center text-4xl font-bold tracking-tight text-balance sm:text-6xl">
        {hero.title}
      </h1>
      <p className="text-fd-muted-foreground mt-5 max-w-4xl text-center text-lg text-balance">
        {/* One sentence per line from sm up; a phone wraps it as plain text. */}
        {hero.subtitle.split(/(?<=\.) /).map((sentence) => (
          <span key={sentence} className="sm:block">
            {sentence}{' '}
          </span>
        ))}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={getDocsHref(lang)}
          className={solidButton}
        >
          <BookOpen className="size-4" />
          {hero.primaryCta}
          <ArrowRight className="size-4" />
        </Link>
        <a href={repoUrl} className={outlineButton}>
          <GitHubIcon className="size-4" />
          {hero.githubCta}
        </a>
        <a href={telegramUrl} className={outlineButton}>
          <TelegramIcon className="size-4" />
          {hero.telegramCta}
        </a>
      </div>
      <DashboardPreview lang={lang} />
    </section>
  );
}
