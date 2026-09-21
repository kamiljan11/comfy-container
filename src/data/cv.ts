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
 * Titles and dates follow Kamil's LinkedIn experience page, which he named the
 * more accurate source (2026-09-21); roles missing there come from the previous CV.
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
    education: string;
    languages: string;
    openTo: string;
  };
  summary: string;
  skills: Labeled[];
  experience: Job[];
  education: Labeled[];
  languages: Labeled[];
  openTo: string;
};

export const CV_CONTENT: Record<Lang, CV> = {
  en: {
    download: "Download PDF",
    role: "AI Automation & Implementation Engineer · Builder & Operator",
    contact: "Reykjavík, Iceland · Remote-first · open to relocation",
    sec: {
      summary: "Summary",
      skills: "Core skills",
      experience: "Experience",
      education: "Learning & certifications",
      languages: "Languages & other",
      openTo: "Open to",
    },
    summary:
      "AI automation and implementation engineer. Ships AI systems into production for small and " +
      "mid-sized companies, then trains the team that runs them. Works with AI coding agents writing " +
      "the code, while owning the spec, architecture, review, deployment and client support. Background in " +
      "sales and marketing: founded a marketing agency in Poland, then moved to Iceland and now runs " +
      "several businesses there.",
    skills: [
      {
        label: "AI & automation:",
        body: "LLM APIs (OpenAI, Claude), structured outputs, AI agents and multi-agent workflows, MCP servers, RAG, n8n, REST APIs and webhooks, OAuth2, voice agents (Twilio, OpenAI Realtime).",
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
        org: "Cetus Pro",
        loc: "Rzeszów, Poland · hybrid, contract",
        dates: "Sep 2026–present",
        bullets: ["Run automation and AI implementation projects."],
      },
      {
        role: "Co-Founder & Brand Architect",
        org: "MAS Prints",
        loc: "Iceland · hybrid",
        dates: "Feb 2026–present",
        bullets: [
          "Launched the brand and website of a print brokerage for Icelandic businesses, with a pre-flight check of print files.",
          "Run B2B outreach, contract negotiation and print-spend audits; built the Meta Ads lead generation.",
        ],
      },
      {
        role: "Partner & Technical Lead",
        org: "Mountain Car Rental",
        loc: "Iceland · hybrid",
        dates: "Feb 2026–present",
        bullets: [
          "Rebuilt the mountaincar.is front end with AI-assisted development; own the technical side of every digital channel.",
          "Set up a network of 9 local partner businesses with reciprocal discounts (garage.mountaincar.is).",
        ],
      },
      {
        role: "Partner & Systems Architect",
        org: "MAS Parts",
        loc: "Iceland · hybrid",
        dates: "Jan 2026–present",
        bullets: [
          "Built the B2B operations platform: price calculators per product line, a 13-stage quote-to-order pipeline, commissions and role-based access. The sales team uses it in the field as a mobile app.",
          "Built the order system (Google Apps Script, Twilio, email) that runs a 16-step logistics workflow with SMS reminders, status tracking and team alerts across Poland and Iceland.",
          "Sell B2B to Icelandic garages and rental companies; run the Meta Ads and printed marketing.",
        ],
      },
      {
        role: "Applied AI Engineer",
        org: "Independent",
        loc: "Remote",
        dates: "Jan 2024–present",
        bullets: [
          "Build every system in this CV with AI coding agents writing the code; own the spec, architecture, review, deployment and upkeep.",
          "Run a personal agent runtime: 41 scheduled tasks and about 140 skill definitions across two runtimes.",
          "Built voice agents on Twilio and the OpenAI Realtime API, WhatsApp bots, MCP servers and RAG pipelines.",
        ],
      },
      {
        role: "Founder & Product Lead",
        org: "Reykjawwwik, web & design agency",
        loc: "Remote / Iceland",
        dates: "Sep 2023–present",
        bullets: [
          "Built a SaaS platform: a pricing engine for 10 markets with geo-detection, a lead-to-contract CRM and PDF contracts with per-country VAT.",
          "Design the systems, direct developers and run sales; client builds in car rental, tours and beauty.",
        ],
      },
      {
        role: "Founder",
        org: "Flyt",
        loc: "Iceland",
        dates: "2023–present",
        bullets: [
          "Launched a freight and group-import marketplace: carriers bid on deliveries, pooled container campaigns with deposits and refunds, EU import quotes and a live revenue dashboard.",
        ],
      },
      {
        role: "Co-Founder",
        org: "QuickFix Iceland",
        loc: "Reykjavík",
        dates: "2022–present",
        bullets: [
          "Shipped the multilingual (EN / PL / IS) site and lead funnel for a handyman brand; brand and sales flow live in 72 hours.",
        ],
      },
      {
        role: "Founder",
        org: "MySpiritWay, content & community brand",
        loc: "Online",
        dates: "2010–present",
        bullets: [
          "Built a content and community brand around a self-authored practical guide: two published books, a third in progress; YouTube, TikTok, Instagram, Facebook; live events for groups of 100+.",
        ],
      },
      {
        role: "Full-Stack Developer",
        org: "Ekomoc, freelance",
        loc: "Remote",
        dates: "2024",
        bullets: [
          "Built a CRM for energy-audit sales teams in Poland's Clean Air grant programme: a 9-step order pipeline with role-based access for sales reps, auditors and admins.",
          "Automated DOCX/PDF grant applications; added a map view, push notifications and a sales leaderboard.",
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
        role: "Shift Manager",
        org: "Krónan",
        loc: "Iceland",
        dates: "2018–2019",
        bullets: [
          "Ran store shifts: scheduling and team, customer service and complaints, orders and deliveries, in-store marketing.",
        ],
      },
      {
        role: "Owner",
        org: "mobilUP, marketing agency",
        loc: "Rzeszów, Poland",
        dates: "2015–2017",
        bullets: [
          "Ran a marketing and advertising agency: client acquisition and retention, campaigns, websites and social media, accounting.",
        ],
      },
      {
        role: "Chairman of the Supervisory Board",
        org: "Fundacja SpiritWay, non-profit",
        loc: "Rzeszów, Poland",
        dates: "2015–2018",
        bullets: [
          "Led the foundation: brand and social media, HR, programmes, public representation.",
        ],
      },
      {
        role: "Earlier roles in sales, marketing and operations",
        org: "Poland & Iceland",
        dates: "2013–2017",
        bullets: [
          "Team leader (MLM / FM, about 50 people), call-centre sales representative (loans and insurance), marketing department manager (Well Moda); earlier work in content, distribution, retail and hospitality.",
        ],
      },
    ],
    education: [
      { label: "Boot.dev:", body: "Python, SQL, Git (in progress)." },
      {
        label: "Code reading:",
        body: "daily predict-then-verify practice with a public log, on a self-built training platform (github.com/kamiljan11/code-reading-quest): every exercise executed and verified before it is shown, spaced repetition, curriculum updated from real job listings.",
      },
    ],
    languages: [
      { label: "Languages:", body: "Polish (native); English (C1)." },
      { label: "Work eligibility:", body: "EU / EEA (Polish citizen, based in Iceland)." },
      { label: "Timezone:", body: "GMT / UTC. Overlaps both European and US-East working hours." },
      { label: "Driving licence:", body: "B." },
    ],
    openTo:
      "AI automation & implementation engineer · AI solutions engineer · AI implementation & enablement · Head of AI / Ops / Growth · " +
      "co-founding · advisory · senior contract. Remote-first; open to relocation.",
  },

  pl: {
    download: "Pobierz PDF",
    role: "Inżynier Automatyzacji i Wdrożeń AI · Builder & Operator",
    contact: "Reykjavík, Islandia · Praca zdalna · otwarty na relokację",
    sec: {
      summary: "Podsumowanie",
      skills: "Kluczowe umiejętności",
      experience: "Doświadczenie",
      education: "Nauka i certyfikaty",
      languages: "Języki i inne",
      openTo: "Otwarty na",
    },
    summary:
      "Inżynier automatyzacji i wdrożeń AI. Wdrażanie systemów AI na produkcję w małych i średnich " +
      "firmach, a potem szkolenie zespołu, który je utrzymuje. Praca z agentami AI piszącymi kod, " +
      "przy pełnej odpowiedzialności za specyfikację, architekturę, review, wdrożenie i wsparcie " +
      "klienta. Doświadczenie w sprzedaży i marketingu: własna agencja marketingowa w Polsce, a od " +
      "przeprowadzki na Islandię kilka własnych firm.",
    skills: [
      {
        label: "AI i automatyzacja:",
        body: "API LLM (OpenAI, Claude), structured outputs, agenty AI i workflowy wieloagentowe, serwery MCP, RAG, n8n, REST API i webhooki, OAuth2, agenty głosowe (Twilio, OpenAI Realtime).",
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
        org: "Cetus Pro",
        loc: "Rzeszów · hybrydowo, kontrakt",
        dates: "wrz 2026–obecnie",
        bullets: ["Prowadzenie wdrożeń automatyzacji i AI."],
      },
      {
        role: "Współzałożyciel i Brand Architect",
        org: "MAS Prints",
        loc: "Islandia · hybrydowo",
        dates: "lut 2026–obecnie",
        bullets: [
          "Uruchomienie marki i strony pośrednika druku dla islandzkich firm, z kontrolą plików przed drukiem (pre-flight).",
          "Sprzedaż B2B, negocjacje umów i audyty wydatków na druk; kampanie Meta Ads pozyskujące leady.",
        ],
      },
      {
        role: "Partner i Technical Lead",
        org: "Mountain Car Rental",
        loc: "Islandia · hybrydowo",
        dates: "lut 2026–obecnie",
        bullets: [
          "Przebudowa frontendu mountaincar.is z pomocą AI; techniczna strona wszystkich kanałów cyfrowych firmy.",
          "Sieć 9 lokalnych firm partnerskich z wzajemnymi zniżkami (garage.mountaincar.is).",
        ],
      },
      {
        role: "Partner i Systems Architect",
        org: "MAS Parts",
        loc: "Islandia · hybrydowo",
        dates: "sty 2026–obecnie",
        bullets: [
          "Budowa platformy operacyjnej B2B: kalkulatory cen dla linii produktów, 13-etapowy proces od oferty do zamówienia, prowizje, dostęp według ról. Zespół sprzedaży korzysta z niej w terenie jako z aplikacji mobilnej.",
          "System zamówień (Google Apps Script, Twilio, e-mail) prowadzący 16-etapowy proces logistyczny: przypomnienia SMS, śledzenie statusu, powiadomienia zespołów w Polsce i na Islandii.",
          "Sprzedaż B2B do islandzkich warsztatów i wypożyczalni aut; kampanie Meta Ads i materiały drukowane.",
        ],
      },
      {
        role: "Applied AI Engineer",
        org: "Działalność własna",
        loc: "Zdalnie",
        dates: "sty 2024–obecnie",
        bullets: [
          "Budowa wszystkich systemów z tego CV w modelu, w którym kod piszą agenty AI: specyfikacja, architektura, review, wdrożenie i utrzymanie.",
          "Własne środowisko agentowe: 41 zadań na harmonogramie i ok. 140 definicji skilli w dwóch środowiskach.",
          "Agenty głosowe na Twilio i OpenAI Realtime API, boty WhatsApp, serwery MCP i pipeline'y RAG.",
        ],
      },
      {
        role: "Założyciel i Product Lead",
        org: "Reykjawwwik, agencja web & design",
        loc: "Zdalnie / Islandia",
        dates: "wrz 2023–obecnie",
        bullets: [
          "Budowa platformy SaaS: silnik cenowy na 10 rynków z geolokalizacją, CRM od leada do umowy, umowy PDF z VAT właściwym dla kraju.",
          "Projektowanie systemów, koordynacja deweloperów i sprzedaż; wdrożenia dla klientów z branż wynajmu aut, turystyki i beauty.",
        ],
      },
      {
        role: "Założyciel",
        org: "Flyt",
        loc: "Islandia",
        dates: "2023–obecnie",
        bullets: [
          "Uruchomienie marketplace'u transportu i importu grupowego: przewoźnicy licytują zlecenia, kampanie kontenerowe z depozytem i zwrotem, wyceny importu z UE, panel przychodów na żywo.",
        ],
      },
      {
        role: "Współzałożyciel",
        org: "QuickFix Iceland",
        loc: "Reykjavík",
        dates: "2022–obecnie",
        bullets: [
          "Wielojęzyczna strona (EN / PL / IS) i lejek leadów dla marki usług „złotej rączki”; marka i proces sprzedaży gotowe w 72 godziny.",
        ],
      },
      {
        role: "Założyciel",
        org: "MySpiritWay, marka contentowa i społeczność",
        loc: "Online",
        dates: "2010–obecnie",
        bullets: [
          "Marka contentowa i społeczność wokół autorskiego przewodnika po praktycznej duchowości: dwie wydane książki, trzecia w przygotowaniu; YouTube, TikTok, Instagram, Facebook; wydarzenia na żywo dla grup 100+.",
        ],
      },
      {
        role: "Full-Stack Developer",
        org: "Ekomoc, freelance",
        loc: "Zdalnie",
        dates: "2024",
        bullets: [
          "CRM dla zespołów sprzedaży audytów energetycznych w programie Czyste Powietrze: 9-etapowy proces zamówień z dostępem według ról dla handlowców, audytorów i adminów.",
          "Automatyczne wnioski DOCX/PDF; widok mapy, powiadomienia push i ranking sprzedaży.",
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
        role: "Kierownik zmiany",
        org: "Krónan",
        loc: "Islandia",
        dates: "2018–2019",
        bullets: [
          "Kierowanie zmianą w sklepie: grafik i zespół, obsługa klienta i reklamacje, zamówienia i dostawy, marketing w sklepie.",
        ],
      },
      {
        role: "Właściciel",
        org: "mobilUP, agencja marketingowa",
        loc: "Rzeszów, Polska",
        dates: "2015–2017",
        bullets: [
          "Prowadzenie agencji marketingowo-reklamowej: pozyskiwanie i utrzymanie klientów, kampanie, strony i social media, księgowość.",
        ],
      },
      {
        role: "Przewodniczący Rady Nadzorczej",
        org: "Fundacja SpiritWay, organizacja non-profit",
        loc: "Rzeszów, Polska",
        dates: "2015–2018",
        bullets: [
          "Kierowanie fundacją: marka i social media, HR, rozwój programów, reprezentacja publiczna.",
        ],
      },
      {
        role: "Wcześniejsze role w sprzedaży, marketingu i operacjach",
        org: "Polska i Islandia",
        dates: "2013–2017",
        bullets: [
          "Lider zespołu (MLM / FM, ok. 50 osób), przedstawiciel handlowy w call center (kredyty i ubezpieczenia), kierownik działu marketingu (Well Moda); wcześniej praca w contencie, dystrybucji, handlu i hotelarstwie.",
        ],
      },
    ],
    education: [
      { label: "Boot.dev:", body: "Python, SQL, Git (w trakcie)." },
      {
        label: "Czytanie kodu:",
        body: "codzienna praktyka „przewidź i sprawdź” z publicznym logiem, na własnej platformie treningowej (github.com/kamiljan11/code-reading-quest): każde ćwiczenie uruchomione i zweryfikowane przed publikacją, powtórki rozłożone w czasie, program aktualizowany na podstawie realnych ofert pracy.",
      },
    ],
    languages: [
      { label: "Języki:", body: "polski (ojczysty); angielski (C1)." },
      { label: "Prawo do pracy:", body: "UE / EOG (obywatel Polski, mieszka na Islandii)." },
      {
        label: "Strefa czasowa:",
        body: "GMT / UTC. Pokrywa się z godzinami pracy w Europie i na wschodzie USA.",
      },
      { label: "Prawo jazdy:", body: "kat. B." },
    ],
    openTo:
      "Inżynier automatyzacji i wdrożeń AI · AI solutions engineer · wdrażanie i enablement AI · Head of AI / Ops / Growth · " +
      "współzałożycielstwo · doradztwo · kontrakt senior. Remote-first; otwarty na relokację.",
  },
};
