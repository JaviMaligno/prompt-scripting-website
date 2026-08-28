import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <p>© {year} Prompt Scripter</p>
        <nav className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          <Link href="/data-handling-policy" className="hover:text-gray-900">Data Handling Policy</Link>
          <Link href="/data-protection-impact-assessment" className="hover:text-gray-900">DPIA</Link>
          <a href="mailto:info@javieraguilar.ai" className="hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </footer>
  )
}

