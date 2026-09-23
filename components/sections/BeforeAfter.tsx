/*
  The value proposition for the reader who already does this by hand: the
  loop they know, next to the single pass. The numbers under it are the three
  things that are true for every run, not benchmarks.
*/
const STATS: ReadonlyArray<readonly [string, string]> = [
  ['1 pass', 'for the whole list'],
  ['0', 'API keys or setup'],
  ['1 CSV', 'one line per row'],
]

export function BeforeAfter() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Stop pasting the same prompt 200 times.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-red-50 p-7 ring-1 ring-red-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-600">Today</p>
            <p className="mt-4 text-lg leading-relaxed text-gray-800">
              Copy the prompt → swap the name → paste → wait → copy the answer into the sheet
            </p>
            <p className="mt-6 text-5xl font-extrabold tracking-tight text-red-600">× 200</p>
          </div>
          <div className="rounded-2xl bg-green-50 p-7 ring-1 ring-green-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700">With Prompt Scripter</p>
            <p className="mt-4 text-lg leading-relaxed text-gray-800">
              Paste the list once → press <span className="font-semibold">Run</span> → download one CSV
            </p>
            <p className="mt-6 text-5xl font-extrabold tracking-tight text-green-700">× 1</p>
          </div>
        </div>
        <dl className="mt-12 grid gap-8 text-center sm:grid-cols-3">
          {STATS.map(([value, label]) => (
            <div key={label}>
              <dt className="text-4xl font-bold tracking-tight text-primary">{value}</dt>
              <dd className="mt-1 text-gray-600">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
