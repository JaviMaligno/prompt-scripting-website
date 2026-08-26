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
