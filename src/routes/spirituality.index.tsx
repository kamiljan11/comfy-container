import { createFileRoute, Link } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/')({
  head: () => ({
    meta: [
      { title: 'Practical Spirituality — Kamil Jan' },
      { name: 'description', content: 'Twelve years of practical wisdom synthesised. A spiritual path for modern life.' },
      { property: 'og:title', content: 'Practical Spirituality — Kamil Jan' },
      { property: 'og:description', content: 'Twelve years of practical wisdom synthesised. A spiritual path for modern life.' },
      { property: 'og:url', content: 'https://kamiljan.com/spirituality' },
      { property: 'og:image', content: 'https://d1yei2z3i6k35z.cloudfront.net/6584575/65ff15fd13741_FB_IMG_1696238558446.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://kamiljan.com/spirituality' },
    ],
  }),
  component: SpiritualityHub,
})

/**
 * 1:1 visual clone of myspiritway.org/ — linktree-style hub.
 *
 * Background and card images are the actual CloudFront URLs pulled from the
 * computed CSS of the live myspiritway.org page (verified 2026-05-22):
 *   - Mountain landscape: 6914ce520822c_UntitledMediumBannerUSLandscape2.png
 *   - Pastel card gradient overlay: 69124335ecedc_Untitleddesign9.png
 *
 * Layout:
 *   - Mountain photo fixed full-bleed behind everything
 *   - Centered pastel card (max-w-2xl) with rounded-3xl corners
 *   - Profile section sits naturally lower thanks to header padding + empty space
 *   - All marketing tiles use items-stretch + flex justify-center for proper
 *     vertical centring of the title block in the dark-teal right half
 */

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/6584575'
const IMG = {
  // Full-bleed mountain landscape behind the card
  mountainBg: `${CDN}/6914ce520822c_UntitledMediumBannerUSLandscape2.png`,
  // Pastel card gradient overlay (cream → mint → lavender → cyan)
  cardGradient: `${CDN}/69124335ecedc_Untitleddesign9.png`,
  // Round profile portrait — centred at top of the card (Kamil Jan brand mark)
  profile: `${CDN}/69123fae6467a_Untitleddesign9.png`,
  // Spiritual Marketing card thumbnails (ChatGPT-generated, Nov 17 2025)
  clarityCall: `${CDN}/691b494212723_ChatGPTImageNov17202504_10_59PM.png`,
  marketingServices: `${CDN}/691b4a9020aa6_ChatGPTImageNov17202504_17_10PM.png`,
  youtubePlaylist: `${CDN}/691b4c7d405d3_ChatGPTImageNov17202504_24_44PM.png`,
  // The Simplified Practical Spirituality book cover
  spsBookCover: `${CDN}/69125643ec811_6857e82d4ad8b_Bez%20tytu%C5%82u.png`,
}

function SpiritualityHub() {
  return (
    <SpiritualityLayout fullBleed>
      {/* ── Mountain landscape backdrop (fixed, full-bleed, actual photo) ─────────── */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-[#0e2a35]"
        style={{
          backgroundImage: `url('${IMG.mountainBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Subtle darkening overlay so the card pops */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-black/10" />

      <div className="flex justify-center px-4 py-10 md:py-16">
        <article
          className="relative w-full max-w-2xl rounded-3xl text-slate-800 shadow-2xl shadow-black/40 overflow-hidden ring-1 ring-white/40"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(246,244,234,0.92) 0%, rgba(232,240,228,0.92) 35%, rgba(223,238,240,0.92) 70%, rgba(220,225,238,0.92) 100%), url('${IMG.cardGradient}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
          }}
        >
          {/* ── Profile header (centred portrait + name + handle + YouTube icon) ───── */}
          <header className="px-8 pt-12 pb-6 text-center">
            <img
              src={IMG.profile}
              alt="Kamil Jan"
              className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white/80 shadow-lg select-none"
              loading="eager"
            />
            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Kamil Jan</h2>
            <p className="mt-1 text-sm text-slate-600">@myspiritway</p>

            <a
              href="https://www.youtube.com/@myspiritway"
              target="_blank"
              rel="noreferrer"
              className="mx-auto mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-white shadow-md hover:bg-teal-600 transition-colors"
              aria-label="YouTube channel @myspiritway"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23.498 6.186a2.999 2.999 0 0 0-2.111-2.122C19.503 3.5 12 3.5 12 3.5s-7.503 0-9.387.564A2.999 2.999 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.999 2.999 0 0 0 2.111 2.122C4.497 20.5 12 20.5 12 20.5s7.503 0 9.387-.564a2.999 2.999 0 0 0 2.111-2.122C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
              </svg>
            </a>
          </header>

          {/* ── Welcome ─────────────────────────────────────────────────────────────── */}
          <div className="px-8 pt-2 pb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Hello and Welcome! <span aria-hidden>🙏</span>
            </h1>
            <p className="mt-3 text-base md:text-lg text-slate-700">
              It&apos;s Kamil Jan – Spiritual Business Architect &amp; Entrepreneur
            </p>
          </div>

          {/* ── "I can help you" ────────────────────────────────────────────────────── */}
          <div className="px-8 pb-6">
            <h3 className="font-semibold text-slate-900 mb-3">I can help you:</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2"><span aria-hidden>👉</span><span>Attract clients who align with your values and work.</span></li>
              <li className="flex gap-2"><span aria-hidden>👉</span><span>Turn your spiritual calling into dependable, honest monthly income.</span></li>
              <li className="flex gap-2"><span aria-hidden>👉</span><span>Build ethical, effective systems and processes that are clean and feel authentic.</span></li>
            </ul>
            <p className="mt-5 text-slate-700">
              I also support people in accelerating their evolution of consciousness through practical core spiritual teachings.
            </p>
          </div>

          {/* ── Spiritual Marketing ─────────────────────────────────────────────────── */}
          <section className="px-6 md:px-8 pt-2 pb-2">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Spiritual Marketing</h3>
            <div className="space-y-3">

              {/* Card 1 — FREE Clarity Call */}
              <Link
                to="/spirituality/clarity"
                className="group flex items-stretch rounded-2xl bg-[#0f3a44] text-white shadow-lg overflow-hidden hover:bg-[#13434f] transition-colors min-h-[140px]"
              >
                <div className="w-1/3 bg-[#0a2a30] overflow-hidden shrink-0">
                  <img
                    src={IMG.clarityCall}
                    alt="Clarity Call"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex items-center justify-center px-6 py-6 text-center">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] font-bold" style={{ color: '#fbbf24' }}>FREE</div>
                    <div className="mt-1 text-xl font-bold text-white">Clarity Call</div>
                  </div>
                </div>
              </Link>

              {/* Card 2 — Marketing Services */}
              <Link
                to="/spirituality/spiritual-marketing"
                className="group flex items-stretch rounded-2xl bg-[#0f3a44] text-white shadow-lg overflow-hidden hover:bg-[#13434f] transition-colors min-h-[140px]"
              >
                <div className="w-1/3 bg-[#0a2a30] overflow-hidden shrink-0">
                  <img
                    src={IMG.marketingServices}
                    alt="Marketing Services"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex items-center justify-center px-6 py-6 text-center">
                  <div className="text-xl font-bold text-white">Marketing Services</div>
                </div>
              </Link>

              {/* Card 3 — YouTube Playlist (external) */}
              <a
                href="https://www.youtube.com/playlist?list=PLLLDxDP58sn-SndDWhiFe3iuotoiDnMrI"
                target="_blank"
                rel="noreferrer"
                className="group flex items-stretch rounded-2xl bg-[#0f3a44] text-white shadow-lg overflow-hidden hover:bg-[#13434f] transition-colors min-h-[140px]"
              >
                <div className="w-1/3 bg-[#0a2a30] overflow-hidden shrink-0">
                  <img
                    src={IMG.youtubePlaylist}
                    alt="YouTube Playlist"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex items-center justify-center px-6 py-6 text-center">
                  <div className="text-xl font-bold text-white">YouTube Playlist</div>
                </div>
              </a>
            </div>

            {/* Articles & Free Resources — pastel pill below the marketing tiles */}
            <Link
              to="/spirituality/marketing-training"
              className="mt-3 flex items-center justify-center rounded-2xl bg-white/55 hover:bg-white/75 px-4 py-4 text-center font-medium text-slate-800 transition-colors"
            >
              Articles &amp; Free Resources →
            </Link>
          </section>

          {/* ── Practical Spirituality ─────────────────────────────────────────────── */}
          <section className="px-6 md:px-8 pt-8 pb-2">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Practical Spirituality</h3>

            <Link
              to="/spirituality/sps"
              className="group flex items-stretch rounded-2xl bg-[#0f3a44] text-white shadow-lg overflow-hidden hover:bg-[#13434f] transition-colors min-h-[160px]"
            >
              <div className="w-1/3 bg-[#0a1e30] overflow-hidden shrink-0">
                <img
                  src={IMG.spsBookCover}
                  alt="The Simplified Practical Spirituality Guide Book cover — dark blue with galaxy, by Kamil Jan"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 flex items-center justify-center px-6 py-6 text-center">
                <div className="text-lg md:text-xl font-bold leading-snug text-white">
                  The Simplified<br />Practical Spirituality<br />Guide Book
                </div>
              </div>
            </Link>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Link to="/spirituality/sps2" className="rounded-xl bg-white/55 hover:bg-white/75 px-4 py-3 text-center font-medium text-slate-800 transition-colors">Short Version →</Link>
              <Link to="/spirituality/dmt" className="rounded-xl bg-white/55 hover:bg-white/75 px-4 py-3 text-center font-medium text-slate-800 transition-colors">DMT Practice →</Link>
              <Link to="/spirituality/iyss" className="rounded-xl bg-white/55 hover:bg-white/75 px-4 py-3 text-center font-medium text-slate-800 transition-colors">Integrate Shattered Self →</Link>
              <Link to="/spirituality/about" className="rounded-xl bg-white/55 hover:bg-white/75 px-4 py-3 text-center font-medium text-slate-800 transition-colors">About Kamil Jan →</Link>
            </div>
          </section>

          {/* ── Contact Me ─────────────────────────────────────────────────────────── */}
          <section className="px-6 md:px-8 pt-8">
            <Link
              to="/spirituality/contact"
              className="block rounded-2xl bg-[#1d4f9c] hover:bg-[#1d4f9c]/90 text-white text-center py-5 text-xl font-bold shadow-lg transition-colors"
            >
              Contact Me
            </Link>
          </section>

          {/* ── Footer ─────────────────────────────────────────────────────────────── */}
          <footer className="px-8 pt-8 pb-6 text-center text-xs text-slate-500">
            <Link to="/spirituality/support" className="underline underline-offset-2 hover:text-slate-700">Support the mission</Link>
            <span className="mx-2">·</span>
            <a href="/privacy" className="underline underline-offset-2 hover:text-slate-700">Privacy Policy</a>
          </footer>
        </article>
      </div>
    </SpiritualityLayout>
  )
}
