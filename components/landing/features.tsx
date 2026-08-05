import {
  CalendarClock,
  CreditCard,
  Languages,
  LayoutDashboard,
  Network,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { getLanding } from '@/lib/landing-content';
import { RevealOnScroll } from '@/components/landing/reveal-on-scroll';

const icons: Record<string, LucideIcon> = {
  Network,
  CreditCard,
  CalendarClock,
  Users,
  LayoutDashboard,
  Languages,
};

export function Features({ lang }: { lang: string }) {
  const { featuresTitle, features } = getLanding(lang);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold">{featuresTitle}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
        {features.map((feature) => {
          const Icon = icons[feature.icon];

          return (
            <div key={feature.title} className="panel p-6" data-reveal>
              <span className="border-fd-border bg-fd-primary/10 text-fd-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase">
                {Icon ? <Icon className="size-3.5" /> : null}
                {feature.title}
              </span>
              <p className="text-fd-muted-foreground mt-4 text-sm text-pretty">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
      <RevealOnScroll />
    </section>
  );
}
