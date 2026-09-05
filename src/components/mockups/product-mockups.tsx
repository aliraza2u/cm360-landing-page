type MockupVariant =
  | "dashboard"
  | "projects"
  | "workforce"
  | "contractors"
  | "company"
  | "reports";

const titles: Record<MockupVariant, string> = {
  dashboard: "Company overview",
  projects: "Projects & clients",
  workforce: "Site & workforce",
  contractors: "Contractors & vendors",
  company: "Company control",
  reports: "Financial visibility",
};

export function ProductMockup({
  variant = "dashboard",
  className = "",
  compact = false,
}: {
  variant?: MockupVariant;
  className?: string;
  compact?: boolean;
}) {
  const activeIndex =
    variant === "dashboard"
      ? 0
      : variant === "projects"
        ? 1
        : variant === "workforce" || variant === "contractors"
          ? 2
          : variant === "company"
            ? 3
            : 4;

  return (
    <div
      className={`device-chrome overflow-hidden rounded-[20px] transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
      role="img"
      aria-label={`CM360 ${titles[variant]} interface preview`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-gradient-to-r from-[#f8fbff] to-[#f1f6ff] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#fecaca]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#fde68a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#bbf7d0]" />
        <span className="ml-2 truncate rounded-md bg-white/70 px-2 py-0.5 text-[11px] font-medium text-muted">
          app.cm360.site · {titles[variant]}
        </span>
      </div>

      <div
        className={`grid bg-white ${compact ? "min-h-[210px]" : "min-h-[270px] md:min-h-[330px]"} grid-cols-[auto_1fr]`}
      >
        <aside className="hidden w-[4.25rem] border-r border-border bg-gradient-to-b from-[#f5f9ff] to-white p-2.5 sm:block md:w-40">
          <div className="mb-3 h-8 w-8 rounded-lg bg-gradient-to-br from-brand to-cyan md:h-8 md:w-24 md:bg-brand/15" />
          <div className="space-y-1.5">
            {["Overview", "Projects", "Labour", "Company", "Reports"].map((item, i) => (
              <div
                key={item}
                className={`h-8 rounded-lg transition-colors ${
                  i === activeIndex
                    ? "bg-gradient-to-r from-brand to-indigo text-white shadow-sm"
                    : "bg-brand-soft/60"
                }`}
              >
                <span className="hidden px-3 text-[11px] font-semibold leading-8 md:inline">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <div className={`space-y-3 ${compact ? "p-3" : "p-3 sm:p-4"}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="h-2.5 w-20 rounded bg-brand-soft" />
              <div className="mt-2 h-4 w-36 rounded bg-slate-200/80" />
            </div>
            <div className="h-8 w-[4.5rem] rounded-lg bg-gradient-to-r from-brand to-cyan" />
          </div>

          {(variant === "dashboard" || variant === "reports") && (
            <>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {["Projects", "Payments", "Labour", "Expenses"].map((label, i) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border bg-gradient-to-br from-brand-wash to-white p-2.5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                      {label}
                    </p>
                    <div className="mt-2 h-3.5 w-10 rounded bg-slate-200" />
                    <div className="mt-2 h-1.5 w-full rounded-full bg-brand-soft">
                      <div
                        className={`h-1.5 rounded-full ${i % 2 === 0 ? "bg-brand w-2/3" : "bg-cyan w-1/2"}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-[1.35fr_1fr]">
                <div className="rounded-xl border border-border bg-[#fbfdff] p-3">
                  <div className="mb-3 h-2.5 w-24 rounded bg-slate-200" />
                  <div className="flex h-24 items-end gap-1.5">
                    {[42, 68, 50, 82, 58, 74, 62].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-brand to-cyan"
                        style={{ height: `${h}%`, opacity: 0.4 + i * 0.07 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <div className="mb-3 h-2.5 w-16 rounded bg-slate-200" />
                  <div className="space-y-2.5">
                    {[72, 54, 38].map((w, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className={`h-7 w-7 rounded-full ${i === 0 ? "bg-brand-soft" : i === 1 ? "bg-cyan-soft" : "bg-indigo-soft"}`}
                        />
                        <div className="h-2 flex-1 rounded bg-slate-100">
                          <div
                            className="h-2 rounded bg-brand/75"
                            style={{ width: `${w}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {variant === "projects" && (
            <div className="space-y-2">
              {["Active project", "Client payments", "Project expenses", "Client workspace"].map(
                (row, i) => (
                  <div
                    key={row}
                    className="flex items-center gap-3 rounded-xl border border-border bg-[#fbfdff] px-3 py-2.5"
                  >
                    <div
                      className={`h-9 w-9 rounded-lg ${
                        i % 2 === 0 ? "bg-brand-soft" : "bg-cyan-soft"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-ink">{row}</p>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-brand to-cyan"
                          style={{ width: `${52 + i * 11}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}

          {variant === "workforce" && (
            <div className="grid gap-2 sm:grid-cols-2">
              {["Site labour", "Attendance", "Payroll", "Temporary labour"].map((item, i) => (
                <div key={item} className="rounded-xl border border-border bg-[#fbfdff] p-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-lg ${i % 2 === 0 ? "bg-brand-soft" : "bg-emerald-50"}`}
                    />
                    <div>
                      <p className="text-xs font-semibold text-ink">{item}</p>
                      <div className="mt-1 h-1.5 w-14 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {variant === "contractors" && (
            <div className="space-y-2">
              {["Vendors", "Sub contractors", "Contractor payments"].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-border px-3 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-lg ${
                        i === 0 ? "bg-cyan-soft" : i === 1 ? "bg-indigo-soft" : "bg-brand-soft"
                      }`}
                    />
                    <div>
                      <p className="text-xs font-semibold text-ink">{item}</p>
                      <div className="mt-1 h-1.5 w-20 rounded bg-slate-200" />
                    </div>
                  </div>
                  <div className="h-6 w-12 rounded-md bg-slate-100" />
                </div>
              ))}
            </div>
          )}

          {variant === "company" && (
            <div className="grid gap-2 sm:grid-cols-2">
              {["Employees", "Salary payments", "Office expenses", "User access"].map(
                (item, i) => (
                  <div key={item} className="rounded-xl border border-border p-3">
                    <div
                      className={`mb-2 h-8 w-8 rounded-lg ${
                        i % 2 === 0 ? "bg-brand-soft" : "bg-indigo-soft"
                      }`}
                    />
                    <p className="text-xs font-semibold text-ink">{item}</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full bg-brand"
                        style={{ width: `${45 + i * 12}%` }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MobileMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`device-chrome mx-auto w-[11.25rem] overflow-hidden rounded-[1.7rem] border-[5px] border-slate-800/90 sm:w-[12.25rem] ${className}`}
      role="img"
      aria-label="CM360 mobile app preview"
    >
      <div className="bg-gradient-to-br from-[#1a5fd4] via-[#2f80ed] to-[#06b6d4] px-3 pb-4 pt-3 text-white">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/40" />
        <p className="text-[10px] font-medium text-white/80">On site</p>
        <p className="mt-1 text-sm font-semibold">Company home</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {["Projects", "Labour"].map((label) => (
            <div key={label} className="rounded-xl bg-white/15 p-2 backdrop-blur-sm">
              <p className="text-[9px] text-white/80">{label}</p>
              <div className="mt-1.5 h-2.5 w-8 rounded bg-white/55" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 bg-[#F5F7FB] p-2.5">
        {["Attendance", "Expenses", "Payments"].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-xl border border-border bg-white px-2.5 py-2"
          >
            <div className="h-7 w-7 rounded-lg bg-brand-soft" />
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-ink">{item}</p>
              <div className="mt-1 h-1.5 w-14 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TabletMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`device-chrome overflow-hidden rounded-[1.35rem] ${className}`}
      role="img"
      aria-label="CM360 tablet interface preview"
    >
      <div className="border-b border-border bg-gradient-to-r from-[#f8fbff] to-white px-3 py-2 text-xs font-medium text-muted">
        CM360 · Field & office
      </div>
      <div className="grid grid-cols-3 gap-2 bg-white p-3">
        {["Projects", "Labour", "Reports"].map((label, i) => (
          <div key={label} className="rounded-xl border border-border p-3">
            <div
              className={`mb-2 h-8 w-8 rounded-lg ${
                i === 0 ? "bg-brand-soft" : i === 1 ? "bg-cyan-soft" : "bg-indigo-soft"
              }`}
            />
            <p className="text-xs font-semibold text-ink">{label}</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-brand to-cyan"
                style={{ width: `${50 + i * 15}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
