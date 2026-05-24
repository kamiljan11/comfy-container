export type Lang = 'en' | 'pl'

interface SiteTranslation {
  nav: {
    work: string
    capabilities: string
    timeline: string
    engage: string
    spiritual: string
    available: string
    cta: string
  }
  hero: {
    eyebrow: string
    h1a: string
    h1b: string
    h1em: string
    sub: string
    cta: string
    ctaGhost: string
  }
  stats: string[]
  about: {
    label: string
    p1a: string
    p1b: string
    p1c: string
    p1d: string
    p1e: string
    p2a: string
    p2b: string
    p2c: string
    meta: string[]
  }
  work: { label: string }
  capabilities: { label: string }
  timeline: { label: string }
  engage: { label: string }
  contact: {
    h2: string
    sub: string
    findMe: string
  }
  projects: Array<{ outcome: string }>
  caps: Array<{ title: string; desc: string; tags: string[] }>
  timelineItems: Array<{ role: string; desc: string }>
  engageModes: Array<{ mode: string; title: string; desc: string; detail: string; cta: string }>
}

export const T: Record<Lang, SiteTranslation> = {
  en: {
    nav: {
      work: 'Work',
      capabilities: 'Capabilities',
      timeline: 'Timeline',
      engage: 'Engage',
      spiritual: 'Spiritual Path',
      available: 'Available',
      cta: "Let's talk",
    },
    hero: {
      eyebrow: 'Entrepreneur & Operator — Digital Nomad',
      h1a: 'I build things',
      h1b: 'that run',
      h1em: 'themselves.',
      sub: 'Operator, builder, and AI architect. I design the systems, ship the product, and deploy the automation — then hand you everything documented and running.',
      cta: 'Work with me',
      ctaGhost: 'See my work',
    },
    stats: ['Businesses built', 'Active verticals', 'Operator track record', 'Ops delivered'],
    about: {
      label: 'About',
      p1a: 'I started at 16 — not with a business plan, but with a conviction that ',
      p1b: 'the operator has to be built before the operation',
      p1c: '. A 50-person network at 17, first company at 18, years in field sales and marketing until I became ',
      p1d: 'top performer on the floor',
      p1e: '. Then I moved to Iceland with nothing and rebuilt from zero — retail, social media, and eventually co-launching Sleipnir Glacier Tours from the ground up.',
      p2a: 'Parallel to all of it: a spiritual foundation I ran, three books on consciousness, and a practice that quietly shapes every decision I make. That whole arc now feeds into ',
      p2b: 'MAS Group and five other ventures',
      p2c: ' — parts, print, rental, and an independent sales force across six products. I help founders build what I\'ve been building all along: things that run without them.',
      meta: ['Started building', 'Active verticals', 'Businesses built'],
    },
    work: { label: 'Selected Work' },
    capabilities: { label: 'Capabilities' },
    timeline: { label: 'Timeline' },
    engage: { label: 'Work With Me' },
    contact: {
      h2: 'Ready to build something serious?',
      sub: "Whether you have a specific project in mind or just want to explore what's possible — I respond to every relevant inquiry personally.",
      findMe: 'or find me on',
    },
    projects: [
      { outcome: 'Multi-vertical B2B group — auto parts, print, logistics, rental — built from zero and running on dedicated department leads.' },
      { outcome: 'First-of-its-kind freight marketplace. Compare and book quotes from verified transport providers across sea, air, and road.' },
      { outcome: 'Handyman brand deployed in 72h — brand system, Meta ads, and WhatsApp-first sales flow. 300+ jobs completed.' },
      { outcome: 'Productized web agency for local SMBs. Done-for-you websites, ads, and content — one monthly price, no surprises.' },
      { outcome: 'Educational platform — the Simplified Practical Spirituality guidebook, activation sessions (DMT, IYSS), and community. Now living at kamiljan.com/spirituality.' },
      { outcome: 'Solar audit and sales CRM — job pipeline, role-based access, team notes, and audit photo uploads.' },
    ],
    caps: [
      {
        title: 'Systems Architecture',
        desc: 'From blank-page chaos to documented, delegatable operations. I design the SOPs, CRMs, ERPs, and team protocols that let businesses run without the founder in the room.',
        tags: ['Operations Design', 'Custom ERPs', 'SOPs & Delegation', 'Team Protocols'],
      },
      {
        title: 'Growth & Distribution',
        desc: 'Performance media and full-funnel systems. Meta, Google, email sequences, landing pages, and conversion tracking — built to compound and outlast any single campaign.',
        tags: ['Meta & Google Ads', 'Funnel Architecture', 'Email Sequences', 'Conversion Tracking'],
      },
      {
        title: 'AI Automation',
        desc: 'LLM workflows, voice agents, MCP servers, and custom AI tools that run in production — not just demos. I build, deploy, and document everything so your team can maintain it.',
        tags: ['LLM Workflows', 'Voice Agents', 'MCP Servers', 'Custom AI Tools'],
      },
    ],
    timelineItems: [
      { role: 'AI Automation Architect', desc: 'Building LLM-powered workflows, RetellAI voice agents, and MCP servers. Deployed AI tooling across freight, auto parts, and service businesses.' },
      { role: 'Founder & Product Lead', desc: 'Designed and launched a first-of-its-kind freight comparison platform. Led product, operations, and commercial partnerships from zero to live users.' },
      { role: 'Founder', desc: 'Productized web agency for local SMBs. Built the service model, pricing structure, delivery workflow, and client acquisition system from scratch.' },
      { role: 'CEO & Operator', desc: 'Built a multi-vertical B2B group (auto parts, print, freight, rental) from zero. Recruited and managed dedicated department leads across 4 verticals.' },
      { role: 'Growth & Operations', desc: 'Led growth, ops, and market expansion across early-stage startups. Built playbooks for customer acquisition, team hiring, and scaling operations.' },
    ],
    engageModes: [
      {
        mode: 'Co-Founder',
        title: 'Build something together',
        desc: 'Equity-based. I come in at pre-revenue or early traction and work as a full operator — product, ops, growth, and team building. Not a consultant. A co-founder.',
        detail: 'Pre-revenue or early traction · Equity · Full commitment',
        cta: "Let's talk",
      },
      {
        mode: 'Advisory / Project',
        title: 'Defined scope, real output',
        desc: '30–90 day engagements with a specific deliverable. System builds, growth sprints, AI automation rollouts. I go deep, deliver, and document everything.',
        detail: '30–90 days · Defined deliverable · Fractional',
        cta: 'Start a project',
      },
      {
        mode: 'Hire',
        title: 'Head of Ops / Growth / AI',
        desc: 'Remote-first. Most effective in companies where someone needs to own the operational and growth layer — or build the AI automation infrastructure from scratch.',
        detail: 'In-house or remote · Head of Ops / Growth / AI',
        cta: 'Get in touch',
      },
    ],
  },

  pl: {
    nav: {
      work: 'Projekty',
      capabilities: 'Kompetencje',
      timeline: 'Historia',
      engage: 'Współpraca',
      spiritual: 'Duchowa Ŝciężka',
      available: 'Dostępny',
      cta: 'Porozmawiajmy',
    },
    hero: {
      eyebrow: 'Przedsiębiorca i Operator — Digital Nomad',
      h1a: 'Buduję rzeczy,',
      h1b: 'które działają',
      h1em: 'same.',
      sub: 'Operator, budowniczy i architekt AI. Projektuję systemy, dostarczam produkt i wdrażam automatyzację — a na koniec przekazuję Ci wszystko udokumentowane i działające.',
      cta: 'Współpracujmy',
      ctaGhost: 'Moje projekty',
    },
    stats: ['Zbudowanych biznesów', 'Aktywnych pionów', 'Lat doświadczenia', 'Dostarczonych operacji'],
    about: {
      label: 'O mnie',
      p1a: 'Zacząłem w wieku 16 lat — nie z biznesplanem, ale z przekonaniem, że ',
      p1b: 'operator musi powstać zanim powstanie operacja',
      p1c: '. Sieć 50 osób w wieku 17 lat, pierwsza firma w 18, lata w sprzedaży i marketingu aż do tytułu ',
      p1d: 'najlepszego sprzedawcy w zespole',
      p1e: '. Potem przeniosłem się na Islandię bez niczego i zbudowałem się od zera — handel detaliczny, media społecznościowe, aż po współtworzenie Sleipnir Glacier Tours od podstaw.',
      p2a: 'Przez cały ten czas prowadziłem fundację duchową, napisałem trzy książki o świadomości i rozwijałem praktykę, która po cichu kształtuje każdą moją decyzję. Cały ten łuk przekłada się teraz na ',
      p2b: 'MAS Group i pięć innych przedsięwzięć',
      p2c: ' — części, druk, wynajem i niezależny zespół sprzedaży obsługujący sześć produktów. Pomagam założycielom zbudować to, co sam budowałem przez całe życie: rzeczy, które działają bez nich.',
      meta: ['Rok początku', 'Aktywnych pionów', 'Zbudowanych biznesów'],
    },
    work: { label: 'Wybrane Projekty' },
    capabilities: { label: 'Kompetencje' },
    timeline: { label: 'Historia' },
    engage: { label: 'Współpraca' },
    contact: {
      h2: 'Gotowy zbudować coś poważnego?',
      sub: 'Czy masz konkretny projekt, czy chcesz tylko sprawdzić możliwości — osobiście odpowiadam na każde trafne zapytanie.',
      findMe: 'lub znajdź mnie na',
    },
    projects: [
      { outcome: 'Wielobranżowa grupa B2B — części samochodowe, druk, logistyka, wynajem — zbudowana od zera, działająca na dedykowanych liderach działów.' },
      { outcome: 'Pierwszy tego rodzaju marketplace do transportu towarów. Porównuj i rezerwuj oferty od zweryfikowanych przewoźników morskich, lotniczych i drogowych.' },
      { outcome: 'Marka handymana uruchomiona w 72h — system brandingowy, reklamy Meta i sprzedaż przez WhatsApp. 300+ zrealizowanych zleceń.' },
      { outcome: 'Produktizowana agencja webowa dla lokalnych MŚP. Strony, reklamy i treści done-for-you — jedna miesięczna cena, bez niespodzilanek.' },
      { outcome: 'Platforma edukacyjna — poradnik Simplified Practical Spirituality, sesje aktywacji (DMT, IYSS) i społeczność. Mieszka teraz pod kamiljan.com/spirituality.' },
      { outcome: 'CRM do audytów i sprzedaży solarnej — pipeline zleceń, dostęp oparty na rolach, notatki zespołu i przesłanie zdjęć z audytów.' },
    ],
    caps: [
      {
        title: 'Architektura Systemów',
        desc: 'Od chaosu pustej kartki do udokumentowanych, delegowalnych operacji. Projektuję SOPy, CRMy, ERPy i protokoły zespołowe, które pozwalają biznesom działać bez założyciela w pokoju.',
        tags: ['Projektowanie Operacji', 'Własne ERPy', 'SOPy i Delegowanie', 'Protokoły Zespołowe'],
      },
      {
        title: 'Wzrost i Dystrybucja',
        desc: 'Performance media i systemy full-funnel. Meta, Google, sekwencje e-mail, landing pages i śledzenie konwersji — zbudowane tak, by narastały i przeżyły każdą kampanię.',
        tags: ['Meta i Google Ads', 'Architektura Funnela', 'Sekwencje E-mail', 'Śledzenie Konwersji'],
      },
      {
        title: 'Automatyzacja AI',
        desc: 'Workflowy LLM, agenty głosowe, serwery MCP i niestandardowe narzędzia AI działające na produkcji — nie tylko demo. Buduję, wdrażam i dokumentuję wszystko, by Twój zespół mógł to utrzymać.',
        tags: ['Workflowy LLM', 'Agenty Głosowe', 'Serwery MCP', 'Narzędzia AI'],
      },
    ],
    timelineItems: [
      { role: 'Architekt Automatyzacji AI', desc: 'Buduję workflowy zasilane LLM, agenty głosowe RetellAI i serwery MCP. Wdrożyłem narzędzia AI w branżach: logistyka, części samochodowe i usługi.' },
      { role: 'Założyciel i Lider Produktu', desc: 'Zaprojektowałem i uruchomiłem pierwszy w swoim rodzaju portal do porównywania cen transportu. Prowadziłem produkt, operacje i partnerstwa komercyjne od zera do żywych użytkowników.' },
      { role: 'Założyciel', desc: 'Produktizowana agencja webowa dla lokalnych MŚP. Zbudowałem model usługi, strukturę cenową, workflow dostawy i system pozyskiwania klientów od zera.' },
      { role: 'CEO i Operator', desc: 'Zbudowałem wielobranżową grupę B2B (części samochodowe, druk, logistyka, wynajem) od zera. Rekrutowałem i zarządzałem dedykowanymi liderami działów w 4 pionach.' },
      { role: 'Wzrost i Operacje', desc: 'Prowadziłem wzrost, operacje i ekspansję rynkową w early-stage startupach. Tworzyłem playbooki do pozyskiwania klientów, rekrutacji i skalowania.' },
    ],
    engageModes: [
      {
        mode: 'Współzałożyciel',
        title: 'Zbudujmy coś razem',
        desc: 'Na zasadach equity. Wchodzę na etapie pre-revenue lub wczesnej trakcji i pracuję jako pełny operator — produkt, ops, wzrost i budowanie zespołu. Nie konsultant. Współzałożyciel.',
        detail: 'Pre-revenue lub wczesna trakcja · Equity · Pełne zaangażowanie',
        cta: 'Porozmawiajmy',
      },
      {
        mode: 'Doradztwo / Projekt',
        title: 'Zdefiniowany zakres, realne wyniki',
        desc: 'Zaangażowania 30–90 dni z konkretnym deliverable. Budowy systemów, sprinty wzrostowe, wdrożenia automatyzacji AI. Wchodzę głęboko, dostarczam i dokumentuję wszystko.',
        detail: '30–90 dni · Zdefiniowany deliverable · Frakcjonalnie',
        cta: 'Zacznij projekt',
      },
      {
        mode: 'Zatrudnienie',
        title: 'Head of Ops / Growth / AI',
        desc: 'Remote-first. Najskuteczniejszy w firmach, gdzie ktoś musi przejąć warstwę operacyjną i wzrostową — albo zbudować infrastrukturę automatyzacji AI od zera.',
        detail: 'In-house lub zdalnie · Head of Ops / Growth / AI',
        cta: 'Skontaktuj się',
      },
    ],
  },
}
