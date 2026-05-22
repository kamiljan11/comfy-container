import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import SpiritualityLayout from '../components/SpiritualityLayout'
import NewsletterSignup from '../components/NewsletterSignup'

export const Route = createFileRoute('/spirituality/')({ component: SpiritualityHub })

const CORE_TRANSFORMATIONS = [
  {
    icon: '✨',
    title: 'Accelerate the Evolution of Consciousness',
    desc: 'Begin to see life through a more awakened lens. Deeper clarity, expanded awareness, a more complete sense of reality.',
  },
  {
    icon: '💫',
    title: 'Reduce Unnecessary Suffering',
    desc: 'Free yourself from patterns that create inner struggle. With deeper understanding, life becomes lighter, simpler, more meaningful.',
  },
  {
    icon: '🌿',
    title: 'Achieve Complete Lasting Life Happiness',
    desc: 'Discover what truly matters. A steady satisfaction that doesn\'t fade — because it comes from within.',
  },
] as const

const SEVEN_WAYS = [
  { emoji: '🧠', title: 'The Evolutionary Mindset', desc: 'A lens that welcomes growth, curiosity, and resilience.' },
  { emoji: '💖', title: 'Always Try Your Very Best', desc: 'A simple commitment that transforms how you show up.' },
  { emoji: '🧘', title: 'Formal Spiritual Practice', desc: 'Daily morning and evening practice. The quiet foundation.' },
  { emoji: '👁️', title: 'Micro-Awareness', desc: 'Notice thoughts, feelings, body, speech, behaviour as they arise.' },
  { emoji: '🤔', title: 'Deep Reflection', desc: 'Slow down. Examine. Let insight emerge naturally.' },
  { emoji: '🌿', title: 'Conscious Healthy Lifestyle', desc: 'Sleep, nourishment, movement, connection — lived as practice.' },
  { emoji: '✨', title: 'Cultivate Spiritual Sensitivity', desc: 'Tune in to the subtle. Presence, intuition, sacredness in the ordinary.' },
] as const

const OFFERINGS = [
  {
    to: '/spirituality/sps',
    eyebrow: 'The Complete Book',
    title: 'Simplified Practical Spirituality',
    desc: '12 years of practical wisdom synthesised. ~90 A4 pages of essence, structure, and direct application.',
    cta: 'Read the book →',
    featured: true,
  },
  {
    to: '/spirituality/sps2',
    eyebrow: 'Short Version',
    title: 'Simplified Practical Spirituality²',
    desc: 'Distilled summary of the full book. ~66 minute read — the essence without losing depth.',
    cta: 'Read the short version →',
  },
  {
    to: '/spirituality/dmt',
    eyebrow: 'Activation Session',
    title: 'Dynamic Meditation Technique',
    desc: 'A powerful breath-based practice rooted in the 8 Limbs of Yoga. Once a week.',
    cta: 'Learn the practice →',
  },
  {
    to: '/spirituality/iyss',
    eyebrow: 'Activation Session',
    title: 'Integrate Your Shattered Self',
    desc: 'A 21-day practice for integrating fragmented parts of the self. Shadow work, trauma processing, wholeness.',
    cta: 'Start the integration →',
  },
  {
    to: '/spirituality/clarity',
    eyebrow: '1:1 Consultation',
    title: 'Clarity Call',
    desc: 'A focused 1:1 session with Kamil. Spiritual practice, life direction, integration of insights — concrete next steps.',
    cta: 'Book the call →',
  },
  {
    to: '/spirituality/spiritual-marketing',
    eyebrow: 'Conscious Business',
    title: 'Spiritual Marketing',
    desc: 'Marketing aligned with consciousness — for teachers, coaches, healers, creators who want to grow without compromising integrity.',
    cta: 'Explore →',
  },
] as const

const MICRO_DEFINITIONS = [
  'Practical spirituality is applying spiritual insight in everyday choices.',
  'Practical spirituality is bringing awareness into the ordinary moments of life.',
  'Practical spirituality is living a life that unites mind, body, and spirit.',
  'Practical spirituality is letting presence guide how we speak, act, and relate.',
  'Practical spirituality is turning understanding into lived experience.',
] as const

function SpiritualityHub() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sp-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
    document.querySelectorAll('.sp-fade').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <SpiritualityLayout>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative -mx-6 -mt-12 overflow-hidden bg-gradient-to-b from-amber-500/[0.07] via-transparent to-transparent">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-amber-400/10 blur-[120px]" />
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-rose-400/[0.07] blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-16 md:pt-32 md:pb-24">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-6">MySpiritWay · Practical Spirituality</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-white">
            A practical path<br />
            <span className="italic font-light text-amber-200">for modern life.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            Twelve years of exploring spiritual, religious, and philosophical traditions — distilled into
            a clear, accessible path that fits inside a real life. No retreats required. No dogma. Just
            practical methods that work.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/spirituality/sps" className="rounded-md bg-amber-300 px-6 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all">
              Read the book
            </Link>
            <Link to="/spirituality/clarity" className="rounded-md border border-white/15 bg-white/[0.04] px-6 py-3 text-sm text-white hover:bg-white/10 transition-all">
              Book a 1:1 call
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4 text-white/60">
            <div><span className="text-2xl font-semibold text-white">12</span><span className="ml-2 text-sm">years of practice</span></div>
            <div><span className="text-2xl font-semibold text-white">~90</span><span className="ml-2 text-sm">pages distilled</span></div>
            <div><span className="text-2xl font-semibold text-white">7</span><span className="ml-2 text-sm">ways of the path</span></div>
          </div>
        </div>
      </section>

      {/* ── 3 Core Transformations ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Core Transformations</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-12">
          Three shifts that unlock everything else.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {CORE_TRANSFORMATIONS.map((t, i) => (
            <div key={i} className="sp-fade rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 hover:border-amber-300/30 transition-all">
              <div className="text-3xl mb-4">{t.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3 leading-snug">{t.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7 Ways of the Practical Spiritual Path ───────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">The Practical Spiritual Path</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
            Seven ways. Lived daily.
          </h2>
          <p className="text-base text-white/70 leading-relaxed">
            Each one supports the evolution of consciousness, reduces suffering, and brings life into
            steadier alignment. Small, consistent steps — not big leaps.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {SEVEN_WAYS.map((w, i) => (
            <div key={i} className="sp-fade flex items-start gap-4 rounded-md border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/15 transition-all">
              <div className="text-2xl shrink-0 leading-none mt-0.5">{w.emoji}</div>
              <div>
                <div className="text-base font-semibold text-white">{w.title}</div>
                <div className="mt-1 text-sm text-white/60 leading-relaxed">{w.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured offerings ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Where to begin</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-12">
          The full library, in one place.
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {OFFERINGS.map((o, i) => (
            <Link
              key={i}
              to={o.to}
              className={`sp-fade group block rounded-xl border bg-gradient-to-br p-7 transition-all ${
                o.featured
                  ? 'md:col-span-2 border-amber-300/30 from-amber-500/[0.10] via-amber-500/[0.04] to-transparent hover:from-amber-500/[0.16] hover:border-amber-300/50'
                  : 'border-white/10 from-white/[0.04] to-transparent hover:border-white/20 hover:from-white/[0.07]'
              }`}
            >
              <div className={`text-[10px] uppercase tracking-[0.2em] mb-3 ${o.featured ? 'text-amber-300' : 'text-amber-300/80'}`}>
                {o.eyebrow}
              </div>
              <h3 className={`font-bold text-white mb-3 leading-tight ${o.featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                {o.title}
              </h3>
              <p className={`text-white/70 leading-relaxed ${o.featured ? 'text-base md:text-lg max-w-2xl' : 'text-sm'}`}>
                {o.desc}
              </p>
              <div className="mt-5 text-sm font-medium text-amber-200 group-hover:text-amber-100">
                {o.cta}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Micro definitions strip ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-6">What practical spirituality is</p>
        <ul className="space-y-3">
          {MICRO_DEFINITIONS.map((d, i) => (
            <li key={i} className="sp-fade flex gap-4 text-base md:text-lg text-white/80 leading-relaxed">
              <span className="text-amber-300/80 mt-1">⁂</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Support / Newsletter / Footer ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="grid gap-12 md:grid-cols-[1.2fr,1fr] items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Join the community</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
              Practical insights, in your inbox.
            </h2>
            <p className="text-base text-white/70 leading-relaxed max-w-md">
              No pitch decks. No funnels. Just useful notes from the path — sent when there's actually
              something worth sharing.
            </p>
          </div>
          <NewsletterSignup
            source="spirituality-hub"
            tag="main-page"
            heading="Subscribe"
            subheading="Updates about newest projects + practical insights."
            buttonLabel="Join the community"
          />
        </div>
      </section>

      <style>{`
        .sp-fade { opacity: 0; transform: translateY(16px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .sp-visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </SpiritualityLayout>
  )
}
