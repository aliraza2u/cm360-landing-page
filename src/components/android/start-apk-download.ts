"use client";

/**
 * Start the official APK download without App Router navigation.
 * Uses a hidden iframe so a 302 to the upstream host stays CORS-safe
 * and the current page remains visible for download feedback UI.
 */
export function startApkDownload(fileName: string): () => void {
  const frame = document.createElement("iframe");
  frame.style.display = "none";
  frame.setAttribute("aria-hidden", "true");
  frame.title = `Downloading ${fileName}`;
  frame.src = "/download/android/file";
  document.body.appendChild(frame);

  return () => {
    frame.remove();
  };
}
