import { AndroidMark } from "@/components/android/android-mark";
import { IconDownloadTray } from "@/components/android/icons";
import { Button } from "@/components/ui/button";
import { ANDROID_DOWNLOAD_HREF } from "@/lib/site";

type AndroidAppCtaProps = {
  /** Layout classes (flex-1, width, margins) — the halo tracks this wrapper. */
  wrapClassName?: string;
  /** Size/spacing classes for the button itself. */
  className?: string;
  label?: string;
  /** Tighter icon sizing for narrow mobile rows. */
  compact?: boolean;
};

/**
 * Android download CTA for dark surfaces (hero).
 * The halo needs a positioned wrapper, so layout classes go on `wrapClassName`
 * and the button always fills it.
 */
export function AndroidAppCta({
  wrapClassName = "",
  className = "",
  label = "Get Android App",
  compact = false,
}: AndroidAppCtaProps) {
  return (
    <span className={`cta-android-wrap ${wrapClassName}`}>
      <span className="cta-android-halo" aria-hidden />
      <Button
        href={ANDROID_DOWNLOAD_HREF}
        variant="android"
        className={className}
        aria-label="Download the official CM360 Android APK"
      >
        <span className={`cta-android-icon ${compact ? "h-5 w-5" : "h-6 w-6"}`} aria-hidden>
          <AndroidMark
            size={compact ? 14 : 16}
            className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
          />
        </span>
        <span>{label}</span>
        <IconDownloadTray
          className={`cta-android-tray shrink-0 ${
            compact ? "hidden h-3.5 w-3.5 min-[390px]:block" : "h-4 w-4"
          }`}
        />
      </Button>
    </span>
  );
}
