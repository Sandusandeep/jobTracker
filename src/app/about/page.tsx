import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "About Role Ready",
  description:
    "Learn why Role Ready makes simple, privacy-conscious job-search tools and editable templates for early-career job seekers.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="shop-main text-page">
        <p className="shop-eyebrow">ABOUT ROLE READY</p>
        <h1>Make the process feel <em>a little lighter.</em></h1>
        <p className="text-page__intro">
          Role Ready is a small independent project making straightforward, editable tools
          for people organizing an early-career job search.
        </p>
        <article className="prose">
          <h2>Why make these?</h2>
          <p>
            Job hunting can create a lot of small tasks to remember: saved roles, follow-ups,
            examples to prepare, and decisions to make. The goal is to offer focused templates
            that work with familiar tools instead of adding another account or subscription.
          </p>
          <h2>A tracker that stays on your device</h2>
          <p>
            The free browser tracker saves entries in your browser storage on your device.
            Nothing syncs to Role Ready, and there is no account. Export a CSV backup if you
            want to move or keep a separate copy of your entries.
          </p>
          <h2>What these tools can—and cannot—do</h2>
          <p>
            A worksheet can help you keep your own information organized. It cannot guarantee
            an interview, a job offer, a salary, or any other career outcome. Hiring decisions
            are made by employers and depend on many factors outside this project&apos;s control.
          </p>
          <h2>Independent and transparent</h2>
          <p>
            This is not an employer, recruiter, or career-counselling service. The free
            downloads work without an account. Paid products are not available until a secure
            external checkout is configured and identified on this site.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
