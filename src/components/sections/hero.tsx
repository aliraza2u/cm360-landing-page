import { Button } from "@/components/ui/button";
import { HeroProductVisual } from "@/components/mockups/hero-product-visual";
import { APP_GET_STARTED, BRAND } from "@/lib/site";

const managedItems = [
  "Projects",
  "Clients",
  "Payments",
  "Expenses",
  "Vendors",
  "Contractors",
  "Labour",
  "Payroll",
  "Reports",
] as const;

export function HeroSection() {
  return (
    <section className="hero-surface relative overflow-x-clip border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-70" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-indigo/15 blur-3xl" />

      <div className="container-page relative section-pad !pb-14 !pt-9 md:!pb-16 md:!pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-10">
          <div className="max-w-xl">
            <p className="eyebrow animate-rise">
              <span className="inline-flex h-5 items-center rounded-full bg-gradient-to-r from-brand to-cyan px-2 text-[10px] font-bold tracking-wide text-white">
                {BRAND.name}
              </span>
              {BRAND.product}
            </p>

            <h1 className="font-display mt-4 animate-rise-delay-1 text-[clamp(2rem,4.8vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-ink">
              Run Your Construction Business{" "}
              <span className="text-gradient">From One Place</span>
            </h1>

            <p className="mt-4 animate-rise-delay-2 text-[0.98rem] leading-relaxed text-muted md:text-lg">
              Track projects, clients, labour, contractors, payments and expenses — and always
              know what is happening across your construction business.
            </p>

            <p className="mt-3 animate-rise-delay-2 text-sm font-medium text-ink-secondary">
              From site activity to company finances, manage your construction business from one
              place.
            </p>

            <div className="mt-7 flex animate-rise-delay-2 flex-wrap items-center gap-3">
              <Button href={APP_GET_STARTED} className="px-6">
                Get Started
              </Button>
              <Button href="#how-it-works" variant="secondary">
                See How It Works
              </Button>
            </div>

            <ul
              className="mt-7 flex animate-rise-delay-3 flex-wrap gap-2"
              aria-label="What CM360 manages"
            >
              {managedItems.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-brand/15 bg-white/75 px-3 py-1 text-[11px] font-semibold text-ink-secondary shadow-sm backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade lg:pl-2">
            <HeroProductVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
