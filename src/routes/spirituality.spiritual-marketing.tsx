import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/spiritual-marketing')({
  head: () => ({
    meta: [
      { title: 'Spiritual Marketing for Spiritual Businesses' },
      { name: 'description', content: 'Turn your clarity into results. Build, grow, or refine your spiritual business with integrity.' },
      { property: 'og:title', content: 'Spiritual Marketing for Spiritual Businesses' },
      { property: 'og:description', content: 'Turn your clarity into results. Build, grow, or refine your spiritual business with integrity.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/spiritual-marketing' },
      { property: 'og:image', content: 'https://kamiljan.com/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/spiritual-marketing' },
    ],
  }),
  component: SpiritualMarketingPage,
})

// ── Real CloudFront assets sourced from myspiritway.org/spiritual-marketing ──
const CDN = 'https://d1yei2z3i6k35z.cloudfront.net'
const IMG = {
  logo: `${CDN}/6584575/68e2a609e5e5a_660c0839aab6d_FB_IMG_1696238558446-removebg-preview.png`,
  heroLake: `${CDN}/6584575/690394aa43dbe_6810c129f1983_65f2f1ab9ea9a_Untitleddesign.png`,
  testimonialAvatar: `${CDN}/systeme-common/5dcedd1ad5420_images2.png`,
  pathFix: `${CDN}/6584575/69077edd7d292_ChatGPTImageNov2202503_54_57PM.png`,
  pathWeekly: `${CDN}/6584575/69077f8495a4a_ChatGPTImageNov2202503_57_48PM.png`,
  pathDfy: `${CDN}/6584575/690ba1cc581d4_ChatGPTImageNov5202507_07_02PM.png`,
  gears: `${CDN}/6584575/690762ac46571_gears.gif`,
  arrowDown: `${CDN}/6584575/68e6a291984f9_arrow_down_spiritual_business.jpg`,
  kamil: `${CDN}/6584575/68ecee9666ca3_kamiljanpciture3.jpg`,
  qualityIntro: `${CDN}/6584575/6907dc6a52bd3_BlackandWhiteGradientModernComingSoonSquareInstagramPost1.jpg`,
  trustExperience: `${CDN}/6584575/690759398cbd7_ChatGPTImageNov2202501_14_24PM.png`,
  trustSlots: `${CDN}/6584575/6922dbedbc565_ChatGPTImageNov23202510_03_17AM.png`,
  trustPrice: `${CDN}/6584575/69075892d453f_ChatGPTImageNov2202501_11_38PM.png`,
  trustGuarantee: `${CDN}/6584575/69073b4a35c17_ChatGPTImageNov2202511_06_21AM.png`,
} as const

const TESTIMONIALS = [
  {
    quote: 'Booked the consultation worried I was "not ready." Left with a clear plan and my first two soul-aligned clients in one week.',
    name: 'Maya',
    role: 'Yoga Teacher',
  },
  {
    quote: 'I struggled with blocks that kept me from my best life. After this work, I am working online, helping others, and traveling the world. Thank you.',
    name: 'Sage',
    role: 'Reiki Master',
  },
  {
    quote: 'It flipped my thinking. I can see what I had been doing wrong for years, and I am already seeing results. Thanks.',
    name: 'Daniel',
    role: 'Life Coach',
  },
] as const

const THREE_PATHS = [
  {
    icon: IMG.pathFix,
    badge: 'Decide fast, move smart',
    name: 'Single-Problem Fix',
    desc: 'One specific block addressed in one focused engagement. Diagnose, fix, document — done.',
    points: ['One block, fully resolved', 'Documented so it stays fixed', 'Fastest time-to-clarity'],
    cta: 'Best for: one painful bottleneck',
  },
  {
    icon: IMG.pathWeekly,
    badge: 'Build momentum every week',
    name: 'Weekly Guidance',
    desc: 'Recurring weekly sessions to keep you moving — feedback, accountability, course-correction.',
    points: ['Weekly check-ins', 'Async support between sessions', 'Compounds over months'],
    cta: 'Best for: sustained build phase',
    featured: true,
  },
  {
    icon: IMG.pathDfy,
    badge: 'Built for you',
    name: 'Done-For-You Setup',
    desc: 'We build the systems, write the content, set up the funnels. You step in and run it.',
    points: ['Full setup delivered', 'You own everything', 'Handover with documentation'],
    cta: 'Best for: ready to operate, not build',
  },
] as const

const PROCESS_STEPS = [
  { n: '01', title: 'Clarity Call', desc: 'Free 45-min call. Diagnose the closest block. Map next three steps.' },
  { n: '02', title: 'Choose your path', desc: 'Single fix, weekly guidance, or done-for-you — based on where you actually are.' },
  { n: '03', title: 'Build with structure', desc: 'Systems, content, offers, traffic, sales — practical and integrity-aligned.' },
  { n: '04', title: 'Run the engine', desc: 'You publish, attract aligned clients, run honest sales conversations. Compound.' },
] as const

const TRUST_BADGES = [
  { icon: IMG.trustExperience, title: '10+ Years Experience' },
  { icon: IMG.trustSlots, title: 'Only 10 Open Slots' },
  { icon: IMG.trustPrice, title: 'Price Will Go Up' },
  { icon: IMG.trustGuarantee, title: 'Money Back Guarantee' },
] as const

const FAQS = [
  { q: 'Who is this for?', a: 'Spiritual creators, teachers, healers, coaches — anyone whose work touches inner life and who wants integrity-aligned growth.' },
  { q: 'Do I need a big audience to start?', a: 'No. Most of the work is upstream of audience — clarity, offer design, systems. With those right, even a tiny audience converts.' },
  { q: 'Will you push aggressive sales tactics?', a: 'Never. The whole point is integrity-aligned growth — no fake urgency, no manipulation, no shame-selling.' },
  { q: 'How long until I see results?', a: 'Single-problem fixes can change something within days. Weekly guidance compounds over 2–3 months. DFY setup ships in 4–8 weeks.' },
  { q: 'What about pricing?', a: 'Pricing depends on the path and scope. Real numbers come up on the Clarity Call once we know your situation.' },
] as const

function SpiritualMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <SpiritualityLayout>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative -mx-6 px-6 pt-2 pb-20">
        {/* Real lake/mountains photo backdrop with gradient overlay for legibility */}
        <div aria-hidden className="absolute inset-0 -z-10 rounded-b-3xl overflow-hidden">
          <img
            src={IMG.heroLake}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 50% 100%, rgba(50,150,180,0.35), transparent 60%),' +
                'linear-gradient(180deg, rgba(10,31,40,0.78) 0%, rgba(16,47,58,0.72) 45%, rgba(10,41,51,0.82) 80%, rgba(6,9,10,0.92) 100%)',
            }}
          />
        </div>

        {/* MySpiritWay logo */}
        <div className="mt-4 mb-6">
          <img
            src={IMG.logo}
            alt="MySpiritWay"
            className="h-14 md:h-16 w-auto object-contain"
            loading="eager"
          />
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4">
          Spiritual Marketing for Spiritual Businesses
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
          Turn your clarity into results.<br />
          <span className="italic font-light text-amber-200">Build, grow, or refine your spiritual business.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
          You have already done the hard part — finding your purpose. Now let&apos;s build the systems,
          knowledge, and flow that make your work reach more people, allowing you to help others and
          build dependable income.
        </p>
        <p className="mt-4 italic text-base text-amber-100/85">
          For spiritual business owners who value integrity and authenticity.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#paths" className="rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all">
            Compare plans
          </a>
          <Link to="/spirituality/clarity" className="rounded-md border border-white/20 bg-white/[0.05] px-7 py-3 text-sm text-white hover:bg-white/10 transition-all">
            Start with a free Clarity Call
          </Link>
        </div>
      </section>

      {/* ── Quality intro card ────────────────────────────────────────── */}
      <section className="py-12">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-center rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <img
            src={IMG.qualityIntro}
            alt="We deeply believe in quality"
            className="w-full rounded-xl object-cover aspect-square"
            loading="lazy"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">A note before we begin</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              We deeply believe in quality.
            </h2>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              This work is for conscious creators who want to grow without compromising the soul of
              what they do. No mass-market shortcuts, no hype, no manipulation. Just clear strategy,
              honest systems, and the kind of slow-built trust that compounds for years.
            </p>
          </div>
        </div>
      </section>

      {/* ── Decorative arrow separator ────────────────────────────────── */}
      <div className="flex justify-center py-2">
        <img
          src={IMG.arrowDown}
          alt=""
          aria-hidden
          className="w-[70px] h-auto opacity-70"
          loading="lazy"
        />
      </div>

      {/* ── Testimonials strip ────────────────────────────────────────── */}
      <section className="py-16">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">From practitioners</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          Real shifts, real outcomes.
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-7 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={IMG.testimonialAvatar}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15"
                  loading="lazy"
                />
                <div className="text-3xl text-amber-300/80 leading-none" aria-hidden>&ldquo;</div>
              </div>
              <blockquote className="flex-1 text-sm md:text-base text-white/80 leading-relaxed italic">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-white/10">
                <div className="text-base font-semibold text-white">{t.name}</div>
                <div className="text-xs text-amber-200/70 mt-0.5">~ {t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Why structure ─────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Why it works</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
            Structure serves spirit.
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Spirit-led work doesn&apos;t mean unstructured work. The most aligned offers, the deepest reach,
            the cleanest sales conversations — all run on simple systems. Structure removes friction so
            the gift can flow.
          </p>
          <p className="mt-4 text-base text-white/65 leading-relaxed">
            What we build together: clarity on purpose and soul client, an offer that resonates, content that
            attracts the right people, traffic that compounds, systems that run without you, and honest sales
            conversations.
          </p>
        </div>
      </section>

      {/* ── Why work with me — trust badges ───────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Why work with me</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          Four reasons to start now.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-5">
          {TRUST_BADGES.map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <img
                src={b.icon}
                alt={b.title}
                className="w-full max-w-[220px] h-auto object-contain mb-3"
                loading="lazy"
              />
              <p className="text-sm md:text-base font-medium text-white">{b.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Decorative arrow separator ────────────────────────────────── */}
      <div className="flex justify-center py-2">
        <img
          src={IMG.arrowDown}
          alt=""
          aria-hidden
          className="w-[70px] h-auto opacity-70"
          loading="lazy"
        />
      </div>

      {/* ── 3 Paths ────────────────────────────────────────────────────── */}
      <section id="paths" className="py-20 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">3 paths after the Clarity Call</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-12">
          Choose the path that fits where you are.
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {THREE_PATHS.map((p, i) => (
            <div
              key={i}
              className={`flex flex-col rounded-2xl border p-7 transition-all ${
                p.featured
                  ? 'border-amber-300/40 bg-gradient-to-b from-amber-500/[0.10] via-amber-500/[0.03] to-transparent'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-5">
                <img
                  src={p.icon}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className={`text-[10px] uppercase tracking-[0.2em] mb-3 ${p.featured ? 'text-amber-300' : 'text-amber-300/80'}`}>
                {p.badge}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{p.name}</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-5">{p.desc}</p>
              <ul className="space-y-2 mb-6">
                {p.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-amber-300/80 mt-0.5" aria-hidden>✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-4 border-t border-white/10 text-xs text-white/55 italic">
                {p.cta}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/spirituality/clarity" className="inline-block rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all">
            Start with a free Clarity Call →
          </Link>
          <p className="mt-3 text-xs text-white/50">Pricing comes up on the call once we know your situation.</p>
        </div>
      </section>

      {/* ── Practical Spiritual Process ───────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">The process</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8">
          Four steps. No mystery.
        </h2>
        <div className="mb-10 flex justify-center">
          <img
            src={IMG.gears}
            alt="The 7-module spiritual business system — every part working together"
            className="w-full max-w-md rounded-lg"
            loading="lazy"
          />
        </div>
        <ol className="grid gap-4 md:grid-cols-2">
          {PROCESS_STEPS.map((s) => (
            <li key={s.n} className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <div className="text-3xl font-bold text-amber-300/80 mb-3">{s.n}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Meditation card ───────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="relative overflow-hidden rounded-2xl border border-amber-300/20 bg-gradient-to-br from-[#1a2f3a] via-[#15252e] to-[#0e1c23] p-8 md:p-12">
          <div aria-hidden className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
          <p className="relative text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Inner work first</p>
          <h2 className="relative text-2xl md:text-3xl font-bold text-white mb-4">
            Before strategy: a moment of meditation.
          </h2>
          <p className="relative text-base text-white/75 leading-relaxed max-w-2xl mb-6">
            The strongest businesses run on a clear inner state. Try the Dynamic Meditation Technique —
            the same practice I use to keep the work clean.
          </p>
          <Link to="/spirituality/dmt" className="relative inline-block rounded-md border border-amber-300/30 bg-amber-300/10 px-5 py-2.5 text-sm text-amber-100 hover:bg-amber-300/20 transition-all">
            Try DMT meditation →
          </Link>
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

      {/* ── Your Spiritual Business Mentor ────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Meet your guide</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8">
          Your Spiritual Business Mentor.
        </h2>
        <div className="grid gap-8 md:grid-cols-[280px,1fr] items-start">
          <img
            src={IMG.kamil}
            alt="Kamil Jan, Spiritual Business Mentor"
            className="w-full max-w-[280px] rounded-2xl border border-white/10 object-cover"
            loading="lazy"
          />
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Kamil Jan</h3>
            <p className="text-sm text-amber-200/80 mb-5 italic">Spiritual Business Mentor</p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-4">
              When I first recognised my spiritual gifts, sharing them online was harder than I expected.
              That set me on a path of aligning with my true self. After years of learning, building, and
              testing, I developed a practical formula that brings spirituality and business together so
              meaningful work reaches the people it is meant to serve.
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Today I use that same system to help conscious creators — coaches, healers, teachers, and
              practitioners — turn their gifts into work that sustains them. The mission stays simple:
              integrity-aligned growth, no manipulation, no hype, just clear strategy and the kind of
              trust that compounds for years.
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="relative -mx-6 px-6 py-20 border-t border-white/5 text-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <img
            src={IMG.heroLake}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(6,9,10,0.85) 0%, rgba(10,41,51,0.80) 50%, rgba(6,9,10,0.92) 100%)',
            }}
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
          Ready to move from insight to implementation?
        </h2>
        <p className="text-base text-white/80 mb-8 max-w-xl mx-auto">
          Start where everyone starts — a free Clarity Call. We&apos;ll figure out which path fits.
        </p>
        <Link to="/spirituality/clarity" className="inline-block rounded-md bg-amber-300 px-8 py-4 text-base font-semibold text-[#06090a] hover:bg-amber-200 transition-all">
          Book a Clarity Call →
        </Link>
        <p className="mt-6 text-sm text-white/60">
          Or write directly: <a href="mailto:hello@kamiljan.com" className="text-amber-200 hover:text-amber-100 underline underline-offset-2">hello@kamiljan.com</a>
        </p>
        <div className="mt-10 flex justify-center">
          <img
            src={IMG.logo}
            alt="MySpiritWay"
            className="h-12 w-auto opacity-90"
            loading="lazy"
          />
        </div>
      </section>

      <p className="mt-12 text-xs text-white/30 italic">
        Migrated from myspiritway.org/spiritual-marketing. <Link to="/spirituality" className="underline hover:text-white/60">Back to spirituality home →</Link>
      </p>
    </SpiritualityLayout>
  )
}
