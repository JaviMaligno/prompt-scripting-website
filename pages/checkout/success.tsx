import Link from 'next/link'

import { SeoHead } from '@/components/SeoHead'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

/**
 * The `success_url` for the Stripe Checkout Session.
 *
 * Stripe appends `?session_id={CHECKOUT_SESSION_ID}` when the URL is
 * configured with that template. This page deliberately does not read it.
 * Nothing on this site is authenticated, so there is nobody here to show a
 * result to, and a session id in a URL is not something to act on. The
 * subscription is switched on by the webhook the backend receives from
 * Stripe, which is the only account of the payment that can be trusted.
 *
 * noindex: a transactional return page has nothing to offer a search engine,
 * and an indexed "thanks for subscribing" page is a bad search result.
 */
export default function CheckoutSuccess() {
  return (
    <>
      <SeoHead
        title="Payment received"
        description="Your Prompt Scripter Pro payment went through. Reopen the extension to start using it."
        path="/checkout/success"
        noindex
      />
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Payment received
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you. Stripe has taken the payment and will email you the receipt.
        </p>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Reopen the extension popup</h2>
          <p className="text-gray-600">
            That is where Pro switches on — this website has no account to switch on. Close the
            popup if it is open, then open it again so it fetches your plan fresh.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          If it still says Free, give it a moment
        </h2>
        <p className="text-gray-600 mb-4">
          Your plan is not changed by this page. Stripe notifies our backend once the payment
          settles, and the backend upgrades your account when that notification arrives. That is
          usually a few seconds behind the payment, and occasionally longer if Stripe has to retry
          the notification. Reopen the popup once more before assuming anything is wrong.
        </p>
        <p className="text-gray-600 mb-8">
          If you are still on Free several minutes later, write to{' '}
          <a href="mailto:info@javieraguilar.ai" className="text-primary hover:underline">
            info@javieraguilar.ai
          </a>{' '}
          and we will sort it out. You have been charged and the record of it is with Stripe, so
          nothing is lost while we do — do not pay again.
        </p>

        <p className="text-sm text-gray-500">
          What you bought, how billing works, how to cancel and how refunds work are all in the{' '}
          <Link href="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </Link>
          . The plans are on the{' '}
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
