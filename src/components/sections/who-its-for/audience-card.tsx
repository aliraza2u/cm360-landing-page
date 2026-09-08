import Image from "next/image";
import { ACCENT_HEX, type AudienceItem } from "./data";
import { AudienceIcon, CheckIcon } from "./icons";

type AudienceCardProps = {
  item: AudienceItem;
  imageSrc: string;
  compact?: boolean;
  className?: string;
};

export function AudienceCard({
  item,
  imageSrc,
  compact = false,
  className = "",
}: AudienceCardProps) {
  const accent = ACCENT_HEX[item.accent];
  const tagColor = ACCENT_HEX[item.tagDot];

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden border border-brand/10 bg-white shadow-[0_12px_32px_rgba(11,35,68,0.08)] ${
        compact
          ? "rounded-[1.15rem] shadow-[0_10px_28px_rgba(11,35,68,0.07)]"
          : "rounded-[1.35rem]"
      } ${className}`}
    >
      <div
        className={`relative overflow-hidden ${compact ? "h-[7.75rem]" : "h-51 lg:h-54"}`}
      >
        <Image
          src={imageSrc}
          alt={item.imageAlt}
          fill
          unoptimized
          sizes={compact ? "240px" : "(max-width: 1024px) 280px, 220px"}
          className={`object-cover ${compact ? "object-[center_22%]" : "object-[center_18%]"}`}
        />
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/25 to-transparent ${
            compact ? "h-12" : "h-16"
          }`}
          aria-hidden
        />

        <div
          className={`absolute inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/95 font-semibold text-ink shadow-[0_6px_16px_rgba(11,35,68,0.12)] backdrop-blur-sm ${
            compact
              ? "right-2 top-2 px-2 py-0.5 text-[0.6rem]"
              : "right-3 top-3 gap-1.5 px-2.5 py-1 text-[0.68rem]"
          }`}
        >
          <span
            className={`shrink-0 rounded-full ${compact ? "h-1 w-1" : "h-1.5 w-1.5"}`}
            style={{ backgroundColor: tagColor }}
            aria-hidden
          />
          {item.tag}
        </div>
      </div>

      <div
        className={`relative flex flex-1 flex-col text-center ${
          compact ? "px-3 pb-3.5 pt-6" : "px-4 pb-5 pt-8 sm:px-3.5 lg:px-3.5 xl:px-4"
        }`}
      >
        <div
          className={`absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border-[3px] border-white text-white shadow-[0_8px_20px_rgba(11,35,68,0.14)] ${
            compact ? "h-9 w-9 rounded-xl" : "h-11 w-11 rounded-2xl"
          }`}
          style={{ backgroundColor: accent }}
        >
          <AudienceIcon
            name={item.icon}
            className={compact ? "h-3.5 w-3.5" : "h-[1.15rem] w-[1.15rem]"}
          />
        </div>

        <h3
          className={`font-extrabold leading-snug tracking-[-0.02em] text-ink ${
            compact ? "text-[0.875rem]" : "text-[0.92rem] xl:text-[0.98rem]"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`leading-snug text-muted ${
            compact ? "mt-1 text-[0.7rem]" : "mt-1.5 text-[0.75rem] xl:text-[0.8rem]"
          }`}
        >
          {item.description}
        </p>

        <ul className={`text-left ${compact ? "mt-2.5 space-y-1.5" : "mt-4 space-y-2"}`}>
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-1.5">
              <span
                className={`mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full text-white ${
                  compact ? "h-3.5 w-3.5" : "h-4.5 w-4.5"
                }`}
                style={{ backgroundColor: accent }}
                aria-hidden
              >
                <CheckIcon className={compact ? "h-2 w-2" : "h-2.5 w-2.5"} />
              </span>
              <span
                className={`leading-snug text-ink-secondary ${
                  compact ? "text-[0.7rem]" : "text-[0.72rem] xl:text-[0.78rem]"
                }`}
              >
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
