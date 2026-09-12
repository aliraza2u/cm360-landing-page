import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { LaptopFrame, PhoneFrame } from "@/components/mockups/device-frames";

/** Bust cache when public assets are replaced. */
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
  bg: publicAsset("assets/multi-device/multi-device-bg.png"),
  mobile: publicAsset("assets/multi-device/mobile-view.png"),
  laptop: publicAsset("assets/multi-device/laptop-view.png"),
  connecting: publicAsset("assets/multi-device/connecting.png"),
} as const;

const MOBILE_SIZE = { width: 826, height: 1798 } as const;
const LAPTOP_SIZE = { width: 2302, height: 1716 } as const;

const outcomes = [
  {
    title: "One Team",
    detail: "Everyone stays on the same page",
    accent: "bg-emerald-500",
  },
  {
    title: "Live Updates",
    detail: "Progress, expenses and attendance instantly",
    accent: "bg-brand",
  },
  {
    title: "Less Follow-ups",
    detail: "No more back and forth calls and messages",
    accent: "bg-indigo",
  },
  {
    title: "Better Decisions",
    detail: "Accurate and up-to-date information",
    accent: "bg-amber-500",
  },
] as const;

function Callout({
  title,
  detail,
  align = "left",
}: {
  title: string;
  detail: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`max-w-[15rem] rounded-2xl border border-brand/10 bg-white/95 px-3.5 py-3 shadow-[0_12px_32px_rgba(11,35,68,0.08)] backdrop-blur-sm ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <p className="text-sm font-bold text-ink">{title}</p>
      <p className="mt-1 text-xs leading-snug text-muted">{detail}</p>
    </div>
  );
}

/** Compact title-only chip for mobile device overlays. */
function DeviceBadge({
  children,
  tone,
  className = "",
}: {
  children: string;
  tone: "site" | "office";
  className?: string;
}) {
  const styles =
    tone === "site"
      ? {
          wrap: "border-emerald-200/90 bg-emerald-50 text-emerald-700 shadow-[0_10px_24px_rgba(16,185,129,0.2)]",
          dot: "bg-emerald-500",
          ping: "bg-emerald-400",
        }
      : {
          wrap: "border-[#bdd4ff] bg-[#edf5ff] text-[#145ceb] shadow-[0_10px_24px_rgba(22,119,255,0.2)]",
          dot: "bg-[#1677ff]",
          ping: "bg-[#5aa2ff]",
        };

  return (
    <span
      className={`device-badge device-badge-blink pointer-events-none absolute z-20 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.68rem] font-bold leading-none tracking-[-0.01em] ${styles.wrap} ${className}`}
    >
      <span className="relative inline-flex h-1.5 w-1.5 shrink-0" aria-hidden>
        <span className={`device-badge-ping absolute inset-0 rounded-full ${styles.ping}`} />
        <span className={`relative h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      </span>
      {children}
    </span>
  );
}

export function MultiDeviceSection() {
  return (
    <section
      id="multi-device"
      className="multi-device-section relative overflow-hidden"
      aria-labelledby="devices-heading"
      style={{ backgroundImage: `url("${ASSETS.bg}")` }}
    >
      <div className="container-page relative z-10 py-12 md:py-14 lg:py-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-brand/15 bg-white/80 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand shadow-sm">
            Anytime, anywhere
          </p>
          <h2
            id="devices-heading"
            className="mt-3 text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink"
          >
            Manage projects from site to office
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted md:text-base">
            Your team stays connected whether they&apos;re on the construction site or in the
            office — with live updates for labour, expenses and progress in CM360.
          </p>
        </div>

        {/* ——— Desktop / tablet composition ——— */}
        <div className="relative mt-10 hidden md:mt-12 md:block lg:mt-14">
          <div className="grid items-center gap-4 md:grid-cols-[0.85fr_minmax(7rem,0.55fr)_1.25fr] lg:gap-5 xl:gap-6">
            {/* On-site phone */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-3 self-start lg:mb-4">
                <Callout
                  title="On Site"
                  detail="Track progress, labour and expenses in real time."
                />
              </div>
              <PhoneFrame
                src={ASSETS.mobile}
                alt="CM360 mobile Site Labour payroll screen for field teams"
                width={MOBILE_SIZE.width}
                height={MOBILE_SIZE.height}
                unoptimized
                className="!w-[10.5rem] lg:!w-[12rem] xl:!w-[12.75rem]"
              />
            </div>

            {/* Sync hub */}
            <div className="relative z-20 mx-auto flex w-full max-w-[13rem] flex-col items-center text-center lg:max-w-[15rem]">
              <Image
                src={ASSETS.connecting}
                alt=""
                width={1672}
                height={941}
                unoptimized
                className="h-auto w-full mix-blend-lighten"
              />
              <p className="mt-1 text-sm font-bold text-ink">Real-time sync</p>
              <p className="mt-0.5 text-xs text-muted">Same information. Everywhere.</p>
            </div>

            {/* Office laptop */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-3 self-end lg:mb-4">
                <Callout
                  title="In the Office"
                  detail="Plan, monitor and make better decisions."
                  align="right"
                />
              </div>
              <LaptopFrame
                src={ASSETS.laptop}
                alt="CM360 desktop Site Labour dashboard for office teams"
                width={LAPTOP_SIZE.width}
                height={LAPTOP_SIZE.height}
                unoptimized
              />
            </div>
          </div>

          {/* Outcomes */}
          <ul className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
            {outcomes.map((item) => (
              <li key={item.title} className="text-center lg:text-left">
                <span
                  className={`mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full ${item.accent} lg:mx-0`}
                  aria-hidden
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="text-sm font-bold text-ink">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* ——— Mobile: compact vertical devices + title badges ——— */}
        <div className="mt-8 md:hidden">
          <div className="multi-device-mobile relative mx-auto flex w-full max-w-[20rem] flex-col items-center">
            {/* Phone + On-site badge (right) */}
            <div className="relative z-10">
              <DeviceBadge tone="site" className="-right-2 top-6 min-[390px]:-right-3">
                On-site
              </DeviceBadge>
              <PhoneFrame
                src={ASSETS.mobile}
                alt="CM360 mobile Site Labour payroll screen"
                width={MOBILE_SIZE.width}
                height={MOBILE_SIZE.height}
                unoptimized
                className="!w-[8.25rem]"
              />
            </div>

            {/* Connector + sync title between devices */}
            <div className="multi-device-connector relative z-[5] flex flex-col items-center justify-center">
              <Image
                src={ASSETS.connecting}
                alt=""
                width={400}
                height={225}
                unoptimized
                className="multi-device-connector-img mix-blend-lighten"
                aria-hidden
              />
              <div className="relative z-10 -mt-1 text-center">
                <p className="text-[0.72rem] font-bold tracking-[-0.01em] text-ink">
                  Real-time sync
                </p>
                <p className="mt-0.5 text-[0.62rem] leading-snug text-muted">
                  Same info. Everywhere.
                </p>
              </div>
            </div>

            {/* Laptop + In the office badge (right) */}
            <div className="relative z-10 w-full max-w-[15.5rem]">
              <DeviceBadge tone="office" className="right-0 top-3 min-[390px]:-right-1">
                In the office
              </DeviceBadge>
              <LaptopFrame
                src={ASSETS.laptop}
                alt="CM360 desktop Site Labour dashboard"
                width={LAPTOP_SIZE.width}
                height={LAPTOP_SIZE.height}
                unoptimized
              />
            </div>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3">
            {outcomes.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-brand/10 bg-white/90 px-3 py-3 shadow-[0_8px_20px_rgba(11,35,68,0.05)]"
              >
                <span
                  className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full ${item.accent}`}
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
    </section>
  );
}
