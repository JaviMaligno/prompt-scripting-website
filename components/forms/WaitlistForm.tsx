import { useState } from 'react'
import type { FormEvent } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

interface WaitlistFormProps {
  readonly className?: string
}

interface WaitlistApiBody {
  readonly ok?: boolean
  readonly message?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MESSAGES = {
  invalidEmail: 'Please enter a valid email address.',
  networkError: 'Something went wrong. Please try again in a moment.',
  success: 'Thanks — your email is on the list.',
} as const

export function WaitlistForm({ className }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  // Honeypot. A person never sees this field, so a value in it means the caller
  // was not a person. Kept in state rather than read off the form so the submit
  // path stays identical either way.
  const [company, setCompany] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const [message, setMessage] = useState('')

  const submitting = state === 'submitting'

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (submitting) return

    const value = email.trim()
    if (!EMAIL_PATTERN.test(value)) {
      setState('error')
      setMessage(MESSAGES.invalidEmail)
      return
    }

    setState('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, company }),
      })

      let body: WaitlistApiBody = {}
      try {
        body = (await response.json()) as WaitlistApiBody
      } catch {
        body = {}
      }

      if (response.ok && body.ok) {
        setState('success')
        setMessage(body.message || MESSAGES.success)
        setEmail('')
        return
      }

      setState('error')
      setMessage(body.message || MESSAGES.networkError)
    } catch {
      setState('error')
      setMessage(MESSAGES.networkError)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-4 items-stretch">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          disabled={submitting}
          aria-invalid={state === 'error'}
          aria-describedby="waitlist-status"
          onChange={(event) => {
            setEmail(event.target.value)
            if (state === 'error') {
              setState('idle')
              setMessage('')
            }
          }}
          className={`w-full rounded border px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 ${
            state === 'error' ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="waitlist-company">Company</label>
          <input
            id="waitlist-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded bg-primary px-6 py-3 text-white whitespace-nowrap hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Sending…' : 'Keep me posted'}
        </button>
      </form>
      <p
        id="waitlist-status"
        role="status"
        aria-live="polite"
        className={`mt-4 min-h-5 text-sm ${
          state === 'success' ? 'text-green-700' : 'text-red-600'
        }`}
      >
        {message}
      </p>
    </div>
  )
}
