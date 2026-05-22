import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import SpiritualityLayout from '../components/SpiritualityLayout'
import MarkdownContent from '../components/MarkdownContent'
import part1 from '../content/spirituality/sps-part-1.md?raw'
import part2 from '../content/spirituality/sps-part-2.md?raw'
import part3 from '../content/spirituality/sps-part-3.md?raw'
import part4 from '../content/spirituality/sps-part-4.md?raw'
import part5 from '../content/spirituality/sps-part-5.md?raw'
import part6 from '../content/spirituality/sps-part-6.md?raw'

export const Route = createFileRoute('/spirituality/sps')({ component: SpsPage })

const sps = [part1, part2, part3, part4, part5, part6].join('\n\n')

/** Slugify a heading into an anchor id. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/** Pull `## ` chapter headings out of the raw markdown. */
function extractChapters(markdown: string): Array<{ title: string; id: string }> {
  const seen = new Map<string, number>()
  const out: Array<{ title: string; id: string }> = []
  const lines = markdown.split('\n')
  for (const raw of lines) {
    const line = raw.trim()
    if (!line.startsWith('## ') || line.startsWith('### ')) continue
    const title = line.slice(3).trim()
    // strip basic inline markers (**, *, `) for the visible label
    const clean = title.replace(/\*\*?|`/g, '')
    let base = slugify(clean)
    if (!base) base = 'section'
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    const id = n === 0 ? base : `${base}-${n + 1}`
    out.push({ title: clean, id })
  }
  return out
}

function SpsPage() {
  const chapters = useMemo(() => extractChapters(sps), [])

  // Reading time estimate (~200 wpm)
  const { minutes, pages } = useMemo(() => {
    const words = sps.trim().split(/\s+/).length
    const mins = Math.max(1, Math.round(words / 200))
    const pgs = Math.max(1, Math.round(words / 275))
    return { minutes: mins, pages: pgs }
  }, [])

  const readingLabel = useMemo(() => {
    if (minutes >= 60) {
      const hours = Math.round(minutes / 60)
      return `~ ${hours}-hour read · ${pages} pages`
    }
    return `~ ${minutes}-min read · ${pages} pages`
  }, [minutes, pages])

  const articleRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const [activeId, setActiveId] = useState<string>(chapters[0]?.id ?? '')
  const [hintDismissed, setHintDismissed] = useState(false)

  // Inject id attributes onto the rendered h2 elements (in order) so the TOC
  // can scroll to them. We rely on the chapter order matching the rendered
  // order — both come from the same markdown source.
  useEffect(() => {
    const root = articleRef.current
    if (!root) return
    const h2s = root.querySelectorAll('h2')
    h2s.forEach((el, idx) => {
      const ch = chapters[idx]
      if (ch && !el.id) el.id = ch.id
      // small scroll offset so sticky nav doesn't cover the heading
      ;(el as HTMLElement).style.scrollMarginTop = '96px'
    })
  }, [chapters])

  // Scroll progress + back-to-top visibility
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      setProgress(Math.min(1, Math.max(0, ratio)))
      setShowTop(window.scrollY > 800)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently in view in the TOC
  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = articleRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll('h2')) as HTMLElement[]
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost heading that's currently above the midpoint.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [chapters])

  const scrollToId = (id: string) => {
    if (typeof document === 'undefined') return
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToTop = () => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <SpiritualityLayout eyebrow="The Complete Book" title="Simplified Practical Spirituality">
      {/* Sticky progress bar — sits just below the layout's sticky nav (top-[65px]) */}
      <div
        aria-hidden
        className="fixed left-0 right-0 top-[64px] z-40 h-[3px] bg-white/5"
      >
        <div
          className="h-full bg-amber-300 transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Reading-time line (rendered above the grid, full width) */}
      <p className="mb-6 text-sm italic text-white/55">{readingLabel}</p>

      {/* Mobile hint — dismissible */}
      {!hintDismissed && (
        <div className="lg:hidden mb-8 flex items-start justify-between gap-3 rounded-lg border border-amber-300/20 bg-amber-300/[0.06] px-4 py-3 text-sm text-amber-100/90">
          <span>Long read — bookmark and come back, or use the TOC below to jump.</span>
          <button
            type="button"
            onClick={() => setHintDismissed(true)}
            className="shrink-0 text-amber-200/70 hover:text-amber-100"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      {/* Mobile TOC */}
      {chapters.length > 0 && (
        <details className="lg:hidden mb-10 rounded-lg border border-white/10 bg-white/[0.03]">
          <summary className="cursor-pointer select-none px-4 py-3 text-sm font-medium text-white/80">
            Table of contents
          </summary>
          <nav className="px-4 pb-4">
            <ol className="space-y-2 text-sm text-white/70">
              {chapters.map((c, idx) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(c.id)}
                    className={`text-left hover:text-amber-200 ${activeId === c.id ? 'text-amber-300' : ''}`}
                  >
                    <span className="text-white/40 mr-2">{String(idx + 1).padStart(2, '0')}.</span>
                    {c.title}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </details>
      )}

      {/* Desktop two-column layout: sidebar TOC + article */}
      <div className="lg:grid lg:grid-cols-[200px,1fr] lg:gap-12">
        {chapters.length > 0 && (
          <aside className="hidden lg:block">
            <div className="lg:sticky lg:top-24">
              <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-amber-300/70">
                Contents
              </p>
              <nav>
                <ol className="space-y-2 text-sm leading-snug">
                  {chapters.map((c, idx) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => scrollToId(c.id)}
                        className={`text-left transition-colors hover:text-amber-200 ${
                          activeId === c.id ? 'text-amber-300' : 'text-white/55'
                        }`}
                      >
                        <span className="text-white/30 mr-2 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        {c.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>
        )}

        {/* Article — wrapped so we can inject ids + apply drop cap */}
        <div ref={articleRef} className="sps-article min-w-0">
          <MarkdownContent source={sps} />
        </div>
      </div>

      {/* Drop cap on first paragraph of the article */}
      <style>{`
        .sps-article .prose-spirituality > p:first-of-type::first-letter {
          float: left;
          font-size: 4.25rem;
          line-height: 0.9;
          padding: 0.35rem 0.6rem 0 0;
          font-weight: 700;
          color: #fcd34d; /* amber-300 */
          font-family: Georgia, 'Times New Roman', serif;
        }
      `}</style>

      {/* Back-to-top floating button */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-amber-300 text-[#06090a] shadow-lg shadow-amber-300/20 transition-transform hover:scale-105 hover:bg-amber-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      )}
    </SpiritualityLayout>
  )
}
