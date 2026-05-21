import { createFileRoute, Link } from '@tanstack/react-router'
import SpiritualityLayout from '../components/SpiritualityLayout'

export const Route = createFileRoute('/spirituality/')({ component: SpiritualityHub })

const CARDS = [
  { to: '/spirituality/sps', title: 'The Simplified Practical Spirituality', desc: 'The complete book — 12 years of practical wisdom synthesised. ~90 A4 pages.', tag: 'Book · Full' },
  { to: '/spirituality/sps2', title: 'Short Version (SPS²)', desc: 'Distilled summary of the full book. ~66 minute read.', tag: 'Book · Summary' },
  { to: '/spirituality/dmt', title: 'Dynamic Meditation Technique', desc: 'A powerful breath-based practice rooted in the 8 Limbs of Yoga.', tag: 'Activation Session' },
  { to: '/spirituality/iyss', title: 'Integrate Your Shattered Self', desc: 'Shadow work and trauma integration — 21 day practice.', tag: 'Activation Session' },
  { to: '/spirituality/about', title: 'About Kamil Jan', desc: 'The story behind MySpiritWay and 12 years of inner work.', tag: 'About' },
  { to: '/spirituality/support', title: 'Support the Mission', desc: 'Fair Exchange Model — give what feels right.', tag: 'Support' },
  { to: '/spirituality/contact', title: 'Contact', desc: 'Get in touch — hello@kamiljan.com', tag: 'Contact' },
] as const

function SpiritualityHub() {
  return (
    <SpiritualityLayout eyebrow="Practical Spirituality" title="A path that fits modern life.">
      <p className="text-lg text-white/80 mb-12 leading-relaxed">Everything you need to know about practical spirituality and the evolution of consciousness — distilled from 12 years of exploring spiritual, religious, and philosophical traditions. Now living on kamiljan.com.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {CARDS.map((c) => (
          <Link key={c.to} to={c.to} className="group block rounded-lg border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all">
            <div className="text-[10px] uppercase tracking-widest text-cyan-400/80 mb-3">{c.tag}</div>
            <div className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-100">{c.title}</div>
            <p className="text-sm text-white/60 leading-relaxed">{c.desc}</p>
            <div className="mt-4 text-xs text-white/40 group-hover:text-white/70">Open →</div>
          </Link>
        ))}
      </div>
    </SpiritualityLayout>
  )
}
