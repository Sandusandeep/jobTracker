import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { templateProducts } from "@/lib/products";

function ProductCard({ product, featured = false }: {
  product: (typeof templateProducts)[number];
  featured?: boolean;
}) {
  return (
    <article className={`product-card${featured ? " product-card--featured" : ""}`}>
      <div className="product-card__top">
        <span className="product-card__icon" aria-hidden="true">{product.symbol}</span>
        <span className="product-card__badge">{product.eyebrow}</span>
      </div>
      <h3>{product.title}</h3>
      <p className="product-card__description">{product.description}</p>
      <ul>
        {product.includes.map((item) => <li key={item}>{item}</li>)}
      </ul>
      {product.checkoutUrl ? (
        <a className="button button--primary" href={product.checkoutUrl} target="_blank" rel="noreferrer">
          View kit and checkout <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <p className="product-card__status">
          {product.checkoutInvalid
            ? "Checkout link needs a valid HTTPS URL."
            : "Planned product · checkout is not connected yet"}
        </p>
      )}
    </article>
  );
}

export function ShopHome() {
  return (
    <>
      <SiteHeader />
      <main className="shop-main">
        <section className="shop-hero" aria-labelledby="hero-title">
          <div>
            <p className="shop-eyebrow">A SMALL KIT FOR A BIG TRANSITION</p>
            <h1 id="hero-title">Make your job search feel <em>more manageable.</em></h1>
            <p className="shop-hero__copy">
              Simple, editable templates to keep applications moving, prepare your stories,
              and make room for the rest of your life.
            </p>
            <div className="button-row">
              <a className="button button--primary" href="/tracker">Use the free tracker <span aria-hidden="true">→</span></a>
              <a className="button button--secondary" href="/downloads/job-search-tracker.csv" download>
                Get the blank spreadsheet
              </a>
            </div>
            <p className="shop-hero__note">No account. No subscription. Just files you can edit.</p>
          </div>
          <div className="preview-board" role="group" aria-label="Preview of the editable job application tracker">
            <div className="preview-board__top">
              <span>Role Ready / Your search, organized</span>
              <span>01 — Tracker</span>
            </div>
            <div className="preview-board__sheet">
              <div className="preview-board__title">A little more clarity.</div>
              <div className="preview-board__stats">
                <div className="preview-stat"><strong>08</strong><span>roles saved</span></div>
                <div className="preview-stat"><strong>03</strong><span>in progress</span></div>
                <div className="preview-stat"><strong>02</strong><span>next steps</span></div>
              </div>
              <table className="preview-table" aria-label="Example job application tracker rows">
                <thead><tr><th>Company</th><th>Role</th><th>Next step</th></tr></thead>
                <tbody>
                  <tr><td>Northstar</td><td>Frontend dev</td><td><span className="preview-pill">Follow up</span></td></tr>
                  <tr><td>Fieldnotes</td><td>Product engineer</td><td>Prep examples</td></tr>
                  <tr><td>Studio One</td><td>Junior developer</td><td>Save role</td></tr>
                </tbody>
              </table>
            </div>
            <div className="preview-board__sticker">small<br />steps<br />count</div>
          </div>
        </section>

        <div className="proof-strip" aria-label="Product principles">
          <span>Made to be edited</span>
          <span>Works with familiar tools</span>
          <span>Keep your files</span>
          <span>No outcome promises</span>
        </div>

        <section className="shop-section" id="products" aria-labelledby="products-heading">
          <div className="shop-section__heading">
            <div>
              <p className="shop-eyebrow">PRACTICAL, NOT COMPLICATED</p>
              <h2 id="products-heading">Tools for your <em>next step.</em></h2>
              <p className="shop-section__intro">
                Start with the free tracker. The paid kits are in planning; checkout will only
                open once a real product and secure hosted-store link are configured.
              </p>
            </div>
          </div>
          <div className="product-grid">
            {templateProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} featured={index === 2} />
            ))}
          </div>
          <p className="section-disclosure">
            These templates help organize your own search. They do not guarantee interviews,
            employment, or income. Any future purchase will be handled by a clearly identified
            hosted checkout provider.
          </p>
        </section>

        <section className="shop-section" aria-labelledby="how-heading">
          <div className="shop-section__heading">
            <div>
              <p className="shop-eyebrow">A SIMPLE FLOW</p>
              <h2 id="how-heading">Less setup. <em>More doing.</em></h2>
            </div>
          </div>
          <div className="steps-grid">
            <article className="step-card">
              <span className="step-card__number">01 / Choose</span>
              <h3>Pick what helps now</h3>
              <p>Download the free tracker or choose a focused template kit when the shop opens.</p>
            </article>
            <article className="step-card">
              <span className="step-card__number">02 / Make it yours</span>
              <h3>Use the tools you know</h3>
              <p>Edit a copy in your spreadsheet or document app. No special account is required for the free files.</p>
            </article>
            <article className="step-card">
              <span className="step-card__number">03 / Keep moving</span>
              <h3>Take one clear next step</h3>
              <p>Use reminders and prompts to make progress at a pace that works for you.</p>
            </article>
          </div>
        </section>

        <section className="free-panel" id="free-tracker" aria-labelledby="free-heading">
          <div>
            <p className="shop-eyebrow">A USEFUL PLACE TO START</p>
            <h2 id="free-heading">Try the free job-search tracker.</h2>
            <p>
              Use the private-by-design browser tracker, or download a blank spreadsheet for
              Excel and Google Sheets. Your browser entries stay on your device.
            </p>
          </div>
          <div className="button-row">
            <a className="button button--primary" href="/tracker">
              Open the tracker <span aria-hidden="true">→</span>
            </a>
            <a className="button button--secondary" href="/downloads/job-search-tracker.csv" download>
              Download blank CSV <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="shop-section" aria-labelledby="faq-heading">
          <div className="shop-section__heading">
            <div>
              <p className="shop-eyebrow">A FEW THINGS TO KNOW</p>
              <h2 id="faq-heading">Clear answers, <em>no fine print.</em></h2>
            </div>
          </div>
          <div className="faq-list">
            <details>
              <summary>Are the paid kits available to buy today?</summary>
              <p>Not yet. The storefront is being prepared, and no checkout or payment is active. The free tracker is available now.</p>
            </details>
            <details>
              <summary>Do these templates promise a job or interview?</summary>
              <p>No. They are organization and preparation tools only. Hiring decisions depend on many factors outside this site&apos;s control.</p>
            </details>
            <details>
              <summary>Do I need a paid app to use the free file?</summary>
              <p>No. The tracker is a CSV file that can be opened in spreadsheet software or imported into Google Sheets.</p>
            </details>
            <details>
              <summary>Will checkout happen on this website?</summary>
              <p>No card details are collected here. If paid products launch, checkout and file delivery will be handled by a named external storefront.</p>
            </details>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
