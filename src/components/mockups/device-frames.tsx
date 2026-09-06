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

/** Lightweight browser chrome — used outside the hero. */
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
      className={`overflow-hidden rounded-[24px] border border-white/50 bg-white shadow-[0_28px_80px_rgba(8,36,82,0.22)] ring-1 ring-black/[0.04] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] px-3.5 py-2.5">
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-[72%] flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200/90 bg-white/90 px-3 py-1">
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 720px"
          className="h-auto w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

type LaptopFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

/**
 * MacBook Pro–style frame.
 * Thin dark lid bezel, tiny webcam, aluminum base wider than the display.
 * Screenshot fills the screen edge-to-edge (no notch covering UI).
 */
export function LaptopFrame({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  unoptimized = false,
}: LaptopFrameProps) {
  return (
    <div className={`relative mx-auto w-full ${className}`}>
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[20%] -z-10 h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,199,232,0.32),transparent_68%)] blur-3xl"
        aria-hidden
      />

      {/* ——— Lid ——— */}
      <div
        className="relative z-10 mx-auto w-[92%] overflow-hidden rounded-[12px] shadow-[0_24px_64px_rgba(2,16,40,0.48),0_4px_12px_rgba(2,16,40,0.28)] sm:rounded-[14px] md:rounded-[16px]"
        style={{
          background:
            "linear-gradient(165deg, #3a3f46 0%, #1c1f24 18%, #0d0f12 55%, #181b20 100%)",
          boxShadow:
            "0 24px 64px rgba(2,16,40,0.48), 0 4px 12px rgba(2,16,40,0.28), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.45)",
        }}
      >
        {/* Outer aluminum rim highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[12px] ring-1 ring-white/10 sm:rounded-[14px] md:rounded-[16px]"
          aria-hidden
        />

        {/* Bezel padding around the display */}
        <div className="relative px-[1.15%] pb-[1.15%] pt-[2.35%]">
          {/* Webcam — sits in top bezel, does not cover the screenshot */}
          <div
            className="pointer-events-none absolute left-1/2 top-[0.85%] z-20 flex -translate-x-1/2 items-center justify-center"
            aria-hidden
          >
            <span className="relative flex h-[7px] w-[7px] items-center justify-center rounded-full bg-[#0a0a0c] ring-1 ring-black/80 sm:h-2 sm:w-2">
              <span className="h-[3px] w-[3px] rounded-full bg-[#1e3a5f] shadow-[0_0_3px_rgba(56,120,200,0.45)] sm:h-[4px] sm:w-[4px]" />
            </span>
          </div>

          {/* Display */}
          <div className="relative overflow-hidden rounded-[4px] bg-[#05070a] ring-1 ring-black/70 sm:rounded-[5px] md:rounded-[6px]">
            {/* Subtle inner screen edge */}
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] sm:rounded-[5px] md:rounded-[6px]"
              aria-hidden
            />
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              unoptimized={unoptimized}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 720px"
              className="relative z-0 block h-auto w-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* ——— Base / chassis ——— */}
      <div className="relative z-0 -mt-px w-full" aria-hidden>
        {/* Hinge strip */}
        <div
          className="relative mx-auto h-[6px] w-[92.4%] sm:h-[7px] md:h-2"
          style={{
            background:
              "linear-gradient(180deg, #6b7280 0%, #4b5563 35%, #374151 70%, #1f2937 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          {/* Center hinge recess */}
          <div
            className="absolute left-1/2 top-0 h-full w-[16%] max-w-[5.5rem] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, #4b5563 0%, #1f2937 100%)",
            }}
          />
        </div>

        {/* Keyboard deck — wider than lid */}
        <div
          className="relative mx-auto h-[10px] w-full rounded-b-[6px] sm:h-3 sm:rounded-b-[8px] md:h-[14px] md:rounded-b-[10px]"
          style={{
            background:
              "linear-gradient(180deg, #d1d5db 0%, #9ca3af 22%, #6b7280 55%, #4b5563 82%, #374151 100%)",
            boxShadow:
              "0 10px 28px rgba(2,16,40,0.32), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 3px rgba(0,0,0,0.2)",
          }}
        >
          {/* Front edge lip */}
          <div
            className="absolute inset-x-[10%] bottom-0 h-[3px] rounded-t-[2px] sm:h-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(55,65,81,0.35) 0%, rgba(31,41,55,0.55) 100%)",
            }}
          />
        </div>

        {/* Bottom perspective shadow under the chassis */}
        <div
          className="mx-auto mt-1 h-2 w-[88%] rounded-[100%] bg-black/35 blur-md sm:h-2.5 sm:blur-lg"
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
  unoptimized?: boolean;
};

/**
 * Clean smartphone frame — no notch / Dynamic Island.
 * Tall portrait aspect matched to the mobile screenshot (~9:19.4).
 */
export function PhoneFrame({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  unoptimized = false,
}: PhoneFrameProps) {
  return (
    <div
      className={`relative w-[10.5rem] sm:w-[11.75rem] md:w-[12.75rem] lg:w-[13.5rem] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.4rem] bg-cyan/25 blur-2xl"
        aria-hidden
      />

      <div
        className="relative rounded-[1.85rem] p-[0.38rem] shadow-[0_28px_60px_rgba(2,24,61,0.5)] ring-1 ring-white/12 sm:rounded-[2rem] sm:p-[0.42rem]"
        style={{
          background:
            "linear-gradient(160deg, #2a3140 0%, #121826 40%, #070b14 100%)",
          boxShadow:
            "0 28px 60px rgba(2,24,61,0.5), inset 0 1px 0 rgba(255,255,255,0.14)",
        }}
      >
        {/* Side buttons */}
        <span
          className="pointer-events-none absolute -left-[2px] top-[18%] h-7 w-[2px] rounded-l-full bg-[#3f4b5f] sm:h-8"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -left-[2px] top-[28%] h-11 w-[2px] rounded-l-full bg-[#3f4b5f] sm:h-12"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -right-[2px] top-[24%] h-14 w-[2px] rounded-r-full bg-[#3f4b5f] sm:h-16"
          aria-hidden
        />

        <div className="relative overflow-hidden rounded-[1.45rem] bg-[#F5F7FB] ring-1 ring-black/30 sm:rounded-[1.6rem]">
          <div className="relative aspect-[9/19.4] w-full overflow-hidden">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              unoptimized={unoptimized}
              sizes="(max-width: 768px) 180px, 220px"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
