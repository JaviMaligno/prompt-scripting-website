import { CHROME_INSTALL_URL, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants'

/**
 * Schema.org data for the homepage, so that Google is told in as many words
 * what this page is about: a browser extension, free to install, for Chrome.
 *
 * The free price is stated and the Pro price is not. Pro costs whatever Stripe
 * says it costs — the pricing page reads it from the API rather than hardcoding
 * it — and writing "10" here would put a second, hand-maintained copy of the
 * price on the site, which is the exact thing that page was built to avoid.
 */
const DATA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: 'BrowserApplication',
  operatingSystem: 'Chrome',
  installUrl: CHROME_INSTALL_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: 'Free to install and use, with limits on templates, runs and dataset rows.',
  },
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(DATA) }}
    />
  )
}
