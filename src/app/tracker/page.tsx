import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { JobTracker } from "@/components/job-tracker";

export const metadata: Metadata = {
  title: "Free job application tracker",
  description:
    "Organize job applications, follow-ups, and next steps in a free tracker saved in your browser.",
};

export default function TrackerPage() {
  return (
    <>
      <SiteHeader />
      <main className="shop-main text-page tracker-page">
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
