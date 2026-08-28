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
- [ ] Set `NEXT_PUBLIC_SITE_URL` in production so canonical/OG URLs are correct; update sitemap base URL accordingly.
- [ ] Optional: Integrate `next-sitemap` to auto-generate `sitemap.xml`.

## Styling

- [X] Typography tuning: Improve Tailwind Prose styles (links, headings, list spacing).
- [X] Print styles: Add print CSS for clean PDF/print of policy pages.

## Code Quality

- [X] DRY component: Create a reusable `MarkdownPage` component to reduce duplication.
- [X] Move Markdown to `content/` (code reads from `content/` with fallback to `public/`; move files when convenient).

## Waitlist

- [ ] Set `WAITLIST_API_URL` (`https://prompt-scripter.vercel.app/api/waitlist`) and `WAITLIST_TOKEN` in Vercel for **both** Preview and Production. Neither is `NEXT_PUBLIC_`; they are read only inside `pages/api/waitlist.ts`. Until they are set the form returns 503 with "Sign-ups are not available right now."

## Pricing & payments

- [ ] **Show the Pro price.** `pages/pricing.tsx` -> `getStaticProps` returns `proPrice: null`
      today. Build a `ProPrice` (`lib/pricing.ts`) from the Stripe Price object there and
      return it; `components/pricing/PlanCard.tsx` already renders it. Read the Stripe
      secret and the Pro price id server-side without a `NEXT_PUBLIC_` prefix, the way
      `pages/api/waitlist.ts` reads its credentials, and keep returning `null` when either
      is missing so a build never fails or invents a figure. Add `revalidate` at the same
      time so a dashboard price change lands without a redeploy. No amount, currency or
      placeholder number goes into this repository.
- [ ] Point Stripe's Checkout Session at `/checkout/success` and `/checkout/cancelled`.
      Both are `noindex`. Neither reads `session_id`; entitlement comes from the webhook.
- [ ] Confirm a cancel path actually exists for the customer (extension popup control or a
      handled inbox at info@javieraguilar.ai). Terms section 6 promises one.
