import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { type Lang } from "../i18n";

export const Route = createFileRoute("/claude")({
  head: () => ({
    meta: [
      { title: "Kamil Jan — Coding Higher Mind: the AI system behind the work" },
      {
        name: "description",
        content:
          "How Kamil Jan actually works with AI, in depth: two agent runtimes, prompt hardening, event-driven quality gates, reviewer departments with fresh context, a scar-to-gate learning loop, routines, and the VERIFIED / UNVERIFIED / FAILED protocol. Open source.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/claude" }],
  }),
  component: ClaudePage,
});

const REPO_URL = "https://github.com/kamiljan11/coding-higher-mind";

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

type MindBranch = { title: string; leaves: string[] };
type MindLabels = { center: string; centerSub: string; branches: MindBranch[]; caption: string }; // 8 branches

type PipeLabels = {
  stages: string[]; // 8
  gates: string[]; // 8
  live: string;
  blocked: string;
  caption: string;
};

type ReviewLabels = {
  orchestrator: string;
  gates: string;
  gatesSub: string;
  finders: string[]; // 4 boxes
  aggregate: string;
  aggregateSub: string;
  verifier: string;
  verifierSub: string;
  fixer: string;
  rule: string;
  caption: string;
};

type LoopLabels = { steps: string[]; caption: string }; // 6 steps

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
  repoCta: string;
  stats: { n: string; label: string }[];
  mapTitle: string;
  arch: ArchLabels;
  mindTitle: string;
  mindLead: string;
  mind: MindLabels;
  ideasTitle: string;
  ideas: Item[];
  pipeTitle: string;
  pipeLead: string;
  pipe: PipeLabels;
  gatesItems: Item[];
  tierTitle: string;
  tierLead: string;
  tiers: Item[];
  reviewTitle: string;
  reviewLead: string;
  review: ReviewLabels;
  reviewItems: Item[];
  loopTitle: string;
  loopLead: string;
  loop: LoopLabels;
  loopItems: Item[];
  sections: Section[];
  statusTitle: string;
  statusLead: string;
  statusItems: Item[];
  statusCoworkLabel: string;
  statusCowork: string;
  vaultSectionTitle: string;
  vaultFlow: VaultLabels;
  vaultItems: Item[];
  schedTitle: string;
  schedLead: string;
  cadence: CadenceRow[];
  schedItems: Item[];
  memTitle: string;
  memItems: Item[];
  scaleTitle: string;
  scaleItems: Item[];
  installTitle: string;
  installLead: string;
  installSteps: string[];
  installItems: Item[];
  installLink: string;
  limitsTitle: string;
  limits: string;
  colophon: string;
};

const CONTENT: Record<Lang, Content> = {
  en: {
    back: "← kamiljan.com",
    cases: "Case studies →",
    cv: "CV →",
    title: "Coding Higher Mind — the AI system behind the work",
    role: "Two runtimes, hardened prompts, event-driven gates, reviewer departments, a learning loop — counted, not estimated. Now open source.",
    intro:
      "My CV says AI coding agents write the code while I own the spec, the review and the deploy. That claim deserves " +
      "evidence, so this page shows the machine itself, in depth: what runs in the background, what it enforces, how it " +
      "learns from its own failures, and where its limits are. Everything below is live today, and every number was " +
      "produced by a shell command on the day this page shipped — counted, not estimated. The whole system is published " +
      "as a repository you can install on your own machine in five minutes.",
    repoCta: "github.com/kamiljan11/coding-higher-mind →",
    stats: [
      { n: "1,873", label: "logged agent sessions" },
      { n: "149", label: "scars turned into gates" },
      { n: "23", label: "hard stops in the git gates" },
      { n: "9", label: "reviewer departments" },
      { n: "51", label: "zero-token tools" },
      { n: "40", label: "routines (5 code · 35 desktop)" },
      { n: "31", label: "repos under strict protection" },
      { n: "95", label: "secrets the model never sees" },
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
      vaultSub: "95 secrets",
      vaultNote1: "keys injected as env —",
      vaultNote2: "never visible in chat",
      memory: "MEMORY",
      memorySub: "1,900+ notes",
      memoryNote1: "loaded at session start,",
      memoryNote2: "sessions self-document",
      gates: "GATES",
      gatesList: "prompt · edit · command · stop · commit · push · CI · review · production proof",
      prod: ["MAS Group", "Workshop 3.0", "Flyt", "kamiljan.com", "client sites"],
      caption:
        "Direction flows down, evidence flows back up. Nothing reaches the bottom row without passing the gate band.",
    },
    mindTitle: "Mind map — what „higher mind” is made of",
    mindLead:
      "PG (PROMPT-GUARD) is the system that sits above every coding session. The name comes from my other long project, " +
      "a free guidebook on practical spirituality: practice over belief. A rule you intend to follow is a belief; a gate " +
      "that fires on an event is a practice.",
    mind: {
      center: "HIGHER MIND",
      centerSub: "PG · PROMPT-GUARD",
      branches: [
        {
          title: "Prompt layer",
          leaves: ["protocol on every prompt", "compressed reports", "skill router"],
        },
        {
          title: "Event hooks",
          leaves: ["edit → lint + types", "command guard", "stop gate: tier from diff"],
        },
        {
          title: "Git gates",
          leaves: [
            "secrets · base freshness",
            "deps · duplicates · TODO ledger",
            "SQL lint · boundaries",
          ],
        },
        {
          title: "Reviewer departments",
          leaves: ["code · security · data · ops", "ux · product · qa", "verifier · catfish"],
        },
        {
          title: "Doctrine",
          leaves: ["design before code", "definition of done per tier", "149 scars"],
        },
        {
          title: "Repo template",
          leaves: ["CI + mutation testing", "parsed boundaries", "QA matrix · privacy · runbook"],
        },
        {
          title: "Routines",
          leaves: [
            "PR reviewer · guard health",
            "CVE watch · calibration",
            "watchdog · backup · reports",
          ],
        },
        {
          title: "Self-tests",
          leaves: ["every gate blocks its case", "rule → gate coverage", "weekly audit"],
        },
      ],
      caption: "Eight branches, one rule: nothing important lives only in prose.",
    },
    ideasTitle: "Three ideas the whole thing rests on",
    ideas: [
      {
        label: "Gates, not prose —",
        body:
          "the audit that started this found every rule written as text broken at scale: 0 architecture decision " +
          "records in 6 of 7 repos, changelog 105 commits behind, code review invoked in 2.5 % of sessions, 79 % of " +
          "commits straight to main. A rule the agent can forget is not a rule, so everything that matters fires on an " +
          "event and has a test proving it blocks its own case. A script checks that every written rule has a gate.",
      },
      {
        label: "Scar → gate —",
        body:
          "149 real failures from the fleet are catalogued with a rule id, and every checklist item cites the scar it " +
          "came from (the Google SRE rule). Postmortems end with a new gate or a new scar — never with “be more careful”.",
      },
      {
        label: "Proof, not prose —",
        body:
          "“done” means a command, an exit code and an observed state. Reports end with VERIFIED, UNVERIFIED or FAILED. " +
          "Agents are measured to overstate success (in one benchmark 75.8 % of reported successes had no evidence) and " +
          "to fold under pushback — the status line is the counterweight.",
      },
    ],
    pipeTitle: "The life of one change",
    pipeLead:
      "Nine gates fire on events, not on anyone remembering to check. Any red result stops the change right there.",
    pipe: {
      stages: [
        "prompt",
        "edit",
        "command",
        "session end",
        "commit",
        "push",
        "CI",
        "merge",
        "production",
      ],
      gates: [
        "protocol injected",
        "lint + typecheck",
        "guard blocks + no-verify",
        "tier + tests + reviewers",
        "18 checks + secrets",
        "no main + size + cycles",
        "quality + mutation + gitleaks",
        "current merge-ref only",
        "200 from real domain",
      ],
      live: "LIVE",
      blocked:
        "every escape hatch is a named variable (ALLOW_…=1), logged and reported in the weekly audit — bypassing the hooks is banned by standing rule",
      caption: "Nine gates on the path of a change; the human decides, the gates remember.",
    },
    gatesItems: [
      {
        label: "On every prompt —",
        body:
          "a hook injects the protocol: ambiguity triggers questions, not execution; facts need a source opened first; " +
          "a blocker goes in the first line of the report, and “how is it going?” never gets the answer “fine” — it gets " +
          "goal, budget, risks and the decisions that are the sponsor’s to make.",
      },
      {
        label: "On every file edit, also edits made through the shell —",
        body: "lint and typecheck run on the changed file and errors return to the agent that made the edit, in the same session.",
      },
      {
        label: "On every shell command —",
        body:
          "a guard blocks --no-verify, force-push, hard resets, recursive deletes outside build folders, merging pull " +
          "requests from a script, secrets typed into a command line and curl-piped-to-shell.",
      },
      {
        label: "On every session end —",
        body:
          "the stop gate computes the risk tier from the diff (paths and size, never the prompt), runs lint, types and " +
          "tests on everything that changed, and refuses to close a T2+ session without the required reviewer departments.",
      },
      {
        label: "On every commit —",
        body:
          "18 hard stops: conventional message; secret scan; base freshness (a clone on an unrelated history is blocked); " +
          "duplicate literals in new code; a new dependency must exist on npm or PyPI and not be one typo away from a " +
          "popular package; commented-out code; a new TODO without a ledger row; a personal-data column without a privacy " +
          "inventory row; SQL migration lint (row-level security with both USING and WITH CHECK, definer hygiene, tenant " +
          "foreign keys); GitHub’s own workflow parser on workflow files; a removed security step in CI.",
      },
      {
        label: "On every push —",
        body:
          "no direct push to main; more than 400 source lines is split; a new import cycle or an import against the layers " +
          "declared in the architecture document is blocked; a branch someone else committed to in the last 24 hours " +
          "gets a warning.",
      },
      {
        label: "In CI and at merge —",
        body:
          "the same gates plus gitleaks and mutation testing on the changed files (a test that kills no mutant is theatre); " +
          "31 repositories have strict branch protection generated from the workflow job names; a merge script accepts a " +
          "pull request only when its checks ran on the current merge result — because green checks on a stale base once " +
          "broke main in production.",
      },
    ],
    tierTitle: "Risk tier — computed from the diff, never declared",
    tierLead:
      "Proportionality is a gate too: a prototype is not nagged for architecture records, a payments change cannot close without security.",
    tiers: [
      { label: "T0 —", body: "docs, copy, styles, assets: zero-token gates only." },
      { label: "T1 —", body: "an isolated component or utility: code review recommended." },
      {
        label: "T2 —",
        body: "shared logic, API routes, edge functions, dependencies, CI or build config, more than 150 lines: code + ops review required, ux for UI, data for schema.",
      },
      {
        label: "T3 —",
        body: "auth, row-level security and multi-tenancy, payments, secrets, SQL migrations, scheduled jobs, admin, more than 600 lines: code + security + data + ops, then a verifier — the security, data and verifier roles run on the strongest model.",
      },
      {
        label: "Per repository —",
        body: "a tier floor, a lifecycle phase (prototype · poc · mvp · production — promoting to production requires a written production-readiness review in the same commit) and an optional QA URL that makes the QA department mandatory on T3 with a user interface.",
      },
    ],
    reviewTitle: "Review like a software house, not like a chat",
    reviewLead:
      "Departments with fresh context, aggregation in code, a verifier whose only job is to refute.",
    review: {
      orchestrator: "ORCHESTRATOR",
      gates: "0-TOKEN GATES",
      gatesSub: "lint · types · tests · SQL",
      finders: ["code", "security", "data · ops", "ux · product · qa"],
      aggregate: "AGGREGATE",
      aggregateSub: "k-of-n · evidence or dropped",
      verifier: "VERIFIER",
      verifierSub: "reproduce or refute",
      fixer: "FIX + RE-GATE",
      rule: "no chat between agents · a finding without an executed command does not exist",
      caption:
        "Agents never see red lint; the aggregation has no opinion; the verifier is a bug-hunter, not a confirmer.",
    },
    reviewItems: [
      {
        label: "Nine departments —",
        body:
          "code, security, data, ops, ux, product, qa, verifier and catfish. Each is a rubric of at most eight numbered " +
          "rules, each rule with a command to run, a severity policy, a JSON schema and a worked rejected false positive. " +
          "They read only; the main session fixes.",
      },
      {
        label: "Why fresh context —",
        body:
          "the author of code, human or model, does not see its own mistakes. Reviewers start empty, get the diff and the " +
          "task, and never see each other’s findings — agents that discuss converge on the majority even when the " +
          "minority was right.",
      },
      {
        label: "Councils with a catfish —",
        body:
          "architecture decisions go through facts → positions → a mandatory dissenter → aggregation → a decision record. " +
          "Injected dissent is the one intervention shown to cut quiet-agreement failures in agent groups.",
      },
      {
        label: "Calibrated monthly —",
        body:
          "the same defect wrapped two ways (a bare diff, a diff with a persuasive description) is reviewed by six " +
          "fresh reviewers in random order. Disagreement means length or description bias, and a human adjusts the rubric " +
          "— the auditor never edits the instrument it measures.",
      },
    ],
    loopTitle: "Scar → gate — how the system learns",
    loopLead:
      "A failure is not closed when it is fixed; it is closed when it cannot happen again without a script noticing.",
    loop: {
      steps: [
        "incident or repeated correction",
        "postmortem: five whys",
        "scar with a rule id",
        "gate + positive test",
        "rule → gate coverage",
        "weekly audit",
      ],
      caption:
        "The loop feeds itself: the weekly audit finds gates that stopped firing, and that becomes a scar.",
    },
    loopItems: [
      {
        label: "A stale base broke main —",
        body:
          "two pull requests were green, each against its own snapshot of main; merged together they produced an invalid " +
          "workflow on the default branch. Now: merge only when the checks ran on the current merge result, strict " +
          "branch protection on 31 repositories, and a scar with the exact mechanism.",
      },
      {
        label: "A hook that never ran —",
        body:
          "the push gate read its input twice and silently did nothing for six days. Now every git hook has a test that " +
          "runs the whole script with real input, and the weekly audit checks that gates still block their own cases.",
      },
      {
        label: "45 copies of a company identity —",
        body:
          "across 11 files, all of which passed lint, types, tests and review. Now a duplicate-literal gate on added lines: " +
          "the same string three times in two files is a block, with an escape hatch that is logged.",
      },
      {
        label: "A silent fallback on an invoice —",
        body:
          "a “?? default” quietly changed the seller after a profile was removed. Now SILENT-FALLBACK on any field with " +
          "consequences is a blocker in the code review rubric: a missing match must throw a named error.",
      },
    ],
    sections: [
      {
        title: "Two runtimes, one system",
        items: [
          {
            label: "Claude Code —",
            body:
              "the terminal runtime for repository work: this site, the production apps behind MAS Group, Flyt and the " +
              "garage system, plus their CI. It talks to GitHub, mail, the browser and the desktop through MCP servers, " +
              "and it is the runtime where the hooks and git gates apply.",
          },
          {
            label: "Claude Desktop (Cowork) —",
            body:
              "the operations runtime: mail triage, documents, research, outreach, design, and the routines that keep " +
              "the system itself alive. No hooks there, so the protocol travels as text in every prompt.",
          },
          {
            label: "105 skills —",
            body:
              "versioned instruction packages the system routes tasks to: 50 in the coding runtime, 55 on the desktop. A " +
              "router matches the task deterministically and announces the pipeline before work starts.",
          },
          {
            label: "Model routing —",
            body:
              "the strongest model is reserved for hard reasoning and for T3 security, data and verification; routine " +
              "tool work and lookups go to cheaper tiers. Capacity is a budget, and the system spends it deliberately.",
          },
        ],
      },
    ],
    statusTitle:
      "VERIFIED · UNVERIFIED · FAILED — the status line that stops the model from hypnotising you",
    statusLead:
      "Every substantive report ends with one of three words. It is the smallest piece of the system and the one that " +
      "travels best — especially into Claude Cowork, where there are no hooks and the only protection is the prompt.",
    statusItems: [
      {
        label: "VERIFIED —",
        body: "the claim carries its artifact: the command and its exit code, the HTTP status, the test output line, the diff, a screenshot path — quoted, not described.",
      },
      {
        label: "UNVERIFIED —",
        body: "the work was done but the proof is missing: exactly what is missing and how to check it, plus what would change the conclusion. A report with no status line is treated as this.",
      },
      {
        label: "FAILED / BLOCKED —",
        body: "what happened, verbatim, no softening. A blocker — missing access, decision, data, secret, broken tool — goes in the first line of the report, never in a closing section.",
      },
      {
        label: "Why it exists —",
        body:
          "models agree with a user’s wrong claim in about 58 % of pushback cases and predict 61–77 % success while " +
          "achieving 22–35 %. The longer a conversation runs, the more the model mirrors your framing and confidence. " +
          "The status line forces a claim to carry evidence or to admit it has none, and “are you sure?” triggers " +
          "re-derivation from evidence rather than a polite reversal.",
      },
    ],
    statusCoworkLabel: "In Cowork and scheduled tasks —",
    statusCowork:
      "a seven-line verification block is appended to every background prompt: do not assume the prompt is true, " +
      "permission to refuse and report failure, restate claims as neutral questions, no success without evidence, " +
      "attack your own result before reporting, re-derive when challenged, end with the status. The block is in the " +
      "repository, ready to paste.",
    vaultSectionTitle: "Secrets the model never sees",
    vaultFlow: {
      vault: "VAULT",
      vaultSub: "95 secrets · self-hosted",
      bridge: "BRIDGE",
      bridgeSub: "injects as env vars",
      target: "TARGET PROCESS",
      targetSub: "deploy · API call · CI",
      never: ["chat ✕", "code ✕", "logs ✕"],
      caption: "The agent can use a credential it can never read.",
    },
    vaultItems: [
      {
        label: "Self-hosted vault —",
        body:
          "95 API keys, tokens and logins live in a vault on my own hardware. A bridge injects them as environment " +
          "variables directly into the target process. Values never appear in chat, code or logs — the command guard " +
          "blocks a secret typed into a command line, and the commit-time and CI scans keep it that way.",
      },
    ],
    schedTitle: "Routines — the part that runs while nobody is typing",
    schedLead:
      "Five routines in the coding runtime, 35 defined on the desktop, 10 of them enabled. Deterministic script first, model only on findings; anything that could “find itself work” is off by design.",
    cadence: [
      { name: "PR reviewer", dots: 5, freq: "weekday mornings" },
      { name: "Watchdog", dots: 5, freq: "every 2 hours" },
      { name: "Config backup + restore script", dots: 5, freq: "daily" },
      { name: "Sessions → memory notes", dots: 4, freq: "daily / Mon + Thu" },
      { name: "Guard health", dots: 1, freq: "weekly" },
      { name: "Weekly system report", dots: 1, freq: "Sunday" },
      { name: "CVE watch", dots: 1, freq: "monthly" },
      { name: "Reviewer calibration", dots: 1, freq: "monthly" },
      { name: "Self-evolution cycle", dots: 0, freq: "opt-in, off", manual: true },
      { name: "Repo cleaner", dots: 0, freq: "manual only", manual: true },
    ],
    schedItems: [
      {
        label: "PR reviewer (weekdays) —",
        body:
          "reviews open pull requests across the fleet like a senior engineer. Mechanical fixes land as separate commits " +
          "with proof attached; design and security findings stay comments for me to judge.",
      },
      {
        label: "Guard health (weekly) —",
        body:
          "33 deterministic checks that the quality system itself is still wired: hooks registered, gates blocking their " +
          "own cases, which escape hatches were used and why, which routine started and never finished.",
      },
      {
        label: "CVE watch (monthly) —",
        body:
          "a deterministic dependency scan of the live products first — zero model tokens when clean. Fixes are " +
          "patch/minor only and arrive as pull requests with evidence, never direct pushes.",
      },
      {
        label: "Watchdog (every two hours, desktop) —",
        body:
          "finds routines that are overdue or died mid-run, retries, self-heals what it can, pushes a phone notification " +
          "only when it cannot, and resumes work a rate limit interrupted from a checkpoint file.",
      },
      {
        label: "Backup with a restore script (daily, desktop) —",
        body:
          "a full clone of the agent configuration and a generated one-click restore for a new machine. A backup that " +
          "was never restored is not a backup, so the restore script is part of the backup.",
      },
      {
        label: "Self-evolution cycle (opt-in) —",
        body:
          "reads recent transcripts, detects patterns — repeated corrections, repeated tool errors, rules that were " +
          "bypassed — and proposes edits with cited evidence. Only proposals I approve become standing rules.",
      },
    ],
    memTitle: "Memory, telemetry and the retro that rebuilt the system",
    memItems: [
      {
        label: "Persistent memory —",
        body:
          "a local vault of 1,900+ notes is loaded at the start of every session and sessions document themselves when " +
          "they end, so the next one starts from a checkpoint file instead of from scratch.",
      },
      {
        label: "Telemetry, not feelings —",
        body:
          "every gate skip is logged with a reason; 1,873 session transcripts and the git history of 39 repositories are " +
          "mined by scripts: corrections per session, repeated tool errors, fixes within 24 hours of the previous commit " +
          "to the same file, churn hotspots. The numbers decide what becomes a gate.",
      },
      {
        label: "The retro that mattered —",
        body:
          "twelve repair loops in a single session were traced to their causes; three of them were the same defect — the " +
          "system declared a control it physically did not have. The answer was structural: every gate got a positive " +
          "test, and rule-to-gate coverage became a script.",
      },
      {
        label: "The same method, applied to me —",
        body:
          "my code-reading practice is built like the rest of the system — daily, verified, public: " +
          "github.com/kamiljan11/code-reading-quest.",
      },
    ],
    scaleTitle: "Does it hold at scale?",
    scaleItems: [
      {
        label: "The honest answer —",
        body:
          "one function is easy; a 200,000-line system with cross-file dependencies and unwritten architectural " +
          "assumptions is where consistency drifts. So the assumptions are written where a script can read them: the " +
          "architecture document of every repository carries a parsed block of layers and forbidden imports, and the " +
          "push gate blocks a new import cycle or an import against the layers. Old cycles only warn — historical debt is " +
          "never cleaned automatically.",
      },
      {
        label: "Blast radius before edit —",
        body:
          "a changed file imported by more than 40 others is flagged, and the design step before code asks who calls it, " +
          "what else reads the data, and which tier the change lands in.",
      },
      {
        label: "Navigable by a human, not only by a machine —",
        body:
          "the tool index and the system map are generated from the tools’ own headers; a tool without a self-description " +
          "shows up as debt. The criterion for every style decision is one question: can a senior who has never seen the " +
          "repository run it in 15 minutes, find the place to change in 15 minutes and understand why — without reading " +
          "my transcripts?",
      },
    ],
    installTitle: "Install it yourself",
    installLead:
      "The whole system is a public repository, sanitized and portable: Node 20+, git and Claude Code are the only requirements.",
    installSteps: [
      "git clone " + REPO_URL + ".git",
      "node install.mjs --dry-run   # shows the plan, touches nothing",
      "node install.mjs --yes       # copies into ~/.claude, merges hooks, appends the CLAUDE.md block, wires git hooks",
    ],
    installItems: [
      {
        label: "What the installer promises —",
        body:
          "it never overwrites a file you changed (differing versions land next to yours), it merges rather than replaces " +
          "your settings, it appends the rules between markers so updates replace only that block, git hooks are opt-in, " +
          "and it ends with a self-test — green output is the proof, not the installer’s word.",
      },
      {
        label: "What you get —",
        body:
          "7 hooks, 3 git gates, 32 tools with 10 test suites, 9 reviewer departments, the doctrine with 149 scars, a repo " +
          "template with CI and parsed boundary blocks, 4 coding routines and 7 desktop routines, an uninstaller, and docs " +
          "with the diagrams from this page.",
      },
      {
        label: "One honest note —",
        body:
          "the system speaks Polish today (hook messages, rubrics, doctrine). Everything is plain text; an English pass is " +
          "the first roadmap item. The installer, the README and the docs are in English.",
      },
    ],
    installLink: "Open the repository →",
    limitsTitle: "Honest limits",
    limits:
      "Foundation models via API — I do not train or fine-tune them. Reliability is proven at SME scale (dozens of " +
      "repositories, one owner), not hyperscale. Reviewer departments cost tokens — roughly four times one review for T2 " +
      "and eight to ten for T3 — which is why zero-token gates run first. Some gates depend on the repository having what " +
      "they check, and skip with a logged reason when it does not. The point of this page is not that the system is " +
      "finished — it is that the failure modes of working with AI are engineered against, in the open, instead of being " +
      "wished away.",
    colophon:
      "This page went through the pipeline it describes: drafted by an agent, pushed through the gates above, reviewed " +
      "and shipped by me. The numbers came from shell commands on the day it shipped, not from memory.",
  },

  pl: {
    back: "← kamiljan.com",
    cases: "Case studies →",
    cv: "CV →",
    title: "Coding Higher Mind — system AI, na którym stoi ta praca",
    role: "Dwa runtime'y, utwardzane prompty, bramki na zdarzeniach, działy recenzentów, pętla uczenia — policzone, nie szacowane. Od dziś open source.",
    intro:
      "Moje CV mówi, że kod piszą agenty AI, a ja odpowiadam za specyfikację, review i wdrożenie. Takie twierdzenie " +
      "wymaga dowodu, więc ta strona pokazuje samą maszynę, w głąb: co działa w tle, co wymusza, jak uczy się na " +
      "własnych błędach i gdzie leżą jej granice. Wszystko poniżej działa dziś, a każdą liczbę wyprodukowała komenda " +
      "shellowa w dniu publikacji — policzone, nie szacowane. Cały system jest opublikowany jako repozytorium, które " +
      "instalujesz u siebie w pięć minut.",
    repoCta: "github.com/kamiljan11/coding-higher-mind →",
    stats: [
      { n: "1873", label: "zapisanych sesji agentów" },
      { n: "149", label: "blizny zamienione w bramki" },
      { n: "23", label: "twarde stopy w bramkach gita" },
      { n: "9", label: "działów recenzentów" },
      { n: "51", label: "narzędzi 0-tokenowych" },
      { n: "40", label: "rutyn (5 code · 35 desktop)" },
      { n: "31", label: "repo pod ścisłą ochroną" },
      { n: "95", label: "sekretów, których model nie widzi" },
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
      vaultSub: "95 sekretów",
      vaultNote1: "klucze idą jako env —",
      vaultNote2: "nigdy nie ma ich w czacie",
      memory: "PAMIĘĆ",
      memorySub: "1900+ notatek",
      memoryNote1: "ładowana na starcie sesji,",
      memoryNote2: "sesje dokumentują się same",
      gates: "BRAMKI",
      gatesList:
        "prompt · edycja · komenda · stop · commit · push · CI · review · dowód z produkcji",
      prod: ["MAS Group", "Workshop 3.0", "Flyt", "kamiljan.com", "strony klientów"],
      caption:
        "Kierunek płynie w dół, dowody wracają w górę. Nic nie dociera do dolnego rzędu bez przejścia pasa bramek.",
    },
    mindTitle: "Mapa myśli — z czego składa się „wyższy umysł”",
    mindLead:
      "PG (PROMPT-GUARD) to system, który stoi ponad każdą sesją kodowania. Nazwa pochodzi od mojego drugiego długiego " +
      "projektu, darmowego przewodnika po praktycznej duchowości: praktyka ponad przekonanie. Reguła, której zamierzasz " +
      "przestrzegać, to przekonanie; bramka, która odpala się na zdarzeniu, to praktyka.",
    mind: {
      center: "WYŻSZY UMYSŁ",
      centerSub: "PG · PROMPT-GUARD",
      branches: [
        {
          title: "Warstwa promptu",
          leaves: ["protokół w każdym prompcie", "skompresowane raporty", "router skilli"],
        },
        {
          title: "Hooki na zdarzeniach",
          leaves: ["edycja → lint + typy", "strażnik komend", "bramka stop: tier z diffu"],
        },
        {
          title: "Bramki gita",
          leaves: [
            "sekrety · świeżość bazy",
            "zależności · duplikaty · rejestr TODO",
            "lint SQL · granice",
          ],
        },
        {
          title: "Działy recenzentów",
          leaves: ["code · security · data · ops", "ux · product · qa", "weryfikator · catfish"],
        },
        {
          title: "Doktryna",
          leaves: ["projekt przed kodem", "definition of done per tier", "149 blizny"],
        },
        {
          title: "Szablon repo",
          leaves: [
            "CI + testy mutacyjne",
            "parsowane granice",
            "matryca QA · prywatność · runbook",
          ],
        },
        {
          title: "Rutyny",
          leaves: [
            "recenzent PR · zdrowie strażników",
            "nadzór CVE · kalibracja",
            "watchdog · backup · raporty",
          ],
        },
        {
          title: "Samotesty",
          leaves: [
            "każda bramka blokuje swój przypadek",
            "pokrycie reguła → bramka",
            "cotygodniowy audyt",
          ],
        },
      ],
      caption: "Osiem gałęzi, jedna zasada: nic ważnego nie żyje wyłącznie w prozie.",
    },
    ideasTitle: "Trzy idee, na których stoi całość",
    ideas: [
      {
        label: "Bramki, nie proza —",
        body:
          "audyt, od którego to się zaczęło, wykazał, że każda reguła zapisana tekstem była łamana na skalę: 0 rekordów " +
          "decyzji architektonicznych w 6 z 7 repo, changelog 105 commitów za, code review w 2,5 % sesji, 79 % commitów " +
          "prosto na main. Reguła, którą agent może zapomnieć, nie jest regułą — więc wszystko, co ważne, odpala się na " +
          "zdarzeniu i ma test dowodzący, że blokuje swój przypadek. Skrypt sprawdza, czy każda zapisana reguła ma bramkę.",
      },
      {
        label: "Blizna → bramka —",
        body:
          "149 realne awarie floty są skatalogowane z identyfikatorem reguły, a każdy punkt checklisty cytuje bliznę, z " +
          "której powstał (reguła Google SRE). Postmortem kończy się nową bramką albo nową blizną — nigdy „będziemy uważniejsi”.",
      },
      {
        label: "Dowód, nie proza —",
        body:
          "„gotowe” to komenda, exit code i obejrzany stan. Raport kończy się statusem VERIFIED, UNVERIFIED albo FAILED. " +
          "Agenci zmierzalnie zawyżają sukces (w jednym benchmarku 75,8 % zgłoszonych sukcesów nie miało dowodu) i " +
          "ustępują pod naciskiem — linia statusu jest przeciwwagą.",
      },
    ],
    pipeTitle: "Życie jednej zmiany",
    pipeLead:
      "Dziewięć bramek odpala się na zdarzeniach, nie na czyjejś pamięci. Każdy czerwony wynik zatrzymuje zmianę w tym miejscu.",
    pipe: {
      stages: [
        "prompt",
        "edycja",
        "komenda",
        "koniec sesji",
        "commit",
        "push",
        "CI",
        "merge",
        "produkcja",
      ],
      gates: [
        "protokół w prompt",
        "lint + typecheck",
        "strażnik + zakaz no-verify",
        "tier + testy + recenzenci",
        "18 kontroli + sekrety",
        "bez main + rozmiar + cykle",
        "quality + mutacje + gitleaks",
        "tylko aktualny merge-ref",
        "200 z prawdziwej domeny",
      ],
      live: "LIVE",
      blocked:
        "każdy wyjątek to nazwana zmienna (ALLOW_…=1), logowana i raportowana w cotygodniowym audycie — obchodzenie hooków jest zakazane stałą regułą",
      caption: "Dziewięć bramek na drodze zmiany; człowiek decyduje, bramki pamiętają.",
    },
    gatesItems: [
      {
        label: "Przy każdym prompcie —",
        body:
          "hook wstrzykuje protokół: niejasność uruchamia pytania, nie wykonanie; fakt wymaga najpierw otwartego źródła; " +
          "bloker ląduje w pierwszej linii raportu, a na „jak idzie?” nie ma odpowiedzi „dobrze” — jest cel, budżet, " +
          "ryzyka i decyzje, które należą do sponsora.",
      },
      {
        label: "Po każdej edycji pliku, także tej zrobionej przez shell —",
        body: "lint i typecheck lecą na zmienionym pliku, a błędy wracają do agenta, który edytował — w tej samej sesji.",
      },
      {
        label: "Przy każdej komendzie shellowej —",
        body:
          "strażnik blokuje --no-verify, force-push, twarde resety, rekurencyjne kasowanie poza katalogami buildu, " +
          "merge'owanie pull requestów ze skryptu, sekrety wpisane w linię komendy i curl przekierowany do shella.",
      },
      {
        label: "Na koniec każdej sesji —",
        body:
          "bramka stop liczy tier ryzyka z diffu (ścieżki i rozmiar, nigdy z promptu), odpala lint, typy i testy na " +
          "wszystkim, co się zmieniło, i odmawia zamknięcia sesji T2+ bez wymaganych działów recenzentów.",
      },
      {
        label: "Przy każdym commicie —",
        body:
          "18 twardych stopów: konwencjonalny opis; skan sekretów; świeżość bazy (klon o niepowiązanej historii jest " +
          "blokowany); powtórzone literały w nowym kodzie; nowa zależność musi istnieć w npm lub PyPI i nie być o jedną " +
          "literówkę od popularnej paczki; zakomentowany kod; nowe TODO bez wiersza w rejestrze; kolumna z danymi " +
          "osobowymi bez wiersza w inwentarzu prywatności; lint migracji SQL (row-level security z USING i WITH CHECK, " +
          "higiena definera, klucze obce tenantów); parser workflowów GitHuba na plikach workflow; usunięty krok " +
          "bezpieczeństwa w CI.",
      },
      {
        label: "Przy każdym pushu —",
        body:
          "brak bezpośredniego pusha na main; powyżej 400 linii źródłowych zmiana jest dzielona; nowy cykl importów " +
          "albo import wbrew warstwom zadeklarowanym w dokumencie architektury jest blokowany; gałąź, na której ktoś " +
          "inny commitował w ostatnie 24 godziny, dostaje ostrzeżenie.",
      },
      {
        label: "W CI i przy merge'u —",
        body:
          "te same bramki plus gitleaks i testy mutacyjne na zmienionych plikach (test, który nie zabija żadnego mutanta, " +
          "to teatr); 31 repozytoriów ma ścisłą ochronę gałęzi generowaną z nazw jobów w workflow; skrypt merge'u " +
          "przyjmuje pull request tylko wtedy, gdy checki odpaliły się na aktualnym wyniku merge'a — bo zielone checki " +
          "na nieaktualnej bazie raz rozwaliły main na produkcji.",
      },
    ],
    tierTitle: "Tier ryzyka — liczony z diffu, nigdy deklarowany",
    tierLead:
      "Proporcjonalność też jest bramką: prototyp nie jest nękany rekordami architektury, a zmiana w płatnościach nie zamknie się bez security.",
    tiers: [
      { label: "T0 —", body: "docs, copy, style, assety: tylko bramki 0-tokenowe." },
      { label: "T1 —", body: "izolowany komponent albo util: code review zalecane." },
      {
        label: "T2 —",
        body: "wspólna logika, trasy API, edge functions, zależności, config CI lub buildu, ponad 150 linii: wymagane review code + ops, ux przy UI, data przy schemacie.",
      },
      {
        label: "T3 —",
        body: "auth, row-level security i multi-tenancy, płatności, sekrety, migracje SQL, zadania cykliczne, admin, ponad 600 linii: code + security + data + ops, potem weryfikator — role security, data i weryfikatora idą na najmocniejszy model.",
      },
      {
        label: "Per repozytorium —",
        body: "podłoga tieru, faza cyklu życia (prototype · poc · mvp · production — promocja do produkcji wymaga spisanego przeglądu gotowości w tym samym commicie) i opcjonalny adres QA, który czyni dział QA obowiązkowym na T3 z interfejsem.",
      },
    ],
    reviewTitle: "Review jak w software housie, nie jak na czacie",
    reviewLead:
      "Działy ze świeżym kontekstem, agregacja w kodzie, weryfikator, którego jedynym zadaniem jest obalać.",
    review: {
      orchestrator: "ORKIESTRATOR",
      gates: "BRAMKI 0-TOKENOWE",
      gatesSub: "lint · typy · testy · SQL",
      finders: ["code", "security", "data · ops", "ux · product · qa"],
      aggregate: "AGREGACJA",
      aggregateSub: "k-z-n · dowód albo odpada",
      verifier: "WERYFIKATOR",
      verifierSub: "odtwórz albo obal",
      fixer: "FIX + BRAMKI",
      rule: "zero czatu między agentami · finding bez wykonanej komendy nie istnieje",
      caption:
        "Agenci nigdy nie widzą czerwonego lintu; agregacja nie ma opinii; weryfikator szuka błędów, nie potwierdzeń.",
    },
    reviewItems: [
      {
        label: "Dziewięć działów —",
        body:
          "code, security, data, ops, ux, product, qa, weryfikator i catfish. Każdy to rubryka najwyżej ośmiu " +
          "numerowanych reguł, każda z komendą do wykonania, polityką severity, schematem JSON i przerobionym fałszywym " +
          "alarmem. Tylko czytają; naprawia sesja główna.",
      },
      {
        label: "Dlaczego świeży kontekst —",
        body:
          "autor kodu, człowiek czy model, nie widzi własnych błędów. Recenzenci startują z pustym kontekstem, dostają " +
          "diff i zadanie, i nigdy nie widzą cudzych findingów — agenci, którzy dyskutują, zbiegają do większości nawet " +
          "wtedy, gdy rację miała mniejszość.",
      },
      {
        label: "Narady z catfishem —",
        body:
          "decyzje architektoniczne idą przez fakty → stanowiska → obowiązkowego dysydenta → agregację → rekord decyzji. " +
          "Wstrzyknięty sprzeciw to jedyna interwencja, która zmierzalnie tnie „cichą zgodę” w grupach agentów.",
      },
      {
        label: "Kalibrowane co miesiąc —",
        body:
          "ten sam defekt w dwóch opakowaniach (goły diff, diff z przekonującym opisem) recenzuje sześciu świeżych " +
          "recenzentów w losowej kolejności. Rozjazd oznacza bias na długość lub opis, a rubrykę poprawia człowiek — " +
          "audytor nigdy nie stroi instrumentu, który mierzy.",
      },
    ],
    loopTitle: "Blizna → bramka — jak system się uczy",
    loopLead:
      "Awaria nie jest zamknięta, gdy jest naprawiona; jest zamknięta, gdy nie może się powtórzyć bez tego, żeby skrypt to zauważył.",
    loop: {
      steps: [
        "incydent albo powtórzona korekta",
        "postmortem: pięć razy „dlaczego”",
        "blizna z identyfikatorem reguły",
        "bramka + test pozytywny",
        "pokrycie reguła → bramka",
        "cotygodniowy audyt",
      ],
      caption:
        "Pętla karmi się sama: cotygodniowy audyt znajduje bramki, które przestały strzelać, i to staje się blizną.",
    },
    loopItems: [
      {
        label: "Nieaktualna baza rozwaliła main —",
        body:
          "dwa pull requesty były zielone, każdy wobec własnego zdjęcia maina; zmergowane razem dały nieważny workflow " +
          "na gałęzi domyślnej. Dziś: merge tylko, gdy checki odpaliły się na aktualnym wyniku merge'a, ścisła ochrona " +
          "gałęzi na 31 repozytoriach i blizna z dokładnym mechanizmem.",
      },
      {
        label: "Hook, który nigdy nie ruszył —",
        body:
          "bramka pusha czytała wejście dwa razy i przez sześć dni po cichu nie robiła nic. Dziś każdy hook gita ma test, " +
          "który uruchamia cały skrypt z prawdziwym wejściem, a cotygodniowy audyt sprawdza, czy bramki nadal blokują " +
          "swoje przypadki.",
      },
      {
        label: "45 kopii tożsamości firmy —",
        body:
          "w 11 plikach, z których każdy przeszedł lint, typy, testy i review. Dziś bramka duplikatów na dodanych liniach: " +
          "ten sam napis trzy razy w dwóch plikach to blokada, z logowanym wyjątkiem.",
      },
      {
        label: "Cichy fallback na fakturze —",
        body:
          "„?? domyślny” po cichu zmienił sprzedawcę po usunięciu profilu. Dziś SILENT-FALLBACK na każdym polu o skutkach " +
          "jest blockerem w rubryce code review: brak dopasowania ma rzucić nazwanym błędem.",
      },
    ],
    sections: [
      {
        title: "Dwa runtime'y, jeden system",
        items: [
          {
            label: "Claude Code —",
            body:
              "runtime terminalowy do pracy na repozytoriach: ta strona, produkcyjne aplikacje MAS Group, Flyt i systemu " +
              "warsztatowego, plus ich CI. Z GitHubem, pocztą, przeglądarką i pulpitem rozmawia przez serwery MCP i to " +
              "tu obowiązują hooki i bramki gita.",
          },
          {
            label: "Claude Desktop (Cowork) —",
            body:
              "runtime operacyjny: triage poczty, dokumenty, research, outreach, projektowanie i rutyny, które " +
              "utrzymują przy życiu sam system. Nie ma tam hooków, więc protokół podróżuje jako tekst w każdym prompcie.",
          },
          {
            label: "105 skilli —",
            body:
              "wersjonowane pakiety instrukcji, do których system kieruje zadania: 50 w runtime kodowym, 55 na pulpicie. " +
              "Router dopasowuje zadanie deterministycznie i ogłasza pipeline przed startem.",
          },
          {
            label: "Routing modeli —",
            body:
              "najmocniejszy model jest rezerwowany na trudne rozumowanie i na T3 security, data i weryfikację; rutynowa " +
              "praca narzędziowa i wyszukiwania idą do tańszych warstw. Moc obliczeniowa to budżet — i system wydaje go świadomie.",
          },
        ],
      },
    ],
    statusTitle:
      "VERIFIED · UNVERIFIED · FAILED — linia statusu, która nie pozwala modelowi Cię zahipnotyzować",
    statusLead:
      "Każdy istotny raport kończy się jednym z trzech słów. To najmniejszy element systemu i ten, który najlepiej " +
      "podróżuje — szczególnie do Claude Cowork, gdzie nie ma hooków i jedyną ochroną jest prompt.",
    statusItems: [
      {
        label: "VERIFIED —",
        body: "twierdzenie niesie swój artefakt: komendę i exit code, status HTTP, linię wyniku testów, diff, ścieżkę do zrzutu ekranu — zacytowane, nie opisane.",
      },
      {
        label: "UNVERIFIED —",
        body: "praca zrobiona, ale brakuje dowodu: dokładnie czego brakuje i jak to sprawdzić, plus co zmieniłoby wniosek. Raport bez linii statusu jest traktowany właśnie tak.",
      },
      {
        label: "FAILED / BLOCKED —",
        body: "co się stało, dosłownie, bez łagodzenia. Bloker — brak dostępu, decyzji, danych, sekretu, padłe narzędzie — idzie w pierwszej linii raportu, nigdy w sekcji na końcu.",
      },
      {
        label: "Dlaczego to istnieje —",
        body:
          "modele zgadzają się z błędnym twierdzeniem użytkownika w około 58 % prób pod presją i przewidują 61–77 % " +
          "sukcesu, osiągając 22–35 %. Im dłużej trwa rozmowa, tym bardziej model odbija Twoje ujęcie i Twoją pewność. " +
          "Linia statusu zmusza twierdzenie, by niosło dowód albo przyznało, że go nie ma, a „jesteś pewien?” uruchamia " +
          "ponowne wyprowadzenie z dowodów, nie uprzejmą zmianę zdania.",
      },
    ],
    statusCoworkLabel: "W Cowork i zadaniach cyklicznych —",
    statusCowork:
      "do każdego promptu w tle doklejany jest siedmioliniowy blok weryfikacji: nie zakładaj, że prompt jest prawdziwy, " +
      "masz prawo odmówić i zgłosić porażkę, przeformułuj twierdzenia na neutralne pytania, zero sukcesu bez dowodu, " +
      "zaatakuj własny wynik przed raportem, wyprowadź od nowa, gdy ktoś podważa, zakończ statusem. Blok jest w " +
      "repozytorium, gotowy do wklejenia.",
    vaultSectionTitle: "Sekrety, których model nigdy nie widzi",
    vaultFlow: {
      vault: "VAULT",
      vaultSub: "95 sekretów · self-hosted",
      bridge: "MOST",
      bridgeSub: "wstrzykuje jako zmienne env",
      target: "PROCES DOCELOWY",
      targetSub: "deploy · wywołanie API · CI",
      never: ["czat ✕", "kod ✕", "logi ✕"],
      caption: "Agent może użyć poświadczenia, którego nigdy nie może odczytać.",
    },
    vaultItems: [
      {
        label: "Self-hosted vault —",
        body:
          "95 kluczy API, tokenów i loginów żyje w vaulcie na moim własnym sprzęcie. Most wstrzykuje je jako zmienne " +
          "środowiskowe prosto do procesu docelowego. Wartości nigdy nie pojawiają się w czacie, kodzie ani logach — " +
          "strażnik komend blokuje sekret wpisany w linię komendy, a skany przy commicie i w CI pilnują, żeby tak zostało.",
      },
    ],
    schedTitle: "Rutyny — część, która działa, gdy nikt nie pisze",
    schedLead:
      "Pięć rutyn w runtime kodowym, 35 zdefiniowanych na pulpicie, 10 z nich włączonych. Najpierw deterministyczny skrypt, model tylko przy znaleziskach; wszystko, co mogłoby „znajdować sobie robotę”, jest wyłączone z założenia.",
    cadence: [
      { name: "Recenzent PR", dots: 5, freq: "dni robocze rano" },
      { name: "Watchdog", dots: 5, freq: "co 2 godziny" },
      { name: "Backup konfiguracji + skrypt restore", dots: 5, freq: "codziennie" },
      { name: "Sesje → notatki pamięci", dots: 4, freq: "codziennie / pn + czw" },
      { name: "Zdrowie strażników", dots: 1, freq: "co tydzień" },
      { name: "Tygodniowy raport systemu", dots: 1, freq: "niedziela" },
      { name: "Nadzór CVE", dots: 1, freq: "co miesiąc" },
      { name: "Kalibracja recenzentów", dots: 1, freq: "co miesiąc" },
      { name: "Cykl samodoskonalenia", dots: 0, freq: "opt-in, wyłączony", manual: true },
      { name: "Sprzątacz repo", dots: 0, freq: "tylko ręcznie", manual: true },
    ],
    schedItems: [
      {
        label: "Recenzent PR (dni robocze) —",
        body:
          "robi review otwartych pull requestów całej floty jak senior. Poprawki mechaniczne lądują osobnymi commitami " +
          "z dowodem; uwagi projektowe i bezpieczeństwa zostają komentarzami do mojej decyzji.",
      },
      {
        label: "Zdrowie strażników (co tydzień) —",
        body:
          "33 deterministyczne kontrole tego, czy system jakości sam jest nadal wpięty: hooki zarejestrowane, bramki " +
          "blokują swoje przypadki, które wyjątki zostały użyte i dlaczego, która rutyna wystartowała i nie skończyła.",
      },
      {
        label: "Nadzór CVE (co miesiąc) —",
        body:
          "najpierw deterministyczny skan zależności żywych produktów — zero tokenów, gdy czysto. Poprawki wyłącznie " +
          "patch/minor i wyłącznie jako pull requesty z dowodem, nigdy push na main.",
      },
      {
        label: "Watchdog (co dwie godziny, pulpit) —",
        body:
          "znajduje rutyny spóźnione albo padłe w trakcie, ponawia, naprawia co się da, wysyła powiadomienie na telefon " +
          "tylko wtedy, gdy nie może, i wznawia pracę przerwaną przez limit z pliku checkpointu.",
      },
      {
        label: "Backup ze skryptem restore (codziennie, pulpit) —",
        body:
          "pełny klon konfiguracji agenta i wygenerowany restore na nową maszynę jednym kliknięciem. Backup, którego " +
          "nigdy nie odtworzono, nie jest backupem, więc skrypt restore jest częścią backupu.",
      },
      {
        label: "Cykl samodoskonalenia (opt-in) —",
        body:
          "czyta ostatnie transkrypty, wykrywa wzorce — powtórzone korekty, powtórzone błędy narzędzi, obchodzone reguły — " +
          "i proponuje zmiany z cytowanym dowodem. Stałymi regułami zostają tylko te, które zatwierdzę.",
      },
    ],
    memTitle: "Pamięć, telemetria i retro, które przebudowało system",
    memItems: [
      {
        label: "Pamięć trwała —",
        body:
          "lokalny vault 1900+ notatek ładuje się na starcie każdej sesji, a sesje dokumentują się same przy zamknięciu, " +
          "więc następna startuje z pliku checkpointu, nie od zera.",
      },
      {
        label: "Telemetria, nie odczucia —",
        body:
          "każde pominięcie bramki jest logowane z powodem; 1873 transkrypty sesji i historia gita 39 repozytoriów są " +
          "przekopywane skryptami: korekty na sesję, powtórzone błędy narzędzi, poprawki w 24 godziny po poprzednim " +
          "commicie tego samego pliku, hotspoty churnu. To liczby decydują, co staje się bramką.",
      },
      {
        label: "Retro, które miało znaczenie —",
        body:
          "dwanaście pętli naprawczych z jednej sesji zostało doprowadzonych do przyczyn; trzy z nich to ten sam defekt — " +
          "system deklarował kontrolę, której fizycznie nie miał. Odpowiedź była strukturalna: każda bramka dostała test " +
          "pozytywny, a pokrycie reguła → bramka stało się skryptem.",
      },
      {
        label: "Ta sama metoda, zastosowana do mnie —",
        body:
          "moja praktyka czytania kodu jest zbudowana jak reszta systemu — codziennie, weryfikowalnie, publicznie: " +
          "github.com/kamiljan11/code-reading-quest.",
      },
    ],
    scaleTitle: "Czy to trzyma się na skali?",
    scaleItems: [
      {
        label: "Uczciwa odpowiedź —",
        body:
          "jedna funkcja jest łatwa; system na 200 tysięcy linii, z zależnościami między plikami i niepisanymi założeniami " +
          "architektonicznymi, to miejsce, gdzie spójność się rozjeżdża. Dlatego założenia są zapisane tam, gdzie skrypt " +
          "je przeczyta: dokument architektury każdego repozytorium niesie parsowany blok warstw i zakazanych importów, a " +
          "bramka pusha blokuje nowy cykl importów albo import wbrew warstwom. Stare cykle tylko ostrzegają — długu " +
          "historycznego nigdy nie sprząta się automatycznie.",
      },
      {
        label: "Zasięg rażenia przed edycją —",
        body:
          "zmieniany plik importowany przez ponad 40 innych jest flagowany, a krok projektowy przed kodem pyta, kto to " +
          "woła, co jeszcze czyta te dane i w którym tierze ląduje zmiana.",
      },
      {
        label: "Nawigowalne dla człowieka, nie tylko dla maszyny —",
        body:
          "indeks narzędzi i mapa systemu są generowane z nagłówków samych narzędzi; narzędzie bez samoopisu pokazuje się " +
          "jako dług. Kryterium każdej decyzji stylu to jedno pytanie: czy senior, który nigdy nie widział repozytorium, " +
          "uruchomi je w 15 minut, znajdzie miejsce zmiany w 15 minut i zrozumie dlaczego — bez czytania moich transkryptów?",
      },
    ],
    installTitle: "Zainstaluj to u siebie",
    installLead:
      "Cały system to publiczne repozytorium, sanityzowane i przenośne: Node 20+, git i Claude Code to jedyne wymagania.",
    installSteps: [
      "git clone " + REPO_URL + ".git",
      "node install.mjs --dry-run   # pokazuje plan, niczego nie dotyka",
      "node install.mjs --yes       # kopiuje do ~/.claude, dokleja hooki, blok CLAUDE.md, włącza hooki gita",
    ],
    installItems: [
      {
        label: "Co obiecuje instalator —",
        body:
          "nigdy nie nadpisuje pliku, który zmieniłeś (inne wersje lądują obok Twoich), scala zamiast podmieniać Twoje " +
          "ustawienia, dokleja reguły między znacznikami, więc aktualizacja podmienia tylko ten blok, hooki gita są opt-in, " +
          "a całość kończy się samotestem — zielony wynik jest dowodem, nie słowo instalatora.",
      },
      {
        label: "Co dostajesz —",
        body:
          "7 hooków, 3 bramki gita, 32 narzędzia z 10 zestawami testów, 9 działów recenzentów, doktrynę ze 149 bliznami, " +
          "szablon repo z CI i parsowanymi blokami granic, 4 rutyny kodowe i 7 pulpitowych, deinstalator oraz dokumentację " +
          "z diagramami z tej strony.",
      },
      {
        label: "Jedna uczciwa uwaga —",
        body:
          "system mówi dziś po polsku (komunikaty hooków, rubryki, doktryna). Wszystko jest zwykłym tekstem; angielska " +
          "wersja to pierwszy punkt roadmapy. Instalator, README i dokumentacja są po angielsku.",
      },
    ],
    installLink: "Otwórz repozytorium →",
    limitsTitle: "Uczciwe granice",
    limits:
      "Modele fundacyjne przez API — nie trenuję ich ani nie fine-tunuję. Niezawodność jest udowodniona w skali MŚP " +
      "(dziesiątki repozytoriów, jeden właściciel), nie hyperscale. Działy recenzentów kosztują tokeny — mniej więcej " +
      "cztery recenzje dla T2 i osiem do dziesięciu dla T3 — dlatego bramki 0-tokenowe idą pierwsze. Część bramek zależy " +
      "od tego, czy repozytorium ma to, co sprawdzają, i pomija się z zalogowanym powodem, gdy nie ma. Sensem tej strony " +
      "nie jest to, że system jest skończony — tylko to, że tryby awarii pracy z AI są tu obudowane inżynierią, jawnie, " +
      "zamiast być zaklinane.",
    colophon:
      "Ta strona przeszła przez pipeline, który opisuje: naszkicowana przez agenta, przepchnięta przez powyższe bramki, " +
      "zrecenzowana i wydana przeze mnie. Liczby pochodzą z komend shellowych z dnia publikacji, nie z pamięci.",
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

        <rect x="270" y="10" width="220" height="48" rx="9" className="aid-box aid-strong" />
        <text x="380" y="31" textAnchor="middle" className="aid-t">
          {t.kamil}
        </text>
        <text x="380" y="47" textAnchor="middle" className="aid-s">
          {t.kamilSub}
        </text>

        <path d="M340 58 L275 92" className="aid-ln" markerEnd="url(#aiar)" />
        <path d="M420 58 L485 92" className="aid-ln" markerEnd="url(#aiar)" />

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

        <path
          d="M362 134 L398 134"
          className="aid-ln"
          markerEnd="url(#aiar)"
          markerStart="url(#aiar)"
        />
        <text x="380" y="188" textAnchor="middle" className="aid-xs">
          {t.shared}
        </text>

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

        <path d="M255 172 L255 208" className="aid-ln" markerEnd="url(#aiar)" />
        <path d="M505 172 L505 208" className="aid-ln" markerEnd="url(#aiar)" />
        <rect x="150" y="212" width="460" height="42" rx="9" className="aid-band" />
        <text x="380" y="230" textAnchor="middle" className="aid-t aid-accent">
          {t.gates}
        </text>
        <text x="380" y="246" textAnchor="middle" className="aid-s">
          {t.gatesList}
        </text>

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

/* ══ Diagram: mind map (8 branches around the centre) ══ */
function AiMindMap({ t }: { t: MindLabels }) {
  const cx = 380;
  const cy = 250;
  // Branch anchors: two columns of four, connected to the centre by curves.
  const pos = [
    { x: 30, y: 36 },
    { x: 30, y: 152 },
    { x: 30, y: 268 },
    { x: 30, y: 384 },
    { x: 550, y: 36 },
    { x: 550, y: 152 },
    { x: 550, y: 268 },
    { x: 550, y: 384 },
  ];
  const bw = 180;
  const bh = 84;
  return (
    <div className="aid-scroll">
      <svg viewBox="0 0 760 520" className="aid" role="img" aria-label={t.caption}>
        {t.branches.map((b, i) => {
          const p = pos[i];
          const left = i < 4;
          const ax = left ? p.x + bw : p.x;
          const ay = p.y + bh / 2;
          const c1x = left ? ax + 70 : ax - 70;
          const c2x = left ? cx - 90 : cx + 90;
          return (
            <g key={b.title}>
              <path
                d={`M${ax} ${ay} C ${c1x} ${ay}, ${c2x} ${cy}, ${cx} ${cy}`}
                className="aid-ln aid-thin"
              />
              <rect x={p.x} y={p.y} width={bw} height={bh} rx="9" className="aid-box aid-side" />
              <text x={p.x + bw / 2} y={p.y + 20} textAnchor="middle" className="aid-t">
                {b.title}
              </text>
              {b.leaves.map((l, j) => (
                <text
                  key={l}
                  x={p.x + bw / 2}
                  y={p.y + 38 + j * 15}
                  textAnchor="middle"
                  className="aid-xs"
                >
                  {l}
                </text>
              ))}
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="64" className="aid-box aid-strong" />
        <text x={cx} y={cy - 4} textAnchor="middle" className="aid-t aid-accent">
          {t.center}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="aid-xs">
          {t.centerSub}
        </text>
        <text x={cx} y="500" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: the life of a change (N stages) ══ */
function AiPipeline({ t }: { t: PipeLabels }) {
  const n = t.stages.length;
  const x0 = 46;
  const x1 = 660;
  const step = (x1 - x0) / (n - 1);
  const xs = Array.from({ length: n }, (_, i) => x0 + i * step);
  const chipW = Math.min(96, step - 6);
  return (
    <div className="aid-scroll">
      <svg viewBox="0 0 760 210" className="aid" role="img" aria-label={t.caption}>
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
        <path d={`M${x0 - 20} 62 L${x1 + 20} 62`} className="aid-ln" markerEnd="url(#aipr)" />
        <rect x="690" y="45" width="60" height="34" rx="8" className="aid-box aid-strong" />
        <text x="720" y="66" textAnchor="middle" className="aid-t aid-accent">
          {t.live}
        </text>

        {xs.map((x, i) => {
          const words = t.gates[i].split(" + ");
          return (
            <g key={i}>
              <circle cx={x} cy="62" r="5" className="aid-node" />
              <text x={x} y={i % 2 === 0 ? 42 : 28} textAnchor="middle" className="aid-s aid-stage">
                {t.stages[i]}
              </text>
              <path d={`M${x} 70 L${x} ${i % 2 === 0 ? 92 : 112}`} className="aid-ln aid-thin" />
              <rect
                x={x - chipW / 2}
                y={i % 2 === 0 ? 94 : 114}
                width={chipW}
                height="34"
                rx="7"
                className="aid-chip"
              />
              <text
                x={x}
                y={i % 2 === 0 ? 109 : 129}
                textAnchor="middle"
                className="aid-xs aid-chip-t"
              >
                {words[0]}
              </text>
              <text
                x={x}
                y={i % 2 === 0 ? 122 : 142}
                textAnchor="middle"
                className="aid-xs aid-chip-t"
              >
                {words.length > 1 ? "+ " + words.slice(1).join(" + ") : ""}
              </text>
            </g>
          );
        })}

        <text x="380" y="176" textAnchor="middle" className="aid-xs aid-red">
          ✕ {t.blocked}
        </text>
        <text x="380" y="200" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: review pipeline ══ */
function AiReview({ t }: { t: ReviewLabels }) {
  return (
    <div className="aid-scroll">
      <svg viewBox="0 0 760 236" className="aid" role="img" aria-label={t.caption}>
        <defs>
          <marker
            id="airv"
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
        <rect x="16" y="70" width="128" height="48" rx="9" className="aid-box aid-strong" />
        <text x="80" y="98" textAnchor="middle" className="aid-t">
          {t.orchestrator}
        </text>

        <path d="M144 94 L176 94" className="aid-ln" markerEnd="url(#airv)" />
        <rect x="180" y="62" width="130" height="64" rx="9" className="aid-band" />
        <text x="245" y="88" textAnchor="middle" className="aid-t aid-accent">
          {t.gates}
        </text>
        <text x="245" y="106" textAnchor="middle" className="aid-xs">
          {t.gatesSub}
        </text>

        {t.finders.map((f, i) => (
          <g key={f}>
            <path
              d={`M310 94 L346 ${34 + i * 40}`}
              className="aid-ln aid-thin"
              markerEnd="url(#airv)"
            />
            <rect
              x="350"
              y={18 + i * 40}
              width="118"
              height="32"
              rx="7"
              className="aid-box aid-side"
            />
            <text x="409" y={39 + i * 40} textAnchor="middle" className="aid-s">
              {f}
            </text>
            <path
              d={`M468 ${34 + i * 40} L504 94`}
              className="aid-ln aid-thin"
              markerEnd="url(#airv)"
            />
          </g>
        ))}

        <rect x="508" y="66" width="112" height="56" rx="9" className="aid-box" />
        <text x="564" y="88" textAnchor="middle" className="aid-t">
          {t.aggregate}
        </text>
        <text x="564" y="106" textAnchor="middle" className="aid-xs">
          {t.aggregateSub}
        </text>

        <path d="M564 122 L564 148" className="aid-ln" markerEnd="url(#airv)" />
        <rect x="508" y="152" width="112" height="48" rx="9" className="aid-box aid-strong" />
        <text x="564" y="172" textAnchor="middle" className="aid-t">
          {t.verifier}
        </text>
        <text x="564" y="189" textAnchor="middle" className="aid-xs">
          {t.verifierSub}
        </text>

        <path d="M620 94 L654 94" className="aid-ln" markerEnd="url(#airv)" />
        <rect x="658" y="70" width="92" height="48" rx="9" className="aid-box aid-prod" />
        <text x="704" y="98" textAnchor="middle" className="aid-s aid-prod-t">
          {t.fixer}
        </text>

        <text x="380" y="216" textAnchor="middle" className="aid-xs aid-red">
          ✕ {t.rule}
        </text>
        <text x="380" y="231" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: scar → gate loop (6 steps in a ring) ══ */
function AiLoop({ t }: { t: LoopLabels }) {
  const cx = 380;
  const cy = 128;
  const rx = 300;
  const ry = 88;
  const n = t.steps.length;
  const pts = t.steps.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });
  return (
    <div className="aid-scroll">
      <svg viewBox="0 0 760 290" className="aid" role="img" aria-label={t.caption}>
        <defs>
          <marker
            id="ailp"
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
        {pts.map((p, i) => {
          const q = pts[(i + 1) % n];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const len = Math.hypot(dx, dy) || 1;
          const pad = 66;
          const sx = p.x + (dx / len) * pad;
          const sy = p.y + (dy / len) * (pad * 0.42);
          const ex = q.x - (dx / len) * pad;
          const ey = q.y - (dy / len) * (pad * 0.42);
          return (
            <path
              key={i}
              d={`M${sx} ${sy} L${ex} ${ey}`}
              className="aid-ln"
              markerEnd="url(#ailp)"
            />
          );
        })}
        {pts.map((p, i) => {
          const words = t.steps[i].split(" ");
          const mid = Math.ceil(words.length / 2);
          const l1 = words.slice(0, mid).join(" ");
          const l2 = words.slice(mid).join(" ");
          return (
            <g key={i}>
              <rect
                x={p.x - 64}
                y={p.y - 20}
                width="128"
                height="40"
                rx="8"
                className={i === 3 ? "aid-box aid-strong" : "aid-box aid-side"}
              />
              <text x={p.x} y={p.y - 3} textAnchor="middle" className="aid-xs">
                {l1}
              </text>
              <text x={p.x} y={p.y + 11} textAnchor="middle" className="aid-xs">
                {l2}
              </text>
            </g>
          );
        })}
        <text x="380" y="280" textAnchor="middle" className="aid-xs">
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
    <div className="cad-grid" role="table" aria-label="Routine cadence">
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

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="cv-list">
      {items.map((it, i) => (
        <li key={i}>
          <b>{it.label}</b> {it.body}
        </li>
      ))}
    </ul>
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
          <p>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              {c.repoCta}
            </a>
          </p>
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

        <section className="cv-sec">
          <h2>{c.mindTitle}</h2>
          <p className="ai-lead">{c.mindLead}</p>
          <AiMindMap t={c.mind} />
        </section>

        <section className="cv-sec">
          <h2>{c.ideasTitle}</h2>
          <ItemList items={c.ideas} />
        </section>

        <section className="cv-sec">
          <h2>{c.pipeTitle}</h2>
          <p className="ai-lead">{c.pipeLead}</p>
          <AiPipeline t={c.pipe} />
          <ItemList items={c.gatesItems} />
        </section>

        <section className="cv-sec">
          <h2>{c.tierTitle}</h2>
          <p className="ai-lead">{c.tierLead}</p>
          <ItemList items={c.tiers} />
        </section>

        <section className="cv-sec">
          <h2>{c.reviewTitle}</h2>
          <p className="ai-lead">{c.reviewLead}</p>
          <AiReview t={c.review} />
          <ItemList items={c.reviewItems} />
        </section>

        <section className="cv-sec">
          <h2>{c.loopTitle}</h2>
          <p className="ai-lead">{c.loopLead}</p>
          <AiLoop t={c.loop} />
          <ItemList items={c.loopItems} />
        </section>

        {c.sections.map((sec) => (
          <section className="cv-sec" key={sec.title}>
            <h2>{sec.title}</h2>
            {sec.lead && <p className="ai-lead">{sec.lead}</p>}
            <ItemList items={sec.items} />
          </section>
        ))}

        <section className="cv-sec">
          <h2>{c.statusTitle}</h2>
          <p className="ai-lead">{c.statusLead}</p>
          <ItemList items={c.statusItems} />
          <ul className="cv-list">
            <li>
              <b>{c.statusCoworkLabel}</b> {c.statusCowork}
            </li>
          </ul>
        </section>

        <section className="cv-sec">
          <h2>{c.vaultSectionTitle}</h2>
          <AiVaultFlow t={c.vaultFlow} />
          <ItemList items={c.vaultItems} />
        </section>

        <section className="cv-sec">
          <h2>{c.schedTitle}</h2>
          <p className="ai-lead">{c.schedLead}</p>
          <AiCadence rows={c.cadence} />
          <ItemList items={c.schedItems} />
        </section>

        <section className="cv-sec">
          <h2>{c.memTitle}</h2>
          <ItemList items={c.memItems} />
        </section>

        <section className="cv-sec">
          <h2>{c.scaleTitle}</h2>
          <ItemList items={c.scaleItems} />
        </section>

        <section className="cv-sec">
          <h2>{c.installTitle}</h2>
          <p className="ai-lead">{c.installLead}</p>
          <ul className="cv-list">
            {c.installSteps.map((s) => (
              <li key={s}>
                <code>{s}</code>
              </li>
            ))}
          </ul>
          <ItemList items={c.installItems} />
          <p>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              {c.installLink}
            </a>
          </p>
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
