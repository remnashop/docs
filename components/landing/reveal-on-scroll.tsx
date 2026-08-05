'use client';

import { useEffect } from 'react';

// Cards are visible by default so the page still works without JS; the group is only
// armed once this mounts, then each card fades in as it enters the viewport.
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = 'true';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    for (const group of groups) {
      group.dataset.revealReady = 'true';
      group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((card, index) => {
        card.style.transitionDelay = `${index * 60}ms`;
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
