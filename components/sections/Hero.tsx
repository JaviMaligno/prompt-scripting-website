import { CHROME_INSTALL_URL } from '@/lib/constants'
import { ArrowRightIcon } from '@/components/icons'
import { RunTable } from '@/components/sections/RunTable'

/*
  Two outside readers in a week could not tell what the extension was for from
  paragraphs (issue #15, 2026-09-18; an SEO specialist, 2026-09-22, who also
  asked why not paste the whole list into one prompt). So the hero no longer
  explains in prose: it shows what goes in (a prompt with a blank, a list),
  and what comes out (a table, a CSV), in three boxes.

  200 rows, not 500: the free plan takes 200 rows per upload, and a "free"
  button beside a 500-row example would promise what free cannot do.

  The screenshot run-in-chat.png left the hero; the file stays in public/.
*/
export function Hero() {
  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-24 lg:px-8">
        <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          One prompt. Every row of your list. Inside the chat you already use.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-gray-600 md:text-xl">
          For the lists where every row needs its own answer, and pasting it all into one prompt
          gets you a guess.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={CHROME_INSTALL_URL}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Install for Chrome — free
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-[1fr_1fr_1.35fr]">
          <li className="rounded-2xl bg-white p-6 shadow-xl shadow-indigo-100 ring-1 ring-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">1 · Write it once</p>
            <h2 className="mt-1 font-semibold text-gray-900">Your prompt, with blanks</h2>
            <p className="mt-4 font-mono text-sm leading-relaxed text-gray-700">
              What does{' '}
              <span className="rounded bg-amber-200 px-1 text-gray-900">{'{company}'}</span> do, and
              which industry does it belong to? One word.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-6 shadow-xl shadow-indigo-100 ring-1 ring-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">2 · Paste your list</p>
            <h2 className="mt-1 font-semibold text-gray-900">One row per line</h2>
            <p className="mt-4 font-mono text-sm leading-7 text-gray-700">
              Acme Ltd
              <br />
              Borealis SA
              <br />
              Cintra plc
              <br />
              Dunmore Inc
              <br />
              <span className="text-gray-400">… 196 more</span>
            </p>
          </li>
          <li className="rounded-2xl bg-white p-6 shadow-xl shadow-indigo-100 ring-1 ring-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700">3 · Get the table</p>
            <h2 className="mt-1 font-semibold text-gray-900">It runs row by row in your chat</h2>
            <div className="mt-4">
              <RunTable />
            </div>
          </li>
        </ol>

        <p className="mt-8 text-center text-sm text-gray-500">
          Works in <span className="font-semibold text-gray-700">ChatGPT</span> ·{' '}
          <span className="font-semibold text-gray-700">Claude</span> ·{' '}
          <span className="font-semibold text-gray-700">Gemini</span>
        </p>
      </div>
    </section>
  )
}
