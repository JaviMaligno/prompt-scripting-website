import Link from 'next/link'
import { CHROME_INSTALL_URL } from '@/lib/constants'
import { FREE_PLAN } from '@/lib/pricing'

/*
  The free limits are read from FREE_PLAN, the same source /pricing uses, so
  this line cannot drift from the backend's numbers. No price here: the price
  lives in Stripe (see lib/pricing.ts).
*/
const SHOWN = ['Runs', 'Dataset rows']

export function CTA() {
  const limits = FREE_PLAN.limits.filter((l) => SHOWN.includes(l.label))
  return (
    <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-6 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Try it on your next list</h2>
        <p className="mt-4 text-indigo-100">
          Free —{' '}
          {limits.map((l, i) => (
            <span key={l.label}>
              {i > 0 ? ' · ' : ''}
              {l.label}: {l.value}
            </span>
          ))}
          .{' '}
          <Link href="/pricing" className="font-semibold text-white underline underline-offset-4">
            See Pro
          </Link>
        </p>
        <a
          href={CHROME_INSTALL_URL}
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-primary hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
        >
          Install for Chrome — free
        </a>
      </div>
    </section>
  )
}
