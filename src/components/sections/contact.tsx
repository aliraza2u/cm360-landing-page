export function ContactSection() {
  return (
    <section id="contact" className="border-t border-border bg-white py-10 md:py-12">
      <div className="container-page flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">Contact</h2>
          <p className="mt-1 text-sm text-muted">
            Questions about CM360? Reach us at{" "}
            <a
              href="mailto:support@cm360.site"
              className="font-medium text-brand-deep underline-offset-2 hover:underline"
            >
              support@cm360.site
            </a>
          </p>
        </div>
        <a
          href="mailto:support@cm360.site"
          className="inline-flex rounded-xl border border-brand/20 bg-gradient-to-r from-brand-soft to-cyan-soft/60 px-4 py-2.5 text-sm font-semibold text-brand-deep transition-all hover:shadow-sm"
        >
          Email support
        </a>
      </div>
    </section>
  );
}
