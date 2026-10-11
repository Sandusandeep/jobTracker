# Role Ready

Role Ready is a small, static storefront concept for original job-search organization templates for early-career developers. It is built with Next.js, TypeScript, and CSS. It does not provide recruiting or career-advice services and does not promise job, interview, or income outcomes.

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Check the production build with:

```bash
npm run lint
npm run build
npm start
```

## Current features

- Responsive storefront landing page and accessible template previews.
- Interactive job application tracker with search, stage filters, follow-up reminders, edit/remove, and CSV export.
- Three original downloadable resources: a job application tracker, weekly plan, and interview story bank.
- About, privacy, terms, and contact pages.
- Static site generation, sitemap, robots metadata, and custom icon.
- No account system, database, analytics, ads, affiliate links, or live API integration. Tracker entries stay in browser local storage and are never sent to the site.

The free browser tracker and downloads work without an account. Tracker entries are saved only in the current browser on the current device; users should export a CSV backup before clearing browser data or switching devices. The paid products are concepts; no purchase or payment is active until the owner creates and reviews the finished files, opens a seller account, configures hosted product pages, and updates the applicable product, privacy, and purchase terms. Checkout URLs are only enabled when a valid HTTPS URL is configured.

## Configure hosted checkout

The site never collects payment details. A hosted commerce platform must manage checkout, payment, delivery, taxes, and applicable refunds. The owner is responsible for reviewing the provider's availability, fees, payout rules, tax handling, and seller terms for their country.

Copy `.env.example` to `.env.local` for local setup, or add the same variables to the deployment provider's build environment:

- `NEXT_PUBLIC_CHECKOUT_TRACKER_URL`
- `NEXT_PUBLIC_CHECKOUT_INTERVIEW_URL`
- `NEXT_PUBLIC_CHECKOUT_COMPLETE_URL`

Set each variable to that product's secure hosted checkout or product-page URL. Leave it blank until the real product is ready for sale. Since this site is statically generated, configure the values before building/deploying and redeploy whenever checkout URLs change. These URLs are public links, not secrets.

Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin so the sitemap and metadata use the production domain. `VERCEL_URL` is used for preview deployments.

## Deploy

This is a standard Next.js app without a database or private API key. To publish with Vercel:

1. Push the project to a GitHub repository and import that repository into Vercel.
2. Let Vercel detect Next.js and use the existing `npm run build` command.
3. Deploy once. Vercel assigns a public `vercel.app` address; a custom domain is optional for an initial public release.
4. Set `NEXT_PUBLIC_SITE_URL` to the assigned HTTPS production address in the Vercel project’s environment variables, then redeploy so metadata and the sitemap use the public origin.
5. Verify `/`, `/tracker`, `/resources`, each free download, the policy pages, `/robots.txt`, and `/sitemap.xml`.

No checkout environment variables are needed for this free-tools launch. The owner needs to connect their GitHub and Vercel accounts and should check the public contact address and publisher details before launch. A custom domain can be connected later.

## Content, privacy, and monetization

The templates are original starter resources, not professional advice. Review every downloadable file and legal notice before publishing or selling. No checkout, advertising, affiliate program, or analytics is active. Update the privacy and purchase terms before connecting any third-party storefront or adding tracking.

An aspiration of ₹1,000 per month is not an income forecast or guarantee. Sales require useful finished products, a suitable offer, distribution, and ongoing occasional support and maintenance. A storefront can automate payment and delivery, but it does not automate finding customers.
