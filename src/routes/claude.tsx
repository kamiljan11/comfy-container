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

type ArchLabels = {
  kamil: string;
  kamilSub: string;
  code: string;
  codeSub1: string;
  codeSub2: string;
  cowork: string;
  coworkSub1: string;
  coworkSub2: string;
  shared: string;
  vault: string;
  vaultSub: string;
  vaultNote1: string;
  vaultNote2: string;
  memory: string;
  memorySub: string;
  memoryNote1: string;
  memoryNote2: string;
  gates: string;
  gatesList: string;
  prod: string[];
  caption: string;
};

type PipeLabels = {
  stages: string[]; // 6
  gates: string[]; // 6
  live: string;
  blocked: string;
  caption: string;
};

type VaultLabels = {
  vault: string;
  vaultSub: string;
  bridge: string;
  bridgeSub: string;
  target: string;
  targetSub: string;
  never: string[]; // 3
  caption: string;
};

type CadenceRow = { name: string; dots: number; freq: string; manual?: boolean };

type Content = {
  back: string;
  cases: string;
  cv: string;
  title: string;
  role: string;
  intro: string;
  stats: { n: string; label: string }[];
  mapTitle: string;
  arch: ArchLabels;
  pipe: PipeLabels;
  vaultFlow: VaultLabels;
  cadence: CadenceRow[];
  sections: Section[];
  gatesSectionTitle: string;
  gatesLead: string;
  gatesItems: Item[];
  vaultSectionTitle: string;
  vaultItems: Item[];
  schedTitle: string;
  schedLead: string;
  schedItems: Item[];
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
      "and where its limits are. Everything below is live today, and every number was produced by a shell " +
      "command on the day this page shipped — counted, not estimated.",
    stats: [
      { n: "1,220", label: "logged agent sessions" },
      { n: "124", label: "skill definitions" },
      { n: "61", label: "secrets in the vault" },
      { n: "63", label: "self-audit reports" },
      { n: "6", label: "gates to production" },
      { n: "4", label: "scheduled agents" },
      { n: "422", label: "lines of standing rules" },
      { n: "2", label: "agent runtimes" },
    ],
    mapTitle: "The whole machine on one map",
    arch: {
      kamil: "KAMIL",
      kamilSub: "spec · architecture · review · deploy",
      code: "Claude Code",
      codeSub1: "repos · CI · production apps",
      codeSub2: "GitHub · browser · mail via MCP",
      cowork: "Claude Desktop (Cowork)",
      coworkSub1: "mail · documents · research",
      coworkSub2: "outreach · design · ops",
      shared: "same rules · same memory",
      vault: "VAULT",
      vaultSub: "61 secrets",
      vaultNote1: "keys injected as env —",
      vaultNote2: "never visible in chat",
      memory: "MEMORY",
      memorySub: "300+ notes",
      memoryNote1: "loaded at session start,",
      memoryNote2: "sessions self-document",
      gates: "GATES",
      gatesList: "lint · types · tests · secret scan · CI · AI review",
      prod: ["MAS Group", "Workshop 3.0", "Flyt", "kamiljan.com", "client sites"],
      caption:
        "Direction flows down, evidence flows back up. Nothing reaches the bottom row without passing the gate band.",
    },
    pipe: {
      stages: ["prompt", "edit", "session end", "commit", "push", "CI"],
      gates: [
        "protocol injected",
        "lint + typecheck",
        "tests must be green",
        "secret scan + lint",
        "pre-push gate",
        "gitleaks + AI review",
      ],
      live: "LIVE",
      blocked:
        "any red result stops the change right there — bypassing the hooks is banned by standing rule",
      caption:
        "The life of a change. Six gates fire on events, not on anyone remembering to check.",
    },
    vaultFlow: {
      vault: "VAULT",
      vaultSub: "61 secrets · self-hosted",
      bridge: "BRIDGE",
      bridgeSub: "injects as env vars",
      target: "TARGET PROCESS",
      targetSub: "deploy · API call · CI",
      never: ["chat ✕", "code ✕", "logs ✕"],
      caption: "The agent can use a credential it can never read.",
    },
    cadence: [
      { name: "PR reviewer", dots: 5, freq: "weekday mornings" },
      { name: "Guard health", dots: 1, freq: "weekly" },
      { name: "CVE watch", dots: 1, freq: "monthly" },
      { name: "Repo cleaner", dots: 0, freq: "manual only", manual: true },
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
            label: "124 skills —",
            body:
              "versioned instruction packages the system routes tasks to: book typesetting, client pricing, " +
              "brand contexts, systematic debugging, PDF pipelines, SEO. That count is the coding runtime " +
              "alone, on the day this page shipped; the desktop runtime carries its own set on top. A router " +
              "picks the pipeline and announces it before work starts, so a task hits a tested recipe " +
              "instead of improvisation.",
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
    ],
    gatesSectionTitle: "Quality is enforced by events, not willpower",
    gatesLead: "Hard gates fire on what happens, not on anyone remembering to check.",
    gatesItems: [
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
        label: "Before “done” —",
        body:
          "seven review plugins are wired in, four of them Trail of Bits security suites: differential " +
          "review, insecure defaults, supply-chain risk, agentic-actions audit. Significant changes get " +
          "an adversarial pass, not a vibe check.",
      },
    ],
    vaultSectionTitle: "Secrets the model never sees",
    vaultItems: [
      {
        label: "Self-hosted vault —",
        body:
          "61 API keys, tokens and logins live in a vault running on my own hardware. A bridge injects " +
          "them as environment variables directly into the target process. Values never appear in chat, " +
          "code or logs — and the commit-time and CI scans exist to keep it that way.",
      },
    ],
    schedTitle: "Agents on a schedule",
    schedLead: "Four scheduled agents; three run on their own, one is deliberately manual.",
    schedItems: [
      {
        label: "PR reviewer (weekdays) —",
        body:
          "reviews open pull requests across the fleet like a senior engineer. Mechanical fixes land " +
          "as separate commits with proof attached; design and security findings stay comments for me " +
          "to judge.",
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
    limitsTitle: "Honest limits",
    limits:
      "Foundation models via API — I do not train or fine-tune them. There is no formal eval harness yet. " +
      "Reliability is proven at SME scale, not hyperscale. The point of this page is not that the system is " +
      "finished — it is that the failure modes of working with AI are engineered against, in the open, " +
      "instead of being wished away.",
    colophon:
      "This page went through the pipeline it describes: drafted by an agent, pushed through the gates " +
      "above, reviewed and shipped by me. The numbers came from shell commands, not from memory.",
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
      "i gdzie leżą jej granice. Wszystko poniżej działa dziś, a każdą liczbę wyprodukowała komenda " +
      "shellowa w dniu publikacji — policzone, nie szacowane.",
    stats: [
      { n: "1220", label: "zapisanych sesji agentów" },
      { n: "124", label: "definicje skilli" },
      { n: "61", label: "sekretów w vaulcie" },
      { n: "63", label: "raporty samoaudytu" },
      { n: "6", label: "bramek do produkcji" },
      { n: "4", label: "agenty na harmonogramie" },
      { n: "422", label: "linie stałych reguł" },
      { n: "2", label: "runtime'y agentowe" },
    ],
    mapTitle: "Cała maszyna na jednej mapie",
    arch: {
      kamil: "KAMIL",
      kamilSub: "spec · architektura · review · wdrożenie",
      code: "Claude Code",
      codeSub1: "repozytoria · CI · produkcja",
      codeSub2: "GitHub · przeglądarka · mail (MCP)",
      cowork: "Claude Desktop (Cowork)",
      coworkSub1: "poczta · dokumenty · research",
      coworkSub2: "outreach · design · operacje",
      shared: "te same reguły · ta sama pamięć",
      vault: "VAULT",
      vaultSub: "61 sekretów",
      vaultNote1: "klucze idą jako env —",
      vaultNote2: "nigdy nie ma ich w czacie",
      memory: "PAMIĘĆ",
      memorySub: "300+ notatek",
      memoryNote1: "ładowana na starcie sesji,",
      memoryNote2: "sesje dokumentują się same",
      gates: "BRAMKI",
      gatesList: "lint · typy · testy · skan sekretów · CI · AI review",
      prod: ["MAS Group", "Workshop 3.0", "Flyt", "kamiljan.com", "strony klientów"],
      caption:
        "Kierunek płynie w dół, dowody wracają w górę. Nic nie dociera do dolnego rzędu bez przejścia pasa bramek.",
    },
    pipe: {
      stages: ["prompt", "edycja", "koniec sesji", "commit", "push", "CI"],
      gates: [
        "protokół w prompt",
        "lint + typecheck",
        "testy = zielone",
        "skan sekretów + lint",
        "bramka pre-push",
        "gitleaks + AI review",
      ],
      live: "LIVE",
      blocked:
        "każdy czerwony wynik zatrzymuje zmianę w tym miejscu — obchodzenie hooków jest zakazane stałą regułą",
      caption:
        "Życie jednej zmiany. Sześć bramek odpala się na zdarzeniach, nie na czyjejś pamięci.",
    },
    vaultFlow: {
      vault: "VAULT",
      vaultSub: "61 sekretów · self-hosted",
      bridge: "MOST",
      bridgeSub: "wstrzykuje jako zmienne env",
      target: "PROCES DOCELOWY",
      targetSub: "deploy · wywołanie API · CI",
      never: ["czat ✕", "kod ✕", "logi ✕"],
      caption: "Agent może użyć poświadczenia, którego nigdy nie może odczytać.",
    },
    cadence: [
      { name: "Recenzent PR", dots: 5, freq: "dni robocze rano" },
      { name: "Zdrowie strażników", dots: 1, freq: "co tydzień" },
      { name: "Nadzór CVE", dots: 1, freq: "co miesiąc" },
      { name: "Sprzątacz repo", dots: 0, freq: "tylko ręcznie", manual: true },
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
            label: "124 skille —",
            body:
              "wersjonowane pakiety instrukcji, do których system kieruje zadania: skład książek, wyceny " +
              "klienckie, konteksty marek, systematyczny debugging, pipeline'y PDF, SEO. Ta liczba to sam " +
              "runtime kodowy, policzony w dniu publikacji; runtime desktopowy ma na wierzchu własny " +
              "zestaw. Router dobiera pipeline i ogłasza go przed startem — zadanie trafia w przetestowany " +
              "przepis, nie w improwizację.",
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
    ],
    gatesSectionTitle: "Jakość wymuszają zdarzenia, nie silna wola",
    gatesLead:
      "Twarde bramki odpalają się na tym, co się dzieje — nie na tym, że ktoś pamiętał sprawdzić.",
    gatesItems: [
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
        label: "Zanim padnie „gotowe” —",
        body:
          "wpięte jest siedem pluginów review, w tym cztery pakiety bezpieczeństwa Trail of Bits: " +
          "differential review, insecure defaults, supply-chain risk, audyt akcji agentowych. Istotna " +
          "zmiana dostaje przejście adwersaryjne, nie „na oko”.",
      },
    ],
    vaultSectionTitle: "Sekrety, których model nigdy nie widzi",
    vaultItems: [
      {
        label: "Self-hosted vault —",
        body:
          "61 kluczy API, tokenów i loginów żyje w vaulcie na moim własnym sprzęcie. Most wstrzykuje je " +
          "jako zmienne środowiskowe prosto do procesu docelowego. Wartości nigdy nie pojawiają się w " +
          "czacie, kodzie ani logach — a skany przy commicie i w CI pilnują, żeby tak zostało.",
      },
    ],
    schedTitle: "Agenty na harmonogramie",
    schedLead: "Cztery agenty; trzy działają same, jeden jest celowo ręczny.",
    schedItems: [
      {
        label: "Recenzent PR (dni robocze) —",
        body:
          "robi review otwartych pull requestów całej floty jak senior. Poprawki mechaniczne lądują " +
          "osobnymi commitami z dowodem; uwagi projektowe i bezpieczeństwa zostają komentarzami do " +
          "mojej decyzji.",
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
    limitsTitle: "Uczciwe granice",
    limits:
      "Modele fundacyjne przez API — nie trenuję ich ani nie fine-tunuję. Nie ma jeszcze formalnego " +
      "harnessu ewaluacyjnego. Niezawodność jest udowodniona w skali MŚP, nie hyperscale. Sensem tej " +
      "strony nie jest to, że system jest skończony — tylko to, że tryby awarii pracy z AI są tu " +
      "obudowane inżynierią, jawnie, zamiast być zaklinane.",
    colophon:
      "Ta strona przeszła przez pipeline, który opisuje: naszkicowana przez agenta, przepchnięta przez " +
      "powyższe bramki, zrecenzowana i wydana przeze mnie. Liczby pochodzą z komend shellowych, nie z pamięci.",
  },
};

/* ══ Diagram: the whole machine ══ */
function AiArch({ t }: { t: ArchLabels }) {
  const prodW = 128;
  const prodGap = 10;
  const prodX0 = (760 - (t.prod.length * prodW + (t.prod.length - 1) * prodGap)) / 2;
  return (
    <div className="aid-scroll">
      <svg viewBox="0 0 760 392" className="aid" role="img" aria-label={t.caption}>
        <defs>
          <marker
            id="aiar"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 Z" className="aid-arrowhead" />
          </marker>
        </defs>

        {/* Kamil */}
        <rect x="270" y="10" width="220" height="48" rx="9" className="aid-box aid-strong" />
        <text x="380" y="31" textAnchor="middle" className="aid-t">
          {t.kamil}
        </text>
        <text x="380" y="47" textAnchor="middle" className="aid-s">
          {t.kamilSub}
        </text>

        {/* arrows Kamil -> runtimes */}
        <path d="M340 58 L275 92" className="aid-ln" markerEnd="url(#aiar)" />
        <path d="M420 58 L485 92" className="aid-ln" markerEnd="url(#aiar)" />

        {/* runtimes */}
        <rect x="150" y="96" width="210" height="76" rx="9" className="aid-box" />
        <text x="255" y="119" textAnchor="middle" className="aid-t">
          {t.code}
        </text>
        <text x="255" y="138" textAnchor="middle" className="aid-s">
          {t.codeSub1}
        </text>
        <text x="255" y="154" textAnchor="middle" className="aid-s">
          {t.codeSub2}
        </text>

        <rect x="400" y="96" width="210" height="76" rx="9" className="aid-box" />
        <text x="505" y="119" textAnchor="middle" className="aid-t">
          {t.cowork}
        </text>
        <text x="505" y="138" textAnchor="middle" className="aid-s">
          {t.coworkSub1}
        </text>
        <text x="505" y="154" textAnchor="middle" className="aid-s">
          {t.coworkSub2}
        </text>

        {/* shared rules/memory link */}
        <path
          d="M362 134 L398 134"
          className="aid-ln"
          markerEnd="url(#aiar)"
          markerStart="url(#aiar)"
        />
        <text x="380" y="188" textAnchor="middle" className="aid-xs">
          {t.shared}
        </text>

        {/* vault rail */}
        <rect x="16" y="96" width="108" height="56" rx="9" className="aid-box aid-side" />
        <text x="70" y="119" textAnchor="middle" className="aid-t">
          {t.vault}
        </text>
        <text x="70" y="136" textAnchor="middle" className="aid-s">
          {t.vaultSub}
        </text>
        <path d="M124 124 L148 124" className="aid-ln" markerEnd="url(#aiar)" />
        <text x="70" y="168" textAnchor="middle" className="aid-xs">
          {t.vaultNote1}
        </text>
        <text x="70" y="181" textAnchor="middle" className="aid-xs">
          {t.vaultNote2}
        </text>

        {/* memory rail */}
        <rect x="636" y="96" width="108" height="56" rx="9" className="aid-box aid-side" />
        <text x="690" y="119" textAnchor="middle" className="aid-t">
          {t.memory}
        </text>
        <text x="690" y="136" textAnchor="middle" className="aid-s">
          {t.memorySub}
        </text>
        <path
          d="M612 124 L634 124"
          className="aid-ln"
          markerEnd="url(#aiar)"
          markerStart="url(#aiar)"
        />
        <text x="690" y="168" textAnchor="middle" className="aid-xs">
          {t.memoryNote1}
        </text>
        <text x="690" y="181" textAnchor="middle" className="aid-xs">
          {t.memoryNote2}
        </text>

        {/* gates band */}
        <path d="M255 172 L255 208" className="aid-ln" markerEnd="url(#aiar)" />
        <path d="M505 172 L505 208" className="aid-ln" markerEnd="url(#aiar)" />
        <rect x="150" y="212" width="460" height="42" rx="9" className="aid-band" />
        <text x="380" y="230" textAnchor="middle" className="aid-t aid-accent">
          {t.gates}
        </text>
        <text x="380" y="246" textAnchor="middle" className="aid-s">
          {t.gatesList}
        </text>

        {/* to production */}
        <path d="M380 254 L380 290" className="aid-ln" markerEnd="url(#aiar)" />
        {t.prod.map((p, i) => (
          <g key={p}>
            <rect
              x={prodX0 + i * (prodW + prodGap)}
              y="294"
              width={prodW}
              height="36"
              rx="8"
              className="aid-box aid-prod"
            />
            <text
              x={prodX0 + i * (prodW + prodGap) + prodW / 2}
              y="316"
              textAnchor="middle"
              className="aid-s aid-prod-t"
            >
              {p}
            </text>
          </g>
        ))}

        <text x="380" y="368" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: the life of a change ══ */
function AiPipeline({ t }: { t: PipeLabels }) {
  const xs = [60, 168, 280, 396, 508, 616];
  return (
    <div className="aid-scroll">
      <svg viewBox="0 0 760 196" className="aid" role="img" aria-label={t.caption}>
        <defs>
          <marker
            id="aipr"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 Z" className="aid-arrowhead" />
          </marker>
        </defs>
        <path d="M40 62 L664 62" className="aid-ln" markerEnd="url(#aipr)" />
        <rect x="672" y="45" width="66" height="34" rx="8" className="aid-box aid-strong" />
        <text x="705" y="66" textAnchor="middle" className="aid-t aid-accent">
          {t.live}
        </text>

        {xs.map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="62" r="5" className="aid-node" />
            <text x={x} y="42" textAnchor="middle" className="aid-s aid-stage">
              {t.stages[i]}
            </text>
            <path d={`M${x} 70 L${x} 92`} className="aid-ln aid-thin" />
            <rect x={x - 52} y="94" width="104" height="34" rx="7" className="aid-chip" />
            <text x={x} y="109" textAnchor="middle" className="aid-xs aid-chip-t">
              {t.gates[i].split(" + ")[0]}
            </text>
            <text x={x} y="122" textAnchor="middle" className="aid-xs aid-chip-t">
              {t.gates[i].includes(" + ")
                ? "+ " + t.gates[i].split(" + ").slice(1).join(" + ")
                : ""}
            </text>
          </g>
        ))}

        <text x="380" y="158" textAnchor="middle" className="aid-xs aid-red">
          ✕ {t.blocked}
        </text>
        <text x="380" y="184" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: a secret's journey ══ */
function AiVaultFlow({ t }: { t: VaultLabels }) {
  return (
    <div className="aid-scroll">
      <svg viewBox="0 0 760 148" className="aid" role="img" aria-label={t.caption}>
        <defs>
          <marker
            id="aivr"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 Z" className="aid-arrowhead" />
          </marker>
        </defs>
        <rect x="40" y="24" width="160" height="52" rx="9" className="aid-box aid-strong" />
        <text x="120" y="46" textAnchor="middle" className="aid-t">
          {t.vault}
        </text>
        <text x="120" y="63" textAnchor="middle" className="aid-s">
          {t.vaultSub}
        </text>

        <path d="M200 50 L296 50" className="aid-ln" markerEnd="url(#aivr)" />

        <rect x="300" y="24" width="150" height="52" rx="9" className="aid-box" />
        <text x="375" y="46" textAnchor="middle" className="aid-t">
          {t.bridge}
        </text>
        <text x="375" y="63" textAnchor="middle" className="aid-s">
          {t.bridgeSub}
        </text>

        <path d="M450 50 L546 50" className="aid-ln" markerEnd="url(#aivr)" />

        <rect x="550" y="24" width="172" height="52" rx="9" className="aid-box" />
        <text x="636" y="46" textAnchor="middle" className="aid-t">
          {t.target}
        </text>
        <text x="636" y="63" textAnchor="middle" className="aid-s">
          {t.targetSub}
        </text>

        {t.never.map((n, i) => (
          <text
            key={n}
            x={380 + (i - 1) * 110}
            y="106"
            textAnchor="middle"
            className="aid-s aid-red"
          >
            {n}
          </text>
        ))}
        <text x="380" y="134" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Cadence strip ══ */
function AiCadence({ rows }: { rows: CadenceRow[] }) {
  return (
    <div className="cad-grid" role="table" aria-label="Agent cadence">
      {rows.map((r) => (
        <div className="cad-row" role="row" key={r.name}>
          <span className="cad-name">{r.name}</span>
          <span className="cad-dots" aria-hidden="true">
            {r.manual ? (
              <span className="cad-manual">⊘</span>
            ) : (
              Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < r.dots ? "cad-dot" : "cad-dot off"} />
              ))
            )}
          </span>
          <span className="cad-freq">{r.freq}</span>
        </div>
      ))}
    </div>
  );
}

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
          <div className="ai-stats ai-stats-8" aria-label="System counts">
            {c.stats.map((s) => (
              <div key={s.label} className="ai-stat">
                <span className="ai-stat-n">{s.n}</span>
                <span className="ai-stat-l">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-sec">
          <h2>{c.mapTitle}</h2>
          <AiArch t={c.arch} />
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
          <h2>{c.gatesSectionTitle}</h2>
          <p className="ai-lead">{c.gatesLead}</p>
          <AiPipeline t={c.pipe} />
          <ul className="cv-list">
            {c.gatesItems.map((it, i) => (
              <li key={i}>
                <b>{it.label}</b> {it.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{c.vaultSectionTitle}</h2>
          <AiVaultFlow t={c.vaultFlow} />
          <ul className="cv-list">
            {c.vaultItems.map((it, i) => (
              <li key={i}>
                <b>{it.label}</b> {it.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{c.schedTitle}</h2>
          <p className="ai-lead">{c.schedLead}</p>
          <AiCadence rows={c.cadence} />
          <ul className="cv-list">
            {c.schedItems.map((it, i) => (
              <li key={i}>
                <b>{it.label}</b> {it.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{lang === "en" ? "Memory and self-improvement" : "Pamięć i samodoskonalenie"}</h2>
          <ul className="cv-list">
            {(lang === "en"
              ? [
                  {
                    label: "Persistent memory —",
                    body:
                      "a local knowledge vault — 300+ notes across memory, knowledge and session logs — " +
                      "is loaded at the start of every session, and sessions document themselves when they " +
                      "end. The whole vault is also embedded into a vector index, so past decisions are " +
                      "searchable by meaning, not by filename.",
                  },
                  {
                    label: "Self-audit loop —",
                    body:
                      "a recurring audit reads raw session transcripts and proposes a handful of fixes, " +
                      "each with cited evidence and a verification command. 63 of those reports exist to " +
                      "date; only the fixes I approve become standing rules.",
                  },
                  {
                    label: "The same method, applied to me —",
                    body:
                      "my code-reading practice is built like the rest of the system — daily, verified, " +
                      "public: github.com/kamiljan11/code-reading-quest.",
                  },
                ]
              : [
                  {
                    label: "Pamięć trwała —",
                    body:
                      "lokalny vault wiedzy — ponad 300 notatek pamięci, wiedzy i logów sesji — ładuje " +
                      "się na starcie każdej sesji, a sesje dokumentują się same przy zamknięciu. Całość " +
                      "jest też zembedowana w indeks wektorowy, więc dawne decyzje szuka się po znaczeniu, " +
                      "nie po nazwie pliku.",
                  },
                  {
                    label: "Pętla samoaudytu —",
                    body:
                      "cykliczny audyt czyta surowe transkrypty sesji i proponuje kilka poprawek — każdą " +
                      "z cytowanym dowodem i komendą weryfikacyjną. Takich raportów jest dotąd 63; stałymi " +
                      "regułami zostają tylko te poprawki, które zatwierdzę.",
                  },
                  {
                    label: "Ta sama metoda, zastosowana do mnie —",
                    body:
                      "moja praktyka czytania kodu jest zbudowana jak reszta systemu — codziennie, " +
                      "weryfikowalnie, publicznie: github.com/kamiljan11/code-reading-quest.",
                  },
                ]
            ).map((it, i) => (
              <li key={i}>
                <b>{it.label}</b> {it.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{c.limitsTitle}</h2>
          <p>{c.limits}</p>
        </section>

        <p className="ai-colophon">{c.colophon}</p>
      </article>
    </div>
  );
}
