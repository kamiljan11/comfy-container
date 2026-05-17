import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import Hero3D from '../components/Hero3D'

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

/* ── Custom cursor ── */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) { dotRef.current.style.left = `${mx}px`; dotRef.current.style.top = `${my}px` }
    }
    const tick = () => {
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11
      if (ringRef.current) { ringRef.current.style.left = `${rx}px`; ringRef.current.style.top = `${ry}px` }
      raf = requestAnimationFrame(tick)
    }
    const hover = () => ringRef.current?.classList.add('hovering')
    const unhover = () => ringRef.current?.classList.remove('hovering')
    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => { el.addEventListener('mouseenter', hover); el.addEventListener('mouseleave', unhover) })
    raf = requestAnimationFrame(tick)
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])
  return (<><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>)
}

/* ── Marquee strip ── */
const STACK = [
  'TypeScript', 'Cloudflare Workers', 'Three.js', 'TanStack Router',
  'RetellAI', 'n8n', 'fal.ai', 'Twilio', 'Supabase', 'Meta Ads', 'OpenAI', 'Playwright'
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

const PROJECTS = [
  {
    num: '01',
    logo: '/logos/masgroup.png',
    name: 'MAS Group',
    outcome: "Iceland's largest Polish-operated B2B group — auto parts, print, logistics, rental — running on dedicated teams.",
    tags: ['Operations', 'B2B'],
    year: '2021–now'
  },
  {
    num: '02',
    logo: '/logos/flyt.png',
    name: 'Flyt',
    outcome: "Iceland's first freight marketplace. Compare and book quotes from verified transport providers across sea, air, and road.",
    tags: ['Marketplace', 'SaaS'],
    year: '2023'
  },
  {
    num: '03',
    logo: '/logos/quickfix.png',
    name: 'QuickFix',
    outcome: 'Handyman brand deployed in 72h — brand system, Meta ads, and WhatsApp-first sales flow. 300+ jobs completed.',
    tags: ['Brand', 'Growth'],
    year: '2022'
  },
  {
    num: '04',
    logo: '/logos/reykjawwwik.png',
    name: 'Reykjawwwik',
    outcome: 'Productized web agency for Icelandic SMBs. Done-for-you websites, ads, and content — one monthly price, no surprises.',
    tags: ['Agency', 'Product'],
    year: '2023'
  },
  {
    num: '05',
    logo: '/logos/myspiritway.png',
    name: 'MySpiritWay',
    outcome: 'Educational platform — guidebook, 7-week framework, Skool community, and weekly YouTube content engine.',
    tags: ['Education', 'Content'],
    year: '2024'
  },
  {
    num: '06',
    logo: '/logos/ekomoc.png',
    name: 'Ekomoc CRM',
    outcome: 'Solar audit and sales CRM — job pipeline, role-based access, team notes, and audit photo uploads.',
    tags: ['SaaS', 'CRM'],
    year: '2024'
  },
]

const CAPABILITIES = [
  {
    num: '01',
    title: 'Systems Architecture',
    desc: 'From blank-page chaos to documented, delegatable operations. I design the SOPs, CRMs, ERPs, and team protocols that let businesses run without the founder in the room.',
    tags: ['Operations Design', 'Custom ERPs', 'SOPs & Delegation', 'Team Protocols']
  },
  {
    num: '02',
    title: 'Growth & Distribution',
    desc: 'Performance media and full-funnel systems. Meta, Google, email sequences, landing pages, and conversion tracking — built to compound and outlast any single campaign.',
    tags: ['Meta & Google Ads', 'Funnel Architecture', 'Email Sequences', 'Conversion Tracking']
  },
  {
    num: '03',
    title: 'AI Automation',
    desc: 'LLM workflows, voice agents, MCP servers, and custom AI tools that run in production — not just demos. I build, deploy, and document everything so your team can maintain it.',
    tags: ['LLM Workflows', 'Voice Agents', 'MCP Servers', 'Custom AI Tools']
  },
]

const TIMELINE = [
  { year: '2024 – Present', role: 'AI Automation Architect', company: 'MAS Group / Independent', desc: 'Building LLM-powered workflows, RetellAI voice agents, and MCP servers. Deployed AI tooling across freight, auto parts, and service businesses.' },
  { year: '2023 – Present', role: 'Founder & Product Lead', company: 'Flyt — Freight Marketplace', desc: "Designed and launched Iceland's first freight comparison platform. Led product, operations, and commercial partnerships from zero to live users." },
  { year: '2022 – Present', role: 'Founder', company: 'Reykjawwwik Digital Agency', desc: 'Productized web agency for Icelandic SMBs. Built the service model, pricing structure, delivery workflow, and client acquisition system from scratch.' },
  { year: '2021 – Present', role: 'CEO & Operator', company: 'MAS Group Iceland', desc: 'Built a multi-vertical B2B group (auto parts, print, freight, rental) from zero. Recruited and managed dedicated department leads across 4 verticals.' },
  { year: '2019 – 2021', role: 'Growth & Operations', company: 'Startups — Poland & Iceland', desc: 'Led growth, ops, and market expansion across early-stage startups. Built playbooks for customer acquisition, team hiring, and scaling operations.' },
]

const ENGAGE = [
  {
    mode: 'Co-Founder',
    title: 'Build something together',
    desc: 'Equity-based. I come in at pre-revenue or early traction and work as a full operator — product, ops, growth, and team building. Not a consultant. A co-founder.',
    detail: 'Pre-revenue or early traction · Equity · Full commitment',
    href: '#contact',
    cta: "Let's talk",
    featured: true,
  },
  {
    mode: 'Advisory / Project',
    title: 'Defined scope, real output',
    desc: '30–90 day engagements with a specific deliverable. System builds, growth sprints, AI automation rollouts. I go deep, deliver, and document everything.',
    detail: '30–90 days · Defined deliverable · Fractional',
    href: '#contact',
    cta: 'Start a project',
    featured: false,
  },
  {
    mode: 'Hire',
    title: 'Head of Ops / Growth / AI',
    desc: "Remote-first. Most effective in companies where someone needs to own the operational and growth layer — or build the AI automation infrastructure from scratch.",
    detail: 'In-house or remote · Head of Ops / Growth / AI',
    href: 'mailto:hello@kamiljan.com',
    cta: 'Get in touch',
    featured: false,
  },
]

function HomePage() {
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
    document.querySelectorAll('.work-row, .cap-card, .tl-item, .engage-card').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <ScrollProg />
      <Cursor />

      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav-logo">K<span>J</span></div>
        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#capabilities">Capabilities</a></li>
          <li><a href="#timeline">Timeline</a></li>
          <li><a href="#engage">Engage</a></li>
        </ul>
        <div className="nav-right">
          <div className="nav-avail"><span className="avail-dot" />Available</div>
          <a href="#contact" className="nav-cta">Let&apos;s talk</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-canvas-wrap"><Hero3D /></div>
        <div className="hero-fade-top" />
        <div className="hero-fade-bottom" />
        <div className="hero-content">
          <p className="hero-eyebrow">Entrepreneur &amp; Systems Builder &mdash; Reykjav&iacute;k</p>
          <h1 className="hero-h1">
            Built from zero.<br />
            Running <em>without me.</em>
          </h1>
          <p className="hero-sub">
            Operator, builder, and AI architect. I design the systems, ship the product,
            and deploy the automation — then hand you everything documented and running.
          </p>
          <div className="hero-actions">
            <a href="#engage" className="btn-primary">
              Work with me
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#work" className="btn-ghost">See my work</a>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-val">6<span>+</span></div><div className="hero-stat-lbl">Businesses built</div></div>
            <div><div className="hero-stat-val">4</div><div className="hero-stat-lbl">Active verticals</div></div>
            <div><div className="hero-stat-val">5<span>yr</span></div><div className="hero-stat-lbl">Iceland track record</div></div>
            <div><div className="hero-stat-val">300<span>+</span></div><div className="hero-stat-lbl">Ops delivered</div></div>
          </div>
        </div>
      </section>

      {/* ── Tech marquee ── */}
      <Marquee />

      {/* ── About ── */}
      <section className="about" id="about">
        <div className="container">
          <span className="section-label">About</span>
          <div className="about-grid">
            <div className="about-inner">
              <p className="about-p">
                I moved to Iceland in 2019 with nothing but a plan and a high tolerance
                for ambiguity. Since then I&apos;ve built <strong>MAS Group</strong> —
                Iceland&apos;s largest Polish-operated B2B operation — launched a freight
                marketplace, a productized agency, a handyman brand, and several software
                tools. The common thread: <strong>systems that run without me</strong>.
              </p>
              <p className="about-p">
                My background spans growth marketing, product, operations, and AI
                automation. I don&apos;t specialize in one lane — I own the whole machine.
                Whether it&apos;s designing a CRM from scratch, running Meta campaigns, or
                deploying a voice agent, the discipline is the same:{' '}
                <strong>document it, delegate it, make it run</strong>. I also carry a
                quiet spiritual practice that keeps me grounded — it shapes how I lead,
                though it rarely comes up in a pitch deck.
              </p>
              <div className="about-meta">
                <div className="about-meta-item"><span>2019</span>Arrived in Iceland</div>
                <div className="about-meta-item"><span>4</span>Active verticals</div>
                <div className="about-meta-item"><span>6+</span>Businesses built</div>
              </div>
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
          <span className="section-label">Selected Work</span>
          <div className="work-table">
            {PROJECTS.map((p) => (
              <div key={p.num} className="work-row">
                <div className="work-logo">
                  <img src={p.logo} alt={p.name} />
                </div>
                <div>
                  <div className="work-name">{p.name}</div>
                  <div className="work-outcome">{p.outcome}</div>
                </div>
                <div className="work-tags">
                  {p.tags.map((t) => <span key={t} className="work-tag">{t}</span>)}
                </div>
                <div className="work-year">{p.year}</div>
                <svg className="work-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="cap" id="capabilities">
        <div className="container">
          <span className="section-label">Capabilities</span>
          <div className="cap-grid">
            {CAPABILITIES.map((c) => (
              <div key={c.num} className="cap-card">
                <div className="cap-num">{c.num}</div>
                <div className="cap-title">{c.title}</div>
                <div className="cap-desc">{c.desc}</div>
                <div className="cap-tags">{c.tags.map((t) => <span key={t} className="cap-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="timeline" id="timeline">
        <div className="container">
          <span className="section-label">Timeline</span>
          <div className="tl-list">
            {TIMELINE.map((item, i) => (
              <div key={i} className="tl-item">
                <div className="tl-year">{item.year}</div>
                <div className="tl-role">{item.role}</div>
                <div className="tl-company">{item.company}</div>
                <div className="tl-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engage ── */}
      <section className="engage" id="engage">
        <div className="container">
          <span className="section-label">Work With Me</span>
          <div className="engage-grid">
            {ENGAGE.map((e, i) => (
              <div key={i} className={`engage-card${e.featured ? ' featured' : ''}`}>
                <div className="engage-mode">{e.mode}</div>
                <div className="engage-title">{e.title}</div>
                <div className="engage-desc">{e.desc}</div>
                <div className="engage-detail">{e.detail}</div>
                <a href={e.href} className="engage-cta">
                  {e.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-inner">
            <h2 className="contact-h2">Ready to build something serious?</h2>
            <p className="contact-sub">
              Whether you have a specific project in mind or just want to explore
              what&apos;s possible — I respond to every relevant inquiry personally.
            </p>
            <a href="mailto:hello@kamiljan.com" className="contact-email">
              hello@kamiljan.com
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="contact-alts">
              or find me on
              <a href="https://linkedin.com/in/myspiritway" target="_blank" rel="noreferrer">LinkedIn</a>
              &middot;
              <a href="https://youtube.com/@myspiritway" target="_blank" rel="noreferrer">YouTube</a>
            </div>
            <div className="contact-sig">
              <img src="/signature.png" alt="Kamil Jan signature" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-logo">K<span>J</span></div>
        <div className="footer-copy">&copy; {new Date().getFullYear()} Kamil Jan &mdash; Reykjav&iacute;k</div>
        <div className="footer-links">
          <a href="https://youtube.com/@myspiritway" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://linkedin.com/in/myspiritway" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/mountainallservice" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
