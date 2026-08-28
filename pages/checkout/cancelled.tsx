import Link from 'next/link'

import { SeoHead } from '@/components/SeoHead'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

/**
 * The `cancel_url` for the Stripe Checkout Session.
 *
 * Stripe sends the reader here when they back out of the checkout page. No
 * payment was attempted, so there is nothing to undo and nothing to read off
 * the URL. noindex for the same reason as the success page.
 */
export default function CheckoutCancelled() {
  return (
    <>
      <SeoHead
        title="Checkout cancelled"
        description="You left the Prompt Scripter checkout before paying. Nothing was charged."
        path="/checkout/cancelled"
        noindex
      />
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Checkout cancelled
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You left before paying, so nothing was charged and no subscription was created. Your
          account is exactly as it was.
        </p>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Carry on where you were</h2>
          <p className="text-gray-600">
            The free plan does not expire. Reopen the extension popup and keep using it — you can
            start the upgrade again from there whenever you want.
          </p>
        </div>

        <p className="text-gray-600 mb-8">
          If you stopped because something on the checkout page was unclear or looked wrong, tell
          us at{' '}
          <a href="mailto:info@javieraguilar.ai" className="text-primary hover:underline">
            info@javieraguilar.ai
          </a>
          . That is worth knowing.
        </p>

        <p className="text-sm text-gray-500">
          See what each plan includes on the{' '}
          <Link href="/pricing" className="underline hover:text-gray-700">
            pricing page
          </Link>
          .
        </p>
      </main>
      <Footer />
    </>
  )
}
