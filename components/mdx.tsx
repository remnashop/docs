import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion as BaseAccordion, Accordions as BaseAccordions } from 'fumadocs-ui/components/accordion';
import { Tab, Tabs as BaseTabs } from 'fumadocs-ui/components/tabs';
import { Heading } from 'fumadocs-ui/components/heading';
import { CircleCheck, CircleX, Info, Lightbulb, TriangleAlert, icons as lucideIcons, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { sectionId } from '@/lib/section-toc';
import { Method, MethodSwitch } from '@/components/install-method';

// The dashboard's tones: a tinted tile with the icon in a circle, like its attention rows.
const calloutTones: Record<string, { tile: string; icon: string; Icon: LucideIcon }> = {
  info: { tile: 'border-fd-primary/25 bg-fd-primary/[0.05]', icon: 'bg-fd-primary/10 text-fd-primary', Icon: Info },
  idea: { tile: 'border-fd-primary/25 bg-fd-primary/[0.05]', icon: 'bg-fd-primary/10 text-fd-primary', Icon: Lightbulb },
  warning: { tile: 'border-warning/25 bg-warning/[0.06]', icon: 'bg-warning/10 text-warning', Icon: TriangleAlert },
  error: { tile: 'border-error/25 bg-error/[0.06]', icon: 'bg-error/10 text-error', Icon: CircleX },
  success: { tile: 'border-success/25 bg-success/[0.06]', icon: 'bg-success/10 text-success', Icon: CircleCheck },
};

function Callout({ type = 'info', title, children }: { type?: string; title?: ReactNode; children?: ReactNode }) {
  const tone = calloutTones[type === 'warn' ? 'warning' : type === 'tip' ? 'info' : type] ?? calloutTones.info;
  return (
    <div className={`my-4 flex gap-3 rounded-2xl border px-4 py-3 text-sm ${tone.tile}`}>
      <span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${tone.icon}`}>
        <tone.Icon className="size-4" />
      </span>
      {/* gap-1 parts the title from the text; the prose margins between them are dropped */}
      <div className="prose-no-margin flex min-w-0 flex-1 flex-col justify-center gap-1 self-center [&>p.font-semibold]:mb-0 [&>p.font-semibold+*]:mt-0">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}

// A yes/no mark for table cells, in the callouts' success and error tones.
function Yes() {
  return <CircleCheck aria-label="✅" className="text-success inline size-4 align-[-3px]" />;
}

function No() {
  return <CircleX aria-label="❌" className="text-error inline size-4 align-[-3px]" />;
}

// Link cards, drawn like the landing's feature tiles: the dashboard's KpiTile icon square
// beside the title, the text under it, the tile brightening on hover like its plan cards.
function Card({
  icon,
  title,
  href,
  external,
  children,
}: {
  icon?: ReactNode;
  title: ReactNode;
  href?: string;
  external?: boolean;
  children?: ReactNode;
}) {
  const body = (
    <>
      <span className="flex items-center gap-3">
        {icon ? (
          <span className="bg-fd-primary/10 text-fd-primary flex size-10 shrink-0 items-center justify-center rounded-xl [&_svg]:size-5">
            {icon}
          </span>
        ) : null}
        <span className="text-[15px] leading-snug font-semibold tracking-tight">{title}</span>
      </span>
      {children ? <span className="text-fd-muted-foreground text-sm">{children}</span> : null}
    </>
  );
  const className =
    'flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-white/[0.16] hover:bg-white/[0.05]';

  if (!href) return <div className={className}>{body}</div>;
  return external ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
      {body}
    </a>
  ) : (
    <Link href={href} className={className}>
      {body}
    </Link>
  );
}

// A grid sized by the article's own width, not the screen's (the card beside the sidebar
// can be narrow on a wide screen); the className a page passes (a fixed column count) is
// ignored, so three cards don't get squeezed in.
function Cards({ children }: { children?: ReactNode; className?: string }) {
  return (
    <div className="not-prose @container my-4">
      <div className="grid gap-3 @md:grid-cols-2 @2xl:grid-cols-3 @md:[&>:last-child:nth-child(odd)]:col-span-2 @2xl:[&>:last-child:nth-child(odd)]:col-span-1">{children}</div>
    </div>
  );
}

// One version on the changelog: a dashboard tile around its heading and notes. `current`
// marks the latest release in the accent, like the dashboard's highlighted KpiTile.
function Release({ current = false, children }: { current?: boolean; children?: ReactNode }) {
  return (
    <section
      className={`my-6 rounded-2xl border px-5 py-1 sm:px-6 [&>h2:first-child]:mt-5 ${
        current
          ? 'border-fd-primary/25 bg-fd-accent/60 [&>h2:first-child]:text-fd-primary'
          : 'border-white/[0.08] bg-white/[0.03]'
      }`}
    >
      {children}
    </section>
  );
}

// A dashboard settings card: CardHeader (an icon in a glass circle, the title, a muted
// description), a rule across the card, then the content.
function Section({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: string;
  children?: ReactNode;
}) {
  const Icon = icon ? lucideIcons[icon as keyof typeof lucideIcons] : undefined;
  return (
    <div className="docs-card my-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="not-prose flex items-center gap-2.5">
        {Icon ? (
          <span className="border-fd-border flex size-8 shrink-0 items-center justify-center rounded-full border bg-white/[0.05]">
            <Icon className="size-4" />
          </span>
        ) : null}
        <div className="min-w-0">
          {/* A real heading, like the article's: it anchors the toc entry and brings the same
              copy-link button on hover. */}
          <Heading as="h2" id={sectionId(title)} className="scroll-mt-[calc(var(--fd-docs-row-3)+0.5rem)] text-sm leading-5 font-bold md:scroll-mt-10">
            {title}
          </Heading>
          {description ? (
            <div className="text-fd-muted-foreground mt-0.5 text-[12.5px] leading-[18px]">{description}</div>
          ) : null}
        </div>
      </div>
      <div className="-mx-4 mt-4 border-t border-white/[0.07]" />
      {children}
    </div>
  );
}

// With a title, the list sits in a Section, like the dashboard's OAuth settings card.
function Accordions({
  title,
  description,
  icon,
  ...props
}: ComponentProps<typeof BaseAccordions> & { title?: string; description?: string; icon?: string }) {
  // Several can stay open at once (Base UI opens one at a time by default); a page can
  // still pass multiple={false}.
  const list = <BaseAccordions multiple {...props} className="docs-accordions" />;
  if (!title) return list;
  return (
    <Section title={title} description={description} icon={icon}>
      {list}
    </Section>
  );
}

// The dashboard's OAuth provider rows put an icon in a circle before the name; `icon` names
// a lucide icon for the same. Fumadocs keys an item by String(title), so the key is passed
// from the plain title before the title becomes markup.
function Accordion({ title, icon, ...props }: ComponentProps<typeof BaseAccordion> & { icon?: string }) {
  const Icon = icon ? lucideIcons[icon as keyof typeof lucideIcons] : undefined;
  return (
    <BaseAccordion
      value={typeof title === 'string' ? title : undefined}
      {...props}
      title={
        Icon ? (
          <>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-fd-foreground">
              <Icon className="size-4" />
            </span>
            {title}
          </>
        ) : (
          title
        )
      }
    />
  );
}

function Tabs(props: ComponentProps<typeof BaseTabs>) {
  return <BaseTabs {...props} className="docs-tabs" />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Callout,
    Card,
    Cards,
    Release,
    Section,
    Yes,
    No,
    Accordion,
    Accordions,
    Tab,
    Tabs,
    Method,
    MethodSwitch,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
