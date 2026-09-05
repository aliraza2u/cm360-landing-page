"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { APP_GET_STARTED, APP_SIGN_IN, NAV_LINKS } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background,box-shadow,border-color] ${
        scrolled || open
          ? "border-border/70 bg-white/85 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-white/40 backdrop-blur-md"
      }`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-secondary transition-colors hover:bg-brand-soft/80 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button href={APP_SIGN_IN} variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button href={APP_GET_STARTED}>Get Started</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/90 text-ink shadow-sm lg:hidden"
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
        <div id="mobile-nav" className="border-t border-border bg-white/95 backdrop-blur-xl lg:hidden">
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
            <div className="mt-3 grid gap-2 border-t border-border pt-4">
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
