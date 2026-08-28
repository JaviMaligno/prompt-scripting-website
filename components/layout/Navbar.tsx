import Link from 'next/link'
import { CHROME_INSTALL_URL } from '@/lib/constants'

interface NavbarProps {
  readonly className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header className={`w-full border-b border-gray-200 bg-white ${className || ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-gray-900 font-semibold text-lg" aria-label="Go to homepage">
          Prompt Scripter
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <a
            href={CHROME_INSTALL_URL}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Install for Chrome
          </a>
        </nav>
      </div>
    </header>
  )
}


