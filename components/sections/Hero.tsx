import Image from 'next/image'
import { CHROME_INSTALL_URL } from '@/lib/constants'

/*
  The first outside, non-technical reader of this page (2026-09-18, issue #15)
  could not tell at a glance what the extension was for. The old heading was a
  slogan ("Stop Retyping. Start Scripting.") and the line under it described
  the mechanism. What was missing was the situation the visitor is in, so the
  heading now names the job, the paragraph opens with two recognisable piles of
  work, and the screenshot shows the thing happening: the same prompt, once per
  row, with the answers landing in the thread.

  The meta description and the store listing keep using DEFAULT_DESCRIPTION;
  this copy is for the person, that one is for the crawler and the store.
*/
export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid gap-8 place-items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 max-w-4xl">
          One prompt. Every row of your list. Inside the chat you already use.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
          Fifty candidates to screen with the same criterion. Forty markets to size with the same
          question. Prompt Scripter takes the prompt you already wrote, with blanks for what
          changes, and sends it once per row into your ChatGPT, Claude or Gemini tab. The
          answers arrive in the thread, where you were reading them anyway.
        </p>
        <div className="flex items-center gap-4">
          <a className="inline-block rounded bg-primary text-white px-6 py-3" href={CHROME_INSTALL_URL}>Install for Chrome</a>
        </div>
        <Image
          src="/run-in-chat.png"
          alt="A ChatGPT conversation where the same market-research prompt has been sent for Spain and then for Portugal, each answer arriving in the thread; the Prompt Scripter Templates and Save as Template buttons sit under the message box"
          width={1280}
          height={800}
          priority
          className="w-full max-w-4xl rounded-lg border border-gray-200 shadow-lg"
        />
      </div>
    </section>
  )
}
