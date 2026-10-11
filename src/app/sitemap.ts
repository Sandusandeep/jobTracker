import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/tracker", "/resources", "/about", "/privacy", "/terms", "/contact"].map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
