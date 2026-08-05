import { getLanding } from '@/lib/landing-content';
import { gitConfig, telegramUrl } from '@/lib/shared';

export function Footer({ lang }: { lang: string }) {
  const { footer } = getLanding(lang);

  return (
    <footer className="border-fd-border mt-8 border-t py-10">
      <div className="text-fd-muted-foreground mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-sm">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
            className="hover:text-fd-foreground transition-colors"
          >
            {footer.github}
          </a>
          <a href={telegramUrl} className="hover:text-fd-foreground transition-colors">
            {footer.telegram}
          </a>
        </div>
        <p className="text-xs">{footer.note}</p>
      </div>
    </footer>
  );
}
