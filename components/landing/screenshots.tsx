import { getLanding } from '@/lib/landing-content';

// Изображения лежат в public/screenshots. Сейчас там заглушки — замените файлы
// 1.png…4.png реальными скриншотами бота, менять код при этом не нужно.
const shots = ['1', '2', '3', '4'];

export function Screenshots({ lang }: { lang: string }) {
  const { screenshotsTitle } = getLanding(lang);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold">{screenshotsTitle}</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {shots.map((shot) => (
          <div
            key={shot}
            className="border-fd-border bg-fd-muted aspect-[9/16] overflow-hidden rounded-xl border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/screenshots/${shot}.png`}
              alt={`remnashop — ${shot}`}
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
