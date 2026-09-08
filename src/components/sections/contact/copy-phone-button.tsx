"use client";

import { useState } from "react";

type CopyPhoneButtonProps = {
  value: string;
};

export function CopyPhoneButton({ value }: CopyPhoneButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#128C7E] transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
