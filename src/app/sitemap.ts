import type { MetadataRoute } from "next";
import { PUBLIC_PAGES, absoluteUrl } from "@/lib/site";

/**
 * Canonical public marketing sitemap.
 * Add new entries to PUBLIC_PAGES in src/lib/site.ts when content pages launch.
 * lastModified is omitted intentionally — do not invent dates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
