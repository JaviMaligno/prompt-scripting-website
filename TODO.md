# Website TODOs

## Content/UX

- [X] Heading anchors: Add `rehype-slug` + `rehype-autolink-headings` so users can link to sections.
- [X] Last updated: Read `mtime` of each Markdown file and display it on the page.
- [X] External links: Render links with `target="_blank"` and `rel="noopener noreferrer"`.
\n+- [X] Finalize Terms of Service content.

## SEO

- [X] Update `public/sitemap.xml` with `/privacy`, `/terms`, `/data-handling-policy`, `/data-protection-impact-assessment`.
- [X] Draft noindex: Add `noindex` option to `SeoHead` and apply it for `/terms` until finalized.
\n+- [X] Remove `noindex` from `/terms` after Terms are finalized.
- [X] Set `NEXT_PUBLIC_SITE_URL` in production so canonical/OG URLs are correct; update sitemap base URL accordingly.
      Done 2026-08-28: the variable is set in Production, and `public/sitemap.xml` had six
      entries pointing at `http://localhost:3000` — a crawler discards every one of those,
      and being a static file it would never have picked the host up from the environment.
- [ ] Optional: Integrate `next-sitemap` to auto-generate `sitemap.xml`.

## Styling

- [X] Typography tuning: Improve Tailwind Prose styles (links, headings, list spacing).
- [X] Print styles: Add print CSS for clean PDF/print of policy pages.

## Code Quality

- [X] DRY component: Create a reusable `MarkdownPage` component to reduce duplication.
- [X] Move Markdown to `content/` (code reads from `content/` with fallback to `public/`; move files when convenient).

## Waitlist

- [X] Set `WAITLIST_API_URL` and `WAITLIST_TOKEN` in Vercel for **both** Preview and Production.
      Done 2026-08-28, and verified end to end against production: `GET` gives 405, a valid
      address stores and returns 201, an invalid one 400, and the honeypot returns the same
      success message while the logs confirm it forwarded nothing.

## Pricing & payments

- [X] **Show the Pro price.** Done 2026-09-02, though not the way this entry proposed.
      Reading `STRIPE_SECRET_KEY` here would have meant a second Stripe secret to rotate for
      read-only data. The backend already holds the key and the price id, so it publishes the
      figures at `GET /api/billing/price` and `getStaticProps` reads that. No credential in
      this project, no amount in this repository, and `revalidate: 3600` so a dashboard change
      lands on its own.
      The trap, found only against the live endpoint: the price carries no `tax_behavior`, so
      Stripe reports `unspecified` and the account decides per currency. Treating that as
      "tax added at checkout" would have advertised GBP 10 as GBP 10 plus VAT when the VAT is
      already inside it.

- [X] Point Stripe's Checkout Session at `/checkout/success` and `/checkout/cancelled`.
      Done: the defaults live in the backend's `settings.py`. They had pointed at
      `prompt-scripter.vercel.app`, which is the API — a customer who had just paid would
      have landed on `{"detail":"Not Found"}` as raw JSON.
- [X] Confirm a cancel path actually exists for the customer. Done: the popup's plan strip
      shows **Manage plan** for a subscriber, which opens Stripe's billing portal.
      NOT YET EXERCISED against a live subscription — see the note at the bottom.

## Still open, and worth knowing before a launch

- [ ] **No real payment has ever run through the live setup.** Everything live was verified
      without charging: a `cs_live_` session created, the webhook rejecting unsigned requests,
      the limits correct. The full round trip was verified in test mode only. The first real
      customer is also the first real test of the billing.
- [ ] **The billing portal's happy path is unverified.** It needs a live subscription. What is
      verified is the failure path: it reports the error and restores the button.
- [ ] Two clauses in the Terms want a solicitor's eye: the liability cap and the refund
      wording, which has to sit correctly alongside Stripe's own 60-day refund power.
