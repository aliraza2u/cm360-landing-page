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
  /*
   * The mobile artwork is heavy (~1.5 MB each), so it goes through the Next
   * image optimizer instead of being served raw. That rules out the
   * `publicAsset` cache-busting query — `images.localPatterns` rejects a search
   * string on local sources.
   */
  mobProblem: "/assets/solution/mob-problem.png",
  mobSolution: "/assets/solution/mob-solution.png",
} as const;

const APP_SIZE = { width: 834, height: 1608 } as const;
const PROBLEM_SIZE = { width: 1448, height: 1086 } as const;
const SOLUTION_SIZE = { width: 1312, height: 1199 } as const;
const MOB_PROBLEM_SIZE = { width: 1024, height: 1536 } as const;
const MOB_SOLUTION_SIZE = { width: 1536, height: 1024 } as const;

const BRIDGE_PROOFS = ["One app", "Real-time sync", "Site + office"] as const;

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
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      className={`h-auto w-full mix-blend-lighten ${className}`}
    />
  );
}

function StepPill({
  tone,
  children,
}: {
  tone: "problem" | "solution";
  children: string;
}) {
  const isProblem = tone === "problem";
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border bg-white/85 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.13em] shadow-[0_6px_16px_rgba(11,35,68,0.07)] backdrop-blur-sm ${
        isProblem ? "border-[#f2dcb8] text-ink-secondary" : "border-brand/20 text-brand"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isProblem ? "bg-amber" : "bg-brand"}`}
        aria-hidden
      />
      {children}
    </p>
  );
}

/** The hinge of the mobile story: CM360 sits between the mess and the fix. */
function SolutionBridgeCard() {
  return (
    <div className="relative w-full max-w-[19rem]">
      <span className="problem-bridge-halo" aria-hidden />
      <div className="problem-bridge-card px-4 py-4">
        <div className="relative flex items-center gap-3">
          <span className="problem-bridge-logo" aria-hidden>
            <Image
              src="/icon.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
              className="h-[1.55rem] w-[1.55rem] object-contain"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/65">
              The solution
            </span>
            <span className="mt-0.5 block text-[1.15rem] font-extrabold leading-none tracking-[-0.025em] text-white">
              CM<span className="text-[#a5ecfa]">360</span>
            </span>
          </span>
        </div>

        <p className="relative mt-3 text-[0.82rem] font-medium leading-snug text-white/90">
          Every note, chat, sheet and receipt above — handled in one app.
        </p>

        <ul className="relative mt-3 flex flex-wrap gap-1.5">
          {BRIDGE_PROOFS.map((proof) => (
            <li
              key={proof}
              className="rounded-full bg-white/18 px-2 py-0.5 text-[0.62rem] font-semibold leading-tight text-white ring-1 ring-inset ring-white/25"
            >
              {proof}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Mobile: scattered records → CM360 → connected workspace, stacked vertically. */
function MobileProblemSolutionFlow() {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-[22rem] flex-col items-center sm:max-w-[28rem] md:hidden">
      <StepPill tone="problem">Scattered records</StepPill>
      <Image
        src={ASSETS.mobProblem}
        alt="Construction records scattered across site notes, chat messages, spreadsheets, phone calls and paper receipts"
        width={MOB_PROBLEM_SIZE.width}
        height={MOB_PROBLEM_SIZE.height}
        sizes="100vw"
        className="problem-mob-art problem-mob-art--problem"
      />

      <span className="problem-flow-rail" aria-hidden />
      <SolutionBridgeCard />
      <span className="problem-flow-rail" aria-hidden />
      <svg
        className="-mt-1 h-3.5 w-3.5 text-cyan"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 9l6 6 6-6" />
      </svg>

      <div className="mt-3">
        <StepPill tone="solution">One connected workspace</StepPill>
      </div>
      <Image
        src={ASSETS.mobSolution}
        alt="CM360 keeping projects, clients, labour, contractors, payments and reports in sync"
        width={MOB_SOLUTION_SIZE.width}
        height={MOB_SOLUTION_SIZE.height}
        sizes="120vw"
        className="problem-mob-art problem-mob-art--solution"
      />
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
                  className="mx-auto max-h-[22rem] object-contain object-center lg:max-h-[26rem] xl:max-h-[28rem]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ——— Mobile: vertical problem → CM360 → solution story ——— */}
        <MobileProblemSolutionFlow />
      </div>
    </section>
  );
}
