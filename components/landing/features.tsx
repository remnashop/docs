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
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold">{featuresTitle}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = icons[feature.icon];

          return (
            <div
              key={feature.title}
              className="border-fd-border bg-fd-card rounded-xl border p-5"
            >
              {Icon ? <Icon className="text-fd-primary mb-3 size-5" /> : null}
              <h3 className="mb-1 font-medium">{feature.title}</h3>
              <p className="text-fd-muted-foreground text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
