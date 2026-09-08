export type AudienceAccent = "brand" | "indigo" | "mint" | "amber";

export type AudienceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tag: string;
  tagDot: AudienceAccent;
  accent: AudienceAccent;
  icon: "hardhat" | "people" | "wrench" | "document" | "chart";
  bullets: readonly [string, string, string];
};

/** Business Owners first on all screen sizes. */
export const AUDIENCES: readonly AudienceItem[] = [
  {
    id: "business-owners",
    title: "Business Owners",
    description: "See the bigger picture with complete visibility.",
    image: "assets/whatitsfor/owner.png",
    imageAlt: "Business owner reviewing operations with confidence",
    tag: "Clear insights",
    tagDot: "amber",
    accent: "amber",
    icon: "chart",
    bullets: ["Monitor project performance", "Control costs", "Plan for what's next"],
  },
  {
    id: "construction-managers",
    title: "Construction Managers",
    description: "Keep projects, people and progress on track.",
    image: "assets/whatitsfor/cm.png",
    imageAlt: "Construction manager on site reviewing work on a tablet",
    tag: "On track",
    tagDot: "mint",
    accent: "brand",
    icon: "hardhat",
    bullets: ["Track site progress", "Monitor labour and costs", "Make faster decisions"],
  },
  {
    id: "site-supervisors",
    title: "Site Supervisors",
    description: "Manage daily activity in real time.",
    image: "assets/whatitsfor/ss.png",
    imageAlt: "Site supervisor on a construction site using a tablet",
    tag: "Team updated",
    tagDot: "indigo",
    accent: "indigo",
    icon: "people",
    bullets: ["Mark attendance", "Log site updates", "Capture photos and notes"],
  },
  {
    id: "contractors",
    title: "Contractors & Subbies",
    description: "Stay compliant and informed.",
    image: "assets/whatitsfor/cs.png",
    imageAlt: "Contractor on a construction site ready for work",
    tag: "Work in sync",
    tagDot: "mint",
    accent: "mint",
    icon: "wrench",
    bullets: ["View assignments", "Track hours and work", "Submit records easily"],
  },
  {
    id: "office-finance",
    title: "Office & Finance Teams",
    description: "Get accurate data without the back and forth.",
    image: "assets/whatitsfor/oft.png",
    imageAlt: "Office team member reviewing construction data on a laptop",
    tag: "All in one place",
    tagDot: "brand",
    accent: "brand",
    icon: "document",
    bullets: ["Process payroll", "Track expenses", "Generate reports"],
  },
] as const;

export const ACCENT_HEX: Record<AudienceAccent, string> = {
  brand: "#1677ff",
  indigo: "#5a4cf2",
  mint: "#16a34a",
  amber: "#f59e0b",
};
