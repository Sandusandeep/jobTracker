import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const contactEmail = "sandeepcw54@gmail.com";

export const metadata: Metadata = {
  title: "Contact Role Ready",
  description: "Contact Role Ready with feedback, corrections, or questions about the free job-search tools.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="shop-main text-page">
        <p className="shop-eyebrow">GET IN TOUCH</p>
        <h1>Questions or feedback? <em>Send a note.</em></h1>
        <p className="text-page__intro">
          Share a correction, report an issue with a download, or suggest a tool that would
          make the job search easier.
        </p>
        <article className="prose">
          <p>
            There is no automated support or purchase system active yet. Please do not email
            sensitive personal data, resumes, identification documents, or payment information.
          </p>
          <a className="contact-link" href={`mailto:${contactEmail}?subject=Role%20Ready%20website`}>
            {contactEmail}
          </a>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
