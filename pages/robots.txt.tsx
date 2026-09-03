import type { GetServerSideProps } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * robots.txt, generated so the Sitemap line carries an absolute URL.
 *
 * The static file it replaces said `Sitemap: /sitemap.xml`. The spec requires an
 * absolute URL there and crawlers ignore a relative one outright, so the sitemap
 * was invisible to exactly the two search engines we want it read by — with no
 * error anywhere to say so.
 *
 * The checkout pages are not disallowed on purpose. They carry `noindex`, and a
 * crawler has to be allowed to fetch a page to see that it says noindex;
 * blocking them here would preserve them in an index instead of clearing them.
 */

function construir(base: string): string {
  const raiz = base.replace(/\/$/, '')
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${raiz}/sitemap.xml`, ''].join('\n')
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
  res.write(construir(SITE_URL))
  res.end()
  return { props: {} }
}

export default function Robots() {
  return null
}
