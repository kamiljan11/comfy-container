import { createFileRoute, Link } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/spirituality/blog')({
  head: () => ({
    meta: [
      { title: 'Notes from the Path — Spirituality Blog' },
      { name: 'description', content: 'Practical reflections, frameworks, and tools as I encounter them on the path.' },
      { property: 'og:title', content: 'Notes from the Path — Spirituality Blog' },
      { property: 'og:description', content: 'Practical reflections, frameworks, and tools as I encounter them on the path.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/blog' },
      { property: 'og:image', content: 'https://kamiljan.com/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/blog' },
    ],
  }),
  component: BlogPage,
})

const TAGS = ['All', 'Practice', 'Reflection', 'Frameworks', 'Spiritual Marketing'] as const

interface UpcomingPost {
  category: string
  title: string
  summary: string
}

const UPCOMING: UpcomingPost[] = [
  {
    category: 'Practice',
    title: 'The Eight Limbs in Modern Life',
    summary: 'A walkthrough of how to weave the eight limbs into a real weekly rhythm — without dropping out of your life to do it.',
  },
  {
    category: 'Reflection',
    title: "Why Most Meditation Apps Don't Work",
    summary: 'A short essay on why timed bells and guided narration miss the point — and what actually trains awareness instead.',
  },
  {
    category: 'Frameworks',
    title: 'The Holy 5: Where Awareness Lives',
    summary: 'A practical map of micro-awareness across the five places it shows up: thoughts, feelings, body, speech, and behaviour.',
  },
  {
    category: 'Spiritual Marketing',
    title: 'Pricing Without Guilt',
    summary: 'How to set fair prices for spiritual work and feel clean about it — the practical economics of doing this honestly.',
  },
  {
    category: 'Practice',
    title: '21 Days With IYSS: What Actually Happens',
    summary: 'A journal of the Integrate Your Shattered Self process — daily entries, real shifts, no spiritual bypassing.',
  },
  {
    category: 'Reflection',
    title: 'On Letting Go',
    summary: 'The difference between detachment and disconnection — and how to tell which one you are actually practising.',
  },
]

function BlogPage() {
  return (
    <SpiritualityLayout>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative -mx-6 px-6 pt-2 pb-16 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-b-3xl overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 20% 30%, rgba(220,180,90,0.15), transparent 55%),' +
              'radial-gradient(ellipse at 80% 70%, rgba(140,90,200,0.12), transparent 55%),' +
              'linear-gradient(180deg, #0a0e1a 0%, #0e1a25 60%, #06090a 100%)',
          }}
        />
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4 mt-4">Writing</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
          Notes from the path.<br />
          <span className="italic font-light text-amber-200">Short reads. Real applications.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
          Practical reflections, frameworks, and tools as I encounter them on the path. No fluff,
          no filler — just what&apos;s worth sharing.
        </p>
      </section>

      {/* ── Tag / category filter strip ──────────────────────────────── */}
      <section className="pt-2 pb-8">
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag, i) => {
            const active = i === 0
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={active}
                className={
                  active
                    ? 'rounded-full border border-amber-300/40 bg-amber-300/20 px-4 py-1.5 text-xs font-medium text-amber-100'
                    : 'rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs font-medium text-white/60 hover:text-white/80 hover:border-white/20 transition-colors'
                }
              >
                {tag}
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Featured post ────────────────────────────────────────────── */}
      <section className="pt-4 pb-12 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-5 mt-8">Featured</p>
        <a
          href="https://www.myspiritway.org/blog/modular-yoga-asana-for-daily-practice"
          target="_blank"
          rel="noreferrer"
          className="block rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-500/[0.08] via-amber-500/[0.02] to-transparent p-8 md:p-10 hover:border-amber-300/50 hover:from-amber-500/[0.12] transition-all"
        >
          <div className="text-[10px] uppercase tracking-[0.25em] text-amber-300/90 mb-4">
            Practice · 8 min read
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-4">
            Modular Yoga Asana for Daily Practice
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
            A flexible yoga sequence designed to slot cleanly into the Eight Limbs morning practice
            — built in modules so you can scale it up or down depending on the day. Includes a
            5-minute version for tight mornings and a full 45-minute sequence for longer sessions.
            Each block is self-contained, so you can drop in or out without losing the flow. The
            point isn&apos;t a perfect routine — it&apos;s a sustainable one.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-200 group-hover:text-amber-100">
            Read <span aria-hidden>→</span>
          </div>
        </a>
      </section>

      {/* ── More posts grid (coming soon placeholders) ───────────────── */}
      <section className="py-12 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">More posts</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          In the pipeline.
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {UPCOMING.map((post) => (
            <div
              key={post.title}
              className="relative rounded-lg border border-white/10 bg-white/[0.02] p-6 opacity-60"
            >
              <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider text-amber-300/70">
                Coming soon
              </span>
              <div className="text-[10px] uppercase tracking-[0.2em] text-amber-300/70 mb-3">
                {post.category}
              </div>
              <h3 className="text-lg font-semibold text-white leading-snug mb-2 pr-20">
                {post.title}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">{post.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <section className="py-12 border-t border-white/5">
        <NewsletterSignup
          source="blog-page"
          tag="blog-reader"
          heading="New posts → your inbox"
          subheading="One short, practical note when there's something worth sharing."
          buttonLabel="Subscribe"
        />
      </section>

      {/* ── Submit a topic ───────────────────────────────────────────── */}
      <section className="py-12 border-t border-white/5">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Reader input</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            Got a topic in mind?
          </h2>
          <p className="text-base text-white/75 leading-relaxed max-w-2xl mb-5">
            If there&apos;s a question, practice, or framework you&apos;d like me to write about
            next — send it over. The best posts here usually come from real questions readers are
            actually sitting with.
          </p>
          <Link
            to="/spirituality/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-100"
          >
            Send me an idea <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <p className="mt-12 text-xs text-white/30 italic">
        Posts being migrated from myspiritway.org/blog.{' '}
        <Link to="/spirituality" className="underline hover:text-white/60">
          Back to spirituality home →
        </Link>
      </p>
    </SpiritualityLayout>
  )
}
