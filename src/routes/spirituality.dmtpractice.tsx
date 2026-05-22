import { createFileRoute, Link } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/spirituality/dmtpractice')({
  head: () => ({
    meta: [
      { title: 'Try DMT — Live Practice' },
      { name: 'description', content: 'Sit with the practice. 45 minutes of guided audio. Find a quiet space, headphones recommended.' },
      { property: 'og:title', content: 'Try DMT — Live Practice' },
      { property: 'og:description', content: 'Sit with the practice. 45 minutes of guided audio. Find a quiet space, headphones recommended.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/dmtpractice' },
      { property: 'og:image', content: 'https://kamiljan.com/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/dmtpractice' },
    ],
  }),
  component: DmtPracticePage,
})

const STAGES = [
  {
    n: '01',
    title: 'Settle & breath',
    desc: 'Lying or seated. Slow the breath. Let the body soften.',
  },
  {
    n: '02',
    title: 'Activate & release',
    desc: 'Rhythmic breath. Movement of energy. Emotions may rise — let them move.',
  },
  {
    n: '03',
    title: 'Stillness',
    desc: 'The breath becomes natural. Awareness expands. Just be.',
  },
  {
    n: '04',
    title: 'Integration',
    desc: 'Body scan. Anchor what arose. Slow return.',
  },
] as const

const AFTER = [
  {
    title: 'Journal',
    desc: 'Write what came up. Even if it feels small. Don’t analyse — just record.',
  },
  {
    title: 'Move gently',
    desc: 'Slow walk, water, soft food. Don’t re-enter screens immediately.',
  },
  {
    title: 'Rest',
    desc: 'Give yourself at least 30–60 minutes before re-engaging your day.',
  },
] as const

function DmtPracticePage() {
  return (
    <SpiritualityLayout>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative -mx-6 px-6 pt-2 pb-16 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-b-3xl overflow-hidden opacity-90"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 20%, rgba(220,160,80,0.18), transparent 55%),' +
              'radial-gradient(ellipse at 80% 90%, rgba(80,140,160,0.18), transparent 55%),' +
              'linear-gradient(180deg, #0a1a20 0%, #0e2128 60%, #06090a 100%)',
          }}
        />
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4 mt-4">Live practice</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
          Sit with DMT.<br />
          <span className="italic font-light text-amber-200">45 minutes. Then everything is different.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
          A guided live audio practice of the Dynamic Meditation Technique. Set aside 30–45 minutes
          uninterrupted. Find a quiet space. Wear loose clothing. Empty stomach. Headphones recommended.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://www.myspiritway.org/dmtpractice"
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
          >
            Open the practice →
          </a>
          <Link
            to="/spirituality/dmt"
            className="rounded-md border border-white/20 bg-white/[0.05] px-7 py-3 text-sm text-white hover:bg-white/10 transition-all"
          >
            Read the intro first
          </Link>
        </div>
      </section>

      {/* ── Safety card ─────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Before you begin</p>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-5">A few honest reminders.</h2>
          <ul className="text-sm md:text-base text-white/80 space-y-3 list-disc pl-5 marker:text-amber-300/70">
            <li>
              Read the{' '}
              <Link to="/spirituality/dmt" className="text-amber-200 underline underline-offset-2 hover:text-amber-100">
                DMT introduction
              </Link>{' '}
              first if you haven&apos;t.
            </li>
            <li>
              Don&apos;t practise if you have cardiac conditions, are pregnant, or have specific medical
              contraindications.
            </li>
            <li>
              Don&apos;t practise while driving, swimming, or in any situation where altered states could pose
              risk.
            </li>
            <li>
              If strong emotion or memory surfaces, breathe with it. Don&apos;t suppress. Don&apos;t cling.
            </li>
            <li>
              Stay seated or lying down for at least 5 minutes after the practice before standing up.
            </li>
          </ul>
        </div>
      </section>

      {/* ── 4-stage practice overview ───────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">The practice</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          Four stages. <span className="italic font-light text-amber-200">One arc.</span>
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          A rough map of what to expect. The audio guides you through each transition — you don&apos;t have to
          time anything.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {STAGES.map((s) => (
            <div key={s.n} className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">
                {s.n} · {s.title}
              </div>
              <p className="text-sm md:text-base text-white/75 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Audio player CTA ────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="rounded-lg border border-amber-300/25 bg-gradient-to-b from-amber-500/[0.08] to-white/[0.02] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">The session</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Begin the session.
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
            45 minutes. Headphones recommended. Pause anytime. Or close your eyes and let it run.
          </p>
          <a
            href="https://www.myspiritway.org/dmtpractice"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
          >
            Open the practice →
          </a>
          <p className="mt-6 text-xs text-white/50 italic">
            (Audio player being migrated to kamiljan.com. Original session remains live at the link above.)
          </p>
        </div>
      </section>

      {/* ── After the practice ──────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">After the practice</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          Integration is the practice.
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          What you do in the first hour after matters as much as the 45 minutes themselves.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {AFTER.map((a) => (
            <div key={a.title} className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-amber-200/90 mb-3">
                {a.title}
              </h3>
              <p className="text-sm md:text-base text-white/75 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <NewsletterSignup
          source="dmtpractice-page"
          tag="dmt-practitioner"
          heading="DMT practice updates"
          subheading="Live session announcements + integration support."
          buttonLabel="Stay informed"
        />
      </section>

      <p className="mt-12 text-xs text-white/30 italic">
        Migrated from myspiritway.org/dmtpractice.{' '}
        <Link to="/spirituality" className="underline hover:text-white/60">
          Back to spirituality home →
        </Link>
      </p>
    </SpiritualityLayout>
  )
}
