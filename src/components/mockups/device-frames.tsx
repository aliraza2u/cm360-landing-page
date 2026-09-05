import Image from "next/image";

type BrowserFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  url?: string;
};

export function BrowserFrame({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  url = "app.cm360.site",
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-[16px] border border-white/60 bg-white shadow-[0_24px_60px_rgba(11,31,58,0.14),0_8px_20px_rgba(47,128,237,0.12)] ring-1 ring-black/[0.04] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] px-3 py-2.5">
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-sm" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-sm" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-sm" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-[72%] flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200/90 bg-white/90 px-3 py-1 shadow-inner">
          <svg
            className="h-3 w-3 shrink-0 text-emerald-600"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3Zm1.5 5V4a1.5 1.5 0 0 0-3 0v2h3Z" />
          </svg>
          <span className="truncate text-[11px] font-medium text-slate-500">{url}</span>
        </div>
        <div className="hidden w-10 shrink-0 sm:block" aria-hidden />
      </div>
      <div className="relative bg-[#f5f7fb]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 640px"
          className="h-auto w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

type PhoneFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function PhoneFrame({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: PhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto w-[9.75rem] sm:w-[10.75rem] md:w-[11.5rem] ${className}`}
    >
      {/* Soft glow behind phone */}
      <div
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.2rem] bg-brand/25 blur-2xl"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-[1.65rem] border-[5px] border-[#0f172a] bg-[#0f172a] shadow-[0_20px_50px_rgba(15,23,42,0.35)] ring-1 ring-white/10">
        <div className="relative aspect-[9/19.2] overflow-hidden rounded-[1.3rem] bg-[#F5F7FB]">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes="(max-width: 768px) 180px, 200px"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
