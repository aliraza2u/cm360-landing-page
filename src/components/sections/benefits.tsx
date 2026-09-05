const benefits = [
  {
    title: "Know Where Your Money Goes",
    body: "Keep project and company costs organized — payments, expenses and labour in one view.",
    accent: "from-brand to-cyan",
  },
  {
    title: "Keep Site Records Organized",
    body: "Track labour, attendance and contractor activity without chasing chats and notebooks.",
    accent: "from-cyan to-brand",
  },
  {
    title: "Stay Updated Across Projects",
    body: "See important business information from one place — even when work spans many sites.",
    accent: "from-indigo to-brand",
  },
  {
    title: "Make Better Decisions",
    body: "Use reports and dashboards instead of scattered records when you need clarity.",
    accent: "from-brand-deep to-indigo",
  },
] as const;

export function BenefitsSection() {
  return (
    <section className="section-pad soft-surface" aria-labelledby="benefits-heading">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Outcomes</p>
          <h2 id="benefits-heading" className="section-title mt-3">
            Built for clarity on site and in the office
          </h2>
          <p className="section-lead mx-auto">
            Focus on what changes for your business — not just another feature list.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-x-10 gap-y-10 sm:grid-cols-2">
          {benefits.map((item, index) => (
            <article key={item.title} className="relative pl-5">
              <span
                className={`absolute left-0 top-1 h-full w-1 rounded-full bg-gradient-to-b ${item.accent}`}
                aria-hidden
              />
              <span className="font-display text-xs font-bold text-brand-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
