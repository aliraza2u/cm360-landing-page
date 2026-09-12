import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/site";

type LogoProps = {
  href?: string;
  className?: string;
  showWordmark?: boolean;
  size?: number;
  onDark?: boolean;
};

export function Logo({
  href = "/",
  className = "",
  showWordmark = true,
  size = 36,
  onDark = false,
}: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/icon-128.png"
        alt=""
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
        priority
      />
      {showWordmark ? (
        <span
          className={`text-[1.15rem] font-bold tracking-tight sm:text-[1.2rem] ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          CM<span className={onDark ? "text-cyan" : "text-brand"}>360</span>
          <span className="sr-only">{BRAND.name}</span>
        </span>
      ) : (
        <span className="sr-only">{BRAND.name}</span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      {content}
    </Link>
  );
}
