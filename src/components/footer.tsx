import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_GET_STARTED, APP_SIGN_IN, BRAND, SOCIAL } from "@/lib/site";

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

const BG = publicAsset("assets/footer/bg.png");

const EXPLORE_LINKS = [
  { href: "/#multi-device", label: "How It Works" },
  { href: "/#who-its-for", label: "Who It’s For" },
  { href: "/#contact", label: "Contact" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/delete-account", label: "Account Deletion" },
] as const;

const SOCIAL_ITEMS = [
  {
    id: "linkedin",
    href: SOCIAL.linkedin,
    label: "CM360 on LinkedIn",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V23h-4V8.5z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    href: SOCIAL.youtube,
    label: "CM360 on YouTube",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    href: SOCIAL.facebook,
    label: "CM360 on Facebook",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    id: "x",
    href: SOCIAL.x,
    label: "CM360 on X",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.9 2H22l-6.8 7.8L23.5 22h-6.6l-5.2-6.8L6 22H2.9l7.3-8.3L.8 2h6.7l4.7 6.2L18.9 2zm-1.2 18h1.8L6.4 3.9H4.5L17.7 20z" />
      </svg>
    ),
  },
] as const;

/** Only live profiles — empty SOCIAL urls stay hidden. */
const linkedSocial = SOCIAL_ITEMS.filter((item) => Boolean(item.href));

const linkClass =
  "inline-flex min-h-9 items-center text-[0.8125rem] text-ink-secondary transition-all hover:translate-x-0.5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:min-h-11 md:py-1 md:text-[0.9375rem]";

function NavGroup({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <nav aria-label={label}>
      <p className="text-[0.8rem] font-bold tracking-[-0.01em] text-ink md:text-[0.95rem]">
        {title}
      </p>
      <ul className="mt-2.5 space-y-1 md:mt-4 md:space-y-2.5">{children}</ul>
    </nav>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[rgba(22,119,255,0.12)]" aria-hidden />;
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer relative overflow-hidden"
      style={{ backgroundImage: `url("${BG}")` }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(247,251,255,0.28)_48%,rgba(255,255,255,0.15)_100%)]"
        aria-hidden
      />

      <div className="container-page relative z-10 py-10 md:py-14 lg:py-16">
        {/* Top: brand + Get Started */}
        <div className="flex flex-col gap-5 md:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex max-w-xl items-start gap-3 md:gap-5">
            <Link
              href="/"
              className="shrink-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Image
                src="/icon.svg"
                alt={`${BRAND.name} logo`}
                width={88}
                height={88}
                unoptimized
                className="h-12 w-12 object-contain md:h-[5rem] md:w-[5rem] lg:h-[5.5rem] lg:w-[5.5rem]"
              />
            </Link>
            <div className="min-w-0 pt-0.5">
              <Link
                href="/"
                className="inline-block rounded-md text-[1.35rem] font-extrabold leading-none tracking-[-0.04em] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:text-[1.85rem]"
              >
                CM<span className="text-brand">360</span>
              </Link>
              <p className="mt-1.5 text-[0.8125rem] font-semibold tracking-[-0.015em] text-brand-deep md:mt-2 md:text-base">
                {BRAND.alternateName}
              </p>
              <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-muted md:block md:text-[0.9375rem]">
                Construction management software that keeps your projects, people, expenses and
                payments connected in one platform.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch md:items-start lg:w-auto lg:items-end">
            <a
              href={APP_GET_STARTED}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[12px] bg-[linear-gradient(135deg,#145ceb_0%,#1677ff_48%,#23c7e8_100%)] px-5 text-[0.8125rem] font-bold text-white shadow-[0_12px_28px_rgba(22,119,255,0.26)] transition-all hover:-translate-y-px hover:shadow-[0_18px_36px_rgba(22,119,255,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:h-[3.25rem] md:w-auto md:min-w-[15.5rem] md:rounded-[14px] md:px-6 md:text-[0.95rem]"
            >
              Get Started Today
              <svg className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M4 10h11M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <p className="mt-2 inline-flex items-center justify-center gap-1.5 text-[0.75rem] text-ink-secondary md:mt-3 md:justify-start md:gap-2 md:text-sm lg:justify-end">
              <span
                className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-500 text-white md:h-5 md:w-5"
                aria-hidden
              >
                <svg className="h-2.5 w-2.5 md:h-3 md:w-3" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.5 8.2 6.4 11l6.1-6.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              No credit card required
            </p>
          </div>
        </div>

        <div className="my-6 md:my-12">
          <Divider />
        </div>

        {/* Navigation — 3 columns from mobile up */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 lg:max-w-3xl lg:gap-10">
          <NavGroup title="Explore" label="Explore">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </NavGroup>

          <NavGroup title="Legal" label="Legal">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </NavGroup>

          <NavGroup title="Account" label="Account">
            <li>
              <a
                href={APP_SIGN_IN}
                className={`${linkClass} font-semibold text-brand hover:text-brand-deep`}
              >
                Sign In
              </a>
            </li>
          </NavGroup>
        </div>

        <div className="my-6 md:my-12">
          <Divider />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:contents">
            <p className="text-[0.75rem] text-muted-soft md:text-sm">
              © {year} {BRAND.name}. All rights reserved.
            </p>

            <p className="hidden items-center gap-1.5 text-sm font-medium text-ink-secondary md:inline-flex">
              <span className="inline-flex text-brand" aria-hidden>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21s-6.2-3.8-9.2-8.1C1 9.8 2.2 6 5.6 5.2c1.9-.4 3.7.4 4.7 1.8C11.3 5.6 13.1 4.8 15 5.2c3.4.8 4.6 4.6 2.8 7.7C18.2 17.2 12 21 12 21Z" />
                </svg>
              </span>
              Built for real people in construction.
            </p>
          </div>

          {linkedSocial.length > 0 ? (
            <nav aria-label="Social media" className="flex items-center gap-2 md:gap-2.5">
              {linkedSocial.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(22,119,255,0.14)] bg-white/80 text-ink-secondary shadow-sm transition-colors hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:h-10 md:w-10"
                >
                  {item.icon}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
