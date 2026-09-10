import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  APP_URL,
  BRAND,
  CONTACT,
  SITE_URL,
  accountDeletionMailto,
  supportMailto,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete Your CM360 Account",
  description:
    "Learn how to request deletion of your CM360 account and associated data, including company deletion for workspace owners.",
  alternates: { canonical: "/delete-account" },
  openGraph: {
    title: "Delete Your CM360 Account | CM360",
    description:
      "Learn how to request deletion of your CM360 account and associated data, including company deletion for workspace owners.",
    url: `${SITE_URL}/delete-account`,
  },
};

const PRIVACY_URL = `${SITE_URL}/privacy`;
const TERMS_URL = `${SITE_URL}/terms`;
const HOME_URL = SITE_URL;

const APP_STEPS = [
  "Sign in to CM360.",
  "Open My Profile.",
  "Go to the Account section.",
  "Select Delete Account.",
  "Review the information shown for your account.",
  "Confirm your deletion request.",
] as const;

const MEMBER_BULLETS = [
  "your CM360 login is removed;",
  "your personal profile information is deleted or anonymized;",
  "your company memberships and personal CM360 tasks are removed;",
  "business records that belong to companies you previously worked with remain with those companies where appropriate.",
] as const;

const FAQ_ITEMS = [
  {
    q: "Can I restore my company after the 14-day period?",
    a: "Once the deletion request has been finalized, CM360 does not provide a normal user restoration process. The additional company-data purge period is an internal retention period, not another cancellation period.",
  },
  {
    q: "Does cancelling a subscription delete my account/company?",
    a: "No. Ending subscription access does not delete your CM360 user account, company memberships, or company business records. Account or company deletion must be requested through the process on this page.",
  },
  {
    q: "Are all records deleted immediately?",
    a: "No. CM360 provides a 14-day cancellation period. After finalization, remaining company operational data becomes eligible for permanent purge 7 days after company closure. Limited audit, billing, security, or legally required records may be retained as described in the Privacy Policy.",
  },
] as const;

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[calc(var(--header-h)+1rem)] rounded-2xl border border-[rgba(22,119,255,0.12)] bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6 md:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[1.35rem] font-extrabold tracking-[-0.03em] text-ink md:text-[1.55rem]">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-base font-bold tracking-[-0.02em] text-ink md:text-lg">{children}</h3>;
}

function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`mt-3 text-[0.9375rem] leading-relaxed text-ink-secondary md:text-base ${className}`}
    >
      {children}
    </p>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-ink-secondary md:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedSteps({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="mt-5 list-none space-y-3 p-0">
      {steps.map((step, index) => (
        <li key={step} className="flex gap-3">
          <span
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[0.75rem] font-bold text-brand-deep"
            aria-hidden
          >
            {index + 1}
          </span>
          <span className="pt-0.5 text-[0.9375rem] leading-relaxed text-ink-secondary md:text-base">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warning" | "danger";
  title?: string;
  children: ReactNode;
}) {
  const tones = {
    info: "border-brand/20 bg-brand-wash text-ink-secondary",
    warning: "border-amber/40 bg-amber-50 text-ink-secondary",
    danger: "border-danger/25 bg-red-50 text-ink-secondary",
  } as const;

  return (
    <aside
      className={`mt-5 rounded-xl border px-4 py-3.5 text-[0.875rem] leading-relaxed md:text-[0.9375rem] ${tones[tone]}`}
      role="note"
    >
      {title ? <p className="font-bold text-ink">{title}</p> : null}
      <div className={title ? "mt-1.5" : undefined}>{children}</div>
    </aside>
  );
}

export default function DeleteAccountPage() {
  const deletionMailto = accountDeletionMailto();
  const helpMailto = supportMailto("CM360 account deletion help");

  return (
    <>
      <Header />
      <main className="flex-1 soft-surface">
        <div className="border-b border-[rgba(22,119,255,0.1)] bg-gradient-to-b from-white via-brand-wash/60 to-transparent">
          <div className="container-page max-w-3xl pb-10 pt-10 md:pb-14 md:pt-14">
            <h1 className="section-title mt-6">Delete Your CM360 Account</h1>
            <p className="section-lead max-w-2xl">
              CM360 gives you control over your account and personal information. You can request
              deletion from the CM360 app, or by email if you can no longer access the app.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              CM360 is a construction management platform for projects, clients, labour,
              contractors, payments, expenses and company operations.
            </p>
          </div>
        </div>

        <div className="container-page max-w-3xl space-y-5 py-8 md:space-y-6 md:py-12 lg:py-14">
          <Section id="from-app">
            <SectionHeading>Delete your account from CM360</SectionHeading>
            <Body>If you can sign in to CM360, this is the easiest way to request deletion.</Body>
            <NumberedSteps steps={APP_STEPS} />
            <div className="mt-6">
              <Button href={APP_URL}>Open CM360</Button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              CM360 shows the deletion options available for your account and company ownership.
            </p>
          </Section>

          <Section id="what-happens">
            <SectionHeading>What happens when you request deletion?</SectionHeading>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[rgba(22,119,255,0.1)] bg-brand-wash/50 p-4 sm:p-5">
                <SubHeading>Normal company member</SubHeading>
                <Body className="mt-2">
                  If you do not own a company workspace, you can request deletion of your personal
                  CM360 account.
                </Body>
                <p className="mt-4 text-sm font-semibold text-ink">After completion:</p>
                <BulletList items={MEMBER_BULLETS} />
                <Body>
                  Company records (projects, expenses, payments, and similar) stay with the company
                  workspace. Personal attribution is removed or anonymized where applicable.
                </Body>
              </div>

              <div className="rounded-xl border border-danger/20 bg-red-50/70 p-4 sm:p-5">
                <SubHeading>Company Owner</SubHeading>
                <Body className="mt-2">
                  An Owner account cannot be deleted while leaving an active company without an
                  Owner. Eligible Owners can choose{" "}
                  <span className="font-bold text-danger">Delete Company &amp; Account</span>, which
                  deletes both the Owner account and the company workspace.
                </Body>
                <Callout tone="danger">
                  If the company has other members, they also lose access when the company is
                  closed.
                </Callout>
              </div>
            </div>
          </Section>

          <Section id="cancellation">
            <SectionHeading>14-day cancellation period</SectionHeading>
            <Body>
              After you submit a deletion request, CM360 provides a 14-day cancellation period.
              During that time your request stays pending, your account and company continue to
              operate normally, and you can cancel from My Profile.
            </Body>
            <Callout tone="warning" title="Important">
              After the 14-day period ends and deletion is finalized, it cannot be restored through
              the normal user flow.
            </Callout>
          </Section>

          <Section id="company-deletion">
            <SectionHeading>Company deletion and data removal</SectionHeading>
            <Body>
              When the deletion is finalized, the company workspace is closed, access is removed,
              and company files and operational data enter CM360&apos;s deletion process.
            </Body>
            <Body>
              After the company is closed, CM360 keeps its remaining operational data in a
              restricted deletion state for 7 days before it becomes eligible for permanent purge.
            </Body>
            <Body>
              Operational records are permanently removed from CM360&apos;s active service database
              when the purge is processed. A minimal anonymized record may remain where needed for
              billing, audit, security, or legal purposes.
            </Body>
          </Section>

          <Section id="retention">
            <SectionHeading>Information we may retain</SectionHeading>
            <Body>
              Account deletion removes your account and associated personal information. CM360 may
              still retain limited information where reasonably necessary for security and fraud
              prevention, audit history, billing and subscription records, dispute resolution, or
              legal and regulatory obligations. Identifying details are removed or anonymized where
              appropriate.
            </Body>
            <Body>
              Backup copies may remain until the infrastructure provider&apos;s normal
              backup-retention period expires.
            </Body>
            <p className="mt-4 text-sm">
              <a
                href={PRIVACY_URL}
                className="font-semibold text-brand-deep underline-offset-2 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </Section>

          <Section id="email-request">
            <SectionHeading>Can&apos;t access your CM360 account?</SectionHeading>
            <Body>
              If you have uninstalled CM360, cannot sign in, or cannot use in-app Delete Account,
              request deletion by emailing CM360 support. We review the request, confirm whether the
              account is a member or Owner, start the appropriate deletion process, then delete or
              anonymize personal account information subject to the limited retention in our Privacy
              Policy.
            </Body>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={deletionMailto}>Request Account Deletion</Button>
              <a
                href={`mailto:${CONTACT.email}`}
                className="select-all text-sm font-semibold text-brand-deep underline-offset-2 hover:underline"
              >
                {CONTACT.email}
              </a>
            </div>
            <Callout tone="info">
              For security, CM360 may ask you to verify account ownership. Never send your password
              or one-time authentication codes to support.
            </Callout>
          </Section>

          <Section id="subscription">
            <SectionHeading>Subscription cancellation is different</SectionHeading>
            <Body>
              Ending a company subscription does not automatically delete your CM360 user account,
              company memberships, or company business records. Account or company deletion must be
              requested through the process on this page.
            </Body>
          </Section>

          <Section id="faq">
            <SectionHeading>FAQ</SectionHeading>
            <dl className="mt-5 divide-y divide-[rgba(22,119,255,0.1)]">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q} className="py-4 first:pt-0 last:pb-0">
                  <dt className="text-[0.9375rem] font-bold text-ink md:text-base">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-secondary md:text-[0.9375rem]">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="help" className="border-brand/20 bg-gradient-to-br from-white to-brand-wash">
            <SectionHeading>Need help?</SectionHeading>
            <Body>
              Questions about deleting your CM360 account or company data? Contact CM360 Support.
            </Body>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={helpMailto} variant="secondary">
                Contact Support
              </Button>
              <a
                href={`mailto:${CONTACT.email}`}
                className="select-all text-sm font-semibold text-brand-deep underline-offset-2 hover:underline"
              >
                {CONTACT.email}
              </a>
            </div>
            <nav
              aria-label="Related pages"
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[rgba(22,119,255,0.12)] pt-5 text-sm font-semibold"
            >
              <a href={PRIVACY_URL} className="text-brand-deep hover:underline">
                Privacy Policy
              </a>
              <a href={TERMS_URL} className="text-brand-deep hover:underline">
                Terms &amp; Conditions
              </a>
              <a href={HOME_URL} className="text-brand-deep hover:underline">
                CM360 Home
              </a>
            </nav>
            <p className="mt-6 text-sm text-muted">
              <span className="font-bold text-ink">{BRAND.name}</span>
              <span className="mx-2 text-muted-soft">·</span>
              {BRAND.product}
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
