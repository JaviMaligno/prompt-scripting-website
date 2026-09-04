import type { GetServerSideProps } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * The sitemap, generated from SITE_URL rather than written by hand.
 *
 * It used to be a static file in `public/`, and every one of its six entries
 * pointed at `http://localhost:3000` for a while — a crawler discards those
 * silently, and a static file can never learn the host it is being served from.
 * Generating it means the sitemap follows the domain: moving to a subdomain is
 * a change to one environment variable, not six lines nobody remembers to edit.
 *
 * `/checkout/success` and `/checkout/cancelled` are deliberately absent. They
 * are `noindex` and only reachable with a payment behind them; listing them
 * would invite a crawler to a page that means nothing without one.
 */

interface Entrada {
  readonly path: string
  readonly changefreq: 'weekly' | 'monthly' | 'yearly'
  readonly priority: string
}

const PAGINAS: readonly Entrada[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.8' },
  { path: '/changelog', changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/data-handling-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/data-protection-impact-assessment', changefreq: 'yearly', priority: '0.3' },
]

function construir(base: string): string {
  const raiz = base.replace(/\/$/, '')
  const urls = PAGINAS.map(
    (p) =>
      `  <url>\n` +
      `    <loc>${raiz}${p.path === '/' ? '/' : p.path}</loc>\n` +
      `    <changefreq>${p.changefreq}</changefreq>\n` +
      `    <priority>${p.priority}</priority>\n` +
      `  </url>`,
  ).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
  res.write(construir(SITE_URL))
  res.end()
  return { props: {} }
}

export default function Sitemap() {
  return null
}
