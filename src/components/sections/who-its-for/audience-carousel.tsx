"use client";

import { useEffect, useRef, useState } from "react";
import { AudienceCard } from "./audience-card";
import { AUDIENCES, type AudienceItem } from "./data";

const SLIDE_GAP = 10;

type AudienceCarouselProps = {
  items?: readonly AudienceItem[];
  imageSrcById: Record<string, string>;
};

export function AudienceCarousel({
  items = AUDIENCES,
  imageSrcById,
}: AudienceCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const card = el.querySelector<HTMLElement>("[data-audience-slide]");
      if (!card) return;
      const width = card.offsetWidth + SLIDE_GAP;
      const next = Math.round(el.scrollLeft / width);
      setActive(Math.max(0, Math.min(items.length - 1, next)));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  const scrollTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-audience-slide]");
    if (!card) return;
    el.scrollTo({ left: index * (card.offsetWidth + SLIDE_GAP), behavior: "smooth" });
  };

  return (
    <div className="relative -mx-5 md:-mx-6">
      <ul
        ref={scrollerRef}
        className="audience-carousel flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 pl-3 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pl-4 md:pr-5"
        aria-label="Audience roles"
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            data-audience-slide
            className="w-[min(12.5rem,61vw)] shrink-0 snap-start"
          >
            <AudienceCard
              item={item}
              imageSrc={imageSrcById[item.id]}
              compact
              className={
                index === active
                  ? "ring-1 ring-brand/20 shadow-[0_14px_34px_rgba(22,119,255,0.12)]"
                  : "opacity-[0.9]"
              }
            />
          </li>
        ))}
      </ul>

      <div
        className="mt-4 flex items-center justify-center gap-1.5"
        role="tablist"
        aria-label="Carousel pages"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Show ${item.title}`}
            onClick={() => scrollTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === active ? "w-5 bg-brand" : "w-1.5 bg-brand/25 hover:bg-brand/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
