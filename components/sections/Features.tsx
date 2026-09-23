interface FeatureItem {
  readonly title: string
  readonly description: string
}

const FEATURES: FeatureItem[] = [
  {
    title: 'Create Reusable Templates',
    description: 'Save any prompt as a reusable template with dynamic variables.',
  },
  {
    title: 'Run It Over a List',
    description: 'Paste a list and it runs the template row by row, in one conversation. Signed in, you download the results as a CSV, one line per row.',
  },
  {
    title: 'Works in ChatGPT, Claude and Gemini',
    // Named, not gestured at: "major AI chat platforms" tells a reader
    // nothing and a search engine less. "Integration" was also the wrong
    // word — it types into the chat you already use, it does not connect
    // itself to anything of yours.
    description: 'It types into the chat you already use. No API key, no setup beyond installing it.',
  },
]

export function Features() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* The objection every reader raises first (2026-09-22). Conceding the
            case where it is right is what makes the other case believable. */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why not paste the whole list into one prompt?</h2>
          <p className="text-gray-600">
            If the model already knows the answer, do that: the intent of fifty keywords comes back
            in one table, faster. Prompt Scripter is for the other case, when each row means going
            and finding something out. Asked all at once, the model cannot run fifty separate
            investigations in one reply, so it summarises or makes things up. One row per turn gives
            each row its own answer.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-lg border border-gray-200 bg-white p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


