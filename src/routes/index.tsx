import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import Hero3D from '../components/Hero3D'
import ChatBot from '../components/ChatBot'
import { T, type Lang } from '../i18n'

/* ── Flags ── */
function FlagPL() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15" className="flag-svg" aria-hidden="true">
      <rect width="22" height="15" rx="2.5" fill="#fff" />
      <path d="M0 7.5h22V12.5a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 0 12.5V7.5Z" fill="#dc143c" />
    </svg>
  )
}
function FlagGB() {
  return (
    <svg width="22" height="15" viewBox="0 0 60 30" className="flag-svg" aria-hidden="true">
      <clipPath id="gb-r"><rect width="60" height="30" rx="5" /></clipPath>
      <g clipPath="url(#gb-r)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  )
}

/* ── Rotating colored hero word ── */
const HERO_ROT: Record<Lang, string[]> = {
  en: ['themselves.', 'on autopilot.', 'without you.', '24/7.', 'while you sleep.'],
  pl: ['same.', 'na autopilocie.', 'bez ciebie.', '24/7.', 'gdy śpisz.'],
}
function RotatingWord({ lang }: { lang: Lang }) {
  const words = HERO_ROT[lang]
  const [i, setI] = useState(0)
  useEffect(() => {
    setI(0)
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI(p => (p + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps
  return <em className="hero-rot"><span key={i} className="hero-rot-in">{words[i]}</span></em>
}

/* ── Count-up stat ── */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    // start straight from page load — hero stats are above the fold, no scroll gating
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value)
      return
    }
    const dur = 1600; let t0: number | null = null; let raf = 0
    const step = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / dur, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value))
      if (p < 1) raf = requestAnimationFrame(step); else setCount(value)
    }
    // small delay so the count rises in sync with the hero stats fading in
    const timer = window.setTimeout(() => { raf = requestAnimationFrame(step) }, 750)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [value])
  return (
    <div>
      <div className="hero-stat-val">{count}<span>{suffix}</span></div>
      <div className="hero-stat-lbl">{label}</div>
    </div>
  )
}

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
  'React', 'Next.js', 'TypeScript', 'TanStack', 'Supabase',
  'Cloudflare Workers', 'Vercel', 'Python', 'n8n', 'MCP',
  'RAG', 'Pinecone', 'OpenAI', 'RetellAI', 'Twilio',
  'fal.ai', 'Playwright', 'Meta Ads', 'Google Ads',
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
  { num: '01', logo: '/logos/masgroup.webp', name: 'MAS Group', tags: ['Operations', 'B2B'], year: '2021–now', href: 'https://www.masgroup.is' as string | null },
  { num: '02', logo: '/logos/flyt.webp', name: 'Flyt', tags: ['Marketplace', 'SaaS'], year: '2023', href: 'https://flyt.is' as string | null },
  { num: '03', logo: '/logos/quickfix.webp', name: 'QuickFix', tags: ['Brand', 'Growth'], year: '2022', href: 'https://quickfix.is' as string | null },
  { num: '04', logo: '/logos/sleipnir.webp', name: 'Sleipnir Glacier Tours', tags: ['Tourism', 'Operations'], year: '2022–2024', href: 'https://sleipnirtours.is' as string | null },
  { num: '05', logo: '/logos/reykjawwwik.svg', name: 'Reykjawwwik', tags: ['Agency', 'Product'], year: '2023', href: 'https://reykjawwwik.is' as string | null },
  { num: '06', logo: '/logos/ekomoc.webp', name: 'Ekomoc CRM', tags: ['SaaS', 'CRM'], year: '2024', href: null as string | null },
]

const CAP_NUMS = ['01', '02', '03', '04']

const ENGAGE_META = [
  { href: '#contact', featured: true },
  { href: '#contact', featured: false },
  { href: '#contact', featured: false },
  { href: 'mailto:hello@kamiljan.com', featured: false },
]

function HomePage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en'
    const url = new URLSearchParams(window.location.search).get('lang') as Lang
    if (url === 'en' || url === 'pl') return url
    const saved = localStorage.getItem('kj-lang') as Lang
    if (saved === 'en' || saved === 'pl') return saved
    return navigator.language.startsWith('pl') ? 'pl' : 'en'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [openCap, setOpenCap] = useState<number | null>(0)
  const [openEngage, setOpenEngage] = useState<number | null>(0)
  const btnRef = useRef<HTMLAnchorElement>(null)

  const toggleLang = () => {
    setLang(l => {
      const next: Lang = l === 'en' ? 'pl' : 'en'
      if (typeof window !== 'undefined') localStorage.setItem('kj-lang', next)
      return next
    })
  }

  // keep ?lang= in the URL in sync, so a shared link opens in the chosen language
  useEffect(() => {
    if (typeof window === 'undefined') return
    const u = new URL(window.location.href)
    if (u.searchParams.get('lang') !== lang) {
      u.searchParams.set('lang', lang)
      window.history.replaceState({}, '', u)
    }
  }, [lang])

  const onBtnMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const b = btnRef.current; if (!b) return
    const r = b.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.3
    const y = (e.clientY - r.top - r.height / 2) * 0.3
    b.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`
  }
  const onBtnLeave = () => { if (btnRef.current) btnRef.current.style.transform = '' }

  const t = T[lang]

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.work-row, .cap-card, .engage-card')
    const labels = document.querySelectorAll<HTMLElement>('.section-label')
    const heads = document.querySelectorAll<HTMLElement>('.contact-h2')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          if (el.matches('.section-label')) el.classList.add('label-in')
          else if (el.matches('.contact-h2')) el.classList.add('h2-in')
          else {
            const idx = Array.from(el.parentElement?.children ?? []).indexOf(el)
            el.style.transitionDelay = `${idx * 0.06}s`
            el.classList.add('visible')
          }
          observer.unobserve(el)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' })
    ;[...cards, ...labels, ...heads].forEach((el) => observer.observe(el))
    // safety net — never leave anything stuck hidden if the observer misses
    const safety = setTimeout(() => {
      cards.forEach((el) => el.classList.add('visible'))
      labels.forEach((el) => el.classList.add('label-in'))
      heads.forEach((el) => el.classList.add('h2-in'))
    }, 1400)
    return () => { observer.disconnect(); clearTimeout(safety) }
  }, [])

  // cursor-follow glow on capability/engage cards (desktop only, one passive listener)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest('.cap-card, .engage-card') as HTMLElement | null
      const glow = card?.querySelector<HTMLElement>('.card-glow')
      if (!card || !glow) return
      const r = card.getBoundingClientRect()
      glow.style.setProperty('--mx', `${e.clientX - r.left}px`)
      glow.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div>
      <ScrollProg />
      <Cursor />

      {/* ── Mobile menu overlay ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
        <a href="#work">{t.nav.work}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="#capabilities">{t.nav.capabilities}</a>
        <a href="#engage">{t.nav.engage}</a>
        <a href="/case-studies">Case studies</a>
        <a href="/cv">CV</a>
        <div className="mobile-menu-divider" />
        <a href="#contact" className="mobile-menu-cta">{t.nav.cta}</a>
      </div>

      {/* ── Nav ── */}
      <nav className="nav">
        <a href="/" className="nav-sig-wrap" aria-label="Kamil Jan">
          <img src="/signature.webp" alt="Kamil Jan" className="nav-sig" />
        </a>
        <ul className="nav-links">
          <li><a href="#work">{t.nav.work}</a></li>
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#capabilities">{t.nav.capabilities}</a></li>
          <li><a href="#engage">{t.nav.engage}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
          <li><a href="/case-studies">Case studies</a></li>
          <li><a href="/cv">CV</a></li>
        </ul>
        <div className="nav-right">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
            {lang === 'en' ? <FlagGB /> : <FlagPL />}
          </button>
          <div className="nav-avail"><span className="avail-dot" />{t.nav.available}</div>
          <a href="#contact" className="nav-cta">{t.nav.cta}</a>
          <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-canvas-wrap"><Hero3D /></div>
        <div className="aurora" aria-hidden="true" />
        <div className="hero-fade-top" />
        <div className="hero-fade-bottom" />
        <div className="hero-content">
          <p className="hero-eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero-h1">
            <span className="line-mask"><span className="line-in">{t.hero.h1a}</span></span>
            <span className="line-mask"><span className="line-in">{t.hero.h1b}</span></span>
            <span className="line-mask"><span className="line-in"><RotatingWord lang={lang} /></span></span>
          </h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-actions">
            <a ref={btnRef} href="#engage" className="btn-primary" onMouseMove={onBtnMove} onMouseLeave={onBtnLeave}>
              {t.hero.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#work" className="btn-ghost">{t.hero.ctaGhost}</a>
          </div>
          <div className="hero-stats">
            <StatCounter value={6} suffix="+" label={t.stats[0]} />
            <StatCounter value={14} suffix="yr" label={t.about.meta[0]} />
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
                {t.about.p2a}<strong>{t.about.p2b}</strong>{t.about.p2c}<strong>{t.about.p2d}</strong>{t.about.p2e}
              </p>
            </div>
            <div className="about-photo-wrap">
              <div className="about-photo">
                <img src="/kamil-suit.webp" alt="Kamil Jan" loading="lazy" decoding="async" width="675" height="900" />
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
                    <img src={p.logo} alt={p.name} loading="lazy" decoding="async" width="36" height="36" />
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
                  <a key={p.num} href={p.href} target="_blank" rel="noreferrer" className="work-row work-row-link">
                    {inner}
                  </a>
                )
              }
              return <div key={p.num} className="work-row">{inner}</div>
            })}
          </div>
          <div className="work-swipe-hint">{lang === 'pl' ? 'Przesuń' : 'Swipe'} →</div>
          <div style={{ marginTop: 22, textAlign: 'center' }}>
            <a href="/case-studies" className="btn-ghost">
              {lang === 'pl' ? 'Czytaj pełne case studies' : 'Read the full case studies'} →
            </a>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="cap" id="capabilities">
        <div className="container">
          <span className="section-label">{t.capabilities.label}</span>
          <div className="cap-grid">
            {t.caps.map((c, i) => (
              <div key={i} className={`cap-card${openCap === i ? ' expanded' : ''}`}>
                <div className="card-glow" aria-hidden="true" />
                <button className="cap-head" onClick={() => setOpenCap(openCap === i ? null : i)} aria-expanded={openCap === i}>
                  <div className="cap-num">{CAP_NUMS[i]}</div>
                  <div className="cap-title">{c.title}</div>
                  <svg className="cap-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="cap-body">
                  <div className="cap-body-inner">
                    <div className="cap-desc">{c.desc}</div>
                    <div className="cap-tags">{c.tags.map((tag) => <span key={tag} className="cap-tag">{tag}</span>)}</div>
                  </div>
                </div>
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
                <div key={i} className={`engage-card${meta.featured ? ' featured' : ''}${openEngage === i ? ' expanded' : ''}`}>
                  <div className="card-glow" aria-hidden="true" />
                  <button className="engage-head" onClick={() => setOpenEngage(openEngage === i ? null : i)} aria-expanded={openEngage === i}>
                    <div>
                      <div className="engage-mode">{e?.mode}</div>
                      <div className="engage-title">{e?.title}</div>
                    </div>
                    <svg className="engage-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="engage-body">
                    <div className="engage-body-inner">
                      <div className="engage-desc">{e?.desc}</div>
                      <div className="engage-detail">{e?.detail}</div>
                      <a href={meta.href} className="engage-cta">
                        {e?.cta}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="contact" id="contact">
        <img src="/kamil-cutout.webp" alt="" className="contact-photo" aria-hidden="true" loading="lazy" decoding="async" width="853" height="1100" />
        <div className="container">
          <div className="contact-inner">
            <h2 className="contact-h2"><span className="line-mask"><span className="line-in">{t.contact.h2}</span></span></h2>
            <p className="contact-sub">{t.contact.sub}</p>
            <a href="mailto:hello@kamiljan.com" className="contact-email">
              hello@kamiljan.com
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="contact-alts">
              {t.contact.findMe}
              <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">LinkedIn</a>
              &middot;
              <a href="/cv">CV</a>
            </div>
            <div className="contact-sig">
              <img src="/signature.webp" alt="Kamil Jan signature" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* ── AI assistant (chat) ── */}
      <ChatBot lang={lang} />

      {/* ── Footer ── */}
      <footer className="footer">
        <img src="/signature.webp" alt="Kamil Jan" className="footer-sig" loading="lazy" decoding="async" />
        <div className="footer-copy">&copy; {new Date().getFullYear()} Kamil Jan &mdash; kamiljan.com</div>
        <div className="footer-links">
          <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  )
}
