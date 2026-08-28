import Link from 'next/link'

import { SeoHead } from '@/components/SeoHead'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PlanCard } from '@/components/pricing/PlanCard'
import { Waitlist } from '@/components/sections/Waitlist'
import { CHROME_INSTALL_URL } from '@/lib/constants'
import { FREE_PLAN, PRO_PLAN, type ProPrice } from '@/lib/pricing'

interface PricingProps {
  readonly proPrice: ProPrice | null
}

interface UpgradeStep {
  readonly title: string
  readonly description: string
}

const UPGRADE_STEPS: readonly UpgradeStep[] = [
  {
    title: '1. Open the extension',
    description:
      'Sign in to Prompt Scripter in the popup. That is the only place you have an account with us — this website has no login and is not getting one.',
  },
  {
    title: '2. Choose Pro in the popup',
    description:
      'The popup asks our backend to start a checkout, already attached to the account you are signed in to, and opens Stripe in a new tab. Nothing identifying you travels in the link.',
  },
  {
    title: '3. Pay on Stripe, then come back',
    description:
      'Stripe shows the price, the currency and any tax for where you live before you enter a card. When you are done, reopen the popup and Pro is on.',
  },
]

/**
 * The price slot.
 *
 * `proPrice` is null today, on purpose: no amount, currency or placeholder
 * number is written anywhere in this repository (Stripe owns the price), and
 * PlanCard renders a sensible fallback when it gets null.
 *
 * To turn the price on, build a `ProPrice` here from the Stripe Price object
 * and return it — read STRIPE_SECRET_KEY and the Pro price id server-side,
 * without a NEXT_PUBLIC_ prefix, the way pages/api/waitlist.ts reads its
 * credentials, and keep returning null if either is missing so a build never
 * fails or invents a figure. Add `revalidate` at the same time, so a price
 * changed in the Stripe dashboard reaches the page without a redeploy.
 * Nothing below this function needs to change.
 */
export async function getStaticProps() {
  const proPrice: ProPrice | null = null
  return { props: { proPrice } }
}

export default function Pricing({ proPrice }: PricingProps) {
  return (
    <>
      <SeoHead
        title="Pricing"
        description="Prompt Scripter is free to use with limits, and Pro lifts them for a flat monthly price. Upgrade from inside the extension."
        path="/pricing"
      />
      <Navbar />
      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Pricing
              </h1>
              <p className="text-lg text-gray-600">
                Prompt Scripter is free to use. The free plan has limits rather than an expiry
                date, so it stays usable for as long as you want it. Pro lifts those limits for a
                flat monthly price.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
              <PlanCard plan={FREE_PLAN}>
                <a
                  href={CHROME_INSTALL_URL}
                  className="inline-flex w-full items-center justify-center rounded bg-primary px-6 py-3 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Install for Chrome
                </a>
              </PlanCard>

              <PlanCard plan={PRO_PLAN} price={proPrice} featured>
                <p className="rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  There is no buy button here. You upgrade from inside the extension, because that
                  is where you are signed in — see below.
                </p>
              </PlanCard>
            </div>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                How you upgrade
              </h2>
              <p className="text-gray-600">
                From the extension, not from this page. Your account lives in the popup, and tying
                a payment to the right account means starting it from somewhere we know who you
                are.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
              {UPGRADE_STEPS.map((step) => (
                <div key={step.title} className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Who you are buying from
              </h2>
              <p className="text-gray-600 mb-4">
                Pro is sold through Stripe, and Stripe is the merchant of record. For the purchase
                itself your contract of sale is with Stripe: Stripe takes the payment, sends the
                receipt, and handles any sales tax, VAT or GST due where you live. Your card
                details never reach us.
              </p>
              <p className="text-gray-600 mb-4">
                We run the thing you are subscribing to. Prompt Scripter is operated by Javier
                Aguilar Martín, a sole trader in the United Kingdom trading as AGILabs, at 82
                Chatterton Road, BR2 9QE, United Kingdom. Questions about the product go to{' '}
                <a
                  href="mailto:info@javieraguilar.ai"
                  className="text-primary hover:underline"
                >
                  info@javieraguilar.ai
                </a>
                .
              </p>
              <p className="text-gray-600 mb-4">
                Pro renews monthly until you cancel. You can cancel at any time and keep Pro until
                the end of the month you have paid for. If you are unhappy, we refund a payment on
                request within 14 days, no questions — and Stripe, as merchant of record, can
                issue a refund of its own for up to 60 days and applies the cooling-off rules that
                cover you.
              </p>
              <p className="text-gray-600">
                Dropping back to Free never deletes anything. If you are above a free limit, what
                you already have stays and stays readable, runnable and exportable; you simply
                cannot create more until you are back under it. The full detail is in the{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Waitlist is bg-white and so is the section above it; the rule keeps
            the two from reading as one block. */}
        <div className="border-t border-gray-200">
          <Waitlist />
        </div>
      </main>
      <Footer />
    </>
  )
}
