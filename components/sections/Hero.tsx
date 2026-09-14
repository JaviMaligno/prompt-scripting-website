import { CHROME_INSTALL_URL, DEFAULT_DESCRIPTION } from '@/lib/constants'

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid gap-8 place-items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">Stop Retyping. Start Scripting.</h1>
        {/*
          The same sentence as the meta description and the store listing, read
          from the one constant instead of copied. The heading above is a slogan
          and names neither the job nor the chats it runs in; this line is where
          a reader — and a crawler — finds out what the thing actually does.
        */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">{DEFAULT_DESCRIPTION}</p>
        <div className="flex items-center gap-4">
          <a className="inline-block rounded bg-primary text-white px-6 py-3" href={CHROME_INSTALL_URL}>Install for Chrome</a>
        </div>
      </div>
    </section>
  )
}
