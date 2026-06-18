import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/cv')({
  head: () => ({
    meta: [
      { title: 'Kamil Jan — CV' },
      {
        name: 'description',
        content:
          'CV of Kamil Jan — applied / forward-deployed AI engineer, builder and operator. Reykjavík, remote-first.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://kamiljan.com/cv' }],
  }),
  component: CVPage,
})

const WORK: { name: string; url?: string; desc: string }[] = [
  {
    name: 'MAS Group',
    url: 'masgroup.is',
    desc: 'B2B operations platform across auto parts, print and logistics — a 13-stage quote-to-order pipeline, per-line pricing, commission management, role-based access, and an automated logistics flow (order → SMS → customs → delivery). Used live in the field as a mobile app.',
  },
  {
    name: 'Flyt',
    url: 'flyt.is',
    desc: 'Group-order and import marketplace for Iceland: pooled container campaigns with deposit/refund logic, cross-border VAT import quoting, and an admin dashboard with live revenue metrics.',
  },
  {
    name: 'Reykjawwwik',
    url: 'reykjawwwik.is',
    desc: 'SaaS for his web/design agency: a multi-market pricing engine across 10 countries with geo-detection, lead-to-contract CRM, and per-country VAT PDF contracts. He architects the system, hires and directs the developers, and runs sales. Live client builds: cars. / tours. / beauty.reykjawwwik.is.',
  },
  {
    name: 'QuickFix',
    url: 'quickfix.is',
    desc: 'Multilingual (EN / PL / IS) marketing site and lead funnel for a Reykjavík handyman brand — full brand and sales flow shipped in 72 hours.',
  },
  {
    name: 'Mountain Car',
    url: 'mountaincar.is',
    desc: 'Car rental and garage near Keflavík airport: fleet, booking and quote flow (Next.js + Supabase).',
  },
  {
    name: 'Sleipnir Glacier Tours',
    desc: 'Co-built the whole travel operation from scratch: website, pricing, marketing, influencer deals, trade fairs and on-glacier guiding. 4.9★ across 388 reviews, 1,000+ five-star guests.',
  },
  {
    name: 'Ekomoc CRM (private build)',
    desc: 'Field-sales CRM for energy-audit teams: 9-stage pipeline, role-based access, automated DOCX/PDF contract generation, map view and leaderboard.',
  },
]

const EXPERIENCE: { when: string; what: string }[] = [
  { when: '2021 — now', what: 'Founder & operator, MAS Group (Iceland) — built and runs the B2B group; manages and trains the sales team, hires and directs developers.' },
  { when: 'Ongoing', what: 'Founder, Reykjawwwik — his web/design agency; owns architecture, directs the dev team, runs sales.' },
  { when: '2022', what: 'Founded QuickFix Iceland — multilingual handyman brand and funnel.' },
  { when: '2019', what: 'Moved to Iceland with no network; co-founded Sleipnir Glacier Tours and rebuilt from scratch.' },
  { when: '2024 →', what: 'Full-stack AI builder shipping AI into production for SMEs.' },
  { when: 'Early', what: 'Sales network at 17, first company at 18, became the team’s top performer.' },
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

      <article className="cv">
        <header className="cv-head">
          <h1>Kamil Jan</h1>
          <p className="cv-role">Applied / Forward-Deployed AI Engineer · Builder &amp; Operator</p>
          <p className="cv-loc">Reykjavík, Iceland · Remote-first · open to relocation</p>
          <p className="cv-contact">
            <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a> ·{' '}
            <a href="https://wa.me/3548888901" target="_blank" rel="noreferrer">WhatsApp</a> ·{' '}
            <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">linkedin.com/in/kamiljan11</a> ·{' '}
            <a href="https://kamiljan.com" target="_blank" rel="noreferrer">kamiljan.com</a>
          </p>
        </header>

        <section className="cv-sec">
          <h2>Summary</h2>
          <p>
            Builder-operator who ships AI into production for SMEs and trains the teams to run it after he steps away.
            This is applied, forward-deployed AI engineering: embed with a company, ship real AI into their production,
            and hand it over running — not prototypes or slideware. As he puts it: “most coaches can’t build; most
            builders can’t teach — I do both.”
          </p>
        </section>

        <section className="cv-sec">
          <h2>Core skills</h2>
          <ul className="cv-skills">
            <li>
              <b>AI &amp; automation:</b> LLM orchestration, custom MCP servers, multi-agent workflows, RAG with
              vector databases, realtime voice agents (Twilio + OpenAI Realtime over WebSockets), WhatsApp bots, n8n,
              scheduled autonomous agents, fal.ai.
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
          <h2>Selected work</h2>
          {WORK.map((w) => (
            <div key={w.name} className="cv-item">
              <h3>
                {w.name}
                {w.url && <span>{w.url}</span>}
              </h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </section>

        <section className="cv-sec">
          <h2>Experience</h2>
          <ul className="cv-exp">
            {EXPERIENCE.map((e) => (
              <li key={e.when}>
                <b>{e.when}</b> — {e.what}
              </li>
            ))}
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
