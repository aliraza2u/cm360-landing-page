import fs from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import Image from "next/image";
import { PhoneFrame } from "@/components/mockups/device-frames";

/** Bust browser / Next image cache when public assets are replaced. */
function publicAsset(relPath: string) {
  const filePath = path.join(process.cwd(), "public", relPath);
  let version = "1";
  try {
    version = String(Math.floor(fs.statSync(filePath).mtimeMs));
  } catch {
    // keep stable fallback if file missing during analysis
  }
  return `/${relPath.replace(/^\/+/, "")}?v=${version}`;
}

const ASSETS = {
  bg: publicAsset("assets/solution/bg.png"),
  problem: publicAsset("assets/solution/problem.png"),
  solution: publicAsset("assets/solution/solution.png"),
  app: publicAsset("assets/solution/app.png"),
} as const;

const APP_SIZE = { width: 834, height: 1608 } as const;
const PROBLEM_SIZE = { width: 1448, height: 1086 } as const;
const SOLUTION_SIZE = { width: 1312, height: 1199 } as const;

type ModuleCard = {
  id: string;
  title: string;
  chips: readonly [string, string];
  accent: string;
  soft: string;
  glow: string;
  icon: "folder" | "people" | "handshake" | "wallet" | "chart" | "gear";
};

const MODULES: readonly ModuleCard[] = [
  {
    id: "projects",
    title: "Projects",
    chips: ["Projects", "Clients"],
    accent: "#1677ff",
    soft: "#edf6ff",
    glow: "rgba(22, 119, 255, 0.28)",
    icon: "folder",
  },
  {
    id: "people",
    title: "People",
    chips: ["Labour", "Attendance"],
    accent: "#16a34a",
    soft: "#ecfdf5",
    glow: "rgba(22, 163, 74, 0.28)",
    icon: "people",
  },
  {
    id: "contractors",
    title: "Contractors",
    chips: ["Vendors", "Subcontractors"],
    accent: "#f97316",
    soft: "#fff7ed",
    glow: "rgba(249, 115, 22, 0.28)",
    icon: "handshake",
  },
  {
    id: "money",
    title: "Money",
    chips: ["Payments", "Expenses"],
    accent: "#7c3aed",
    soft: "#f5f3ff",
    glow: "rgba(124, 58, 237, 0.28)",
    icon: "wallet",
  },
  {
    id: "reports",
    title: "Reports",
    chips: ["Insights", "Performance"],
    accent: "#db2777",
    soft: "#fdf2f8",
    glow: "rgba(219, 39, 119, 0.28)",
    icon: "chart",
  },
  {
    id: "company",
    title: "Company",
    chips: ["Users", "Settings"],
    accent: "#0ea5e9",
    soft: "#ecfeff",
    glow: "rgba(14, 165, 233, 0.28)",
    icon: "gear",
  },
] as const;

const OUTCOMES = [
  {
    id: "connected",
    title: "Connected data",
    detail: "Everything works together.",
    accent: "#1677ff",
    soft: "#edf6ff",
    icon: "link" as const,
  },
  {
    id: "manual",
    title: "Less manual work",
    detail: "Get more done, faster.",
    accent: "#16a34a",
    soft: "#ecfdf5",
    icon: "bolt" as const,
  },
  {
    id: "decisions",
    title: "Clearer decisions",
    detail: "Turn data into action.",
    accent: "#f97316",
    soft: "#fff7ed",
    icon: "bars" as const,
  },
  {
    id: "business",
    title: "A stronger business",
    detail: "Build for what's next.",
    accent: "#7c3aed",
    soft: "#f5f3ff",
    icon: "trend" as const,
  },
] as const;

function SideLabel({
  children,
  align = "left",
}: {
  children: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <p
      className={`mb-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand ${
        align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </p>
  );
}

function KnockoutImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={`h-auto w-full mix-blend-lighten ${className}`}
    />
  );
}

function OutcomeIcon({
  name,
  className = "h-4 w-4",
}: {
  name: (typeof OUTCOMES)[number]["icon"];
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.85,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "link":
      return (
        <svg {...common}>
          <ellipse cx="9" cy="12" rx="3.2" ry="5" />
          <ellipse cx="15" cy="12" rx="3.2" ry="5" />
          <path d="M9 8.5h6M9 15.5h6" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" />
        </svg>
      );
    case "bars":
      return (
        <svg {...common}>
          <path d="M4.5 19.5h15M7.5 16.5v-4M12 16.5V8.5M16.5 16.5v-6" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <path d="M4 16.5 10 10.5l3.5 3.5L20 7.5" />
          <path d="M14.5 7.5H20v5.5" />
        </svg>
      );
  }
}

function ModuleIcon({
  name,
  className = "h-4 w-4",
}: {
  name: ModuleCard["icon"];
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "folder":
      return (
        <svg {...common}>
          <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h4l2 2H18.5A1.5 1.5 0 0 1 20 9.5v8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-10Z" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="2.5" />
          <circle cx="16" cy="9" r="2" />
          <path d="M4.2 18a4.8 4.8 0 0 1 9.6 0M14 18a3.6 3.6 0 0 1 5.6-3" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M7.5 13.2 5.2 11l2.1-2.1 3.9 3.4 2.8-2.3 3.8 3.3-2 1.9-2.9-2.5-2.5 2.1-1.9-1.6Z" />
          <path d="M5.2 11 3.8 9.7M18.6 13.8l1.4 1.2" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <rect x="3.5" y="7" width="17" height="11.5" rx="2" />
          <path d="M3.5 10H20" />
          <circle cx="16.5" cy="14.2" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4.5 19.5h15M7.5 16.5v-4M12 16.5V8.5M16.5 16.5v-6" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.8v2M12 18.2v2M3.8 12h2M18.2 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
        </svg>
      );
  }
}

function ModuleCard({ item }: { item: ModuleCard }) {
  return (
    <article
      className="problem-module-card"
      style={
        {
          "--module-accent": item.accent,
          "--module-glow": item.glow,
        } as CSSProperties
      }
    >
      <span className="problem-module-tab" aria-hidden />
      <div className="problem-module-shell">
        <div className="problem-module-face">
          <div className="flex items-start gap-2">
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem]"
              style={{ backgroundColor: item.soft, color: item.accent }}
              aria-hidden
            >
              <ModuleIcon name={item.icon} className="h-[1.05rem] w-[1.05rem]" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[0.9rem] font-bold leading-tight tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <ul className="mt-1.5 flex flex-wrap gap-1">
                {item.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full bg-[#eef4fb] px-1.5 py-0.5 text-[0.6rem] font-medium leading-tight text-ink-secondary"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function OutcomesPanel() {
  return (
    <ul className="problem-outcomes mt-6 overflow-hidden rounded-[1.35rem] border border-[#e8eef6] bg-white shadow-[0_14px_40px_rgba(11,35,68,0.07)]">
      {OUTCOMES.map((item, index) => (
        <li
          key={item.id}
          className={`flex items-start gap-2.5 px-3.5 py-3.5 ${
            index % 2 === 1 ? "border-l border-[#e8eef6]" : ""
          } ${index > 1 ? "border-t border-[#e8eef6]" : ""}`}
        >
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: item.soft, color: item.accent }}
          >
            <OutcomeIcon name={item.icon} />
          </span>
          <span className="min-w-0 pt-0.5">
            <span className="block text-[0.8125rem] font-bold leading-snug tracking-[-0.02em] text-ink">
              {item.title}
            </span>
            <span className="mt-0.5 block text-[0.7rem] leading-snug text-muted">
              {item.detail}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Mobile: reference-style module grid + outcomes panel. */
function MobileConnectedHub() {
  return (
    <div className="mx-auto mt-7 w-full max-w-[28rem] md:hidden">
      <ul className="grid grid-cols-2 gap-3 min-[390px]:gap-3.5">
        {MODULES.map((item) => (
          <li key={item.id}>
            <ModuleCard item={item} />
          </li>
        ))}
      </ul>
      <OutcomesPanel />
    </div>
  );
}

export function ProblemSection() {
  return (
    <section
      id="problem-solution"
      className="problem-solution-section relative overflow-hidden"
      aria-labelledby="problem-heading"
      style={{ backgroundImage: `url("${ASSETS.bg}")` }}
    >
      <div className="container-page relative z-10 py-12 md:py-14 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Problem → Solution</p>
          <h2
            id="problem-heading"
            className="mt-2.5 text-[clamp(1.4rem,5.2vw,2.5rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink"
          >
            Run your construction business in one place
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-[0.95rem] leading-relaxed text-muted md:text-base">
            Move beyond notebooks, spreadsheets and manual construction khata. CM360 keeps
            projects, labour, contractors, expenses and payments organized in one place.
          </p>
        </div>

        {/* ——— Desktop / tablet: dense 3-column story ——— */}
        <div className="relative mt-8 hidden md:mt-10 md:block">
          <div className="grid items-center gap-1 md:grid-cols-[1fr_auto_1fr] lg:gap-2 xl:gap-3">
            <div className="relative min-w-0 self-center">
              <SideLabel>Scattered records</SideLabel>
              <div className="animate-problem-drift">
                <KnockoutImage
                  src={ASSETS.problem}
                  alt="Scattered construction records across notebooks, messages, spreadsheets, calls and receipts"
                  width={PROBLEM_SIZE.width}
                  height={PROBLEM_SIZE.height}
                  priority
                  className="mx-auto max-h-[22rem] object-contain object-center lg:max-h-[26rem] xl:max-h-[28rem]"
                />
              </div>
            </div>

            <div className="relative z-10 mx-auto flex shrink-0 justify-center px-1">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[105%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,199,232,0.18),transparent_70%)] blur-2xl"
                aria-hidden
              />
              <div className="animate-phone-float">
                <PhoneFrame
                  src={ASSETS.app}
                  alt="CM360 mobile project overview bringing records into one place"
                  width={APP_SIZE.width}
                  height={APP_SIZE.height}
                  priority
                  unoptimized
                  className="!w-[10.75rem] lg:!w-[12.25rem] xl:!w-[13rem]"
                />
              </div>
            </div>

            <div className="relative min-w-0 self-center">
              <SideLabel align="right">One connected workspace</SideLabel>
              <div className="animate-solution-drift">
                <KnockoutImage
                  src={ASSETS.solution}
                  alt="CM360 connected workspace with projects, clients, labour, payments and reports in sync"
                  width={SOLUTION_SIZE.width}
                  height={SOLUTION_SIZE.height}
                  priority
                  className="mx-auto max-h-[22rem] object-contain object-center lg:max-h-[26rem] xl:max-h-[28rem]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ——— Mobile: reference module cards + outcomes ——— */}
        <MobileConnectedHub />
      </div>
    </section>
  );
}
