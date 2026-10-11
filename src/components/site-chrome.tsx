import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="shop-header">
      <Link className="shop-brand" href="/" aria-label="Role Ready home">
        <span className="shop-brand__mark" aria-hidden="true">r</span>
        role ready
      </Link>
      <nav className="shop-nav" aria-label="Main navigation">
        <Link href="/tracker">Tracker</Link>
        <Link href="/resources">Downloads</Link>
        <Link className="shop-nav__about" href="/about">About</Link>
        <Link className="shop-nav__cta" href="/tracker">Use the free tracker</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="shop-footer">
      <Link className="shop-brand" href="/">
        <span className="shop-brand__mark" aria-hidden="true">r</span>
        role ready
      </Link>
      <nav className="shop-footer__links" aria-label="Footer navigation">
        <Link href="/resources">Free tools</Link>
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <p className="shop-footer__note">
        Independent templates. No job or income outcomes are promised.
      </p>
    </footer>
  );
}
