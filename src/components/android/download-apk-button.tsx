"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconDownloadTray } from "@/components/android/icons";
import { startApkDownload } from "@/components/android/start-apk-download";

type Phase = "idle" | "starting" | "started";

type DownloadApkButtonProps = {
  fileName?: string;
  versionName?: string | null;
  className?: string;
  /** Show trailing arrow (homepage CTA). */
  showArrow?: boolean;
};

function SpinnerIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.25" />
      <path
        d="M17.25 10a7.25 7.25 0 0 0-7.25-7.25"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.5 10.25 8.1 13.75 15.5 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Download CTA with clear starting / started feedback.
 * Keeps the user on-page while the APK download begins in the background.
 */
export function DownloadApkButton({
  fileName = "cm360-android.apk",
  versionName = null,
  className = "h-12 gap-2.5 px-6 text-[0.9375rem]",
  showArrow = false,
}: DownloadApkButtonProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const cleanupRef = useRef<(() => void) | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const onDownload = () => {
    if (phase !== "idle") return;

    setPhase("starting");
    cleanupRef.current?.();
    cleanupRef.current = startApkDownload(fileName);

    const toStarted = window.setTimeout(() => setPhase("started"), 700);
    const toIdle = window.setTimeout(() => {
      setPhase("idle");
      cleanupRef.current?.();
      cleanupRef.current = null;
    }, 4800);
    timersRef.current = [toStarted, toIdle];
  };

  const label =
    phase === "starting"
      ? "Downloading…"
      : phase === "started"
        ? "Download started"
        : "Download APK";

  return (
    <div className="relative inline-flex w-full max-w-full flex-col items-center min-[400px]:w-auto lg:items-start">
      <Button
        type="button"
        variant="primary"
        className={`${className} ${phase !== "idle" ? "pointer-events-none" : ""}`}
        onClick={onDownload}
        aria-label="Download the official CM360 Android APK"
        aria-busy={phase === "starting"}
        aria-live="polite"
      >
        {phase === "starting" ? (
          <SpinnerIcon className="h-[1.125rem] w-[1.125rem] shrink-0" />
        ) : phase === "started" ? (
          <CheckIcon className="h-[1.125rem] w-[1.125rem] shrink-0" />
        ) : (
          <IconDownloadTray className="h-[1.125rem] w-[1.125rem] shrink-0" />
        )}
        <span>{label}</span>
        {phase === "idle" && versionName ? (
          <span className="font-medium opacity-90">v{versionName}</span>
        ) : null}
        {phase === "idle" && showArrow ? (
          <IconArrowRight className="h-4 w-4 shrink-0 opacity-90" />
        ) : null}
      </Button>

      <div
        className={`absolute left-0 top-[calc(100%+0.5rem)] z-30 w-[min(100vw-2rem,22rem)] overflow-hidden transition-all duration-300 ${
          phase === "idle"
            ? "pointer-events-none max-h-0 translate-y-1 opacity-0"
            : "max-h-24 translate-y-0 opacity-100"
        }`}
        aria-hidden={phase === "idle"}
      >
        <p
          role="status"
          aria-live="polite"
          className="rounded-xl border border-brand/15 bg-brand-soft/95 px-3.5 py-2.5 text-[0.8125rem] leading-snug text-brand-deep shadow-sm backdrop-blur-sm"
        >
          {phase === "starting"
            ? "Preparing your official CM360 APK…"
            : "Download started — check your browser’s downloads. The file may take a moment on slower connections."}
        </p>
      </div>
    </div>
  );
}
