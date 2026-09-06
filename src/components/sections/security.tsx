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
    <section
      className="section-pad relative overflow-hidden surface-blue"
      aria-labelledby="security-heading"
    >
      <div className="pointer-events-none absolute inset-0 blueprint-overlay opacity-[0.3]" aria-hidden />

      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
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

          <ul className="grid gap-8 sm:grid-cols-2">
            {trustItems.map((item) => (
              <li key={item.title}>
                <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
