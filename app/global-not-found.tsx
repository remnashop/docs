// GitHub Pages serves /404.html for every miss, so this page lives outside the
// [lang] segment and has to render its own html/body.
import { Inter } from 'next/font/google';
import Link from 'next/link';
import type { Metadata } from 'next';
import './global.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Page not found — Remnashop',
  icons: { icon: '/logo.svg' },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`dark ${inter.className}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-semibold">404 — page not found</h1>
        <p className="text-fd-muted-foreground">
          It may have been moved, or its address has changed.
        </p>
        <Link href="/" className="text-fd-primary underline">
          Go home
        </Link>
      </body>
    </html>
  );
}
