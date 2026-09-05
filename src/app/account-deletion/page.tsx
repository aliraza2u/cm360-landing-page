import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { APP_SIGN_IN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account Deletion",
  description: "How to request account deletion for CM360.",
  alternates: { canonical: "/account-deletion" },
};

export default function AccountDeletionPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container-page section-pad max-w-3xl">
          <p className="eyebrow">Account</p>
          <h1 className="section-title mt-3">Account Deletion</h1>
          <p className="section-lead">
            To request deletion of your CM360 account and associated company data, sign in to the
            app or email{" "}
            <a
              href="mailto:support@cm360.site?subject=Account%20deletion%20request"
              className="font-medium text-brand-deep underline-offset-2 hover:underline"
            >
              support@cm360.site
            </a>{" "}
            with the subject “Account deletion request”. Detailed steps will be published here
            once finalized.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={APP_SIGN_IN}
              className="inline-flex text-sm font-semibold text-brand-deep hover:underline"
            >
              Sign in to CM360 →
            </a>
            <Link
              href="/"
              className="inline-flex text-sm font-semibold text-ink-secondary hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
