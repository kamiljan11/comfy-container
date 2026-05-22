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

export const Route = createFileRoute('/spirituality/sps')({
  head: () => ({
    meta: [
      { title: 'Simplified Practical Spirituality — The Complete Book' },
      { name: 'description', content: 'The complete guidebook. ~90 A4 pages distilling 12 years of practice. Read free online.' },
      { property: 'og:title', content: 'Simplified Practical Spirituality — The Complete Book' },
      { property: 'og:description', content: 'The complete guidebook. ~90 A4 pages distilling 12 years of practice. Read free online.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/sps' },
      { property: 'og:image', content: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/6810c129f1983_65f2f1ab9ea9a_Untitleddesign.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/sps' },
    ],
  }),
  component: SpsPage,
})

const sps = [part1, part2, part3, part4, part5, part6].join('\n\n')

/** CloudFront CDN images carried over from the original myspiritway.org/sps page. */
const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/6584575'

/** Hero / OpenGraph image for the book. */
const HERO_IMAGE = `${CDN}/6810c129f1983_65f2f1ab9ea9a_Untitleddesign.png`

/** The actual SPS book cover ("THE SIMPLIFIED PRACTICAL SPIRITUALITY"). */
const BOOK_COVER = `${CDN}/6857fcb59df54_Beztytułu.png`

/** Public-domain & fair-use art plates used throughout the original page. */
const IMAGE_PLATES: Array<{ src: string; caption: string }> = [
  {
    src: `${CDN}/67bf446952d4b_Untitleddesign1.jpg`,
    caption: '"Symbolic Peace" sculpture by Mathew Rosenblatt & Liquid PXL — Toronto Distillery District, 2023.',
  },
  {
    src: `${CDN}/67eea7c228bf1_At_Eternitys_Gate_-_Vincent_Van_Gogh.jpg`,
    caption: '"Sorrowing Old Man (At Eternity\'s Gate)" — Vincent van Gogh.',
  },
  {
    src: `${CDN}/67eda8397d647_europe.mpi.p1.100.jpg`,
    caption: 'William Blake, "The Ancient of Days", 1794.',
  },
  {
    src: `${CDN}/67ee8fffb5c3d_WilliamPrestonakaBro.WilliamPreston17421818-TheEyeOfProvidence..jpg`,
    caption: 'William Preston (1742–1818) — "The Eye of Providence".',
  },
  {
    src: `${CDN}/67eee31f2c27a_ENBwGi2X0AAxG85-1424540358.jpeg`,
    caption: 'The Great Lost Labyrinth of Egypt.',
  },
  {
    src: `${CDN}/67eea0188fc9a_Jacobs-Dream-1805-2.webp`,
    caption: '"Jacob\'s Dream" — William Blake.',
  },
  {
    src: `${CDN}/67ee99e952620_Oversoul-Alex-Grey-2.webp`,
    caption: '"Oversoul" — Alex Grey.',
  },
  {
    src: `${CDN}/67ee9ca45ca9e_The-Green-Lion-Devouring-the-Sun-D.-Stolcius-von-Stolcenberg-Viridarium-chymicum.webp`,
    caption: '"The Green Lion Devouring the Sun" — D. Stolcius von Stolcenberg, Viridarium chymicum.',
  },
  {
    src: `${CDN}/67eea5f6ec0f0_PainttheUniverse.jpg`,
    caption: '"The Universe" — Lindsay Manolakos.',
  },
  {
    src: `${CDN}/67eea7f0a692c_Emblem21MichaelMaierAtalantaFugiens1617.webp`,
    caption: 'Emblem 21 — Michael Maier, Atalanta Fugiens, 1617.',
  },
  {
    src: `${CDN}/67eece9a60b84_Zrzutekranu2025-04-03180801.png`,
    caption: '"Spiritual Pilgrim" — wood engraving, from Camille Flammarion\'s "L\'atmosphère: météorologie populaire" (1888). Color: Gunther Scholl.',
  },
  {
    src: `${CDN}/67eecd95d0a3e_Michelangelo_-_Creation_of_Adam_cropped.jpg`,
    caption: 'Michelangelo — "Creation of Adam".',
  },
]

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

      {/* ──────────────────────────────────────────────────────────────────
          HERO — book cover + author info (mirrors the live myspiritway.org
          page where the cover is the first big visual the reader meets).
          ────────────────────────────────────────────────────────────────── */}
      <section className="mb-12 grid items-center gap-8 sm:grid-cols-[minmax(0,1fr),minmax(0,1.2fr)] sm:gap-12">
        <div className="order-2 sm:order-1">
          <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-amber-300/80">
            The Complete Guidebook
          </p>
          <h1 className="mb-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Simplified Practical Spirituality
          </h1>
          <p className="mb-5 max-w-prose text-white/70">
            12 years of spiritual research, distilled. ~90 A4 pages of universal wisdom,
            practical tools, and real exercises — written in straightforward language so
            you can weave it into a modern, busy life.
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-amber-300/30 bg-amber-300/[0.08] px-3 py-1 text-amber-200">
              {readingLabel}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/70">
              Free · Read online
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/70">
              by Kamil Jan
            </span>
          </div>
          <p className="text-sm text-white/55">
            Teacher of Practical Spirituality — last edit: July 2025
          </p>
        </div>
        <div className="order-1 sm:order-2">
          <div className="relative mx-auto max-w-md">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 translate-x-3 translate-y-4 rounded-2xl bg-amber-300/10 blur-2xl"
            />
            <img
              src={BOOK_COVER}
              alt="Simplified Practical Spirituality — book cover"
              loading="eager"
              className="w-full rounded-xl shadow-2xl shadow-amber-300/10 ring-1 ring-white/10"
            />
          </div>
        </div>
      </section>

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
          {/* Frontispiece — small book-cover thumbnail above the first paragraph,
              like a printed book's title page. */}
          <div className="mb-8 flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <img
              src={BOOK_COVER}
              alt="SPS book cover thumbnail"
              loading="lazy"
              className="h-20 w-16 flex-none rounded object-cover ring-1 ring-white/10 sm:h-24 sm:w-20"
            />
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300/70">
                Frontispiece
              </p>
              <p className="mt-1 text-base font-semibold text-white/90">
                Simplified Practical Spirituality
              </p>
              <p className="text-sm text-white/55">
                A complete guidebook · Kamil Jan · July 2025
              </p>
            </div>
          </div>

          <MarkdownContent source={sps} />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          IMAGE PLATES — the public-domain & fair-use spiritual artworks
          from the original myspiritway.org/sps page, preserved as an
          optional accordion so the reading flow above stays clean.
          ────────────────────────────────────────────────────────────────── */}
      <details className="mt-16 rounded-xl border border-white/10 bg-white/[0.03]">
        <summary className="cursor-pointer select-none px-5 py-4 text-sm font-medium text-amber-200/90 hover:text-amber-100">
          Image plates from the original page ({IMAGE_PLATES.length})
        </summary>
        <div className="px-5 pb-6 pt-2">
          <p className="mb-5 max-w-prose text-sm text-white/55">
            These spiritual artworks accompany the chapters on the original
            myspiritway.org/sps page. Public-domain or fair-use; original
            captions preserved.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {IMAGE_PLATES.map((plate) => (
              <figure
                key={plate.src}
                className="overflow-hidden rounded-lg border border-white/10 bg-black/20"
              >
                <a
                  href={plate.src}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block aspect-square overflow-hidden bg-black/40"
                >
                  <img
                    src={plate.src}
                    alt={plate.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </a>
                <figcaption className="p-3 text-xs leading-snug text-white/60">
                  {plate.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          {/* Reference to the original hero illustration so it isn't lost. */}
          <p className="mt-5 text-xs text-white/40">
            Hero illustration source:{' '}
            <a
              href={HERO_IMAGE}
              target="_blank"
              rel="noreferrer noopener"
              className="text-amber-300/70 underline-offset-2 hover:underline"
            >
              Untitled design (book cover + galaxy)
            </a>
          </p>
        </div>
      </details>

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
