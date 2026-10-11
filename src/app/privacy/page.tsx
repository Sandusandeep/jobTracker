import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Role Ready handles information on this static template website.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="shop-main text-page">
        <p className="shop-eyebrow">YOUR PRIVACY</p>
        <h1>Simple by <em>design.</em></h1>
        <p className="text-page__intro">Last updated: October 11, 2026</p>
        <article className="prose">
          <h2>What this site collects</h2>
          <p>
            Role Ready has no accounts, contact form, analytics, advertising pixels, or
            advertising cookies. The free files are downloaded by your browser.
          </p>
          <h2>Browser tracker data</h2>
          <p>
            If you use the job tracker, the entries you add are stored in local browser storage
            on your device. Role Ready does not receive or sync this information. The entries
            remain in that browser until you clear them or clear the browser&apos;s site data.
            Use the tracker&apos;s CSV export to make a backup before clearing browser data or
            moving to another device. Avoid entering sensitive personal information or
            confidential employer information.
          </p>
          <h2>If you contact us</h2>
          <p>
            Contact links open your email application and do not submit a message from this
            site. If you choose to send an email, the site owner receives your address and
            message to respond. Please do not send sensitive personal information.
          </p>
          <h2>Hosting and external sites</h2>
          <p>
            The hosting provider may process technical request data, such as IP addresses,
            browser information, and server logs, to deliver and protect the site. Links to
            external resources or a future storefront are governed by those providers&apos; own
            privacy practices. Review their notices before using them.
          </p>
          <h2>Before paid products launch</h2>
          <p>
            No checkout is currently active. Before connecting a storefront, this notice must
            be updated to name the provider and explain any data it processes, including
            payment, delivery, analytics, and cookie information as applicable.
          </p>
          <p>
            This is a plain-language summary, not legal advice. The publisher should review
            requirements that apply in the locations where the site operates and is visited.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
