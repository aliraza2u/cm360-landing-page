import { APP_GET_STARTED, BRAND } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { HeroProductVisual } from "@/components/mockups/hero-product-visual";

const confidence = [
  "All-in-one platform",
  "Easy to use",
  "Built for construction",
] as const;

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

export function HeroSection() {
  return (
    <section className="hero-cinematic relative z-[1] isolate -mt-[var(--header-h)] overflow-x-clip text-white">
      {/* z-0: WebP background — always behind content */}
      <div className="hero-cinematic-bg" aria-hidden />

      {/* z-1: left/mobile readability gradient */}
      <div className="hero-cinematic-overlay" aria-hidden />

      {/* z-10: hero content — pad clears the visible wave */}
      <div className="container-page relative z-10 pb-16 pt-[calc(var(--header-h)+2.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+3.25rem)] lg:min-h-[min(100svh,52rem)] lg:pb-24 xl:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-10">
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
              <Button href="#how-it-works" variant="onDarkOutline" className="gap-2">
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

      {/*
        Curved hero footer:
        - original pronounced wave path (visible curve)
        - fill matches Problem section (#F4FAFF)
        - bleeds into next section so no light “valley”
      */}
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
