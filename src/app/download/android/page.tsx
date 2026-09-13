import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AndroidDownloadExperience } from "@/components/sections/android-download";
import { ANDROID_DOWNLOAD_PATH } from "@/lib/android-paths";
import { absoluteUrl } from "@/lib/site";

const PAGE_DESCRIPTION =
  "Download the official CM360 Android APK directly from cm360.site. Google Play distribution is coming soon.";

export const metadata: Metadata = {
  title: "Download CM360 for Android",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: ANDROID_DOWNLOAD_PATH },
  openGraph: {
    title: "Download CM360 for Android",
    description: PAGE_DESCRIPTION,
    url: absoluteUrl(ANDROID_DOWNLOAD_PATH),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Download CM360 for Android",
    description: PAGE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function AndroidDownloadPage() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <AndroidDownloadExperience variant="page" />
      </main>
      <Footer />
    </>
  );
}
