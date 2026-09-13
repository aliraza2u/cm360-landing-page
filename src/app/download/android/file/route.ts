import { createReadStream, existsSync, statSync } from "node:fs";
import { Readable } from "node:stream";
import {
  getAndroidRelease,
  getLocalApkPath,
  getUpstreamApkUrl,
  isApkServable,
} from "@/lib/android-release";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function contentDisposition(fileName: string) {
  const safe = fileName.replace(/[^\w.\-]+/g, "_");
  return `attachment; filename="${safe}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

/**
 * Stable APK delivery on cm360.site.
 * When ANDROID_APK_URL is set (recommended for production), redirect there so the
 * public URL stays stable while the upstream artifact can be swapped via env.
 * Local public/downloads/*.apk remains a fallback for offline/dev serving.
 */
export async function GET() {
  if (!isApkServable()) {
    return new Response(
      JSON.stringify({
        error: "Official CM360 Android APK is not configured yet.",
        page: "/download/android",
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const upstream = getUpstreamApkUrl();
  if (upstream) {
    // 302 — callers always hit /download/android/file; swap ANDROID_APK_URL freely.
    return new Response(null, {
      status: 302,
      headers: {
        Location: upstream,
        "Cache-Control": "no-store",
      },
    });
  }

  const release = getAndroidRelease();
  const localPath = getLocalApkPath();

  if (existsSync(/*turbopackIgnore: true*/ localPath)) {
    const size = statSync(/*turbopackIgnore: true*/ localPath).size;
    const stream = createReadStream(localPath);
    const webStream = Readable.toWeb(stream) as ReadableStream;

    return new Response(webStream, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Length": String(size),
        "Content-Disposition": contentDisposition(release.fileName),
        "Cache-Control": "private, no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  return new Response("APK unavailable", { status: 404 });
}

export async function HEAD() {
  if (!isApkServable()) {
    return new Response(null, { status: 503 });
  }

  const upstream = getUpstreamApkUrl();
  if (upstream) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: upstream,
        "Cache-Control": "no-store",
      },
    });
  }

  const release = getAndroidRelease();
  const localPath = getLocalApkPath();

  if (existsSync(/*turbopackIgnore: true*/ localPath)) {
    const size = statSync(/*turbopackIgnore: true*/ localPath).size;
    return new Response(null, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Length": String(size),
        "Content-Disposition": contentDisposition(release.fileName),
        "Cache-Control": "private, no-cache",
      },
    });
  }

  return new Response(null, { status: 404 });
}
