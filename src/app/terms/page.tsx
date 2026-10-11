import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the Role Ready template website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="shop-main text-page">
        <p className="shop-eyebrow">SITE INFORMATION</p>
        <h1>A few <em>ground rules.</em></h1>
        <p className="text-page__intro">Last updated: October 11, 2026</p>
        <article className="prose">
          <h2>Templates and general information</h2>
          <p>
            The downloads and descriptions on Role Ready are general organization and
            preparation resources. They are not legal, financial, recruitment, or career
            counselling advice. You are responsible for how you use and adapt a template.
            No employment, interview, or income result is promised.
          </p>
          <h2>Downloads and availability</h2>
          <p>
            Free files are provided as-is for personal job-search organization. Keep a backup
            of your own copies. The browser tracker stores entries locally on the device and
            browser you use; Role Ready cannot restore those entries if you clear them or lose
            access to that browser. Export a CSV backup to keep your own copy. Paid products are
            not offered yet; no payment is taken on this website. If products launch, a named
            external seller will process checkout and digital delivery under its own terms,
            alongside any additional terms published here.
          </p>
          <h2>External links</h2>
          <p>
            Links to third-party tools and services are provided for convenience. Their
            content, availability, policies, and security are controlled by those providers.
            A link does not imply partnership or endorsement.
          </p>
          <h2>Changes</h2>
          <p>
            Site content and these terms may change. Before selling products, the publisher
            should add its legal identity, applicable purchase and refund terms, and any
            jurisdiction-specific disclosures.
          </p>
          <p>
            Questions? Visit the <Link href="/contact">Contact page</Link>. This summary is
            not legal advice.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
