import fs from "node:fs";
import path from "node:path";
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

const APP_SIZE = { width: 826, height: 1690 } as const;
const PROBLEM_SIZE = { width: 1448, height: 1086 } as const;
const SOLUTION_SIZE = { width: 1312, height: 1199 } as const;

const scatteredItems = [
  { title: "Site Notes", detail: "On site in a notebook", accent: "bg-amber-400" },
  { title: "Messages", detail: "Approvals in chats", accent: "bg-sky-400" },
  { title: "Spreadsheets", detail: "Costs in sheets", accent: "bg-emerald-400" },
  { title: "Receipts", detail: "In emails & wallets", accent: "bg-rose-400" },
  { title: "Calls", detail: "Decisions on the phone", accent: "bg-indigo-400" },
] as const;

const connectedModules = [
  { title: "Projects", detail: "Plans, progress, tasks", accent: "bg-brand" },
  { title: "Clients", detail: "Contacts, comms", accent: "bg-emerald-500" },
  { title: "Contractors", detail: "Subbies, compliance", accent: "bg-indigo" },
  { title: "Labour", detail: "People, time, work", accent: "bg-amber-500" },
  { title: "Payments", detail: "Invoices, transactions", accent: "bg-cyan" },
  { title: "Reports", detail: "Insights, performance", accent: "bg-brand-deep" },
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

/** Serve PNGs directly (no optimizer cache) and knock out black backdrops. */
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

export function ProblemSection() {
  return (
    <section
      id="problem-solution"
      className="problem-solution-section relative overflow-hidden"
      aria-labelledby="problem-heading"
      style={{ backgroundImage: `url("${ASSETS.bg}")` }}
    >
      <div className="container-page relative z-10 py-12 md:py-14 lg:py-16">
        {/* Header — tight, single story */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Problem → Solution</p>
          <h2
            id="problem-heading"
            className="mt-2.5 whitespace-nowrap text-[clamp(1.05rem,calc(0.7rem+3.2vw),2.5rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink"
          >
            Projects, people &amp; money — in one place
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-[0.95rem] leading-relaxed text-muted md:text-base">
            Notes, chats, spreadsheets, receipts and calls — brought together in CM360.
          </p>
        </div>

        {/* ——— Desktop / tablet: dense 3-column story ——— */}
        <div className="relative mt-8 hidden md:mt-10 md:block">
          <div className="grid items-center gap-1 md:grid-cols-[1fr_auto_1fr] lg:gap-2 xl:gap-3">
            {/* Scattered records — drifts gently toward the phone */}
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

            {/* Center phone — soft vertical float (product focal point) */}
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

            {/* Connected workspace — drifts gently toward the phone */}
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

        {/* ——— Mobile: compact vertical story ——— */}
        <div className="mt-7 space-y-6 md:hidden">
          <div>
            <SideLabel align="center">Scattered records</SideLabel>
            <ul className="mt-2.5 grid grid-cols-2 gap-2">
              {scatteredItems.map((item, index) => (
                <li
                  key={item.title}
                  className={`rounded-xl border border-brand/10 bg-white/90 px-3 py-2.5 shadow-[0_8px_20px_rgba(11,35,68,0.05)] ${
                    index === scatteredItems.length - 1 ? "col-span-2" : ""
                  }`}
                >
                  <span className={`mb-1.5 inline-block h-1.5 w-1.5 rounded-full ${item.accent}`} />
                  <p className="text-[0.8125rem] font-bold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-[0.7rem] text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center">
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-white shadow-[0_8px_18px_rgba(22,119,255,0.28)]"
              aria-hidden
            >
              →
            </span>
            <p className="text-[0.8125rem] font-semibold text-ink">
              CM360 brings everything together
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-[13.5rem] justify-center">
            <div
              className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(22,119,255,0.16),transparent_70%)] blur-xl"
              aria-hidden
            />
            <div className="animate-phone-float">
              <PhoneFrame
                src={ASSETS.app}
                alt="CM360 mobile app — project overview, financial snapshot and payments"
                width={APP_SIZE.width}
                height={APP_SIZE.height}
                priority
                unoptimized
                className="!w-[12.75rem]"
              />
            </div>
          </div>

          <div>
            <SideLabel align="center">One connected workspace</SideLabel>
            <ul className="mt-2.5 grid grid-cols-2 gap-2">
              {connectedModules.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-brand/10 bg-white/90 px-3 py-2.5 shadow-[0_8px_20px_rgba(11,35,68,0.05)]"
                >
                  <span
                    className={`mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-lg ${item.accent}`}
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  <p className="text-[0.8125rem] font-bold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-[0.7rem] leading-snug text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
