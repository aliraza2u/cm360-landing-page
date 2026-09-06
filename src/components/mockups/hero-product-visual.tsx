import { LaptopFrame, PhoneFrame } from "@/components/mockups/device-frames";

const DOODLE_SRC = "/assets/cm360_hero_svg_assets/cm360-hero-accent-doodle.svg";

/** Hero product visual: real CM360 screens inside MacBook Pro + phone frames. */
export function HeroProductVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem] sm:max-w-[42rem] lg:max-w-none xl:max-w-[50rem]">
      {/* Desktop dashboard in MacBook Pro frame */}
      <div className="relative z-10 w-full pl-3 sm:pl-5 lg:pl-6">
        <LaptopFrame
          src="/cm-desktop-home.png"
          alt="CM360 desktop dashboard with profit, cash flow and cost breakdown"
          width={1518}
          height={1088}
          priority
        />
      </div>

      {/* Mobile app overlapping bottom-left of laptop */}
      <div className="absolute bottom-1 left-0 z-20 sm:bottom-0 sm:left-[-0.25rem] md:-bottom-1 md:left-[-0.5rem] lg:-bottom-2 lg:left-[-1.25rem] xl:left-[-2rem]">
        <PhoneFrame
          src="/cm-mobile-home.png"
          alt="CM360 mobile home screen with projects, quick actions and attendance"
          width={778}
          height={1680}
          priority
          className="animate-float !w-[9.75rem] sm:!w-[11rem] md:!w-[12rem] lg:!w-[13rem]"
        />
      </div>

      {/* Accent doodle near the laptop base */}
      <div
        className="pointer-events-none absolute bottom-2 right-[2%] z-30 hidden w-[24%] max-w-[9rem] sm:block md:right-0 lg:bottom-1 lg:-right-1"
        aria-hidden
      >
        <img
          src={DOODLE_SRC}
          alt=""
          width={300}
          height={120}
          className="h-auto w-full opacity-90"
          decoding="async"
        />
      </div>

      {/* Clearance for overlapping phone + laptop base */}
      <div className="h-14 sm:h-16 md:h-12 lg:h-10" aria-hidden />
    </div>
  );
}
