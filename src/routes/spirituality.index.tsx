import { createFileRoute, Link } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/')({ component: SpiritualityHub })

/**
 * Mirrors the linktree-style landing currently live at myspiritway.org/ —
 * mountain backdrop, pastel centered card, profile + welcome, then three
 * sections: Spiritual Marketing, Practical Spirituality, Contact Me.
 */
function SpiritualityHub() {
  return (
    <SpiritualityLayout fullBleed>
      {/* Mountain backdrop */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 30%, rgba(180,210,220,0.20), transparent 55%),' +
            'linear-gradient(180deg, #0e2a35 0%, #1a3a44 35%, #2d5360 65%, #4a7a85 100%)',
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 15% 75%, rgba(255,255,255,0.10), transparent 35%),' +
            'radial-gradient(ellipse at 85% 80%, rgba(255,255,255,0.08), transparent 35%),' +
            'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.12), transparent 45%)',
        }}
      />

      <div className="flex justify-center px-4 py-10 md:py-16">
        <article className="w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#f6f4ea] via-[#e8f0e4] to-[#dfeef0] text-slate-800 shadow-2xl shadow-black/30 overflow-hidden">
          {/* ── Profile header ─────────────────────────────────────────────────────────── */}
          <header className="px-8 pt-12 pb-8 text-center bg-gradient-to-b from-white/40 to-transparent">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Kamil Jan</h2>
            <p className="mt-1 text-sm text-slate-600">@myspiritway</p>

            <a
              href="https://www.youtube.com/@myspiritway"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-white shadow-md hover:bg-teal-600 transition-colors"
              aria-label="YouTube channel @myspiritway"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23.498 6.186a2.999 2.999 0 0 0-2.111-2.122C19.503 3.5 12 3.5 12 3.5s-7.503 0-9.387.564A2.999 2.999 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.999 2.999 0 0 0 2.111 2.122C4.497 20.5 12 20.5 12 20.5s7.503 0 9.387-.564a2.999 2.999 0 0 0 2.111-2.122C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
              </svg>
            </a>
          </header>

          {/* ── Welcome ───────────────────────────────────────────────────────────────────── */}
          <div className="px-8 pt-2 pb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Hello and Welcome! <span aria-hidden>🙏</span>
            </h1>
            <p className="mt-3 text-base md:text-lg text-slate-700">
              It&apos;s Kamil Jan – Spiritual Business Architect &amp; Entrepreneur
            </p>
          </div>

          {/* ── "I can help you" ─────────────────────────────────────────────────────────── */}
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

          {/* ── Spiritual Marketing ─────────────────────────────────────────────────────────── */}
          <section className="px-6 md:px-8 pt-2 pb-2">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Spiritual Marketing</h3>
            <div className="space-y-3">
              <Link to="/spirituality/clarity" className="group flex items-stretch rounded-2xl bg-[#0f3a44] text-white shadow-lg overflow-hidden hover:bg-[#13434f] transition-colors">
                <div className="w-1/3 bg-[#1d4a55] flex items-center justify-center">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-amber-200/90"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </div>
                <div className="flex-1 px-6 py-6 text-center">
                  <div className="text-xs uppercase tracking-widest text-amber-200/90 font-semibold">FREE</div>
                  <div className="mt-1 text-xl font-bold">Clarity Call</div>
                </div>
              </Link>
              <Link to="/spirituality/spiritual-marketing" className="group flex items-stretch rounded-2xl bg-[#0f3a44] text-white shadow-lg overflow-hidden hover:bg-[#13434f] transition-colors">
                <div className="w-1/3 bg-[#1d4a55] flex items-center justify-center">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-amber-200/90"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
                </div>
                <div className="flex-1 px-6 py-6 text-center">
                  <div className="text-xl font-bold">Marketing Services</div>
                </div>
              </Link>
              <a href="https://www.youtube.com/playlist?list=PLLLDxDP58sn-SndDWhiFe3iuotoiDnMrI" target="_blank" rel="noreferrer" className="group flex items-stretch rounded-2xl bg-[#0f3a44] text-white shadow-lg overflow-hidden hover:bg-[#13434f] transition-colors">
                <div className="w-1/3 bg-[#1d4a55] flex items-center justify-center">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor" className="text-amber-200/90"><path d="M23.498 6.186a2.999 2.999 0 0 0-2.111-2.122C19.503 3.5 12 3.5 12 3.5s-7.503 0-9.387.564A2.999 2.999 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.999 2.999 0 0 0 2.111 2.122C4.497 20.5 12 20.5 12 20.5s7.503 0 9.387-.564a2.999 2.999 0 0 0 2.111-2.122C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" /></svg>
                </div>
                <div className="flex-1 px-6 py-6 text-center">
                  <div className="text-xl font-bold">YouTube Playlist</div>
                </div>
              </a>
              <Link to="/spirituality/marketing-training" className="block rounded-2xl bg-white/50 text-slate-800 hover:bg-white/70 px-6 py-3 text-center text-sm font-medium transition-colors">
                Articles &amp; Free Resources →
              </Link>
            </div>
          </section>

          {/* ── Practical Spirituality ─────────────────────────────────────────────────────────── */}
          <section className="px-6 md:px-8 pt-6 pb-2">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Practical Spirituality</h3>
            <Link to="/spirituality/sps" className="group flex items-stretch rounded-2xl bg-[#0f3a44] text-white shadow-lg overflow-hidden hover:bg-[#13434f] transition-colors">
              <div className="w-1/3 bg-gradient-to-br from-[#0a1e30] via-[#0f2840] to-[#1a3a55] flex items-center justify-center py-6 text-center">
                <div className="px-2">
                  <div className="text-[8px] tracking-[0.2em] text-amber-200/90">THE SIMPLIFIED</div>
                  <div className="text-[10px] tracking-[0.18em] font-bold text-amber-200">PRACTICAL</div>
                  <div className="text-[10px] tracking-[0.18em] font-bold text-amber-200 mb-1">SPIRITUALITY</div>
                  <div className="my-1 text-2xl text-amber-300/90" aria-hidden>🌀</div>
                  <div className="text-[7px] leading-tight text-amber-100/90">ACCELERATE EVOLUTION OF<br />CONSCIOUSNESS</div>
                  <div className="text-[7px] leading-tight text-amber-100/90 mt-0.5">REDUCE UNNECESSARY SUFFERING</div>
                  <div className="text-[7px] leading-tight text-amber-100/90">ACHIEVE LASTING LIFE HAPPINESS</div>
                  <div className="mt-2 text-[9px] font-bold text-white tracking-wider">KAMIL JAN</div>
                  <div className="text-[6px] text-amber-200/70 mt-0.5">FROM THE CREATOR OF MySpiritWay</div>
                </div>
              </div>
              <div className="flex-1 px-6 py-6 flex items-center justify-center text-center">
                <div className="text-lg md:text-xl font-bold leading-snug">
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

          {/* ── Contact Me ──────────────────────────────────────────────────────────────── */}
          <section className="px-6 md:px-8 pt-6">
            <Link to="/spirituality/contact" className="block rounded-2xl bg-[#1d4f9c] hover:bg-[#1d4f9c]/90 text-white text-center py-5 text-xl font-bold shadow-lg transition-colors">
              Contact Me
            </Link>
          </section>

          {/* ── Footer ───────────────────────────────────────────────────────────────────── */}
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
