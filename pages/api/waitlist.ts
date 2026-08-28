import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Server-side proxy for the waitlist backend.
 *
 * The browser posts to this same-origin route; the shared token
 * (WAITLIST_TOKEN) and the upstream URL (WAITLIST_API_URL) are read here and
 * never reach the client. Neither variable is NEXT_PUBLIC_, so neither is
 * inlined into the bundle.
 */

export interface WaitlistApiResponse {
  readonly ok: boolean
  readonly message: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LENGTH = 254
const UPSTREAM_TIMEOUT_MS = 10_000

const MESSAGES = {
  methodNotAllowed: 'Method not allowed.',
  unavailable: 'Sign-ups are not available right now. Please try again later.',
  invalidEmail: 'Please enter a valid email address.',
  upstreamFailure: 'We could not save your email. Please try again in a moment.',
  success: 'Thanks — your email is on the list.',
} as const

function readBody(body: NextApiRequest['body']): Record<string, unknown> {
  let payload: unknown = body
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload)
    } catch {
      return {}
    }
  }
  if (typeof payload !== 'object' || payload === null) return {}
  return payload as Record<string, unknown>
}

function readEmail(body: NextApiRequest['body']): string {
  let payload: unknown = body
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload)
    } catch {
      return ''
    }
  }
  if (typeof payload !== 'object' || payload === null) return ''
  const email = (payload as { email?: unknown }).email
  return typeof email === 'string' ? email.trim() : ''
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WaitlistApiResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ ok: false, message: MESSAGES.methodNotAllowed })
    return
  }

  const upstreamUrl = process.env.WAITLIST_API_URL
  const token = process.env.WAITLIST_TOKEN
  if (!upstreamUrl || !token) {
    console.error(
      '[waitlist] Missing configuration: WAITLIST_API_URL and WAITLIST_TOKEN must both be set.'
    )
    res.status(503).json({ ok: false, message: MESSAGES.unavailable })
    return
  }

  // The honeypot field is invisible to a person and left empty by every real
  // browser. A value in it means a bot filled the form in, and the useful answer
  // is the one it expects: report success, forward nothing. Telling it that it was
  // caught only teaches whoever wrote it to leave the field alone next time.
  const honeypot = readBody(req.body).company
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    console.warn('[waitlist] Honeypot field was filled; dropping the submission.')
    res.status(201).json({ ok: true, message: MESSAGES.success })
    return
  }

  const email = readEmail(req.body)
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    res.status(400).json({ ok: false, message: MESSAGES.invalidEmail })
    return
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    const upstream = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Waitlist-Token': token,
      },
      body: JSON.stringify({ email, source: 'website' }),
      signal: controller.signal,
    })

    if (upstream.status === 201) {
      res.status(201).json({ ok: true, message: MESSAGES.success })
      return
    }

    if (upstream.status === 400) {
      res.status(400).json({ ok: false, message: MESSAGES.invalidEmail })
      return
    }

    // 403 (bad or missing token) is our misconfiguration, not the visitor's:
    // log it, and tell the visitor only that it did not work.
    console.error(`[waitlist] Upstream responded with status ${upstream.status}.`)
    res.status(502).json({ ok: false, message: MESSAGES.upstreamFailure })
  } catch (error) {
    console.error('[waitlist] Upstream request failed:', error)
    res.status(502).json({ ok: false, message: MESSAGES.upstreamFailure })
  } finally {
    clearTimeout(timeout)
  }
}
