import { Fragment } from 'react'

/**
 * Lightweight markdown renderer — handles the patterns used in MySpiritWay
 * content without pulling a dependency. Supports:
 *  - # / ## / ### headings
 *  - **bold** / *italic*
 *  - `code`
 *  - > blockquotes
 *  - - bullet lists
 *  - 1. numbered lists
 *  - [link](url)
 *  - paragraphs separated by blank lines
 *  - --- horizontal rules
 */

function renderInline(text: string, keyPrefix: string) {
  // Process inline markdown: links, bold, italic, code
  const parts: Array<string | { type: string; text: string; href?: string }> = []
  let remaining = text
  // Links first
  remaining = remaining.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, label: string, href: string) => `LINK${label}${href}`,
  )
  // Bold
  remaining = remaining.replace(/\*\*([^*]+)\*\*/g, 'BOLD$1')
  // Italic (single *)
  remaining = remaining.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, 'ITAL$1')
  // Code
  remaining = remaining.replace(/`([^`]+)`/g, 'CODE$1')

  const segments = remaining.split('').filter(Boolean)
  return segments.map((seg, i) => {
    if (seg.startsWith('BOLD')) return <strong key={`${keyPrefix}-${i}`}>{seg.slice(5)}</strong>
    if (seg.startsWith('ITAL')) return <em key={`${keyPrefix}-${i}`}>{seg.slice(5)}</em>
    if (seg.startsWith('CODE')) return <code key={`${keyPrefix}-${i}`} className="rounded bg-white/10 px-1.5 py-0.5 text-sm">{seg.slice(5)}</code>
    if (seg.startsWith('LINK')) {
      const [, body] = seg.split('LINK')
      const [label, href] = body.split('')
      const external = href.startsWith('http')
      return (
        <a
          key={`${keyPrefix}-${i}`}
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
        >
          {label}
        </a>
      )
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{seg}</Fragment>
  })
}

interface Props {
  source: string
}

export default function MarkdownContent({ source }: Props) {
  // Strip YAML frontmatter if present
  let body = source
  if (body.startsWith('---\n')) {
    const end = body.indexOf('\n---', 4)
    if (end > 0) body = body.slice(end + 4).trimStart()
  }

  const lines = body.split('\n')
  const elements: Array<React.ReactNode> = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // Empty line — skip
    if (!trimmed) {
      i++
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      elements.push(<hr key={key++} className="my-12 border-white/10" />)
      i++
      continue
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="mt-10 mb-4 text-xl font-semibold text-white">
          {renderInline(trimmed.slice(4), `h3-${key}`)}
        </h3>,
      )
      i++
      continue
    }
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="mt-14 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-white">
          {renderInline(trimmed.slice(3), `h2-${key}`)}
        </h2>,
      )
      i++
      continue
    }
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="mt-16 mb-6 text-3xl md:text-4xl font-bold tracking-tight text-white">
          {renderInline(trimmed.slice(2), `h1-${key}`)}
        </h1>,
      )
      i++
      continue
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2))
        i++
      }
      elements.push(
        <blockquote key={key++} className="my-6 border-l-2 border-cyan-400/50 pl-6 italic text-white/80">
          {renderInline(quoteLines.join(' '), `q-${key}`)}
        </blockquote>,
      )
      continue
    }

    // Unordered list
    if (/^[-*]\s/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().slice(2))
        i++
      }
      elements.push(
        <ul key={key++} className="my-4 list-disc pl-6 space-y-2 text-white/85">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `li-${key}-${idx}`)}</li>
          ))}
        </ul>,
      )
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol key={key++} className="my-4 list-decimal pl-6 space-y-2 text-white/85">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `oli-${key}-${idx}`)}</li>
          ))}
        </ol>,
      )
      continue
    }

    // Regular paragraph (collect consecutive non-empty lines)
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,3}\s/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('> ') &&
      !/^[-*]\s/.test(lines[i].trim()) &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      elements.push(
        <p key={key++} className="my-4 text-base md:text-lg leading-relaxed text-white/85">
          {renderInline(paraLines.join(' '), `p-${key}`)}
        </p>,
      )
    }
  }

  return <div className="prose-spirituality">{elements}</div>
}
