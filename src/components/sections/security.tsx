const trustItems = [
  {
    title: "Role-based access",
    body: "Give each person the right level of access for their responsibilities.",
  },
  {
    title: "Company-specific data",
    body: "Your company information stays organized within your own workspace.",
  },
  {
    title: "Controlled user access",
    body: "Invite team members and manage who can view or change key records.",
  },
  {
    title: "Secure account access",
    body: "Sign in with protected account credentials built for business use.",
  },
] as const;

export function SecuritySection() {
  return (
    <section className="section-pad bg-white" aria-labelledby="security-heading">
      <div className="container-page">
        <div className="overflow-hidden rounded-[1.5rem] border border-border bg-gradient-to-br from-[#f8fbff] via-white to-cyan-soft/30 p-6 md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
            <div>
              <p className="eyebrow">Trust & access</p>
              <h2 id="security-heading" className="section-title mt-3">
                Built for teams that need clear control
              </h2>
              <p className="section-lead">
                CM360 helps you keep construction data organized and accessible only to the right
                people in your company.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {trustItems.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-border/70 bg-white/80 px-4 py-4"
                >
                  <h3 className="font-display text-sm font-bold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
