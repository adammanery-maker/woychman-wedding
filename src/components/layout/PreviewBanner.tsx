import Link from 'next/link'

export function PreviewBanner() {
  return <aside className="preview-banner" role="status"><span><strong>Preview mode</strong> — you are viewing unpublished draft content.</span><Link href="/preview/exit">Exit preview</Link></aside>
}
