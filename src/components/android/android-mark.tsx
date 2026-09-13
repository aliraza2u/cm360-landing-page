import Image from "next/image";

type AndroidMarkProps = {
  className?: string;
  /** Cache-busted public URL when available. */
  src?: string;
  /** Accessible label; decorative when empty. */
  alt?: string;
  size?: number;
};

/**
 * Official Android mascot mark from /public/assets/apk/android.png
 * (transparent background — green bugdroid).
 */
export function AndroidMark({
  className = "",
  src = "/assets/apk/android.png",
  alt = "",
  size = 20,
}: AndroidMarkProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={`object-contain ${className}`}
      aria-hidden={alt ? undefined : true}
    />
  );
}
