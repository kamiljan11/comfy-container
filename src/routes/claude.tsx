import { createFileRoute } from "@tanstack/react-router";
import { stackLines, wrapLabel } from "../lib/wrapLabel";
import { useRef } from "react";
import { useLang } from "../hooks/useLang";
import { PageToc } from "../components/PageToc";
import { type Lang } from "../i18n";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/claude")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Kamil Jan | Coding Higher Mind: the AI system behind the work",
        description:
          "How Kamil Jan actually works with AI, in depth: two agent runtimes, prompt hardening, event-driven quality gates, reviewer departments with fresh context, a scar-to-gate learning loop, routines, and the VERIFIED / UNVERIFIED / FAILED protocol. Open source.",
        url: "https://kamiljan.com/claude",
      }),
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/claude" }],
  }),
  component: ClaudePage,
});

const REPO_URL = "https://github.com/kamiljan11/coding-higher-mind";

/* ── Flags (mirrors the homepage toggle) ── */

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
  title: string;
  tocLabel: string;
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
    title: "Coding Higher Mind: the AI system behind the work",
    tocLabel: "On this page",
    role: "Two AI tools, hardened prompts, automatic checks at every step, AI reviewers split by speciality, and a loop that learns from failures. Counted, not estimated. Now open source.",
    intro:
      "My CV says AI coding agents write the code, while I own the spec, the review and the deploy. A claim like that needs evidence, so this page shows the system itself: what runs in the background, what it enforces, how it learns from its own failures, and where its limits are. In short: a change written by AI cannot reach a product without passing automatic checks, the AI has to show proof before it says “done”, and it can use passwords and keys without ever seeing them. Everything below runs today. Every number came from a command run on the day this page shipped: counted, not estimated. The whole system is a public repository you can install on your own machine in five minutes.",
    repoCta: "github.com/kamiljan11/coding-higher-mind →",
    stats: [
      { n: "1,873", label: "logged agent sessions" },
      { n: "149", label: "past failures turned into automatic checks" },
      { n: "23", label: "hard stops in the git gates" },
      { n: "9", label: "specialist AI reviewers" },
      { n: "51", label: "zero-token tools" },
      { n: "40", label: "routines (5 code · 35 desktop)" },
      { n: "31", label: "repos under strict protection" },
      { n: "95", label: "keys and passwords the AI never sees" },
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
      vaultNote1: "keys go to the process,",
      vaultNote2: "never to the chat",
      memory: "MEMORY",
      memorySub: "1,900+ notes",
      memoryNote1: "loaded at session start,",
      memoryNote2: "sessions self-document",
      gates: "GATES",
      gatesList: "prompt · edit · command · stop · commit · push · CI · review · production proof",
      prod: ["MAS Group", "Workshop 3.0", "Flyt", "kamiljan.com", "client sites"],
      caption:
        "I set the direction. Every change passes the automatic checks (gates) before it reaches a product. Proof comes back up.",
    },
    mindTitle: "Mind map: what „higher mind” is made of",
    mindLead:
      "The system that watches over every coding session is called PG (Prompt-Guard). “Higher mind” comes from my other long project, a free guidebook on practical spirituality, whose rule is practice over belief. Here that means: a rule you intend to follow is a belief; a check that runs on its own is a practice.",
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
            "deps · duplicates · TODOs",
            "SQL lint · boundaries",
          ],
        },
        {
          title: "Reviewer departments",
          leaves: [
            "code · security · data · ops",
            "ux · product · qa",
            "verifier · devil's advocate",
          ],
        },
        {
          title: "Doctrine",
          leaves: ["design before code", "“done” per risk tier", "149 scars"],
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
          leaves: ["every gate has a test", "rule → gate coverage", "weekly audit"],
        },
      ],
      caption:
        "Eight parts, one rule: nothing important exists only as written text. Every rule has an automatic check.",
    },
    ideasTitle: "Three ideas the whole thing rests on",
    ideas: [
      {
        label: "Checks, not written rules:",
        body: "the audit that started all this found that every rule written only as text was broken at scale: 6 of 7 repositories had 0 architecture decision records, the changelog was 105 commits behind, code review ran in only 2.5 % of sessions, and 79 % of commits went straight to the main branch. An AI agent can forget a rule, so a written rule is not enough. Everything that matters now runs by itself when something happens (that is a gate), and every gate has a test proving it blocks what it should. A script checks that every written rule has a gate.",
      },
      {
        label: "Every failure becomes a check (scar → gate):",
        body: "149 real failures across my projects are catalogued, each with a rule id. I call them scars. Every checklist item cites the scar it came from (a rule taken from Google SRE). A postmortem ends with a new gate or a new scar, never with “be more careful”.",
      },
      {
        label: "Proof, not claims:",
        body: "“done” means a command was run, it returned a result (exit code), and the state afterwards was checked. Every report ends with one word: VERIFIED, UNVERIFIED or FAILED. AI agents measurably overstate success (in one benchmark 75.8 % of reported successes had no evidence) and they give in when pushed back. The status word is the counterweight.",
      },
    ],
    pipeTitle: "The life of one change",
    pipeLead:
      "Nine checkpoints run by themselves at fixed moments: when I send a prompt, when the agent edits a file, and so on up to production. Nobody has to remember to check. Any red result stops the change on the spot.",
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
        "guard + no-verify",
        "tier + tests + reviewers",
        "18 checks + secrets",
        "no main + size + cycles",
        "mutation + secrets",
        "current merge-ref only",
        "200 from real domain",
      ],
      live: "LIVE",
      blocked:
        "each exception is a named switch (ALLOW_…=1), logged and shown in the weekly audit · skipping the checks is banned",
      caption:
        "Nine checkpoints on the path of a change. I make the decisions; the checks make sure nothing is forgotten.",
    },
    gatesItems: [
      {
        label: "When I send a prompt:",
        body: "a hook (a script that runs when something happens) adds the working rules (the protocol) to the prompt. If the task is unclear, the agent asks questions instead of guessing. A fact needs an opened source first. Anything blocking the work goes in the first line of the report. And “how is it going?” never gets the answer “fine”: it gets the goal, the budget, the risks and the decisions that belong to the sponsor.",
      },
      {
        label: "After every file edit, including edits made in the terminal:",
        body: "the changed file is checked for style and type errors (lint and typecheck). Errors go straight back to the agent that made the edit, in the same session.",
      },
      {
        label: "At every terminal command:",
        body: "a guard blocks the dangerous ones: skipping the checks (--no-verify), rewriting or throwing away history (force-push, hard reset), recursive deletes outside build folders, merging pull requests from a script, secrets typed into a command, and running a downloaded script straight in the shell (curl | sh).",
      },
      {
        label: "When a session ends:",
        body: "the stop gate decides how risky the change is (the risk tier) from what actually changed: file paths and size, never from what the prompt says. It runs lint, types and tests on everything that changed. A session at tier T2 or higher cannot close until the required AI reviewers have checked it.",
      },
      {
        label: "On every commit:",
        body:
          "18 hard stops: conventional message; secret scan; base freshness (a clone on an unrelated history is blocked); " +
          "duplicate literals in new code; a new dependency must exist on npm or PyPI and not be one typo away from a " +
          "popular package; commented-out code; a new TODO without a ledger row; a personal-data column without a privacy " +
          "inventory row; SQL migration lint (row-level security with both USING and WITH CHECK, definer hygiene, tenant " +
          "foreign keys); GitHub’s own workflow parser on workflow files; a removed security step in CI.",
      },
      {
        label: "At every push:",
        body: "nothing goes straight to the main branch. A change of more than 400 source lines is split into smaller ones. A new circular import (import cycle), or an import that breaks the layers declared in the architecture document, is blocked. If someone else committed to the same branch in the last 24 hours, you get a warning.",
      },
      {
        label: "On the build server (CI) and at merge:",
        body: "the same checks run again, plus a secret scanner (gitleaks) and mutation testing on the changed files: the tool plants small bugs on purpose, and a test that catches none of them is theatre. 31 repositories have strict branch protection, generated from the names of the CI jobs. A merge script accepts a pull request only if its checks ran on the current merge result: once, green checks on an outdated base broke main in production.",
      },
    ],
    tierTitle: "Risk level (tier): measured from the change, never declared",
    tierLead:
      "The amount of checking is proportional, and that is enforced too. A prototype isn't nagged for architecture records. A change to payments cannot close without a security review.",
    tiers: [
      {
        label: "T0:",
        body: "docs, copy, styles, assets: script checks only, with no AI tokens used.",
      },
      {
        label: "T1:",
        body: "a single, isolated component or helper: code review is recommended.",
      },
      {
        label: "T2:",
        body: "shared logic, API routes, edge functions, dependencies, CI or build configuration, or more than 150 lines. Required: code and operations review, plus UX review when the interface changes and data review when the schema changes.",
      },
      {
        label: "T3:",
        body: "login and permissions (auth, row-level security, multi-tenancy), payments, secrets, SQL migrations, scheduled jobs, admin, or more than 600 lines. Required: code, security, data and operations review, then a verifier. The security, data and verifier roles run on the strongest model.",
      },
      {
        label: "For each repository:",
        body: "a minimum tier, a lifecycle stage (prototype · poc · mvp · production) and an optional QA address. Moving to production requires a written production-readiness review in the same commit. With a QA address set, the QA reviewer becomes mandatory for T3 changes that touch a user interface.",
      },
    ],
    reviewTitle: "Review like a software house, not like a chat",
    reviewLead:
      "Each AI reviewer covers one speciality and starts with a clean slate (fresh context). A script, not a model, combines their findings: an issue blocks the change only if enough reviewers report it independently or the verifier reproduces it, and an issue without proof is dropped (the k-of-n rule). The verifier's only job is to disprove.",
    review: {
      orchestrator: "ORCHESTRATOR",
      gates: "SCRIPTS",
      gatesSub: "lint · types · tests · SQL",
      finders: ["code", "security", "data · ops", "ux · product · qa"],
      aggregate: "AGGREGATE",
      aggregateSub: "k-of-n · needs proof",
      verifier: "VERIFIER",
      verifierSub: "reproduce or refute",
      fixer: "FIX + RE-GATE",
      rule: "no chat between agents · a finding without an executed command does not count",
      caption:
        "Reviewers get only code that passed the scripts. A script merges findings. The verifier hunts for bugs, not confirmations.",
    },
    reviewItems: [
      {
        label: "Nine specialist reviewers:",
        body: "code, security, data, operations, UX, product, QA, a verifier and a devil's advocate (catfish). Each works from a checklist of at most eight numbered rules. Every rule has a command to run, a severity policy, a fixed output format (JSON schema) and a worked example of a false alarm it must reject. Reviewers only read; the main session makes the fixes.",
      },
      {
        label: "Why a clean slate:",
        body: "whoever wrote the code, a human or a model, doesn't see its own mistakes. Reviewers start empty, get only the change and the task, and never see each other's findings. Agents that discuss drift toward the majority, even when the minority was right.",
      },
      {
        label: "Decision councils with a devil's advocate:",
        body: "architecture decisions go through fixed steps: facts → positions → a mandatory dissenter → aggregation → a written decision record. Injected dissent is the one intervention shown to cut failures caused by quiet agreement in groups of agents.",
      },
      {
        label: "Calibrated monthly:",
        body: "once a month the same bug is packaged two ways: a bare change, and the same change with a persuasive description. Six fresh reviewers then check it in random order. If they disagree, length or description is biasing them, and a human adjusts the checklist. The auditor never adjusts the instrument it measures.",
      },
    ],
    loopTitle: "Every failure becomes a check: how the system learns",
    loopLead:
      "A failure isn't closed when it's fixed. It's closed when it can't happen again without a script noticing. Each catalogued failure is called a scar.",
    loop: {
      steps: [
        "incident or repeated correction",
        "root cause: five whys",
        "scar + rule id",
        "gate + test that it blocks",
        "every rule has a gate",
        "weekly audit",
      ],
      caption:
        "The loop feeds itself: the weekly audit finds checks that stopped working, and each one becomes a new scar.",
    },
    loopItems: [
      {
        label: "An outdated base broke main:",
        body: "two pull requests each passed their checks, but each was checked against its own older copy of the main branch. Merged together, they produced a broken workflow file on the main branch. Now: merge only when the checks ran on the current merge result, strict branch protection on 31 repositories, and a scar that records the exact mechanism.",
      },
      {
        label: "A check that never ran:",
        body: "the push gate read its input twice and, for six days, silently did nothing. Now every git hook has a test that runs the whole script with real input, and the weekly audit checks that every gate still blocks what it should.",
      },
      {
        label: "45 copies of a company identity:",
        body: "spread across 11 files, and every one of them passed lint, types, tests and review. Now a duplicate check runs on added lines: the same text three times in two files is blocked. An escape hatch exists, and every use of it is logged.",
      },
      {
        label: "An invoice that silently changed the seller:",
        body: "a default value (“?? default”) quietly swapped the seller after a profile was deleted. Now a silent fallback (SILENT-FALLBACK) on any field with consequences is a blocker in the code review checklist: when no match is found, the code must stop with a named error.",
      },
    ],
    sections: [
      {
        title: "Two AI tools, one system",
        items: [
          {
            label: "Claude Code:",
            body: "the terminal tool for work on code: this site, the production apps behind MAS Group, Flyt and the garage system, and their CI. It connects to GitHub, mail, the browser and the desktop through MCP servers (connectors). This is where the hooks and git gates apply.",
          },
          {
            label: "Claude Desktop (Cowork):",
            body: "the tool for operations: mail triage, documents, research, outreach, design, and the routines that keep the system itself running. It has no hooks, so the working rules travel as text inside every prompt.",
          },
          {
            label: "105 skills:",
            body: "versioned instruction packages that tasks are routed to: 50 in the coding tool, 55 on the desktop. A router matches each task by fixed rules (deterministically) and announces which steps it will run before work starts.",
          },
          {
            label: "Choosing the model:",
            body: "the strongest model is kept for hard reasoning and for the security, data and verification reviews at T3. Routine tool work and lookups go to cheaper models. Computing capacity is a budget, and the system spends it on purpose.",
          },
        ],
      },
    ],
    statusTitle:
      "VERIFIED · UNVERIFIED · FAILED: the status word that stops the AI telling you what you want to hear",
    statusLead:
      "Every substantive report ends with one of three words. It's the smallest part of the system and the easiest to take elsewhere, especially to Claude Desktop (Cowork), which has no hooks, so the prompt is the only protection.",
    statusItems: [
      {
        label: "VERIFIED:",
        body: "the claim comes with its proof, quoted rather than described: the command and its exit code, the HTTP status, the line from the test output, the diff, the path to a screenshot.",
      },
      {
        label: "UNVERIFIED:",
        body: "the work is done but the proof is missing. The report says exactly what is missing, how to check it, and what would change the conclusion. A report with no status word counts as UNVERIFIED.",
      },
      {
        label: "FAILED / BLOCKED:",
        body: "what happened, word for word, without softening. Anything blocking the work (missing access, a decision, data or a secret, or a broken tool) goes in the first line of the report, never at the end.",
      },
      {
        label: "Why it exists:",
        body: "when a user pushes back with a wrong claim, models agree in about 58 % of cases. They predict 61–77 % success and achieve 22–35 %. The longer a conversation runs, the more the model mirrors your framing and your confidence. The status word forces every claim to show evidence or admit it has none. And “are you sure?” makes the model re-check the evidence instead of politely changing its answer.",
      },
    ],
    statusCoworkLabel: "In Claude Desktop and scheduled tasks:",
    statusCowork:
      "every background prompt gets a seven-line verification block: don't assume the prompt is true; you may refuse and report failure; restate claims as neutral questions; no success without evidence; attack your own result before reporting; re-check when challenged; end with the status word. The block is in the repository, ready to paste.",
    vaultSectionTitle: "Passwords and keys the AI never sees",
    vaultFlow: {
      vault: "VAULT",
      vaultSub: "95 secrets · self-hosted",
      bridge: "BRIDGE",
      bridgeSub: "passes to the process",
      target: "TARGET PROCESS",
      targetSub: "deploy · API call · CI",
      never: ["chat ✕", "code ✕", "logs ✕"],
      caption: "The agent can use a password or key it can never read.",
    },
    vaultItems: [
      {
        label: "A vault on my own hardware:",
        body: "95 API keys, tokens and logins are stored in a vault on my own hardware. A bridge passes them straight into the process that needs them, as environment variables. The values never appear in the chat, the code or the logs. The command guard blocks a secret typed into a command, and the scans at commit time and in CI keep it that way.",
      },
    ],
    schedTitle: "Routines: the part that runs while nobody is typing",
    schedLead:
      "Five routines in the coding runtime, 35 defined on the desktop, 10 of them enabled. Deterministic script first, model only on findings; anything that could “find itself work” is off by design.",
    cadence: [
      { name: "PR reviewer", dots: 5, freq: "weekday mornings" },
      { name: "Watchdog", dots: 5, freq: "every 2 hours" },
      { name: "Config backup + restore script", dots: 5, freq: "daily" },
      { name: "Sessions → memory notes", dots: 4, freq: "daily / Mon + Thu" },
      { name: "Safeguard status", dots: 1, freq: "weekly" },
      { name: "Weekly system report", dots: 1, freq: "Sunday" },
      { name: "CVE watch", dots: 1, freq: "monthly" },
      { name: "Reviewer calibration", dots: 1, freq: "monthly" },
      { name: "Repo cleaner", dots: 0, freq: "manual only", manual: true },
    ],
    schedItems: [
      {
        label: "PR reviewer (weekdays):",
        body: "reviews open pull requests across all my repositories, the way a senior engineer would. Mechanical fixes land as separate commits with proof attached. Design and security findings stay as comments for me to decide.",
      },
      {
        label: "Safeguard status (weekly):",
        body: "33 script checks that the quality system itself is still connected: hooks are registered, gates still block what they should, which escape hatches were used and why, and which routine started but never finished.",
      },
      {
        label: "Vulnerability watch (CVE, monthly):",
        body: "first a script scans the dependencies of the live products: no AI tokens used when nothing is found. Fixes are limited to patch and minor updates, and always arrive as pull requests with evidence, never as direct pushes.",
      },
      {
        label: "Watchdog (every two hours, Claude Desktop):",
        body: "finds routines that are overdue or crashed mid-run, retries them and fixes what it can. It sends a phone notification only when it can't. If a usage limit interrupted work, it resumes from a saved checkpoint.",
      },
      {
        label: "Backup with a restore script (daily, Claude Desktop):",
        body: "a full copy of the agent configuration plus a generated script that restores it on a new machine in one click. A backup that was never restored is not a backup, so the restore script is part of the backup.",
      },
    ],
    memTitle: "Memory, measurement and the retrospective that rebuilt the system",
    memItems: [
      {
        label: "Persistent memory:",
        body: "a local base of 1,900+ notes is loaded at the start of every session. Each session writes its own notes when it ends, so the next one starts from a saved checkpoint instead of from scratch.",
      },
      {
        label: "Telemetry, not feelings:",
        body: "every skipped check is logged with a reason. Scripts mine 1,873 session transcripts and the git history of 39 repositories: corrections per session, repeated tool errors, fixes made within 24 hours of the previous commit to the same file, and the files that change most often (churn hotspots). The numbers decide what becomes a gate.",
      },
      {
        label: "The retrospective that mattered:",
        body: "twelve repair loops in one session were traced to their causes. Three had the same defect: the system claimed a check it didn't physically have. The answer was structural: every gate got a test proving it blocks, and checking that every rule has a gate became a script.",
      },
      {
        label: "The same method, applied to me:",
        body:
          "my code-reading practice is built like the rest of the system, daily, verified, public: " +
          "github.com/kamiljan11/code-reading-quest.",
      },
    ],
    scaleTitle: "Does it hold at scale?",
    scaleItems: [
      {
        label: "The honest answer:",
        body: "one function is easy. A 200,000-line system, with dependencies between files and unwritten assumptions about its architecture, is where consistency drifts. So the assumptions are written where a script can read them: every repository's architecture document has a machine-readable block of layers and forbidden imports, and the push gate blocks a new import cycle or an import that breaks the layers. Old cycles only warn. Historical debt is never cleaned up automatically.",
      },
      {
        label: "Checking the impact before an edit:",
        body: "a changed file that more than 40 other files import is flagged. The design step before any code asks: who calls this, what else reads this data, and which risk tier the change falls into.",
      },
      {
        label: "Readable by a person, not only by a machine:",
        body: "the tool index and the system map are generated from each tool's own header; a tool without a description shows up as debt. Every style decision is judged by one question: can a senior engineer who has never seen the repository run it in 15 minutes, find the place to change in 15 minutes, and understand why, without reading my transcripts?",
      },
    ],
    installTitle: "Install it yourself",
    installLead:
      "The whole system is a public repository, cleaned of private data and portable. You only need Node 20+, git and Claude Code.",
    installSteps: [
      "git clone " + REPO_URL + ".git",
      "node install.mjs --dry-run   # shows the plan, touches nothing",
      "node install.mjs --yes       # copies into ~/.claude, merges hooks, appends the CLAUDE.md block, wires git hooks",
    ],
    installItems: [
      {
        label: "What the installer promises:",
        body: "it never overwrites a file you changed (the other version lands next to yours). It merges your settings instead of replacing them. It adds its rules between markers, so an update replaces only that block. Git hooks are optional. It ends with a self-test: the green output is the proof, not the installer's word.",
      },
      {
        label: "What you get:",
        body:
          "7 hooks, 3 git gates, 32 tools with 10 test suites, 9 reviewer departments, the doctrine with 149 scars, a repo " +
          "template with CI and parsed boundary blocks, 4 coding routines and 7 desktop routines, an uninstaller, and docs " +
          "with the diagrams from this page.",
      },
      {
        label: "One honest note:",
        body: "the working rules have a full English version (PG_LANG=en, which the installer sets from your system language), and every block message includes an English BLOCKED line with its escape hatch. The doctrine and the reviewer checklists are still in Polish (the model reads them fine), and the README is in both languages.",
      },
    ],
    installLink: "Open the repository →",
    limitsTitle: "Honest limits",
    limits:
      "Foundation models via API: I do not train or fine-tune them. Reliability is proven at SME scale (dozens of " +
      "repositories, one owner), not hyperscale. Reviewer departments cost tokens (roughly four times one review for T2 " +
      "and eight to ten for T3), which is why zero-token gates run first. Some gates depend on the repository having what " +
      "they check, and skip with a logged reason when it does not. The point of this page is not that the system is " +
      "finished: it is that the failure modes of working with AI are engineered against, in the open, instead of being " +
      "wished away.",
    colophon:
      "This page went through the process it describes: an agent drafted it, it passed the gates above, and I reviewed and published it. The numbers came from commands run on the day it shipped, not from memory.",
  },

  pl: {
    title: "Coding Higher Mind: system AI, na którym stoi ta praca",
    tocLabel: "Spis treści",
    role: "Dwa narzędzia AI, wzmocnione polecenia, automatyczne kontrole na każdym kroku, recenzenci AI podzieleni na specjalizacje i pętla, która uczy się na błędach. Policzone, nie szacowane. Teraz jako open source.",
    intro:
      "Moje CV mówi, że kod piszą agenci AI, a ja odpowiadam za specyfikację, recenzję i wdrożenie. Takie twierdzenie wymaga dowodu, więc ta strona pokazuje sam system: co działa w tle, czego pilnuje, jak uczy się na własnych błędach i gdzie są jego granice. W skrócie: zmiana napisana przez AI nie trafi do produktu bez automatycznych kontroli, AI musi pokazać dowód, zanim powie „gotowe”, a z haseł i kluczy korzysta, nigdy ich nie widząc. Wszystko poniżej działa dziś. Każdą liczbę policzyła komenda uruchomiona w dniu publikacji: policzone, nie szacowane. Cały system to publiczne repozytorium, które zainstalujesz u siebie w pięć minut.",
    repoCta: "github.com/kamiljan11/coding-higher-mind →",
    stats: [
      { n: "1873", label: "zapisanych sesji agentów" },
      { n: "149", label: "awarii zamienionych w automatyczne kontrole" },
      { n: "23", label: "twarde stopy w bramkach gita" },
      { n: "9", label: "wyspecjalizowanych recenzentów AI" },
      { n: "51", label: "narzędzi 0-tokenowych" },
      { n: "40", label: "rutyn (5 code · 35 desktop)" },
      { n: "31", label: "repo pod ścisłą ochroną" },
      { n: "95", label: "kluczy i haseł, których AI nigdy nie widzi" },
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
      vault: "SEJF",
      vaultSub: "95 sekretów",
      vaultNote1: "klucze trafiają do procesu,",
      vaultNote2: "nigdy do czatu",
      memory: "PAMIĘĆ",
      memorySub: "1900+ notatek",
      memoryNote1: "ładowana na starcie sesji,",
      memoryNote2: "sesje same się opisują",
      gates: "BRAMKI",
      gatesList:
        "prompt · edycja · komenda · stop · commit · push · CI · review · dowód z produkcji",
      prod: ["MAS Group", "Workshop 3.0", "Flyt", "kamiljan.com", "strony klientów"],
      caption:
        "Ja wyznaczam kierunek. Każda zmiana przechodzi automatyczne kontrole (bramki), zanim trafi do produktu. Dowody wracają w górę.",
    },
    mindTitle: "Mapa myśli: z czego składa się „wyższy umysł”",
    mindLead:
      "System, który czuwa nad każdą sesją kodowania, nazywa się PG (Prompt-Guard). „Wyższy umysł” to nazwa z mojego drugiego długiego projektu, darmowego przewodnika po praktycznej duchowości, którego zasadą jest praktyka ponad przekonanie. Tutaj znaczy to tyle: reguła, której zamierzasz przestrzegać, to przekonanie; kontrola, która uruchamia się sama, to praktyka.",
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
            "zależności · duplikaty · TODO",
            "lint SQL · granice",
          ],
        },
        {
          title: "Działy recenzentów",
          leaves: [
            "kod · bezpieczeństwo · dane · ops",
            "ux · produkt · qa",
            "weryfikator · adwokat diabła",
          ],
        },
        {
          title: "Doktryna",
          leaves: ["projekt przed kodem", "„gotowe” wg poziomu ryzyka", "149 blizny"],
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
            "recenzent PR · stan zabezpieczeń",
            "nadzór CVE · kalibracja",
            "watchdog · backup · raporty",
          ],
        },
        {
          title: "Samotesty",
          leaves: ["każda bramka ma test", "pokrycie reguła → bramka", "cotygodniowy audyt"],
        },
      ],
      caption:
        "Osiem części, jedna zasada: nic ważnego nie istnieje tylko jako tekst. Każda reguła ma automatyczną kontrolę.",
    },
    ideasTitle: "Trzy idee, na których stoi całość",
    ideas: [
      {
        label: "Kontrole, nie spisane reguły:",
        body: "audyt, od którego wszystko się zaczęło, wykazał, że każda reguła zapisana tylko jako tekst była masowo łamana: 6 z 7 repozytoriów miało 0 spisanych decyzji architektonicznych, dziennik zmian był 105 commitów w tyle, recenzja kodu odbyła się tylko w 2,5 % sesji, a 79 % commitów trafiało prosto na gałąź główną. Agent AI może o regule zapomnieć, więc sama spisana reguła nie wystarczy. Wszystko, co ważne, uruchamia się teraz samo przy określonym zdarzeniu (to jest bramka), a każda bramka ma test, który dowodzi, że blokuje to, co powinna. Skrypt sprawdza, czy każda spisana reguła ma swoją bramkę.",
      },
      {
        label: "Każda awaria staje się kontrolą (blizna → bramka):",
        body: "149 prawdziwych awarii z moich projektów jest skatalogowanych, każda z identyfikatorem reguły. Nazywam je bliznami. Każdy punkt listy kontrolnej wskazuje bliznę, z której powstał (zasada z Google SRE). Analiza po awarii kończy się nową bramką albo nową blizną, nigdy obietnicą „będziemy uważniejsi”.",
      },
      {
        label: "Dowód, nie deklaracje:",
        body: "„gotowe” oznacza, że komenda została uruchomiona, zwróciła wynik (exit code), a stan po niej został sprawdzony. Każdy raport kończy się jednym słowem: VERIFIED, UNVERIFIED albo FAILED. Agenci AI mierzalnie zawyżają sukces (w jednym benchmarku 75,8 % zgłoszonych sukcesów nie miało dowodu) i ustępują, gdy się na nich naciska. Słowo statusu jest przeciwwagą.",
      },
    ],
    pipeTitle: "Życie jednej zmiany",
    pipeLead:
      "Dziewięć punktów kontrolnych uruchamia się samo w stałych momentach: gdy wysyłam polecenie, gdy agent edytuje plik, i tak dalej aż do produkcji. Nikt nie musi pamiętać o sprawdzaniu. Każdy czerwony wynik zatrzymuje zmianę w miejscu.",
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
        "lint + typy",
        "strażnik + no-verify",
        "tier + testy + recenzenci",
        "18 kontroli + sekrety",
        "bez main + rozmiar + cykle",
        "mutacje + sekrety",
        "tylko aktualny merge-ref",
        "200 z prawdziwej domeny",
      ],
      live: "LIVE",
      blocked:
        "każdy wyjątek to nazwany przełącznik (ALLOW_…=1), logowany i widoczny w cotygodniowym audycie · omijanie kontroli jest zakazane",
      caption:
        "Dziewięć punktów kontroli na drodze zmiany. Decyzje podejmuję ja; kontrole pilnują, żeby nic nie umknęło.",
    },
    gatesItems: [
      {
        label: "Gdy wysyłam polecenie:",
        body: "hook (skrypt uruchamiany przy zdarzeniu) dokleja do polecenia zasady pracy (protokół). Gdy zadanie jest niejasne, agent zadaje pytania zamiast zgadywać. Fakt wymaga najpierw otwarcia źródła. Przeszkoda, która blokuje pracę, trafia do pierwszej linii raportu. A na pytanie „jak idzie?” nie ma odpowiedzi „dobrze”: jest cel, budżet, ryzyka i decyzje, które należą do sponsora projektu.",
      },
      {
        label: "Po każdej edycji pliku, także tej zrobionej w terminalu:",
        body: "zmieniony plik jest sprawdzany pod kątem stylu i błędów typów (lint i typecheck). Błędy wracają od razu do agenta, który go edytował, w tej samej sesji.",
      },
      {
        label: "Przy każdej komendzie w terminalu:",
        body: "strażnik blokuje groźne komendy: pomijanie kontroli (--no-verify), nadpisywanie lub kasowanie historii (force-push, twardy reset), rekurencyjne kasowanie poza katalogami buildu, scalanie pull requestów ze skryptu, sekrety wpisane w komendę i uruchamianie pobranego skryptu prosto w powłoce (curl | sh).",
      },
      {
        label: "Gdy sesja się kończy:",
        body: "bramka końcowa ocenia, jak ryzykowna jest zmiana (poziom ryzyka, tzw. tier), na podstawie tego, co faktycznie się zmieniło: ścieżek i rozmiaru, nigdy treści polecenia. Uruchamia lint, typy i testy na wszystkim, co się zmieniło. Sesji na poziomie T2 lub wyższym nie da się zamknąć, dopóki nie sprawdzą jej wymagani recenzenci AI.",
      },
      {
        label: "Przy każdym commicie:",
        body:
          "18 twardych stopów: konwencjonalny opis; skan sekretów; świeżość bazy (klon o niepowiązanej historii jest " +
          "blokowany); powtórzone literały w nowym kodzie; nowa zależność musi istnieć w npm lub PyPI i nie być o jedną " +
          "literówkę od popularnej paczki; zakomentowany kod; nowe TODO bez wiersza w rejestrze; kolumna z danymi " +
          "osobowymi bez wiersza w inwentarzu prywatności; lint migracji SQL (row-level security z USING i WITH CHECK, " +
          "higiena definera, klucze obce tenantów); parser workflowów GitHuba na plikach workflow; usunięty krok " +
          "bezpieczeństwa w CI.",
      },
      {
        label: "Przy każdym wysłaniu zmian (push):",
        body: "nic nie trafia prosto na gałąź główną (main). Zmiana powyżej 400 linii kodu źródłowego jest dzielona na mniejsze. Nowy cykl importów albo import łamiący warstwy opisane w dokumencie architektury jest blokowany. Gdy na tej samej gałęzi ktoś inny commitował w ciągu ostatnich 24 godzin, pojawia się ostrzeżenie.",
      },
      {
        label: "Na serwerze budującym (CI) i przy scalaniu:",
        body: "te same kontrole uruchamiają się jeszcze raz, a do tego skaner sekretów (gitleaks) i testy mutacyjne na zmienionych plikach: narzędzie celowo wprowadza drobne błędy, a test, który nie wyłapie żadnego, to teatr. 31 repozytoriów ma ścisłą ochronę gałęzi, generowaną z nazw zadań w CI. Skrypt scalający przyjmuje pull request tylko wtedy, gdy kontrole przeszły na aktualnym wyniku scalenia: bo kiedyś zielone kontrole na nieaktualnej bazie zepsuły gałąź główną na produkcji.",
      },
    ],
    tierTitle: "Poziom ryzyka (tier): liczony ze zmiany, nigdy deklarowany",
    tierLead:
      "Liczba kontroli jest proporcjonalna, i to też jest pilnowane. Prototyp nie jest zmuszany do spisywania decyzji architektonicznych. Zmiana w płatnościach nie zamknie się bez przeglądu bezpieczeństwa.",
    tiers: [
      {
        label: "T0:",
        body: "dokumentacja, teksty, style, grafiki: tylko kontrole skryptowe, bez zużycia tokenów AI.",
      },
      {
        label: "T1:",
        body: "pojedynczy, odizolowany komponent albo funkcja pomocnicza: recenzja kodu jest zalecana.",
      },
      {
        label: "T2:",
        body: "wspólna logika, endpointy API, funkcje brzegowe (edge functions), zależności, konfiguracja CI lub buildu albo ponad 150 linii. Wymagana recenzja kodu i operacji; do tego UX, gdy zmienia się interfejs, i danych, gdy zmienia się schemat bazy.",
      },
      {
        label: "T3:",
        body: "logowanie i uprawnienia (auth, row-level security, multi-tenancy), płatności, sekrety, migracje SQL, zadania cykliczne, panel admina albo ponad 600 linii. Wymagana recenzja kodu, bezpieczeństwa, danych i operacji, a potem weryfikator. Role bezpieczeństwa, danych i weryfikatora działają na najmocniejszym modelu.",
      },
      {
        label: "Dla każdego repozytorium:",
        body: "minimalny poziom ryzyka, etap życia projektu (prototype · poc · mvp · production) i opcjonalny adres do testów QA. Przejście na produkcję wymaga spisanego przeglądu gotowości produkcyjnej w tym samym commicie. Gdy adres QA jest ustawiony, recenzent QA staje się obowiązkowy przy zmianach T3 dotykających interfejsu.",
      },
    ],
    reviewTitle: "Review jak w software housie, nie jak na czacie",
    reviewLead:
      "Każdy recenzent AI odpowiada za jedną specjalizację i zaczyna od zera (świeży kontekst). Ich uwagi łączy skrypt, nie model: problem blokuje zmianę tylko wtedy, gdy niezależnie zgłosi go wystarczająco wielu recenzentów albo odtworzy go weryfikator, a problem bez dowodu odpada (reguła k-z-n). Jedynym zadaniem weryfikatora jest obalanie.",
    review: {
      orchestrator: "ORKIESTRATOR",
      gates: "SKRYPTY",
      gatesSub: "lint · typy · testy · SQL",
      finders: ["kod", "bezpieczeństwo", "dane · operacje", "ux · produkt · qa"],
      aggregate: "AGREGACJA",
      aggregateSub: "k-z-n · z dowodem",
      verifier: "WERYFIKATOR",
      verifierSub: "odtwórz albo obal",
      fixer: "FIX + BRAMKI",
      rule: "zero czatu między agentami · uwaga bez wykonanej komendy się nie liczy",
      caption:
        "Recenzenci dostają tylko kod po kontrolach skryptowych. Uwagi łączy skrypt. Weryfikator szuka błędów, a nie potwierdzeń.",
    },
    reviewItems: [
      {
        label: "Dziewięciu recenzentów:",
        body: "kod, bezpieczeństwo, dane, operacje, UX, produkt, QA, weryfikator i adwokat diabła (catfish). Każdy pracuje według listy najwyżej ośmiu ponumerowanych reguł. Każda reguła ma komendę do uruchomienia, zasady oceny wagi błędu, stały format wyniku (schemat JSON) i przykład fałszywego alarmu, który trzeba odrzucić. Recenzenci tylko czytają; poprawki robi główna sesja.",
      },
      {
        label: "Dlaczego od zera:",
        body: "autor kodu, człowiek czy model, nie widzi własnych błędów. Recenzenci zaczynają od zera, dostają tylko zmianę i zadanie i nigdy nie widzą uwag pozostałych. Agenci, którzy ze sobą dyskutują, dryfują ku większości, nawet gdy rację miała mniejszość.",
      },
      {
        label: "Narady z adwokatem diabła:",
        body: "decyzje architektoniczne przechodzą stałe kroki: fakty → stanowiska → obowiązkowy głos sprzeciwu → agregacja → spisana decyzja. Wstrzyknięty sprzeciw to jedyna interwencja, co do której wykazano, że ogranicza porażki wynikające z „cichej zgody” w grupach agentów.",
      },
      {
        label: "Kalibrowane co miesiąc:",
        body: "raz w miesiącu ten sam błąd jest podany na dwa sposoby: sama zmiana oraz ta sama zmiana z przekonującym opisem. Sprawdza go sześciu świeżych recenzentów w losowej kolejności. Rozbieżność oznacza, że na ocenę wpływa długość albo opis, a listę reguł poprawia człowiek. Audytor nigdy nie poprawia narzędzia, którym mierzy.",
      },
    ],
    loopTitle: "Każda awaria staje się kontrolą: jak system się uczy",
    loopLead:
      "Awaria nie jest zamknięta, gdy zostanie naprawiona. Jest zamknięta dopiero wtedy, gdy nie może się powtórzyć bez tego, żeby zauważył to skrypt. Każdą skatalogowaną awarię nazywam blizną.",
    loop: {
      steps: [
        "incydent albo powtórzona korekta",
        "analiza przyczyn: pięć „dlaczego”",
        "blizna + numer reguły",
        "bramka + test, że blokuje",
        "każda reguła ma bramkę",
        "cotygodniowy audyt",
      ],
      caption:
        "Pętla napędza się sama: cotygodniowy audyt wyłapuje kontrole, które przestały działać, i każda z nich staje się nową blizną.",
    },
    loopItems: [
      {
        label: "Nieaktualna baza zepsuła main:",
        body: "dwa pull requesty przeszły kontrole, ale każdy był sprawdzany na własnej, starszej kopii gałęzi głównej. Scalone razem dały nieprawidłowy plik workflow na gałęzi głównej. Teraz: scalanie tylko wtedy, gdy kontrole przeszły na aktualnym wyniku scalenia, ścisła ochrona gałęzi w 31 repozytoriach i blizna opisująca dokładny mechanizm.",
      },
      {
        label: "Kontrola, która nigdy nie ruszyła:",
        body: "bramka przy pushu czytała dane wejściowe dwa razy i przez sześć dni po cichu nic nie robiła. Teraz każdy hook gita ma test, który uruchamia cały skrypt na prawdziwych danych, a cotygodniowy audyt sprawdza, czy bramki nadal blokują to, co powinny.",
      },
      {
        label: "45 kopii tożsamości firmy:",
        body: "rozsianych po 11 plikach, a każdy z nich przeszedł lint, typy, testy i recenzję. Teraz nowe linie przechodzą kontrolę duplikatów: ten sam tekst trzy razy w dwóch plikach jest blokowany. Wyjątek jest możliwy, ale każde jego użycie jest logowane.",
      },
      {
        label: "Faktura, która po cichu zmieniła sprzedawcę:",
        body: "wartość domyślna („?? domyślny”) po cichu podmieniła sprzedawcę po usunięciu profilu. Teraz cicha wartość zastępcza (SILENT-FALLBACK) na każdym polu, które ma skutki, blokuje zmianę w recenzji kodu: gdy brak dopasowania, kod ma przerwać z nazwanym błędem.",
      },
    ],
    sections: [
      {
        title: "Dwa narzędzia AI, jeden system",
        items: [
          {
            label: "Claude Code:",
            body: "narzędzie terminalowe do pracy z kodem: ta strona, produkcyjne aplikacje MAS Group, Flyt i systemu warsztatowego oraz ich CI. Z GitHubem, pocztą, przeglądarką i pulpitem łączy się przez serwery MCP (konektory). To tu działają hooki i bramki gita.",
          },
          {
            label: "Claude Desktop (Cowork):",
            body: "narzędzie do operacji: porządkowanie poczty, dokumenty, wyszukiwanie informacji, kontakt z klientami (outreach), projektowanie i rutyny, które utrzymują przy życiu sam system. Nie ma tam hooków, więc zasady pracy jadą jako tekst w każdym poleceniu.",
          },
          {
            label: "105 skilli:",
            body: "wersjonowane pakiety instrukcji, do których trafiają zadania: 50 w narzędziu do kodu, 55 na pulpicie. Router dopasowuje zadanie według stałych reguł (deterministycznie) i przed startem ogłasza, jakie kroki wykona.",
          },
          {
            label: "Dobór modelu:",
            body: "najmocniejszy model jest zarezerwowany na trudne rozumowanie oraz na recenzje bezpieczeństwa, danych i weryfikację przy T3. Rutynowa praca z narzędziami i wyszukiwanie idą do tańszych modeli. Moc obliczeniowa to budżet, a system wydaje go świadomie.",
          },
        ],
      },
    ],
    statusTitle:
      "VERIFIED · UNVERIFIED · FAILED: słowo statusu, które nie pozwala AI mówić tego, co chcesz usłyszeć",
    statusLead:
      "Każdy istotny raport kończy się jednym z trzech słów. To najmniejsza część systemu i najłatwiejsza do przeniesienia gdzie indziej, zwłaszcza do Claude Desktop (Cowork), gdzie nie ma hooków i jedyną ochroną jest samo polecenie.",
    statusItems: [
      {
        label: "VERIFIED:",
        body: "twierdzenie ma dołączony dowód, zacytowany, nie opisany: komendę i jej kod wyjścia, status HTTP, linię z wyniku testów, diff, ścieżkę do zrzutu ekranu.",
      },
      {
        label: "UNVERIFIED:",
        body: "praca jest zrobiona, ale brakuje dowodu. Raport mówi dokładnie, czego brakuje, jak to sprawdzić i co zmieniłoby wniosek. Raport bez słowa statusu liczy się jako UNVERIFIED.",
      },
      {
        label: "FAILED / BLOCKED:",
        body: "co się stało, dosłownie, bez łagodzenia. Przeszkoda (brak dostępu, decyzji, danych albo sekretu, zepsute narzędzie) trafia do pierwszej linii raportu, nigdy na koniec.",
      },
      {
        label: "Dlaczego to istnieje:",
        body: "gdy użytkownik naciska błędnym twierdzeniem, modele przyznają mu rację w około 58 % przypadków. Przewidują 61–77 % sukcesu, a osiągają 22–35 %. Im dłużej trwa rozmowa, tym bardziej model przejmuje Twój sposób myślenia i Twoją pewność. Słowo statusu zmusza każde twierdzenie, by pokazało dowód albo przyznało, że go nie ma. A pytanie „jesteś pewien?” sprawia, że model sprawdza dowody od nowa, zamiast grzecznie zmienić zdanie.",
      },
    ],
    statusCoworkLabel: "W Claude Desktop i zadaniach cyklicznych:",
    statusCowork:
      "do każdego polecenia w tle dołączany jest siedmioliniowy blok weryfikacji: nie zakładaj, że polecenie jest prawdziwe; możesz odmówić i zgłosić porażkę; przeformułuj twierdzenia na neutralne pytania; zero sukcesu bez dowodu; zaatakuj własny wynik przed raportem; sprawdź od nowa, gdy ktoś podważa; zakończ słowem statusu. Blok jest w repozytorium, gotowy do wklejenia.",
    vaultSectionTitle: "Hasła i klucze, których AI nigdy nie widzi",
    vaultFlow: {
      vault: "SEJF",
      vaultSub: "95 sekretów · self-hosted",
      bridge: "POŚREDNIK",
      bridgeSub: "przekazuje do procesu",
      target: "PROCES DOCELOWY",
      targetSub: "deploy · wywołanie API · CI",
      never: ["czat ✕", "kod ✕", "logi ✕"],
      caption: "Agent może użyć hasła lub klucza, którego nigdy nie zobaczy.",
    },
    vaultItems: [
      {
        label: "Sejf na moim własnym sprzęcie:",
        body: "95 kluczy API, tokenów i loginów leży w sejfie (vault) na moim własnym sprzęcie. Pośrednik przekazuje je prosto do procesu, który ich potrzebuje, jako zmienne środowiskowe. Wartości nigdy nie pojawiają się w czacie, kodzie ani logach. Strażnik komend blokuje sekret wpisany w komendę, a skany przy commicie i w CI pilnują, żeby tak zostało.",
      },
    ],
    schedTitle: "Rutyny: część, która działa, gdy nikt nie pisze",
    schedLead:
      "Pięć rutyn w runtime kodowym, 35 zdefiniowanych na pulpicie, 10 z nich włączonych. Najpierw deterministyczny skrypt, model tylko przy znaleziskach; wszystko, co mogłoby „znajdować sobie robotę”, jest wyłączone z założenia.",
    cadence: [
      { name: "Recenzent PR", dots: 5, freq: "dni robocze rano" },
      { name: "Watchdog", dots: 5, freq: "co 2 godziny" },
      { name: "Backup konfiguracji + skrypt restore", dots: 5, freq: "codziennie" },
      { name: "Sesje → notatki pamięci", dots: 4, freq: "codziennie / pn + czw" },
      { name: "Stan zabezpieczeń", dots: 1, freq: "co tydzień" },
      { name: "Tygodniowy raport systemu", dots: 1, freq: "niedziela" },
      { name: "Nadzór CVE", dots: 1, freq: "co miesiąc" },
      { name: "Kalibracja recenzentów", dots: 1, freq: "co miesiąc" },
      { name: "Sprzątacz repo", dots: 0, freq: "tylko ręcznie", manual: true },
    ],
    schedItems: [
      {
        label: "Recenzent PR (dni robocze):",
        body: "przegląda otwarte pull requesty we wszystkich moich repozytoriach tak, jak zrobiłby to senior. Poprawki mechaniczne trafiają jako osobne commity z dowodem. Uwagi o projekcie i bezpieczeństwie zostają komentarzami: decyzja należy do mnie.",
      },
      {
        label: "Stan zabezpieczeń (co tydzień):",
        body: "33 kontrole skryptowe tego, czy system jakości nadal jest podłączony: czy hooki są zarejestrowane, czy bramki nadal blokują to, co powinny, które wyjątki zostały użyte i dlaczego, która rutyna wystartowała i nie skończyła.",
      },
      {
        label: "Nadzór podatności (CVE, co miesiąc):",
        body: "najpierw skrypt skanuje zależności działających produktów: bez zużycia tokenów AI, gdy nic nie znajdzie. Poprawki to wyłącznie aktualizacje patch/minor i zawsze jako pull requesty z dowodem, nigdy prosto na main.",
      },
      {
        label: "Watchdog (co dwie godziny, Claude Desktop):",
        body: "wyłapuje rutyny spóźnione albo przerwane w trakcie, ponawia je i naprawia, co się da. Powiadomienie na telefon wysyła tylko wtedy, gdy sam nie da rady. Pracę przerwaną przez limit użycia wznawia od zapisanego punktu (checkpointu).",
      },
      {
        label: "Kopia zapasowa ze skryptem przywracania (codziennie, Claude Desktop):",
        body: "pełna kopia konfiguracji agenta i wygenerowany skrypt, który jednym kliknięciem odtwarza ją na nowej maszynie. Kopia, której nigdy nie odtworzono, nie jest kopią zapasową. Dlatego skrypt przywracania jest jej częścią.",
      },
    ],
    memTitle: "Pamięć, pomiary i retrospektywa, która przebudowała system",
    memItems: [
      {
        label: "Pamięć trwała:",
        body: "lokalna baza 1900+ notatek ładuje się na starcie każdej sesji. Każda sesja przy zamknięciu sama zapisuje notatki, więc następna startuje od zapisanego punktu, a nie od zera.",
      },
      {
        label: "Telemetria, nie odczucia:",
        body: "każde pominięcie kontroli jest logowane z powodem. Skrypty przekopują 1873 zapisy sesji i historię gita 39 repozytoriów: korekty na sesję, powtarzające się błędy narzędzi, poprawki w ciągu 24 godzin od poprzedniego commitu w tym samym pliku i pliki zmieniane najczęściej. To liczby decydują, co staje się bramką.",
      },
      {
        label: "Retrospektywa, która miała znaczenie:",
        body: "dwanaście pętli naprawczych z jednej sesji prześledzono do przyczyn. Trzy miały ten sam defekt: system deklarował kontrolę, której fizycznie nie miał. Odpowiedź była strukturalna: każda bramka dostała test dowodzący, że blokuje, a sprawdzanie, czy każda reguła ma bramkę, stało się skryptem.",
      },
      {
        label: "Ta sama metoda, zastosowana do mnie:",
        body:
          "moja praktyka czytania kodu jest zbudowana jak reszta systemu, codziennie, weryfikowalnie, publicznie: " +
          "github.com/kamiljan11/code-reading-quest.",
      },
    ],
    scaleTitle: "Czy to się sprawdza przy dużej skali?",
    scaleItems: [
      {
        label: "Uczciwa odpowiedź:",
        body: "jedna funkcja to nic trudnego. System na 200 tysięcy linii, z zależnościami między plikami i niespisanymi założeniami architektonicznymi, to miejsce, gdzie spójność się rozjeżdża. Dlatego założenia są zapisane tam, gdzie skrypt je przeczyta: dokument architektury każdego repozytorium ma czytelny dla maszyny blok warstw i zakazanych importów, a bramka przy pushu blokuje nowy cykl importów albo import łamiący warstwy. Stare cykle tylko ostrzegają. Długu historycznego nigdy nie sprząta się automatycznie.",
      },
      {
        label: "Zasięg zmiany przed edycją:",
        body: "zmieniany plik, który importuje ponad 40 innych plików, jest oznaczany. Krok projektowy przed kodem pyta: kto to wywołuje, co jeszcze czyta te dane i na jaki poziom ryzyka trafia zmiana.",
      },
      {
        label: "Czytelne dla człowieka, nie tylko dla maszyny:",
        body: "indeks narzędzi i mapa systemu są generowane z nagłówków samych narzędzi; narzędzie bez opisu pokazuje się jako dług. Każdą decyzję o stylu ocenia jedno pytanie: czy doświadczony programista, który nigdy nie widział repozytorium, uruchomi je w 15 minut, w 15 minut znajdzie miejsce do zmiany i zrozumie dlaczego, bez czytania zapisów moich sesji?",
      },
    ],
    installTitle: "Zainstaluj to u siebie",
    installLead:
      "Cały system to publiczne repozytorium, oczyszczone z prywatnych danych i przenośne. Potrzebujesz tylko Node 20+, gita i Claude Code.",
    installSteps: [
      "git clone " + REPO_URL + ".git",
      "node install.mjs --dry-run   # pokazuje plan, niczego nie dotyka",
      "node install.mjs --yes       # kopiuje do ~/.claude, dokleja hooki, blok CLAUDE.md, włącza hooki gita",
    ],
    installItems: [
      {
        label: "Co obiecuje instalator:",
        body: "nigdy nie nadpisuje pliku, który zmieniłeś (druga wersja ląduje obok Twojej). Scala Twoje ustawienia zamiast je podmieniać. Dokleja reguły między znacznikami, więc aktualizacja podmienia tylko ten blok. Hooki gita są opcjonalne. Na końcu uruchamia samotest: dowodem jest zielony wynik, a nie słowo instalatora.",
      },
      {
        label: "Co dostajesz:",
        body:
          "7 hooków, 3 bramki gita, 32 narzędzia z 10 zestawami testów, 9 działów recenzentów, doktrynę ze 149 bliznami, " +
          "szablon repo z CI i parsowanymi blokami granic, 4 rutyny kodowe i 7 pulpitowych, deinstalator oraz dokumentację " +
          "z diagramami z tej strony.",
      },
      {
        label: "Jedna uczciwa uwaga:",
        body: "zasady pracy mają pełną wersję angielską (PG_LANG=en, instalator ustawia ją według języka systemu), a każdy komunikat blokady ma angielską linię BLOCKED z opisem wyjątku. Doktryna i listy reguł recenzentów są na razie po polsku (model czyta je bez problemu), a README jest w obu językach.",
      },
    ],
    installLink: "Otwórz repozytorium →",
    limitsTitle: "Uczciwe granice",
    limits:
      "Modele fundacyjne przez API: nie trenuję ich ani nie fine-tunuję. Niezawodność jest udowodniona w skali MŚP " +
      "(dziesiątki repozytoriów, jeden właściciel), nie hyperscale. Działy recenzentów kosztują tokeny (mniej więcej " +
      "cztery recenzje dla T2 i osiem do dziesięciu dla T3), dlatego bramki 0-tokenowe idą pierwsze. Część bramek zależy " +
      "od tego, czy repozytorium ma to, co sprawdzają, i pomija się z zalogowanym powodem, gdy nie ma. Sensem tej strony " +
      "nie jest to, że system jest skończony: tylko to, że tryby awarii pracy z AI są tu obudowane inżynierią, jawnie, " +
      "zamiast być zaklinane.",
    colophon:
      "Ta strona przeszła przez proces, który opisuje: szkic napisał agent, tekst przeszedł przez opisane wyżej bramki, a ja go zrecenzowałem i opublikowałem. Liczby pochodzą z komend uruchomionych w dniu publikacji, nie z pamięci.",
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
  const bw = 180;
  // Leaves wrap to the box width (10px italic ≈ 30 chars here). A wrapped
  // leaf's second line sits closer than the next leaf, so a two-line item
  // still reads as one item; boxes and rows grow with the tallest branch.
  const leafGroups = t.branches.map((b) => b.leaves.map((l) => wrapLabel(l, 30)));
  const leafY = leafGroups.map((groups) => stackLines(groups, 38, 12, 18));
  const bh = Math.max(38, ...leafY.flat(2)) + 16;
  const gap = 32;
  const rowY = [0, 1, 2, 3].map((r) => 36 + r * (bh + gap));
  const bottom = rowY[3] + bh;
  const cx = 380;
  const cy = (36 + bottom) / 2;
  // Branch anchors: two columns of four, connected to the centre by curves.
  const pos = [...rowY.map((y) => ({ x: 30, y })), ...rowY.map((y) => ({ x: 550, y }))];
  return (
    <div className="aid-scroll">
      <svg
        viewBox={`0 0 760 ${String(bottom + 44)}`}
        className="aid"
        role="img"
        aria-label={t.caption}
      >
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
              {leafGroups[i].map((lines, k) =>
                lines.map((l, j) => (
                  <text
                    key={`${String(k)}-${String(j)}`}
                    x={p.x + bw / 2}
                    y={p.y + leafY[i][k][j]}
                    textAnchor="middle"
                    className="aid-xs"
                  >
                    {l}
                  </text>
                )),
              )}
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
        <text x={cx} y={bottom + 30} textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: the life of a change (N stages) ══ */
/* Chips alternate between two rows, so a chip may be almost two steps wide
   without touching its same-row neighbours; the rows are stacked with a gap,
   so neighbours in the other row never overlap either. Labels are wrapped to
   CHIP_CHARS per line (wrapLabel), and the heights follow the longest label —
   the copy can change without anything spilling out of its box. */
const CHIP_CHARS = 20;
const CHIP_LINE = 13;

function AiPipeline({ t }: { t: PipeLabels }) {
  const n = t.stages.length;
  const x0 = 78;
  const x1 = 652;
  const step = (x1 - x0) / (n - 1);
  const xs = Array.from({ length: n }, (_, i) => x0 + i * step);
  const chipW = Math.min(128, 2 * step - 16);
  const chips = t.gates.map((g) => wrapLabel(g, CHIP_CHARS));
  const chipH = 10 + CHIP_LINE * Math.max(...chips.map((c) => c.length));
  const rowY = [94, 94 + chipH + 16];
  const blocked = wrapLabel(`✕ ${t.blocked}`, 110);
  const blockedY = rowY[1] + chipH + 26;
  const captionY = blockedY + 14 * (blocked.length - 1) + 24;
  return (
    <div className="aid-scroll">
      <svg
        viewBox={`0 0 760 ${String(captionY + 12)}`}
        className="aid"
        role="img"
        aria-label={t.caption}
      >
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
          const y = rowY[i % 2];
          const lines = chips[i];
          // vertically centre however many lines this chip has
          const firstLine = y + chipH / 2 - ((lines.length - 1) * CHIP_LINE) / 2 + 3.5;
          return (
            <g key={i}>
              <circle cx={x} cy="62" r="5" className="aid-node" />
              <text x={x} y={i % 2 === 0 ? 42 : 28} textAnchor="middle" className="aid-s aid-stage">
                {t.stages[i]}
              </text>
              <path
                d={`M${String(x)} 70 L${String(x)} ${String(y - 2)}`}
                className="aid-ln aid-thin"
              />
              <rect
                x={x - chipW / 2}
                y={y}
                width={chipW}
                height={chipH}
                rx="7"
                className="aid-chip"
              />
              {lines.map((line, j) => (
                <text
                  key={j}
                  x={x}
                  y={firstLine + j * CHIP_LINE}
                  textAnchor="middle"
                  className="aid-xs aid-chip-t"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {blocked.map((line, j) => (
          <text
            key={j}
            x="380"
            y={blockedY + j * 14}
            textAnchor="middle"
            className="aid-xs aid-red"
          >
            {line}
          </text>
        ))}
        <text x="380" y={captionY} textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: review pipeline ══ */
function AiReview({ t }: { t: ReviewLabels }) {
  // Both boxes stay centred on y=94 (where the arrows meet) and grow with
  // their wrapped labels: bold 13px fits ~13 chars in the 130px band, 10px
  // italic ~18 chars in the 112px aggregate box.
  const gateLines = wrapLabel(t.gates, 13);
  const bandH = 46 + 16 * gateLines.length;
  const bandY = 94 - bandH / 2;
  const aggLines = wrapLabel(t.aggregateSub, 18);
  const aggH = 42 + 14 * aggLines.length;
  const aggY = 94 - aggH / 2;
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
        <rect x="180" y={bandY} width="130" height={bandH} rx="9" className="aid-band" />
        {gateLines.map((line, j) => (
          <text
            key={j}
            x="245"
            y={bandY + 22 + 16 * j}
            textAnchor="middle"
            className="aid-t aid-accent"
          >
            {line}
          </text>
        ))}
        <text
          x="245"
          y={bandY + 40 + 16 * (gateLines.length - 1)}
          textAnchor="middle"
          className="aid-xs"
        >
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

        <rect x="508" y={aggY} width="112" height={aggH} rx="9" className="aid-box" />
        <text x="564" y={aggY + 22} textAnchor="middle" className="aid-t">
          {t.aggregate}
        </text>
        {aggLines.map((line, j) => (
          <text key={j} x="564" y={aggY + 40 + 14 * j} textAnchor="middle" className="aid-xs">
            {line}
          </text>
        ))}

        <path
          d={`M564 ${String(aggY + aggH)} L564 148`}
          className="aid-ln"
          markerEnd="url(#airv)"
        />
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
  const [lang] = useLang("en");

  const c = CONTENT[lang];
  const bodyRef = useRef<HTMLElement>(null);

  return (
    <div className="cv-page">
      <div className="read-progress" aria-hidden="true" />
      <article className="cv-paper" ref={bodyRef}>
        <header className="cv-head">
          <h1>{c.title}</h1>
          <p className="cv-role">{c.role}</p>
        </header>

        {/* sixteen screens on a phone: the reader gets a way to jump */}
        <PageToc bodyRef={bodyRef} label={c.tocLabel} lang={lang} />

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
