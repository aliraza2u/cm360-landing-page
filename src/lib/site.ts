export const SITE_URL = "https://cm360.site";
export const APP_URL = "https://app.cm360.site";
export const APP_SIGN_IN = `${APP_URL}/login`;
export const APP_GET_STARTED = `${APP_URL}/signup`;

export const BRAND = {
  name: "CM360",
  wordmark: "CM360",
  product: "Construction Management Platform",
  tagline: "Build. Manage. Grow.",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#who-its-for", label: "Who It’s For" },
  { href: "#contact", label: "Contact" },
] as const;
