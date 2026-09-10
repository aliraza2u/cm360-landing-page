import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { APP_URL, SITE_URL } from "@/lib/site";

type LegalMarkdownProps = {
  content: string;
};

function isCm360Url(href: string) {
  return (
    href.startsWith(SITE_URL) ||
    href.startsWith(APP_URL) ||
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="section-title mt-3 wrap-break-word text-balance">{children}</h1>
  ),
  h2: ({ id, children }) => (
    <h2
      id={id}
      className="mt-11 scroll-mt-[calc(var(--header-h)+1rem)] text-[1.35rem] font-extrabold tracking-[-0.03em] text-ink md:mt-12 md:text-[1.55rem]"
    >
      {children}
    </h2>
  ),
  h3: ({ id, children }) => (
    <h3
      id={id}
      className="mt-8 scroll-mt-[calc(var(--header-h)+1rem)] text-base font-bold tracking-[-0.02em] text-ink md:mt-9 md:text-lg"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-[0.9375rem] leading-[1.75] text-ink-secondary md:text-base">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.9375rem] leading-[1.75] text-ink-secondary marker:text-brand md:pl-6 md:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[0.9375rem] leading-[1.75] text-ink-secondary marker:font-semibold marker:text-ink md:pl-6 md:text-base">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 [&>ol]:mt-2 [&>p]:mt-2 [&>ul]:mt-2">{children}</li>
  ),
  hr: () => (
    <hr className="my-9 border-0 border-t border-[rgba(22,119,255,0.14)] md:my-11" />
  ),
  a: ({ href, children }) => {
    const url = href ?? "";
    const external = Boolean(url) && !isCm360Url(url);

    return (
      <a
        href={url || undefined}
        className="wrap-break-word font-medium text-brand-deep underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="mt-5 -mx-1 overflow-x-auto overscroll-x-contain rounded-xl border border-[rgba(22,119,255,0.14)] bg-white shadow-sm sm:mx-0">
      <table className="min-w-full border-collapse text-left text-sm md:text-[0.9375rem]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-brand-wash/80 text-ink">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="bg-white">{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-[rgba(22,119,255,0.1)] last:border-b-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="whitespace-nowrap px-3.5 py-3 align-top text-left text-xs font-bold uppercase tracking-[0.06em] text-ink sm:px-4 sm:py-3.5 md:text-[0.8125rem]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="min-w-40 px-3.5 py-3 align-top leading-relaxed text-ink-secondary sm:min-w-48 sm:px-4 sm:py-3.5">
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-2 border-brand/40 pl-4 text-ink-secondary">
      {children}
    </blockquote>
  ),
};

export function LegalMarkdown({ content }: LegalMarkdownProps) {
  return (
    <div className="legal-markdown min-w-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
