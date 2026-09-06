import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "onDark" | "onDarkOutline";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-primary text-white shadow-[0_10px_24px_rgba(22,119,255,0.28)] hover:-translate-y-px hover:shadow-[0_14px_30px_rgba(22,119,255,0.34)]",
  secondary:
    "bg-white text-ink border border-[rgba(22,119,255,0.16)] hover:border-brand/35 hover:bg-brand-soft/40 shadow-sm",
  outline:
    "bg-transparent text-brand-deep border border-brand/30 hover:bg-brand-soft",
  ghost: "bg-transparent text-ink-secondary hover:text-ink hover:bg-brand-soft/50",
  onDark:
    "bg-white text-brand-deep shadow-sm hover:bg-white/95 hover:-translate-y-px",
  onDarkOutline:
    "bg-white/10 text-white border border-white/45 backdrop-blur-sm hover:bg-white/18",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-60";

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
