export type Lang = 'en' | 'pl'

interface SiteTranslation {
  nav: {
    work: string
    about: string
    capabilities: string
    engage: string
    contact: string
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
      about: 'About',
      capabilities: 'Capabilities',
      engage: 'Engage',
      contact: 'Contact',
      available: 'Available',
      cta: "Let's talk",
    },
    hero: {
      eyebrow: 'Builder · Entrepreneur · Digital Nomad',
      h1a: 'I build things',
      h1b: 'that run',
      h1em: 'themselves.',
      sub: 'I write the code, run the ads, build the automations, and lead the team. Solo founders and companies hire me when they need someone who can actually do all of it.',
      cta: 'Work with me',
      ctaGhost: 'See my work',
    },
    stats: ['Businesses built', 'Active verticals', 'Years building', 'Countries'],
    about: {
      label: 'About',
      p1a: 'I started at 16 with one decision: ',
      p1b: 'build yourself before you build anything',
      p1c: '. A 50-person network at 17, first company at 18, years grinding field sales until I became ',
      p1d: 'top performer on the floor',
      p1e: '. Then I moved to Iceland with nothing and started over.',
      p2a: 'I worked retail shifts, learned the market, and co-launched ',
      p2b: 'Sleipnir Glacier Tours',
      p2c: " from scratch — that's when it clicked. Since then I've built MAS Group across five verticals, launched Reykjawwwik, QuickFix, and MySpiritWay, led teams across multiple businesses, and shipped everything myself — the code, the ads, the automations, the systems. I also talk about it publicly, because building in the open is how I learn best.",
      meta: ['Years building', 'Active verticals', 'Businesses built'],
      milestones: [
        { year: '2012', desc: 'Started building at 16. First network, first company, field sales — top performer by 18.' },
        { year: '2019', desc: 'Moved to Iceland. Rebuilt from zero — retail, social media, co-launched Sleipnir Glacier Tours.' },
        { year: '2021', desc: 'CEO & Operator. Built MAS Group from scratch — auto parts, print, freight, and rental — with dedicated team leads in each vertical.' },
        { year: '2024', desc: 'Full-stack builder. Shipping websites, AI systems, and automations — and sharing the process publicly on YouTube.' },
      ],
    },
    work: { label: 'Selected Work' },
    capabilities: { label: 'Capabilities' },
    engage: { label: 'Work With Me' },
    contact: {
      h2: 'Ready to build something?',
      sub: "Whether you have a project in mind, want to explore a collaboration, or are looking for someone to hire — I respond to every relevant message personally.",
      findMe: 'or find me on',
    },
    projects: [
      { outcome: 'Built a custom B2B operations platform — pricing calculators per product line, quote-to-order pipeline with 13-stage tracking, commission management, and role-based access for clients, sales reps, and admins. Deployed across MAS Group\'s auto parts, print, and logistics verticals.' },
      { outcome: 'Built a group-order and import platform for Iceland — pooled container campaigns with deposit-and-refund logic, on-demand import quotes from any EU retailer, and an admin dashboard with bulk notifications, campaign tracking, and real-time revenue metrics.' },
      { outcome: 'Built a multi-language marketing site (EN / PL / IS) for a Reykjavík handyman brand — service pages, before/after gallery, floating WhatsApp contact, and a deposit-saver landing page. Full brand and sales flow deployed in 72h. 300+ jobs completed.' },
      { outcome: 'Built a full SaaS platform for a web agency — multi-market pricing engine across 10 countries with geo-detection, lead-to-contract pipeline, admin CRM, PDF contract generation with per-country VAT logic, and push notifications. React + Supabase.' },
      { outcome: 'Built a field-sales CRM for energy audit teams — 9-stage order pipeline, role-based access (salesperson / auditor / admin), automated DOCX/PDF generation for government funding contracts, map view, push notifications, and performance leaderboard.' },
    ],
    caps: [
      {
        title: 'Websites & Products',
        desc: 'From idea to live product — I build it myself. Full-stack: Lovable, React, TypeScript, Vercel, Supabase, Cloudflare Workers. You get a shipped product, not a prototype handed to a dev.',
        tags: ['Lovable', 'React / TypeScript', 'Vercel + Supabase', 'Cloudflare Workers'],
      },
      {
        title: 'Growth & Marketing Systems',
        desc: "Meta and Google ads, funnel architecture, email sequences, content pipelines. I don't just run campaigns — I build the full marketing machine that generates and converts leads, then document it so it outlasts any single person.",
        tags: ['Meta & Google Ads', 'Funnel Architecture', 'Email Sequences', 'Content Systems'],
      },
      {
        title: 'AI & Automation',
        desc: 'n8n workflows, voice agents, WhatsApp bots, LLM integrations — running in production. I build, deploy, and hand you the documentation so your team can maintain it without me.',
        tags: ['n8n Workflows', 'Voice Agents', 'WhatsApp Bots', 'LLM Integrations'],
      },
      {
        title: 'Strategy, Leadership & Consulting',
        desc: "I've built and led teams across five companies. Whether you need an operator, a thinking partner, or someone to run a department — I've been in the room and know what it actually takes to execute.",
        tags: ['Team Leadership', 'Business Operations', 'Consulting', 'SOPs & Delegation'],
      },
    ],
    engageModes: [
      {
        mode: 'Consulting',
        title: 'Think it through together',
        desc: 'One session or an ongoing relationship. Bring me your problem — a product idea, a growth challenge, a system that needs fixing — and I will tell you exactly what I would build and how.',
        detail: 'Single session or retainer · Flexible scope',
        cta: "Let's talk",
      },
      {
        mode: 'Build For You',
        title: 'I handle the full build',
        desc: 'Website, automation, marketing system, AI integration — whatever needs shipping. You bring the vision, I handle the execution from start to finish and hand you everything running and documented.',
        detail: 'Project-based · Full delivery · Documented handoff',
        cta: 'Start a project',
      },
      {
        mode: 'Hire Me',
        title: 'Full-time or long-term',
        desc: 'Open to both employment and long-term project engagements. Remote-first. Most effective where someone needs to own the product, growth, or operations layer — or build the AI infrastructure from scratch.',
        detail: 'Full-time or contract · Remote-first · Head of Ops / Growth / AI',
        cta: 'Get in touch',
      },
    ],
  },

  pl: {
    nav: {
      work: 'Projekty',
      about: 'O mnie',
      capabilities: 'Kompetencje',
      engage: 'Współpraca',
      contact: 'Kontakt',
      available: 'Dostępny',
      cta: 'Porozmawiajmy',
    },
    hero: {
      eyebrow: 'Budowniczy · Przedsiębiorca · Digital Nomad',
      h1a: 'Buduję rzeczy,',
      h1b: 'które działają',
      h1em: 'same.',
      sub: 'Piszę kod, prowadzę reklamy, buduję automatyzacje i zarządzam zespołem. Solo-founderzy i firmy współpracują ze mną, gdy potrzebują kogoś kto faktycznie to wszystko potrafi.',
      cta: 'Współpracujmy',
      ctaGhost: 'Moje projekty',
    },
    stats: ['Zbudowanych biznesów', 'Aktywnych pionów', 'Lat budowania', 'Krajów'],
    about: {
      label: 'O mnie',
      p1a: 'Zacząłem w wieku 16 lat z jedną decyzją: ',
      p1b: 'zbuduj siebie, zanim zbudujesz cokolwiek innego',
      p1c: '. Sieć 50 osób w wieku 17 lat, pierwsza firma w 18, lata w sprzedaży terenowej aż do tytułu ',
      p1d: 'najlepszego sprzedawcy w zespole',
      p1e: '. Potem przeniosłem się na Islandię bez niczego i zacząłem od nowa.',
      p2a: 'Pracowałem na zmiany w handlu, poznawałem rynek i współtworzyłem ',
      p2b: 'Sleipnir Glacier Tours',
      p2c: ' od podstaw — wtedy wszystko zaskoczyło. Od tamtej pory zbudowałem MAS Group w pięciu pionach, uruchomiłem Reykjawwwik, QuickFix i MySpiritWay, prowadziłem zespoły w kilku firmach i osobiście dostarczałem każdy element — kod, reklamy, automatyzacje, systemy. Opowiadam o tym publicznie, bo budowanie w otwartości to najlepszy sposób żeby się uczyć.',
      meta: ['Lat budowania', 'Aktywnych pionów', 'Zbudowanych biznesów'],
      milestones: [
        { year: '2012', desc: 'Zacząłem budować w wieku 16 lat. Pierwsza sieć, pierwsza firma, sprzedaż terenowa — najlepszy sprzedawca w wieku 18 lat.' },
        { year: '2019', desc: 'Przeprowadzka na Islandię. Od zera — handel, media społecznościowe, współtworzenie Sleipnir Glacier Tours.' },
        { year: '2021', desc: 'CEO i Operator. MAS Group od zera — części, druk, logistyka, wynajem — z dedykowanymi liderami w każdym pionie.' },
        { year: '2024', desc: 'Full-stack builder. Strony, systemy AI i automatyzacje — i publiczne dzielenie się procesem na YouTube.' },
      ],
    },
    work: { label: 'Wybrane Projekty' },
    capabilities: { label: 'Kompetencje' },
    engage: { label: 'Współpraca' },
    contact: {
      h2: 'Gotowy coś zbudować?',
      sub: 'Czy masz konkretny projekt, chcesz omówić współpracę, czy szukasz kogoś do zatrudnienia — osobiście odpowiadam na każde trafne zapytanie.',
      findMe: 'lub znajdź mnie na',
    },
    projects: [
      { outcome: 'Zbudowałem własną platformę operacyjną B2B — kalkulatory cen per linia produktów, pipeline ofert z 13-etapowym śledzeniem, zarządzanie prowizjami i dostęp oparty na rolach dla klientów, handlowców i adminów. Wdrożone w pionach części, druku i logistyki MAS Group.' },
      { outcome: 'Zbudowałem platformę zbiorowych zamówień i importu na Islandię — grupowe kampanie kontenerowe z logiką depozytu i zwrotu, zapytania o import z dowolnego sklepu w UE, panel admina z masowymi powiadomieniami i śledzeniem przychodów w czasie rzeczywistym.' },
      { outcome: 'Zbudowałem wielojęzyczną stronę marketingową (EN / PL / IS) dla reykjavíkskiej marki handymana — strony usług, galeria przed/po, pływający widget WhatsApp i dedykowana strona kaucyjna. Pełna marka i flow sprzedaży w 72h. 300+ zleceń.' },
      { outcome: 'Zbudowałem pełną platformę SaaS dla agencji webowej — silnik cenowy na 10 rynkach z geolokalizacją, pipeline od leada do umowy, CRM dla admina, generowanie PDF umów z logiką VAT per kraj i push notyfikacje. React + Supabase.' },
      { outcome: 'Zbudowałem CRM dla zespołów sprzedaży audytów energetycznych — 9-etapowy pipeline zamówień, dostęp oparty na rolach (handlowiec / audytor / admin), automatyczne generowanie DOCX/PDF dla wniosków Czyste Powietrze, widok mapy, push notyfikacje i tabela wyników.' },
    ],
    caps: [
      {
        title: 'Strony i Produkty',
        desc: 'Od pomysłu do działającego produktu — buduję to osobiście. Full-stack: Lovable, React, TypeScript, Vercel, Supabase, Cloudflare Workers. Dostajesz gotowy produkt, nie prototyp przekazany deweloperowi.',
        tags: ['Lovable', 'React / TypeScript', 'Vercel + Supabase', 'Cloudflare Workers'],
      },
      {
        title: 'Wzrost i Marketing',
        desc: 'Reklamy Meta i Google, architektura funnela, sekwencje e-mail, pipeline treści. Nie tylko prowadzę kampanie — buduję całą maszynę marketingową i dokumentuję ją tak, by działała bez żadnej konkretnej osoby.',
        tags: ['Meta i Google Ads', 'Architektura Funnela', 'Sekwencje E-mail', 'Systemy Treści'],
      },
      {
        title: 'AI i Automatyzacja',
        desc: 'Workflowy n8n, agenty głosowe, boty WhatsApp, integracje LLM — działające na produkcji. Buduję, wdrażam i przekazuję dokumentację, żeby Twój zespół mógł to utrzymać beze mnie.',
        tags: ['Workflowy n8n', 'Agenty Głosowe', 'Boty WhatsApp', 'Integracje LLM'],
      },
      {
        title: 'Strategia, Przywództwo i Consulting',
        desc: 'Budowałem i prowadziłem zespoły w pięciu firmach. Czy potrzebujesz operatora, partnera do myślenia, czy kogoś kto poprowadzi dział — byłem w tym pokoju i wiem co faktycznie jest potrzebne do realizacji.',
        tags: ['Przywództwo Zespołu', 'Operacje Biznesowe', 'Consulting', 'SOPy i Delegowanie'],
      },
    ],
    engageModes: [
      {
        mode: 'Consulting',
        title: 'Przemyślmy to razem',
        desc: 'Jedna sesja lub stała współpraca. Przynieś mi swój problem — pomysł na produkt, wyzwanie wzrostowe, system do naprawienia — a powiem Ci dokładnie co bym zbudował i jak.',
        detail: 'Pojedyncza sesja lub retainer · Elastyczny zakres',
        cta: 'Porozmawiajmy',
      },
      {
        mode: 'Buduję Za Ciebie',
        title: 'Przejmuję cały build',
        desc: 'Strona, automatyzacja, system marketingowy, integracja AI — cokolwiek wymaga dostarczenia. Ty przynosisz wizję, ja zajmuję się realizacją od A do Z i przekazuję wszystko działające i udokumentowane.',
        detail: 'Projekt · Pełne dostarczenie · Udokumentowane przekazanie',
        cta: 'Zacznij projekt',
      },
      {
        mode: 'Zatrudnij Mnie',
        title: 'Etat lub długoterminowo',
        desc: 'Otwarty zarówno na zatrudnienie, jak i długoterminowe projekty. Remote-first. Najskuteczniejszy tam, gdzie ktoś musi przejąć warstwę produktową, wzrostową lub operacyjną — albo zbudować infrastrukturę AI od zera.',
        detail: 'Etat lub kontrakt · Remote-first · Head of Ops / Growth / AI',
        cta: 'Skontaktuj się',
      },
    ],
  },
}
