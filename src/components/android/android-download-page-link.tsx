"use client";

import { useEffect, useRef, useState } from "react";

type AndroidDownloadPageLinkProps = {
  /** Visible label, e.g. cm360.site/download/android */
  label: string;
  /** Canonical absolute URL (matches QR) — copied on click. */
  href: string;
  className?: string;
};

function IconCopy({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCheck({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.5 10.25 8.1 13.75 15.5 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * URL under the QR card — always copies the shareable download-page link.
 * Never navigates away from the current page.
 */
export function AndroidDownloadPageLink({
  label,
  href,
  className = "",
}: AndroidDownloadPageLinkProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback: still stay on-page — select-friendly prompt if clipboard blocked
      window.prompt("Copy this download page link:", href);
      setCopied(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={onCopy}
        className="group inline-flex max-w-full items-start gap-1.5 break-all rounded-md text-left font-medium leading-snug text-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2"
        aria-label={copied ? "Download page link copied" : `Copy download page link ${label}`}
        aria-live="polite"
      >
        <span className="underline-offset-2 group-hover:text-brand group-hover:underline">
          {label}
        </span>
        <IconCopy className="mt-0.5 h-3 w-3 shrink-0 opacity-70 group-hover:text-brand group-hover:opacity-100" />
      </button>

      <div
        className={`pointer-events-none absolute left-0 top-[calc(100%+0.35rem)] z-30 transition-all duration-200 ${
          copied
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        aria-hidden={!copied}
      >
        <p
          role="status"
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/90 bg-emerald-50 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[-0.01em] text-emerald-800 shadow-sm"
        >
          <IconCheck className="h-3 w-3 shrink-0" />
          Link copied
        </p>
      </div>
    </div>
  );
}
