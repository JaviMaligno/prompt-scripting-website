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

/** Where the price comes from. Public data, so no secret and no NEXT_PUBLIC_. */
const PRICE_ENDPOINT =
  process.env.BILLING_PRICE_URL || 'https://prompt-scripter.vercel.app/api/billing/price'

/** What GET /api/billing/price returns. Deliberately narrower than a Stripe Price. */
interface PriceResponse {
  readonly currency?: string
  readonly unit_amount?: number
  readonly interval?: string
  readonly tax_behavior?: string
  readonly currency_options?: Record<string, { readonly unit_amount?: number }>
}

/**
 * Minor units to something a person reads.
 *
 * The /100 holds for every currency this is priced in (GBP, EUR, USD). It would
 * be wrong for a zero-decimal currency such as JPY, so if one is ever added the
 * divisor has to come from the currency rather than be assumed here.
 */
function formatAmount(minorUnits: number, currency: string): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: minorUnits % 100 === 0 ? 0 : 2,
  }).format(minorUnits / 100)
}

function taxSentence(behaviour: string | undefined, others: readonly string[]): string {
  // Three cases, and the third is the one this price is actually in.
  //
  // The Pro price carries no tax_behavior of its own, so Stripe reports
  // 'unspecified' and the account setting decides per currency: tax inside the
  // figure everywhere except USD and CAD, where it is added at checkout.
  //
  // Treating 'unspecified' as "tax added" — the tempting default — would make
  // £10 read as £10 plus VAT when the VAT is already inside it, i.e. it would
  // advertise the product as more expensive than it is.
  let base: string
  if (behaviour === 'inclusive') {
    base = 'Tax included.'
  } else if (behaviour === 'exclusive') {
    base = 'Tax is added at checkout, based on where you are.'
  } else {
    base = 'Tax included, except in USD and CAD where it is added at checkout.'
  }
  if (!others.length) return base
  return `${base} Also priced in ${others.join(' and ')}; Stripe charges you in yours.`
}

/**
 * The price slot, filled from the backend rather than from this repository.
 *
 * No amount, currency or placeholder number is written here: Stripe owns the
 * price, and a copy in this repo would be a second source that drifts the first
 * time it changes. The backend already holds the Stripe key and the price id, so
 * it exposes the figures at /api/billing/price — public, because they are what
 * Stripe prints on the checkout to anybody who clicks through. That way this
 * project needs no Stripe credential of its own.
 *
 * `revalidate` is why a price changed in the Stripe dashboard reaches this page
 * on its own, without a redeploy.
 *
 * A failure returns null and PlanCard falls back to its own wording. A build
 * must never fail, and must never invent a figure, because the backend happened
 * to be asleep for eight seconds.
 */
export async function getStaticProps() {
  let proPrice: ProPrice | null = null

  try {
    const response = await fetch(PRICE_ENDPOINT, { signal: AbortSignal.timeout(8000) })
    if (response.ok) {
      const data = (await response.json()) as PriceResponse
      const { unit_amount: amount, currency, interval } = data
      if (typeof amount === 'number' && currency && interval) {
        const others = Object.keys(data.currency_options || {})
          .filter((code) => code !== currency)
          .map((code) => code.toUpperCase())
          .sort()
        proPrice = {
          amount: formatAmount(amount, currency),
          interval,
          taxNote: taxSentence(data.tax_behavior, others),
        }
      }
    }
  } catch {
    // Unreachable, slow, or serving something unexpected: show the fallback.
  }

  return { props: { proPrice }, revalidate: 3600 }
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
