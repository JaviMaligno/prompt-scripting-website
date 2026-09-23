import { PenIcon, PeopleIcon, PhoneIcon, ShieldIcon } from '@/components/icons'

/*
  One card per trade, each naming the list they already work through and what
  comes out of it. The trades are the ones the outreach so far has actually
  found the case in, not a generic persona grid.
*/
const TRADES = [
  {
    Icon: ShieldIcon,
    title: 'Compliance',
    body: 'Companies to classify, countries to check against the same criteria.',
    out: 'one label per company',
  },
  {
    Icon: PhoneIcon,
    title: 'Sales & prospecting',
    body: 'Look up each account before the first call and shape the angle for that one.',
    out: 'one brief per account',
  },
  {
    Icon: PeopleIcon,
    title: 'Recruiting',
    body: 'The same screening criteria over every CV in the pile.',
    out: 'one verdict per candidate',
  },
  {
    Icon: PenIcon,
    title: 'Agencies & content',
    body: 'The same brief, rewritten for every client or product.',
    out: 'one draft per client',
  },
] as const

export function WhoItsFor() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Made for the lists you already work through by hand
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRADES.map(({ Icon, title, body, out }) => (
            <div key={title} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-gray-200">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{body}</p>
              <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">→ {out}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
