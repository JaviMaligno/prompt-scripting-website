import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'

/**
 * Pageviews only, deliberately.
 *
 * Vercel's custom events (`track()`) are a Pro feature and record nothing on
 * Hobby — VitaminD found that out and built its own `/api/events` for product
 * events. That is not needed here: this product has accounts, and the funnel
 * that matters (sign up, run, hit a limit, pay) already lives in the backend's
 * own database. The one question this site cannot answer from there is "does
 * anybody arrive at all", which is exactly what pageviews answer.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
