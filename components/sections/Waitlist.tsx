import Link from 'next/link'

import { WaitlistForm } from '@/components/forms/WaitlistForm'

export function Waitlist() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Hear About What Is Next</h2>
          <p className="text-gray-600 mb-6">
            Not ready to install, or already at the free limits? Leave your email and we will write
            when there is something worth knowing — new features, changes to the limits. Only about
            Prompt Scripter, and your address stays with us.
          </p>
          <WaitlistForm className="text-left" />
          <p className="mt-4 text-sm text-gray-500">
            We use your address only to write to you about Prompt Scripter, and you can ask us to
            remove it at any time. See our{' '}
            <Link href="/privacy" className="underline hover:text-gray-700">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
