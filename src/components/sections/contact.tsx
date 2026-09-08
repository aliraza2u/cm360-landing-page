import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { BRAND, CONTACT, whatsappUrl } from "@/lib/site";
import { CopyPhoneButton } from "./contact/copy-phone-button";

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
  bg: publicAsset("assets/contact/bg.png"),
  phone: publicAsset("assets/contact/whatsapp.png"),
} as const;

const WA_DEFAULT =
  "Hi, I'd like to learn more about CM360.";

const QUICK_ACTIONS = [
  {
    id: "demo",
    title: "Book a demo",
    detail: "See CM360 in action",
    message: "Hi, I'd like to book a CM360 demo.",
    accent: "#1677ff",
    soft: "bg-brand-soft",
    icon: "calendar" as const,
  },
  {
    id: "pricing",
    title: "Ask pricing",
    detail: "Get a custom quote",
    message: "Hi, I'd like to know about CM360 pricing.",
    accent: "#5a4cf2",
    soft: "bg-indigo-soft",
    icon: "tag" as const,
  },
  {
    id: "product",
    title: "Product questions",
    detail: "Get expert advice",
    message: "Hi, I have a question about CM360.",
    accent: "#16a34a",
    soft: "bg-emerald-50",
    icon: "help" as const,
  },
  {
    id: "support",
    title: "Need support",
    detail: "We're here to help",
    message: "Hi, I need help with CM360.",
    accent: "#f59e0b",
    soft: "bg-amber-50",
    icon: "headset" as const,
  },
] as const;

const phoneDisplay = CONTACT.phone || (CONTACT.whatsapp ? formatWhatsApp(CONTACT.whatsapp) : "");
const telHref = CONTACT.phone
  ? `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`
  : CONTACT.whatsapp
    ? `tel:+${CONTACT.whatsapp}`
    : "";

function formatWhatsApp(digits: string) {
  // Light display formatting for common PK mobile lengths; otherwise raw +digits.
  if (digits.startsWith("92") && digits.length >= 12) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }
  return `+${digits}`;
}

function Chevron({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7.5 4.5 12.5 10l-5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.75 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.44-8.44ZM12.06 21.15h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 7 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.9 9.88Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function ChannelIcon({
  kind,
  size = "default",
}: {
  kind: "whatsapp" | "email" | "phone" | "office";
  size?: "default" | "sm";
}) {
  const wrap =
    kind === "whatsapp"
      ? "bg-[#25D366] text-white"
      : kind === "email"
        ? "bg-brand text-white"
        : kind === "phone"
          ? "bg-emerald-500 text-white"
          : "bg-indigo text-white";
  const box = size === "sm" ? "h-8 w-8 rounded-lg" : "h-10 w-10 rounded-xl";
  const glyph = size === "sm" ? "h-3.5 w-3.5" : "h-[1.15rem] w-[1.15rem]";

  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${box} ${wrap}`}>
      {kind === "whatsapp" && <WhatsAppGlyph className={glyph} />}
      {kind === "email" && (
        <svg className={glyph} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="m4.5 7.5 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      )}
      {kind === "phone" && (
        <svg className={glyph} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8.5 4.5h2.2l1.1 3.2-1.4 1.4a12.5 12.5 0 0 0 4.5 4.5l1.4-1.4 3.2 1.1v2.2a2 2 0 0 1-2.2 2A14.8 14.8 0 0 1 4.5 6.7a2 2 0 0 1 2-2.2Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {kind === "office" && (
        <svg className={glyph} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      )}
    </span>
  );
}

function QuickIcon({ icon }: { icon: (typeof QUICK_ACTIONS)[number]["icon"] }) {
  const common = {
    className: "h-4 w-4",
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M4 10h16" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M20 13.5 12.5 21 3.5 12V3.5H12L20 11.5v2Z" />
          <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.6 9.4a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1.1.9-1.1 1.8" />
          <circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "headset":
      return (
        <svg {...common}>
          <path d="M5 13.5v-1a7 7 0 0 1 14 0v1" />
          <path d="M5 13.5h2.2A1.8 1.8 0 0 1 9 15.3v2.2A1.8 1.8 0 0 1 7.2 19.3H6A1 1 0 0 1 5 18.3v-4.8Z" />
          <path d="M19 13.5h-2.2A1.8 1.8 0 0 0 15 15.3v2.2a1.8 1.8 0 0 0 1.8 1.8H18a1 1 0 0 0 1-1v-4.8Z" />
        </svg>
      );
  }
}

type ChannelRowProps = {
  href: string;
  kind: "whatsapp" | "email" | "phone" | "office";
  title: string;
  detail: string;
  highlight?: boolean;
  external?: boolean;
  compact?: boolean;
};

function ChannelRow({
  href,
  kind,
  title,
  detail,
  highlight,
  external,
  compact = false,
}: ChannelRowProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group flex items-center gap-2.5 rounded-2xl border px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
        compact ? "min-h-[3.25rem] py-2" : "min-h-[66px] gap-3 py-2.5"
      } ${
        highlight
          ? "border-[rgba(37,211,102,0.3)] bg-[rgba(37,211,102,0.08)] hover:bg-[rgba(37,211,102,0.12)]"
          : "border-brand/10 bg-white hover:border-brand/20 hover:bg-brand-soft/40"
      }`}
    >
      <ChannelIcon kind={kind} size={compact ? "sm" : "default"} />
      <span className="min-w-0 flex-1">
        <span className={`block font-bold text-ink ${compact ? "text-[0.8125rem]" : "text-sm"}`}>
          {title}
        </span>
        <span
          className={`mt-0.5 block truncate text-muted ${compact ? "text-[0.68rem]" : "text-xs"}`}
        >
          {detail}
        </span>
      </span>
      <Chevron className="h-3.5 w-3.5 shrink-0 text-muted-soft transition-transform group-hover:translate-x-0.5 md:h-4 md:w-4" />
    </a>
  );
}

function PrimaryWhatsAppBlock({ compact = false }: { compact?: boolean }) {
  const href = whatsappUrl(WA_DEFAULT);

  return (
    <div className="flex h-full flex-col justify-center">
      <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#25D366]/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#128C7E]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" aria-hidden />
        Usually replies quickly
      </p>
      <h3
        className={`font-extrabold tracking-[-0.03em] text-ink ${
          compact ? "mt-2 text-[1.15rem]" : "mt-3 text-[1.35rem] md:text-[1.5rem]"
        }`}
      >
        Start the conversation
      </h3>
      <p
        className={`max-w-md leading-relaxed text-muted ${
          compact ? "mt-1.5 text-[0.8125rem]" : "mt-2 text-sm"
        }`}
      >
        {compact
          ? "Reach us on WhatsApp or email for demos, pricing and support."
          : "Chat with us on WhatsApp for instant answers, demos, pricing and support."}
      </p>

      {compact ? (
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[12px] border border-brand/15 bg-brand-soft px-2.5 text-[0.75rem] font-bold text-brand-deep shadow-[0_8px_18px_rgba(22,119,255,0.1)] transition-all hover:-translate-y-px hover:bg-[#e3f0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" />
              <path d="m4.5 7.5 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            Email
          </a>
          <a
            href={href}
            target={CONTACT.whatsapp ? "_blank" : undefined}
            rel={CONTACT.whatsapp ? "noopener noreferrer" : undefined}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[12px] bg-[linear-gradient(135deg,#25D366_0%,#1ebe57_55%,#128C7E_100%)] px-2.5 text-[0.75rem] font-bold text-white shadow-[0_10px_22px_rgba(37,211,102,0.26)] transition-all hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <WhatsAppGlyph className="h-4 w-4 shrink-0" />
            WhatsApp
          </a>
        </div>
      ) : (
        <a
          href={href}
          target={CONTACT.whatsapp ? "_blank" : undefined}
          rel={CONTACT.whatsapp ? "noopener noreferrer" : undefined}
          className="mt-5 inline-flex h-[3.4rem] w-full items-center justify-between gap-3 rounded-[14px] bg-[linear-gradient(135deg,#25D366_0%,#1ebe57_55%,#128C7E_100%)] px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,211,102,0.28)] transition-all hover:-translate-y-px hover:shadow-[0_16px_32px_rgba(37,211,102,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:text-[0.95rem]"
        >
          <span className="inline-flex items-center gap-2.5">
            <WhatsAppGlyph className="h-5 w-5" />
            Chat on WhatsApp
          </span>
          <Chevron className="h-4 w-4" />
        </a>
      )}

      {phoneDisplay ? (
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl border border-[rgba(37,211,102,0.2)] bg-[rgba(37,211,102,0.08)] ${
            compact ? "mt-2.5 px-3 py-2" : "mt-3 px-3.5 py-2.5"
          }`}
        >
          <a
            href={telHref || href}
            className={`font-semibold text-[#0f766e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 ${
              compact ? "text-[0.8125rem]" : "text-sm"
            }`}
          >
            {phoneDisplay}
          </a>
          <CopyPhoneButton
            value={CONTACT.phone || (CONTACT.whatsapp ? `+${CONTACT.whatsapp}` : phoneDisplay)}
          />
        </div>
      ) : null}

      <ul
        className={`flex flex-wrap text-muted ${
          compact ? "mt-3 gap-x-3 gap-y-1.5 text-[0.68rem]" : "mt-5 gap-x-4 gap-y-2 text-xs"
        }`}
      >
        <li className="inline-flex items-center gap-1.5">
          <span
            className={`inline-flex items-center justify-center rounded-full bg-amber-50 text-amber-500 ${
              compact ? "h-5 w-5" : "h-6 w-6"
            }`}
            aria-hidden
          >
            <svg className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3 4 14h7l-1 7 10-13h-7l0-5Z" />
            </svg>
          </span>
          Fast response
        </li>
        {CONTACT.hours ? (
          <li className="inline-flex items-center gap-1.5">
            <span
              className={`inline-flex items-center justify-center rounded-full bg-brand-soft text-brand ${
                compact ? "h-5 w-5" : "h-6 w-6"
              }`}
              aria-hidden
            >
              <svg
                className={compact ? "h-3 w-3" : "h-3.5 w-3.5"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4.5l3 1.5" strokeLinecap="round" />
              </svg>
            </span>
            {CONTACT.hours}
          </li>
        ) : null}
        {!compact ? (
          <li className="inline-flex items-center gap-1.5">
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-brand"
              aria-hidden
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="9" cy="8" r="2.5" />
                <circle cx="16" cy="9" r="2" />
                <path
                  d="M4.5 17.5a4.5 4.5 0 0 1 9 0M14 17.5a3.5 3.5 0 0 1 5.5-2.9"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            Business support
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function PhoneVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[17.5rem] ${className}`}>
      <Image
        src={ASSETS.phone}
        alt="CM360 WhatsApp chat on a phone — the easiest way to talk to CM360"
        width={1024}
        height={1536}
        unoptimized
        className="h-auto w-full object-contain drop-shadow-[0_24px_48px_rgba(11,35,68,0.18)]"
        sizes="(max-width: 768px) 42vw, 280px"
      />
    </div>
  );
}

function WaysToReachUs({
  omitWhatsApp = false,
  omitEmail = false,
  compact = false,
}: {
  omitWhatsApp?: boolean;
  omitEmail?: boolean;
  compact?: boolean;
}) {
  const showPhone = Boolean(telHref && phoneDisplay);
  const showOffice = Boolean(CONTACT.office);
  const showWhatsApp = !omitWhatsApp;
  const showEmail = !omitEmail;
  const hasChannels = showWhatsApp || showEmail || showPhone || showOffice;

  if (!hasChannels) return null;

  return (
    <div>
      <h3
        className={`font-extrabold tracking-[-0.02em] text-ink ${
          compact ? "text-[0.9375rem]" : "text-base"
        }`}
      >
        Ways to reach us
      </h3>
      <p className={`text-muted ${compact ? "mt-0.5 text-[0.75rem]" : "mt-1 text-sm"}`}>
        {compact ? "Other channels that work for you." : "Choose the channel that works best for you."}
      </p>
      <div className={`space-y-2 ${compact ? "mt-3" : "mt-4 space-y-2.5"}`}>
        {showWhatsApp ? (
          <ChannelRow
            href={whatsappUrl(WA_DEFAULT)}
            kind="whatsapp"
            title="WhatsApp (Recommended)"
            detail="Fastest response"
            highlight
            external={Boolean(CONTACT.whatsapp)}
            compact={compact}
          />
        ) : null}
        {showEmail ? (
          <ChannelRow
            href={`mailto:${CONTACT.email}`}
            kind="email"
            title="Email Us"
            detail={CONTACT.email}
            compact={compact}
          />
        ) : null}
        {showPhone ? (
          <ChannelRow
            href={telHref}
            kind="phone"
            title="Call Us"
            detail={phoneDisplay}
            compact={compact}
          />
        ) : null}
        {showOffice ? (
          <ChannelRow
            href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT.office)}`}
            kind="office"
            title="Office"
            detail={CONTACT.office}
            external
            compact={compact}
          />
        ) : null}
      </div>
    </div>
  );
}

function QuickActions({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid gap-2 ${
        compact ? "grid-cols-2" : "grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3"
      }`}
    >
      {QUICK_ACTIONS.map((action) => (
        <a
          key={action.id}
          href={whatsappUrl(action.message)}
          target={CONTACT.whatsapp ? "_blank" : undefined}
          rel={CONTACT.whatsapp ? "noopener noreferrer" : undefined}
          className={`group flex items-center rounded-2xl border border-brand/10 bg-white/90 transition-colors hover:border-brand/20 hover:bg-brand-soft/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
            compact
              ? "min-h-[3.35rem] gap-2 px-2.5 py-2"
              : "min-h-[4.25rem] gap-3 px-3 py-2.5"
          }`}
        >
          <span
            className={`inline-flex shrink-0 items-center justify-center rounded-full ${action.soft} ${
              compact ? "h-8 w-8" : "h-9 w-9"
            }`}
            style={{ color: action.accent }}
          >
            <QuickIcon icon={action.icon} />
          </span>
          <span className="min-w-0 flex-1">
            <span
              className={`block font-bold leading-snug text-ink ${
                compact ? "text-[0.75rem]" : "text-sm"
              }`}
            >
              {action.title}
            </span>
            {!compact ? (
              <span className="mt-0.5 block text-xs text-muted">{action.detail}</span>
            ) : null}
          </span>
          {!compact ? (
            <Chevron className="h-4 w-4 shrink-0 text-muted-soft transition-transform group-hover:translate-x-0.5" />
          ) : null}
        </a>
      ))}
    </div>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-section relative overflow-hidden"
      aria-labelledby="contact-heading"
      style={{ backgroundImage: `url("${ASSETS.bg}")` }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,251,255,0.78)_0%,rgba(237,246,255,0.55)_40%,rgba(247,251,255,0.82)_100%)]"
        aria-hidden
      />

      <div className="container-page relative z-10 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-brand/15 bg-white/85 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-brand shadow-sm md:px-3.5 md:py-1.5 md:text-[0.7rem]">
            Let&apos;s talk
          </p>
          <h2
            id="contact-heading"
            className="sr-only mt-2.5 text-[clamp(1.55rem,3.4vw,2.65rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-ink md:not-sr-only md:mt-3 md:block"
          >
            Talk to <span className="text-gradient-dark">{BRAND.name}</span>
          </h2>
          <p className="mx-auto mt-2 hidden max-w-2xl leading-relaxed text-muted md:mt-3 md:block md:text-base">
            Questions, demos, pricing or support — reach the CM360 team in the way that works best
            for you.
          </p>
        </div>

        <div className="mx-auto mt-7 max-w-[78rem] rounded-[1.35rem] border border-brand/10 bg-white/92 p-3.5 shadow-[0_20px_60px_rgba(11,35,68,0.08)] backdrop-blur-[2px] sm:rounded-[1.75rem] sm:p-5 md:mt-10 md:p-6 lg:p-7">
          {/* Mobile flow — concise, WhatsApp + Email side by side */}
          <div className="space-y-5 md:hidden">
            <PrimaryWhatsAppBlock compact />
            <WaysToReachUs omitWhatsApp omitEmail compact />
            <div>
              <p className="mb-2.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-brand">
                Quick actions
              </p>
              <QuickActions compact />
            </div>
          </div>

          {/* Tablet */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 items-start gap-6">
              <div className="space-y-6">
                <PrimaryWhatsAppBlock />
                <WaysToReachUs />
              </div>
              <div className="flex justify-center pt-2">
                <PhoneVisual className="max-w-[15.5rem] lg:max-w-[16.5rem]" />
              </div>
            </div>
            <div className="mt-6">
              <QuickActions />
            </div>
          </div>

          {/* Desktop / laptop */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[0.95fr_1.15fr_0.9fr] items-center gap-6 xl:gap-8">
              <WaysToReachUs />
              <PrimaryWhatsAppBlock />
              <div className="relative -my-4 flex justify-center self-stretch">
                <PhoneVisual className="max-w-[16.75rem] xl:max-w-[17.5rem]" />
              </div>
            </div>
            <div className="mt-7 border-t border-brand/10 pt-5">
              <QuickActions />
            </div>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-center text-[0.68rem] leading-snug text-ink-secondary md:mt-6 md:text-xs">
            <span
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"
              aria-hidden
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm0 11.2 4.5-4.5L15.3 7.5 12 10.8 9.7 8.5 8.5 9.7 12 13.2Z" />
              </svg>
            </span>
            <span className="md:hidden">Official CM360 account. Your info stays safe.</span>
            <span className="hidden md:inline">
              You&apos;ll be chatting with our official CM360 business account. Your information is
              safe with us.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
