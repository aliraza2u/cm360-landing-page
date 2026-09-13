/** Icons for the Android download section — sized via className; use shrink-0 on wrappers. */

type IconProps = { className?: string };

export function IconDownloadTray({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5v11M8 11l4 4 4-4M5 17.5h14M6.5 20.5h11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconArrowRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconQrCode({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4h6.5v6.5H4V4ZM13.5 4H20v6.5h-6.5V4ZM4 13.5H10.5V20H4v-6.5Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 13.5H16V16h-2.5v-2.5ZM16.5 16.5H20V20h-3.5v-3.5ZM13.5 17.5H16V20M17.5 13.5H20V16"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.25 6.25h2v2h-2v-2ZM15.75 6.25h2v2h-2v-2ZM6.25 15.75h2v2h-2v-2Z" fill="currentColor" />
    </svg>
  );
}

export function IconShieldCheck({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2.5 4.5 6v5.6c0 4.7 3.15 9 7.5 10.15C16.35 20.6 19.5 16.3 19.5 11.6V6L12 2.5Z"
        fill="currentColor"
        fillOpacity="0.14"
      />
      <path
        d="M12 2.5 4.5 6v5.6c0 4.7 3.15 9 7.5 10.15C16.35 20.6 19.5 16.3 19.5 11.6V6L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="m8.6 11.85 2.35 2.35 4.45-4.55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Version — shield (matches reference). */
export function IconVersion({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 5 6.25v5.1c0 4.2 2.85 8.05 7 9.15 4.15-1.1 7-4.95 7-9.15v-5.1L12 3Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="m9.1 11.9 2 2 3.9-4"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCalendar({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.25" y="5" width="17.5" height="15.25" rx="2.5" stroke="currentColor" strokeWidth="1.85" />
      <path
        d="M8 3.25v3.5M16 3.25v3.5M3.25 10h17.5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="M8 14h.02M12 14h.02M16 14h.02M8 17.5h.02M12 17.5h.02"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconFile({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3.25h7.25L19.5 8.5V20a1.75 1.75 0 0 1-1.75 1.75H7A1.75 1.75 0 0 1 5.25 20V5A1.75 1.75 0 0 1 7 3.25Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path d="M14.25 3.25V8.5h5.25" stroke="currentColor" strokeWidth="1.85" strokeLinejoin="round" />
      <path d="M9 13h6.5M9 16.75h4.25" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    </svg>
  );
}

export function IconPackage({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m12 2.75 8.25 4.5v9.5L12 21.25l-8.25-4.5v-9.5L12 2.75Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.1 20.25 7.25M12 12.1v9.15M12 12.1 3.75 7.25"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconFingerprint({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5a6.75 6.75 0 0 1 6.75 6.75v.85M5.25 11.1A6.75 6.75 0 0 1 12 3.5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="M12 7.15a3.15 3.15 0 0 1 3.15 3.15V14M8.85 10.3A3.15 3.15 0 0 1 12 7.15"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path d="M12 11.35v4.5" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
      <path
        d="M8.1 13.6c0 3.35 1.65 6 4 7.05M15.9 13.6c0 1.45-.3 2.8-.9 4"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="M6 15.35c.55 3.55 2.7 6.2 5.35 7M18 14.85c-.2 1.65-.75 3.15-1.55 4.35"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconExternalLink({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 5h5v5M10 14 19 5M17 14.75V18a1.75 1.75 0 0 1-1.75 1.75h-10A1.75 1.75 0 0 1 3.5 18V8A1.75 1.75 0 0 1 5.25 6.25H9"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Google Play–style triangle mark. */
export function IconPlayStore({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.4 3.15c-.55.3-.9.88-.9 1.5v14.7c0 .62.35 1.2.9 1.5l11.85-8.85L4.4 3.15Z"
        fill="currentColor"
        fillOpacity="0.16"
      />
      <path
        d="M4.4 3.15 16.25 12 4.4 20.85"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="m16.25 12 4.1-2.45c.7-.42.7-1.48 0-1.9L16.25 5.4M16.25 12l4.1 2.45c.7.42.7 1.48 0 1.9L16.25 18.6"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconHelpCircle({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.85" />
      <path
        d="M9.45 9.4a2.55 2.55 0 1 1 3.95 2.15c-.8.5-1.4 1.05-1.4 2.1V14.2"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1.05" fill="currentColor" />
    </svg>
  );
}

export function IconQrCallout({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 140 70" fill="none" aria-hidden>
      <path
        d="M118 10C92 14 62 28 42 46c-8 7-14 14-18 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 5"
      />
      <path
        d="M30 58c-5 3-10 6-16 8 5-1 9-.5 14 1.5-.5-3.5 0-6.5 2-9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
