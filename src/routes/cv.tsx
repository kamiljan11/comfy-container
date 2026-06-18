import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/cv')({
  head: () => ({
    meta: [
      { title: 'Kamil Jan Włodarczyk — CV' },
      {
        name: 'description',
        content:
          'CV of Kamil Jan Włodarczyk — applied / forward-deployed AI engineer, builder and operator. Reykjavík, remote-first.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://kamiljan.com/cv' }],
  }),
  component: CVPage,
})

type Job = { role: string; org: string; loc?: string; dates: string; bullets: string[] }

const EXPERIENCE: Job[] = [
  {
    role: 'Founder & Operator',
    org: 'MAS Group',
    loc: 'Iceland',
    dates: '2021 — present',
    bullets: [
      'Built and run a B2B operations platform across auto parts, print and logistics: a 13-stage quote-to-order pipeline, per-line pricing, commission management and role-based access — used live in the field as a mobile app.',
      'Engineered an automated logistics flow (order → SMS updates → customs → delivery) with Twilio and email integrations.',
      'Manage and train the sales team; hire and direct the developers.',
    ],
  },
  {
    role: 'Founder',
    org: 'Reykjawwwik — web & design agency',
    loc: 'Remote / Iceland',
    dates: '2023 — present',
    bullets: [
      'Built a SaaS platform: a multi-market pricing engine across 10 countries with geo-detection, a lead-to-contract CRM, and per-country VAT PDF contract generation.',
      'Architect the systems, hire and direct the developers, and run sales. Live client builds across car-rental, tours and beauty verticals — including a field-sales CRM for energy-audit teams (9-stage pipeline, automated DOCX/PDF contract generation).',
    ],
  },
  {
    role: 'Founder',
    org: 'Flyt',
    loc: 'Iceland',
    dates: '2023 — present',
    bullets: [
      'Built a group-order and import marketplace: pooled container campaigns with deposit/refund logic, cross-border VAT import quoting, and an admin dashboard with live revenue metrics.',
    ],
  },
  {
    role: 'Founder',
    org: 'QuickFix Iceland',
    loc: 'Reykjavík',
    dates: '2022 — present',
    bullets: [
      'Built a multilingual (EN / PL / IS) marketing site and lead funnel for a handyman brand — full brand and sales flow shipped in 72 hours.',
    ],
  },
  {
    role: 'Founder',
    org: 'Mountain Car',
    loc: 'Keflavík',
    dates: '2025 — present',
    bullets: ['Car rental and garage near Keflavík airport: fleet, booking and quote flow (Next.js + Supabase).'],
  },
  {
    role: 'Project Manager / Marketing Manager',
    org: 'Jöklaferðir ehf — Sleipnir Glacier Tours',
    loc: 'Hafnarfjörður, Iceland',
    dates: '2022 — 2024',
    bullets: [
      'Helped build the travel operation end to end: website (Bokun), pricing, sales channels, reseller and partner deals, and trade-fair representation.',
      'Ran digital marketing (Meta & Google Ads) and sales newsletters; did product development and on-glacier guiding. 4.9★ across 388 reviews.',
    ],
  },
  {
    role: 'Owner',
    org: 'MySpiritWay — content & community brand',
    loc: 'Online',
    dates: '2018 — present',
    bullets: [
      'Built a content and community brand around a practical, six-year self-authored guide (two books published, a third in progress); multi-platform content (YouTube, TikTok, Instagram, Facebook) and live event facilitation for groups of 100+.',
    ],
  },
  {
    role: 'Shift Manager',
    org: 'Krónan',
    loc: 'Iceland',
    dates: '2018 — 2019',
    bullets: [
      'Retail operations: team building and shift planning, customer service and complaints, order and delivery management, system fixes and in-store marketing.',
    ],
  },
  {
    role: 'Owner',
    org: 'mobilUP — marketing agency',
    loc: 'Rzeszów, Poland',
    dates: '2015 — 2017',
    bullets: [
      'Ran a marketing and advertising agency: client acquisition and retention, campaign delivery, web and social management, and accounting.',
    ],
  },
  {
    role: 'Chairman of the Supervisory Board',
    org: 'Fundacja SpiritWay — non-profit',
    loc: 'Rzeszów, Poland',
    dates: '2015 — 2018',
    bullets: ['Led the foundation: social media and brand, HR, program development and public representation.'],
  },
  {
    role: 'Earlier roles — sales, marketing & operations',
    org: 'Poland & Iceland',
    dates: '2013 — 2017',
    bullets: [
      'Team Leader (MLM / FM — led ~50 people), Sales Representative and top "best salesman on the floor" (call centre — loans and insurance), Marketing Dept Manager (Well Moda), plus content, distribution, retail and hospitality roles — built from the floor up after moving countries.',
    ],
  },
]

function CVPage() {
  return (
    <div className="cv-page">
      <div className="cv-bar">
        <Link to="/" className="cv-back">← kamiljan.com</Link>
        <button type="button" className="cv-download" onClick={() => window.print()}>
          Download PDF
        </button>
      </div>

      <article className="cv-paper">
        <header className="cv-head">
          <h1>Kamil Jan Włodarczyk</h1>
          <p className="cv-role">Applied / Forward-Deployed AI Engineer · Builder &amp; Operator</p>
          <p className="cv-contact">
            Reykjavík, Iceland · Remote-first · open to relocation
            <br />
            <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a> ·{' '}
            <a href="https://wa.me/3548888901" target="_blank" rel="noreferrer">WhatsApp +354 8888901</a> ·{' '}
            <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">linkedin.com/in/kamiljan11</a> ·{' '}
            <a href="https://kamiljan.com" target="_blank" rel="noreferrer">kamiljan.com</a>
          </p>
        </header>

        <section className="cv-sec">
          <h2>Summary</h2>
          <p>
            Applied / forward-deployed AI engineer and builder-operator. Ships AI into production for SMEs and trains
            the teams to run it after he steps away — “most coaches can’t build; most builders can’t teach, I do both.”
            Came up through sales and marketing in Poland (top performer; ran his own agency), rebuilt from the floor up
            after moving to Iceland, moved into product and operations, and now builds and runs multiple ventures end to
            end.
          </p>
        </section>

        <section className="cv-sec">
          <h2>Core skills</h2>
          <ul className="cv-skills">
            <li>
              <b>AI &amp; automation:</b> LLM orchestration, custom MCP servers, multi-agent workflows, RAG with vector
              databases, realtime voice agents (Twilio + OpenAI Realtime over WebSockets), WhatsApp bots, n8n, scheduled
              autonomous agents, fal.ai.
            </li>
            <li>
              <b>Product / full-stack:</b> React, Next.js, TypeScript, TanStack, Supabase (Postgres + RLS), Vercel,
              Cloudflare Workers, Python, Zod, Sentry, Playwright / Vitest.
            </li>
            <li>
              <b>Growth:</b> Meta &amp; Google Ads, funnel architecture, automated lead-generation, analytics (GA4,
              Microsoft Clarity).
            </li>
          </ul>
        </section>

        <section className="cv-sec">
          <h2>Experience</h2>
          {EXPERIENCE.map((e) => (
            <div key={e.role + e.org} className="cv-job">
              <div className="cv-job-head">
                <h3>
                  {e.role} <span>· {e.org}</span>
                </h3>
                <span className="cv-job-dates">{e.dates}</span>
              </div>
              {e.loc && <p className="cv-job-loc">{e.loc}</p>}
              <ul className="cv-bullets">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="cv-sec">
          <h2>Education &amp; training</h2>
          <ul className="cv-list">
            <li><b>High school</b> — general education (science, economics, accounting). Rzeszów, Poland · 2013–2016.</li>
            <li><b>Self-taught</b> full-stack engineering and applied AI (since).</li>
            <li><b>Courses:</b> trading (2019), 200-hour Yoga Teacher, Icelandic (levels 1–2).</li>
          </ul>
        </section>

        <section className="cv-sec">
          <h2>Languages &amp; other</h2>
          <ul className="cv-list">
            <li><b>Languages:</b> Polish (native); English (reading &amp; listening C1, spoken B2).</li>
            <li><b>Driving licence:</b> B.</li>
          </ul>
        </section>

        <section className="cv-sec">
          <h2>Open to</h2>
          <p>
            Applied / forward-deployed AI engineer · AI implementation &amp; enablement · Head of AI / Ops / Growth ·
            co-founding · advisory · senior contract. Remote-first; open to relocation.
          </p>
        </section>
      </article>
    </div>
  )
}
