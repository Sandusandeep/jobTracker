import type { Metadata } from "next";
import { ShopHome } from "@/components/shop-home";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Free Job Search Tools for Developers | Role Ready",
  description:
    "Use a free job application tracker, editable job-search templates, and interview-preparation worksheets made for early-career developers.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Role Ready",
    url: new URL("/", siteUrl).toString(),
    description:
      "Free job-search organization tools, including a browser-based application tracker and editable worksheets.",
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ShopHome />
    </>
  );
}
