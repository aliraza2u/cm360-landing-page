import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for CM360 construction management platform.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container-page section-pad max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="section-title mt-3">Privacy Policy</h1>
          <p className="section-lead">
            This page is a placeholder. The full CM360 Privacy Policy will be published here
            shortly. For privacy-related questions, contact{" "}
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
