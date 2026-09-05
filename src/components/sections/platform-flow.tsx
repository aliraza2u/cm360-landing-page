const flow = [
  { title: "Client", blurb: "Relationships & jobs" },
  { title: "Project", blurb: "Scope & progress" },
  { title: "Labour & Contractors", blurb: "People on site" },
  { title: "Expenses & Payments", blurb: "Money in & out" },
  { title: "Reports", blurb: "Business clarity" },
] as const;

export function PlatformFlowSection() {
  return (
    <section
      id="how-it-works"
      className="section-pad soft-surface relative overflow-hidden"
      aria-labelledby="platform-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent" />
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">How CM360 connects the business</p>
          <h2 id="platform-heading" className="section-title mt-3">
            Everything Connected. Nothing Scattered.
          </h2>
          <p className="section-lead mx-auto">
            Information stays organized around the same construction business — instead of living
            in separate spreadsheets and chats.
          </p>
        </div>

        <ol className="mx-auto mt-12 flex max-w-5xl flex-col gap-3 md:flex-row md:flex-wrap md:items-stretch md:justify-center lg:flex-nowrap lg:gap-2">
          {flow.map((step, index) => (
            <li key={step.title} className="flex flex-1 items-center gap-2 md:min-w-[9.5rem]">
              <div className="group w-full rounded-2xl border border-brand/15 bg-white/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan px-1.5 text-[10px] font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-sm font-bold text-ink md:text-[0.95rem]">
                  {step.title}
                </p>
                <p className="mt-1 text-xs text-muted">{step.blurb}</p>
              </div>
              {index < flow.length - 1 ? (
                <span
                  className="hidden shrink-0 text-brand-bright lg:inline"
                  aria-hidden
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-muted">
          From the first client conversation to final reports, CM360 keeps the construction
          workflow linked so owners, managers and site teams share the same source of truth.
        </p>
      </div>
    </section>
  );
}
