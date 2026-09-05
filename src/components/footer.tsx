import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { APP_SIGN_IN, BRAND, SITE_URL } from "@/lib/site";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/account-deletion", label: "Account Deletion" },
  { href: APP_SIGN_IN, label: "Sign In", external: true },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-white to-brand-wash/40">
      <div className="container-page section-pad !py-12 md:!py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {BRAND.product}
              <br />
              <span className="font-medium text-ink-secondary">{BRAND.tagline}</span>
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-brand-deep"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-brand-deep"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <a
            href={SITE_URL}
            className="font-medium text-ink-secondary transition-colors hover:text-brand-deep"
          >
            cm360.site
          </a>
        </div>
      </div>
    </footer>
  );
}
