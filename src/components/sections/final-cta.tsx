import Image from "next/image";
import { APP_GET_STARTED, APP_SIGN_IN } from "@/lib/site";

export function FinalCtaSection() {
  return (
    <section className="section-pad !pb-10 !pt-6 md:!pb-12" aria-labelledby="cta-heading">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] px-6 py-14 text-center text-white md:px-12 md:py-16">
          <Image
            src="/assets/assets/cta-gradient-blueprint.svg"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,92,235,0.55) 0%, rgba(23,139,250,0.35) 48%, rgba(34,199,232,0.4) 100%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl">
            <h2
              id="cta-heading"
              className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold tracking-[-0.035em] leading-[1.1]"
            >
              Ready to Bring Your Construction Business Together?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
              Manage projects, teams, payments and expenses with CM360.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={APP_GET_STARTED}
                className="inline-flex items-center justify-center rounded-[12px] bg-white px-6 py-2.5 text-sm font-semibold text-brand-deep shadow-sm transition-all hover:-translate-y-px hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
              >
                Get Started
              </a>
              <a
                href={APP_SIGN_IN}
                className="inline-flex items-center justify-center rounded-[12px] border border-white/50 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
