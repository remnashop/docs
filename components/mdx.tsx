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
import { GitHubIcon } from '@/components/icons/github';
import { gitConfig } from '@/lib/shared';

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

function Yes() {
  return <CircleCheck aria-label="✅" className="text-success inline size-4 align-[-3px]" />;
}

function No() {
  return <CircleX aria-label="❌" className="text-error inline size-4 align-[-3px]" />;
}

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
          <span className="border-fd-border flex size-9 shrink-0 items-center justify-center rounded-full border bg-white/[0.05] [&_svg]:size-4">
            {icon}
          </span>
        ) : null}
        <span className="text-[15px] leading-snug font-semibold tracking-tight">{title}</span>
      </span>
      {children ? <span className="text-fd-muted-foreground text-sm">{children}</span> : null}
    </>
  );
  const className =
    'glass-panel flex flex-col gap-3 rounded-3xl p-4 transition-[background] hover:bg-white/[0.06]';

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
      <div className="grid gap-5 @md:grid-cols-2 @2xl:grid-cols-3 @md:[&>:last-child:nth-child(odd)]:col-span-2 @2xl:[&>:last-child:nth-child(odd)]:col-span-1">{children}</div>
    </div>
  );
}

const changelogLabel: Record<string, string> = { ru: 'Полный список изменений', en: 'Full changelog' };

// Without a tag the corner link goes to the list of releases.
function Release({
  current = false,
  tag,
  lang,
  children,
}: {
  current?: boolean;
  tag?: string;
  lang: string;
  children?: ReactNode;
}) {
  const href = `https://github.com/${gitConfig.user}/${gitConfig.repo}/releases${tag ? `/tag/${tag}` : ''}`;
  return (
    <section
      className={`glass-panel relative my-5 rounded-3xl px-5 py-1 sm:px-6 [&>h2:first-child]:mt-5 [&>h2:first-child]:pr-12 sm:[&>h2:first-child]:pr-64 ${
        current ? 'bg-fd-accent/60 [&>h2:first-child]:text-fd-primary' : ''
      }`}
    >
      {children}
      {/* after the content, so the heading stays the card's first child */}
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="not-prose border-fd-border text-fd-foreground/90 absolute top-5 right-5 flex h-9 items-center gap-1.5 rounded-full border bg-white/[0.03] px-2.5 text-[13px] font-medium transition-colors hover:bg-white/[0.06] sm:right-6 sm:px-3.5"
      >
        <GitHubIcon className="size-4" />
        <span className="hidden sm:inline">{changelogLabel[lang] ?? changelogLabel.en}</span>
      </a>
    </section>
  );
}

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
    <div className="docs-card glass-panel my-5 rounded-3xl p-4">
      <div className="not-prose flex items-center gap-3">
        {Icon ? (
          <span className="border-fd-border flex size-9 shrink-0 items-center justify-center rounded-full border bg-white/[0.05]">
            <Icon className="size-4" />
          </span>
        ) : null}
        <div className="min-w-0">
          {/* a real heading: it anchors the toc entry and brings the copy-link button */}
          <Heading as="h2" id={sectionId(title)} className="scroll-mt-[calc(var(--fd-docs-row-3)+0.5rem)] text-[15px] leading-5 font-semibold tracking-tight md:scroll-mt-10">
            {title}
          </Heading>
          {description ? (
            <div className="text-fd-muted-foreground mt-0.5 text-[12px] leading-4">{description}</div>
          ) : null}
        </div>
      </div>
      <div className="-mx-4 mt-4 border-t border-white/[0.08]" />
      {children}
    </div>
  );
}

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

// Fumadocs keys an item by String(title), so the key comes from the plain title before it
// becomes markup.
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

// lang: the page's locale, for the labels a component writes itself
export function getMDXComponents(components?: MDXComponents, lang = 'en') {
  return {
    ...defaultMdxComponents,
    Callout,
    Card,
    Cards,
    Release: (props: Omit<ComponentProps<typeof Release>, 'lang'>) => <Release {...props} lang={lang} />,
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
