'use client';

import { useState, type ReactNode } from 'react';
import {
  ArrowDownUp,
  ArrowRightLeft,
  Ban,
  BarChart3,
  Bell,
  Bot,
  Calculator,
  Calendar,
  CalendarClock,
  CalendarRange,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  Coins,
  CreditCard,
  Filter,
  Fingerprint,
  Gift,
  KeyRound,
  Languages,
  Layers,
  LayoutGrid,
  Link2,
  type LucideIcon,
  Mail,
  Megaphone,
  MoreVertical,
  Package,
  PlugZap,
  Plus,
  Receipt,
  RefreshCw,
  Repeat,
  ScrollText,
  Search,
  ServerOff,
  Settings,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Ticket,
  TicketCheck,
  TicketPercent,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  Wallet,
  Wifi,
  X,
} from 'lucide-react';
import { getPreview, type Preview, type PreviewScreen, type Tone } from '@/lib/preview-content';

// A static mock of the dashboard; visitors flip through six screens with the tabs above.

const screens: PreviewScreen[] = ['overview', 'analytics', 'users', 'plans', 'transactions', 'events'];

const sidebar: { icon: LucideIcon; screen?: PreviewScreen }[] = [
  { icon: LayoutGrid, screen: 'overview' },
  { icon: BarChart3, screen: 'analytics' },
  { icon: Users, screen: 'users' },
  { icon: Layers },
  { icon: Package, screen: 'plans' },
  { icon: Ticket },
  { icon: Megaphone },
  { icon: Share2 },
  { icon: Link2 },
  { icon: Receipt, screen: 'transactions' },
  { icon: ShieldCheck },
  { icon: ScrollText, screen: 'events' },
  { icon: Settings },
];

const pageIcons: Record<PreviewScreen, LucideIcon> = {
  overview: LayoutGrid,
  analytics: BarChart3,
  users: Users,
  plans: Package,
  transactions: Receipt,
  events: ScrollText,
};

// The bottom dissolves into the page, so the mock reads as a glimpse, not a screenshot.
// Set on each layer, not on a wrapper: a masked ancestor becomes the backdrop root, and the
// glass card would blur an empty layer instead of the shader behind the page.
const fade = { maskImage: 'linear-gradient(to bottom, #000 60%, transparent)' };

const eyebrow = 'text-fd-muted-foreground text-[11px] font-semibold tracking-wide uppercase';
const kpiValue = 'text-[26px] font-bold tracking-tight whitespace-nowrap tabular-nums';
const filterField = 'border-fd-border flex h-9 items-center rounded-full border bg-white/[0.03] text-[13px] font-medium';
const toolbar = 'glass-panel flex items-center gap-2 rounded-3xl p-1.5';
const panel = 'glass-panel rounded-3xl p-4';

const toneClass: Record<Tone, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  neutral: 'bg-white/[0.06] text-fd-muted-foreground',
  accent: 'bg-fd-primary/10 text-fd-primary',
  violet: 'bg-violet-400/10 text-violet-300',
};

const dotTone: Record<Tone, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  neutral: 'bg-fd-muted-foreground',
  accent: 'bg-fd-primary',
  violet: 'bg-violet-400',
};

function Badge({ tone, count, children }: { tone: Tone; count?: boolean; children: ReactNode }) {
  const shape = count
    ? 'h-6 min-w-6 justify-center px-1.5 text-[11px] tabular-nums'
    : 'gap-1 px-2 py-0.5 text-[11px] uppercase tracking-wide';
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full font-semibold whitespace-nowrap ${shape} ${toneClass[tone]}`}>
      {children}
    </span>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="text-fd-muted-foreground inline-flex shrink-0 items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap tabular-nums">
      {children}
    </span>
  );
}

function IconCircle({ icon: Icon, tone, header = false, children }: { icon?: LucideIcon; tone?: Tone; header?: boolean; children?: ReactNode }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${
        header
          ? 'border-fd-border size-9 border bg-white/[0.05]'
          : `size-8 ${tone ? toneClass[tone] : 'bg-white/[0.06]'}`
      }`}
    >
      {children ?? (Icon && <Icon className="size-4" />)}
    </span>
  );
}

function Section({
  icon,
  title,
  description,
  aside,
  className = '',
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`${panel} ${className}`}>
      <div className="flex items-center gap-3">
        <IconCircle icon={icon} header />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold tracking-tight">{title}</div>
          <div className="text-fd-muted-foreground mt-0.5 truncate text-[12px]">{description}</div>
        </div>
        {aside}
      </div>
      <div className="-mx-4 mt-4 border-t border-white/[0.08]" />
      {children}
    </section>
  );
}

// two tiles a row on a phone: a smaller value and no icon, so the figures fit
function KpiTile({ kpi, icon: Icon }: { kpi: Preview['users']['kpis'][number]; icon: LucideIcon }) {
  return (
    <div className={`${panel} flex min-w-0 flex-col gap-1.5`}>
      <div className="flex items-center gap-2.5">
        <span className="hidden sm:flex">
          <IconCircle icon={Icon} />
        </span>
        <span className={`line-clamp-2 ${eyebrow}`}>{kpi.label}</span>
        {kpi.info && <CircleHelp className="text-fd-muted-foreground size-3.5 shrink-0" />}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold tracking-tight whitespace-nowrap tabular-nums sm:text-[26px]">{kpi.value}</span>
        {kpi.trend && (
          <span className="bg-success/10 text-success hidden size-6 shrink-0 items-center justify-center rounded-full sm:flex">
            {kpi.trend.down ? <TrendingDown className="size-3.5" /> : <TrendingUp className="size-3.5" />}
          </span>
        )}
      </div>
      {kpi.trend && (
        <span className="text-fd-muted-foreground text-[12px]">
          <span className="text-success font-semibold tabular-nums">
            {kpi.trend.down ? '−' : '+'}
            {kpi.trend.text}
          </span>
          {` · ${kpi.trend.hint}`}
        </span>
      )}
      {kpi.hint && (
        <span className="text-fd-muted-foreground mt-auto text-[12px] tabular-nums">
          {kpi.lead && <span className="text-success font-semibold">{kpi.lead} </span>}
          {kpi.hint}
        </span>
      )}
    </div>
  );
}

function KpiRow({ kpis, icons }: { kpis: Preview['users']['kpis']; icons: LucideIcon[] }) {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {kpis.map((kpi, i) => (
        <KpiTile key={kpi.label} kpi={kpi} icon={icons[i]} />
      ))}
    </div>
  );
}

function Pills({ options, active, capsule = false }: { options: string[]; active: number; capsule?: boolean }) {
  return (
    <div
      className={`flex shrink-0 gap-1 rounded-full ${
        capsule ? 'glass-panel h-12 p-1.5' : 'border-fd-border border bg-white/[0.03] p-1'
      }`}
    >
      {options.map((option, i) => (
        <span
          key={option}
          className={`flex items-center rounded-full text-[13px] font-medium whitespace-nowrap ${capsule ? 'h-9 px-4' : 'h-7 px-3.5'} ${
            i === active ? 'bg-fd-accent text-fd-primary' : ''
          }`}
        >
          {option}
        </span>
      ))}
    </div>
  );
}

function SearchField({ value }: { value: string }) {
  return (
    <div className={`${filterField} min-w-40 flex-1 gap-2.5 px-3 md:min-w-64`}>
      <Search className="text-fd-muted-foreground size-3.5 shrink-0" />
      <span className="text-fd-muted-foreground truncate">{value}</span>
    </div>
  );
}

function Select({
  value,
  icon: Icon,
  className = 'w-48',
  placeholder = false,
}: {
  value: string;
  icon: LucideIcon;
  className?: string;
  placeholder?: boolean;
}) {
  return (
    <div className={`${filterField} relative hidden min-w-0 pr-8 pl-9 md:flex ${className}`}>
      <Icon className="text-fd-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
      <span className={`truncate ${placeholder ? 'text-fd-muted-foreground' : ''}`}>{value}</span>
      <ChevronDown className="text-fd-muted-foreground absolute top-1/2 right-3 size-3.5 -translate-y-1/2" />
    </div>
  );
}

const listHead = `border-fd-border mb-1 border-b px-3.5 pb-2.5 ${eyebrow}`;
const listBody =
  'flex flex-col [&>*:not(:last-child)]:shadow-[inset_0_-1px_0_color-mix(in_srgb,var(--color-fd-border)_50%,transparent)]';
const listRow = 'h-15 rounded-full px-3.5';

function GroupToggle({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-1.5">
      <ChevronDown className="text-fd-muted-foreground size-3.5" />
      <span className="-ml-1 text-[12px] font-semibold">{label}</span>
      <span className="text-fd-muted-foreground -ml-1 text-[12px] tabular-nums">{count}</span>
    </div>
  );
}

function TitleWithId({ title, id }: { title: string; id: number }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="truncate">{title}</span>
      <span className="text-fd-muted-foreground shrink-0 font-mono text-[12px] font-normal">#{id}</span>
    </span>
  );
}

function CellText({ title, sub, mono = false }: { title: ReactNode; sub: ReactNode; mono?: boolean }) {
  return (
    <span className="min-w-0">
      <span className="block truncate text-[13px] font-medium">{title}</span>
      <span className={`text-fd-muted-foreground block truncate text-[12px] ${mono ? 'font-mono' : ''}`}>{sub}</span>
    </span>
  );
}

// A curve through every point (Catmull-Rom as cubic Béziers), close to recharts' monotone line;
// max is the top tick, so the line sits on the same scale as the axis.
function chartPath(values: number[], max: number) {
  const points = values.map((v, i) => [(i / (values.length - 1)) * 300, 100 - (v / max) * 100]);
  let d = `M ${points[0].join(' ')}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [points[i - 1] ?? points[i], points[i], points[i + 1], points[i + 2] ?? points[i + 1]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1.join(' ')} ${c2.join(' ')} ${p2.join(' ')}`;
  }
  return d;
}

function RevenueChart({ chart }: { chart: Preview['overview']['revenue']['chart'] }) {
  const line = chartPath(chart.values, Number(chart.ticks[0]));
  return (
    <div className="text-fd-muted-foreground flex h-[200px] flex-col px-4 pt-2 text-[11px] tabular-nums">
      <div className="flex min-h-0 flex-1 gap-2">
        <div className="relative w-10 shrink-0">
          {chart.ticks.map((tick, i) => (
            <span
              key={tick}
              className="absolute right-0 -translate-y-1/2"
              style={{ top: `${(i / (chart.ticks.length - 1)) * 100}%` }}
            >
              {tick}
            </span>
          ))}
        </div>
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="h-full min-w-0 flex-1 overflow-visible">
          <defs>
            <linearGradient id="preview-revenue" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {chart.ticks.map((tick, i) => {
            const y = (i / (chart.ticks.length - 1)) * 100;
            return (
              <line
                key={tick}
                x1="0"
                x2="300"
                y1={y}
                y2={y}
                stroke="var(--color-fd-border)"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          <path d={`${line} L 300 100 L 0 100 Z`} fill="url(#preview-revenue)" />
          <path d={line} fill="none" stroke="var(--color-success)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="relative mt-2 ml-12 h-4">
        {chart.days.map((day, i) => (
          <span
            key={day}
            className="absolute -translate-x-1/2"
            style={{ left: `${(i / (chart.days.length - 1)) * 100}%` }}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

function Overview({ preview, periods }: { preview: Preview['overview']; periods: string[] }) {
  const { attention, revenue, subscriptions } = preview;

  return (
    <div className="flex flex-col gap-5">
      <KpiRow kpis={preview.kpis} icons={[Users, Layers, Wifi, Wallet]} />

      <Section
        icon={TriangleAlert}
        title={attention.title}
        description={attention.description}
        aside={
          <span className="bg-error/15 text-error hidden h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium sm:flex">
            <span className="size-1.5 rounded-full bg-current" />
            {attention.status}
          </span>
        }
      >
        <div className={`${listBody} pt-4`}>
          {attention.rows.map((row) => (
            <div key={row.title} className={`grid grid-cols-[32px_minmax(0,1fr)_32px] items-center gap-3 ${listRow}`}>
              <IconCircle icon={ServerOff} tone="error" />
              <CellText title={row.title} sub={row.sub} />
              <span className="text-fd-muted-foreground flex size-8 items-center justify-center">
                <X className="size-4" />
              </span>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Section
          icon={Wallet}
          title={revenue.title}
          description={revenue.description}
          aside={
            <span className="hidden xl:block">
              <Pills options={periods.slice(0, 3)} active={0} />
            </span>
          }
        >
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={kpiValue}>{revenue.total}</span>
              <Tag>{revenue.orders}</Tag>
            </div>
            <RevenueChart chart={revenue.chart} />
          </div>
        </Section>
        <Section
          icon={Layers}
          title={subscriptions.title}
          description={subscriptions.description}
          className="hidden lg:block"
        >
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-baseline gap-2">
              <span className={kpiValue}>{subscriptions.total}</span>
              <span className={eyebrow}>{subscriptions.totalLabel}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {subscriptions.rows.map((row) => (
                <div key={row.label} className="contents">
                  {row.divided && <div className="bg-fd-border h-px" />}
                  <div className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="text-fd-muted-foreground flex items-center gap-2">
                      <span className={`size-2.5 rounded-full ${dotTone[row.tone]}`} />
                      {row.label}
                    </span>
                    <span className="font-semibold tabular-nums">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Analytics({ preview, periods }: { preview: Preview['analytics']; periods: string[] }) {
  const tabIcons = [BarChart3, Wallet, ArrowRightLeft, Gift, RefreshCw, TrendingUp, Share2, TicketPercent];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <div className="glass-panel flex h-12 min-w-0 gap-1 overflow-hidden rounded-full p-1.5">
          {preview.tabs.map((tab, i) => {
            const Icon = tabIcons[i];
            return (
              <span
                key={tab}
                className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium whitespace-nowrap ${
                  i === 0 ? 'bg-fd-accent text-fd-primary' : ''
                }`}
              >
                <Icon className="size-4" />
                {tab}
              </span>
            );
          })}
        </div>
        <span className="ml-auto hidden 2xl:block">
          <Pills options={periods} active={1} capsule />
        </span>
      </div>
      <p className={eyebrow}>{preview.section}</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {preview.kpis.map((kpi, i) => (
          <KpiTile key={kpi.label} kpi={kpi} icon={[CreditCard, UserPlus, UserCheck, RefreshCw][i]} />
        ))}
      </div>
      <p className={eyebrow}>{preview.nowSection}</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {preview.now.map((kpi, i) => (
          <KpiTile
            key={kpi.label}
            kpi={kpi}
            icon={[TrendingUp, Wallet, Users, Layers, PlugZap, CalendarClock, Gift, Coins][i]}
          />
        ))}
      </div>
    </div>
  );
}

const channelIcons = { telegram: Bot, email: Mail, login: KeyRound };

function UsersScreen({ preview }: { preview: Preview['users'] }) {
  const filterIcons = [Ban, Layers, Gift];
  const grid =
    'grid grid-cols-[32px_minmax(0,1fr)_16px] md:grid-cols-[32px_minmax(0,1fr)_100px_90px_130px_32px] items-center gap-3';

  return (
    <div className="flex flex-col gap-5">
      <div className={toolbar}>
        <SearchField value={preview.search} />
        {preview.filters.map((filter, i) => (
          <Select key={filter} value={filter} icon={filterIcons[i]} className="w-56" />
        ))}
      </div>
      <KpiRow kpis={preview.kpis} icons={[Users, Layers, UserMinus, Ban]} />
      <div className={panel}>
        <div className={`${grid} ${listHead}`}>
          <span className="col-span-2">{preview.columns.user}</span>
          <span className="hidden md:block">{preview.columns.channels}</span>
          <span className="hidden md:block">{preview.columns.subscriptions}</span>
          <span className="hidden md:block">{preview.columns.registered}</span>
          <span />
        </div>
        <div className={listBody}>
          {preview.rows.map((row) => (
            <div key={row.id} className={`${grid} ${listRow}`}>
              <span className="flex size-8 items-center justify-center rounded-full bg-white/[0.06] text-[11px] font-bold">
                {row.initials}
              </span>
              <CellText title={<TitleWithId title={row.name} id={row.id} />} sub={row.contacts} />
              <span className="hidden gap-1 md:flex">
                {row.channels.map((channel) => {
                  const Icon = channelIcons[channel];
                  return (
                    <span
                      key={channel}
                      className="text-fd-muted-foreground flex size-6 items-center justify-center rounded-full bg-white/[0.06]"
                    >
                      <Icon className="size-3.5" />
                    </span>
                  );
                })}
              </span>
              <span className="hidden gap-1 md:flex">
                {row.subscriptions.map((sub) => (
                  <Badge key={sub.tone} tone={sub.tone} count>
                    {sub.count}
                  </Badge>
                ))}
              </span>
              <span className="hidden tabular-nums md:block">
                <span className="block text-[13px]">{row.date}</span>
                <span className="text-fd-muted-foreground block text-[12px]">{row.relative}</span>
              </span>
              <span className="text-fd-muted-foreground flex justify-end">
                <MoreVertical className="size-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Transactions({ preview, periods }: { preview: Preview['transactions']; periods: string[] }) {
  const filterIcons = [Filter, Wallet, Repeat];
  const grid =
    'grid grid-cols-[32px_minmax(0,1fr)_96px_16px] md:grid-cols-[32px_minmax(0,1fr)_120px_100px_64px_112px_16px] items-center gap-3';

  return (
    <div className="flex flex-col gap-5">
      <div className={toolbar}>
        {preview.filters.map((filter, i) => (
          <Select key={filter} value={filter} icon={filterIcons[i]} className={`flex-1 ${i === 0 ? 'flex!' : ''}`} />
        ))}
        <Select value={periods[1]} icon={CalendarRange} className="flex-1" />
      </div>
      <KpiRow kpis={preview.kpis} icons={[Receipt, CircleCheck, Calculator, Wallet]} />
      <div className={panel}>
        <div className={`${grid} ${listHead}`}>
          <span className="col-span-2">{preview.columns.order}</span>
          <span className="hidden md:block">{preview.columns.type}</span>
          <span className="hidden md:block">{preview.columns.amount}</span>
          <span className="hidden md:block">{preview.columns.created}</span>
          <span>{preview.columns.status}</span>
          <span />
        </div>
        <GroupToggle label={preview.group.label} count={preview.group.count} />
        <div className={listBody}>
          {preview.rows.map((row) => (
            <div key={row.id} className={`${grid} ${listRow}`}>
              <IconCircle tone={row.tone}>
                <span className="text-[13px] font-bold">{row.symbol}</span>
              </IconCircle>
              <CellText
                title={<TitleWithId title={row.plan} id={row.id} />}
                sub={
                  <>
                    {row.user} <span className="font-mono">#{row.userId}</span> · {row.gateway}
                  </>
                }
              />
              <span className="hidden truncate text-[13px] md:block">{row.type}</span>
              <span className="hidden text-[13px] font-semibold tabular-nums md:block">{row.amount}</span>
              <span className="hidden text-[13px] tabular-nums md:block">{row.time}</span>
              <span>
                <Badge tone={row.tone}>{row.status}</Badge>
              </span>
              <ChevronRight className="text-fd-muted-foreground size-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Plans({ preview }: { preview: Preview['plans'] }) {
  return (
    <div className="flex flex-col gap-5">
      <div className={toolbar}>
        <div className="border-fd-border flex w-full max-w-md gap-1 rounded-full border bg-white/[0.03] p-1">
          {preview.filters.map((filter, i) => (
            <span
              key={filter}
              className={`flex h-[26px] flex-1 items-center justify-center rounded-full text-[13px] font-medium ${
                i === 0 ? 'bg-fd-accent text-fd-primary' : ''
              }`}
            >
              {filter}
            </span>
          ))}
        </div>
        <span className="border-fd-primary/35 bg-fd-primary/15 text-fd-primary ml-auto hidden h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium md:flex">
          <Plus className="size-4" />
          {preview.create}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {preview.items.map((plan) => (
          <article
            key={plan.name}
            className={`glass-panel flex aspect-[1.4] min-w-0 flex-col gap-4 rounded-3xl px-6 pt-4 pb-6 ${
              plan.badges.some((badge) => badge.tone === 'accent') ? 'ring-fd-primary/30 ring-1' : ''
            } ${plan.inactive ? 'text-fd-muted-foreground' : ''}`}
          >
            <div className="flex items-center gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-1.5 text-[13px] font-semibold">
                {plan.trial ? <Gift className="size-4 shrink-0" /> : <Package className="size-4 shrink-0" />}
                <span className="truncate">{plan.name}</span>
                {plan.badges.map((badge) => (
                  <Badge key={badge.label} tone={badge.tone}>
                    {badge.label}
                  </Badge>
                ))}
              </div>
              <span className="text-fd-muted-foreground -mr-2 flex shrink-0">
                <span className="flex size-8 items-center justify-center">
                  <ChevronDown className="size-4" />
                </span>
                <span className="flex size-8 items-center justify-center">
                  <MoreVertical className="size-4" />
                </span>
              </span>
            </div>
            <div className="mt-auto flex flex-col gap-1.5">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className={`leading-tight ${kpiValue}`}>
                  {plan.durations.length > 1 && (
                    <span className="text-fd-muted-foreground mr-1.5 text-[13px] font-medium">{preview.priceFrom}</span>
                  )}
                  {plan.price}
                </span>
                <span className="text-fd-muted-foreground text-[12px]">{plan.per}</span>
              </div>
              <div className="text-fd-muted-foreground truncate text-[12px]">{plan.durations.join(' · ')}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: ArrowDownUp, value: plan.traffic },
                { icon: Smartphone, value: plan.devices },
              ].map(({ icon: Icon, value }) => (
                <span
                  key={value}
                  className="flex min-w-0 flex-1 items-center justify-between gap-1.5 rounded-full bg-black/[0.22] px-3 py-1.5 text-[12px]"
                >
                  <Icon className="text-fd-muted-foreground size-3.5 shrink-0" />
                  <span className="ml-auto shrink-0 font-bold">{value}</span>
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const eventIcons: Record<Preview['events']['rows'][number]['kind'], LucideIcon> = {
  purchase: ShoppingCart,
  renew: CalendarClock,
  promocode: TicketCheck,
  login: Fingerprint,
  register: UserPlus,
  plan: Package,
};

function Events({ preview }: { preview: Preview['events'] }) {
  const grid =
    'grid grid-cols-[32px_minmax(0,1fr)_64px_16px] md:grid-cols-[32px_minmax(0,2fr)_64px_minmax(0,1fr)_140px_16px] items-center gap-3';

  return (
    <div className="flex flex-col gap-5">
      <div className={toolbar}>
        <SearchField value={preview.search} />
        <Select value={preview.filters[0]} icon={Filter} />
        <Select value={preview.filters[1]} icon={Calendar} className="w-40" placeholder />
        <Select value={preview.filters[2]} icon={Calendar} className="w-40" placeholder />
      </div>
      <div className={panel}>
        <div className={`${grid} ${listHead}`}>
          <span className="col-span-2">{preview.columns.event}</span>
          <span>{preview.columns.time}</span>
          <span className="hidden md:block">{preview.columns.actor}</span>
          <span className="hidden md:block">{preview.columns.ip}</span>
          <span />
        </div>
        <GroupToggle label={preview.group.label} count={preview.group.count} />
        <div className={listBody}>
          {preview.rows.map((row) => (
            <div key={`${row.event}-${row.time}`} className={`${grid} ${listRow}`}>
              <IconCircle icon={eventIcons[row.kind]} />
              <span className="text-fd-foreground/90 truncate text-[13px] font-medium">{row.event}</span>
              <span className="text-[13px] tabular-nums">{row.time}</span>
              <span className="hidden truncate text-[13px] md:block">
                {row.actor}
                <span className="text-fd-muted-foreground ml-1.5 font-mono text-[12px]">#{row.actorId}</span>
              </span>
              <span className="text-fd-muted-foreground hidden truncate font-mono text-[12px] md:block">{row.ip}</span>
              <ChevronRight className="text-fd-muted-foreground size-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header({ preview, screen, title, updatedAt }: { preview: Preview['header']; screen: PreviewScreen; title: string; updatedAt?: string }) {
  const PageIcon = pageIcons[screen];
  const iconButton = 'text-fd-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full';

  return (
    <div className="glass-panel flex h-12 items-center justify-between gap-5 rounded-full p-1.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <IconCircle icon={PageIcon} header />
        <span className="truncate text-[17px] font-semibold tracking-tight">{title}</span>
        {updatedAt && <span className="text-fd-muted-foreground mt-1 hidden shrink-0 text-[11px] sm:block">{updatedAt}</span>}
      </div>
      <div className="hidden items-center gap-1 md:flex">
        <span className={iconButton}>
          <Search className="size-4" />
        </span>
        {screen === 'overview' && (
          <span className={iconButton}>
            <Sparkles className="size-4" />
          </span>
        )}
        <span className={iconButton}>
          <Languages className="size-4" />
        </span>
        <span className={iconButton}>
          <Bell className="size-4" />
        </span>
        <span className="mx-1 h-5 w-px shrink-0 bg-white/[0.08]" />
        <span className="flex h-9 items-center gap-2.5 pr-2.5 pl-0.5">
          <span className="glass-control flex size-8 items-center justify-center rounded-full text-[12px] font-semibold">
            {preview.login.slice(0, 2).toUpperCase()}
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-semibold">{preview.login}</span>
            <span className="text-fd-muted-foreground block text-[12px]">{preview.role}</span>
          </span>
          <ChevronDown className="text-fd-muted-foreground size-3.5" />
        </span>
      </div>
    </div>
  );
}

function renderScreen(preview: Preview, screen: PreviewScreen) {
  switch (screen) {
    case 'overview':
      return <Overview preview={preview.overview} periods={preview.periods} />;
    case 'analytics':
      return <Analytics preview={preview.analytics} periods={preview.periods} />;
    case 'users':
      return <UsersScreen preview={preview.users} />;
    case 'transactions':
      return <Transactions preview={preview.transactions} periods={preview.periods} />;
    case 'plans':
      return <Plans preview={preview.plans} />;
    case 'events':
      return <Events preview={preview.events} />;
  }
}

export function DashboardPreview({ lang }: { lang: string }) {
  const preview = getPreview(lang);
  const [screen, setScreen] = useState<PreviewScreen>('overview');

  return (
    <div className="mt-14 w-full sm:mt-20">
      <div className="mb-4 flex justify-center">
        <div className="border-fd-border no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border bg-white/[0.03] p-1 backdrop-blur-md">
          {screens.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={key === screen}
              onClick={() => setScreen(key)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                key === screen ? 'bg-fd-accent text-fd-primary' : 'text-fd-foreground hover:bg-white/[0.06]'
              }`}
            >
              {preview.titles[key]}
            </button>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="relative flex gap-2 p-2 text-left select-none sm:p-3">
        <div className="border-fd-border absolute inset-0 rounded-[2.5rem] border bg-black/15" style={fade} />

        <div className="relative hidden flex-col items-center gap-0.5 px-1 pt-1.5 sm:flex" style={fade}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="mb-5 size-8" />
          {sidebar.map(({ icon: Icon, screen: target }, i) => (
            <span
              key={i}
              className={`flex size-10 items-center justify-center rounded-full ${
                target === screen ? 'bg-fd-accent text-fd-primary' : 'text-fd-muted-foreground'
              }`}
            >
              <Icon className="size-4" />
            </span>
          ))}
        </div>

        <div className="glass relative flex h-[38rem] min-w-0 flex-1 flex-col gap-5 overflow-hidden p-4 sm:p-5" style={fade}>
          <Header
            preview={preview.header}
            screen={screen}
            title={preview.titles[screen]}
            updatedAt={screen === 'overview' ? preview.overview.updatedAt : undefined}
          />
          <div key={screen} className="preview-screen-in">
            {renderScreen(preview, screen)}
          </div>
        </div>
      </div>
    </div>
  );
}
