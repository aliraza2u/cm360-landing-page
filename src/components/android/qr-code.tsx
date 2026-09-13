import QRCode from "qrcode";
import { ANDROID_DOWNLOAD_PATH } from "@/lib/android-paths";
import { absoluteUrl } from "@/lib/site";

type AndroidQrCodeProps = {
  /** Override destination — defaults to the stable official download page. */
  url?: string;
  className?: string;
  size?: number;
};

/**
 * Production QR pointing at the stable /download/android page (not a direct APK CDN URL).
 */
export async function AndroidQrCode({
  url = absoluteUrl(ANDROID_DOWNLOAD_PATH),
  className = "",
  size = 200,
}: AndroidQrCodeProps) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    width: size,
    color: {
      dark: "#0a2240",
      light: "#ffffff",
    },
  });

  return (
    <div
      className={`inline-flex overflow-hidden rounded-2xl border border-[rgba(22,119,255,0.16)] bg-white p-3 shadow-sm ${className}`}
      role="img"
      aria-label={`QR code: scan with your Android phone to open the official CM360 Android download page at ${url}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
