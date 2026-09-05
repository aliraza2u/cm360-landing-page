import { APP_GET_STARTED, APP_SIGN_IN } from "@/lib/site";

export function FinalCtaSection() {
  return (
    <section className="section-pad bg-white !pt-4" aria-labelledby="cta-heading">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[1.6rem] px-6 py-12 text-center text-white shadow-lg md:px-12 md:py-16"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-25" />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.18), transparent 35%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2
              id="cta-heading"
              className="font-display text-[clamp(1.7rem,3.4vw,2.45rem)] font-bold tracking-tight"
            >
              Ready to Bring Your Construction Business Together?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
              Manage projects, teams, payments and expenses with CM360.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={APP_GET_STARTED}
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-brand-deep shadow-sm transition-all hover:bg-brand-wash hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
              >
                Get Started
              </a>
              <a
                href={APP_SIGN_IN}
                className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
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
