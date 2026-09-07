type TextNode = { text?: string; children?: unknown[] }

function collectParagraphs(value: unknown): string[] {
  if (!value || typeof value !== 'object') return []
  const root = value as { root?: { children?: unknown[] } }
  const children = root.root?.children ?? []
  return children
    .map((child) => {
      if (!child || typeof child !== 'object') return ''
      const node = child as TextNode
      if (typeof node.text === 'string') return node.text
      return (node.children ?? []).map((item) => collectNodeText(item)).join('')
    })
    .filter(Boolean)
}

function collectNodeText(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  const node = value as TextNode
  if (typeof node.text === 'string') return node.text
  return (node.children ?? []).map(collectNodeText).join('')
}

export function RichText({ value }: { value: unknown }) {
  const paragraphs = collectParagraphs(value)
  if (!paragraphs.length) return null
  return <div className="rich-text">{paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>)}</div>
}
