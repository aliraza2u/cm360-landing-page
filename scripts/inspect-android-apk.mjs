#!/usr/bin/env node
/**
 * Inspect a production CM360 Android APK and write verified metadata.
 *
 * Usage:
 *   pnpm android:inspect
 *   pnpm android:inspect -- /path/to/cm360.apk
 *
 * Writes: src/data/android-release.json
 * Does not invent fields — only what aapt / apksigner / file hashing can verify.
 */

import { createHash } from "node:crypto";
import { execFileSync, execSync } from "node:child_process";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "src/data/android-release.json");
const defaultApk = path.join(root, "public/downloads/cm360-android.apk");

function findAapt() {
  const envPath = process.env.ANDROID_AAPT?.trim();
  if (envPath && existsSync(envPath)) return envPath;

  const home = process.env.HOME || "";
  const buildToolsRoot = path.join(home, "Library/Android/sdk/build-tools");
  if (existsSync(buildToolsRoot)) {
    const versions = execSync(`ls -1 "${buildToolsRoot}"`, { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean)
      .sort()
      .reverse();
    for (const v of versions) {
      const candidate = path.join(buildToolsRoot, v, "aapt");
      if (existsSync(candidate)) return candidate;
    }
  }
  return null;
}

function findApksigner() {
  const envPath = process.env.ANDROID_APKSIGNER?.trim();
  if (envPath && existsSync(envPath)) return envPath;

  const home = process.env.HOME || "";
  const buildToolsRoot = path.join(home, "Library/Android/sdk/build-tools");
  if (existsSync(buildToolsRoot)) {
    const versions = execSync(`ls -1 "${buildToolsRoot}"`, { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean)
      .sort()
      .reverse();
    for (const v of versions) {
      const candidate = path.join(buildToolsRoot, v, "apksigner");
      if (existsSync(candidate)) return candidate;
    }
  }
  return null;
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function parseAaptDump(dump) {
  const packageName = dump.match(/package:\s+name='([^']+)'/)?.[1] ?? null;
  const versionCodeRaw = dump.match(/versionCode='([^']+)'/)?.[1] ?? null;
  const versionName = dump.match(/versionName='([^']+)'/)?.[1] ?? null;
  const minSdkRaw =
    dump.match(/sdkVersion:'([^']+)'/)?.[1] ??
    dump.match(/minSdkVersion:'([^']+)'/)?.[1] ??
    null;

  return {
    packageName,
    versionCode: versionCodeRaw ? Number(versionCodeRaw) : null,
    versionName,
    minSdkVersion: minSdkRaw ? Number(minSdkRaw) : null,
  };
}

function verifySigning(apksigner, apkPath) {
  try {
    const out = execFileSync(apksigner, ["verify", "--verbose", apkPath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    const verified = /Verified using/i.test(out) || out.toLowerCase().includes("verified");
    const schemes = [];
    if (/v1 scheme/i.test(out) || /JAR signing/i.test(out)) schemes.push("v1");
    if (/v2 scheme/i.test(out)) schemes.push("v2");
    if (/v3 scheme/i.test(out)) schemes.push("v3");
    if (/v4 scheme/i.test(out)) schemes.push("v4");
    return {
      signed: verified,
      signingScheme: schemes.length ? schemes.join("+") : verified ? "verified" : null,
    };
  } catch (err) {
    const msg = String(err?.stderr || err?.message || err);
    console.error("apksigner verify failed:", msg.slice(0, 400));
    return { signed: false, signingScheme: null };
  }
}

const argPath = process.argv.slice(2).find((arg) => arg && arg !== "--");
const apkPath = path.resolve(argPath || process.env.ANDROID_APK_PATH || defaultApk);

if (!existsSync(apkPath)) {
  console.error(`APK not found: ${apkPath}`);
  console.error("Place the production release at public/downloads/cm360-android.apk");
  console.error("or pass a path: pnpm android:inspect -- /path/to/release.apk");
  process.exit(1);
}

const aapt = findAapt();
if (!aapt) {
  console.error("aapt not found. Install Android SDK build-tools or set ANDROID_AAPT.");
  process.exit(1);
}

const dump = execFileSync(aapt, ["dump", "badging", apkPath], { encoding: "utf8" });
const parsed = parseAaptDump(dump);
const fileSizeBytes = statSync(apkPath).size;
const sha256 = sha256File(apkPath);

const apksigner = findApksigner();
const signing = apksigner
  ? verifySigning(apksigner, apkPath)
  : { signed: null, signingScheme: null };

if (!apksigner) {
  console.warn("apksigner not found — signing fields left null (not claimed).");
}

const releaseDate = new Date().toISOString().slice(0, 10);

const meta = {
  available: true,
  fileName: "cm360-android.apk",
  packageName: parsed.packageName,
  versionName: parsed.versionName,
  versionCode: Number.isFinite(parsed.versionCode) ? parsed.versionCode : null,
  minSdkVersion: Number.isFinite(parsed.minSdkVersion) ? parsed.minSdkVersion : null,
  releaseDate,
  fileSizeBytes,
  sha256,
  signed: signing.signed,
  signingScheme: signing.signingScheme,
  notes: `Generated by scripts/inspect-android-apk.mjs from ${path.relative(root, apkPath)}`,
};

writeFileSync(outPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");

// Keep public copy in sync when inspecting a file outside public/downloads
const publicTarget = defaultApk;
if (path.resolve(apkPath) !== path.resolve(publicTarget)) {
  console.log(`Inspected external APK. Copy to public path for local serving:`);
  console.log(`  cp "${apkPath}" "${publicTarget}"`);
}

console.log("Wrote", path.relative(root, outPath));
console.log(JSON.stringify(meta, null, 2));
