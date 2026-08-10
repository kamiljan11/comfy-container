import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { type Lang } from "../i18n";

export const Route = createFileRoute("/claude")({
  head: () => ({
    meta: [
      { title: "Kamil Jan — the AI system behind the work" },
      {
        name: "description",
        content:
          "How Kamil Jan actually works with AI: two agent runtimes, prompt-hardening protocols, event-driven quality gates, a secrets vault the model never sees, and scheduled agents that audit the system itself.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/claude" }],
  }),
  component: ClaudePage,
});

/* ── Flags (mirrors the homepage toggle) ── */
function FlagPL() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15" className="flag-svg" aria-hidden="true">
      <rect width="22" height="15" rx="2.5" fill="#fff" />
      <path d="M0 7.5h22V12.5a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 0 12.5V7.5Z" fill="#dc143c" />
    </svg>
  );
}
function FlagGB() {
  return (
    <svg width="22" height="15" viewBox="0 0 60 30" className="flag-svg" aria-hidden="true">
      <clipPath id="gb-r-ai">
        <rect width="60" height="30" rx="5" />
      </clipPath>
      <g clipPath="url(#gb-r-ai)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
}

type Item = { label: string; body: string };
type Section = { title: string; lead?: string; items: Item[] };

type Content = {
  back: string;
  cases: string;
  cv: string;
  title: string;
  role: string;
  intro: string;
  stats: { n: string; label: string }[];
  sections: Section[];
  limitsTitle: string;
  limits: string;
  colophon: string;
};

const CONTENT: Record<Lang, Content> = {
  en: {
    back: "← kamiljan.com",
    cases: "Case studies →",
    cv: "CV →",
    title: "The AI system behind the work",
    role: "Two runtimes, hardened prompts, event-driven quality gates — counted, not estimated",
    intro:
      "My CV says AI coding agents write the code while I own the spec, the review and the deploy. " +
      "That claim deserves evidence, so this page shows the machine itself: what runs, what it enforces, " +
      "and where its limits are. Everything below is live today. Every number was counted on the day this " +
      "page shipped — none of it is an estimate.",
    stats: [
      { n: "2", label: "agent runtimes" },
      { n: "100+", label: "skill definitions" },
      { n: "5", label: "quality hooks" },
      { n: "4", label: "scheduled agents" },
    ],
    sections: [
      {
        title: "Two runtimes, one system",
        items: [
          {
            label: "Claude Code —",
            body:
              "the terminal runtime for repository work: this site, the production apps behind MAS Group, " +
              "Flyt and the garage system, plus their CI. It talks to GitHub, mail, the browser and the " +
              "desktop through MCP servers.",
          },
          {
            label: "Claude Desktop (Cowork) —",
            body:
              "the operations runtime: mail triage, documents, research, outreach, design. Different tools, " +
              "same memory and the same rules.",
          },
          {
            label: "100+ skills —",
            body:
              "versioned instruction packages the system routes tasks to: book typesetting, client pricing, " +
              "brand contexts, systematic debugging, PDF pipelines, SEO. A router picks the pipeline and " +
              "announces it before work starts, so a task hits a tested recipe instead of improvisation.",
          },
          {
            label: "Model routing —",
            body:
              "the strongest model is reserved for hard reasoning; routine tool work and lookups go to " +
              "cheaper tiers. Capacity is a budget, and the system spends it deliberately.",
          },
        ],
      },
      {
        title: "Every prompt is hardened before the model sees it",
        lead: "Three protocols are injected automatically — the model does not get to skip them on a bad day.",
        items: [
          {
            label: "Anti-hallucination (PROMPT-GUARD) —",
            body:
              "ambiguity triggers questions, not execution. Facts require reading the source first — open " +
              "the file, fetch the page, check the schema. “Done” only exists with proof: an exit code, test " +
              "output, an observed result.",
          },
          {
            label: "Anti-sycophancy —",
            body:
              "my own claims get verified before the system agrees with me, and “are you sure?” triggers " +
              "re-derivation from evidence rather than a polite reversal. Reports end with a status: " +
              "VERIFIED, UNVERIFIED or FAILED.",
          },
          {
            label: "Compression (CAVEMAN) —",
            body:
              "reports are what was done, the proof, and what is next. Words get cut; evidence, edge cases " +
              "and risk warnings never do.",
          },
        ],
      },
      {
        title: "Quality is enforced by events, not willpower",
        lead: "Hard gates fire on what happens, not on anyone remembering to check.",
        items: [
          {
            label: "On every file edit —",
            body:
              "lint and typecheck run automatically and errors feed straight back to the agent that made " +
              "the edit, in the same session.",
          },
          {
            label: "On every session end —",
            body: "a stop gate refuses to close a session that leaves tests red.",
          },
          {
            label: "On every commit and push —",
            body:
              "git hooks run lint, typecheck and a zero-dependency secrets scan. A key physically cannot " +
              "be committed. Bypassing the hooks is banned by standing rule.",
          },
          {
            label: "On every push to GitHub —",
            body: "CI repeats the same gates plus a gitleaks scan. Red CI means no merge, no exceptions.",
          },
          {
            label: "Every weekday morning —",
            body:
              "a scheduled agent reviews open pull requests across the fleet like a senior engineer. " +
              "Mechanical fixes land as separate commits with proof attached; design and security findings " +
              "stay comments for me to judge.",
          },
        ],
      },
      {
        title: "Secrets the model never sees",
        items: [
          {
            label: "Self-hosted vault —",
            body:
              "API keys and tokens live in a vault running on my own hardware. A bridge injects them as " +
              "environment variables directly into the target process. Values never appear in chat, code " +
              "or logs — and the commit-time and CI scans exist to keep it that way. The agent can use a " +
              "credential without ever being able to read it.",
          },
        ],
      },
      {
        title: "Agents on a schedule",
        lead: "Four scheduled agents; three run on their own, one is deliberately manual.",
        items: [
          {
            label: "PR reviewer (weekdays) —",
            body: "the senior-review pass described above, across every active repository.",
          },
          {
            label: "CVE watch (monthly) —",
            body:
              "a deterministic dependency scan of the live products first — zero model tokens when clean. " +
              "The model is only woken on findings, fixes are patch/minor only, and they arrive as pull " +
              "requests with evidence, never direct pushes.",
          },
          {
            label: "Guard health (weekly) —",
            body:
              "audits that the quality system itself is still wired: hooks present, gates firing. The " +
              "system checks the system.",
          },
          {
            label: "Repo cleaner (manual only) —",
            body:
              "improvement sweeps run only when I point them at a repository. Automation that could " +
              "“find itself work” is switched off by design.",
          },
        ],
      },
      {
        title: "Memory and self-improvement",
        items: [
          {
            label: "Persistent memory —",
            body:
              "a local knowledge vault is loaded at the start of every session, and sessions document " +
              "themselves when they end. Context survives; nothing depends on me re-explaining.",
          },
          {
            label: "Self-audit loop —",
            body:
              "a recurring audit reads raw session transcripts and proposes a handful of fixes, each with " +
              "cited evidence and a verification command. Only the ones I approve become standing rules.",
          },
          {
            label: "The same method, applied to me —",
            body:
              "my code-reading practice is built like the rest of the system — daily, verified, public: " +
              "github.com/kamiljan11/code-reading-quest.",
          },
        ],
      },
    ],
    limitsTitle: "Honest limits",
    limits:
      "Foundation models via API — I do not train or fine-tune them. There is no formal eval harness yet. " +
      "Reliability is proven at SME scale, not hyperscale. The point of this page is not that the system is " +
      "finished — it is that the failure modes of working with AI are engineered against, in the open, " +
      "instead of being wished away.",
    colophon:
      "This page went through the pipeline it describes: drafted by an agent, pushed through the gates " +
      "above, reviewed and shipped by me.",
  },

  pl: {
    back: "← kamiljan.com",
    cases: "Case studies →",
    cv: "CV →",
    title: "System AI, na którym stoi ta praca",
    role: "Dwa runtime'y, utwardzane prompty, bramki jakości na zdarzeniach — policzone, nie szacowane",
    intro:
      "Moje CV mówi, że kod piszą agenty AI, a ja odpowiadam za specyfikację, review i wdrożenie. " +
      "Takie twierdzenie wymaga dowodu, więc ta strona pokazuje samą maszynę: co działa, co wymusza " +
      "i gdzie leżą jej granice. Wszystko poniżej działa dziś. Każda liczba została policzona w dniu " +
      "publikacji tej strony — żadna nie jest szacunkiem.",
    stats: [
      { n: "2", label: "runtime'y agentowe" },
      { n: "100+", label: "definicji skilli" },
      { n: "5", label: "hooków jakości" },
      { n: "4", label: "agenty na harmonogramie" },
    ],
    sections: [
      {
        title: "Dwa runtime'y, jeden system",
        items: [
          {
            label: "Claude Code —",
            body:
              "runtime terminalowy do pracy na repozytoriach: ta strona, produkcyjne aplikacje MAS Group, " +
              "Flyt i systemu warsztatowego, plus ich CI. Z GitHubem, pocztą, przeglądarką i pulpitem " +
              "rozmawia przez serwery MCP.",
          },
          {
            label: "Claude Desktop (Cowork) —",
            body:
              "runtime operacyjny: triage poczty, dokumenty, research, outreach, projektowanie. Inne " +
              "narzędzia, ta sama pamięć i te same reguły.",
          },
          {
            label: "Ponad 100 skilli —",
            body:
              "wersjonowane pakiety instrukcji, do których system kieruje zadania: skład książek, wyceny " +
              "klienckie, konteksty marek, systematyczny debugging, pipeline'y PDF, SEO. Router dobiera " +
              "pipeline i ogłasza go przed startem — zadanie trafia w przetestowany przepis, nie w improwizację.",
          },
          {
            label: "Routing modeli —",
            body:
              "najmocniejszy model jest rezerwowany na trudne rozumowanie; rutynowa praca narzędziowa i " +
              "wyszukiwania idą do tańszych warstw. Moc obliczeniowa to budżet — i system wydaje go świadomie.",
          },
        ],
      },
      {
        title: "Każdy prompt jest utwardzany, zanim zobaczy go model",
        lead: "Trzy protokoły wstrzykiwane automatycznie — model nie może ich pominąć w gorszy dzień.",
        items: [
          {
            label: "Antyhalucynacyjny (PROMPT-GUARD) —",
            body:
              "niejasność uruchamia pytania, nie wykonanie. Fakt wymaga najpierw źródła — otwórz plik, " +
              "pobierz stronę, sprawdź schemat. „Gotowe” istnieje tylko z dowodem: exit code, wynik testów, " +
              "obejrzany rezultat.",
          },
          {
            label: "Antyprzytakiwanie —",
            body:
              "moje własne twierdzenia są weryfikowane, zanim system się ze mną zgodzi, a „jesteś pewien?” " +
              "uruchamia ponowne wyprowadzenie z dowodów, nie uprzejmą zmianę zdania. Raporty kończą się " +
              "statusem: VERIFIED, UNVERIFIED albo FAILED.",
          },
          {
            label: "Kompresja (CAVEMAN) —",
            body:
              "raport to: co zrobione, dowód i co dalej. Cięte są słowa; dowody, edge case'y i ostrzeżenia " +
              "o ryzyku — nigdy.",
          },
        ],
      },
      {
        title: "Jakość wymuszają zdarzenia, nie silna wola",
        lead: "Twarde bramki odpalają się na tym, co się dzieje — nie na tym, że ktoś pamiętał sprawdzić.",
        items: [
          {
            label: "Po każdej edycji pliku —",
            body:
              "lint i typecheck uruchamiają się automatycznie, a błędy wracają prosto do agenta, który " +
              "edytował — w tej samej sesji.",
          },
          {
            label: "Na koniec każdej sesji —",
            body: "bramka stop odmawia zamknięcia sesji, która zostawia czerwone testy.",
          },
          {
            label: "Przy każdym commicie i pushu —",
            body:
              "hooki gita odpalają lint, typecheck i bezzależnościowy skan sekretów. Klucza fizycznie nie " +
              "da się scommitować. Obchodzenie hooków jest zakazane stałą regułą.",
          },
          {
            label: "Przy każdym pushu na GitHuba —",
            body: "CI powtarza te same bramki plus skan gitleaks. Czerwone CI = brak merge'a, bez wyjątków.",
          },
          {
            label: "W każdy dzień roboczy rano —",
            body:
              "agent z harmonogramu robi review otwartych pull requestów całej floty jak senior. Poprawki " +
              "mechaniczne lądują osobnymi commitami z dowodem; uwagi projektowe i bezpieczeństwa zostają " +
              "komentarzami do mojej decyzji.",
          },
        ],
      },
      {
        title: "Sekrety, których model nigdy nie widzi",
        items: [
          {
            label: "Self-hosted vault —",
            body:
              "klucze API i tokeny żyją w vaulcie na moim własnym sprzęcie. Most wstrzykuje je jako zmienne " +
              "środowiskowe prosto do procesu docelowego. Wartości nigdy nie pojawiają się w czacie, kodzie " +
              "ani logach — a skany przy commicie i w CI pilnują, żeby tak zostało. Agent może użyć " +
              "poświadczenia, nie mogąc go nigdy odczytać.",
          },
        ],
      },
      {
        title: "Agenty na harmonogramie",
        lead: "Cztery agenty; trzy działają same, jeden jest celowo ręczny.",
        items: [
          {
            label: "Recenzent PR (dni robocze) —",
            body: "opisany wyżej przegląd senior-level, po każdym aktywnym repozytorium.",
          },
          {
            label: "Nadzór CVE (co miesiąc) —",
            body:
              "najpierw deterministyczny skan zależności żywych produktów — zero tokenów, gdy czysto. " +
              "Model budzi się tylko przy znaleziskach, poprawki wyłącznie patch/minor i wyłącznie jako " +
              "pull requesty z dowodem, nigdy push na main.",
          },
          {
            label: "Zdrowie strażników (co tydzień) —",
            body:
              "audyt tego, czy system jakości sam jest nadal wpięty: hooki obecne, bramki strzelają. " +
              "System sprawdza system.",
          },
          {
            label: "Sprzątacz repo (tylko ręcznie) —",
            body:
              "przebiegi ulepszające ruszają wyłącznie, gdy wskażę repozytorium. Automatyzacja, która " +
              "mogłaby „znajdować sobie robotę”, jest wyłączona z założenia.",
          },
        ],
      },
      {
        title: "Pamięć i samodoskonalenie",
        items: [
          {
            label: "Pamięć trwała —",
            body:
              "lokalny vault wiedzy ładuje się na starcie każdej sesji, a sesje dokumentują się same przy " +
              "zamknięciu. Kontekst przeżywa; nic nie wisi na tym, że będę tłumaczył od nowa.",
          },
          {
            label: "Pętla samoaudytu —",
            body:
              "cykliczny audyt czyta surowe transkrypty sesji i proponuje kilka poprawek — każdą z " +
              "cytowanym dowodem i komendą weryfikacyjną. Stałymi regułami zostają tylko te, które " +
              "zatwierdzę.",
          },
          {
            label: "Ta sama metoda, zastosowana do mnie —",
            body:
              "moja praktyka czytania kodu jest zbudowana jak reszta systemu — codziennie, weryfikowalnie, " +
              "publicznie: github.com/kamiljan11/code-reading-quest.",
          },
        ],
      },
    ],
    limitsTitle: "Uczciwe granice",
    limits:
      "Modele fundacyjne przez API — nie trenuję ich ani nie fine-tunuję. Nie ma jeszcze formalnego " +
      "harnessu ewaluacyjnego. Niezawodność jest udowodniona w skali MŚP, nie hyperscale. Sensem tej " +
      "strony nie jest to, że system jest skończony — tylko to, że tryby awarii pracy z AI są tu " +
      "obudowane inżynierią, jawnie, zamiast być zaklinane.",
    colophon:
      "Ta strona przeszła przez pipeline, który opisuje: naszkicowana przez agenta, przepchnięta przez " +
      "powyższe bramki, zrecenzowana i wydana przeze mnie.",
  },
};

function ClaudePage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const url = new URLSearchParams(window.location.search).get("lang") as Lang;
    if (url === "en" || url === "pl") return url;
    const saved = localStorage.getItem("kj-lang") as Lang;
    if (saved === "en" || saved === "pl") return saved;
    return navigator.language.startsWith("pl") ? "pl" : "en";
  });

  const toggleLang = () => {
    setLang((l) => {
      const next: Lang = l === "en" ? "pl" : "en";
      if (typeof window !== "undefined") localStorage.setItem("kj-lang", next);
      return next;
    });
  };

  // keep ?lang= in the URL in sync so the choice carries to / and into shared links
  useEffect(() => {
    if (typeof window === "undefined") return;
    const u = new URL(window.location.href);
    if (u.searchParams.get("lang") !== lang) {
      u.searchParams.set("lang", lang);
      window.history.replaceState({}, "", u);
    }
  }, [lang]);

  const c = CONTENT[lang];

  return (
    <div className="cv-page">
      <div className="read-progress" aria-hidden="true" />
      <div className="cv-bar">
        <Link to="/" className="cv-back">
          {c.back}
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/case-studies" className="cv-back">
            {c.cases}
          </Link>
          <Link to="/cv" className="cv-back">
            {c.cv}
          </Link>
          <button
            type="button"
            className="lang-toggle"
            onClick={toggleLang}
            aria-label="Switch language"
          >
            {lang === "en" ? <FlagGB /> : <FlagPL />}
          </button>
        </div>
      </div>

      <article className="cv-paper">
        <header className="cv-head">
          <h1>{c.title}</h1>
          <p className="cv-role">{c.role}</p>
        </header>

        <section className="cv-sec">
          <p>{c.intro}</p>
          <div className="ai-stats" aria-label="System counts">
            {c.stats.map((s) => (
              <div key={s.label} className="ai-stat">
                <span className="ai-stat-n">{s.n}</span>
                <span className="ai-stat-l">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {c.sections.map((sec) => (
          <section className="cv-sec" key={sec.title}>
            <h2>{sec.title}</h2>
            {sec.lead && <p className="ai-lead">{sec.lead}</p>}
            <ul className="cv-list">
              {sec.items.map((it, i) => (
                <li key={i}>
                  <b>{it.label}</b> {it.body}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="cv-sec">
          <h2>{c.limitsTitle}</h2>
          <p>{c.limits}</p>
        </section>

        <p className="ai-colophon">{c.colophon}</p>
      </article>
    </div>
  );
}
