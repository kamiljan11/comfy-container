import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { type Lang } from '../i18n'

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

/* ── Flags (mirrors the homepage toggle) ── */
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
      <clipPath id="gb-r-cv"><rect width="60" height="30" rx="5" /></clipPath>
      <g clipPath="url(#gb-r-cv)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  )
}

type Job = { role: string; org: string; loc?: string; dates: string; bullets: string[] }
type Labeled = { label: string; body: string }

type CV = {
  back: string
  download: string
  role: string
  contact: string
  sec: { summary: string; skills: string; experience: string; education: string; languages: string; openTo: string }
  summary: string
  skills: Labeled[]
  experience: Job[]
  education: Labeled[]
  languages: Labeled[]
  openTo: string
}

const CONTENT: Record<Lang, CV> = {
  en: {
    back: '← kamiljan.com',
    download: 'Download PDF',
    role: 'Applied / Forward-Deployed AI Engineer · Builder & Operator',
    contact: 'Reykjavík, Iceland · Remote-first · open to relocation',
    sec: {
      summary: 'Summary',
      skills: 'Core skills',
      experience: 'Experience',
      education: 'Education & self-directed learning',
      languages: 'Languages & other',
      openTo: 'Open to',
    },
    summary:
      'Applied / forward-deployed AI engineer and builder-operator. Ships AI into production for SMEs, then trains ' +
      'the team to keep it running. “Most coaches can’t build; most builders can’t teach — I do both.” Mostly ' +
      'self-taught: learned engineering and AI by building real products rather than in classrooms. Came up through ' +
      'sales and marketing in Poland; top performer, founded and ran a marketing agency. Rebuilt from the floor up ' +
      'after moving to Iceland in 2019, and now runs several ventures hands-on.',
    skills: [
      {
        label: 'AI & automation:',
        body: 'LLM orchestration, custom MCP servers, multi-agent workflows, RAG with vector databases, realtime voice agents (Twilio + OpenAI Realtime over WebSockets), WhatsApp bots, n8n, scheduled autonomous agents, fal.ai.',
      },
      {
        label: 'Product / full-stack:',
        body: 'React, Next.js, TypeScript, TanStack, Supabase (Postgres + RLS), Vercel, Cloudflare Workers, Python, Zod, Sentry, Playwright / Vitest.',
      },
      {
        label: 'Growth:',
        body: 'Meta & Google Ads, funnel architecture, automated lead-generation, analytics (GA4, Microsoft Clarity).',
      },
    ],
    experience: [
      {
        role: 'Founder & Operator',
        org: 'MAS Group',
        loc: 'Iceland',
        dates: '2021–present',
        bullets: [
          'Built and run a B2B operations platform across auto parts, print and logistics: a 13-stage quote-to-order pipeline, per-line pricing, commission management and role-based access. The sales team uses it live in the field as a mobile app.',
          'Engineered an automated logistics flow (order → SMS updates → customs → delivery) with Twilio and email integrations.',
          'Manage and train the sales team; hire and direct the developers.',
        ],
      },
      {
        role: 'Founder',
        org: 'Reykjawwwik, web & design agency',
        loc: 'Remote / Iceland',
        dates: '2023–present',
        bullets: [
          'Designed and built a SaaS platform: a multi-market pricing engine across 10 countries with geo-detection, a lead-to-contract CRM, and per-country VAT PDF contract generation.',
          'Architect the systems, hire and direct the developers, and run sales. Live client builds across car-rental, tours and beauty verticals, including a field-sales CRM for energy-audit teams (9-stage pipeline, automated DOCX/PDF contract generation).',
        ],
      },
      {
        role: 'Founder',
        org: 'Flyt',
        loc: 'Iceland',
        dates: '2023–present',
        bullets: [
          'Launched a group-order and import marketplace: pooled container campaigns with deposit/refund logic, cross-border VAT import quoting, and an admin dashboard with live revenue metrics.',
        ],
      },
      {
        role: 'Founder',
        org: 'QuickFix Iceland',
        loc: 'Reykjavík',
        dates: '2022–present',
        bullets: [
          'Shipped a multilingual (EN / PL / IS) marketing site and lead funnel for a handyman brand. Full brand and sales flow live in 72 hours.',
        ],
      },
      {
        role: 'Founder',
        org: 'Mountain Car',
        loc: 'Keflavík',
        dates: '2025–present',
        bullets: ['Car rental and garage near Keflavík airport: fleet, booking and quote flow (Next.js + Supabase).'],
      },
      {
        role: 'Project Manager / Marketing Manager',
        org: 'Jöklaferðir ehf, Sleipnir Glacier Tours',
        loc: 'Hafnarfjörður, Iceland',
        dates: '2022–2024',
        bullets: [
          'Helped build the travel operation from the ground up: website (Bokun), pricing, sales channels, reseller and partner deals, and trade-fair representation.',
          'Ran digital marketing (Meta & Google Ads) and sales newsletters; did product development and on-glacier guiding. Helped grow it into a top-rated glacier tour with 1,000+ five-star guests.',
        ],
      },
      {
        role: 'Owner',
        org: 'MySpiritWay, content & community brand',
        loc: 'Online',
        dates: '2018–present',
        bullets: [
          'Built a content and community brand around a practical, six-year self-authored guide (two books published, a third in progress). Multi-platform content (YouTube, TikTok, Instagram, Facebook) and live events for groups of 100+.',
        ],
      },
      {
        role: 'Shift Manager',
        org: 'Krónan',
        loc: 'Iceland',
        dates: '2018–2019',
        bullets: [
          'Retail operations: team building and shift planning, customer service and complaints, order and delivery management, system fixes and in-store marketing.',
        ],
      },
      {
        role: 'Owner',
        org: 'mobilUP, marketing agency',
        loc: 'Rzeszów, Poland',
        dates: '2015–2017',
        bullets: [
          'Ran a marketing and advertising agency: client acquisition and retention, campaign delivery, web and social management, and accounting.',
        ],
      },
      {
        role: 'Chairman of the Supervisory Board',
        org: 'Fundacja SpiritWay, non-profit',
        loc: 'Rzeszów, Poland',
        dates: '2015–2018',
        bullets: ['Led the foundation: social media and brand, HR, program development and public representation.'],
      },
      {
        role: 'Earlier roles in sales, marketing and operations',
        org: 'Poland & Iceland',
        dates: '2013–2017',
        bullets: [
          'Team Leader (MLM / FM, led ~50 people), Sales Representative and top "best salesman on the floor" (call centre, loans and insurance), Marketing Dept Manager (Well Moda), plus content, distribution, retail and hospitality roles. Built from the floor up after moving countries.',
        ],
      },
    ],
    education: [
      {
        label: 'Self-taught engineer.',
        body: 'Full-stack development and applied AI, learned on the job by building and shipping products that businesses use every day.',
      },
      {
        label: 'General secondary education',
        body: '(science, economics and accounting). Rzeszów, Poland, 2013–2016.',
      },
      {
        label: 'Continuous learning:',
        body: 'ongoing AI and engineering courses; trading (2019); 200-hour Yoga Teacher certification; Icelandic (levels 1–2).',
      },
    ],
    languages: [
      { label: 'Languages:', body: 'Polish (native); English (reading & listening C1, spoken B2).' },
      { label: 'Work eligibility:', body: 'EU / EEA (Polish citizen, based in Iceland).' },
      { label: 'Timezone:', body: 'GMT / UTC. Overlaps both European and US-East working hours.' },
      { label: 'Driving licence:', body: 'B.' },
    ],
    openTo:
      'Applied / forward-deployed AI engineer · AI implementation & enablement · Head of AI / Ops / Growth · ' +
      'co-founding · advisory · senior contract. Remote-first; open to relocation.',
  },

  pl: {
    back: '← kamiljan.com',
    download: 'Pobierz PDF',
    role: 'Inżynier AI (Applied / Forward-Deployed) · Builder & Operator',
    contact: 'Reykjavík, Islandia · Praca zdalna · otwarty na relokację',
    sec: {
      summary: 'Podsumowanie',
      skills: 'Kluczowe umiejętności',
      experience: 'Doświadczenie',
      education: 'Edukacja i samodzielna nauka',
      languages: 'Języki i inne',
      openTo: 'Otwarty na',
    },
    summary:
      'Inżynier AI (applied / forward-deployed) i builder-operator. Wdraża AI na produkcję w MŚP, a potem szkoli ' +
      'zespół, żeby sam to utrzymał. „Większość coachów nie umie budować, większość builderów nie umie uczyć — ja ' +
      'robię jedno i drugie.” W dużej mierze samouk: inżynierii i AI nauczył się, budując realne produkty, a nie na ' +
      'wykładach. Zaczynał od sprzedaży i marketingu w Polsce; najlepszy sprzedawca, założył i prowadził własną ' +
      'agencję. Po przeprowadzce na Islandię w 2019 odbudował się od zera i dziś sam prowadzi kilka biznesów.',
    skills: [
      {
        label: 'AI i automatyzacja:',
        body: 'orkiestracja LLM, własne serwery MCP, multi-agentowe workflowy, RAG z bazami wektorowymi, agenty głosowe real-time (Twilio + OpenAI Realtime po WebSockets), boty WhatsApp, n8n, autonomiczne agenty na harmonogramie, fal.ai.',
      },
      {
        label: 'Produkt / full-stack:',
        body: 'React, Next.js, TypeScript, TanStack, Supabase (Postgres + RLS), Vercel, Cloudflare Workers, Python, Zod, Sentry, Playwright / Vitest.',
      },
      {
        label: 'Wzrost:',
        body: 'Meta i Google Ads, architektura funnela, automatyczne pozyskiwanie leadów, analityka (GA4, Microsoft Clarity).',
      },
    ],
    experience: [
      {
        role: 'Założyciel i Operator',
        org: 'MAS Group',
        loc: 'Islandia',
        dates: '2021–present',
        bullets: [
          'Zbudował i prowadzi platformę operacyjną B2B w pionach części samochodowych, druku i logistyki: 13-etapowy pipeline od oferty do zamówienia, wycena per pozycja, zarządzanie prowizjami i dostęp oparty na rolach. Zespół sprzedaży używa jej na żywo w terenie jako aplikacji mobilnej.',
          'Zaprojektował zautomatyzowany przepływ logistyczny (zamówienie → SMS-y o statusie → odprawa celna → dostawa) z integracjami Twilio i e-mail.',
          'Zarządza i szkoli zespół sprzedaży; rekrutuje i kieruje deweloperami.',
        ],
      },
      {
        role: 'Założyciel',
        org: 'Reykjawwwik, agencja web & design',
        loc: 'Zdalnie / Islandia',
        dates: '2023–present',
        bullets: [
          'Zaprojektował i postawił platformę SaaS: silnik cenowy na 10 rynkach z geolokalizacją, CRM od leada do umowy oraz generowanie PDF umów z VAT per kraj.',
          'Projektuje systemy, rekrutuje i kieruje deweloperami oraz prowadzi sprzedaż. Wdrożenia dla klientów w branżach wynajmu aut, turystyki i beauty, w tym CRM dla terenowych zespołów audytów energetycznych (9-etapowy pipeline, automatyczne generowanie umów DOCX/PDF).',
        ],
      },
      {
        role: 'Założyciel',
        org: 'Flyt',
        loc: 'Islandia',
        dates: '2023–present',
        bullets: [
          'Uruchomił marketplace zbiorowych zamówień i importu: grupowe kampanie kontenerowe z logiką depozytu/zwrotu, transgraniczna wycena importu z VAT i panel admina z przychodami na żywo.',
        ],
      },
      {
        role: 'Założyciel',
        org: 'QuickFix Iceland',
        loc: 'Reykjavík',
        dates: '2022–present',
        bullets: [
          'Dostarczył wielojęzyczną (EN / PL / IS) stronę marketingową i lejek leadów dla marki „złotej rączki”. Pełna marka i flow sprzedaży na żywo w 72 godziny.',
        ],
      },
      {
        role: 'Założyciel',
        org: 'Mountain Car',
        loc: 'Keflavík',
        dates: '2025–present',
        bullets: ['Wynajem aut i warsztat przy lotnisku Keflavík: flota, rezerwacje i flow wyceny (Next.js + Supabase).'],
      },
      {
        role: 'Project Manager / Marketing Manager',
        org: 'Jöklaferðir ehf, Sleipnir Glacier Tours',
        loc: 'Hafnarfjörður, Islandia',
        dates: '2022–2024',
        bullets: [
          'Współbudował biznes turystyczny od podstaw: strona (Bokun), cennik, kanały sprzedaży, umowy z resellerami i partnerami oraz reprezentacja na targach.',
          'Prowadził marketing cyfrowy (Meta i Google Ads) i newslettery sprzedażowe; rozwój produktu i prowadzenie wycieczek na lodowcu. Współtworzył jeden z najwyżej ocenianych tourów lodowcowych, 1000+ gości z 5 gwiazdkami.',
        ],
      },
      {
        role: 'Właściciel',
        org: 'MySpiritWay, marka contentowa i społeczność',
        loc: 'Online',
        dates: '2018–present',
        bullets: [
          'Zbudował markę contentową i społeczność wokół praktycznego, sześcioletniego autorskiego przewodnika (dwie wydane książki, trzecia w toku). Content multi-platformowy (YouTube, TikTok, Instagram, Facebook) i wydarzenia na żywo dla grup 100+.',
        ],
      },
      {
        role: 'Kierownik zmiany',
        org: 'Krónan',
        loc: 'Islandia',
        dates: '2018–2019',
        bullets: [
          'Operacje handlowe: budowanie zespołu i grafiki zmian, obsługa klienta i reklamacje, zarządzanie zamówieniami i dostawami, naprawa systemów i marketing w sklepie.',
        ],
      },
      {
        role: 'Właściciel',
        org: 'mobilUP, agencja marketingowa',
        loc: 'Rzeszów, Polska',
        dates: '2015–2017',
        bullets: [
          'Prowadził agencję marketingowo-reklamową: pozyskiwanie i utrzymanie klientów, realizacja kampanii, zarządzanie stronami i social media oraz księgowość.',
        ],
      },
      {
        role: 'Przewodniczący Rady Nadzorczej',
        org: 'Fundacja SpiritWay, organizacja non-profit',
        loc: 'Rzeszów, Polska',
        dates: '2015–2018',
        bullets: ['Kierował fundacją: social media i marka, HR, rozwój programów i reprezentacja publiczna.'],
      },
      {
        role: 'Wcześniejsze role w sprzedaży, marketingu i operacjach',
        org: 'Polska & Islandia',
        dates: '2013–2017',
        bullets: [
          'Lider zespołu (MLM / FM, ~50 osób), przedstawiciel handlowy i „najlepszy sprzedawca na sali” (call center, kredyty i ubezpieczenia), kierownik działu marketingu (Well Moda), plus role w contencie, dystrybucji, handlu i hotelarstwie. Od podstaw po przeprowadzce.',
        ],
      },
    ],
    education: [
      {
        label: 'Samouk.',
        body: 'Full-stack i applied AI wyuczone w praktyce, przez budowanie i wdrażanie produktów, których firmy używają na co dzień.',
      },
      {
        label: 'Wykształcenie średnie ogólne',
        body: '(profil ścisły, ekonomia i rachunkowość). Rzeszów, Polska, 2013–2016.',
      },
      {
        label: 'Ciągła nauka:',
        body: 'bieżące kursy AI i inżynierii; trading (2019); certyfikat nauczyciela jogi (200h); islandzki (poziomy 1–2).',
      },
    ],
    languages: [
      { label: 'Języki:', body: 'polski (ojczysty); angielski (czytanie i słuchanie C1, mówienie B2).' },
      { label: 'Prawo do pracy:', body: 'UE / EOG (obywatel Polski, mieszka na Islandii).' },
      { label: 'Strefa czasowa:', body: 'GMT / UTC. Pokrywa się z godzinami pracy w Europie i na wschodzie USA.' },
      { label: 'Prawo jazdy:', body: 'kat. B.' },
    ],
    openTo:
      'Inżynier AI (applied / forward-deployed) · wdrażanie i enablement AI · Head of AI / Ops / Growth · ' +
      'współzałożycielstwo · doradztwo · kontrakt senior. Remote-first; otwarty na relokację.',
  },
}

function CVPage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en'
    const url = new URLSearchParams(window.location.search).get('lang') as Lang
    if (url === 'en' || url === 'pl') return url
    const saved = localStorage.getItem('kj-lang') as Lang
    if (saved === 'en' || saved === 'pl') return saved
    return navigator.language.startsWith('pl') ? 'pl' : 'en'
  })

  const toggleLang = () => {
    setLang((l) => {
      const next: Lang = l === 'en' ? 'pl' : 'en'
      if (typeof window !== 'undefined') localStorage.setItem('kj-lang', next)
      return next
    })
  }

  // keep ?lang= in the URL in sync so the choice carries to / and into shared links
  useEffect(() => {
    if (typeof window === 'undefined') return
    const u = new URL(window.location.href)
    if (u.searchParams.get('lang') !== lang) {
      u.searchParams.set('lang', lang)
      window.history.replaceState({}, '', u)
    }
  }, [lang])

  const cv = CONTENT[lang]

  return (
    <div className="cv-page">
      <div className="cv-bar">
        <Link to="/" className="cv-back">{cv.back}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button type="button" className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
            {lang === 'en' ? <FlagGB /> : <FlagPL />}
          </button>
          <button type="button" className="cv-download" onClick={() => window.print()}>
            {cv.download}
          </button>
        </div>
      </div>

      <article className="cv-paper">
        <header className="cv-head">
          <h1>Kamil Jan Włodarczyk</h1>
          <p className="cv-role">{cv.role}</p>
          <p className="cv-contact">
            {cv.contact}
            <br />
            <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a> ·{' '}
            <a href="https://wa.me/3548888901" target="_blank" rel="noreferrer">WhatsApp +354 8888901</a> ·{' '}
            <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">linkedin.com/in/kamiljan11</a> ·{' '}
            <a href="https://kamiljan.com" target="_blank" rel="noreferrer">kamiljan.com</a>
          </p>
        </header>

        <section className="cv-sec">
          <h2>{cv.sec.summary}</h2>
          <p>{cv.summary}</p>
        </section>

        <section className="cv-sec">
          <h2>{cv.sec.skills}</h2>
          <ul className="cv-skills">
            {cv.skills.map((s, i) => (
              <li key={i}>
                <b>{s.label}</b> {s.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{cv.sec.experience}</h2>
          {cv.experience.map((e) => (
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
          <h2>{cv.sec.education}</h2>
          <ul className="cv-list">
            {cv.education.map((s, i) => (
              <li key={i}>
                <b>{s.label}</b> {s.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{cv.sec.languages}</h2>
          <ul className="cv-list">
            {cv.languages.map((s, i) => (
              <li key={i}>
                <b>{s.label}</b> {s.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{cv.sec.openTo}</h2>
          <p>{cv.openTo}</p>
        </section>
      </article>
    </div>
  )
}
