const audiences = [
  {
    title: "Builders",
    body: "Coordinate jobs, teams and costs without juggling separate tools.",
  },
  {
    title: "Construction Companies",
    body: "Standardize how projects, payments and operations are managed company-wide.",
  },
  {
    title: "Contractors",
    body: "Track work, labour and payments with clarity across every engagement.",
  },
  {
    title: "Project Managers",
    body: "See project status, expenses and site activity in one workspace.",
  },
] as const;

export function AudienceSection() {
  return (
    <section
      id="who-its-for"
      className="section-pad bg-white"
      aria-labelledby="audience-heading"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Who it&apos;s for</p>
            <h2 id="audience-heading" className="section-title mt-3">
              Built for the people who run construction work
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:pb-1">
            Whether you manage one site or a growing company, CM360 is designed for day-to-day
            construction operations — not generic project software.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {audiences.map((item, index) => (
            <article key={item.title}>
              <span className="text-xs font-bold tracking-[0.1em] text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
