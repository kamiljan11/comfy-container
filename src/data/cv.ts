import { type Lang } from "../i18n";

/**
 * CV content for /cv, in both languages.
 *
 * Written to the `cv-writing` skill (~/.claude/skills/cv-writing), built from
 * real published CVs and PL/EN career sources:
 * - PL bullets use the nominal form ("Budowa platformy…"), never the third
 *   person past ("zbudował") that no real Polish CV in the sample used;
 * - EN bullets start with a verb in implied first person, no pronoun;
 * - skills are short grouped lists, not sentences;
 * - no secondary-school line (Kamil's call, 2026-09-21).
 * cv.test.ts checks these rules, so a later edit cannot drift back.
 *
 * Titles and dates follow Kamil's LinkedIn experience page (2026-09-21), except where he
 * corrected them: AI-coded systems start in 2025, not 2024 (2026-11-12). Dates are start
 * years only. Refreshed 2026-11-12 from the CV he sent out (projects from LinkedIn).
 */

export type Job = { role: string; org: string; loc?: string; dates: string; bullets: string[] };
export type Labeled = { label: string; body: string };

export type CV = {
  download: string;
  role: string;
  contact: string;
  sec: {
    summary: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    languages: string;
    openTo: string;
  };
  summary: string;
  skills: Labeled[];
  experience: Job[];
  projects: Job[];
  education: Labeled[];
  languages: Labeled[];
  openTo: string;
};

export const CV_CONTENT: Record<Lang, CV> = {
  en: {
    download: "Download PDF",
    role: "AI Automation & Implementation Engineer",
    contact: "Reykjavík, Iceland",
    sec: {
      summary: "Summary",
      skills: "Core skills",
      experience: "Experience",
      projects: "Selected projects",
      education: "Learning & certifications",
      languages: "Languages & other",
      openTo: "Open to",
    },
    summary:
      "AI automation and implementation engineer. Ships AI systems into production for small and " +
      "mid-sized companies, then trains the team that runs them. Works with AI coding agents through " +
      "Higher Mind, an open-source meta-system for building software with AI (quality gates and reviewer " +
      "agents that check the agents' work), while owning the spec, architecture, review, deployment and " +
      "client support. Background in sales and marketing: ran a marketing agency in Poland, then moved to " +
      "Iceland, where the systems below run in real businesses. Looking for a full-time role in a team.",
    skills: [
      {
        label: "AI & automation:",
        body: "LLM APIs (Claude), structured outputs, AI agents and multi-agent workflows, MCP servers, RAG, n8n, REST APIs and webhooks, OAuth2, voice agents (Twilio).",
      },
      {
        label: "Engineering:",
        body: "TypeScript, React, Next.js, TanStack, Supabase (Postgres, RLS), Python, SQL, Zod, Vercel, Cloudflare Workers, Playwright, Vitest, Sentry.",
      },
      {
        label: "Delivery:",
        body: "requirements and scoping, architecture decisions, review of AI-written code, deployment, team training and handover.",
      },
      {
        label: "Growth:",
        body: "Meta and Google Ads, sales funnels, lead generation, GA4, Microsoft Clarity.",
      },
    ],
    experience: [
      {
        role: "AI Automation Engineer",
        org: "CetusPro",
        loc: "Rzeszów, Poland · hybrid, contract",
        dates: "2026",
        bullets: [
          "Deliver the build side of CetusPro's AI automation offer: a working prototype for a client's process, then the production system.",
          "Document the systems and train the people who run them; a pilot order system for a client is live.",
        ],
      },
      {
        role: "Technical Lead",
        org: "MAS Warsztat, workshop management app",
        loc: "Iceland / Poland",
        dates: "2026",
        bullets: [
          "Built a workshop management app that runs in production: repair quotes built on the shop's own labor-time history, vehicle lookup by plate, calendar, customer approval of repairs with photos and SMS notifications, and roles for owner, mechanic and client.",
          "AI assistant that answers from the shop's own data (RAG). TypeScript, React, Supabase.",
        ],
      },
      {
        role: "Systems Architect",
        org: "MAS Parts",
        loc: "Iceland · hybrid",
        dates: "2026",
        bullets: [
          "Built the B2B operations platform: price calculators per product line, a 13-stage quote-to-order pipeline, commissions and role-based access. The sales team uses it in the field as a mobile app.",
          "Built the order system (Google Apps Script, Twilio, email) that runs a 16-step logistics workflow with SMS reminders, status tracking and team alerts across Poland and Iceland.",
        ],
      },
      {
        role: "Applied AI Engineer",
        org: "Independent",
        loc: "Remote",
        dates: "2025",
        bullets: [
          "Built Higher Mind (kamiljan.com/claude), an open-source meta-system for building software with AI. It runs AI coding agents like a small team, with quality gates, reviewer agents and checks that block a bad change before it ships.",
          "Build production systems with AI coding agents writing the code; own the spec, architecture, review, deployment and upkeep.",
        ],
      },
      {
        role: "Full-Stack Developer",
        org: "Ekomoc, freelance",
        loc: "Remote",
        dates: "2025",
        bullets: [
          "Built a CRM for energy-audit sales teams in Poland's Clean Air grant programme: a 9-step order pipeline with role-based access for sales reps, auditors and admins.",
          "Automated DOCX/PDF grant applications; added a map view, push notifications and a sales leaderboard.",
        ],
      },
      {
        role: "Product Lead",
        org: "Reykjawwwik, web & design agency",
        loc: "Remote / Iceland",
        dates: "2023",
        bullets: [
          "Built a SaaS platform: a pricing engine for 10 markets with geo-detection, a lead-to-contract CRM and PDF contracts with per-country VAT.",
          "Design the systems, direct developers and run sales; client builds in car rental, tours and beauty.",
        ],
      },
      {
        role: "Project Manager / Marketing Manager",
        org: "Jöklaferðir ehf, Sleipnir Glacier Tours",
        loc: "Hafnarfjörður, Iceland",
        dates: "2022–2024",
        bullets: [
          "Co-built the tour business from launch: Bokun website, pricing, sales channels, reseller and partner agreements, trade fairs.",
          "Ran digital marketing (Meta and Google Ads) and sales newsletters; developed tours and guided on the glacier.",
          "More than 1,000 guests rated the tours five stars.",
        ],
      },
      {
        role: "Other ventures and earlier roles",
        org: "Poland & Iceland",
        dates: "2010–2026",
        bullets: [
          "MAS Prints (2026): print brokerage; brand, website and Meta Ads lead generation.",
          "Mountain Car Rental (2026): front-end rebuild of mountaincar.is and a network of 9 local partner businesses.",
          "PK Campers (2025): brand, website and Meta and Google Ads for a camper-rental company.",
          "Afengisstofnun.is (2025): brand, website, ads and go-to-market for a whisky-sampling business in Iceland.",
          "Flyt (2023): freight and group-import marketplace.",
          "QuickFix Iceland (2022): multilingual site and lead funnel for a handyman brand, live in 72 hours.",
          "Krónan (2018): shift manager.",
          "mobilUP (2015): marketing agency in Rzeszów, owner.",
          "MySpiritWay (2010): content and community brand with two published books and live events for groups of 100+.",
        ],
      },
    ],
    projects: [
      {
        role: "Fleet manager",
        org: "Mountain Car Rental",
        loc: "Iceland",
        dates: "2026",
        bullets: [
          "Booking, contract and alert system for a rental fleet in Iceland, replacing a paid system that had no export and no API. React, TypeScript, Supabase, Vercel.",
          "Audited the data migration before go-live and found 32 of 82 calendar entries silently dropped, five of them live bookings. In daily use since July 2026.",
        ],
      },
      {
        role: "claude-autoshutdown",
        org: "open source, MIT licence",
        loc: "Open-source tool",
        dates: "2026",
        bullets: [
          "Tool that shuts a computer down only after every Claude Code session and its subagents have finished, by reading each agent's real state instead of guessing from idle time.",
        ],
      },
    ],
    education: [],
    languages: [
      { label: "Languages:", body: "Polish (native); English (C1)." },
      { label: "Work eligibility:", body: "Polish citizen living in Iceland, EEA right to work." },
      { label: "Driving licence:", body: "B." },
    ],
    openTo:
      "AI automation & implementation engineer · AI integration engineer · AI engineer · AI solutions engineer.",
  },

  pl: {
    download: "Pobierz PDF",
    role: "Inżynier Automatyzacji i Wdrożeń AI",
    contact: "Reykjavík, Islandia",
    sec: {
      summary: "Podsumowanie",
      skills: "Kluczowe umiejętności",
      experience: "Doświadczenie",
      projects: "Wybrane projekty",
      education: "Nauka i certyfikaty",
      languages: "Języki i inne",
      openTo: "Otwarty na",
    },
    summary:
      "Inżynier automatyzacji i wdrożeń AI. Wdrażanie systemów AI na produkcję w niewielkich i średnich " +
      "firmach, a potem szkolenie zespołu, który je obsługuje. Praca z agentami AI piszącymi kod przez " +
      "Higher Mind, otwarty meta-system do tworzenia oprogramowania z AI (bramki jakości i agenci " +
      "recenzujący sprawdzają pracę agentów), przy pełnej odpowiedzialności za specyfikację, architekturę, " +
      "review, wdrożenie i wsparcie klienta. Doświadczenie w sprzedaży i marketingu: własna agencja " +
      "marketingowa w Polsce, potem Islandia. Cel: praca na etacie w zespole.",
    skills: [
      {
        label: "AI i automatyzacja:",
        body: "API LLM (Claude), structured outputs, agenty AI i workflowy wieloagentowe, serwery MCP, RAG, n8n, REST API i webhooki, OAuth2, agenty głosowe (Twilio).",
      },
      {
        label: "Inżynieria:",
        body: "TypeScript, React, Next.js, TanStack, Supabase (Postgres, RLS), Python, SQL, Zod, Vercel, Cloudflare Workers, Playwright, Vitest, Sentry.",
      },
      {
        label: "Realizacja:",
        body: "zbieranie wymagań i zakres, decyzje architektoniczne, review kodu pisanego przez AI, wdrożenie, szkolenie zespołu i przekazanie systemu.",
      },
      {
        label: "Wzrost:",
        body: "Meta i Google Ads, lejki sprzedażowe, pozyskiwanie leadów, GA4, Microsoft Clarity.",
      },
    ],
    experience: [
      {
        role: "AI Automation Engineer",
        org: "CetusPro",
        loc: "Rzeszów · hybrydowo, kontrakt",
        dates: "2026",
        bullets: [
          "Realizacja wykonawczej części oferty automatyzacji AI CetusPro: działający prototyp procesu klienta, potem system produkcyjny.",
          "Dokumentacja systemów i szkolenie osób, które z nich korzystają; pilotażowy system zamówień jest już u klienta w użyciu.",
        ],
      },
      {
        role: "Technical Lead",
        org: "MAS Warsztat, aplikacja do zarządzania warsztatem",
        loc: "Islandia / Polska",
        dates: "2026",
        bullets: [
          "Budowa aplikacji do zarządzania warsztatem, działającej produkcyjnie: wyceny napraw z historii czasów pracy warsztatu, wyszukiwanie pojazdu po numerze rejestracyjnym, kalendarz, akceptacja napraw przez klienta ze zdjęciami i powiadomieniami SMS.",
          "Asystent AI odpowiadający na podstawie danych warsztatu (RAG). TypeScript, React, Supabase.",
        ],
      },
      {
        role: "Systems Architect",
        org: "MAS Parts",
        loc: "Islandia · hybrydowo",
        dates: "2026",
        bullets: [
          "Budowa platformy operacyjnej B2B: kalkulatory cen dla linii produktów, 13-etapowy proces od oferty do zamówienia, prowizje, dostęp według ról. Zespół sprzedaży korzysta z niej w terenie jako z aplikacji mobilnej.",
          "System zamówień (Google Apps Script, Twilio, e-mail) prowadzący 16-etapowy proces logistyczny: przypomnienia SMS, śledzenie statusu, powiadomienia zespołów w Polsce i na Islandii.",
        ],
      },
      {
        role: "Applied AI Engineer",
        org: "Działalność własna",
        loc: "Zdalnie",
        dates: "2025",
        bullets: [
          "Budowa Higher Mind (kamiljan.com/claude), otwartego meta-systemu do tworzenia oprogramowania z AI: agenci AI do kodowania pracują jak niewielki zespół, z bramkami jakości, agentami recenzującymi i kontrolami blokującymi złą zmianę przed wdrożeniem.",
          "Budowa systemów produkcyjnych z agentami AI piszącymi kod: specyfikacja, architektura, review, wdrożenie i utrzymanie.",
        ],
      },
      {
        role: "Full-Stack Developer",
        org: "Ekomoc, freelance",
        loc: "Zdalnie",
        dates: "2025",
        bullets: [
          "CRM dla zespołów sprzedaży audytów energetycznych w programie Czyste Powietrze: 9-etapowy proces zamówień z dostępem według ról dla handlowców, audytorów i adminów.",
          "Automatyczne wnioski DOCX/PDF; widok mapy, powiadomienia push i ranking sprzedaży.",
        ],
      },
      {
        role: "Product Lead",
        org: "Reykjawwwik, agencja web & design",
        loc: "Zdalnie / Islandia",
        dates: "2023",
        bullets: [
          "Budowa platformy SaaS: silnik cenowy na 10 rynków z geolokalizacją, CRM od leada do umowy, umowy PDF z VAT właściwym dla kraju.",
          "Projektowanie systemów, koordynacja deweloperów i sprzedaż; wdrożenia dla klientów z branż wynajmu aut, turystyki i beauty.",
        ],
      },
      {
        role: "Project Manager / Marketing Manager",
        org: "Jöklaferðir ehf, Sleipnir Glacier Tours",
        loc: "Hafnarfjörður, Islandia",
        dates: "2022–2024",
        bullets: [
          "Współtworzenie firmy turystycznej od startu: strona na Bokun, cennik, kanały sprzedaży, umowy z resellerami i partnerami, targi.",
          "Marketing cyfrowy (Meta i Google Ads), newslettery sprzedażowe, rozwój oferty i prowadzenie wycieczek na lodowcu.",
          "Ocena pięciu gwiazdek od ponad 1000 gości.",
        ],
      },
      {
        role: "Pozostałe projekty i wcześniejsze role",
        org: "Polska i Islandia",
        dates: "2010–2026",
        bullets: [
          "MAS Prints (2026): pośrednik druku; marka, strona i kampanie Meta Ads pozyskujące leady.",
          "Mountain Car Rental (2026): przebudowa frontendu mountaincar.is i sieć 9 lokalnych firm partnerskich.",
          "PK Campers (2025): marka, strona i kampanie Meta i Google Ads dla wypożyczalni kamperów.",
          "Afengisstofnun.is (2025): marka, strona, reklamy i strategia wejścia na rynek dla firmy degustacji whisky na Islandii.",
          "Flyt (2023): marketplace transportu i importu grupowego.",
          "QuickFix Iceland (2022): wielojęzyczna strona i lejek leadów dla marki usług „złotej rączki”, gotowe w 72 godziny.",
          "Krónan (2018): kierownik zmiany.",
          "mobilUP (2015): agencja marketingowa w Rzeszowie, właściciel.",
          "MySpiritWay (2010): marka contentowa i społeczność, dwie wydane książki i wydarzenia na żywo dla grup 100+.",
        ],
      },
    ],
    projects: [
      {
        role: "System zarządzania flotą",
        org: "Mountain Car Rental",
        loc: "Islandia",
        dates: "2026",
        bullets: [
          "System rezerwacji, umów i alertów dla floty wypożyczalni na Islandii, zastępujący płatny system bez eksportu i API. React, TypeScript, Supabase, Vercel.",
          "Audyt migracji danych przed uruchomieniem: wykrycie 32 z 82 wpisów kalendarza utraconych po cichu, w tym pięciu realnych rezerwacji. W codziennym użyciu od lipca 2026.",
        ],
      },
      {
        role: "claude-autoshutdown",
        org: "open source, licencja MIT",
        loc: "Narzędzie open source",
        dates: "2026",
        bullets: [
          "Narzędzie wyłączające komputer dopiero po zakończeniu każdej sesji Claude Code i jej subagentów, na podstawie rzeczywistego stanu agentów, a nie czasu bezczynności.",
        ],
      },
    ],
    education: [],
    languages: [
      { label: "Języki:", body: "polski (ojczysty); angielski (C1)." },
      {
        label: "Prawo do pracy:",
        body: "obywatel Polski mieszkający na Islandii, prawo do pracy w EOG.",
      },
      { label: "Prawo jazdy:", body: "kat. B." },
    ],
    openTo:
      "Inżynier automatyzacji i wdrożeń AI · inżynier integracji AI · inżynier AI · inżynier rozwiązań AI.",
  },
};
