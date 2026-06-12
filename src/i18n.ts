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
      eyebrow: 'Builder · AI Enablement · Team Coach',
      h1a: 'I build things',
      h1b: 'that run',
      h1em: 'themselves.',
      sub: "I write the code, run the ads, build the AI automations — and I lead and train the teams that run them. I ship AI in production and get people to actually use it. Most coaches can't build; most builders can't teach. I do both.",
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
      p2c: " from scratch — that's when it clicked. Since then I've built MAS Group across five verticals, managed and trained sales teams, hired and directed developers, and designed business systems from the ground up. I don't just ship the code — I run the operation, then train the people so it keeps running without me. That's also why I spent six years writing a practical spirituality guide — taking something genuinely complex and making it simple to follow. Making the complicated usable by other people is the through-line of everything I do.",
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
      { outcome: 'Built a multi-language marketing site (EN / PL / IS) for a Reykjavík handyman brand — service pages, before/after gallery, floating WhatsApp contact, and a deposit-saver landing page. Full brand and sales flow deployed in 72h.' },
      { outcome: 'Built the full operation from scratch — website, pricing structure, influencer marketing, trade fair presence, and on-glacier guiding. Ran the project end-to-end including custom tour design. 4.9★ across 388 verified reviews, 1,000+ five-star guests.' },
      { outcome: 'Built a full SaaS platform for a web agency — multi-market pricing engine across 10 countries with geo-detection, lead-to-contract pipeline, admin CRM, PDF contract generation with per-country VAT logic, and push notifications. React + Supabase.' },
      { outcome: 'Built a field-sales CRM for energy audit teams — 9-stage order pipeline, role-based access (salesperson / auditor / admin), automated DOCX/PDF generation for government funding contracts, map view, push notifications, and performance leaderboard.' },
    ],
    caps: [
      {
        title: 'Websites & Products',
        desc: 'From idea to live product — I build it myself. Full-stack: Lovable, React, TypeScript, Vercel, Supabase, Cloudflare Workers. You get a shipped product running in production, not a prototype handed to a dev.',
        tags: ['Lovable', 'React / TypeScript', 'Vercel + Supabase', 'Cloudflare Workers'],
      },
      {
        title: 'Growth & Marketing Systems',
        desc: "Meta and Google ads, funnel architecture, email sequences, content pipelines. I don't just run campaigns — I build the full marketing machine that generates and converts leads, then document it so it outlasts any single person.",
        tags: ['Meta & Google Ads', 'Funnel Architecture', 'Email Sequences', 'Content Systems'],
      },
      {
        title: 'AI & Automation',
        desc: "n8n workflows, voice agents, WhatsApp bots, LLM integrations — running in production. But building is only half of it: I coach teams to actually adopt AI, turn complex tools into simple daily habits, and leave behind documentation and AI champions who keep it running without me.",
        tags: ['n8n Workflows', 'Voice Agents', 'LLM Integrations', 'AI Enablement'],
      },
      {
        title: 'Strategy, Leadership & Consulting',
        desc: "I've built, led, and trained teams across five companies — from field sales reps to developers. I've taught people to actually adopt new tools and processes, not just sit through a deck. A coach who makes complex things simple — and who's done the building, so the advice comes from shipping, not slides.",
        tags: ['Team Leadership', 'Coaching & Training', 'Business Operations', 'Consulting'],
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
        mode: 'Build With Your Team',
        title: 'I build it — and train your team to own it',
        desc: 'An AI enablement engagement: I ship a real workflow into production while your team learns to run it — structured training plus hands-on coaching, complex tools turned into simple daily habits. Done-with-you, not done-and-gone, so your people can keep it going without me.',
        detail: 'Enablement · Train-while-building · Documented handoff',
        cta: 'Build with your team',
      },
      {
        mode: 'Hire Me',
        title: 'Full-time or long-term',
        desc: "Open to both employment and long-term project engagements. Remote-first. Most effective where someone needs to build the AI infrastructure from scratch and get a team to actually use it — I've done both in my own companies. Equally strong owning the product, growth, or operations layer.",
        detail: 'Full-time or contract · Remote-first · AI Coach / Enablement Lead · Head of AI / Ops',
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
      eyebrow: 'Budowniczy · Wdrażanie AI · Coach zespołu',
      h1a: 'Buduję rzeczy,',
      h1b: 'które działają',
      h1em: 'same.',
      sub: 'Piszę kod, prowadzę reklamy, buduję automatyzacje AI — i prowadzę oraz szkolę zespoły, które potem samodzielnie je obsługują. Wdrażam AI na produkcji i sprawiam, że ludzie naprawdę z niego korzystają. Większość coachów nie umie budować, większość builderów nie umie uczyć. Ja robię jedno i drugie.',
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
      p2c: ' od podstaw — wtedy wszystko zaskoczyło. Od tamtej pory zbudowałem MAS Group w pięciu pionach, zarządzałem i szkoliłem handlowców, zatrudniałem i kierowałem deweloperami, projektowałem architektury biznesowe od zera. Nie tylko wysyłam kod — prowadzę całą operację, a potem szkolę ludzi, żeby działała beze mnie. Dlatego też przez sześć lat pisałem praktyczny poradnik duchowości — biorąc coś naprawdę skomplikowanego i robiąc z tego coś prostego w praktyce. Sprawianie, że skomplikowane rzeczy stają się zrozumiałe i użyteczne dla innych, to wspólny mianownik wszystkiego, co robię.',
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
      { outcome: 'Zbudowałem wielojęzyczną stronę marketingową (EN / PL / IS) dla reykjavíkskiej marki handymana — strony usług, galeria przed/po, pływający widget WhatsApp i dedykowana strona kaucyjna. Pełna marka i flow sprzedaży w 72h.' },
      { outcome: 'Zbudowałem cały biznes od zera — stronę, strukturę cenową, influencer marketing, obecność na targach i prowadzenie wycieczek na lodowcu. Projekt od A do Z, łącznie z designem wycieczek na zamówienie. 4.9★ z 388 zweryfikowanych opinii, 1000+ gości z 5 gwiazdkami.' },
      { outcome: 'Zbudowałem pełną platformę SaaS dla agencji webowej — silnik cenowy na 10 rynkach z geolokalizacją, pipeline od leada do umowy, CRM dla admina, generowanie PDF umów z logiką VAT per kraj i push notyfikacje. React + Supabase.' },
      { outcome: 'Zbudowałem CRM dla zespołów sprzedaży audytów energetycznych — 9-etapowy pipeline zamówień, dostęp oparty na rolach (handlowiec / audytor / admin), automatyczne generowanie DOCX/PDF dla wniosków Czyste Powietrze, widok mapy, push notyfikacje i tabela wyników.' },
    ],
    caps: [
      {
        title: 'Strony i Produkty',
        desc: 'Od pomysłu do działającego produktu — buduję to osobiście. Full-stack: Lovable, React, TypeScript, Vercel, Supabase, Cloudflare Workers. Dostajesz produkt działający na produkcji, nie prototyp przekazany deweloperowi.',
        tags: ['Lovable', 'React / TypeScript', 'Vercel + Supabase', 'Cloudflare Workers'],
      },
      {
        title: 'Wzrost i Marketing',
        desc: 'Reklamy Meta i Google, architektura funnela, sekwencje e-mail, pipeline treści. Nie tylko prowadzę kampanie — buduję całą maszynę marketingową i dokumentuję ją tak, by działała bez żadnej konkretnej osoby.',
        tags: ['Meta i Google Ads', 'Architektura Funnela', 'Sekwencje E-mail', 'Systemy Treści'],
      },
      {
        title: 'AI i Automatyzacja',
        desc: 'Workflowy n8n, agenty głosowe, boty WhatsApp, integracje LLM — działające na produkcji. Ale budowanie to połowa roboty: szkolę zespoły z realnej adopcji AI, zamieniam złożone narzędzia w proste codzienne nawyki i zostawiam dokumentację oraz AI championów, którzy utrzymają to beze mnie.',
        tags: ['Workflowy n8n', 'Agenty Głosowe', 'Integracje LLM', 'Wdrażanie AI'],
      },
      {
        title: 'Strategia, Przywództwo i Consulting',
        desc: 'Budowałem, prowadziłem i szkoliłem zespoły w pięciu firmach — od handlowców po deweloperów. Uczyłem ludzi, żeby naprawdę zaczęli używać nowych narzędzi i procesów, a nie tylko odsiedzieli prezentację. Coach, który upraszcza złożone rzeczy — i który sam to wszystko zbudował, więc rada bierze się z wdrażania, nie ze slajdów.',
        tags: ['Przywództwo Zespołu', 'Szkolenia i Coaching', 'Operacje Biznesowe', 'Consulting'],
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
        mode: 'Buduję z Twoim Zespołem',
        title: 'Buduję — i uczę Twój zespół to prowadzić',
        desc: 'Wdrożenie AI z naciskiem na ludzi: wdrażam realny workflow na produkcję, a Twój zespół uczy się go obsługiwać — ustrukturyzowane szkolenie plus praktyczny coaching, złożone narzędzia zamienione w proste codzienne nawyki. Buduję z Tobą, nie buduję i znikam, żeby Twoi ludzie mogli to prowadzić beze mnie.',
        detail: 'Wdrożenie · Szkolę w trakcie budowy · Udokumentowane przekazanie',
        cta: 'Zbuduj z zespołem',
      },
      {
        mode: 'Zatrudnij Mnie',
        title: 'Etat lub długoterminowo',
        desc: 'Otwarty zarówno na zatrudnienie, jak i długoterminowe projekty. Remote-first. Najskuteczniejszy tam, gdzie trzeba zbudować infrastrukturę AI od zera i sprawić, żeby zespół naprawdę z niej korzystał — jedno i drugie robiłem we własnych firmach. Równie mocny w przejęciu warstwy produktowej, wzrostowej lub operacyjnej.',
        detail: 'Etat lub kontrakt · Remote-first · AI Coach / Lead ds. wdrażania AI · Head of AI / Ops',
        cta: 'Skontaktuj się',
      },
    ],
  },
}
