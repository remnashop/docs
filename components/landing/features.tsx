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
    <div className="tile flex flex-col gap-3 p-5" data-reveal>
      <div className="flex items-center gap-3">
        {/* The dashboard's KpiTile icon: a 40px rounded square tinted with the accent. */}
        <span className="bg-fd-primary/10 text-fd-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
          {Icon ? <Icon className="size-5" /> : null}
        </span>
        <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
      </div>
      <p className="text-fd-muted-foreground text-sm text-pretty">{item.description}</p>
    </div>
  );
}

export function Features({ lang }: { lang: string }) {
  const { featuresTitle, featuresHeading, featuresMore, features } = getLanding(lang);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-24">
      <div className="glass p-6 sm:p-10">
        <span className="text-fd-primary text-[11px] font-semibold tracking-wide uppercase">{featuresTitle}</span>
        <div className="mt-2 mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl text-2xl font-bold tracking-tight text-balance sm:text-3xl">{featuresHeading}</h2>
          {/* The introduction lists every feature in full; the cards are the highlights. */}
          <Link
            href={getDocsHref(lang)}
            className="bg-fd-accent text-fd-primary hover:bg-fd-primary/20 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors"
          >
            {featuresMore}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {features.map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </div>
      </div>
      <RevealOnScroll />
    </section>
  );
}
