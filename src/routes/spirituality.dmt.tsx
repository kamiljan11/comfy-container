import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/dmt')({ component: DmtPage })

const HIGHLIGHTS = [
  { emoji: '🌀', title: 'Ten years of refinement', desc: 'Built and polished over a decade of personal and spiritual practice.' },
  { emoji: '🧬', title: 'Unique fusion', desc: 'Proven spiritual techniques woven together for real-life outcomes, not promises.' },
  { emoji: '🪞', title: 'Deep self-insight', desc: 'Invites you to meet who you are and your place in the universe.' },
] as const

const BENEFITS = [
  { title: 'Emotional release', desc: 'A safe container for releasing built-up stress and suppressed emotions.' },
  { title: 'Trauma processing', desc: 'Secure space for confronting and working through past wounds.' },
  { title: 'Deep transformation', desc: 'Unlocks new levels of self-awareness and accelerates spiritual growth.' },
  { title: 'Intuitive guidance', desc: 'Opens perception beyond ordinary senses — clarity for decisions.' },
  { title: 'Deep meditation', desc: 'From the first session, reach a state of profound peace.' },
  { title: 'Energy healing', desc: 'Balances the body’s energy system; releases blockages.' },
  { title: 'Spiritual awakening', desc: 'Access previously unreachable layers of consciousness.' },
  { title: 'Supercharge manifestation', desc: 'Raise your consciousness to become a magnet for what aligns.' },
] as const

const TESTIMONIALS = [
  { quote: 'It simply helped me become a better person. Thanks a lot.', name: 'Radek Polewczak', role: 'Practitioner' },
  { quote: 'I tried many types of meditation but could never focus. Through this process, I finally tasted real stillness.', name: 'Nikola Turek', role: 'Practitioner' },
  { quote: 'After years of searching, I found a structure that organises spiritual knowledge in a way that actually helps.', name: 'Monika Muracka', role: 'Practitioner' },
] as const

const FAQS = [
  { q: 'What is a DMT session?', a: 'An intensive complete spiritual process aimed at enhancing inner awareness through rhythmic breathing, deep presence, and integration.' },
  { q: 'Who should avoid participating?', a: 'Not recommended for individuals with cardiac conditions, pregnant women, or those with specific medical contraindications. If uncertain, consult a healthcare provider first.' },
  { q: 'Can I practise while driving or swimming?', a: 'Never. Don’t practise DMT while driving, swimming, or in any situation where altered states could pose a risk.' },
  { q: 'How do I prepare?', a: 'Practise on an empty stomach. Do some simple stretches beforehand. Approach the session with openness and presence.' },
  { q: 'What are the risks?', a: 'Generally safe with no medical contraindications. Strong emotional material may surface — breathe with it, don’t suppress. Stay seated/lying for 5+ minutes after.' },
] as const

function DmtPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
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
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4 mt-4">Activation Session</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
          Dynamic Meditation<br />
          <span className="italic font-light text-amber-200">Technique (DMT).</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
          A live practice that accelerates the evolution of consciousness. Rooted in the ancient 8 Limbs of
          Yoga — a complete system guiding the seeker toward higher consciousness and deep union with all
          that is.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/spirituality/dmtpractice" className="rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all">
            Try the session online →
          </Link>
          <a href="#benefits" className="rounded-md border border-white/20 bg-white/[0.05] px-7 py-3 text-sm text-white hover:bg-white/10 transition-all">
            See benefits
          </a>
        </div>
      </section>

      {/* ── 3 highlights ─────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} className="rounded-xl border border-amber-300/15 bg-gradient-to-b from-amber-500/[0.05] to-transparent p-6">
              <div className="text-3xl mb-3" aria-hidden>{h.emoji}</div>
              <h3 className="text-base font-semibold text-white">{h.title}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About Creator ────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">About the creator</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Kamil Jan</h2>
        <p className="text-sm uppercase tracking-wider text-amber-200/80 mb-6">Practical Spiritual Teacher</p>
        <div className="grid gap-8 md:grid-cols-[1fr,1.6fr] items-start">
          <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/5] bg-gradient-to-br from-amber-500/15 via-cyan-500/10 to-purple-500/10 flex items-center justify-center">
            <img src="/kamil.png" alt="Kamil Jan" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Welcome to MySpiritWay — or actually, YourSpiritWay. See me as a friend on the same path;
              the title &ldquo;Practical Spiritual Teacher&rdquo; is just shorthand for what I do.
            </p>
            <p>
              My quest for understanding has always been here. Over the years I followed the thread of what
              many traditions call the Divine — the deep, ever-present reality that connects everything.
              Each step revealed another layer, and at some point a quiet happiness began to fill my being.
            </p>
            <p>
              The core of my work is a practical, step-by-step path toward complete life satisfaction —
              tools that enhance consciousness and actually work in everyday life.
            </p>
            <div className="pt-2">
              <Link to="/spirituality/about" className="inline-block text-sm font-medium text-amber-200 hover:text-amber-100 underline underline-offset-2">
                Read the full bio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <section id="benefits" className="py-20 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Benefits</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          What practitioners report.
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          Eight outcomes that consistently emerge across people who hold the practice over time.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <div key={i} className="rounded-md border border-white/10 bg-white/[0.02] p-5">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-amber-200/90">{b.title}</h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">From practitioners</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          What people say after sitting with the practice.
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col">
              <div className="text-3xl text-amber-300/80 leading-none mb-3" aria-hidden>&ldquo;</div>
              <blockquote className="flex-1 text-sm md:text-base text-white/80 leading-relaxed italic">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-white/10">
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-amber-200/70 mt-0.5">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          Common questions before you sit.
        </h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((f, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full text-left py-5 group"
              aria-expanded={openFaq === i}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-base md:text-lg font-medium text-white group-hover:text-amber-100">{f.q}</span>
                <span className={`text-2xl text-white/50 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} aria-hidden>+</span>
              </div>
              {openFaq === i && (
                <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">{f.a}</p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
          Ready?
        </h2>
        <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
          Find a quiet 45 minutes. Empty stomach. Loose clothing. Don&apos;t practise while driving or
          swimming. Then begin.
        </p>
        <Link to="/spirituality/dmtpractice" className="inline-block rounded-md bg-amber-300 px-8 py-4 text-base font-semibold text-[#06090a] hover:bg-amber-200 transition-all">
          Try the session here →
        </Link>
      </section>

      <p className="mt-12 text-xs text-white/30 italic">
        Migrated from myspiritway.org/dmt. <Link to="/spirituality" className="underline hover:text-white/60">Back to spirituality home →</Link>
      </p>
    </SpiritualityLayout>
  )
}
