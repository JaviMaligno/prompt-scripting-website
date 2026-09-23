# Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the paragraph-heavy landing with seven glanceable blocks (hero with three steps and an animated result table, before/after, one-prompt-or-not, who it's for, trust strip, video, close), as specified in `docs/superpowers/specs/2026-09-23-landing-redesign-design.md`.

**Architecture:** Next.js pages router, Tailwind, no new dependencies. One component per block in `components/sections/`, one shared icon file, one small client component for the animated table. `pages/index.tsx` only wires the blocks in order. The `Features` component is deleted.

**Tech Stack:** Next.js (pages router), React, TypeScript, Tailwind CSS. No test framework in the repo: verification is `next build`, `next lint` and Playwright screenshots of the Vercel preview.

**Working directory for every command:** `C:/Users/Usuario/GitHub/prompt-scripter-suite/prompt-scripting-website`, on branch `landing/redesign` (already created; the spec is its first commit).

**Rules that apply to every task:**
- All site copy is English, exactly as written in this plan.
- Brand colour is Tailwind `primary` (`#4F46E5`, defined in `tailwind.config.ts`). Use `indigo-*` shades only for tints (`indigo-50`, `indigo-100`).
- Never run two builds at once. Use `npx next build` directly, not through `rtk`: the `rtk next build` wrapper reported success earlier in this session without rebuilding.

---

## File structure

| File | Action | Responsibility |
|---|---|---|
| `components/icons.tsx` | Create | Inline line icons (SVG, `currentColor`) used by the blocks |
| `components/sections/RunTable.tsx` | Create | The animated result table in hero step 3 |
| `styles/globals.css` | Modify | Keyframes for `RunTable` and the reduced-motion override |
| `components/sections/Hero.tsx` | Rewrite | Block 1 |
| `components/sections/BeforeAfter.tsx` | Create | Block 2 |
| `components/sections/OnePromptOrNot.tsx` | Create | Block 3 |
| `components/sections/WhoItsFor.tsx` | Create | Block 4 |
| `components/sections/TrustStrip.tsx` | Create | Block 5 |
| `components/sections/Demo.tsx` | Modify | Block 6: title and frame only |
| `components/sections/CTA.tsx` | Rewrite | Block 7 |
| `components/sections/Features.tsx` | Delete | Replaced by blocks 1, 3 and 5 |
| `pages/index.tsx` | Modify | Section order |

---

### Task 1: Icons

**Files:**
- Create: `components/icons.tsx`

- [ ] **Step 1: Create the file**

```tsx
/*
  Line icons for the landing, drawn inline so they take the text colour
  (currentColor) and cost no request. 24x24 grid, 1.75 stroke, round caps —
  the same family throughout, so no block looks borrowed from another set.
*/
import type { ReactNode } from 'react'

interface IconProps {
  readonly className?: string
}

function Svg({ className, children }: IconProps & { readonly children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </Svg>
  )
}

export function PeopleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0113 0" />
      <path d="M16 4.5a3.5 3.5 0 010 7" />
      <path d="M18 14a6.5 6.5 0 013.5 6" />
    </Svg>
  )
}

export function PenIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20h4L19 9a2.8 2.8 0 00-4-4L4 16v4z" />
      <path d="M13.5 6.5l4 4" />
    </Svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Svg>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v11" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 20h14" />
    </Svg>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/icons.tsx
git commit -m "Add line icons for the landing redesign"
```

---

### Task 2: Animated result table

**Files:**
- Create: `components/sections/RunTable.tsx`
- Modify: `styles/globals.css` (append at the end)

Behaviour required by the spec: runs **once**, when the table scrolls into view; without JavaScript the table is shown complete (the hidden start state only applies after mount); with `prefers-reduced-motion` it is shown complete and still.

- [ ] **Step 1: Append the animation CSS to `styles/globals.css`**

```css
/*
  RunTable (landing hero, step 3). The rows start hidden only when the
  component has mounted and marked itself `data-armed`, so a reader without
  JavaScript sees the finished table. `data-playing` starts the sequence; each
  row's delay comes from the --i custom property set inline.
*/
.run-table[data-armed] .run-row { opacity: 0; transform: translateY(4px); }
.run-table[data-armed] .run-bar > span { width: 0; }
.run-table[data-armed] .run-done { opacity: 0; }

.run-table[data-playing] .run-row {
  animation: run-row-in 0.35s ease-out forwards;
  animation-delay: calc(0.5s + var(--i) * 0.9s);
}
.run-table[data-playing] .run-bar > span {
  animation: run-bar-fill 3.9s linear forwards;
  animation-delay: 0.5s;
}
.run-table[data-playing] .run-done {
  animation: run-row-in 0.35s ease-out forwards;
  animation-delay: 4.3s;
}

@keyframes run-row-in { to { opacity: 1; transform: none; } }
@keyframes run-bar-fill { to { width: 100%; } }

@media (prefers-reduced-motion: reduce) {
  .run-table[data-armed] .run-row,
  .run-table[data-armed] .run-done { opacity: 1; transform: none; animation: none; }
  .run-table[data-armed] .run-bar > span { width: 100%; animation: none; }
}
```

- [ ] **Step 2: Create `components/sections/RunTable.tsx`**

```tsx
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { DownloadIcon } from '@/components/icons'

const ROWS: ReadonlyArray<readonly [string, string]> = [
  ['Acme Ltd', 'Logistics'],
  ['Borealis SA', 'Energy'],
  ['Cintra plc', 'Construction'],
  ['Dunmore Inc', 'Healthcare'],
]

/*
  The result side of the hero: rows land one by one, the bar fills, the CSV
  appears. It plays once, the first time it is on screen. See the RunTable
  block in styles/globals.css for why it starts armed only after mount.
*/
export function RunTable() {
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    setArmed(true)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlaying(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="run-table"
      data-armed={armed ? '' : undefined}
      data-playing={playing ? '' : undefined}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-400">
            <th className="pb-2 font-medium">company</th>
            <th className="pb-2 font-medium">industry</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([company, industry], i) => (
            <tr
              key={company}
              className="run-row border-t border-gray-100"
              style={{ ['--i' as string]: i } as CSSProperties}
            >
              <td className="py-2 text-gray-900">{company}</td>
              <td className="py-2 text-gray-600">{industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="run-bar mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <span className="block h-full w-full rounded-full bg-primary" />
      </div>
      <p className="run-done mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
        <DownloadIcon className="h-4 w-4" />
        results.csv — one line per row
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add components/sections/RunTable.tsx styles/globals.css
git commit -m "Add the animated result table for the hero"
```

---

### Task 3: Hero (block 1)

**Files:**
- Rewrite: `components/sections/Hero.tsx`

- [ ] **Step 1: Replace the whole file with**

```tsx
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "Hero: show the three steps instead of explaining them"
```

---

### Task 4: Before / after (block 2)

**Files:**
- Create: `components/sections/BeforeAfter.tsx`

- [ ] **Step 1: Create the file**

```tsx
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
```

Note on `dl`: the value goes in `dt` and the label in `dd` so the big number reads first; screen readers announce them as a term/description pair, which is acceptable here.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/BeforeAfter.tsx
git commit -m "Add the before/after block"
```

---

### Task 5: One prompt or not (block 3)

**Files:**
- Create: `components/sections/OnePromptOrNot.tsx`

- [ ] **Step 1: Create the file**

```tsx
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/OnePromptOrNot.tsx
git commit -m "Add the one-prompt-or-not block"
```

---

### Task 6: Who it's for (block 4)

**Files:**
- Create: `components/sections/WhoItsFor.tsx`

- [ ] **Step 1: Create the file**

```tsx
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
```

Note: the spec says two per row on mobile; at 390 px four-word bodies in two columns are cramped, so this uses one column below 640 px (`sm`) and two from 640 px. If the screenshot in Task 11 shows two fit comfortably at 390 px, change `grid-cols-1` to `grid-cols-2` — otherwise leave it and mention it in the PR.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/WhoItsFor.tsx
git commit -m "Add the who-it's-for block"
```

---

### Task 7: Trust strip (block 5)

**Files:**
- Create: `components/sections/TrustStrip.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { CheckIcon } from '@/components/icons'

/*
  Three claims that are true for every user. Nothing about where data goes:
  with an account, runs are stored in the backend, and any short privacy line
  would be ambiguous.
*/
const CLAIMS: ReadonlyArray<readonly [string, string]> = [
  ['No API key', ''],
  ['No token bill', 'it uses the chat you already pay for'],
  ['Nothing to install', 'beyond the extension'],
]

export function TrustStrip() {
  return (
    <div className="border-y border-gray-200 bg-white">
      <ul className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-gray-600 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10">
        {CLAIMS.map(([strong, rest]) => (
          <li key={strong} className="inline-flex items-center gap-2">
            <CheckIcon className="h-5 w-5 flex-none text-green-600" />
            <span>
              <span className="font-semibold text-gray-900">{strong}</span>
              {rest ? ` — ${rest}` : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/TrustStrip.tsx
git commit -m "Add the trust strip"
```

---

### Task 8: Video frame (block 6)

**Files:**
- Modify: `components/sections/Demo.tsx`

The Loom URL (including `t=25`) stays exactly as it is. Only the title and the frame change.

- [ ] **Step 1: Replace the title and the frame**

Replace:

```tsx
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">See It in Action</h2>
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-200 shadow-lg">
```

with:

```tsx
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-10 text-center">See it run</h2>
        <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-xl shadow-indigo-100 ring-1 ring-gray-200">
```

and replace the section's outer padding `py-16 md:py-24` with `py-20`.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Demo.tsx
git commit -m "Demo: match the new frame and title"
```

---

### Task 9: Close (block 7)

**Files:**
- Rewrite: `components/sections/CTA.tsx`

The free limits come from `FREE_PLAN.limits` in `lib/pricing.ts` (labels `Runs` → `20 per month`, `Dataset rows` → `200 per upload`), rendered as label and value so nothing is retyped. No price is shown.

- [ ] **Step 1: Replace the whole file with**

```tsx
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
```

Rendered line: «Free — Runs: 20 per month · Dataset rows: 200 per upload. See Pro».

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/CTA.tsx
git commit -m "CTA: close with the free limits from the pricing source"
```

---

### Task 10: Wire the page and remove Features

**Files:**
- Modify: `pages/index.tsx`
- Delete: `components/sections/Features.tsx`

- [ ] **Step 1: Check nothing else imports Features**

Run: `grep -rn "sections/Features" --include=*.tsx --include=*.ts . | grep -v node_modules`
Expected: exactly one line, from `pages/index.tsx`. If there is any other, stop and report it.

- [ ] **Step 2: Replace `pages/index.tsx` with**

```tsx
import { SeoHead } from '@/components/SeoHead'
import { StructuredData } from '@/components/StructuredData'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { OnePromptOrNot } from '@/components/sections/OnePromptOrNot'
import { WhoItsFor } from '@/components/sections/WhoItsFor'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { Demo } from '@/components/sections/Demo'
import { CTA } from '@/components/sections/CTA'
import { Waitlist } from '@/components/sections/Waitlist'

export default function Home() {
  return (
    <>
      <SeoHead path="/" />
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <BeforeAfter />
        <OnePromptOrNot />
        <WhoItsFor />
        <TrustStrip />
        <Demo />
        <CTA />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Delete Features**

Run: `git rm components/sections/Features.tsx`

- [ ] **Step 4: Build and lint**

Run: `npx next build`
Expected: ends with the route table, no `Failed to compile`, no new warnings.

Run: `npx next lint`
Expected: `✔ No ESLint warnings or errors`.

- [ ] **Step 5: Commit**

```bash
git add pages/index.tsx
git commit -m "Landing: wire the seven blocks, drop Features"
```

---

### Task 11: Preview, screenshots, PR

**Files:** none changed unless a check fails.

- [ ] **Step 1: Push and open the PR**

Check the account first: `gh auth status` must show `JaviMaligno` as active. If not, stop and ask Javi to run `gh auth switch --user JaviMaligno` (it reverts on its own in this environment).

```bash
git push -u origin landing/redesign
gh pr create --base main --head landing/redesign --title "Landing redesign: show it instead of explaining it" --body "$(cat <<'BODY'
Implements docs/superpowers/specs/2026-09-23-landing-redesign-design.md.

Seven blocks instead of paragraphs: hero with three steps and an animated result table; before/after; when one prompt is enough; who it's for; trust strip; video; close with the free limits read from lib/pricing.ts. Features is removed.

Example is 200 rows, not 500: the free plan takes 200 rows per upload.

Not in this PR: re-recording the video.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
BODY
)"
```

- [ ] **Step 2: Get the preview URL**

Run: `gh pr checks <number>` until the `Vercel` line says `pass`, then read the preview URL from the Vercel bot comment:
`gh api repos/JaviMaligno/prompt-scripting-website/issues/<number>/comments --jq '.[].body' | grep -o 'https://[^ )]*vercel.app' | head -1`

The preview is behind Vercel Deployment Protection. In Chrome, it needs the Vercel session of the account that owns the project (sign in with GitHub as JaviMaligno), not the sapira one.

- [ ] **Step 3: Screenshots at 1440 px and 390 px**

Use the `playwright-cli` skill (not `resize_window` of claude-in-chrome, which does not change the viewport). Full-page screenshots of the preview at viewport 1440×900 and 390×844, saved to the scratchpad. Headless captures are clipped to the window size, so use the full-page option.

Check on each:
- 1440: the three hero steps sit in one row, and the headline, line, button and steps fit in the first screen or just below.
- 390: no horizontal scroll (`document.documentElement.scrollWidth <= 390`), steps stacked, before/after stacked, the trust strip stacked.
- The table in step 3 has all four rows and the CSV line after scrolling it into view and waiting 5 s.

- [ ] **Step 4: Reduced motion**

With Playwright, emulate `reducedMotion: 'reduce'`, load the preview and screenshot the hero: all four rows, full bar and the CSV line must be visible immediately.

- [ ] **Step 5: Fix what fails, then hand over**

Any failure: fix it in the component concerned, commit with a message naming the check, push, repeat Steps 3–4. When everything passes, give Javi the preview URL and the two screenshots. **Do not merge**: Javi reviews the preview first.
