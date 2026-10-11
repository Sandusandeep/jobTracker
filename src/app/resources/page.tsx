import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Free Job Search Templates & Worksheets",
  description:
    "Download a free job application tracker spreadsheet, weekly job-search planner, and interview story bank worksheet. No account required.",
  alternates: {
    canonical: "/resources",
  },
};

const downloads = [
  {
    title: "Job application tracker",
    description: "A CSV spreadsheet for companies, roles, application stages, follow-ups, and next actions.",
    href: "/downloads/job-search-tracker.csv",
    label: "Download CSV",
  },
  {
    title: "Weekly job-search plan",
    description: "A fill-in worksheet for a manageable weekly goal, time blocks, and end-of-week review.",
    href: "/downloads/weekly-job-search-plan.md",
    label: "Download worksheet",
  },
  {
    title: "Interview story bank",
    description: "Prompts to capture specific situations, actions, results, and lessons from your own experience.",
    href: "/downloads/interview-story-bank.md",
    label: "Download worksheet",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <main className="shop-main text-page">
        <p className="shop-eyebrow">FREE, EDITABLE DOWNLOADS</p>
        <h1>Useful little tools. <em>No account needed.</em></h1>
        <p className="text-page__intro">
          Use the browser tracker for saved roles, then download editable worksheets for your
          weekly plan and interview preparation.
        </p>
        <article className="download-card download-card--featured">
          <div>
            <h2>Use the job tracker in your browser</h2>
            <p>
              Add roles, track stages and follow-ups, search your entries, and export your
              own CSV backup. Data stays in this browser on this device.
            </p>
          </div>
          <Link className="button button--primary" href="/tracker">
            Open the tracker <span aria-hidden="true">→</span>
          </Link>
        </article>
        <div className="download-list">
          {downloads.map((download) => (
            <article className="download-card" key={download.href}>
              <div>
                <h2>{download.title}</h2>
                <p>{download.description}</p>
              </div>
              <a className="button button--primary" href={download.href} download>
                {download.label} <span aria-hidden="true">↓</span>
              </a>
            </article>
          ))}
        </div>
        <aside className="prelaunch-note">
          These templates help with organization and practice only. They do not guarantee
          interviews, employment, or any particular outcome.
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
