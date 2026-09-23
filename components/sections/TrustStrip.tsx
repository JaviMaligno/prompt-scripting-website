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
