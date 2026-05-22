import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

const NAV_LINKS = [
  { to: '/spirituality', label: 'Home', exact: true },
  { to: '/spirituality/sps', label: 'The Book' },
  { to: '/spirituality/sps2', label: 'Short' },
  { to: '/spirituality/dmt', label: 'DMT' },
  { to: '/spirituality/iyss', label: 'IYSS' },
  { to: '/spirituality/clarity', label: 'Clarity Call' },
  { to: '/spirituality/blog', label: 'Blog' },
  { to: '/spirituality/about', label: 'About' },
  { to: '/spirituality/support', label: 'Support' },
  { to: '/spirituality/contact', label: 'Contact' },
]

interface Props {
  children: ReactNode
  title?: string
  eyebrow?: string
  /** When true, skips the inner max-w-3xl container so the route owns full-bleed layout. */
  fullBleed?: boolean
}

export default function SpiritualityLayout({ children, title, eyebrow, fullBleed = false }: Props) {
  return (
    <div className="relative min-h-screen text-white">
      {/* Default dark bg — routes can override via portal-style fixed background. */}
      {!fullBleed && <div aria-hidden className="fixed inset-0 -z-20 bg-[#06090a]" />}

      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#06090a]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors shrink-0">
            <span className="text-amber-300/80 group-hover:text-amber-200">←</span>
            <span>Kamil Jan</span>
            <span className="hidden sm:inline text-white/30">/</span>
            <span className="hidden sm:inline text-amber-200/90">spirituality</span>
          </Link>
          <div className="hidden lg:flex items-center gap-0.5 text-xs flex-wrap justify-end">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-2.5 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
                activeProps={{ className: 'px-2.5 py-2 rounded-md text-amber-200 bg-amber-300/15 whitespace-nowrap' }}
                activeOptions={{ exact: !!l.exact }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/spirituality/clarity"
            className="hidden md:inline-flex rounded-md border border-amber-300/40 bg-amber-300/15 px-4 py-2 text-xs font-medium text-amber-100 hover:bg-amber-300/25 transition-all whitespace-nowrap"
          >
            Book a Clarity Call
          </Link>
        </div>
      </nav>

      {/* Header (only shown when title/eyebrow provided AND not full-bleed) */}
      {!fullBleed && (title || eyebrow) && (
        <header className="relative overflow-hidden border-b border-white/10 bg-[#06090a]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-amber-400/[0.06] blur-[140px]" />
          </div>
          <div className="relative mx-auto max-w-3xl px-6 py-16 md:py-24">
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80 mb-5">{eyebrow}</p>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-white">
                {title}
              </h1>
            )}
          </div>
        </header>
      )}

      {/* Main content */}
      {fullBleed ? (
        <main className="relative">{children}</main>
      ) : (
        <main className="mx-auto max-w-3xl px-6 py-12 bg-[#06090a]">{children}</main>
      )}

      {/* Footer (only on non-fullBleed pages — fullBleed pages provide their own) */}
      {!fullBleed && (
        <footer className="mt-24 border-t border-white/10 bg-gradient-to-b from-[#06090a] to-[#06090a]/95">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-base font-semibold text-white mb-1">MySpiritWay — Practical Spirituality</p>
                <p className="text-xs text-white/50">
                  A teaching of Kamil Jan · Now lives at{' '}
                  <Link to="/" className="text-amber-200 hover:text-amber-100 underline underline-offset-2">kamiljan.com</Link>
                </p>
                <p className="mt-3 text-[11px] text-white/40 italic max-w-md">
                  This work is offered on the Fair Exchange Model — give what feels right, share what helps.
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-3 text-xs">
                <div className="flex flex-wrap gap-4 text-white/50">
                  <a href="https://youtube.com/@myspiritway" target="_blank" rel="noreferrer" className="hover:text-amber-200 transition-colors">YouTube</a>
                  <a href="https://www.instagram.com/myspiritway" target="_blank" rel="noreferrer" className="hover:text-amber-200 transition-colors">Instagram</a>
                  <a href="https://www.tiktok.com/@myspiritway" target="_blank" rel="noreferrer" className="hover:text-amber-200 transition-colors">TikTok</a>
                  <a href="https://www.facebook.com/MySpiritWay" target="_blank" rel="noreferrer" className="hover:text-amber-200 transition-colors">Facebook</a>
                </div>
                <a href="mailto:hello@kamiljan.com" className="text-amber-200 hover:text-amber-100 font-medium">hello@kamiljan.com</a>
              </div>
            </div>
            <p className="mt-10 text-[10px] text-white/30 tracking-wider">
              © {new Date().getFullYear()} Kamil Jan · All work shared from the heart.
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}
