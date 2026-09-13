import { existsSync } from "node:fs";
import path from "node:path";
import {
  ANDROID_DOWNLOAD_PATH,
  ANDROID_FILE_PATH,
} from "@/lib/android-paths";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import releaseMeta from "@/data/android-release.json";

export {
  ANDROID_APK_RELATIVE_PATH,
  ANDROID_DOWNLOAD_PATH,
  ANDROID_FILE_PATH,
} from "@/lib/android-paths";

export const ANDROID_DOWNLOAD_URL = absoluteUrl(ANDROID_DOWNLOAD_PATH);
export const ANDROID_FILE_URL = absoluteUrl(ANDROID_FILE_PATH);

export type AndroidRelease = {
  available: boolean;
  fileName: string;
  packageName: string | null;
  versionName: string | null;
  versionCode: number | null;
  minSdkVersion: number | null;
  /** ISO date (YYYY-MM-DD) when known — never invented. */
  releaseDate: string | null;
  fileSizeBytes: number | null;
  sha256: string | null;
  signed: boolean | null;
  signingScheme: string | null;
  /** Absolute public download URL on cm360.site (never an upstream storage URL). */
  downloadUrl: string;
  /** Page users (and QR) should open. */
  pageUrl: string;
  /** True when an upstream URL is configured for redirect. */
  upstreamConfigured: boolean;
};

type ReleaseMetaFile = {
  available?: boolean;
  fileName?: string;
  packageName?: string | null;
  versionName?: string | null;
  versionCode?: number | null;
  minSdkVersion?: number | null;
  releaseDate?: string | null;
  fileSizeBytes?: number | null;
  sha256?: string | null;
  signed?: boolean | null;
  signingScheme?: string | null;
};

function env(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

/** Canonical local APK path — statically scoped under public/downloads. */
export function getLocalApkPath(): string {
  const fromEnv = env("ANDROID_APK_PATH");
  if (fromEnv) {
    return path.isAbsolute(fromEnv)
      ? fromEnv
      : path.join(/*turbopackIgnore: true*/ process.cwd(), fromEnv);
  }
  return path.join(
    /*turbopackIgnore: true*/ process.cwd(),
    "public",
    "downloads",
    "cm360-android.apk",
  );
}

export function getUpstreamApkUrl(): string {
  return env("ANDROID_APK_URL");
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatApkSize(bytes: number | null): string | null {
  if (bytes == null || !Number.isFinite(bytes) || bytes <= 0) return null;
  return formatBytes(bytes);
}

export function formatMinAndroid(minSdk: number | null): string | null {
  if (minSdk == null) return null;
  const names: Record<number, string> = {
    21: "5.0",
    22: "5.1",
    23: "6.0",
    24: "7.0",
    25: "7.1",
    26: "8.0",
    27: "8.1",
    28: "9",
    29: "10",
    30: "11",
    31: "12",
    32: "12L",
    33: "13",
    34: "14",
    35: "15",
  };
  const name = names[minSdk];
  return name ? `Android ${name}+ (API ${minSdk})` : `Android API ${minSdk}+`;
}

/**
 * Marketing/download UI release facts from verified inspect output + env.
 * Run `pnpm android:inspect -- /path/to.apk` after each new EAS/Android build,
 * then update ANDROID_APK_URL in Vercel env to the new artifact URL.
 */
export function getAndroidRelease(): AndroidRelease {
  const meta = releaseMeta as ReleaseMetaFile;
  const upstreamConfigured = Boolean(getUpstreamApkUrl());
  let localPresent = false;
  try {
    localPresent = existsSync(/*turbopackIgnore: true*/ getLocalApkPath());
  } catch {
    localPresent = false;
  }

  const deliveryReady = upstreamConfigured || localPresent;

  return {
    available: Boolean(meta.available) && Boolean(meta.sha256) && deliveryReady,
    fileName: meta.fileName || "cm360-android.apk",
    packageName: meta.packageName ?? null,
    versionName: meta.versionName ?? null,
    versionCode: meta.versionCode ?? null,
    minSdkVersion: meta.minSdkVersion ?? null,
    releaseDate: meta.releaseDate ?? null,
    fileSizeBytes: meta.fileSizeBytes ?? null,
    sha256: meta.sha256 ?? null,
    signed: meta.signed ?? null,
    signingScheme: meta.signingScheme ?? null,
    downloadUrl: ANDROID_FILE_URL,
    pageUrl: ANDROID_DOWNLOAD_URL,
    upstreamConfigured,
  };
}

/** Soft check used by the file route handler. */
export function isApkServable(): boolean {
  if (getUpstreamApkUrl()) return true;
  try {
    return existsSync(/*turbopackIgnore: true*/ getLocalApkPath());
  } catch {
    return false;
  }
}

export function getDownloadPageCanonical(): string {
  return ANDROID_DOWNLOAD_URL;
}

/** Used in copy — never expose preview/localhost in production UI. */
export function getOfficialSiteHost(): string {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return "cm360.site";
  }
}
