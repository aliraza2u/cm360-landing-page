import Image from "next/image";
import { ProductMockup } from "@/components/mockups/product-mockups";

const capabilityGroups = [
  {
    id: "projects-clients",
    title: "Projects & Clients",
    description:
      "Keep every job and client relationship organized with clear payment and expense visibility.",
    items: ["Manage clients", "Track project progress", "Client payments", "Project expenses"],
    variant: "projects" as const,
    surface: "white" as const,
  },
  {
    id: "site-workforce",
    title: "Site & Workforce",
    description:
      "Track the people who keep sites moving — from daily attendance to payroll.",
    items: ["Site labour", "Attendance", "Payroll", "Temporary labour"],
    variant: "workforce" as const,
    surface: "blue" as const,
  },
  {
    id: "contractors-vendors",
    title: "Contractors & Vendors",
    description:
      "Coordinate partners and keep sub contractor payments organized alongside project work.",
    items: ["Vendors", "Sub contractors", "Sub contractor payments"],
    variant: "contractors" as const,
    surface: "white" as const,
  },
  {
    id: "company-control",
    title: "Company Control",
    description:
      "Run office operations with the same clarity you expect on site.",
    items: ["Employees", "Salary payments", "Office expenses", "User Access"],
    variant: "company" as const,
    surface: "blend" as const,
  },
  {
    id: "financial-visibility",
    title: "Financial Visibility",
    description:
      "See project and company performance clearly — and share reports when you need them.",
    items: ["Project costs", "Payments", "Expenses", "Dashboards & reports"],
    variant: "reports" as const,
    surface: "highlight" as const,
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-heading">
      <div className="container-page section-pad !pb-6 md:!pb-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Product capabilities</p>
          <h2 id="features-heading" className="section-title mt-3">
            Built around how construction businesses actually work
          </h2>
          <p className="section-lead">
            Large product views so you can see how CM360 supports projects, people and money
            together.
          </p>
        </div>
      </div>

      <div className="space-y-0">
        {capabilityGroups.map((group, index) => {
          const reverse = index % 2 === 1;
          const surfaceClass =
            group.surface === "blue"
              ? "surface-blue"
              : group.surface === "blend"
                ? "soft-surface"
                : group.surface === "highlight"
                  ? "bg-[linear-gradient(180deg,#EDF6FF_0%,#F7FBFF_100%)]"
                  : "bg-white";

          return (
            <article
              key={group.id}
              id={group.id}
              className={`relative overflow-hidden ${surfaceClass}`}
            >
              {(group.surface === "blue" || group.surface === "highlight") && (
                <div
                  className="pointer-events-none absolute inset-0 blueprint-overlay opacity-[0.3]"
                  aria-hidden
                />
              )}

              {group.surface === "highlight" && (
                <div
                  className="pointer-events-none absolute -right-10 top-10 hidden h-64 w-64 opacity-70 lg:block"
                  aria-hidden
                >
                  <Image
                    src="/assets/assets/construction-line-art.svg"
                    alt=""
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )}

              <div className="container-page relative section-pad !py-14 md:!py-16 lg:!py-20">
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
                    group.surface === "highlight" ? "lg:grid-cols-[0.9fr_1.1fr]" : ""
                  }`}
                >
                  <div className={reverse ? "lg:order-2" : undefined}>
                    <h3 className="text-[clamp(1.45rem,2.2vw,1.75rem)] font-bold tracking-[-0.02em] text-ink">
                      {group.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[clamp(0.95rem,1.4vw,1.05rem)] leading-[1.7] text-muted">
                      {group.description}
                    </p>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm font-medium text-ink-secondary"
                        >
                          <span
                            className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-primary"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`relative ${reverse ? "lg:order-1" : ""}`}>
                    <div
                      className="pointer-events-none absolute inset-0 -z-10 scale-125 opacity-80"
                      aria-hidden
                    >
                      <Image
                        src="/assets/assets/section-glow-orbs.svg"
                        alt=""
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <ProductMockup variant={group.variant} />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
