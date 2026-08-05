import { GitHubIcon } from '@/components/icons/github';
import { TelegramIcon } from '@/components/icons/telegram';
import { gitConfig, telegramUrl } from '@/lib/shared';

// Matches the styling of the sidebar page-tree items.
const row =
  'flex items-center gap-2 rounded-lg p-2 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground';

export function SocialLinks() {
  return (
    <div className="flex flex-col gap-0.5" data-social-links>
      <a
        href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
        target="_blank"
        rel="noreferrer noopener"
        className={row}
      >
        <GitHubIcon className="size-4" />
        GitHub
      </a>
      <a href={telegramUrl} target="_blank" rel="noreferrer noopener" className={row}>
        <TelegramIcon className="size-4" />
        Telegram
      </a>
    </div>
  );
}
