import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

const NAV_LINKS = [
  { to: '/spirituality', label: 'Home' },
  { to: '/spirituality/sps', label: 'The Book (Full)' },
  { to: '/spirituality/sps2', label: 'Short Version' },
  { to: '/spirituality/dmt', label: 'DMT' },
  { to: '/spirituality/iyss', label: 'IYSS' },
  { to: '/spirituality/about', label: 'About' },
  { to: '/spirituality/support', label: 'Support' },
  { to: '/spirituality/contact', label: 'Contact' },
]

interface Props {
  children: ReactNode
  title?: string
  eyebrow?: string
}

export default function SpiritualityLayout({ children, title, eyebrow }: Props) {
  return (
    <div className="min-h-screen bg-[#06090a] text-white">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#06090a]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors">
            ← Kamil Jan
          </Link>
          <div className="hidden md:flex items-center gap-1 text-xs">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-all"
                activeProps={{ className: 'px-3 py-2 rounded-md text-white bg-white/10' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Header */}
      {(title || eyebrow) && (
        <header className="border-b border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            {eyebrow && (
              <p className="text-xs uppercase tracking-widest text-cyan-400/80 mb-4">{eyebrow}</p>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {title}
              </h1>
            )}
          </div>
        </header>
      )}

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold mb-1">MySpiritWay — Practical Spirituality</p>
              <p className="text-xs text-white/50">
                A teaching of Kamil Jan · Now lives at{' '}
                <Link to="/" className="underline hover:text-white">kamiljan.com</Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-white/50">
              <a href="https://youtube.com/@myspiritway" target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
              <a href="https://www.instagram.com/myspiritway" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
              <a href="https://www.tiktok.com/@myspiritway" target="_blank" rel="noreferrer" className="hover:text-white">TikTok</a>
              <a href="https://www.facebook.com/MySpiritWay" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
              <a href="mailto:hello@kamiljan.com" className="hover:text-white">hello@kamiljan.com</a>
            </div>
          </div>
          <p className="mt-8 text-[10px] text-white/30 tracking-wider">
            © {new Date().getFullYear()} Kamil Jan · This work is offered on the Fair Exchange Model.
          </p>
        </div>
      </footer>
    </div>
  )
}
