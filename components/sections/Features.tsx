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
    description: 'Feed a template a list of rows and run it through the chat, row by row.',
  },
  {
    title: 'Works Everywhere You Do',
    description: 'Seamless integration with major AI chat platforms.',
  },
]

export function Features() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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


