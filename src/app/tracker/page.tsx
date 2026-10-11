import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { JobTracker } from "@/components/job-tracker";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Free job application tracker",
  description:
    "Track job applications, statuses, follow-ups, and next steps in a free browser-based job search tracker. No account required.",
  alternates: {
    canonical: "/tracker",
  },
};

export default function TrackerPage() {
  const trackerStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Role Ready Job Application Tracker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any device with a modern web browser",
    url: new URL("/tracker", siteUrl).toString(),
    description:
      "A free job application tracker for organizing roles, application stages, follow-ups, and next steps. Entries are stored in the visitor's browser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    featureList: [
      "Track job applications and application stages",
      "Search and filter saved roles",
      "Record follow-up dates and next steps",
      "Export a CSV backup",
      "Save entries in the current browser without an account",
    ],
  };

  return (
    <>
      <SiteHeader />
      <main className="shop-main text-page tracker-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(trackerStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        <p className="shop-eyebrow">FREE, PRIVATE-BY-DESIGN TOOL</p>
        <h1>Keep your search <em>in view.</em></h1>
        <p className="text-page__intro">
          Track roles, follow-ups, and next steps in one simple place. Your entries stay in
          this browser; nothing is sent to a Role Ready account or server.
        </p>
        <JobTracker />
      </main>
      <SiteFooter />
    </>
  );
}
