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
 * Real contact channels only. Leave optional fields empty — UI omits them
 * rather than inventing phone / office / hours.
 * WhatsApp: digits only with country code (no + or spaces), e.g. "923001112233".
 */
export const CONTACT: {
  email: string;
  whatsapp: string;
  phone: string;
  office: string;
  hours: string;
} = {
  email: "support@cm360.site",
  whatsapp: "",
  phone: "",
  office: "",
  hours: "",
};

export function whatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  if (CONTACT.whatsapp) {
    return `https://wa.me/${CONTACT.whatsapp}?text=${text}`;
  }
  // No WhatsApp number configured yet — keep actions working via email.
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent("CM360 inquiry")}&body=${text}`;
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
  linkedin: "",
  youtube: "",
  facebook: "",
  x: "",
};
