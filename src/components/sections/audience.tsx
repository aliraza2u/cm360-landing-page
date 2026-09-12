import fs from "node:fs";
import path from "node:path";
import { AudienceCard } from "./who-its-for/audience-card";
import { AudienceCarousel } from "./who-its-for/audience-carousel";
import { AudienceConnector } from "./who-its-for/audience-connector";
import { AUDIENCES } from "./who-its-for/data";

/** Bust cache when public assets are replaced. */
function publicAsset(relPath: string) {
  const filePath = path.join(process.cwd(), "public", relPath);
  let version = "1";
  try {
    version = String(Math.floor(fs.statSync(filePath).mtimeMs));
  } catch {
    // keep stable fallback
  }
  return `/${relPath.replace(/^\/+/, "")}?v=${version}`;
}

const BG = publicAsset("assets/whatitsfor/bg.png");

const IMAGE_SRC: Record<string, string> = Object.fromEntries(
  AUDIENCES.map((item) => [item.id, publicAsset(item.image)]),
);

export function AudienceSection() {
  return (
    <section
      id="who-its-for"
      className="who-its-for-section relative overflow-hidden"
      aria-labelledby="audience-heading"
      style={{ backgroundImage: `url("${BG}")` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,251,255,0.72)_0%,rgba(237,246,255,0.55)_45%,rgba(247,251,255,0.8)_100%)]" aria-hidden />

      <div className="container-page relative z-10 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-brand/15 bg-white/85 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-brand shadow-sm md:px-3.5 md:py-1.5 md:text-[0.7rem]">
            Built for real people
          </p>
          <h2
            id="audience-heading"
            className="mt-2.5 text-[clamp(1.55rem,3.4vw,2.65rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-ink md:mt-3"
          >
            Built for construction teams
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-muted md:mt-3 md:text-base">
            From builders and contractors on site to owners and office staff, CM360 keeps everyone
            working from the same records.
          </p>
        </div>

        {/* Desktop / large laptop: five cards in one row */}
        <div className="mt-10 hidden lg:mt-12 lg:block">
          <AudienceConnector />
          <ul className="grid grid-cols-5 gap-3 xl:gap-4">
            {AUDIENCES.map((item) => (
              <li key={item.id} className="min-w-0">
                <AudienceCard item={item} imageSrc={IMAGE_SRC[item.id]} />
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile + tablet: horizontal carousel, Business Owners first */}
        <div className="mt-7 lg:hidden">
          <AudienceCarousel imageSrcById={IMAGE_SRC} />
        </div>

        <div className="mt-8 flex items-center gap-3 md:mt-12 md:gap-4 lg:mt-14">
          <span className="h-px flex-1 bg-linear-to-r from-transparent via-brand/25 to-brand/25" aria-hidden />
          <p className="shrink-0 text-center text-[0.62rem] font-bold uppercase tracking-[0.14em] text-brand md:text-[0.72rem] md:tracking-[0.16em]">
            Same goal. A more connected way.
          </p>
          <span className="h-px flex-1 bg-linear-to-l from-transparent via-brand/25 to-brand/25" aria-hidden />
        </div>
      </div>
    </section>
  );
}
