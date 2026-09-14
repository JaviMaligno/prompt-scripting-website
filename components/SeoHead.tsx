import Head from 'next/head'
import { DEFAULT_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL } from '@/lib/constants'

interface SeoHeadProps {
  readonly title?: string
  readonly description?: string
  readonly path?: string
  readonly noindex?: boolean
}

export function SeoHead({ title, description, path, noindex }: SeoHeadProps) {
  // Inner pages read as "Pricing — Prompt Scripter"; the homepage, which has
  // no title of its own to prefix, gets HOME_TITLE rather than the bare brand.
  const fullTitle = title ? `${title} — ${SITE_NAME}` : HOME_TITLE
  const url = path ? `${SITE_URL}${path}` : SITE_URL
  const desc = description || DEFAULT_DESCRIPTION
  // PNG, not SVG: no social network renders an SVG card, so the old og.svg
  // meant every link shared anywhere appeared with no image at all.
  const ogImage = `${SITE_URL}/og.png`
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}

