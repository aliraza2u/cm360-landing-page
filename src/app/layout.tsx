import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SITE_URL, BRAND, SEO, TWITTER_CARD } from "@/lib/site";

const sans = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  // Matches site usage: regular / medium / semibold / bold / extrabold / black
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

function verificationMetadata(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();

  if (!google && !bing) return undefined;

  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: "%s | CM360",
  },
  description: SEO.description,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BRAND.name,
    title: SEO.title,
    description: SEO.description,
    images: [
      {
        url: SEO.ogImage.url,
        width: SEO.ogImage.width,
        height: SEO.ogImage.height,
        type: SEO.ogImage.type,
        alt: SEO.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: TWITTER_CARD,
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/icon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/brand/icon-128.png", sizes: "128x128", type: "image/png" },
    ],
    apple: [{ url: "/brand/icon-128.png", sizes: "128x128", type: "image/png" }],
  },
  verification: verificationMetadata(),
};

export const viewport: Viewport = {
  themeColor: "#145CEB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
