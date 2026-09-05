import { ProductMockup } from "@/components/mockups/product-mockups";

const capabilityGroups = [
  {
    id: "projects-clients",
    title: "Projects & Clients",
    description:
      "Keep every job and client relationship organized with clear payment and expense visibility.",
    items: ["Manage clients", "Projects", "Client payments", "Project expenses"],
    variant: "projects" as const,
    layout: "standard" as const,
  },
  {
    id: "site-workforce",
    title: "Site & Workforce",
    description:
      "Track the people who keep sites moving — from daily attendance to payroll.",
    items: ["Site labour", "Attendance", "Payroll", "Temporary labour"],
    variant: "workforce" as const,
    layout: "standard" as const,
  },
  {
    id: "contractors-vendors",
    title: "Contractors & Vendors",
    description:
      "Coordinate partners and keep contractor payments organized alongside project work.",
    items: ["Vendors", "Sub contractors", "Contractor payments"],
    variant: "contractors" as const,
    layout: "accent" as const,
  },
  {
    id: "company-control",
    title: "Company Control",
    description:
      "Run office operations with the same clarity you expect on site.",
    items: ["Employees", "Salary payments", "Office expenses", "User access"],
    variant: "company" as const,
    layout: "standard" as const,
  },
  {
    id: "financial-visibility",
    title: "Financial Visibility",
    description:
      "See project and company performance clearly — and share reports when you need them.",
    items: ["Project costs", "Payments", "Expenses", "Dashboards", "Reports"],
    variant: "reports" as const,
    layout: "wide" as const,
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="section-pad bg-white" aria-labelledby="features-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Product capabilities</p>
          <h2 id="features-heading" className="section-title mt-3">
            Built around how construction businesses actually work
          </h2>
          <p className="section-lead">
            Large product views — not a wall of identical cards — so you can see how CM360
            supports projects, people and money together.
          </p>
        </div>

        <div className="mt-14 space-y-16 md:space-y-20">
          {capabilityGroups.map((group, index) => {
            const reverse = index % 2 === 1;

            if (group.layout === "wide") {
              return (
                <article
                  key={group.id}
                  id={group.id}
                  className="overflow-hidden rounded-[1.5rem] border border-border bg-gradient-to-br from-brand-wash via-white to-indigo-soft/40 p-6 shadow-sm md:p-8 lg:p-10"
                >
                  <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                        {group.title}
                      </h3>
                      <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                        {group.description}
                      </p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-brand/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink-secondary"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ProductMockup variant={group.variant} />
                  </div>
                </article>
              );
            }

            if (group.layout === "accent") {
              return (
                <article
                  key={group.id}
                  id={group.id}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
                >
                  <div className={reverse ? "lg:order-2" : undefined}>
                    <div className="inline-flex rounded-full bg-indigo-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo">
                      Partners & payments
                    </div>
                    <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-ink md:text-[1.75rem]">
                      {group.title}
                    </h3>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                      {group.description}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm font-medium text-ink-secondary"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-indigo text-[10px] text-white">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={reverse ? "lg:order-1" : undefined}>
                    <ProductMockup variant={group.variant} />
                  </div>
                </article>
              );
            }

            return (
              <article
                key={group.id}
                id={group.id}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                <div className={reverse ? "lg:order-2" : undefined}>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-[1.75rem]">
                    {group.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                    {group.description}
                  </p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-ink-secondary"
                      >
                        <span
                          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-brand to-cyan"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={reverse ? "lg:order-1" : undefined}>
                  <ProductMockup variant={group.variant} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
