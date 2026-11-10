import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getLanding, getDocsHref } from '@/lib/landing-content';
import { gitConfig, telegramUrl } from '@/lib/shared';
import { GitHubIcon } from '@/components/icons/github';
import { TelegramIcon } from '@/components/icons/telegram';
import { DashboardPreview } from '@/components/landing/dashboard-preview';

const button = 'inline-flex h-10 items-center justify-center gap-1.5 rounded-full border px-5 text-sm transition-colors';
const solidButton = `${button} border-transparent bg-fd-primary font-semibold text-fd-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] hover:bg-[#67e8f9]`;
const outlineButton = `${button} border-fd-border bg-white/[0.03] font-medium text-fd-foreground/90 backdrop-blur-md hover:bg-white/[0.06]`;

export function Hero({ lang }: { lang: string }) {
  const { hero } = getLanding(lang);
  const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-16 sm:pt-24">
      <span className="border-fd-border text-fd-muted-foreground inline-flex items-center gap-2 rounded-full border bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase backdrop-blur-md">
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
      {/* A phone stacks them as two rows, documentation over the two links, rather than
          leaving one button alone on the second line. */}
      <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-3 sm:flex sm:w-auto sm:max-w-none sm:items-center sm:justify-center">
        <Link
          href={getDocsHref(lang)}
          className={`${solidButton} col-span-2`}
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
