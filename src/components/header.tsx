"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { APP_GET_STARTED, APP_SIGN_IN, BRAND, NAV_LINKS } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !overHero || scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background,box-shadow,border-color,color] ${
        solid
          ? "border-[rgba(22,119,255,0.12)] bg-white/90 text-ink shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent text-white"
      }`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Logo onDark={!solid} />
          <span
            className={`hidden border-l pl-3 text-[0.7rem] font-medium tracking-wide sm:block ${
              solid
                ? "border-[rgba(22,119,255,0.16)] text-muted"
                : "border-white/25 text-white/70"
            }`}
          >
            {BRAND.tagline}
          </span>
        </div>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                solid
                  ? "text-ink-secondary hover:bg-brand-soft/80 hover:text-ink"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button
            href={APP_SIGN_IN}
            variant={solid ? "ghost" : "onDarkOutline"}
            className="hidden md:inline-flex"
          >
            Sign In
          </Button>
          <Button href={APP_GET_STARTED} variant="primary">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm lg:hidden ${
            solid
              ? "border-[rgba(22,119,255,0.16)] bg-white text-ink"
              : "border-white/30 bg-white/10 text-white backdrop-blur-sm"
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-[18px]">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-200 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] block h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-200 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-[rgba(22,119,255,0.12)] bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 grid gap-2 border-t border-[rgba(22,119,255,0.12)] pt-4">
              <Button href={APP_SIGN_IN} variant="secondary" onClick={() => setOpen(false)}>
                Sign In
              </Button>
              <Button href={APP_GET_STARTED} onClick={() => setOpen(false)}>
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
