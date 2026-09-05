import { BrowserFrame, PhoneFrame } from "@/components/mockups/device-frames";

const insights = [
  {
    label: "Current Profit",
    hint: "Live",
    tone: "border-emerald-200/80 bg-white/95 text-emerald-700",
    dot: "bg-emerald-500",
  },
  {
    label: "Outstanding",
    hint: "Tracked",
    tone: "border-amber-200/80 bg-white/95 text-amber-700",
    dot: "bg-amber-500",
  },
  {
    label: "Payments",
    hint: "Synced",
    tone: "border-sky-200/80 bg-white/95 text-sky-700",
    dot: "bg-sky-500",
  },
] as const;

export function HeroProductVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[38rem] lg:max-w-none">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand/25 via-indigo/15 to-cyan/25 blur-3xl md:-inset-10"
        aria-hidden
      />

      {/* Blueprint geometry accent */}
      <svg
        className="pointer-events-none absolute -right-3 top-2 hidden h-36 w-36 text-brand/15 lg:block"
        viewBox="0 0 160 160"
        fill="none"
        aria-hidden
      >
        <path d="M30 140V50l50-30 50 30v90" stroke="currentColor" strokeWidth="1.5" />
        <path d="M55 140V75h50v65" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M65 90h10M85 90h10M65 105h10M85 105h10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative">
        <BrowserFrame
          src="/brand/screens/desktop-home.png"
          alt="CM360 desktop dashboard showing financial overview, cash flow and cost breakdown"
          width={1400}
          height={1003}
          priority
          className="relative z-0"
        />

        {/* Mobile overlay */}
        <div className="pointer-events-none absolute -bottom-5 left-2 z-20 sm:left-3 md:-bottom-6 md:left-0 lg:-left-8 xl:-left-10">
          <PhoneFrame
            src="/brand/screens/mobile-home.png"
            alt="CM360 mobile home screen with projects, quick actions and attendance"
            width={780}
            height={1684}
            priority
            className="animate-float drop-shadow-2xl"
          />
        </div>

        {/* Floating insight chips — labels only, matching real dashboard concepts */}
        <div className="pointer-events-none absolute -right-1 top-10 z-20 hidden flex-col gap-2.5 sm:flex md:top-12 lg:-right-3">
          {insights.map((chip, i) => (
            <div
              key={chip.label}
              className={`insight-chip flex items-center gap-2 rounded-xl border px-3 py-2 shadow-md backdrop-blur-md ${chip.tone} ${
                i === 1 ? "animate-float-delay" : "animate-float"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${chip.dot}`} aria-hidden />
              <span className="text-[11px] font-semibold tracking-tight">{chip.label}</span>
              <span className="text-[10px] font-medium opacity-60">{chip.hint}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer so overlapping phone doesn't collide with next section on small screens */}
      <div className="h-8 sm:h-10 md:h-6" aria-hidden />
    </div>
  );
}
