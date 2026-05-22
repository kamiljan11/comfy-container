import { createFileRoute, Link } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'
import MarkdownContent from '../components/MarkdownContent'
import sps2 from '../content/spirituality/sps2.md?raw'

export const Route = createFileRoute('/spirituality/sps2')({
  head: () => ({
    meta: [
      { title: 'Simplified Practical Spirituality² — Short Version' },
      { name: 'description', content: 'The full book in 66 minutes. The essence without losing depth.' },
      { property: 'og:title', content: 'Simplified Practical Spirituality² — Short Version' },
      { property: 'og:description', content: 'The full book in 66 minutes. The essence without losing depth.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality/sps2' },
      { property: 'og:image', content: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/684eeba14ef85_683494b851212_398144160_6738014629569555_892258626759783772_n1.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality/sps2' },
    ],
  }),
  component: Sps2Page,
})

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/6584575'

const HERO_IMG = `${CDN}/684eeba14ef85_683494b851212_398144160_6738014629569555_892258626759783772_n1.jpg`

const TRANSFORMATIONS = [
  {
    img: `${CDN}/684ee1640efb0_ChatGPTImageJun15202505_06_00PM.png`,
    title: 'Accelerate the Evolution of Consciousness',
    desc: 'Begin to see life through a more awakened lens. As your consciousness evolves, you experience deeper clarity, expanded awareness, and a more complete sense of reality itself.',
  },
  {
    img: `${CDN}/684eeaf2962e3_ChatGPTImageJun15202505_46_45PM.png`,
    title: 'Reduce Unnecessary Suffering',
    desc: 'Free yourself from patterns that create inner struggle. With deeper understanding, you naturally align with higher choices — making life simpler, lighter, and more meaningful.',
  },
  {
    img: `${CDN}/684edbe4ba0e7_ChatGPTImageJun15202504_42_35PM.png`,
    title: 'Achieve Complete Lasting Life Happiness',
    desc: 'Discover what truly matters to you. As awareness reaches neglected areas of your life, a deeper satisfaction emerges — one that does not fade, because it comes from within.',
  },
] as const

const CHAPTER_PLATES = [
  { img: `${CDN}/685af2e564313_whatiscoreofsufferingfin.jpg`, caption: 'What Is The Essence of Suffering?' },
  { img: `${CDN}/685af6cac5f67_spirituality.jpg`, caption: 'What Is Spirituality?' },
  { img: `${CDN}/685af6d741941_concioussnes.jpg`, caption: 'What Is Consciousness?' },
  { img: `${CDN}/685af6ea84dac_evolution.jpg`, caption: 'What Is the Evolution of Consciousness?' },
  { img: `${CDN}/685af721245c4_levels.jpg`, caption: 'What Are the Levels of Consciousness?' },
  { img: `${CDN}/685af72fb4840_peak.jpg`, caption: 'What Are the Peak Experiences?' },
  { img: `${CDN}/685b0321428de_central.jpg`, caption: 'Why Evolution of Consciousness Should be Central to Your Life?' },
  { img: `${CDN}/685efe8bc78a2_completelasting.jpg`, caption: 'What Is the Complete Lasting Life Happiness?' },
  { img: `${CDN}/685effdf518c2_practicalspirituality.jpg`, caption: 'What Is the Practical / Pragmatic Spirituality?' },
  { img: `${CDN}/6863b6fb88085_pathfixed.jpg`, caption: 'The Practical Spiritual Path' },
  { img: `${CDN}/686429b84e8da_sessions.jpg`, caption: 'Activation Sessions' },
  { img: `${CDN}/6864313032e02_midset.jpg`, caption: 'The Evolutionary Mindset' },
  { img: `${CDN}/686436b92a88c_best.jpg`, caption: 'Always Try Your Very Best' },
  { img: `${CDN}/686270e127181_12.jpg`, caption: 'Develop Formal Spiritual Practice' },
  { img: `${CDN}/686270fd5e121_13.jpg`, caption: 'Practice Micro-Awareness' },
  { img: `${CDN}/6862710fa65fe_14.jpg`, caption: 'Engage in Deep Reflection' },
  { img: `${CDN}/6866d601e02ad_healthyway.jpg`, caption: 'Develop Conscious Healthy Lifestyle' },
  { img: `${CDN}/68681cb009070_cultivate.jpg`, caption: 'Cultivate Spiritual Sensitivity' },
  { img: `${CDN}/6857e82d4ad8b_Beztytułu.png`, caption: 'The Simplified² Practical Spirituality — Meta / Core Spirituality' },
  { img: `${CDN}/65f2f02aa5584_PRACTICALSPI.png`, caption: 'Practical Spirituality — Book Cover' },
] as const

function Sps2Page() {
  return (
    <SpiritualityLayout>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative -mx-6 px-6 pt-2 pb-16 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-b-3xl overflow-hidden opacity-90"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 25% 15%, rgba(220,160,80,0.18), transparent 55%),' +
              'radial-gradient(ellipse at 80% 90%, rgba(80,140,160,0.16), transparent 55%),' +
              'linear-gradient(180deg, #0a1a20 0%, #0e2128 60%, #06090a 100%)',
          }}
        />
        <div className="grid gap-10 md:grid-cols-[1.1fr,1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-4 mt-4">
              Short Version · 66-minute read
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white">
              The Simplified Practical Spirituality².<br />
              <span className="italic font-light text-amber-200">Distilled.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
              A clear and accessible guide to accelerating the evolution of consciousness, reducing
              unnecessary suffering, and creating space for complete lasting life happiness. The full
              book&apos;s essence — without losing depth.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/spirituality/sps"
                className="rounded-md bg-amber-300 px-7 py-3 text-sm font-semibold text-[#06090a] hover:bg-amber-200 transition-all"
              >
                Read the full book →
              </Link>
              <Link
                to="/spirituality/dmt"
                className="rounded-md border border-white/20 bg-white/[0.05] px-7 py-3 text-sm text-white hover:bg-white/10 transition-all"
              >
                Try DMT meditation
              </Link>
            </div>
          </div>
          <figure className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-gradient-to-br from-amber-500/10 via-cyan-500/10 to-purple-500/10">
              <img
                src={HERO_IMG}
                alt="Kamil Jan seated in Rishikesh, India — 2024"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <figcaption className="mt-3 text-xs text-white/55 italic text-right pr-1">
              Rishikesh, India — 2024
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Three Core Transformations ──────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Key Goals and Benefits</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          Three Core Transformations.
        </h2>
        <p className="text-base text-white/65 mb-10 max-w-2xl">
          That unlock countless other benefits.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {TRANSFORMATIONS.map((t, i) => (
            <article
              key={i}
              className="rounded-xl border border-amber-300/15 bg-gradient-to-b from-amber-500/[0.05] to-transparent overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black/30">
                <img
                  src={t.img}
                  alt={t.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-base md:text-lg font-semibold text-white">{t.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{t.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── YouTube playlist ────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-3">Watch</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          Ultra-short videos inspired by the guidebook.
        </h2>
        <p className="text-base text-white/65 mb-8 max-w-2xl">
          A growing playlist — bite-sized reflections that mirror the chapters below.
        </p>
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/40">
          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PLLLDxDP58sn8SRjvRmdPDT4E7K9R7haMo"
            title="Simplified Practical Spirituality² — playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <p className="mt-3 text-xs text-white/45">
          Or open the{' '}
          <a
            href="https://www.youtube.com/watch?v=XmZtmcRwTgc&list=PLLLDxDP58sn8SRjvRmdPDT4E7K9R7haMo"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/70"
          >
            full playlist on YouTube
          </a>
          .
        </p>
      </section>

      {/* ── Markdown body (unchanged) ───────────────────────────────────── */}
      <section className="py-12 border-t border-white/5">
        <MarkdownContent source={sps2} />
      </section>

      {/* ── Chapter image plates accordion ──────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <details className="group rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-1">Visual reference</p>
              <h3 className="text-xl md:text-2xl font-semibold text-white">Chapter image plates</h3>
              <p className="mt-1 text-sm text-white/60">
                Every illustration that appears alongside the chapters above — at a glance.
              </p>
            </div>
            <span
              className="text-3xl text-white/50 transition-transform group-open:rotate-45 shrink-0"
              aria-hidden
            >
              +
            </span>
          </summary>
          <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CHAPTER_PLATES.map((p, i) => (
              <figure key={i} className="rounded-lg overflow-hidden border border-white/10 bg-black/30">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.caption}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="px-3 py-2 text-[11px] text-white/65 leading-snug">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </details>
      </section>

      <p className="mt-12 text-xs text-white/30 italic">
        Migrated from myspiritway.org/sps2.{' '}
        <Link to="/spirituality" className="underline hover:text-white/60">
          Back to spirituality home →
        </Link>
      </p>
    </SpiritualityLayout>
  )
}
