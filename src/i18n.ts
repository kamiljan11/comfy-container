export type Lang = 'en' | 'pl'

interface SiteTranslation {
  nav: {
    work: string
    capabilities: string
    timeline: string
    engage: string
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
    milestones: Array<{ year: string; desc: string }>
  }
  work: { label: string }
  capabilities: { label: string }
  engage: { label: string }
  contact: {
    h2: string
    sub: string
    findMe: string
  }
  projects: Array<{ outcome: string }>
  caps: Array<{ title: string; desc: string; tags: string[] }>
  engageModes: Array<{ mode: string; title: string; desc: string; detail: string; cta: string }>
}

export const T: Record<Lang, SiteTranslation> = {
  en: {
    nav: {
      work: 'Work',
      capabilities: 'Capabilities',
      timeline: 'Timeline',
      engage: 'Engage',
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
      p1a: 'I started at 16 with one decision: ',
      p1b: 'build yourself before you build anything',
      p1c: '. A 50-person network at 17, first company at 18, years grinding field sales until I became ',
      p1d: 'top performer on the floor',
      p1e: '. Then I moved to Iceland with nothing and started over.',
      p2a: 'I worked retail shifts, learned the market, and eventually co-launched ',
      p2b: 'Sleipnir Glacier Tours',
      p2c: ' from scratch — that\'s when it clicked. I ran a spiritual foundation, wrote three books on consciousness, and kept building: MAS Group, five more ventures, an independent sales force across six products. All of it leads to the same thing now: helping founders build companies that run without them.',
      meta: ['Started building', 'Active verticals', 'Businesses built'],
      milestones: [
        { year: '2019', desc: 'Moved to Iceland. Rebuilt from zero — retail, social media, co-launched Sleipnir Glacier Tours.' },
        { year: '2021', desc: 'CEO & Operator. Built MAS Group from scratch across auto parts, print, freight, and rental.' },
        { year: '2024', desc: 'AI Architect. Independent — deploying LLM workflows and voice agents across MAS and client ventures.' },
      ],
    },
    work: { label: 'Selected Work' },
    capabilities: { label: 'Capabilities' },
    engage: { label: 'Work With Me' },
    contact: {
      h2: 'Ready to build something serious?',
      sub: "Whether you have a specific project in mind or just want to explore what's possible — I respond to every relevant inquiry personally, sometimes with a bit of automation in the background :)",
      findMe: 'or find me on',
    },
    projects: [
      { outcome: 'Multi-vertical B2B group — auto parts, print, logistics, rental — built from zero and running on dedicated department leads.' },
      { outcome: 'First-of-its-kind freight marketplace. Compare and book quotes from verified transport providers across sea, air, and road.' },
      { outcome: 'Handyman brand deployed in 72h — brand system, Meta ads, and WhatsApp-first sales flow. 300+ jobs completed.' },
      { outcome: 'Productized web agency for local SMBs. Done-for-you websites, ads, and content — one monthly price, no surprises.' },
      { outcome: 'Educational platform — the Simplified Practical Spirituality guidebook, activation sessions, and community.' },
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
      p1a: 'Zacząłem w wieku 16 lat z jedną decyzją: ',
      p1b: 'zbuduj siebie, zanim zbudujesz cokolwiek innego',
      p1c: '. Sieć 50 osób w wieku 17 lat, pierwsza firma w 18, lata w sprzedaży terenowej aż do tytułu ',
      p1d: 'najlepszego sprzedawcy w zespole',
      p1e: '. Potem przeniosłem się na Islandię bez niczego i zacząłem od nowa.',
      p2a: 'Pracowałem na zmiany w handlu, poznawałem rynek i w końcu współtworzyłem ',
      p2b: 'Sleipnir Glacier Tours',
      p2c: ' od podstaw — wtedy wszystko zaskoczyło. Prowadziłem fundację duchową, napisałem trzy książki o świadomości i budowałem dalej: MAS Group, pięć kolejnych przedsięwzięć, niezależny zespół sprzedaży. To wszystko prowadzi teraz do jednego: pomagam założycielom budować firmy, które działają bez nich.',
      meta: ['Rok początku', 'Aktywnych pionów', 'Zbudowanych biznesów'],
      milestones: [
        { year: '2019', desc: 'Przeprowadzka na Islandię. Od zera — handel, media społecznościowe, współtworzenie Sleipnir Glacier Tours.' },
        { year: '2021', desc: 'CEO i Operator. Zbudowałem MAS Group od zera — części, druk, logistyka, wynajem.' },
        { year: '2024', desc: 'Architekt AI. Niezależnie — wdrażam workflowy LLM i agenty głosowe w MAS i projektach klientów.' },
      ],
    },
    work: { label: 'Wybrane Projekty' },
    capabilities: { label: 'Kompetencje' },
    engage: { label: 'Współpraca' },
    contact: {
      h2: 'Gotowy zbudować coś poważnego?',
      sub: 'Czy masz konkretny projekt, czy chcesz tylko sprawdzić możliwości — osobiście odpowiadam na każde trafne zapytanie, czasem z odrobiną automatyzacji w tle :)',
      findMe: 'lub znajdź mnie na',
    },
    projects: [
      { outcome: 'Wielobranżowa grupa B2B — części samochodowe, druk, logistyka, wynajem — zbudowana od zera, działająca na dedykowanych liderach działów.' },
      { outcome: 'Pierwszy tego rodzaju marketplace do transportu towarów. Porównuj i rezerwuj oferty od zweryfikowanych przewoźników morskich, lotniczych i drogowych.' },
      { outcome: 'Marka handymana uruchomiona w 72h — system brandingowy, reklamy Meta i sprzedaż przez WhatsApp. 300+ zrealizowanych zleceń.' },
      { outcome: 'Produktizowana agencja webowa dla lokalnych MŚP. Strony, reklamy i treści done-for-you — jedna miesięczna cena, bez niespodzilanek.' },
      { outcome: 'Platforma edukacyjna — poradnik Simplified Practical Spirituality, sesje aktywacji i społeczność.' },
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
