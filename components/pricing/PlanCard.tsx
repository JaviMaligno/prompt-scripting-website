import type { ReactNode } from 'react'

import { type Plan, type ProPrice } from '@/lib/pricing'

interface PlanCardProps {
  readonly plan: Plan
  /**
   * The price, once Stripe is the one supplying it. Absent or null renders
   * `plan.priceFallback` instead — see the note at the top of lib/pricing.ts.
   * This prop is the whole insertion point; nothing else has to move.
   */
  readonly price?: ProPrice | null
  readonly featured?: boolean
  /** The call to action. Passed in so the card stays presentational. */
  readonly children?: ReactNode
}

export function PlanCard({ plan, price, featured, children }: PlanCardProps) {
  return (
    <div
      className={`flex flex-col rounded-lg border bg-white p-6 ${
        featured ? 'border-primary' : 'border-gray-200'
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
      <p className="text-gray-600 mb-6">{plan.tagline}</p>

      <div className="mb-6">
        {price ? (
          <>
            <p className="text-3xl font-bold text-gray-900">
              {price.amount}
              <span className="text-base font-normal text-gray-600"> / {price.interval}</span>
            </p>
            <p className="mt-1 text-sm text-gray-500">{price.taxNote}</p>
          </>
        ) : (
          <p className="text-3xl font-bold text-gray-900">{plan.priceFallback}</p>
        )}
      </div>

      <dl className="flex-1 space-y-4 border-t border-gray-200 pt-6">
        {plan.limits.map((limit) => (
          <div key={limit.label}>
            <dt className="text-sm text-gray-500">{limit.label}</dt>
            <dd
              className={
                limit.value === null
                  ? 'italic text-gray-500'
                  : 'text-lg font-semibold text-gray-900'
              }
            >
              {limit.value}
            </dd>
            {limit.note && <p className="mt-1 text-sm text-gray-600">{limit.note}</p>}
          </div>
        ))}
      </dl>

      {children && <div className="mt-8">{children}</div>}
    </div>
  )
}
