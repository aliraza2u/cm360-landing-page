import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL, BRAND } from "@/lib/site";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CM360 | Construction Management Software for Builders",
    template: "%s | CM360",
  },
  description:
    "CM360 helps builders and construction companies manage projects, clients, labour, contractors, payments, expenses and business operations from one platform.",
  applicationName: BRAND.name,
  keywords: [
    "construction management software",
    "CM360",
    "builder project management",
    "contractor management",
    "construction labour payroll",
    "construction expense tracking",
  ],
  authors: [{ name: "CM360" }],
  creator: "CM360",
  publisher: "CM360",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BRAND.name,
    title: "CM360 | Construction Management Software for Builders",
    description:
      "Manage projects, clients, labour, contractors, payments and expenses with one construction management platform. Build. Manage. Grow.",
    images: [
      {
        url: "/brand/og.png",
        width: 512,
        height: 512,
        alt: "CM360 construction management platform logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "CM360 | Construction Management Software for Builders",
    description:
      "Run your construction business from one place — projects, teams, payments and expenses.",
    images: ["/brand/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1A5FD4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
