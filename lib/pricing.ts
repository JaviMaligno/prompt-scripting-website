/**
 * Plan definitions for /pricing, and the slot the Pro price will occupy.
 *
 * Three rules are encoded here deliberately.
 *
 * 1. NO PRICE LIVES IN THIS REPOSITORY. Not a number, not a currency, not a
 *    placeholder number. Stripe owns the price. When the page starts showing
 *    one it arrives as a `ProPrice` built from the Stripe Price object in
 *    `getStaticProps` (see pages/pricing.tsx) and is handed to <PlanCard
 *    price={...} />, which already renders it. No layout changes, no copy
 *    changes, no new component. Until then `PlanCard` falls back to
 *    `plan.priceFallback`, which points the reader at Stripe's checkout page
 *    — the one place the amount, the currency and the tax treatment are
 *    guaranteed to be correct for where that reader lives.
 *
 * 2. The FREE limits are settled product facts, so they are literals. Ten
 *    templates for the life of the account, twenty runs per calendar month in
 *    UTC, two hundred dataset rows per upload.
 *
 * 3. The PRO allowances are the ceilings the backend actually enforces, from
 *    `pro_max_templates`, `pro_max_runs` and `pro_max_dataset_rows` in
 *    backend/settings.py. They are the real numbers rather than "unlimited",
 *    because a page that says unlimited and a backend that returns 403 at a
 *    hundred thousand runs disagree, and the backend wins.
 */

/**
 * A price as it should be shown to a reader: already formatted, already
 * carrying its own tax wording. Built from a Stripe Price — `unit_amount` and
 * `currency` through Intl.NumberFormat, `recurring.interval` for the period,
 * and `tax_behavior` deciding which of the two tax sentences applies
 * ('inclusive' -> tax included, 'exclusive'/'unspecified' -> tax added at
 * checkout, which is Stripe's default).
 */
export interface ProPrice {
  /** e.g. the output of Intl.NumberFormat over unit_amount and currency. */
  readonly amount: string
  /** The billing period, from recurring.interval. */
  readonly interval: string
  /** One sentence derived from the Price's tax_behavior. */
  readonly taxNote: string
}

export interface PlanLimit {
  readonly label: string
  readonly value: string
  readonly note?: string
}

export interface Plan {
  readonly id: 'free' | 'pro'
  readonly name: string
  readonly tagline: string
  /** Shown in the price slot when no ProPrice has been supplied. */
  readonly priceFallback: string
  readonly limits: readonly PlanLimit[]
}

export const FREE_PLAN: Plan = {
  id: 'free',
  name: 'Free',
  tagline: 'The whole extension, with limits. No card, no trial that expires.',
  priceFallback: 'Free',
  limits: [
    {
      label: 'Templates',
      value: '10',
      note: 'A total, not a monthly one. Delete one and the slot comes back.',
    },
    {
      label: 'Runs',
      value: '20 per month',
      note: 'The count resets on the 1st of each month, UTC. It is not pro-rated: join on the 28th and you still get all 20 that month, then 20 more on the 1st.',
    },
    {
      label: 'Dataset rows',
      value: '200 per upload',
      note: 'Per file you upload, not per account.',
    },
  ],
}

export const PRO_PLAN: Plan = {
  id: 'pro',
  name: 'Pro',
  tagline: 'One seat, one flat price, billed monthly. No annual plan and nothing metered per run.',
  priceFallback: 'Shown at checkout',
  limits: [
    { label: 'Templates', value: '1,000' },
    {
      label: 'Runs',
      value: '100,000 per month',
      note: 'Counted exactly as on Free — per calendar month, UTC — and set high enough that ordinary use does not reach it.',
    },
    { label: 'Dataset rows', value: '1,000,000 per upload' },
  ],
}

export const PLANS: readonly Plan[] = [FREE_PLAN, PRO_PLAN]
