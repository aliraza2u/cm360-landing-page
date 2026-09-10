import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LegalMarkdown } from "@/components/legal-markdown";
import { SITE_URL } from "@/lib/site";

const PRIVACY_DESCRIPTION =
  "Read the CM360 Privacy Policy to understand how we collect, use, protect, retain, and delete account and company information.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: PRIVACY_DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | CM360",
    description: PRIVACY_DESCRIPTION,
    url: `${SITE_URL}/privacy`,
  },
};

async function getPrivacyPolicyMarkdown() {
  const filePath = path.join(process.cwd(), "public", "privacy-policy-content.md");
  return readFile(filePath, "utf8");
}

export default async function PrivacyPage() {
  const markdown = await getPrivacyPolicyMarkdown();

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
