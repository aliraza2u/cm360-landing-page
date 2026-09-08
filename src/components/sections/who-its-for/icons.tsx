import type { AudienceItem } from "./data";

type IconProps = {
  name: AudienceItem["icon"];
  className?: string;
};

export function AudienceIcon({ name, className = "h-5 w-5" }: IconProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "hardhat":
      return (
        <svg {...common}>
          <path d="M4 14h16v3.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5V14Z" />
          <path d="M12 4v3" />
          <path d="M6.5 14a5.5 5.5 0 0 1 11 0" />
          <path d="M9 7h6" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="16.5" cy="9" r="2.5" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="M14 19a4.5 4.5 0 0 1 6.5-4" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4.5 4.5 0 0 0-6.2 6.2L4 17l3 3 4.5-4.5a4.5 4.5 0 0 0 6.2-6.2l-2.5 2.5-2.5-2.5 2.5-2.5Z" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
          <path d="M14 3.5V8h4.5" />
          <path d="M9 12h6M9 15.5h6" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19.5h16" />
          <path d="M7 19.5V12" />
          <path d="M12 19.5V8" />
          <path d="M17 19.5V5.5" />
        </svg>
      );
  }
}

export function CheckIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.5 8.2 6.4 11l6.1-6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
