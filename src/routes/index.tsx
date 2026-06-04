import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import Hero3D from '../components/Hero3D'
import { T, type Lang } from '../i18n'

export const Route = createFileRoute('/')({ component: HomePage })

/* ── Scroll progress ── */
function ScrollProg() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div ref={barRef} className="scroll-prog" />
}

/* ── Custom cursor — SVG arrow pointer ── */
function Cursor() {
  const ptrRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ptrRef.current) {
        ptrRef.current.style.left = `${e.clientX}px`
        ptrRef.current.style.top = `${e.clientY}px`
      }
    }
    const hover = () => ptrRef.current?.classList.add('hovering')
    const unhover = () => ptrRef.current?.classList.remove('hovering')
    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', hover)
      el.addEventListener('mouseleave', unhover)
    })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <div ref={ptrRef} className="cursor-ptr">
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.5 1.5L1.5 19L6 14.5L9 22L11.5 21L8.5 13.5H15L1.5 1.5Z"
          fill="#22d3ee"
        />
      </svg>
    </div>
  )
}

/* ── Marquee strip ── */
const STACK = [
  'React', 'TypeScript', 'Lovable', 'Vercel', 'Supabase',
  'Cloudflare Workers', 'n8n', 'RetellAI', 'Meta Ads', 'Google Ads',
  'fal.ai', 'OpenAI', 'Twilio', 'Playwright',
]

function Marquee() {
  const items = [...STACK, ...STACK]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((s, i) => (
          <span key={i} className="marquee-item">
            {s}<span className="marquee-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Static structural data ── */
const PROJECT_META = [
  { num: '01', logo: '/logos/masgroup.png', name: 'MAS Group', tags: ['Operations', 'B2B'], year: '2021–now', href: null as string | null },
  { num: '02', logo: '/logos/flyt.png', name: 'Flyt', tags: ['Marketplace', 'SaaS'], year: '2023', href: null as string | null },
  { num: '03', logo: '/logos/quickfix.png', name: 'QuickFix', tags: ['Brand', 'Growth'], year: '2022', href: null as string | null },
  { num: '04', logo: '/logos/sleipnir.png', name: 'Sleipnir Glacier Tours', tags: ['Tourism', 'Operations'], year: '2019–2022', href: null as string | null },
  { num: '05', logo: '/logos/reykjawwwik.svg', name: 'Reykjawwwik', tags: ['Agency', 'Product'], year: '2023', href: null as string | null },
  { num: '06', logo: '/logos/ekomoc.png', name: 'Ekomoc CRM', tags: ['SaaS', 'CRM'], year: '2024', href: null as string | null },
]

const CAP_NUMS = ['01', '02', '03', '04']

const ENGAGE_META = [
  { href: '#contact', featured: true },
  { href: '#contact', featured: false },
  { href: 'mailto:hello@kamiljan.com', featured: false },
]

function HomePage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en'
    const saved = localStorage.getItem('kj-lang') as Lang
    if (saved === 'en' || saved === 'pl') return saved
    return navigator.language.startsWith('pl') ? 'pl' : 'en'
  })

  const toggleLang = () => {
    setLang(l => {
      const next: Lang = l === 'en' ? 'pl' : 'en'
      if (typeof window !== 'undefined') localStorage.setItem('kj-lang', next)
      return next
    })
  }

  const t = T[lang]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const idx = Array.from(el.parentElement?.children ?? []).indexOf(el)
          el.style.transitionDelay = `${idx * 0.08}s`
          el.classList.add('visible')
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' })
    document.querySelectorAll('.work-row, .cap-card, .engage-card').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <ScrollProg />
      <Cursor />

      {/* ── Nav ── */}
      <nav className="nav">
        <a href="/" className="nav-sig-wrap" aria-label="Kamil Jan">
          <img src="/signature.png" alt="Kamil Jan" className="nav-sig" />
        </a>
        <ul className="nav-links">
          <li><a href="#work">{t.nav.work}</a></li>
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#capabilities">{t.nav.capabilities}</a></li>
          <li><a href="#engage">{t.nav.engage}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>
        <div className="nav-right">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
            {lang === 'en' ? '🇵🇱' : '🇬🇧'}
          </button>
          <div className="nav-avail"><span className="avail-dot" />{t.nav.available}</div>
          <a href="#contact" className="nav-cta">{t.nav.cta}</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-canvas-wrap"><Hero3D /></div>
        <div className="hero-fade-top" />
        <div className="hero-fade-bottom" />
        <div className="hero-content">
          <p className="hero-eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero-h1">
            {t.hero.h1a}<br />
            {t.hero.h1b} <em>{t.hero.h1em}</em>
          </h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-actions">
            <a href="#engage" className="btn-primary">
              {t.hero.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#work" className="btn-ghost">{t.hero.ctaGhost}</a>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-val">6<span>+</span></div><div className="hero-stat-lbl">{t.stats[0]}</div></div>
            <div><div className="hero-stat-val">14<span>yr</span></div><div className="hero-stat-lbl">{t.about.meta[0]}</div></div>
          </div>
        </div>
      </section>

      {/* ── Tech marquee ── */}
      <Marquee />

      {/* ── About ── */}
      <section className="about" id="about">
        <div className="container">
          <span className="section-label">{t.about.label}</span>
          <div className="about-grid">
            <div className="about-inner">
              <p className="about-p">
                {t.about.p1a}<strong>{t.about.p1b}</strong>{t.about.p1c}<strong>{t.about.p1d}</strong>{t.about.p1e}
              </p>
              <p className="about-p">
                {t.about.p2a}<strong>{t.about.p2b}</strong>{t.about.p2c}
              </p>
            </div>
            <div className="about-photo-wrap">
              <div className="about-photo">
                <img src="/kamil.png" alt="Kamil Jan" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work ── */}
      <section className="work" id="work">
        <div className="container">
          <span className="section-label">{t.work.label}</span>
          <div className="work-table">
            {PROJECT_META.map((p, i) => {
              const outcome = t.projects[i]?.outcome ?? ''
              const inner = (
                <>
                  <div className="work-logo">
                    <img src={p.logo} alt={p.name} />
                  </div>
                  <div>
                    <div className="work-name">{p.name}</div>
                    <div className="work-outcome">{outcome}</div>
                  </div>
                  <div className="work-tags">
                    {p.tags.map((tag) => <span key={tag} className="work-tag">{tag}</span>)}
                  </div>
                  <div className="work-year">{p.year}</div>
                  <svg className="work-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )
              if (p.href) {
                return (
                  <Link key={p.num} to={p.href} className="work-row work-row-link">
                    {inner}
                  </Link>
                )
              }
              return <div key={p.num} className="work-row">{inner}</div>
            })}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="cap" id="capabilities">
        <div className="container">
          <span className="section-label">{t.capabilities.label}</span>
          <div className="cap-grid">
            {t.caps.map((c, i) => (
              <div key={i} className="cap-card">
                <div className="cap-num">{CAP_NUMS[i]}</div>
                <div className="cap-title">{c.title}</div>
                <div className="cap-desc">{c.desc}</div>
                <div className="cap-tags">{c.tags.map((tag) => <span key={tag} className="cap-tag">{tag}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engage ── */}
      <section className="engage" id="engage">
        <div className="container">
          <span className="section-label">{t.engage.label}</span>
          <div className="engage-grid">
            {ENGAGE_META.map((meta, i) => {
              const e = t.engageModes[i]
              return (
                <div key={i} className={`engage-card${meta.featured ? ' featured' : ''}`}>
                  <div className="engage-mode">{e?.mode}</div>
                  <div className="engage-title">{e?.title}</div>
                  <div className="engage-desc">{e?.desc}</div>
                  <div className="engage-detail">{e?.detail}</div>
                  <a href={meta.href} className="engage-cta">
                    {e?.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-inner">
            <h2 className="contact-h2">{t.contact.h2}</h2>
            <p className="contact-sub">{t.contact.sub}</p>
            <a href="mailto:hello@kamiljan.com" className="contact-email">
              hello@kamiljan.com
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="contact-alts">
              {t.contact.findMe}
              <a href="https://linkedin.com/in/myspiritway" target="_blank" rel="noreferrer">LinkedIn</a>
              &middot;
              <a href="https://youtube.com/@kamiljan11" target="_blank" rel="noreferrer">YouTube</a>
              &middot;
              <a href="https://github.com/mountainallservice" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <div className="contact-sig">
              <img src="/signature.png" alt="Kamil Jan signature" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <img src="/signature.png" alt="Kamil Jan" className="footer-sig" />
        <div className="footer-copy">&copy; {new Date().getFullYear()} Kamil Jan &mdash; kamiljan.com</div>
        <div className="footer-links">
          <a href="https://youtube.com/@kamiljan11" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://linkedin.com/in/myspiritway" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/mountainallservice" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
