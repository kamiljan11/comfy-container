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

type InlineToken =
  | { type: 'text'; content: string }
  | { type: 'bold'; content: string }
  | { type: 'italic'; content: string }
  | { type: 'code'; content: string }
  | { type: 'link'; content: string; href: string }

function tokenizeInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = []
  let remaining = input

  while (remaining.length > 0) {
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      tokens.push({ type: 'link', content: linkMatch[1], href: linkMatch[2] })
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/)
    if (boldMatch) {
      tokens.push({ type: 'bold', content: boldMatch[1] })
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    const italMatch = remaining.match(/^\*([^*\n]+)\*/)
    if (italMatch) {
      tokens.push({ type: 'italic', content: italMatch[1] })
      remaining = remaining.slice(italMatch[0].length)
      continue
    }

    const codeMatch = remaining.match(/^`([^`]+)`/)
    if (codeMatch) {
      tokens.push({ type: 'code', content: codeMatch[1] })
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Consume text up to the next potential marker
    const nextSpecial = remaining.search(/[*`[]/)
    if (nextSpecial === -1) {
      tokens.push({ type: 'text', content: remaining })
      break
    }
    if (nextSpecial === 0) {
      // marker char but no valid match — emit single char as text
      tokens.push({ type: 'text', content: remaining[0] })
      remaining = remaining.slice(1)
    } else {
      tokens.push({ type: 'text', content: remaining.slice(0, nextSpecial) })
      remaining = remaining.slice(nextSpecial)
    }
  }

  return tokens
}

function renderInline(text: string, keyPrefix: string) {
  return tokenizeInline(text).map((tok, i) => {
    const k = `${keyPrefix}-${i}`
    switch (tok.type) {
      case 'bold':
        return <strong key={k}>{tok.content}</strong>
      case 'italic':
        return <em key={k}>{tok.content}</em>
      case 'code':
        return (
          <code key={k} className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
            {tok.content}
          </code>
        )
      case 'link': {
        const external = tok.href.startsWith('http')
        return (
          <a
            key={k}
            href={tok.href}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
          >
            {tok.content}
          </a>
        )
      }
      default:
        return <Fragment key={k}>{tok.content}</Fragment>
    }
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
