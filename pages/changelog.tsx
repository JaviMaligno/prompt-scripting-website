import { MarkdownPage } from '@/components/MarkdownPage'
import { readMarkdownFromPublic } from '@/lib/md'

/**
 * The changelog, rendered from `content/Changelog.md` like the legal pages.
 *
 * `lastUpdated` is deliberately not passed. `readMarkdownFromPublic` derives it
 * from the file's mtime, and Vercel clones the repository fresh for every
 * deploy, so the mtime is the time of the build rather than the time anything
 * changed. On a legal page that is close enough to harmless; here it would
 * print "Last updated: <the day of the last unrelated deploy>" directly above
 * an entry dated weeks earlier, and contradict it. Every entry carries its own
 * date, which is the date that actually means something.
 */

interface PageProps {
  readonly content: string
}

export async function getStaticProps() {
  const { content } = readMarkdownFromPublic('Changelog.md')
  return { props: { content } }
}

export default function Changelog({ content }: PageProps) {
  return (
    <MarkdownPage
      title="Changelog"
      description="What changed in each version of the Prompt Scripter extension for Chrome."
      path="/changelog"
      content={content}
    />
  )
}
