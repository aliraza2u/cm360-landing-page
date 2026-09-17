import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LegalMarkdown } from "@/components/legal-markdown";
import { socialMetadata } from "@/lib/site";

const TERMS_DESCRIPTION =
  "Read the CM360 Terms & Conditions governing use of the CM360 construction management platform, company workspaces, subscriptions, user content, and account services.";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: TERMS_DESCRIPTION,
  alternates: { canonical: "/terms" },
  ...socialMetadata({
    title: "Terms & Conditions | CM360",
    description: TERMS_DESCRIPTION,
    path: "/terms",
  }),
  robots: { index: true, follow: true },
};

async function getTermsMarkdown() {
  const filePath = path.join(process.cwd(), "public", "terms-and-conditions-content.md");
  return readFile(filePath, "utf8");
}

export default async function TermsPage() {
  const markdown = await getTermsMarkdown();

  return (
    <>
      <Header />
      <main className="flex-1 soft-surface">
        <div className="container-page max-w-3xl pb-14 pt-10 md:pb-20 md:pt-14 lg:pb-24">
          <p className="eyebrow">Legal</p>
          <LegalMarkdown content={markdown} />
        </div>
      </main>
      <Footer />
    </>
  );
}
