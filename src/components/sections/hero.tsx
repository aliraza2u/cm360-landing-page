import { APP_GET_STARTED, BRAND } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { HeroProductVisual } from "@/components/mockups/hero-product-visual";

const confidence = [
  "All-in-one platform",
  "Easy to use",
  "Built for construction",
] as const;

const confidenceMobile = ["All-in-one", "Easy to use", "For construction"] as const;

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="#22C55E" />
      <path
        d="M4.75 8.25 6.9 10.4 11.25 5.75"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.2 6.8v6.4L13.6 10 8.2 6.8Z" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusDot() {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden>
      <span className="hero-status-ping absolute inset-0 rounded-full bg-cyan" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan shadow-[0_0_0_1px_rgba(255,255,255,0.35)]" />
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="hero-cinematic relative z-[1] isolate -mt-[var(--header-h)] overflow-x-clip text-white">
      <div className="hero-cinematic-bg" aria-hidden />
      <div className="hero-cinematic-overlay" aria-hidden />

      <div className="container-page relative z-10 pb-12 pt-[calc(var(--header-h)+1rem)] md:pb-20 md:pt-[calc(var(--header-h)+3.25rem)] lg:min-h-[min(100svh,52rem)] lg:pb-24 xl:pb-28">
        {/* ——— Mobile (< lg): product-led, tighter stack ——— */}
        <div className="flex flex-col gap-4 lg:hidden">
          <p className="inline-flex max-w-full items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/85">
            <StatusDot />
            <span className="hero-badge-breathe truncate">{BRAND.product}</span>
          </p>

          <h1 className="text-[1.7rem] font-extrabold leading-[1.12] tracking-[-0.04em] text-white min-[390px]:text-[1.85rem]">
            Run your construction business{" "}
            <span className="text-gradient">from one place</span>
          </h1>

          <div className="mx-auto w-full max-w-[20rem] pt-1 min-[390px]:max-w-[21.5rem]">
            <HeroProductVisual />
          </div>

          <p className="text-[0.875rem] leading-relaxed text-white/72">
            Manage projects, clients, labour, payments and expenses — so you always know
            what&apos;s happening.
          </p>

          <div className="flex items-center gap-2.5">
            <Button
              href={APP_GET_STARTED}
              variant="primary"
              className="h-11 flex-1 gap-1.5 px-3 text-[0.8125rem]"
            >
              Get Started
              <ArrowIcon className="h-3.5 w-3.5" />
            </Button>
            <Button
              href="#multi-device"
              variant="onDarkOutline"
              className="h-11 flex-1 gap-1.5 px-3 text-[0.8125rem]"
            >
              <PlayIcon className="h-3.5 w-3.5" />
              How it works
            </Button>
          </div>

          <ul
            className="flex items-center justify-between gap-2 pt-1 text-[0.68rem] font-medium text-white/75 min-[390px]:text-[0.72rem]"
            aria-label="Why CM360"
          >
            {confidenceMobile.map((item) => (
              <li key={item} className="inline-flex min-w-0 items-center gap-1">
                <CheckIcon className="h-3 w-3 shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ——— Desktop / laptop: unchanged composition ——— */}
        <div className="hidden items-center gap-12 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-10">
          <div className="relative z-10 max-w-xl">
            <p className="animate-rise inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/95 backdrop-blur-sm">
              {BRAND.product}
            </p>

            <h1 className="mt-5 animate-rise-delay-1 text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white">
              Run Your Construction Business{" "}
              <span className="text-gradient">From One Place</span>
            </h1>

            <p className="mt-5 animate-rise-delay-2 text-[clamp(0.95rem,1.5vw,1.125rem)] leading-[1.7] text-white/78">
              CM360 helps you manage projects, clients, labour, contractors, payments, expenses
              and more — so you always know what&apos;s happening across your construction
              business.
            </p>

            <div className="mt-8 flex animate-rise-delay-2 flex-wrap items-center gap-3">
              <Button href={APP_GET_STARTED} variant="primary" className="gap-2 px-6">
                Get Started
                <ArrowIcon className="h-4 w-4" />
              </Button>
              <Button href="#multi-device" variant="onDarkOutline" className="gap-2">
                <PlayIcon className="h-4 w-4" />
                See How It Works
              </Button>
            </div>

            <ul
              className="mt-8 flex animate-rise-delay-3 flex-wrap gap-2.5"
              aria-label="Why CM360"
            >
              {confidence.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm"
                >
                  <CheckIcon className="h-4 w-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade relative z-10 lg:pl-2">
            <HeroProductVisual />
          </div>
        </div>
      </div>

      <div
        className="hero-wave pointer-events-none relative z-20 -mb-10 h-16 w-full md:-mb-12 md:h-20 lg:-mb-14 lg:h-24"
        aria-hidden
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 22C280 88 520 92 800 48C1080 8 1320 18 1600 58V100H0Z"
            fill="#F4FAFF"
          />
        </svg>
      </div>
    </section>
  );
}
