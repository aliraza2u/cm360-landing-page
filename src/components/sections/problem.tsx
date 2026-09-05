const scattered = [
  { label: "Notebooks", detail: "Site notes & labour" },
  { label: "WhatsApp", detail: "Approvals & updates" },
  { label: "Spreadsheets", detail: "Payments & expenses" },
  { label: "Separate systems", detail: "Clients & reports" },
] as const;

export function ProblemSection() {
  return (
    <section className="section-pad bg-white" aria-labelledby="problem-heading">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Problem → Solution</p>
          <h2 id="problem-heading" className="section-title mt-3">
            Construction work shouldn’t live in five places
          </h2>
          <p className="section-lead mx-auto">
            Projects, labour, contractor records, payments and expenses are often spread across
            notebooks, WhatsApp and spreadsheets.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="rounded-[1.35rem] border border-border bg-[#f8fafc] p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-soft">
              Before
            </p>
            <p className="mt-2 font-display text-lg font-bold text-ink">Scattered tools</p>
            <ul className="mt-5 space-y-3">
              {scattered.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-3 rounded-xl border border-dashed border-slate-300/80 bg-white/80 px-3 py-2.5"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                  <span>
                    <span className="block text-sm font-semibold text-ink-secondary">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted">{item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center" aria-hidden>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan text-sm font-bold text-white shadow-md">
              →
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.35rem] border border-brand/20 bg-gradient-to-br from-brand-wash via-white to-cyan-soft/40 p-5 shadow-md md:p-6">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand/10 blur-2xl" />
            <p className="text-xs font-bold uppercase tracking-wider text-brand-deep">After</p>
            <p className="mt-2 font-display text-lg font-bold text-ink">
              CM360 brings everything together
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              One connected place for projects, clients, site teams, contractors, payments,
              expenses and reports — so owners always know what is happening.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Projects", "People", "Money", "Reports"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-deep shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
