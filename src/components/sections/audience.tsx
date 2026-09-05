const audiences = [
  {
    title: "Builders",
    body: "Coordinate jobs, teams and costs without juggling separate tools.",
    accent: "from-brand to-cyan",
  },
  {
    title: "Construction Companies",
    body: "Standardize how projects, payments and operations are managed company-wide.",
    accent: "from-indigo to-brand",
  },
  {
    title: "Contractors",
    body: "Track work, labour and payments with clarity across every engagement.",
    accent: "from-cyan to-brand-deep",
  },
  {
    title: "Project Managers",
    body: "See project status, expenses and site activity in one workspace.",
    accent: "from-brand-deep to-indigo",
  },
] as const;

export function AudienceSection() {
  return (
    <section
      id="who-its-for"
      className="section-pad soft-surface"
      aria-labelledby="audience-heading"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Who it’s for</p>
            <h2 id="audience-heading" className="section-title mt-3">
              Built for the people who run construction work
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:pb-1">
            Whether you manage one site or a growing company, CM360 is designed for day-to-day
            construction operations — not generic project software.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-border/80 bg-white/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md"
            >
              <div
                className={`mb-4 h-1 w-10 rounded-full bg-gradient-to-r ${item.accent} transition-all group-hover:w-14`}
                aria-hidden
              />
              <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
