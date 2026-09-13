import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { PhoneFrame } from "@/components/mockups/device-frames";
import { AndroidQrCode } from "@/components/android/qr-code";
import { AndroidMark } from "@/components/android/android-mark";
import { AndroidDownloadPageLink } from "@/components/android/android-download-page-link";
import { DownloadApkButton } from "@/components/android/download-apk-button";
import { Button } from "@/components/ui/button";
import {
  IconArrowRight,
  IconCalendar,
  IconFile,
  IconHelpCircle,
  IconPlayStore,
  IconQrCallout,
  IconShieldCheck,
  IconVersion,
} from "@/components/android/icons";
import {
  formatApkSize,
  formatMinAndroid,
  getAndroidRelease,
  getOfficialSiteHost,
} from "@/lib/android-release";
import { ANDROID_DOWNLOAD_PATH } from "@/lib/android-paths";
import { absoluteUrl, BRAND } from "@/lib/site";

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

const ASSETS = {
  bg: publicAsset("assets/apk/bg.png"),
  mobile: publicAsset("assets/apk/mobile-img.png"),
  android: publicAsset("assets/apk/android.png"),
} as const;

const MOBILE_SIZE = { width: 764, height: 1598 } as const;

const INSTALL_STEPS = [
  "Download the official CM360 APK.",
  "Open the downloaded APK.",
  "If Android asks for permission to install from this source, allow it for this install only.",
  "Review the installation screen and install CM360.",
] as const;

type SpecKind = "version" | "date" | "size" | "android" | "signing";

function SpecIcon({ kind }: { kind: SpecKind }) {
  const className = "h-4 w-4";
  switch (kind) {
    case "version":
      return <IconVersion className={className} />;
    case "date":
      return <IconCalendar className={className} />;
    case "size":
      return <IconFile className={className} />;
    case "android":
      return <AndroidMark src={ASSETS.android} size={16} className="h-4 w-4" />;
    case "signing":
      return <IconShieldCheck className={className} />;
  }
}

function SpecTile({
  label,
  value,
  kind,
  wide = false,
  compact = false,
}: {
  label: string;
  value: string;
  kind: SpecKind;
  wide?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`min-w-0 ${wide ? "sm:col-span-2" : ""}`}>
      <div className={`flex items-start ${compact ? "gap-2.5" : "gap-3"}`}>
        <span
          className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand ring-1 ring-[rgba(22,119,255,0.12)] ${
            compact ? "h-8 w-8 rounded-lg" : "h-9 w-9 sm:h-10 sm:w-10"
          }`}
          aria-hidden
        >
          <SpecIcon kind={kind} />
        </span>
        <div className="min-w-0">
          <dt className="text-[0.7rem] font-medium leading-tight text-muted">{label}</dt>
          <dd
            className={`mt-0.5 tracking-[-0.01em] text-ink ${
              wide
                ? "break-all font-mono text-[0.7rem] leading-snug sm:text-[0.75rem]"
                : compact
                  ? "text-[0.8125rem] leading-snug md:text-sm"
                  : "text-[0.8125rem] sm:text-sm md:text-[0.9375rem]"
            }`}
          >
            {value}
          </dd>
        </div>
      </div>
    </div>
  );
}

type QrShareCardProps = {
  isPage: boolean;
  pageUrl: string;
  pageUrlLabel: string;
  /** Hide absolute callout doodle (mobile / tight layouts). */
  showCallout?: boolean;
  compact?: boolean;
  id?: string;
};

/**
 * QR share card — same markup for mobile (QR-only) and tablet/desktop (beside phone).
 */
function QrShareCard({
  isPage,
  pageUrl,
  pageUrlLabel,
  showCallout = false,
  compact = false,
  id,
}: QrShareCardProps) {
  return (
    <div
      id={id}
      className={`relative z-20 w-full scroll-mt-28 ${
        compact ? "max-w-[15.5rem]" : "max-w-[13.25rem] lg:max-w-[13.5rem]"
      }`}
    >
      <div
        className={`rounded-[1.15rem] border border-[rgba(22,119,255,0.14)] bg-white shadow-[0_20px_48px_rgba(11,35,68,0.14)] ${
          compact ? "p-4" : "p-3.5 sm:p-4 lg:p-5"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft ring-1 ring-[rgba(22,119,255,0.12)] sm:h-8 sm:w-8">
            <AndroidMark src={ASSETS.android} size={18} className="h-[1.125rem] w-[1.125rem]" />
          </span>
          <p className="text-[0.8125rem] font-bold tracking-[-0.015em] text-ink sm:text-sm">
            {isPage ? "Share download page" : "Scan to Download"}
          </p>
        </div>

        <div className={compact ? "mt-3" : "mt-2.5 sm:mt-3.5"}>
          <AndroidQrCode
            url={pageUrl}
            size={compact ? 176 : isPage ? 168 : 188}
            className="w-full !rounded-xl border-0 p-1.5 shadow-none"
          />
        </div>

        <div className="mt-2.5 text-[0.6875rem] sm:text-[0.75rem]">
          <AndroidDownloadPageLink label={pageUrlLabel} href={pageUrl} />
        </div>
      </div>

      {showCallout ? (
        <div
          className={`pointer-events-none absolute right-0 hidden text-brand lg:block ${
            isPage ? "-bottom-10 w-36 lg:-bottom-11 lg:w-40" : "-bottom-12 w-40 lg:-bottom-14 lg:w-44"
          }`}
        >
          <IconQrCallout
            className={`ml-auto text-brand ${isPage ? "h-10 w-28" : "h-12 w-32"}`}
          />
          <p
            className={`android-qr-note -mt-1 mr-0.5 text-right leading-snug text-brand ${
              isPage ? "text-[0.6875rem]" : "text-[0.75rem]"
            }`}
          >
            {isPage
              ? "Scan to open this page on another Android phone"
              : "Scan the QR code with your Android phone"}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export type AndroidDownloadExperienceProps = {
  /**
   * `section` — homepage block (h2 + #android-download).
   * `page` — dedicated /download/android route (h1 + page-only extras).
   */
  variant?: "section" | "page";
};

export async function AndroidDownloadExperience({
  variant = "section",
}: AndroidDownloadExperienceProps) {
  const isPage = variant === "page";
  const release = getAndroidRelease();
  const host = getOfficialSiteHost();
  const sizeLabel = formatApkSize(release.fileSizeBytes);
  const minAndroid = formatMinAndroid(release.minSdkVersion);
  const pageUrlLabel = `${host}${ANDROID_DOWNLOAD_PATH}`;
  const pageUrl = absoluteUrl(ANDROID_DOWNLOAD_PATH);

  const topSpecs: { label: string; value: string; kind: SpecKind }[] = [];
  if (release.versionName) {
    topSpecs.push({ label: "Version", value: release.versionName, kind: "version" });
  }
  if (release.releaseDate) {
    topSpecs.push({ label: "Release date", value: release.releaseDate, kind: "date" });
  }
  if (sizeLabel) {
    topSpecs.push({ label: "File size", value: sizeLabel, kind: "size" });
  }

  const extendedSpecs: { label: string; value: string; kind: SpecKind; wide?: boolean }[] = [];
  if (isPage) {
    if (minAndroid) {
      extendedSpecs.push({ label: "Minimum Android", value: minAndroid, kind: "android" });
    }
    if (release.signed === true) {
      extendedSpecs.push({
        label: "Signing",
        value: release.signingScheme
          ? `Digitally signed (${release.signingScheme})`
          : "Digitally signed release build",
        kind: "signing",
      });
    }
  }

  const hasSpecs = topSpecs.length > 0;
  const HeadingTag = isPage ? "h1" : "h2";

  const specsBlock =
    hasSpecs || extendedSpecs.length > 0 ? (
      <div
        className={`rounded-2xl border border-[rgba(22,119,255,0.14)] bg-white shadow-[0_14px_40px_rgba(11,35,68,0.07)] ${
          isPage ? "p-4 md:p-5" : "p-4 sm:p-5 md:p-6"
        }`}
      >
        {hasSpecs ? (
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {topSpecs.map((item) => (
              <SpecTile key={item.label} {...item} compact={isPage} />
            ))}
          </dl>
        ) : null}

        {extendedSpecs.length > 0 ? (
          <>
            {hasSpecs ? (
              <div className="my-4 border-t border-[rgba(22,119,255,0.1)]" role="presentation" />
            ) : null}
            <p className="text-[0.8125rem] font-bold tracking-[-0.015em] text-ink">
              Release details
            </p>
            <dl className="mt-3 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3.5">
              {extendedSpecs.map((item) => (
                <SpecTile key={item.label} {...item} compact />
              ))}
            </dl>
          </>
        ) : null}
      </div>
    ) : null;

  return (
    <section
      id={isPage ? undefined : "android-download"}
      className="android-download-section relative overflow-x-clip overflow-y-hidden"
      aria-labelledby="android-download-heading"
      style={{ backgroundImage: `url("${ASSETS.bg}")` }}
    >
      <div
        className={`container-page relative z-10 ${
          isPage ? "py-8 md:py-10 lg:py-12" : "py-10 sm:py-12 md:py-16 lg:py-20"
        }`}
      >
        <div
          className={`grid min-w-0 gap-7 md:gap-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center ${
            isPage ? "lg:gap-8 xl:gap-10" : "lg:gap-10 xl:gap-14"
          }`}
        >
          {/* ——— Copy column ——— */}
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/90 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand shadow-sm">
              <AndroidMark src={ASSETS.android} size={16} className="h-4 w-4 shrink-0" />
              Android App
            </p>

            <HeadingTag
              id="android-download-heading"
              className={`font-extrabold leading-[1.12] tracking-[-0.035em] text-ink ${
                isPage
                  ? "mt-3 text-[clamp(1.45rem,5.5vw,2.35rem)]"
                  : "mt-3.5 text-[clamp(1.5rem,5.8vw,2.55rem)]"
              }`}
            >
              Get CM360 on Android
            </HeadingTag>

            <p
              className={`font-semibold tracking-[-0.02em] text-brand ${
                isPage
                  ? "mt-2 text-[0.95rem] md:text-[1.0625rem]"
                  : "mt-2.5 text-[1rem] md:text-lg"
              }`}
            >
              Take CM360 with you — on the site.
            </p>

            <p
              className={`max-w-xl leading-relaxed text-muted ${
                isPage
                  ? "mt-2.5 text-[0.875rem] sm:text-[0.9rem] md:text-[0.95rem]"
                  : "mt-3 text-[0.9rem] sm:text-[0.95rem] md:text-base"
              }`}
            >
              {isPage
                ? `Download the official CM360 Android APK directly from ${host}. Manage projects, clients, labour, subcontractors, expenses and payments from your phone.`
                : "Download the official CM360 Android app and manage projects, clients, labour, subcontractors, expenses and payments from your phone."}
            </p>

            <div
              className={`flex flex-col items-center justify-center gap-3 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center lg:justify-start ${
                isPage
                  ? "mt-5 gap-2.5"
                  : "mt-6 gap-3 sm:mt-7 min-[400px]:gap-x-5 min-[400px]:gap-y-3"
              }`}
            >
              {release.available ? (
                <DownloadApkButton
                  fileName={release.fileName}
                  versionName={isPage ? release.versionName : null}
                  showArrow={!isPage}
                  className="h-11 w-full max-w-sm justify-center gap-2.5 px-6 text-[0.9375rem] min-[400px]:h-12 min-[400px]:w-auto min-[400px]:max-w-none min-[400px]:px-7"
                />
              ) : (
                <Button
                  href={isPage ? "/#contact" : ANDROID_DOWNLOAD_PATH}
                  variant="primary"
                  className="h-11 w-full max-w-sm justify-center gap-2.5 px-6 text-[0.9375rem] min-[400px]:h-12 min-[400px]:w-auto min-[400px]:max-w-none min-[400px]:px-7"
                  aria-label={
                    isPage
                      ? "Contact CM360 about the Android app"
                      : "Open the official CM360 Android download page"
                  }
                >
                  {isPage ? "Contact us about the Android app" : "Get Android App"}
                </Button>
              )}

              {isPage ? (
                <Button
                  href="/#android-download"
                  variant="secondary"
                  className="h-11 w-full max-w-sm justify-center gap-2 px-5 text-[0.9375rem] min-[400px]:h-12 min-[400px]:w-fit min-[400px]:max-w-none"
                >
                  Back to overview
                </Button>
              ) : (
                <Link
                  href={ANDROID_DOWNLOAD_PATH}
                  className="group inline-flex items-center justify-center gap-1.5 text-sm font-semibold tracking-[-0.01em] text-brand transition-colors hover:text-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2"
                  aria-label="Open the full CM360 Android download page"
                >
                  View download page
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>

            {!release.available && isPage ? (
              <p className="mt-3 max-w-xl rounded-xl border border-amber-200/80 bg-amber-50 px-3.5 py-3 text-[0.8125rem] leading-relaxed text-amber-950">
                The production Android APK has not been published to this site yet. Once the signed
                release is configured, use Download APK on this page.
              </p>
            ) : null}

            <div className={`flex items-start gap-2.5 ${isPage ? "mt-4" : "mt-5"}`}>
              <span
                className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand ring-1 ring-brand/15"
                aria-hidden
              >
                <IconShieldCheck className="h-4 w-4" />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-sm font-bold text-brand-deep md:text-[0.9375rem]">
                  Official CM360 Android App
                </p>
                <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted md:text-sm">
                  You&apos;re downloading CM360 directly from the official {host} website.
                </p>
              </div>
            </div>

            {/* Mobile (< md): QR only — phone mockup removed to prevent horizontal overflow */}
            <div className="mx-auto mt-7 flex w-full max-w-[15.5rem] justify-center md:hidden">
              <QrShareCard
                isPage={isPage}
                pageUrl={pageUrl}
                pageUrlLabel={pageUrlLabel}
                compact
                id={isPage ? undefined : "android-qr"}
              />
            </div>

            {/* Homepage specs under copy (all breakpoints) */}
            {!isPage && specsBlock ? (
              <div className="mt-7 sm:mt-8 md:mt-9">{specsBlock}</div>
            ) : null}
          </div>

          {/* ——— Tablet + desktop: phone + QR (hidden on mobile) ——— */}
          <div
            className={`relative mx-auto hidden w-full min-w-0 max-w-[30rem] items-end justify-center gap-4 md:flex lg:mx-0 lg:max-w-none lg:justify-end ${
              isPage ? "lg:gap-4 xl:gap-5" : "lg:gap-5 xl:gap-6"
            }`}
          >
            <div className="relative z-10 shrink-0">
              <span
                className="absolute -left-3 -top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_12px_28px_rgba(22,119,255,0.28)] ring-1 ring-[rgba(22,119,255,0.16)] lg:h-12 lg:w-12"
                aria-hidden
              >
                <AndroidMark src={ASSETS.android} size={28} className="h-6 w-6 lg:h-7 lg:w-7" />
              </span>

              <PhoneFrame
                src={ASSETS.mobile}
                alt="CM360 Android app project overview on a phone"
                width={MOBILE_SIZE.width}
                height={MOBILE_SIZE.height}
                unoptimized
                className={
                  isPage
                    ? "!w-[11rem] lg:!w-[12.25rem] xl:!w-[12.75rem]"
                    : "!w-[11.5rem] lg:!w-[13rem] xl:!w-[13.75rem]"
                }
              />
            </div>

            <div className={isPage ? "mb-4 lg:mb-6" : "mb-6 lg:mb-14"}>
              <QrShareCard
                isPage={isPage}
                pageUrl={pageUrl}
                pageUrlLabel={pageUrlLabel}
                showCallout
                id={isPage ? undefined : "android-qr-desktop"}
              />
            </div>
          </div>
        </div>

        {/* ——— Bottom info bar ——— */}
        <div
          className={`rounded-2xl border border-[rgba(22,119,255,0.12)] bg-[rgba(237,246,255,0.78)] shadow-[0_12px_32px_rgba(11,35,68,0.05)] backdrop-blur-sm ${
            isPage
              ? "mt-8 p-4 sm:p-5 md:mt-9 md:p-6 lg:p-7"
              : "mt-10 p-4 sm:mt-12 sm:p-6 md:mt-16 md:p-7 lg:p-8"
          }`}
        >
          <ul className={`grid md:grid-cols-3 md:gap-0 ${isPage ? "gap-5 sm:gap-6" : "gap-6 sm:gap-8"}`}>
            <li className="md:border-r md:border-[rgba(22,119,255,0.16)] md:pr-6 lg:pr-9">
              <span
                className={`inline-flex items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-[rgba(22,119,255,0.14)] ${
                  isPage ? "h-10 w-10 sm:h-11 sm:w-11" : "h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14"
                }`}
              >
                <IconShieldCheck
                  className={isPage ? "h-5 w-5" : "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"}
                />
              </span>
              <h3
                className={`font-bold tracking-[-0.015em] text-ink ${
                  isPage ? "mt-3 text-[0.9375rem]" : "mt-3.5 text-[0.9375rem] sm:mt-4 sm:text-base"
                }`}
              >
                Safe &amp; Secure
              </h3>
              <p
                className={`leading-relaxed text-muted ${
                  isPage
                    ? "mt-1.5 text-[0.8125rem] md:text-sm"
                    : "mt-1.5 text-[0.8125rem] sm:mt-2 sm:text-sm md:text-[0.9375rem]"
                }`}
              >
                Official CM360 release. This is the genuine CM360 Android app, signed and hosted by{" "}
                {host}. No third-party links.
              </p>
            </li>

            <li className="md:border-r md:border-[rgba(22,119,255,0.16)] md:px-6 lg:px-9">
              <span
                className={`inline-flex items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-[rgba(22,119,255,0.14)] ${
                  isPage ? "h-10 w-10 sm:h-11 sm:w-11" : "h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14"
                }`}
              >
                <IconPlayStore
                  className={isPage ? "h-5 w-5" : "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"}
                />
              </span>
              <h3
                className={`font-bold tracking-[-0.015em] text-ink ${
                  isPage ? "mt-3 text-[0.9375rem]" : "mt-3.5 text-[0.9375rem] sm:mt-4 sm:text-base"
                }`}
              >
                Not on Google Play?
              </h3>
              <p
                className={`leading-relaxed text-muted ${
                  isPage
                    ? "mt-1.5 text-[0.8125rem] md:text-sm"
                    : "mt-1.5 text-[0.8125rem] sm:mt-2 sm:text-sm md:text-[0.9375rem]"
                }`}
              >
                Google Play distribution is coming soon. For now, download the official APK directly
                from CM360.
              </p>
            </li>

            <li className="md:pl-6 lg:pl-9">
              <span
                className={`inline-flex items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-[rgba(22,119,255,0.14)] ${
                  isPage ? "h-10 w-10 sm:h-11 sm:w-11" : "h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14"
                }`}
              >
                <IconHelpCircle
                  className={isPage ? "h-5 w-5" : "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"}
                />
              </span>
              <h3
                className={`font-bold tracking-[-0.015em] text-ink ${
                  isPage ? "mt-3 text-[0.9375rem]" : "mt-3.5 text-[0.9375rem] sm:mt-4 sm:text-base"
                }`}
              >
                How to install
              </h3>
              <ol className={`space-y-2 ${isPage ? "mt-2.5" : "mt-2.5 sm:mt-3 sm:space-y-2.5"}`}>
                {INSTALL_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className={`flex gap-2.5 leading-snug text-muted ${
                      isPage
                        ? "text-[0.8125rem] md:text-sm"
                        : "text-[0.8125rem] sm:gap-3 sm:text-sm md:text-[0.9375rem]"
                    }`}
                  >
                    <span
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[0.65rem] font-bold text-white md:h-6 md:w-6 md:text-[0.7rem]"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              {isPage ? (
                <p className="mt-2.5 text-[0.7rem] leading-relaxed text-muted-soft">
                  You do not need to turn off Android security features globally. Only allow
                  installation from {BRAND.name} for this app when Android prompts you.
                </p>
              ) : null}
            </li>
          </ul>
        </div>

        {/* Page: version / release details after Safe & Secure */}
        {isPage && specsBlock ? (
          <div className="mt-5 md:mt-6">{specsBlock}</div>
        ) : null}
      </div>
    </section>
  );
}

/** Homepage Android download block — same UI as /download/android (section variant). */
export async function AndroidDownloadSection() {
  return <AndroidDownloadExperience variant="section" />;
}
