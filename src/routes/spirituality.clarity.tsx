import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/clarity')({
  head: () => ({
    meta: [
      { title: 'Book a Clarity Call — Spiritual Business Audit' },
      { name: 'description', content: "Free 45-minute Clarity Call. Find what's not aligned in your spiritual business. Map your next 3 steps." },
      { property: 'og:title', content: 'Book a Clarity Call — Spiritual Business Audit' },
      { property: 'og:description', content: "Free 45-minute Clarity Call. Find what's not aligned in your spiritual business. Map your next 3 steps." },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/clarity' },
      { property: 'og:image', content: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/690f6b705eae5_Untitled1080x1080px.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/clarity' },
    ],
  }),
  component: ClarityPage,
})

// TODO replace with the live Google Calendar booking URL
const BOOKING_URL = 'https://calendar.google.com/calendar/appointments/AcZssZ3qXq8Wbu2cqI82BYwSNlYAhf4XBHJ4lFa_TBg=?gv=true'

// ── Real assets pulled from myspiritway.org/clarity CloudFront CDN ─────────
const IMG = {
  // Hero / section graphic 1080×1080 — notebook + iPad "Clarity Call" thumbnail
  hero: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/690f6b705eae5_Untitled1080x1080px.jpg',
  // Decorative downward arrow used as section separator
  arrow: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/68e6a291984f9_arrow_down_spiritual_business.jpg',
  // Kamil Jan portrait for the Your Mentor section
  kamil: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/68e6a764052e2_kamiljanpracticalmarketing.jpg',
  // Bottom signup / checklist visual
  signup: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/6901318f3d2e8_Purpouse2.png',
  // How-to-book step visuals
  stepCalendar: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/6904d7dc6d030_calendar.jpg',
  stepPrep: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/690f6e8da5eb5_Untitled718x610px.jpg',
  stepMeet: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/690f6f4b25705_Google-Meet-PWA-Chromebook-Chrome-OS.webp',
  stepMeeting: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/6910723bdd520_Untitleddesign11.jpg',
} as const

const TRUST_BADGES = [
  'no sales pitch',
  'practical plan',
  'no jargon',
  'free 45 min',
] as const

const WHAT_YOU_RECEIVE = [
  {
    title: 'The Full System',
    desc: 'A simple framework used by successful creators — tailored to your spiritual business.',
  },
  {
    title: 'Your Current State Evaluated',
    desc: 'Review your current state against the system. Strengths and gaps named clearly.',
  },
  {
    title: 'Closest Energy Block Identified',
    desc: 'Uncover the nearest energetic block between you and consistent soul clients.',
  },
  {
    title: 'Short Action Plan',
    desc: 'A short, practical plan you can start right away — no fluff.',
  },
  {
    title: 'Invitation to Continue',
    desc: 'If a fit, we discuss guided support. If not, you still leave with the plan.',
  },
] as const

const SEVEN_MODULES = [
  { icon: 'P', name: 'Purpose', q: 'Why do I feel called to do this work — and how does that guide my offers?' },
  { icon: 'S', name: 'Soul Client', q: 'Who is my ideal client and what are they truly seeking?' },
  { icon: 'V', name: 'Viral Offer', q: 'How do I design an offer that resonates and spreads naturally?' },
  { icon: 'C', name: 'Content', q: 'What do I publish so the right people find me consistently?' },
  { icon: 'T', name: 'Traffic', q: 'How do I reach more aligned people without burning out?' },
  { icon: 'X', name: 'Systems', q: 'Which simple systems let the work run without me being everywhere?' },
  { icon: '$', name: 'Pricing & Sales', q: 'How do I price my work with integrity and have honest sales conversations?' },
] as const

const BOOK_STEPS = [
  {
    img: IMG.stepCalendar,
    title: 'Choose a time',
    desc: 'Pick a slot that suits you on the booking calendar.',
  },
  {
    img: IMG.stepPrep,
    title: 'Prep your questions',
    desc: 'Send a couple of lines about where you are and what you want to walk away with.',
  },
  {
    img: IMG.stepMeet,
    title: 'Get the link',
    desc: 'Confirmation email with your Google Meet link arrives instantly.',
  },
  {
    img: IMG.stepMeeting,
    title: 'Meet for clarity',
    desc: 'Forty-five focused minutes. Walk away with a plan you can implement today.',
  },
] as const

const FAQS = [
  { q: 'How long is the call?', a: 'Between 30–45 minutes. Long enough to go deep, short enough to stay focused.' },
  { q: 'Is it free?', a: 'Currently yes — that may change. One free call per person. Paid follow-ups available if helpful.' },
  { q: 'Can I book more than one call?', a: 'Yes, the second one is part of a paid offering. We can talk about it on the first call.' },
  { q: 'Will you try to sell me something?', a: 'Only if we both feel it’s right. No manipulative tactics — just information and your conscious choice.' },
  { q: 'Do you work outside English?', a: 'Yes. I adapt to other languages where I can; let me know your preference when booking.' },
] as const

function ArrowDivider() {
  return (
    <div className="flex justify-center py-8" aria-hidden>
      <img
        src={IMG.arrow}
        alt=""
        className="w-12 md:w-14 h-auto opacity-70"
        loading="lazy"
      />
    </div>
  )
}

function ClarityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <SpiritualityLayout>
      {/* ── Hero with real photo backdrop + 1080×1080 square card ──────── */}
      <section className="relative -mx-6 px-6 pt-2 pb-16 md:pb-20 overflow-hidden">
        {/* Background photo layer (~30% opacity) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${IMG.hero})` }}
        />
        {/* Dark gradient over the photo for legibility */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-[#06090a]/85 via-[#06090a]/70 to-[#06090a]/95" />

        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4">
              Spiritual Marketing for Spiritual Businesses
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
              Find what&apos;s not aligned —<br />
              <span className="italic font-light text-amber-200">and gently unlock your financial abundance.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              Book a FREE 45-minute Clarity Call. We&apos;ll review the key parts of your spiritual business,
              uncover the closest energy block between you and aligned soul clients, and map your next three
              strategic steps.
            </p>
            <p className="mt-4 text-base text-white/65 max-w-2xl">
              For spiritual creators, teachers, and healers who value integrity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-amber-300 px-6 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
              >
                Book your Clarity Call
              </a>
              <span className="text-xs text-white/50">Booking calendar opens in a new tab.</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider">
              {TRUST_BADGES.map((b) => (
                <span key={b} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-white/70">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Side image — 1080×1080 square card */}
          <div className="w-full">
            <div className="aspect-square rounded-2xl overflow-hidden border border-amber-200/20 shadow-[0_20px_60px_-15px_rgba(252,211,77,0.25)]">
              <img
                src={IMG.hero}
                alt="A notebook beside an iPad showing the Clarity Call modules — purpose, soul client, offer, content, traffic, ads."
                className="w-full h-full object-cover block"
                loading="eager"
              />
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-wider text-white/40 text-center">
              What we walk through on the call
            </p>
          </div>
        </div>
      </section>

      {/* Decorative arrow: Hero → What You Receive */}
      <ArrowDivider />

      {/* ── What You Receive ───────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">What you receive</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          You leave the call with five things.
        </h2>
        <ol className="space-y-4">
          {WHAT_YOU_RECEIVE.map((item, i) => (
            <li key={i} className="flex gap-5 rounded-lg border border-white/10 bg-white/[0.02] p-5">
              <div className="text-2xl font-bold text-amber-300/80 leading-none shrink-0">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 7 Modules ──────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">7 Modules we examine</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          The questions that change everything.
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          A focused walk through seven modules of your spiritual business. We diagnose where each one stands
          today, and you leave knowing exactly where to apply pressure first.
        </p>

        <div className="grid gap-3">
          {SEVEN_MODULES.map((m, i) => (
            <div key={i} className="flex items-start gap-4 rounded-md border border-white/10 bg-white/[0.02] p-5">
              <div className="text-lg font-semibold shrink-0 leading-none mt-0.5 text-amber-300 w-7 text-center">{m.icon}</div>
              <div>
                <div className="text-base font-semibold text-white">{m.name}</div>
                <div className="mt-1 text-sm text-white/65 leading-relaxed italic">&ldquo;{m.q}&rdquo;</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative arrow: Modules → Who You'll Meet */}
      <ArrowDivider />

      {/* ── Who You'll Meet / Your Mentor (portrait left, text right) ──── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Who you&apos;ll meet</p>
        <div className="grid gap-8 md:grid-cols-[280px,1fr] items-start">
          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-amber-200/20 shadow-[0_15px_40px_-15px_rgba(252,211,77,0.2)]">
              <img
                src={IMG.kamil}
                alt="Kamil Jan — practical spiritual teacher and spiritual business mentor"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-center text-sm italic text-white/60">Kamil Jan</p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
              Kamil Jan
            </h2>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300/70 mb-4">
              Practical Spiritual Teacher &amp; Spiritual Business Mentor
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Creator of MySpiritWay and author of the Practical Spirituality guidebook. I help spiritual
              creators build simple, ethical paths from content to clients — without losing authenticity.
              Nearly a decade in digital marketing.
            </p>
            <p className="mt-4 text-base text-white/70 leading-relaxed">
              I deeply believe that together we can help raise the collective consciousness and bring more
              spiritual qualities into the world.
            </p>
            <p className="mt-6 text-sm text-white/60 italic">
              No pressure, just clarity. This is not a sales call — if there&apos;s a fit, we talk next steps.
              If not, you leave with a plan you can implement starting today.
            </p>
          </div>
        </div>
      </section>

      {/* ── How to Book — four illustrated steps ───────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">How to book</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
          Four simple steps to your Clarity Call.
        </h2>
        <p className="text-base text-white/75 max-w-2xl mb-10">
          To stay present, do quality work, and maintain a healthy life–work balance, only two calls are
          available per day, Monday–Friday. Over time, these may no longer be free.
        </p>

        <div className="grid gap-5 md:grid-cols-4">
          {BOOK_STEPS.map((s, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-white/5">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="text-xs font-mono text-amber-300 mb-1">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm text-white/65 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative arrow: How to Book → Booking calendar CTA */}
      <ArrowDivider />

      {/* ── Booking calendar CTA (preserved) ───────────────────────────── */}
      <section className="py-12">
        <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/5 p-6 text-center">
          <p className="text-sm text-white/80 mb-4">Choose the date and time that suits you:</p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
          >
            Open booking calendar →
          </a>
          <p className="mt-3 text-[11px] text-white/40">Powered by Google Calendar · you receive a confirmation email after booking.</p>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          Frequently asked questions.
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
                <span className="text-base md:text-lg font-medium text-white group-hover:text-amber-100">
                  {f.q}
                </span>
                <span className={`text-2xl text-white/50 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} aria-hidden>+</span>
              </div>
              {openFaq === i && (
                <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">{f.a}</p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Final CTA with side illustration (Purpouse2) ───────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="grid gap-10 md:grid-cols-[1fr,280px] items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
              Ready when you are.
            </h2>
            <p className="text-base text-white/70 mb-8 max-w-xl md:mx-0 mx-auto">
              Forty-five minutes. Free. No pitch. Either we&apos;re a fit and we keep going, or you leave
              with a practical plan and we wish each other well.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-md bg-amber-300 px-8 py-4 text-base font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
            >
              Book your Clarity Call →
            </a>
            <p className="mt-6 text-sm text-white/50">
              Or write directly: <a href="mailto:hello@kamiljan.com" className="text-amber-200 hover:text-amber-100 underline underline-offset-2">hello@kamiljan.com</a>
            </p>
          </div>

          <div className="hidden md:block">
            <img
              src={IMG.signup}
              alt="Spiritual business purpose checklist illustration"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <p className="mt-12 text-xs text-white/30 italic">
        Migrated from myspiritway.org/clarity. <Link to="/spirituality" className="underline hover:text-white/60">Back to spirituality home →</Link>
      </p>
    </SpiritualityLayout>
  )
}
