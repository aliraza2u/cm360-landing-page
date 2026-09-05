import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for CM360 construction management platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container-page section-pad max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="section-title mt-3">Terms of Service</h1>
          <p className="section-lead">
            This page is a placeholder. The full CM360 Terms of Service will be published here
            shortly. For questions about terms of use, contact{" "}
            <a
              href="mailto:support@cm360.site"
              className="font-medium text-brand-deep underline-offset-2 hover:underline"
            >
              support@cm360.site
            </a>
            .
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex text-sm font-semibold text-brand-deep hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
