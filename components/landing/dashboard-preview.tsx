'use client';

import { useState, type ReactNode } from 'react';
import {
  ArrowDownUp,
  ArrowRightLeft,
  Ban,
  Bell,
  Calendar,
  ChartColumn,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Filter,
  Gift,
  GripVertical,
  KeyRound,
  Languages,
  Layers,
  LayoutGrid,
  Link2,
  LogIn,
  type LucideIcon,
  Mail,
  MoreVertical,
  Package,
  PieChart,
  Plus,
  RefreshCw,
  Repeat,
  ScrollText,
  Search,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  Smartphone,
  Ticket,
  TicketPercent,
  TrendingUp,
  TriangleAlert,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
  Wifi,
} from 'lucide-react';
import { getPreview, type Preview, type PreviewScreen, type Tone } from '@/lib/preview-content';

// A static mock of the dashboard, drawn after its real pages (remnashop frontend, pages/*):
// sidebar, glass main card with the header, and each page's own layout. Visitors flip
// through six of them with the tabs above.

const screens: PreviewScreen[] = ['overview', 'analytics', 'users', 'plans', 'transactions', 'events'];

const sidebar: { icon: LucideIcon; screen?: PreviewScreen }[] = [
  { icon: LayoutGrid, screen: 'overview' },
  { icon: ChartColumn, screen: 'analytics' },
  { icon: Users, screen: 'users' },
  { icon: Layers },
  { icon: Package, screen: 'plans' },
  { icon: Ticket },
  { icon: Share2 },
  { icon: Link2 },
  { icon: CreditCard, screen: 'transactions' },
  { icon: ShieldCheck },
  { icon: ScrollText, screen: 'events' },
  { icon: Settings },
];

// The bottom dissolves into the page, so the mock reads as a glimpse, not a screenshot.
// Set on each layer, not on a wrapper: a masked ancestor becomes the backdrop root, and the
// glass card would blur an empty layer instead of the shader behind the page.
const fade = { maskImage: 'linear-gradient(to bottom, #000 60%, transparent)' };

const eyebrow = 'text-fd-muted-foreground text-[11px] font-semibold tracking-wide uppercase';
const glassControl = 'border-fd-border rounded-full border bg-white/[0.03] backdrop-blur-md';

const badgeTone: Record<Tone, string> = {
  success: 'border-success/30 bg-success/10 text-success',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  error: 'border-error/30 bg-error/10 text-error',
  neutral: 'border-fd-border bg-white/[0.04] text-fd-muted-foreground',
  accent: 'border-fd-primary/40 bg-fd-accent text-fd-primary',
  violet: 'border-violet-400/35 bg-violet-400/10 text-violet-300',
};

const dotTone: Record<Tone, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  neutral: 'bg-fd-muted-foreground',
  accent: 'bg-fd-primary',
  violet: 'bg-violet-400',
};

const iconTone: Record<Tone, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  neutral: 'bg-white/[0.06] text-fd-muted-foreground',
  accent: 'bg-fd-accent text-fd-primary',
  violet: 'bg-violet-400/10 text-violet-300',
};

function Badge({ tone, count, children }: { tone: Tone; count?: boolean; children: ReactNode }) {
  const shape = count
    ? 'h-6 min-w-6 justify-center px-1.5 text-[11px] tabular-nums'
    : 'px-2 py-0.5 text-[10.5px] uppercase tracking-wide';
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border font-semibold whitespace-nowrap ${shape} ${badgeTone[tone]}`}
    >
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

function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`tile p-4 ${className}`}>{children}</div>;
}

function CardHeader({
  icon: Icon,
  title,
  description,
  aside,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  aside?: ReactNode;
}) {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <span className="border-fd-border flex size-8 shrink-0 items-center justify-center rounded-full border bg-white/[0.05]">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold">{title}</div>
          <div className="text-fd-muted-foreground mt-0.5 truncate text-[12.5px]">{description}</div>
        </div>
        {aside}
      </div>
      <div className="-mx-4 mt-4 border-t border-white/[0.07]" />
    </>
  );
}

function KpiTile({
  kpi,
  icon: Icon,
  highlighted = false,
}: {
  kpi: Preview['users']['kpis'][number];
  icon?: LucideIcon;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-1.5 rounded-2xl border px-4 py-4 ${
        highlighted ? 'border-fd-primary/25 bg-fd-accent/60' : 'border-white/[0.08] bg-white/[0.03]'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="bg-fd-primary/10 text-fd-primary hidden size-10 shrink-0 items-center justify-center rounded-xl sm:flex">
            <Icon className="size-5" />
          </span>
        )}
        <span className={`leading-tight ${eyebrow} ${highlighted ? 'text-[#a8f2ff]' : ''}`}>{kpi.label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold tracking-tight whitespace-nowrap tabular-nums sm:text-[26px]">{kpi.value}</span>
        {kpi.trend && (
          <span className="bg-success/10 text-success flex size-6 shrink-0 items-center justify-center rounded-full">
            <TrendingUp className="size-3.5" />
          </span>
        )}
      </div>
      {kpi.trend && (
        <span className="text-fd-muted-foreground text-[12px]">
          <span className="text-success font-semibold tabular-nums">+{kpi.trend.text}</span> · {kpi.trend.hint}
        </span>
      )}
      {kpi.hint && <span className="text-fd-muted-foreground mt-auto text-[12px] tabular-nums">{kpi.hint}</span>}
    </div>
  );
}

function Pills({ options, active }: { options: string[]; active: number }) {
  return (
    <div className={`flex shrink-0 gap-1 p-1 ${glassControl}`}>
      {options.map((option, i) => (
        <span
          key={option}
          className={`rounded-full px-3.5 py-1 text-sm font-medium whitespace-nowrap ${
            i === active ? 'bg-fd-accent text-fd-primary' : ''
          }`}
        >
          {option}
        </span>
      ))}
    </div>
  );
}

function SearchField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-1 basis-40 flex-col gap-1.5">
      <span className={eyebrow}>{label}</span>
      <div className={`flex h-9.5 items-center gap-2.5 px-3 ${glassControl}`}>
        <Search className="text-fd-muted-foreground size-3.5 shrink-0" />
        <span className="text-fd-muted-foreground truncate text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  icon: Icon,
  placeholder = false,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  placeholder?: boolean;
}) {
  return (
    <div className="hidden w-44 shrink-0 flex-col gap-1.5 md:flex">
      <span className={eyebrow}>{label}</span>
      <div className={`relative flex h-9 items-center pr-8 pl-9 text-[13px] font-medium ${glassControl}`}>
        <Icon className="text-fd-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
        <span className={`truncate ${placeholder ? 'text-fd-muted-foreground' : ''}`}>{value}</span>
        <ChevronDown className="text-fd-muted-foreground absolute top-1/2 right-3 size-3.5 -translate-y-1/2" />
      </div>
    </div>
  );
}

const listHead = `border-fd-border mb-1 border-b px-3 pb-2.5 ${eyebrow}`;
const listBody = 'flex flex-col [&>*:not(:last-child)]:shadow-[inset_0_-1px_0_rgb(232_236_251/0.045)]';
const listRow = 'h-15 rounded-full px-3';

function GroupToggle({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5">
      <ChevronDown className="text-fd-muted-foreground size-3.5" />
      <span className="-ml-1 text-[12px] font-semibold">{label}</span>
      <span className="text-fd-muted-foreground -ml-1 text-[11.5px] tabular-nums">{count}</span>
    </div>
  );
}

// Daily revenue, in arbitrary units: only the shape of the line matters.
const daily = [32, 38, 35, 44, 41, 52, 49, 58, 54, 63, 60, 71, 68, 80];

// Smooths the polyline through each midpoint, close to recharts' monotone curve.
function chartPath(values: number[]) {
  const max = Math.max(...values);
  const points = values.map((v, i) => [(i / (values.length - 1)) * 300, 96 - (v / max) * 80]);
  const mid = (a: number[], b: number[]) => `${(a[0] + b[0]) / 2} ${(a[1] + b[1]) / 2}`;
  let d = `M ${points[0].join(' ')} L ${mid(points[0], points[1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    d += ` Q ${points[i].join(' ')} ${mid(points[i], points[i + 1])}`;
  }
  return `${d} L ${points[points.length - 1].join(' ')}`;
}

const line = chartPath(daily);

function Overview({ preview, periods }: { preview: Preview['overview']; periods: string[] }) {
  const kpiIcons = [Users, Layers, Wifi, Wallet];
  const { attention, revenue, subscriptions } = preview;

  return (
    <div className="flex flex-col gap-4">
      <span className="text-fd-muted-foreground text-[12.5px]">{preview.updatedAt}</span>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {preview.kpis.map((kpi, i) => (
          <KpiTile key={kpi.label} kpi={kpi} icon={kpiIcons[i]} />
        ))}
      </div>

      <Card className="pb-2">
        <CardHeader icon={TriangleAlert} title={attention.title} description={attention.description} />
        {attention.rows.map((row) => (
          <div key={row.title} className={`flex items-center gap-3 ${listRow}`}>
            <span className={`flex size-9 items-center justify-center rounded-full ${iconTone.error}`}>
              <Wifi className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-medium">{row.title}</span>
              <span className="text-fd-muted-foreground block truncate text-[12px]">{row.sub}</span>
            </span>
          </div>
        ))}
      </Card>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader
            icon={Wallet}
            title={revenue.title}
            description={revenue.description}
            aside={
              <span className="hidden xl:block">
                <Pills options={periods} active={1} />
              </span>
            }
          />
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-2xl font-bold tabular-nums">{revenue.total}</span>
              <Tag>{revenue.orders}</Tag>
            </div>
            <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="h-32 w-full">
              <defs>
                <linearGradient id="preview-revenue" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-fd-primary)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--color-fd-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${line} L 300 100 L 0 100 Z`} fill="url(#preview-revenue)" />
              <path d={line} fill="none" stroke="var(--color-fd-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </Card>
        <Card className="hidden lg:block">
          <CardHeader icon={Layers} title={subscriptions.title} description={subscriptions.description} />
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums">{subscriptions.total}</span>
              <span className={eyebrow}>{subscriptions.totalLabel}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {subscriptions.rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="text-fd-muted-foreground flex items-center gap-2">
                    <span className={`size-2.5 rounded-full ${dotTone[row.tone]}`} />
                    {row.label}
                  </span>
                  <span className="font-semibold tabular-nums">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Analytics({ preview, periods }: { preview: Preview['analytics']; periods: string[] }) {
  const tabIcons = [ChartColumn, Wallet, ArrowRightLeft, Gift, RefreshCw, TrendingUp, Share2, TicketPercent];
  const kpiIcons = [CreditCard, PieChart, UserPlus, UserCheck, RefreshCw];

  return (
    <div className="flex flex-col gap-6">
      <div className={`flex max-w-full gap-1 self-start overflow-hidden p-1 ${glassControl}`}>
        {preview.tabs.map((tab, i) => {
          const Icon = tabIcons[i];
          return (
            <span
              key={tab}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
                i === 0 ? 'bg-fd-accent text-fd-primary' : 'text-fd-muted-foreground'
              }`}
            >
              <Icon className="size-4" />
              {tab}
            </span>
          );
        })}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Pills options={periods} active={1} />
        </div>
        <p className={eyebrow}>{preview.section}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {preview.kpis.map((kpi, i) => (
            <KpiTile key={kpi.label} kpi={kpi} icon={kpiIcons[i]} highlighted={i === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}

const channelIcons = { telegram: Send, email: Mail, login: KeyRound };

function UsersScreen({ preview }: { preview: Preview['users'] }) {
  const filterIcons = [Ban, CreditCard, Gift];
  const grid = 'grid grid-cols-[36px_minmax(0,1fr)_16px] md:grid-cols-[36px_minmax(0,1fr)_100px_90px_130px_32px] items-center gap-3';

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {preview.kpis.map((kpi) => (
          <KpiTile key={kpi.label} kpi={kpi} />
        ))}
      </div>
      <Card>
        <div className="flex items-end gap-3">
          <SearchField label={preview.search.label} value={preview.search.value} />
          {preview.filters.map((filter, i) => (
            <Select key={filter.label} label={filter.label} value={filter.value} icon={filterIcons[i]} />
          ))}
        </div>
      </Card>
      <Card>
        <div className={`${grid} ${listHead}`}>
          <span className="col-span-2">{preview.columns.user}</span>
          <span className="hidden md:block">{preview.columns.channels}</span>
          <span className="hidden md:block">{preview.columns.subscriptions}</span>
          <span className="hidden md:block">{preview.columns.registered}</span>
          <span />
        </div>
        <div className={listBody}>
          {preview.rows.map((row) => (
            <div key={row.handle} className={`${grid} ${listRow}`}>
              <span className="flex size-9 items-center justify-center rounded-full bg-white/[0.06] text-[12.5px] font-bold">
                {row.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-medium">{row.name}</span>
                <span className="text-fd-muted-foreground block truncate font-mono text-[12px]">{row.handle}</span>
              </span>
              <span className="hidden gap-1 md:flex">
                {row.channels.map((channel) => {
                  const Icon = channelIcons[channel];
                  return (
                    <span
                      key={channel}
                      className="text-fd-muted-foreground flex size-6 items-center justify-center rounded-full bg-white/[0.06]"
                    >
                      <Icon className="size-3" />
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
                <span className="text-fd-muted-foreground block text-[11.5px]">{row.relative}</span>
              </span>
              <span className="text-fd-muted-foreground flex justify-end">
                <MoreVertical className="size-4" />
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Transactions({ preview, periods }: { preview: Preview['transactions']; periods: string[] }) {
  const filterIcons = [Filter, Wallet, Repeat];
  const grid = 'grid grid-cols-[36px_minmax(0,1fr)_96px_16px] md:grid-cols-[36px_minmax(0,1fr)_150px_80px_112px_16px] items-center gap-3';

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {preview.kpis.map((kpi) => (
          <KpiTile key={kpi.label} kpi={kpi} />
        ))}
      </div>
      <Card>
        <div className="flex items-end gap-3">
          {preview.filters.map((filter, i) => (
            <div key={filter.label} className={`min-w-0 flex-1 flex-col gap-1.5 ${i === 0 ? 'flex' : 'hidden md:flex'}`}>
              <span className={eyebrow}>{filter.label}</span>
              <div className={`relative flex h-9 items-center pr-8 pl-9 text-[13px] font-medium ${glassControl}`}>
                {(() => {
                  const Icon = filterIcons[i];
                  return <Icon className="text-fd-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />;
                })()}
                <span className="truncate">{filter.value}</span>
                <ChevronDown className="text-fd-muted-foreground absolute top-1/2 right-3 size-3.5 -translate-y-1/2" />
              </div>
            </div>
          ))}
          <div className="hidden flex-col gap-1.5 xl:flex">
            <span className={eyebrow}>{preview.period}</span>
            <Pills options={periods} active={1} />
          </div>
        </div>
      </Card>
      <Card>
        <div className={`${grid} ${listHead}`}>
          <span className="col-span-2">{preview.columns.order}</span>
          <span className="hidden md:block">{preview.columns.amount}</span>
          <span className="hidden md:block">{preview.columns.created}</span>
          <span>{preview.columns.status}</span>
          <span />
        </div>
        <GroupToggle label={preview.group.label} count={preview.group.count} />
        <div className={listBody}>
          {preview.rows.map((row) => (
            <div key={row.meta} className={`${grid} ${listRow}`}>
              <span className={`flex size-9 items-center justify-center rounded-full text-[14px] font-semibold ${iconTone[row.tone]}`}>
                {row.symbol}
              </span>
              <span className="min-w-0">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-[13.5px] font-medium">{row.plan}</span>
                  <span className="hidden sm:inline-flex">
                    <Tag>{row.type}</Tag>
                  </span>
                </span>
                <span className="text-fd-muted-foreground block truncate font-mono text-[12px]">{row.meta}</span>
              </span>
              <span className="hidden text-[14px] font-semibold tabular-nums md:block">{row.amount}</span>
              <span className="hidden text-[13px] tabular-nums md:block">{row.time}</span>
              <span>
                <Badge tone={row.tone}>{row.status}</Badge>
              </span>
              <ChevronRight className="text-fd-muted-foreground size-4" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Plans({ preview, title }: { preview: Preview['plans']; title: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="border-fd-border flex size-8 shrink-0 items-center justify-center rounded-full border bg-white/[0.05]">
            <Layers className="size-4" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-bold">
              {title}
              <span className="text-fd-muted-foreground text-[11.5px] font-normal tabular-nums">{preview.count}</span>
            </div>
            <p className="text-fd-muted-foreground mt-0.5 truncate text-[12.5px]">{preview.description}</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Pills options={preview.filters} active={0} />
          <span className="bg-fd-primary text-fd-primary-foreground flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-semibold">
            <Plus className="size-3.5" />
            {preview.create}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {preview.items.map((plan) => (
          <article
            key={plan.name}
            className={`flex flex-col gap-3.5 rounded-[20px] border p-4 ${
              plan.badges.some((badge) => badge.tone === 'accent')
                ? 'border-fd-primary/30 bg-fd-primary/[0.05]'
                : 'border-white/[0.08] bg-white/[0.03]'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <span className="bg-fd-primary/10 text-fd-primary flex size-9 shrink-0 items-center justify-center rounded-full">
                <Layers className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="truncate text-[15px] font-bold">{plan.name}</span>
                  {plan.badges.map((badge) => (
                    <Badge key={badge.label} tone={badge.tone}>
                      {badge.label}
                    </Badge>
                  ))}
                </div>
                <p className="text-fd-muted-foreground truncate font-mono text-[11.5px]">{plan.code}</p>
              </div>
              <span className="text-fd-muted-foreground -mt-0.5 -mr-1 flex">
                <GripVertical className="size-4" />
                <MoreVertical className="size-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-fd-muted-foreground text-[12px]">{preview.priceFrom}</span>
              <span className="text-[26px] font-bold tracking-tight tabular-nums">{plan.price}</span>
              <span className="text-fd-muted-foreground text-[12px]">{plan.per}</span>
            </div>
            <div className="flex flex-col gap-1.5 rounded-[14px] bg-white/[0.035] px-3 py-2.5 text-[12.5px]">
              <span className="flex items-center gap-2">
                <ArrowDownUp className="text-fd-muted-foreground size-3.5 shrink-0" />
                <span className="flex-1">{plan.traffic}</span>
                {plan.strategy && <span className="text-fd-muted-foreground">{plan.strategy}</span>}
              </span>
              <span className="flex items-center gap-2">
                <Smartphone className="text-fd-muted-foreground size-3.5 shrink-0" />
                {plan.devices}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {plan.durations.map((duration) => (
                <Tag key={duration}>{duration}</Tag>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
              <Badge tone={plan.restricted ? 'violet' : 'neutral'}>{plan.availability}</Badge>
              <span className="bg-fd-primary relative h-6 w-10 shrink-0 rounded-full">
                <span className="absolute top-0.5 right-0.5 size-5 rounded-full bg-white shadow" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const eventIcons: Record<Preview['events']['rows'][number]['kind'], LucideIcon> = {
  purchase: CreditCard,
  renew: RefreshCw,
  promocode: TicketPercent,
  login: LogIn,
  register: UserPlus,
  plan: Package,
};

function Events({ preview }: { preview: Preview['events'] }) {
  const filterIcons = [Filter, Calendar, Calendar];
  const grid = 'grid grid-cols-[minmax(0,1.2fr)_64px_16px] md:grid-cols-[1.2fr_170px_1fr_140px_16px] items-center gap-4';

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex items-end gap-3">
          <SearchField label={preview.search.label} value={preview.search.value} />
          {preview.filters.map((filter, i) => (
            <Select key={filter.label} label={filter.label} value={filter.value} icon={filterIcons[i]} placeholder={i > 0} />
          ))}
        </div>
      </Card>
      <Card>
        <div className={`${grid} ${listHead}`}>
          <span>{preview.columns.event}</span>
          <span>{preview.columns.time}</span>
          <span className="hidden md:block">{preview.columns.actor}</span>
          <span className="hidden md:block">{preview.columns.ip}</span>
          <span />
        </div>
        <GroupToggle label={preview.group.label} count={preview.group.count} />
        <div className={listBody}>
          {preview.rows.map((row) => {
            const Icon = eventIcons[row.kind];
            return (
              <div key={`${row.event}-${row.time}`} className={`${grid} ${listRow}`}>
                <span className="flex min-w-0 items-center gap-3 text-[13.5px] font-medium">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                    <Icon className="size-4" />
                  </span>
                  <span className="truncate">{row.event}</span>
                </span>
                <span className="text-[13px] tabular-nums">{row.time}</span>
                <span className="hidden truncate text-[12.5px] md:block">{row.actor}</span>
                <span className="hidden truncate font-mono text-[12.5px] md:block">{row.ip}</span>
                <ChevronRight className="text-fd-muted-foreground size-4" />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function Header({ preview, title, refresh }: { preview: Preview['header']; title: string; refresh: boolean }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2.5">
        <span className="text-[21px] font-bold tracking-tight">{title}</span>
        {refresh && (
          <span className="border-fd-border text-fd-muted-foreground flex size-8 items-center justify-center rounded-full border bg-white/[0.05]">
            <RefreshCw className="size-[15px]" />
          </span>
        )}
      </div>
      <div className="hidden flex-1 items-center justify-end gap-3.5 lg:flex">
        <div className="border-fd-border text-fd-muted-foreground flex h-9 w-full max-w-80 min-w-40 items-center gap-2 rounded-full border bg-white/[0.05] px-3.5 text-[13px]">
          <Search className="size-4 shrink-0" />
          {preview.search}
        </div>
        <span className="border-fd-border text-fd-muted-foreground flex h-9 items-center gap-1.5 rounded-full border bg-white/[0.05] px-3 text-[12.5px] font-semibold">
          <Languages className="size-4" />
          {preview.language}
        </span>
        <span className="border-fd-border text-fd-muted-foreground flex size-9 items-center justify-center rounded-full border bg-white/[0.05]">
          <Bell className="size-[17px]" />
        </span>
        <span className="border-fd-border flex h-9 items-center gap-2.5 border-l pl-3.5">
          <span className="bg-fd-foreground text-fd-background flex size-8.5 items-center justify-center rounded-full text-[12px] font-bold">
            {preview.login.slice(0, 2).toUpperCase()}
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-semibold">{preview.login}</span>
            <span className="text-fd-muted-foreground block text-[11.5px]">{preview.role}</span>
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
      return <Plans preview={preview.plans} title={preview.titles.plans} />;
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
        <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/[0.05] p-1">
          {screens.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={key === screen}
              onClick={() => setScreen(key)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                key === screen ? 'bg-fd-accent text-fd-primary' : 'text-fd-muted-foreground hover:text-fd-foreground'
              }`}
            >
              {preview.titles[key]}
            </button>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="relative flex gap-2 p-2 text-left select-none sm:p-3">
        <div className="border-fd-border absolute inset-0 rounded-[2rem] border bg-black/15" style={fade} />

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
              <Icon className="size-[17px]" />
            </span>
          ))}
        </div>

        <div
          className="glass relative flex h-[36rem] min-w-0 flex-1 flex-col gap-5 overflow-hidden px-4 py-4 sm:px-6 sm:py-5"
          style={fade}
        >
          <Header preview={preview.header} title={preview.titles[screen]} refresh={screen === 'overview'} />
          <div key={screen} className="preview-screen-in">
            {renderScreen(preview, screen)}
          </div>
        </div>
      </div>
    </div>
  );
}
