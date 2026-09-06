import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { PlatformFlowSection } from "@/components/sections/platform-flow";
import { FeaturesSection } from "@/components/sections/features";
import { MultiDeviceSection } from "@/components/sections/multi-device";
import { AudienceSection } from "@/components/sections/audience";
import { SecuritySection } from "@/components/sections/security";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { ContactSection } from "@/components/sections/contact";
import { BRAND, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: BRAND.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: SITE_URL,
  description:
    "CM360 helps builders and construction companies manage projects, clients, labour, contractors, payments, expenses and business operations from one platform.",
  offers: {
    "@type": "Offer",
    url: "https://app.cm360.site/signup",
  },
  brand: {
    "@type": "Brand",
    name: BRAND.name,
  },
};

export default function Home() {
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
        <PlatformFlowSection />
        <FeaturesSection />
        <MultiDeviceSection />
        <AudienceSection />
        <SecuritySection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
