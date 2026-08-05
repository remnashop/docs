import { ImageOff } from 'lucide-react';
import { getLanding } from '@/lib/landing-content';

// Placeholder tiles until real bot screenshots exist.
const shots = ['1', '2', '3', '4'];

export function Screenshots({ lang }: { lang: string }) {
  const { screenshotsTitle } = getLanding(lang);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold">{screenshotsTitle}</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4" data-reveal-group>
        {shots.map((shot) => (
          <div
            key={shot}
            // self-start keeps the row from stretching the tile: a stretched height would
            // be definite and aspect-square would be ignored.
            className="panel flex aspect-square items-center justify-center self-start"
            data-reveal
          >
            <ImageOff className="text-fd-muted-foreground size-8" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
