import { MarkdownPage } from '@/components/MarkdownPage'
import { readMarkdownFromPublic } from '@/lib/md'

interface PageProps {
  readonly content: string
  readonly lastUpdated?: string
}

export async function getStaticProps() {
  const { content, lastUpdated } = readMarkdownFromPublic('Terms of Service.md')
  return { props: { content, lastUpdated } }
}

export default function Terms({ content, lastUpdated }: PageProps) {
  return (
    <MarkdownPage
      title="Terms of Service"
      description="Terms of Service for Prompt Scripter."
      path="/terms"
      content={content}
      lastUpdated={lastUpdated}
    />
  )
}
