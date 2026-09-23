import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { DownloadIcon } from '@/components/icons'

const ROWS: ReadonlyArray<readonly [string, string]> = [
  ['Acme Ltd', 'Logistics'],
  ['Borealis SA', 'Energy'],
  ['Cintra plc', 'Construction'],
  ['Dunmore Inc', 'Healthcare'],
]

/*
  The result side of the hero: rows land one by one, the bar fills, the CSV
  appears. It plays once, the first time it is on screen. See the RunTable
  block in styles/globals.css for why it starts armed only after mount.
*/
export function RunTable() {
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    setArmed(true)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlaying(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="run-table"
      data-armed={armed ? '' : undefined}
      data-playing={playing ? '' : undefined}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-400">
            <th className="pb-2 font-medium">company</th>
            <th className="pb-2 font-medium">industry</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([company, industry], i) => (
            <tr
              key={company}
              className="run-row border-t border-gray-100"
              style={{ ['--i' as string]: i } as CSSProperties}
            >
              <td className="py-2 text-gray-900">{company}</td>
              <td className="py-2 text-gray-600">{industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="run-bar mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <span className="block h-full w-full rounded-full bg-primary" />
      </div>
      <p className="run-done mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
        <DownloadIcon className="h-4 w-4" />
        results.csv — one line per row
      </p>
    </div>
  )
}
