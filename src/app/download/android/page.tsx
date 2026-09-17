import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AndroidDownloadExperience } from "@/components/sections/android-download";
import { ANDROID_DOWNLOAD_PATH } from "@/lib/android-paths";
import { socialMetadata } from "@/lib/site";

const PAGE_TITLE = "Download CM360 for Android";
const PAGE_DESCRIPTION =
  "Download the official CM360 Android APK directly from cm360.site. Google Play distribution is coming soon.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: ANDROID_DOWNLOAD_PATH },
  ...socialMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: ANDROID_DOWNLOAD_PATH,
  }),
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
