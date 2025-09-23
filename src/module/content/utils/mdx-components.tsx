import { LocaleLink } from "@i18n/routing";
import { slugifyHeadline } from "@/utils/format-content";
import type { MDXComponents } from "mdx/types";
import type { ImageProps } from "next/image";
import Image from "next/image";
import { PreviewValueCard } from "@/components/shared/pages/shared/page/preview-value-card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { getImageUrl } from "@/utils/base-url";
import { cn } from "@/utils";
import { Link } from "@/components/ui/link";
import { siteConfig } from "@/data/config";
import { routes } from "@/data/routes";

export const mdxComponents = {
  a: (props) => {
    const { href, children, ...rest } = props;
    const isInternalLink =
      href && (href.startsWith("/") || href.startsWith("#"));

    return isInternalLink ? (
      <LocaleLink href={href} {...rest} className="underline">
        {children}
      </LocaleLink>
    ) : (
      <a
        target="_blank"
        className="underline"
        rel="noopener noreferrer"
        href={href}
        {...rest}
      >
        {children}
      </a>
    );
  },
  img: (props) =>
    props.src ? (
      <Image
        {...(props as ImageProps)}
        src={getImageUrl(props.src as string)}
        width={2000}
        height={2000}
        alt={props.alt || ""}
        className="w-full h-auto rounded-lg pointer-events-none mb-6 md:mb-12"
        loading="lazy"
      />
    ) : null,
  h1: ({ children, ...rest }) => (
    <h1
      id={slugifyHeadline(children as string)}
      className="mb-6 font-bold text-4xl leading-[120%]"
      {...rest}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...rest }) => (
    <h2
      id={slugifyHeadline(children as string)}
      className="mb-4 font-bold text-2xl leading-[120%]"
      {...rest}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...rest }) => (
    <h3
      id={slugifyHeadline(children as string)}
      className="mb-4 font-bold text-xl leading-[120%]"
      {...rest}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...rest }) => (
    <h4
      id={slugifyHeadline(children as string)}
      className="mb-4 font-bold text-lg leading-[120%]"
      {...rest}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...rest }) => (
    <h5
      id={slugifyHeadline(children as string)}
      className="mb-4 font-bold text-base leading-[120%]"
      {...rest}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...rest }) => (
    <h6
      id={slugifyHeadline(children as string)}
      className="mb-4 font-bold text-sm leading-[120%]"
      {...rest}
    >
      {children}
    </h6>
  ),
  p: ({ children, ...rest }) => (
    <p className="mb-6 text-foreground/70 leading-relaxed" {...rest}>
      {children}
    </p>
  ),
  span: ({ children, ...rest }) => <span {...rest}>{children}</span>,
  blockquote: ({ children, ...rest }) => (
    <blockquote
      {...rest}
      className="mb-6 squircle-b-base p-2 md:p-3 squircle squircle-2xl md:squircle-4xl"
    >
      <div className="flex flex-col not-italic squircle-sh-white/100 p-2 md:p-4 squircle squircle-xl md:squircle-3xl [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </blockquote>
  ),
  ul: ({ children, ...rest }) => (
    <ul className="mb-6 list-inside list-disc space-y-2 pl-4" {...rest}>
      {children}
    </ul>
  ),
  ol: ({ children, ...rest }) => (
    <ol className="mb-6 list-inside list-decimal space-y-2 pl-4" {...rest}>
      {children}
    </ol>
  ),
  li: ({ children, ...rest }) => (
    <li className="[&_p]:mb-0 [&_p]:inline " {...rest}>
      {children}
    </li>
  ),
  table: ({ children, ...rest }) => (
    <div className="overflow-x-auto">
      <table
        className="mb-6 w-full rounded-xl border border-zinc-300"
        {...rest}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...rest }) => (
    <thead className="bg-b-base border border-zinc-300 rounded-t-2xl" {...rest}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...rest }) => (
    <tbody
      className="divide-y divide-zinc-200 border border-zinc-300 rounded-b-2xl"
      {...rest}
    >
      {children}
    </tbody>
  ),
  tr: ({ children, ...rest }) => <tr {...rest}>{children}</tr>,
  th: ({ children, ...rest }) => (
    <th
      className="px-4 py-2 text-b-white-foreground font-medium text-left align-top h-min border-b border-l border-zinc-300"
      {...rest}
    >
      {children}
    </th>
  ),
  td: ({ children, ...rest }) => (
    <td
      className="px-4 py-2 text-b-white-invert-sec align-top h-min border-b border-l border-b-base-accent"
      {...rest}
    >
      {children}
    </td>
  ),
} satisfies MDXComponents;

export const mdxCustomComponents = {
  SectionLayout,
  PreviewValueCard,
  SmartSection,
  Highlight,
} satisfies MDXComponents;

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "p-1 py-0.5 bg-violet-200 text-b-white-unchanged rounded-md font-medium font-bold",
        className
      )}
    >
      {children}
    </span>
  );
}

export const richTextComponent = {
  p: (chunks: React.ReactNode) => <p className="relative">{chunks}</p>,
  strike: (chunks: React.ReactNode) => (
    <span className="relative line-through">{chunks}</span>
  ),
  strong: (chunks: React.ReactNode) => (
    <span className="relative font-bold">{chunks}</span>
  ),
  thin: (chunks: React.ReactNode) => (
    <span className="relative font-light">{chunks}</span>
  ),
  markup: (chunks: React.ReactNode) => (
    <span className="relative">{chunks}</span>
  ),
  highlight: (chunks: React.ReactNode) => <Highlight>{chunks}</Highlight>,
  blog: (chunks: React.ReactNode) => (
    <Link
      href={routes.thoughts.link}
      variant="ghost"
      className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline px-0"
    >
      {chunks}
    </Link>
  ),
  linkedin: (chunks: React.ReactNode) => (
    <Link
      href={siteConfig.links.contact.social.linkedin.url}
      variant="ghost"
      className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline ps-0"
    >
      {chunks}
    </Link>
  ),
  newsletter: (chunks: React.ReactNode) => (
    <Link
      href={routes.newsletter.link}
      variant="ghost"
      className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline ps-0"
    >
      {chunks}
    </Link>
  ),
  youtube: (chunks: React.ReactNode) => (
    <Link
      href={siteConfig.links.contact.social.youtube.url}
      variant="ghost"
      className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline ps-0"
    >
      {chunks}
    </Link>
  ),
  ytSaasLab: (chunks: React.ReactNode) => (
    <Link
      href={siteConfig.links.contact.socialConcept.youtube.shirosaasLab.url}
      variant="ghost"
      className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline ps-0"
    >
      {chunks}
    </Link>
  ),
  br: () => <br aria-hidden="true" />,
};

/* Component that hides if title is empty */
export function SmartSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  // Do not display if title is empty or undefined
  if (!title?.trim()) return null;

  return (
    <SectionLayout title={title} description={description}>
      {children}
    </SectionLayout>
  );
}