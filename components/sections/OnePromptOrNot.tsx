import { CheckIcon } from '@/components/icons'

/*
  The objection every reader raises first (2026-09-22): why not paste the whole
  list into one prompt? Conceding the case where it is right is what makes the
  other case believable. The line between them is not how much text comes out
  per row; it is whether each row means finding something out.
*/
const ENOUGH = [
  'Search intent for 50 keywords',
  'Translate a list of product names',
  'Capital city of 40 countries',
]

const NEEDED: ReadonlyArray<readonly [string, string]> = [
  ['Industry of each company', 'Asked all at once, it labels from memory.'],
  ['Data sources for each country', "Thirty investigations don't fit in one reply."],
  ['Research each account before the call', 'Each one needs its own reading.'],
]

export function OnePromptOrNot() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          When one prompt is enough, and when it isn&apos;t
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 ring-1 ring-gray-200">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">One prompt is enough</p>
            <p className="mt-2 text-gray-600">The model already knows the answer.</p>
            <ul className="mt-5 divide-y divide-dashed divide-gray-200">
              {ENOUGH.map((item) => (
                <li key={item} className="py-3 text-gray-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-7 ring-2 ring-primary">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Use Prompt Scripter</p>
            <p className="mt-2 text-gray-600">Each row means finding something out.</p>
            <ul className="mt-5 divide-y divide-dashed divide-gray-200">
              {NEEDED.map(([item, why]) => (
                <li key={item} className="flex gap-3 py-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-primary" />
                  <span>
                    <span className="block font-medium text-gray-900">{item}</span>
                    <span className="block text-sm text-gray-500">{why}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
