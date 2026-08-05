'use client';

import { useEffect } from 'react';

// Fumadocs does not expose a scroll state on the header, so mark it here and let
// the island narrow itself from CSS.
export function NavbarStuck() {
  useEffect(() => {
    const nav = document.getElementById('nd-nav');
    if (!nav) return;

    const update = () => {
      nav.dataset.stuck = String(window.scrollY > 8);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      delete nav.dataset.stuck;
    };
  }, []);

  return null;
}
