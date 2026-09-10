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

/**
 * Digits-only WhatsApp id for https://wa.me/{id}.
 * Accepts local PK mobiles (03XXXXXXXXX) or full international digits.
 */
export function normalizeWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  // Pakistan local mobile: 03XXXXXXXXX → 923XXXXXXXXX
  if (digits.length === 11 && digits.startsWith("0")) {
    return `92${digits.slice(1)}`;
  }

  // Already international (e.g. 923022112345) or other country codes
  return digits;
}

function env(name: string, fallback = ""): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : fallback;
}

/**
 * Real contact channels from env (NEXT_PUBLIC_* so links work in the client bundle).
 * Leave optional fields empty — UI omits them rather than inventing details.
 */
export const CONTACT: {
  email: string;
  whatsapp: string;
  phone: string;
  office: string;
  hours: string;
} = {
  email: env("NEXT_PUBLIC_CONTACT_EMAIL", "support@cm360.site"),
  whatsapp: normalizeWhatsApp(env("NEXT_PUBLIC_CONTACT_WHATSAPP")),
  phone: env("NEXT_PUBLIC_CONTACT_PHONE"),
  office: env("NEXT_PUBLIC_CONTACT_OFFICE"),
  hours: env("NEXT_PUBLIC_CONTACT_HOURS"),
};

export function whatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  if (CONTACT.whatsapp) {
    return `https://wa.me/${CONTACT.whatsapp}?text=${text}`;
  }
  // No WhatsApp number configured yet — keep actions working via email.
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent("CM360 inquiry")}&body=${text}`;
}

/** Public fallback for Google Play / users who cannot access in-app deletion. */
export function accountDeletionMailto() {
  const subject = "CM360 Account Deletion Request";
  const body = [
    "Hello CM360 Support,",
    "",
    "I would like to request deletion of my CM360 account.",
    "",
    "Account email:",
    "Company name (if applicable):",
    "Are you the company Owner? Yes / No",
    "",
    "Please contact me if you need any additional information to verify and process this request.",
  ].join("\n");

  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function supportMailto(subject = "CM360 Support") {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}

export const NAV_LINKS = [
  { href: "#multi-device", label: "How It Works" },
  { href: "#who-its-for", label: "Who It’s For" },
  { href: "#contact", label: "Contact" },
] as const;

/** Optional public social profiles — icons render only when a URL is set. */
export const SOCIAL: {
  linkedin: string;
  youtube: string;
  facebook: string;
  x: string;
} = {
  linkedin: env("NEXT_PUBLIC_SOCIAL_LINKEDIN"),
  youtube: env("NEXT_PUBLIC_SOCIAL_YOUTUBE"),
  facebook: env("NEXT_PUBLIC_SOCIAL_FACEBOOK"),
  x: env("NEXT_PUBLIC_SOCIAL_X"),
};
