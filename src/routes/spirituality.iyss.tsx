import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/iyss')({
  head: () => ({
    meta: [
      { title: 'Integrate Your Shattered Self' },
      { name: 'description', content: 'A 21-day guided integration practice. Heal wounds, release trapped emotions, return to wholeness.' },
      { property: 'og:title', content: 'Integrate Your Shattered Self' },
      { property: 'og:description', content: 'A 21-day guided integration practice. Heal wounds, release trapped emotions, return to wholeness.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/iyss' },
      { property: 'og:image', content: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/67420ebe3e1cb_DALLE2024-11-2317.19.54-Amesmerizingsceneofagoldenglowingorbemittingradiantlightsurroundedbydarkness.Theorbisatthecenterandintricatesacredgeometrysh.webp' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/iyss' },
    ],
  }),
  component: IyssPage,
})

const MANDALA_URL =
  'https://d1yei2z3i6k35z.cloudfront.net/6584575/67420ebe3e1cb_DALLE2024-11-2317.19.54-Amesmerizingsceneofagoldenglowingorbemittingradiantlightsurroundedbydarkness.Theorbisatthecenterandintricatesacredgeometrysh.webp'

const SOUNDS_LIKE_YOU = [
  'You feel like you keep repeating the same negative patterns.',
  'It is hard to relax or feel at peace with yourself.',
  'You struggle to feel truly connected to yourself or to others.',
  'You are searching for deeper meaning and inner peace.',
] as const

const BENEFITS = [
  { title: 'Release emotional trauma', desc: 'Gently process and let go of past pain. Create space for emotional balance.' },
  { title: 'Reduce stress, deeply relax', desc: 'Guided breathwork and calming audio frequencies dissolve tension.' },
  { title: 'Accelerate spiritual growth', desc: 'Remove emotional blocks and connect with your higher self.' },
  { title: 'Deep self-awareness', desc: 'See hidden patterns and behaviours holding you back — and how to release them.' },
  { title: 'Envision a positive future', desc: 'Guided visualisations help you imagine a brighter, more fulfilling life.' },
  { title: 'Complete life satisfaction', desc: 'Integrate past experience. Find clarity. Build inner peace.' },
] as const

const STEPS = [
  { n: '01', title: 'Gentle relaxation and connection', desc: 'A safe, tranquil space. Guided breathing and soothing visualisation prepare mind and body for inner exploration.' },
  { n: '02', title: 'Connecting with your inner guidance', desc: 'Invite your higher self or inner wisdom to reveal a memory ready for healing. Immerse with all senses, feeling safe.' },
  { n: '03', title: 'Memory exploration and healing', desc: 'Identify the moment emotions were trapped. Meet it with presence. Allow the energy to move.' },
  { n: '04', title: 'Integration', desc: 'Bring the released energy back into the body. Anchor the new state in your present self.' },
  { n: '05', title: 'Envision a positive future', desc: 'Imagine your integrated self moving forward — and step into that picture.' },
] as const

const FAQS = [
  { q: 'How long is one session?', a: 'About 45–60 minutes. Find a quiet space, headphones recommended, no driving or operating machinery afterwards.' },
  { q: 'How often should I practise?', a: 'Daily for the first 21 days to build momentum, then once a week as integration maintenance.' },
  { q: 'Is it safe for everyone?', a: 'For most people yes. If you have a history of severe trauma or active mental health treatment, do this work with a therapist alongside.' },
  { q: 'What if strong emotion comes up?', a: 'Breathe with it. Don’t suppress. Don’t cling. Let it move. After the session, journal what arose and rest before re-engaging your day.' },
] as const

function IyssPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  return (
    <SpiritualityLayout>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative -mx-6 px-6 pt-2 pb-16 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-b-3xl overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 30%, rgba(220,180,90,0.20), transparent 55%),' +
              'radial-gradient(ellipse at 75% 80%, rgba(140,90,200,0.14), transparent 55%),' +
              'linear-gradient(180deg, #0a0e1a 0%, #11142a 60%, #06090a 100%)',
          }}
        />
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4 mt-4">Activation Session</p>
        <div className="grid gap-10 md:grid-cols-[1.3fr,1fr] items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
              Integrate your<br />
              <span className="italic font-light text-amber-200">shattered self.</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
              Heal the wounds of the past, release trapped emotions and energies, and accelerate your
              spiritual journey toward higher consciousness. A guided session designed to help you deeply
              relax, regain control, and move forward with ease and fulfilment.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#listen" className="rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all">
                Listen to recording →
              </a>
              <span className="text-xs text-white/55">Prepare headphones. Find a quiet 45–60 min.</span>
            </div>
          </div>
          {/* Sacred geometry mandala — actual artwork from myspiritway.org */}
          <div className="relative aspect-square rounded-2xl border border-amber-300/20 overflow-hidden bg-[#06090a]">
            <img
              src={MANDALA_URL}
              alt="Golden sacred geometry mandala — a glowing orb at the centre surrounded by concentric rings, polyhedra, and stars."
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#06090a]/60 via-transparent to-transparent"
            />
            <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-amber-200/80 italic drop-shadow">
              21 days of integration · then weekly maintenance
            </div>
          </div>
        </div>
      </section>

      {/* ── Does this sound like you ────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="rounded-2xl border border-amber-300/15 bg-gradient-to-b from-amber-500/[0.05] to-transparent p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Why choose the integration process</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8">
            Does this sound like you?
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {SOUNDS_LIKE_YOU.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-white/85">
                <span className="text-amber-300/80 mt-1 shrink-0" aria-hidden>✦</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base text-white/70 italic max-w-2xl">
            This process bridges past and present, guiding you to rediscover the light within. It&apos;s
            about letting go, reconnecting, and becoming whole again.
          </p>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Benefits of the process</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          What changes after 21 days.
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-amber-200/90">{b.title}</h3>
              <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">How it works</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          The guided process, step by step.
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          One full session takes you through these five stages. You can return to any stage anytime.
        </p>
        <ol className="space-y-4">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-6 rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <div className="text-3xl font-bold text-amber-300/80 leading-none shrink-0">{s.n}</div>
              <div>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Listen card ─────────────────────────────────────────────── */}
      <section id="listen" className="py-20 border-t border-white/5">
        <div className="relative overflow-hidden rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-500/[0.10] via-amber-500/[0.04] to-transparent p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr,1.4fr] items-center">
            {/* Audio thumbnail — mandala artwork */}
            <div className="relative aspect-square rounded-xl overflow-hidden border border-amber-300/30 bg-[#06090a] mx-auto w-full max-w-xs md:max-w-none">
              <img
                src={MANDALA_URL}
                alt="Integrate Your Shattered Self — guided audio session cover."
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#06090a]/70 via-transparent to-transparent"
              />
              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-amber-300/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <span className="ml-1 text-[#06090a] text-2xl" aria-hidden>▶</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300 mb-3">Ready?</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
                Put on your headphones.
              </h2>
              <p className="text-base text-white/75 leading-relaxed mb-8 max-w-xl">
                45–60 minutes. Quiet space. Headphones recommended. Nothing else to do — just receive.
              </p>
              <a
                href="https://www.myspiritway.org/iyss-recording"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-md bg-amber-300 px-8 py-4 text-base font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
              >
                Listen to recording →
              </a>
              <p className="mt-4 text-xs text-white/40 italic">
                (Audio player being migrated. Original session available at the link above.)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          Practical questions.
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

      <p className="mt-12 text-xs text-white/30 italic">
        Migrated from myspiritway.org/iyss. <Link to="/spirituality" className="underline hover:text-white/60">Back to spirituality home →</Link>
      </p>
    </SpiritualityLayout>
  )
}
