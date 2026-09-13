"use client";

import { useEffect } from "react";

/**
 * Reset window scroll on mount.
 * App Router soft navigations can retain the previous page’s scrollY
 * (especially with html { scroll-behavior: smooth }), so /download/android
 * may open mid/bottom instead of at the top.
 */
export function ScrollToTop() {
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const reset = () => {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    reset();
    const frame = window.requestAnimationFrame(reset);

    return () => {
      window.cancelAnimationFrame(frame);
      html.style.scrollBehavior = previous;
    };
  }, []);

  return null;
}
