import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-brand-deep via-brand to-cyan text-white shadow-[0_10px_28px_rgba(47,128,237,0.35)] hover:brightness-[1.03] hover:shadow-[0_14px_32px_rgba(47,128,237,0.4)]",
  secondary:
    "bg-white/90 text-ink border border-border hover:border-brand/35 hover:bg-white shadow-sm",
  outline:
    "bg-transparent text-brand-deep border border-brand/30 hover:bg-brand-soft",
  ghost: "bg-transparent text-ink-secondary hover:text-ink hover:bg-white/70",
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
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-60";

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
