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
      className="section-pad relative overflow-hidden surface-blue"
      aria-labelledby="platform-heading"
    >
      <div className="pointer-events-none absolute inset-0 blueprint-overlay" aria-hidden />

      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Connected workflow</p>
          <h2 id="platform-heading" className="section-title mt-3">
            Everything Connected. Nothing Scattered.
          </h2>
          <p className="section-lead mx-auto">
            Information stays organized around the same construction business — instead of living
            in separate spreadsheets and chats.
          </p>
        </div>

        <ol className="mx-auto mt-12 flex max-w-5xl flex-col gap-0 md:flex-row md:flex-wrap md:items-stretch md:justify-center lg:flex-nowrap">
          {flow.map((step, index) => (
            <li key={step.title} className="flex flex-1 items-stretch md:min-w-[9rem]">
              <div className="flex w-full flex-col items-center px-2 py-3 text-center md:px-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-white shadow-[0_8px_20px_rgba(22,119,255,0.28)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm font-bold text-ink md:text-[0.95rem]">{step.title}</p>
                <p className="mt-1 text-xs text-muted">{step.blurb}</p>
              </div>
              {index < flow.length - 1 ? (
                <span
                  className="hidden shrink-0 self-center text-brand lg:inline"
                  aria-hidden
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
