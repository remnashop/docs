import { GitHubIcon } from '@/components/icons/github';
import { TelegramIcon } from '@/components/icons/telegram';
import { gitConfig, telegramUrl } from '@/lib/shared';

const row =
  'flex h-9 items-center gap-2.5 rounded-full px-3 text-[13.5px] font-medium text-fd-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-fd-foreground';

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
