'use client';

import { useEffect, useState } from 'react';
import { GitHubIcon } from '@/components/icons/github';
import { gitConfig } from '@/lib/shared';

const formatter = new Intl.NumberFormat(undefined, {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

// The count is fetched in the browser rather than at build time: the site is a static
// export, so a baked-in number would only refresh on deploy, and a failing API would
// break the build.
export function GitHubLink() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/repos/${gitConfig.user}/${gitConfig.repo}`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data: { stargazers_count?: number }) => {
        if (typeof data.stargazers_count === 'number') setStars(data.stargazers_count);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="GitHub"
      className="hover:text-fd-primary inline-flex items-center gap-1.5 p-1.5 text-sm transition-colors"
    >
      <GitHubIcon className="size-5" />
      {stars === null ? null : <span className="tabular-nums">{formatter.format(stars)}</span>}
    </a>
  );
}
