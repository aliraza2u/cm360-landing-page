import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { APP_URL, BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you requested could not be found on ${BRAND.name}.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 soft-surface">
        <div className="container-page flex max-w-xl flex-col items-start py-16 md:py-24">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-[-0.035em] text-ink">
            Page not found
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            That URL is not part of the CM360 marketing site. Head home, or open a legal page below.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/">Back to homepage</Button>
            <Button href="/privacy" variant="secondary">
              Privacy Policy
            </Button>
            <Button href="/terms" variant="secondary">
              Terms
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted">
            Looking for the app?{" "}
            <Link
              href={APP_URL}
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              Go to app.cm360.site
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
