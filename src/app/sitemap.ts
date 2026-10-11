import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/tracker", "/resources", "/about", "/privacy", "/terms", "/contact"].map((route) => ({
    url: new URL(route, baseUrl).toString(),
  }));
}
