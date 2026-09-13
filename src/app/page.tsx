import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { MultiDeviceSection } from "@/components/sections/multi-device";
import { AudienceSection } from "@/components/sections/audience";
import { AndroidDownloadSection } from "@/components/sections/android-download";
import { ContactSection } from "@/components/sections/contact";
import { BRAND, SEO, SITE_URL, SOCIAL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: SEO.title,
  },
  description: SEO.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: absoluteUrl("/"),
    type: "website",
    images: [SEO.ogImage],
  },
  twitter: {
    card: "summary",
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage.url],
  },
};

function buildJsonLd() {
  const sameAs = [
    SOCIAL.linkedin,
    SOCIAL.youtube,
    SOCIAL.facebook,
    SOCIAL.x,
  ].filter(Boolean);

  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.name,
    alternateName: BRAND.alternateName,
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
  };

  if (sameAs.length > 0) {
    organization.sameAs = sameAs;
  }

  const software: Record<string, unknown> = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: BRAND.name,
    alternateName: BRAND.alternateName,
    applicationCategory: "BusinessApplication",
    // Public product surface verified here is the web app — Android claimed only when APK is published.
    operatingSystem: "Web",
    url: SITE_URL,
    description: SEO.description,
    brand: { "@id": `${SITE_URL}/#organization` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: BRAND.name,
      alternateName: BRAND.alternateName,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    }, software],
  };
}

export default function Home() {
  const jsonLd = buildJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main" className="flex-1">
        <HeroSection />
        <ProblemSection />
        <MultiDeviceSection />
        <AudienceSection />
        <AndroidDownloadSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
