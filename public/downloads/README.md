# Place an optional local APK fallback here (usually not needed in production):
#
#   public/downloads/cm360-android.apk
#
# Production (recommended): set ANDROID_APK_URL in .env / Vercel env to the
# current EAS/CDN artifact URL. Public users always use:
#
#   https://cm360.site/download/android
#   → /download/android/file → 302 to ANDROID_APK_URL
#
# After each new Android build, update in Vercel environment variables:
#   - ANDROID_APK_URL (new artifact URL)
#   - ANDROID_APK_VERSION (e.g. 1.0.30 — shown on the download page)
#
# Optional (size / SHA / min SDK on the page):
#   1. Download the new APK locally
#   2. pnpm android:inspect -- /path/to/new.apk
#   3. Commit src/data/android-release.json
#
# Do not put development, debug, or unsigned APKs in this folder.
# Do not expose ANDROID_APK_URL in the UI or as NEXT_PUBLIC_*.
