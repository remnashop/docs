import Link from 'next/link';
import {
  ArrowRight,
  ChartColumn,
  CreditCard,
  KeyRound,
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Package,
  Palette,
  Share2,
  ShieldCheck,
  Ticket,
  type LucideIcon,
} from 'lucide-react';
import { getDocsHref, getLanding, type Feature } from '@/lib/landing-content';
import { RevealOnScroll } from '@/components/landing/reveal-on-scroll';

const icons: Record<string, LucideIcon> = {
  ChartColumn,
  CreditCard,
  KeyRound,
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Package,
  Palette,
  Share2,
  ShieldCheck,
  Ticket,
};

function Card({ item }: { item: Feature }) {
  const Icon = icons[item.icon];

  return (
    <div className="glass-panel flex flex-col gap-3 rounded-3xl p-4" data-reveal>
      <div className="flex items-center gap-3">
                <span className="border-fd-border flex size-9 shrink-0 items-center justify-center rounded-full border bg-white/[0.05]">
          {Icon ? <Icon className="size-4" /> : null}
        </span>
        <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
      </div>
      <p className="text-fd-muted-foreground text-sm text-pretty">{item.description}</p>
    </div>
  );
}

export function Features({ lang }: { lang: string }) {
  const { featuresHeading, featuresMore, features } = getLanding(lang);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-24">
      <div className="glass p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-[21px] font-bold tracking-tight text-balance">{featuresHeading}</h2>
          {/* the introduction lists every feature in full; the cards are the highlights */}
          <Link
            href={getDocsHref(lang)}
            className="border-fd-primary/35 bg-fd-primary/15 text-fd-primary hover:bg-fd-primary/20 inline-flex border h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors"
          >
            {featuresMore}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {features.map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </div>
      </div>
      <RevealOnScroll />
    </section>
  );
}
