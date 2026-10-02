# AGENTS.md — Prompt Scripter website

Marketing and legal site for the **Prompt Scripter** Chrome extension: landing page, pricing, waitlist, changelog and legal documents. Next.js 14 (pages router) + TypeScript + Tailwind, deployed on Vercel. This repository is **public** — never commit secrets, private notes or internal infrastructure details.

## Structure

- `pages/` — Next.js pages router only (no `app/` directory). Kebab-case filenames map to routes.
  - `index.tsx` landing; `pricing.tsx`; `changelog.tsx`; legal pages (`privacy.tsx`, `terms.tsx`, `data-handling-policy.tsx`, `data-protection-impact-assessment.tsx`); `checkout/success.tsx` and `checkout/cancelled.tsx`.
  - `robots.txt.tsx`, `sitemap.xml.tsx` — generated SEO files.
  - `api/waitlist.ts` — server-side proxy for waitlist sign-ups (the only API route).
- `components/` — `layout/` (Navbar, Footer), `sections/` (Hero, Features, Demo, CTA, Waitlist; presentation-only), `forms/`, `pricing/PlanCard.tsx`, `MarkdownPage.tsx`, `SeoHead.tsx`.
- `content/*.md` — Markdown sources for the changelog and legal pages, read at build time by `lib/md.ts` (`readMarkdownFromPublic` looks in `content/` first, then `public/`) and rendered by `MarkdownPage` (react-markdown + remark-gfm + rehype-slug/autolink-headings).
- `lib/` — `constants.ts` (site name, URLs from env), `pricing.ts` (plan definitions), `md.ts`.
- `styles/globals.css` — Tailwind layers plus global typography only.
- `WEBSITE_DESIGN_PLAN.md` — original design/content plan (colors, sections).
- `.cursor/rules/*.mdc` — Cursor rules with coding/Tailwind/structure conventions. Some are stale (Windows PowerShell host shell, references to a `prompt-scripter/docs/` path); the code is the source of truth.

Import alias: `@/*` maps to the repo root (`tsconfig.json`).

## Commands

```bash
npm install
npm run dev      # next dev, http://localhost:3000
npm run build    # next build (lint + type errors fail the build)
npm run start    # next start -p 3000
npm run lint     # next lint (eslint next/core-web-vitals)
```

Containerised alternative: `docker compose up` (Node 20 image, bind mount, runs `npm install && npm run dev -- -p 3000`). There is no Dockerfile and no test suite; verify changes with `npm run build` and `npm run lint`.

## Environment variables

| Variable | Used in | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `lib/constants.ts` | Canonical URL for SEO/sitemap; defaults to `http://localhost:3000`. |
| `NEXT_PUBLIC_CHROME_URL` | `lib/constants.ts` | Chrome Web Store install link; defaults to `#`. |
| `WAITLIST_API_URL`, `WAITLIST_TOKEN` | `pages/api/waitlist.ts` | Server-only (never `NEXT_PUBLIC_`). If either is missing the route answers 503. |
| `BILLING_PRICE_URL` | `pages/pricing.tsx` | Public price endpoint of the extension backend; has a default. |

Local env files (`.env*.local`, `*.env`) are gitignored.

## Conventions

- TypeScript strict; function components; pages default-export, shared components use named exports; explicit `Props` interfaces, no `any`.
- Prefer static generation (`getStaticProps`); avoid client-side fetching unless interaction requires it.
- Tailwind-first; custom CSS only for resets/global typography. Primary color `#4F46E5`.
- Accessibility/SEO: one H1 per page, semantic sections, `alt`/`aria-label`, meta via `SeoHead`.
- Commit messages are short, plain-language descriptions of what changes for the reader (English or Spanish both appear in history).

## Content rules and gotchas

- **No price lives in this repo.** Stripe owns the price; `/pricing` fetches it at build time from `BILLING_PRICE_URL` and falls back to pointing at Stripe checkout. Do not add numbers, currencies or placeholder prices (see the header comment in `lib/pricing.ts`).
- **Changelog** (`content/Changelog.md`): newest first, each entry dated with the day the version was packaged, written for users (what changes for them), not as a code diff. The banner line at the top states which version the Chrome Web Store currently serves and when that was checked — only update it once the store actually serves the new version; an entry can be written before that.
- `pages/changelog.tsx` intentionally does not show `lastUpdated`: on Vercel the file mtime is the build time, not the edit time.
- Do not advertise features the extension does not have, and keep legal pages consistent with how the extension actually behaves (e.g. cancellation route, guest mode).
- Waitlist route: honeypot field `company` returns a fake success; upstream 403 means our token is misconfigured (logged, visitor sees a generic error).
- Both `postcss.config.js` and `postcss.config.mjs` exist; the `.js` one adds autoprefixer. Keep them consistent if you touch PostCSS.
- `TODO.md` is gitignored on purpose (private notes do not belong in this public repo).

## Deployment

Vercel, connected to the GitHub repo: `main` deploys to production, PRs get preview deployments. Build command `next build`. Vercel Analytics is enabled via `@vercel/analytics`.
