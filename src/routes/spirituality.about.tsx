import { createFileRoute, Link } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/about')({
  head: () => ({
    meta: [
      { title: 'About Kamil Jan — Teacher of Practical Spirituality' },
      { name: 'description', content: 'Twelve years on the path. The story behind MySpiritWay and the simplified practical spirituality method.' },
      { property: 'og:title', content: 'About Kamil Jan — Teacher of Practical Spirituality' },
      { property: 'og:description', content: 'Twelve years on the path. The story behind MySpiritWay and the simplified practical spirituality method.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/about' },
      { property: 'og:image', content: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/67f16bad13d72_Zrzutekranu2025-04-05174257.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/about' },
    ],
  }),
  component: AboutPage,
})

// ── Real CloudFront assets pulled from myspiritway.org/aboutkamiljan ──────
const MSW_LOGO = 'https://d1yei2z3i6k35z.cloudfront.net/6584575/65f2f1ab9ea9a_Untitleddesign.png'
const PORTRAIT = 'https://d1yei2z3i6k35z.cloudfront.net/6584575/67f16bad13d72_Zrzutekranu2025-04-05174257.jpg'

const MEMORY_PHOTOS = [
  {
    src: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/67f16bad13d72_Zrzutekranu2025-04-05174257.jpg',
    caption: 'Studio session, 2025',
  },
  {
    src: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/660c0839aab6d_FB_IMG_1696238558446.jpg',
    caption: 'Festival Wibracje, Poland',
  },
  {
    src: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/65ff15fd13741_FB_IMG_1696238558446.jpg',
    caption: 'On the road, Europe',
  },
  {
    src: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/691b4c7d405d3_ChatGPTImageNov17202504_24_44PM.png',
    caption: 'Teaching online',
  },
] as const

const PILLARS = [
  { icon: 'compass', title: 'Practical wisdom', desc: 'No abstraction-for-its-own-sake. Tools that work inside a real life with bills and responsibilities.' },
  { icon: 'seed', title: 'Lived experience', desc: 'Everything taught has been tested on my own body first. If it doesn’t hold up in daily life, it doesn’t make the page.' },
  { icon: 'handshake', title: 'Friend, not guru', desc: 'I’m on the same path as you. The title is shorthand. What matters is walking it together.' },
] as const

const TIMELINE = [
  { period: 'Early years', title: 'Family, lessons, responsibility', desc: 'Growing up in a family with both warmth and conflict — and developing an early need to find solutions that could end suffering.' },
  { period: 'The questioning', title: 'Noticing the unseen', desc: 'A young awareness that the world I saw wasn’t the same world most people saw. Subtle patterns, threads behind things.' },
  { period: 'The search', title: '12 years of seeking', desc: 'Following spiritual, religious, and philosophical traditions wherever they led. Hours and years of practice, study, and direct experience.' },
  { period: 'Now', title: 'Teaching by structuring', desc: 'Distilling what I found into a practical path others can actually walk — without taking 12 years to get there.' },
] as const

function PillarGlyph({ kind }: { kind: string }) {
  if (kind === 'compass') {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <polygon points="14.5 9.5 9.5 11.5 9.5 14.5 14.5 12.5" />
      </svg>
    )
  }
  if (kind === 'seed') {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 21c0-4 0-8 0-12" />
        <path d="M12 9c-3 0-6-2-6-6 4 0 6 2 6 6z" />
        <path d="M12 13c3 0 6-2 6-6-4 0-6 2-6 6z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 11l-3-3a2 2 0 1 1 2.8-2.8L14 8" />
      <path d="M13 13l3 3a2 2 0 1 0 2.8-2.8L16 11" />
      <path d="M8 14l3 3" />
      <path d="M14 8l3 3" />
    </svg>
  )
}

function AboutPage() {
  return (
    <SpiritualityLayout>
      {/* ── MySpiritWay brand mark ───────────────────────────────────── */}
      <div className="flex flex-col items-center justify-center pt-6 pb-2">
        <img
          src={MSW_LOGO}
          alt="MySpiritWay"
          className="h-12 md:h-14 w-auto opacity-90"
          loading="eager"
        />
        <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
          myspiritway.org
        </p>
      </div>

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
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4 mt-4">About</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
          Kamil Jan —<br />
          <span className="italic font-light text-amber-200">teacher of practical spirituality.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
          My name is Kamil Jan, and I am a Practical Spiritual Teacher — your friend on this journey.
        </p>
      </section>

      {/* ── Portrait + intro bio ─────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="grid gap-10 md:grid-cols-[1fr,1.4fr] items-start">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-amber-500/[0.12] via-pink-500/[0.06] to-purple-500/[0.08]">
            <img
              src={PORTRAIT}
              alt="Kamil Jan — portrait, seated in front of a magenta lamp"
              className="h-full w-full object-cover aspect-[4/5]"
              loading="lazy"
            />
          </div>
          <div className="space-y-5 text-white/85 leading-relaxed">
            <p>
              Sharing my story has always been somewhat challenging. My memories often feel blurred, and
              recalling specific events seems distant — perhaps because I integrated many lessons into the
              present moment without holding onto intense emotional attachments. Even when life threw
              difficulties my way, I rarely held onto them in a way that caused lasting trauma. It seemed
              natural to let go and move forward, weaving each lesson into the fabric of who I am now.
            </p>
            <p>
              From a young age I sensed I didn&apos;t see the world the way most people did. In everyday
              moments I would notice subtle patterns and connections that others seemed to miss. That
              quiet noticing became the seed of what later became this work.
            </p>
            <p>
              The thread I followed — across traditions, practices, teachers, and direct experience —
              led to one stable insight: the path can be made simpler. What used to take decades can be
              compressed without losing depth. That&apos;s what I do here.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3 pillars ─────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">How I teach</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          Three commitments.
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={i} className="rounded-xl border border-amber-300/15 bg-gradient-to-b from-amber-500/[0.05] to-transparent p-6">
              <div className="mb-3"><PillarGlyph kind={p.icon} /></div>
              <h3 className="text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">The path</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          How I got here.
        </h2>
        <ol className="space-y-4">
          {TIMELINE.map((t, i) => (
            <li key={i} className="flex gap-6 rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-widest text-amber-200/70 font-semibold shrink-0 w-28 pt-1">
                {t.period}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t.title}</h3>
                <p className="mt-1.5 text-sm md:text-base text-white/75 leading-relaxed">{t.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-500/[0.08] via-amber-500/[0.02] to-transparent p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300 mb-3">Mission</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
            Make the path practical. Make it accessible.
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
            My biggest dream is to help build a community where people live in a healthy, balanced way and
            support each other&apos;s creative and spiritual potential. The Simplified Practical Spirituality
            guidebook, the activation sessions, the writing — all of it points toward one thing: a path
            anyone can walk, starting today.
          </p>
        </div>
      </section>

      {/* ── Photo memory strip ───────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Memory strip</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8">
          Moments along the way.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {MEMORY_PHOTOS.map((photo, i) => (
            <figure
              key={i}
              className="group rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]"
            >
              <div className="aspect-square overflow-hidden bg-black/40">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <figcaption className="px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Where to go next ─────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Start here</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-10">
          Where to begin.
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link to="/spirituality/sps" className="block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-300/30 hover:bg-amber-500/[0.04] transition-all">
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80 mb-2">Read</div>
            <h3 className="text-base font-semibold text-white mb-1">The complete book</h3>
            <p className="text-sm text-white/65">Simplified Practical Spirituality — full guidebook.</p>
          </Link>
          <Link to="/spirituality/dmt" className="block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-300/30 hover:bg-amber-500/[0.04] transition-all">
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80 mb-2">Practise</div>
            <h3 className="text-base font-semibold text-white mb-1">Dynamic Meditation</h3>
            <p className="text-sm text-white/65">Live audio practice. 45 minutes. Find a quiet space.</p>
          </Link>
          <Link to="/spirituality/clarity" className="block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-300/30 hover:bg-amber-500/[0.04] transition-all">
            <div className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80 mb-2">Talk</div>
            <h3 className="text-base font-semibold text-white mb-1">1:1 Clarity Call</h3>
            <p className="text-sm text-white/65">Free 45-minute conversation. No pitch — just clarity.</p>
          </Link>
        </div>
      </section>

      <p className="mt-12 text-xs text-white/30 italic">
        Migrated from myspiritway.org/aboutkamiljan. <Link to="/spirituality" className="underline hover:text-white/60">Back to spirituality home →</Link>
      </p>
    </SpiritualityLayout>
  )
}
