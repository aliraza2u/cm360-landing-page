import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { BRAND } from "@/lib/site";

function publicAsset(relPath: string) {
  const filePath = path.join(process.cwd(), "public", relPath);
  let version = "1";
  try {
    version = String(Math.floor(fs.statSync(filePath).mtimeMs));
  } catch {
    // keep stable fallback
  }
  return `/${relPath.replace(/^\/+/, "")}?v=${version}`;
}

const ASSETS = {
  bg: publicAsset("assets/capabilities/bg.png"),
  illustration: publicAsset("assets/capabilities/capabilities.png"),
} as const;

const ILLUSTRATION_SIZE = { width: 1672, height: 941 } as const;

const CAPABILITIES = [
  {
    id: "projects",
    title: "Projects",
    chips: ["Projects", "Clients"] as const,
    accent: "#1677ff",
    soft: "bg-brand-soft",
    icon: "folder" as const,
  },
  {
    id: "people",
    title: "People",
    chips: ["Labour", "Attendance"] as const,
    accent: "#16a34a",
    soft: "bg-emerald-50",
    icon: "people" as const,
  },
  {
    id: "contractors",
    title: "Contractors",
    chips: ["Vendors", "Subcontractors"] as const,
    accent: "#f97316",
    soft: "bg-orange-50",
    icon: "handshake" as const,
  },
  {
    id: "money",
    title: "Money",
    chips: ["Payments", "Expenses"] as const,
    accent: "#7c3aed",
    soft: "bg-violet-50",
    icon: "wallet" as const,
  },
  {
    id: "reports",
    title: "Reports",
    chips: ["Insights", "Performance"] as const,
    accent: "#db2777",
    soft: "bg-pink-50",
    icon: "chart" as const,
  },
  {
    id: "company",
    title: "Company",
    chips: ["Employees", "User Access"] as const,
    accent: "#2563eb",
    soft: "bg-sky-50",
    icon: "gear" as const,
  },
] as const;

const OUTCOMES = [
  {
    id: "connected",
    title: "Connected data",
    detail: "Everything works together",
    accent: "#1677ff",
    soft: "bg-brand-soft",
    icon: "link" as const,
  },
  {
    id: "manual",
    title: "Less manual work",
    detail: "Save time and effort",
    accent: "#16a34a",
    soft: "bg-emerald-50",
    icon: "bolt" as const,
  },
  {
    id: "decisions",
    title: "Clearer decisions",
    detail: "Real insights, in real time",
    accent: "#7c3aed",
    soft: "bg-violet-50",
    icon: "bars" as const,
  },
  {
    id: "business",
    title: "A stronger business",
    detail: "Build with greater control",
    accent: "#f97316",
    soft: "bg-orange-50",
    icon: "trend" as const,
  },
] as const;

function CapabilityIcon({
  name,
  className = "h-5 w-5",
}: {
  name: (typeof CAPABILITIES)[number]["icon"];
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
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
          <circle cx="9" cy="8" r="2.6" />
          <circle cx="16.2" cy="9" r="2.1" />
          <path d="M4.2 18a4.8 4.8 0 0 1 9.6 0" />
          <path d="M14 18a3.8 3.8 0 0 1 5.8-3.2" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M8 13.5 5.5 11l2-2 4 3.5 3-2.5 4 3.5-2 2-3.5-2.8-2.8 2.3L8 13.5Z" />
          <path d="M5.5 11 3.8 9.4M18.5 13.5l1.8-1.5" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <rect x="3.5" y="7" width="17" height="11.5" rx="2" />
          <path d="M3.5 10H20" />
          <circle cx="16.5" cy="14.2" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4.5 19.5h15" />
          <path d="M7.5 16.5v-4" />
          <path d="M12 16.5V8.5" />
          <path d="M16.5 16.5v-6" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" />
        </svg>
      );
  }
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
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "link":
      return (
        <svg {...common}>
          <path d="M10 13a5 5 0 0 0 7.1.1l1.8-1.8a5 5 0 0 0-7.1-7.1L10.5 5.5" />
          <path d="M14 11a5 5 0 0 0-7.1-.1L5.1 12.7a5 5 0 0 0 7.1 7.1L13.5 18.5" />
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
          <path d="M4.5 19.5h15" />
          <path d="M7.5 16.5v-4" />
          <path d="M12 16.5V8.5" />
          <path d="M16.5 16.5v-6" />
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

function CapabilityCard({ item }: { item: (typeof CAPABILITIES)[number] }) {
  return (
    <article className="rounded-[1.05rem] border border-brand/10 bg-white/95 p-3.5 shadow-[0_10px_28px_rgba(11,35,68,0.06)]">
      <div
        className={`mb-2.5 inline-flex h-11 w-11 items-center justify-center rounded-xl text-white ${item.soft}`}
        style={{ backgroundColor: item.accent }}
      >
        <CapabilityIcon name={item.icon} className="h-[1.15rem] w-[1.15rem]" />
      </div>
      <h3 className="text-[1rem] font-bold tracking-[-0.02em] text-ink">{item.title}</h3>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {item.chips.map((chip) => (
          <span
            key={chip}
            className="inline-flex rounded-full border border-brand/10 bg-brand-wash/80 px-2 py-0.5 text-[0.7rem] font-medium text-ink-secondary"
          >
            {chip}
          </span>
        ))}
      </div>
    </article>
  );
}

function OutcomeStrip() {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-3 rounded-[1.35rem] border border-brand/10 bg-white/85 p-3 shadow-[0_12px_36px_rgba(11,35,68,0.06)] backdrop-blur-sm md:mt-10 md:gap-0 md:p-2 lg:grid-cols-4 lg:rounded-full lg:px-2 lg:py-3">
      {OUTCOMES.map((item, index) => (
        <li
          key={item.id}
          className={`flex items-start gap-2.5 px-2.5 py-2 md:items-center md:px-4 lg:px-5 ${
            index % 2 === 1 ? "border-l border-brand/10" : ""
          } ${index > 0 ? "lg:border-l lg:border-brand/10" : ""}`}
        >
          <span
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.soft}`}
            style={{ color: item.accent }}
          >
            <OutcomeIcon name={item.icon} />
          </span>
          <span className="min-w-0">
            <span className="block text-[0.8125rem] font-bold leading-snug text-ink sm:text-sm">
              {item.title}
            </span>
            <span className="mt-0.5 block text-[0.7rem] leading-snug text-muted sm:text-xs">
              {item.detail}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="capabilities-section relative overflow-hidden"
      aria-labelledby="capabilities-heading"
      style={{ backgroundImage: `url("${ASSETS.bg}")` }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,251,255,0.55)_0%,rgba(255,255,255,0.28)_42%,rgba(247,251,255,0.5)_100%)]"
        aria-hidden
      />

      <div className="container-page relative z-10 py-14 md:py-16 lg:py-[4.75rem]">
        <div className="mx-auto max-w-[50rem] text-center">
          <p className="inline-flex items-center rounded-full border border-brand/15 bg-white/85 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
            Compact capabilities
          </p>
          <h2
            id="capabilities-heading"
            className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink"
          >
            What does <span className="text-gradient-dark">{BRAND.name}</span> manage?
          </h2>
          <p className="mx-auto mt-3 max-w-[48rem] text-[0.95rem] leading-relaxed text-muted md:text-lg">
            Projects, people, contractors, money, reports and company controls — all connected in
            one simple workspace.
          </p>
        </div>

        {/* Desktop / large tablet: full illustration */}
        <div className="mx-auto mt-8 hidden max-w-[74rem] md:mt-10 lg:block">
          <Image
            src={ASSETS.illustration}
            alt="CM360 connecting projects, people, contractors, money, reports and company operations in one workspace."
            width={ILLUSTRATION_SIZE.width}
            height={ILLUSTRATION_SIZE.height}
            unoptimized
            className="mx-auto h-auto w-full object-contain mix-blend-lighten drop-shadow-[0_18px_40px_rgba(11,35,68,0.1)]"
            sizes="(max-width: 1280px) 92vw, 1180px"
          />
        </div>

        {/* Mobile + small tablet: HTML capability cards */}
        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:hidden">
          {CAPABILITIES.map((item) => (
            <li key={item.id}>
              <CapabilityCard item={item} />
            </li>
          ))}
        </ul>

        <div className="mx-auto max-w-[74rem]">
          <OutcomeStrip />
        </div>
      </div>
    </section>
  );
}
