import { REPO_URL } from "../../lib/skillsCatalog";
import type { Content } from "../../components/claude/types";
import { explainEn, explainUiEn } from "./explain.en";
import { tellPartEn, tellSectionsEn } from "./tell.en";

// Every number on this page was recounted on 2026-10-14 (sources and commands: docs/CLAUDE-PAGE-NUMBERS.md). A number that was not recounted says so and carries its own date.

export const en: Content = {
  title: "Coding Higher Mind: the AI system behind the work",
  role: "A meta layer under every project I build with AI: hardened prompts, automatic checks at every step, AI reviewers split by speciality, and a loop that turns failures into checks. Counted where it can be; estimates are marked as estimates. Open source.",
  tocLabel: "On this page",
  mapTitle: "How this page is laid out",
  mapLead:
    "Seven parts. Pick the one you came for; every section has its own link, and a small square marks the ones with a chart. In a hurry? The last part tells the whole system in 30 seconds.",
  versionLine:
    "PG v1.8.0, as of October 14, 2026. Fifteen public versions in 33 days, and as of that date the system is complete: it is now in maintenance mode, and the section “Where improving stops” explains what that means and why.",
  intro:
    "My CV says AI coding agents write the code, while I own the specification, the review and the deploy. A claim like that needs evidence, so this page shows the system itself: what runs in the background, what it enforces, how it learns from its own failures, and where it stops. PG (Prompt-Guard) is not a project; it sits under all of them. Whatever repository an agent opens on my machine, the same rules apply: a change written by AI does not reach a product without passing automatic checks, the AI shows proof before it says “done”, and it uses passwords and keys without ever seeing them. Everything below runs today unless a section says otherwise. Two things do not: the release pipeline from version 1.7.0 has not had its first drill on a test project yet, and the scheduled routines are switched off until I fix their setup after a computer move. The whole system is a public repository you can install in five minutes.",
  repoCta: "github.com/kamiljan11/coding-higher-mind →",
  stats: [
    { n: "170", label: "past failures turned into checks" },
    { n: "11", label: "hooks on 7 kinds of event" },
    { n: "9", label: "specialist AI reviewers" },
    { n: "51", label: "tools that use no AI tokens" },
    { n: "606", label: "checks in the gate test battery" },
    { n: "15", label: "public versions in 33 days" },
    { n: "31 / 47", label: "repos under strict branch protection" },
    { n: "157", label: "keys and passwords the AI never sees" },
  ],
  statsNote:
    "Counted on October 14, 2026: hooks, tools, reviewers and scars in the public repository; tests, protection and secrets on my machine and on GitHub.",
  parts: [
    { title: "What it is", blurb: "The system on one map, and the three ideas it rests on." },
    {
      title: "How a change is guarded",
      blurb:
        "From the prompt to production: gates, risk tiers, exceptions, merging, review, learning.",
    },
    {
      title: "Architecture and releases",
      blurb: "How design decisions stay decided, and how a release goes out and comes back.",
    },
    {
      title: "Proportion, and where improving stops",
      blurb:
        "The context bill, calibrated gates, and the line after which more rules make things worse.",
    },
    {
      title: "Trust and operations",
      blurb: "Status words, secrets, routines, memory, and whether it holds at scale.",
    },
    {
      title: "History and use",
      blurb: "Fifteen versions, how to install it, and the honest limits.",
    },
    tellPartEn,
  ],
  sections: [
    /* ── Part 1: what it is ── */
    {
      id: "map",
      part: 0,
      title: "The whole machine on one map",
      lead: "I set the direction. Two AI tools do the work. PG sits underneath both, and every change passes its checks before it reaches any project.",
      figure: "arch",
      items: [
        {
          label: "Claude Code:",
          body: "the terminal tool for everything that is code: apps, websites, automations and their CI. It reaches GitHub, mail, the browser and the desktop through MCP connectors. This is where the hooks and git gates apply.",
        },
        {
          label: "Claude Desktop (Cowork):",
          body: "the tool for operations: mail, documents, research, outreach and design. It has no hooks, so the working rules travel as text inside every prompt, and the status word at the end of each report is the main protection.",
        },
        {
          label: "73 skills:",
          body: "versioned instruction packages that tasks are routed to, 56 in the coding tool and 58 on the desktop, 41 of them installed in both. A router matches each task by fixed rules and announces which steps it will run before the work starts.",
        },
        {
          label: "The right model for the job:",
          body: "the main session plans and checks. Helper agents get a model sized to the task: the smallest for lookups, the middle one for writing and checklist reviews, the strongest for hard reasoning and for security, data and verification on risky changes. Capacity is a weekly budget, and the system spends it on purpose.",
        },
      ],
    },
    {
      id: "mind",
      part: 0,
      title: "Mind map: what “higher mind” is made of",
      lead: "PG stands for Prompt-Guard: it began as a protocol injected into every prompt and grew into the whole quality system. “Higher mind” comes from my other long project, a free guidebook on practical spirituality, whose rule is practice over belief. Here that means: a rule you intend to follow is a belief; a check that runs on its own is a practice.",
      figure: "mind",
    },
    {
      id: "ideas",
      part: 0,
      title: "Three ideas the whole thing rests on",
      figure: "ideas",
      items: [
        {
          label: "Checks, not written rules:",
          body: "the audit that started all this found that every rule written only as text was broken at scale: 6 of 7 repositories had no architecture decision records, the changelog was 105 commits behind, code review ran in 2.5 % of sessions, and 79 % of commits went straight to the main branch. An agent can forget a rule, so a written rule is not enough. Everything that matters runs by itself when something happens (that is a gate), every gate has a test proving it blocks, and a script checks that every written rule has a gate.",
        },
        {
          label: "Every failure becomes a check (scar → gate):",
          body: "170 real failures from my projects are catalogued, each with a rule id. I call them scars. Every checklist item cites the scar it came from, a habit taken from Google SRE. A postmortem ends with a new gate or a new scar, never with “be more careful”.",
        },
        {
          label: "Proof, not claims:",
          body: "“done” means a command ran, it returned an exit code, and the state afterwards was checked. Every report ends with one word: VERIFIED, UNVERIFIED or FAILED. AI agents measurably overstate success (in one benchmark 75.8 % of reported successes had no evidence) and they give in when pushed. The status word is the counterweight.",
        },
      ],
    },

    /* ── Part 2: how a change is guarded ── */
    {
      id: "life-of-a-change",
      part: 1,
      title: "The life of one change",
      lead: "Nine checkpoints run by themselves at fixed moments, from the prompt to production. Nobody has to remember to check, and a red result stops the change where it is.",
      figure: "pipe",
      items: [
        {
          label: "When I send a prompt:",
          body: "a hook adds the working rules to the prompt. If the task is unclear, the agent asks instead of guessing. A fact needs an opened source first. Anything that blocks the work goes in the first line of the report, and “how is it going?” never gets “fine”: it gets the goal, the budget, the risks and the decisions that are mine to make.",
        },
        {
          label: "After every file edit, including edits made in the terminal:",
          body: "the changed file is checked for style and type errors, and the errors go straight back to the agent that made the edit, in the same session.",
        },
        {
          label: "At every terminal command:",
          body: "a guard blocks the dangerous ones: skipping the checks (--no-verify), rewriting or throwing away history (force-push, hard reset), recursive deletes outside build folders, merging from a script other than the one that demands proof of review, secrets typed into a command, and a downloaded script run straight in the shell (curl | sh). It reads a command the way the shell would, so it also sees commands hidden inside sh -c, $(…), heredocs whose text the shell will execute, encoded PowerShell, or tricks like rm${IFS}-rf.",
        },
        {
          label: "When a session ends:",
          body: "the stop gate measures the risk tier from what actually changed (paths and size, never the wording of the prompt), runs lint, types and tests on everything that changed, and keeps a session at tier T2 or above open until the required reviewers have checked it. The test verdict comes from the exit code: an import error or zero tests run is red, not “skipped”.",
        },
        {
          label: "On every commit:",
          body: "a conventional message; a secret scan; base freshness (a clone on an unrelated history is blocked); duplicated text in new code; a new dependency must exist on npm or PyPI and not sit one typo away from a popular package; commented-out code; a new TODO without a ledger row; a personal-data column without a privacy inventory row; SQL migration lint (row-level security with both USING and WITH CHECK, definer hygiene, tenant keys); GitHub's own parser on workflow files; and a removed security step in CI.",
        },
        {
          label: "At every push:",
          body: "nothing goes straight to the main branch. A change above 1,500 source lines is split, while one topic such as a migration stays together. A new circular import, or an import that breaks the layers declared in the architecture document, is blocked. If someone else committed to the same branch in the last day, you get a warning.",
        },
        {
          label: "In CI and at merge:",
          body: "the same checks run again, plus a secret scanner (gitleaks) and mutation testing on the changed files: the tool plants small bugs on purpose, and a test that catches none of them is theatre. 31 of my 47 repositories have strict branch protection generated from the names of their CI jobs. A pull request merges only if its checks ran on the current merge result: once, green checks on an outdated base broke main.",
        },
      ],
    },
    {
      id: "tiers",
      part: 1,
      title: "Risk tier: measured from the change, never declared",
      lead: "The amount of checking is proportional, and that is enforced too. A prototype is not nagged for architecture records; a change to payments cannot close without a security review.",
      figure: "tiers",
      items: [
        {
          label: "For each repository:",
          body: "a minimum tier, a lifecycle stage (prototype, proof of concept, MVP, production) and an optional QA address. Moving to production requires a written production-readiness review in the same commit. With a QA address set, the QA reviewer becomes mandatory for T3 changes that touch the interface.",
        },
        {
          label: "Committing early changes nothing:",
          body: "a commit made before the session ends still counts toward its tier, and a review the aggregation script marks as incomplete does not close the session.",
        },
      ],
    },
    {
      id: "exceptions",
      part: 1,
      title: "Exceptions: who may wave a gate through",
      lead: "A gate that can never be passed gets worked around, so every gate has a way through. What decides who may use it is whether the step can be undone, not whether I happen to be at the computer.",
      figure: "exceptions",
      items: [
        {
          label: "Proof, not a claim:",
          body: "the first review of this mechanism faked the proof of review with two empty files. Now only the transcripts of real reviewer sub-agents count, every finding they recorded must stay in the result, and one review never grants a second exception, even if its folder is copied. A command that tries to leave the repository (changing directory, a variable, a shell wrapper) does not get the exception.",
        },
        {
          label: "My phrase means only my phrase:",
          body: "an exception at level C exists only after I type “pozwol ALLOW_…” (Polish for “allow”) in the chat. The same words echoed in an agent's reply or in a sub-agent's report unlock nothing, and every use goes into the log.",
        },
        {
          label: "The clock slip:",
          body: "once the system clock jumped to 2022 for a moment. My exception file got a date four years in the past and the cleanup deleted it as stale, although it had half an hour left. Validity is now read from the file's content, not from when it was written.",
        },
        {
          label: "Kill switch:",
          body: "one switch brings back the strict mode where every exception needs my phrase, and the switch is protected the same way as the gates.",
        },
      ],
    },
    {
      id: "merge",
      part: 1,
      title: "Merging a pull request: without my phrase, but only with proof",
      lead: "Typing a phrase for every routine pull request had become the bottleneck. Now the merge script decides from the risk of the change and the proof attached to it.",
      figure: "merge",
      items: [
        {
          label: "What counts as proof:",
          body: "a review that names this exact diff by its checksum, with the verdict recomputed from the findings and the reviewers' own transcripts rather than from a summary, valid for two hours. Anything touching logins, payments, migrations, dependencies, CI or the agents' own instructions still waits for me.",
        },
        {
          label: "A second proof the agent cannot reach:",
          body: "a review kept on the agent's own machine could in principle be forged by that agent, so a pull request can also be reviewed in CI: a clean runner, read-only tools, the configuration taken from the base branch. The merge script reads that run through the GitHub API and keeps 90 days of verdicts, so rewording a change to roll the dice again does not work on the same branch. It is set up in three repositories.",
        },
        {
          label: "Sessions do not mix:",
          body: "when two sessions work in one repository, a commit counts for a session unless there is positive proof it came from the other one; when in doubt, it counts.",
        },
        {
          label: "Honest limits:",
          body: "the CI review is one model, so it is a probabilistic proof that a crafted diff can try to talk around. That is why the check is not a required status in branch protection (GitHub counts a skipped job as passed), and why one file turns phrase-only merging back on. The planned week of watching the CI reviewer has no written result yet.",
        },
      ],
    },
    {
      id: "review",
      part: 1,
      title: "Review like a software house, not like a chat",
      lead: "Each AI reviewer covers one speciality and starts with a clean slate. A script, not a model, combines their findings: an issue blocks only if enough reviewers report it independently or the verifier reproduces it, and an issue without proof is dropped. The verifier's job is to disprove.",
      figure: "review",
      items: [
        {
          label: "Nine specialist reviewers:",
          body: "code, security, data, operations, UX, product, QA, a verifier and a devil's advocate. Each works from a short checklist of numbered rules, and every rule has a command to run, a severity policy, a fixed output format and a worked example of a false alarm it must reject. Reviewers only read; the main session makes the fixes.",
        },
        {
          label: "Each reviewer reads its own slice:",
          body: "one audit found that reviewers given a 9,799-line diff read about 10 to 30 % of it, and a broken CSS block went past three of them. Now a script cuts the diff by department, and a second script runs 21 mechanical search rules and hands the hits to the reviewer to judge.",
        },
        {
          label: "Why a clean slate:",
          body: "whoever wrote the code, a person or a model, does not see its own mistakes. Reviewers get only the change and the task and never see each other's findings, because agents that discuss drift toward the majority even when the minority was right.",
        },
        {
          label: "Decisions with a devil's advocate:",
          body: "architecture decisions go through fixed steps: facts, positions, a mandatory dissenter, aggregation in code, and a written decision record. Injected dissent is the one intervention shown to cut failures caused by quiet agreement in groups of agents.",
        },
        {
          label: "Calibrated monthly:",
          body: "the same bug is packaged twice, once bare and once with a persuasive description, and fresh reviewers check both in random order. If their verdicts differ, length or wording is biasing them, and a person adjusts the checklist.",
        },
      ],
    },
    {
      id: "learning",
      part: 1,
      title: "Every failure becomes a check: how the system learns",
      lead: "A failure is not closed when it is fixed. It is closed when it cannot happen again without a script noticing.",
      figure: "loop",
      items: [
        {
          label: "An outdated base broke main:",
          body: "two pull requests each passed, but each against its own older copy of the main branch; merged together they broke a workflow file. Now merges require checks on the current merge result, strict branch protection is generated per repository, and a scar records the mechanism.",
        },
        {
          label: "A check that never ran:",
          body: "the push gate read its input twice and did nothing for six days. Now every git hook has a test that runs the whole script with real input, and a weekly audit checks that every gate still blocks.",
        },
        {
          label: "45 copies of a company identity:",
          body: "spread over 11 files, and every one passed lint, types, tests and review. Now a duplicate check runs on added lines (since 1.8.0: the same text six times in at least three files).",
        },
        {
          label: "An invoice that changed the seller:",
          body: "a default value quietly swapped the seller after a profile was deleted. A silent fallback on any field with consequences is now a blocker in the code checklist: with no match, the code must stop with a named error.",
        },
      ],
    },
    {
      id: "guarding-the-guards",
      part: 1,
      title: "Guarding the guards",
      lead: "A quality system an agent can quietly switch off is decoration. So the rules protect themselves first.",
      figure: "guards",
      items: [
        {
          label: "A seal on the control layer:",
          body: "hooks, git gates, settings and gate tools are sealed with checksums. A change outside a window I opened shows up at the start of the next session and in the weekly audit.",
        },
        {
          label: "Extensions under the same guard:",
          body: "Claude Code mods run inside the tool and skip the hooks, so installing, enabling or updating one needs my phrase. Turning one off is always allowed.",
        },
        {
          label: "No dropping a production table by accident:",
          body: "every command that talks to a database is traced to where it points, including connection strings, environment variables set in the same line and wrappers such as docker exec or ssh. Destructive SQL is blocked unless the target is provably on my machine, and SQL the guard cannot see counts as destructive.",
        },
        {
          label: "No rewriting the rules through a patch:",
          body: "patching, unpacking an archive or running a scripted editor is blocked in PG's folder and every folder above it. In any repository a patch that touches .git/config or .claude/ is blocked, with a pointer to git apply, which refuses those paths.",
        },
        {
          label: "Honest limit:",
          body: "the guard is built against mistakes and against instructions smuggled in from outside, for example from a web page an agent reads. It does not stop an agent determined to get around it, because running any script can do anything. That case belongs to the operating system's sandbox and permissions, and it is written down in the known-limits file.",
        },
      ],
    },

    /* ── Part 3: architecture and releases ── */
    {
      id: "architecture",
      part: 2,
      title: "How architecture gets decided, and how it stays decided",
      lead: "Most projects decide their architecture once, in a document nobody opens again. Here every decision is a row with evidence, and a script checks the code against those rows whenever a session starts and before it may finish.",
      figure: "matrix",
      items: [
        {
          label: "One row per area:",
          body: "62 rows: 37 system-design areas (data, scaling, queues, caching, login, rate limits, releases and more) and 25 tool layers from the frontend to payments, invoicing and parcel shipping. Each row is a decision with evidence, not applicable with a reason, or not now with a measurable signal to come back, such as “more than 50 requests per second”.",
        },
        {
          label: "A council instead of one architect:",
          body: "twelve agents work in parallel, one per group of areas. Groups whose decisions are hard to undo (data shape, identifiers, files, identity, region, disaster recovery) get the strongest model and must be decided even in small projects.",
        },
        {
          label: "Why the matrix exists:",
          body: "the October 6 audit counted 437 named options in a system-design course: PG could choose between 46 % of them, knew another 26 % only by name and missed 28 %. Nothing made the architect walk through every area. On a client app the same day the council filled all 37 rows and listed about 60 gaps with evidence; at least one was a false alarm, so a person still reviews them.",
        },
        {
          label: "Kept honest by the code:",
          body: "a script that uses no AI compares the project with its decisions at the start of each session and prints one to three lines only when something is off: an undecided area, technology the decisions do not mention, or evidence pointing at a file that no longer exists. In new projects a session cannot finish with drift left behind; in old ones it is a hint.",
        },
        {
          label: "Scaling only when the numbers say so:",
          body: "the not-now rows keep their thresholds, and a seven-step ladder goes from one server through queues and caching to read replicas, so the decision to scale comes from data, not fear.",
        },
      ],
    },
    {
      id: "release",
      part: 2,
      title: "A release pipeline with AI in the loop, for a one-person company",
      lead: "Big companies have a release team, people on call and a second engineer on every change. I do not, so the pipeline does that work, and AI does the parts that need judgment.",
      figure: "release",
      items: [
        {
          label: "Knowing when not to go back:",
          body: "a database outage, a firewall blocking the test machine or a redirect are not faults of the new version, so they raise an alarm instead. If the release changed the database structure or server functions, going back would run old code on the new structure, so the pipeline stops and asks me. After one automatic return, nothing goes back on its own until a person closes the incident.",
        },
        {
          label: "AI on duty, with no keys to the building:",
          body: "when a gate turns red, a fresh Claude instance on my subscription reads the test results and the release's changes and writes a diagnosis into the incident. It can only read; a separate trusted step posts its comment.",
        },
        {
          label: "Machines check what machines can:",
          body: "build, types, tests, licences, leaked-secret scans and probe requests are plain scripts with no AI tokens. AI reviewers take the parts that need judgment, and I take what cannot be undone: risky merges, money, and keys.",
        },
      ],
    },
    {
      id: "release-review",
      part: 2,
      title: "Six review rounds before the pipeline shipped",
      lead: "Version 1.7.0 went through six full rounds of AI review and two smaller checks of the final fixes. Blocking findings must be fixed before release; major ones are fixed in the same round.",
      figure: "rounds",
      items: [
        {
          label: "What the blocking findings were:",
          body: "two security holes I had not seen. The test script and its list of allowed addresses were read from the change that triggered the run, so an attacker could supply their own; and the AI on duty could read a token from the repository's settings file and paste it into an incident comment. The final checks found a safety rule without a test. All were fixed before release.",
        },
        {
          label: "Honest limit:",
          body: "the pipeline has not run on a live project yet. The plan is a drill on a test copy in both directions: a green build must reach the domain and a red one must not.",
        },
      ],
    },

    /* ── Part 4: proportion ── */
    {
      id: "context",
      part: 3,
      title: "The same rules for a smaller context bill",
      lead: "Every message to a model carries background text it reads first, and that text is paid for in tokens. I measured PG's share and cut it without dropping a rule.",
      figure: "context",
      items: [
        {
          label: "The full rules once per session:",
          body: "the prompt hook sends the full protocol once, then a one-line reminder. After compaction or in a new session it sends everything again, and whenever it is unsure what was sent, it sends everything.",
        },
        {
          label: "Memory that is current and still complete:",
          body: "the newest checkpoints come first, unfinished work from other sessions is listed by title, and every shortened file keeps a list of its remaining sections. A budget check turns red if the start-up text grows back.",
        },
        {
          label: "A context window chosen on purpose:",
          body: "Claude can hold a million tokens, but every message resends all of it. In my transcripts a 1M window used about 2.3 times more of the weekly limit than 400k, so the window stays at 400k. A 600k trial starts on October 17 with its rule decided in advance: it stays if the week ends under 90 % of the limit and nothing gets blocked.",
        },
      ],
    },
    {
      id: "proportionality",
      part: 3,
      title: "Proportionality: fewer blocks for the same safety",
      lead: "Version 1.8.0. For weeks, every risk I noticed got a new gate. Then the gate log showed the cost: some gates stopped my normal work far more often than they caught a mistake. So one rule now sits above the others: no incident, no new block.",
      figure: "calib",
      items: [
        {
          label: "New checks start by watching:",
          body: "a new gate only observes and logs what it would have blocked. It may block only after a real incident, and changes to PG reach new repositories through the template, while old project repositories are read-only for agents unless I ask.",
        },
        {
          label: "Routines look only at live work:",
          body: "a script reads GitHub history and keeps repositories with real work in the last 30 days, ignoring days when PG swept the whole fleet, the same change rolled out everywhere, and dependency bots. Today that is 12 of 47.",
        },
        {
          label: "Cleaner numbers:",
          body: "test runs used to write into the same log as real work and inflated the counts I calibrate with. Tests now write to their own log, and the weekly health check counts their traces separately.",
        },
        {
          label: "Reviewed before release:",
          body: "four rounds of independent reviewers. Among other things they caught that one GitHub hiccup could silently cost a month of vulnerability checks, and that an empty answer from GitHub would look like a quiet month; both now end as a visible failure.",
        },
      ],
    },
    {
      id: "where-improving-stops",
      part: 3,
      title: "Where improving stops",
      lead: "On October 14 I decided that PG is complete for now. Not because nothing could be added, but because adding more had started to cost more than it protected.",
      figure: "limits",
      items: [
        {
          label: "The signal that showed it:",
          body: "a rewrite of the command guard's shell parser went through nine rounds of AI review. Every round found new edge cases, and none of them had ever happened in real work. That is an asymptote: effort grows, protection does not. The parser was closed, and the guard that runs today stays as it is.",
        },
        {
          label: "What the guard is for:",
          body: "agent mistakes and instructions smuggled in from outside. Not a deliberate attacker: that fight cannot be won with text rules, since writing a script to a file and running it bypasses any parser. Naming the threat model ended the parser debate in one sentence.",
        },
        {
          label: "What maintenance mode means:",
          body: "PG changes only after an incident that slipped through, when a tool or model update breaks a hook, or when I ask. The weekly health check still runs its scripts; no new mechanism is added for its own sake. The quality of the work should come from the checks that exist, not from the number of checks.",
        },
      ],
    },

    /* ── Part 5: trust and operations ── */
    {
      id: "status",
      part: 4,
      title:
        "VERIFIED · UNVERIFIED · FAILED: the word that stops the AI telling you what you want to hear",
      lead: "Every substantive report ends with one of three words. It is the smallest part of the system and the easiest to take elsewhere, especially to Claude Desktop, where the prompt is the only protection.",
      items: [
        {
          label: "VERIFIED:",
          body: "the claim comes with its proof, quoted rather than described: the command and its exit code, the HTTP status, the line of test output, the diff, the path to a screenshot.",
        },
        {
          label: "UNVERIFIED:",
          body: "the work is done but the proof is missing. The report says what is missing, how to check it and what would change the conclusion. A report with no status word counts as UNVERIFIED.",
        },
        {
          label: "FAILED / BLOCKED:",
          body: "what happened, word for word, without softening. Anything blocking the work (missing access, a decision, data, a secret or a broken tool) goes in the first line, never at the end.",
        },
        {
          label: "Why it exists:",
          body: "when a user pushes back with a wrong claim, models agree in about 58 % of cases, and they predict 61–77 % success while achieving 22–35 %. The status word forces every claim to show evidence or admit it has none, and “are you sure?” makes the model re-check the evidence instead of politely changing its answer.",
        },
        {
          label: "In Claude Desktop and scheduled tasks:",
          body: "every background prompt gets a seven-line verification block: do not assume the prompt is true; you may refuse and report failure; restate claims as neutral questions; no success without evidence; attack your own result before reporting; re-check when challenged; end with the status word. The block is in the repository, ready to paste.",
        },
      ],
    },
    {
      id: "vault",
      part: 4,
      title: "Passwords and keys the AI never sees",
      figure: "vault",
      items: [
        {
          label: "A vault on my own hardware:",
          body: "157 API keys, tokens and logins live in a self-hosted vault. A bridge passes a value straight into the process that needs it, as an environment variable, so it never appears in the chat, the code or the logs. The command guard blocks a secret typed into a command, and the scans at commit time and in CI keep it that way.",
        },
      ],
    },
    {
      id: "routines",
      part: 4,
      title: "Routines: the part that runs while nobody is typing",
      lead: "Script first, model only when the script finds something. Anything that could find itself work is off by design.",
      figure: "cadence",
      items: [
        {
          label: "Why they are off:",
          body: "after the move to a new computer on October 3, most routines started in a folder the app no longer trusts, and the rest stopped at a permission prompt nobody was there to answer. None did real work, so all are switched off until the setup is fixed. Three come back: the pull request review, the weekly health check and the vulnerability watch. Three that only work on PG itself stay off.",
        },
        {
          label: "Pull request review (weekdays):",
          body: "reviews open pull requests in the active repositories the way a senior engineer would. Mechanical fixes land as separate commits with proof; design and security findings stay as comments for me.",
        },
        {
          label: "Health check (weekly):",
          body: "script checks that the quality system is still wired in: hooks registered, gates still blocking, which escape hatches were used, and which routine started but never finished. A failed or interrupted run of any routine is red.",
        },
        {
          label: "Vulnerability watch (monthly):",
          body: "a script reads GitHub's own vulnerability alerts (on in 44 of 47 repositories) and audits the lockfile. It tells “no scan” from “no findings”, so an empty or failed read never counts as a quiet month. Fixes are patch or minor updates, always as pull requests with evidence.",
        },
      ],
    },
    {
      id: "fleet",
      part: 4,
      title: "47 repositories, and the 12 that are alive",
      lead: "Most of my projects are finished. PG still guards all of them, but the routines spend their time only where work is happening.",
      figure: "waffle",
    },
    {
      id: "memory",
      part: 4,
      title: "Memory, measurement and the retrospective that rebuilt the system",
      items: [
        {
          label: "Persistent memory:",
          body: "a local base of more than 2,300 notes; the relevant part loads at the start of every session, and each session writes a note when it ends, so the next one starts from a checkpoint instead of from scratch. One honest gap: sessions started in a temporary workspace do not always leave a transcript for that note, and the health check flags it.",
        },
        {
          label: "Telemetry, not feelings:",
          body: "every skipped check is logged with a reason, and scripts mine agent transcripts and git history: corrections per session, repeated tool errors, fixes within a day of the previous commit to the same file, and the files that change most. The numbers decide what becomes a gate.",
        },
        {
          label: "The retrospective that mattered:",
          body: "twelve repair loops in one session were traced to their causes, and three had the same defect: the system claimed a check it did not physically have. The answer was structural: every gate got a test proving it blocks, and checking that every rule has a gate became a script.",
        },
        {
          label: "The same method, applied to me:",
          body: "my code-reading practice is built like the rest of the system, daily, verified and public: github.com/kamiljan11/code-reading-quest.",
        },
      ],
    },
    {
      id: "scale",
      part: 4,
      title: "Does it hold at scale?",
      items: [
        {
          label: "The honest answer:",
          body: "one function is easy. A 200,000-line system with unwritten assumptions about its architecture is where consistency drifts. So the assumptions are written where a script can read them: each repository's architecture document has a machine-readable block of layers and forbidden imports, and the push gate blocks a new import cycle or a broken layer. Old cycles only warn, and historical debt is never cleaned up automatically.",
        },
        {
          label: "Checking the impact before an edit:",
          body: "a file that more than 40 others import is flagged, and the design step asks who calls this, what else reads this data, and which risk tier the change falls into.",
        },
        {
          label: "Readable by a person:",
          body: "the tool index is generated from each tool's own header, and a tool without a description shows up as debt. Every style decision answers one question: can a senior engineer who has never seen the repository run it in 15 minutes, find the place to change in 15 more, and understand why?",
        },
      ],
    },

    /* ── Part 6: history and use ── */
    {
      id: "history",
      part: 5,
      title: "Fifteen versions in 33 days",
      lead: "Each release answered something real: an audit, a comparison with other projects, a failure, or friction in my own work. The details of every version are in the public changelog.",
      figure: "versions",
      items: [
        {
          label: "Compared with 35 open-source projects (September 26):",
          body: "agents went through 35 public repositories with a similar idea and listed 23 things others did better, each with a file and line. The design of the changes was reviewed for security before any code (15 problems, 3 of which would have broken the review itself), and every new guard rule ran against 40,824 real commands from 2,853 transcript files before it could block anything.",
        },
        {
          label: "Six patches in one day (September 28):",
          body: "the stop gate trusted test output instead of exit codes, so a broken test setup could pass as “skipped”. Six releases later, a verdict comes only from the exit code.",
        },
      ],
    },
    {
      id: "install",
      part: 5,
      title: "Install it yourself",
      lead: "The whole system is a public repository, cleaned of private data. You need Node 20+, git and Claude Code.",
      figure: "install",
      code: [
        "git clone " + REPO_URL + ".git",
        "node install.mjs --dry-run   # shows the plan, touches nothing",
        "node install.mjs --yes       # copies into ~/.claude, merges hooks, appends the CLAUDE.md block, wires git hooks",
      ],
      items: [
        {
          label: "What the installer promises:",
          body: "it never overwrites a file you changed (the other version lands next to yours), merges your settings instead of replacing them, and adds its rules between markers so an update replaces only that block. Git hooks are optional. It ends with a self-test, and the green output is the proof, not the installer's word.",
        },
        {
          label: "What the public 1.8.0 contains:",
          body: "11 hooks, 3 git gates, 51 zero-token tools with 28 test suites, 9 reviewer departments, the doctrine with 170 scars, a repository template with CI and parsed boundary blocks, routine definitions for both tools, 18 skills, an uninstaller, and docs with the diagrams from this page: 409 files.",
        },
        {
          label: "Language:",
          body: "the working rules have a full English version (PG_LANG=en, set from your system language), and every block message has an English line with its escape hatch. The doctrine and reviewer checklists are still in Polish (the model reads them fine); the README is in both.",
        },
      ],
      link: { href: REPO_URL, text: "Open the repository →" },
    },
    {
      id: "honest-limits",
      part: 5,
      title: "Honest limits",
      paragraphs: [
        "I use foundation models through their providers; I do not train them. Reliability is proven at the scale of one owner and dozens of repositories, not a large company. Reviewer departments cost tokens (roughly four times one review at T2 and eight to ten at T3), which is why the free script checks run first. Merging without my phrase rests on one model's review, a probabilistic proof. Some gates depend on a repository having what they check and skip with a logged reason when it does not.",
        "Two parts are designed but not yet exercised: the release pipeline has had no drill on a live project, and the routines are off until their setup is fixed. The guard stops mistakes, not a determined attacker. The point of this page is not that nothing can go wrong. It is that the ways AI work goes wrong are engineered against in the open, and that I know where adding more rules stops paying.",
      ],
    },
    ...tellSectionsEn,
  ],
  figures: {
    arch: {
      kamil: "KAMIL",
      kamilSub: "spec · architecture · review · deploy",
      code: "Claude Code",
      codeSub1: "code · CI · production",
      codeSub2: "GitHub · browser · mail via MCP",
      cowork: "Claude Desktop (Cowork)",
      coworkSub1: "mail · documents · research",
      coworkSub2: "outreach · design · ops",
      shared: "same rules · same memory",
      vault: "VAULT",
      vaultSub: "157 secrets",
      vaultNote1: "keys go to the process,",
      vaultNote2: "never to the chat",
      memory: "MEMORY",
      memorySub: "2,300+ notes",
      memoryNote1: "loaded at session start,",
      memoryNote2: "sessions self-document",
      gates: "PG · GATES",
      gatesList: "prompt · edit · command · stop · commit · push · CI · review · production proof",
      projects: "EVERY PROJECT",
      projectsSub: "47 repositories: apps, websites, automations",
      caption:
        "PG is a meta layer: the same gates sit under every project, whichever it is. I set the direction; proof comes back up.",
    },
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
        { title: "Doctrine", leaves: ["design before code", "“done” per risk tier", "170 scars"] },
        {
          title: "Repo template",
          leaves: ["CI + mutation testing", "parsed boundaries", "QA matrix · privacy · runbook"],
        },
        {
          title: "Routines",
          leaves: [
            "PR reviewer · health check",
            "vulnerability watch",
            "paused until setup is fixed",
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
        "message · secrets · deps · SQL",
        "no main + size + cycles",
        "mutation + secrets",
        "current merge-ref only",
        "200 from real domain",
      ],
      live: "LIVE",
      blocked:
        "no silent skipping: quality gates pass only with a log entry · risky steps only after a sub-agent review · irreversible steps and the gates themselves only after my “pozwol ALLOW_…” in the chat · a routine pull request merges without my phrase only with proof of review",
      caption:
        "Nine checkpoints on the path of a change. I make the decisions; the checks make sure nothing is forgotten.",
    },
    tiers: {
      costTitle: "review cost",
      rungs: [
        {
          tier: "T0",
          trigger: "docs, copy, styles, assets",
          reviewers: "script checks only",
          cost: 0,
          costLabel: "0 AI tokens",
        },
        {
          tier: "T1",
          trigger: "one isolated component or helper",
          reviewers: "code review recommended",
          cost: 1,
          costLabel: "≈ 1 review",
        },
        {
          tier: "T2",
          trigger: "shared logic, API, dependencies, CI, > 150 lines",
          reviewers: "code + operations (+ UX, + data)",
          cost: 4,
          costLabel: "≈ 4 reviews",
        },
        {
          tier: "T3",
          trigger: "login, permissions, payments, secrets, migrations, cron, > 600 lines",
          reviewers: "code + security + data + operations → verifier",
          cost: 9,
          costLabel: "≈ 8–10 reviews",
        },
      ],
      caption:
        "The tier comes from the paths and size of the change, never from the prompt. The strongest model reviews security, data and verification at T3.",
    },
    exceptions: {
      whoLabel: "who decides",
      windowLabel: "how long",
      examplesLabel: "for example",
      levels: [
        {
          level: "A · the agent",
          who: "the agent fixes the problem or moves on knowingly; every pass is logged with the gate's name",
          window: "one pass, logged",
          examples:
            "change size, a TODO without an entry, commented-out code, repeated text, module boundaries, commit format",
          tone: "a",
        },
        {
          level: "B · after a review",
          who: "the agent, but only after sub-agents reviewed the exact code and it fixed their findings",
          window: "15 minutes, one command, one repository",
          examples:
            "deleting files, a hard reset, cleaning the repository, an unknown dependency, a personal-data column",
          tone: "n",
        },
        {
          level: "C · only me",
          who: "me, by typing the phrase in the chat",
          window: "30 minutes, 3 uses (60 minutes for work on PG itself)",
          examples:
            "changes to the gates, push to main, secrets in a commit, weaker CI, force-push, deleting a repository",
          tone: "b",
        },
      ],
      caption:
        "Level C covers whatever cannot be undone or would switch off other checks. If the agent could approve changes to its own gates, A and B would mean nothing.",
    },
    merge: {
      start: "pull request",
      checks: "all checks green on the current merge result",
      autoLabel: "merges on its own",
      phraseLabel: "waits for my phrase",
      branches: [
        { when: "documentation only", needs: "no review needed", auto: true },
        {
          when: "an ordinary code change (T1)",
          needs: "a code review of exactly this diff",
          auto: true,
        },
        { when: "shared logic (T2)", needs: "code and operations reviews", auto: true },
        {
          when: "T3, logins, payments, migrations, dependencies, CI, agent instructions",
          needs: "my “pozwol ALLOW_MERGE”",
          auto: false,
        },
      ],
      caption:
        "On since October 4. The review must name the diff by its checksum and is valid for two hours.",
    },
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
    rounds: {
      blockingLabel: "blocking",
      majorLabel: "major",
      rounds: [
        { label: "round 1", blocking: 1, major: 11 },
        { label: "round 2", blocking: 1, major: 13 },
        { label: "round 3", blocking: 0, major: 11 },
        { label: "round 4", blocking: 0, major: 8 },
        { label: "round 5", blocking: 0, major: 9 },
        { label: "round 6", blocking: 0, major: 8 },
        { label: "final checks", blocking: 1, major: 2 },
      ],
      caption:
        "Release 1.7.0: findings per review round. Rounds 1 to 6 used three or four reviewers; the two final checks of the fixes used two.",
    },
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
        "The loop feeds itself: the weekly audit finds checks that stopped working, and each becomes a new scar.",
    },
    matrix: {
      rows: [
        {
          title: "Rows in every design matrix",
          total: "62",
          segments: [
            { label: "system-design areas", value: 37, tone: "a" },
            { label: "tool layers of the stack", value: 25, tone: "n" },
          ],
        },
        {
          title: "Named options in the course, before 1.5.0",
          total: "437",
          unit: "%",
          segments: [
            { label: "PG knew when to choose it", value: 46, tone: "a" },
            { label: "name only", value: 26, tone: "n" },
            { label: "missing", value: 28, tone: "b" },
          ],
        },
        {
          title: "Areas the design process forced a decision in, before 1.5.0",
          total: "37",
          segments: [
            { label: "yes", value: 15, tone: "a" },
            { label: "partly", value: 11, tone: "n" },
            { label: "no", value: 11, tone: "b" },
          ],
        },
        {
          title: "First real run: a client app, October 6",
          total: "37 rows",
          segments: [
            { label: "decision", value: 31, tone: "a" },
            { label: "not applicable", value: 5, tone: "n" },
            { label: "not now, with a signal", value: 1, tone: "b" },
          ],
        },
      ],
      caption:
        "The audit measured the gap; the matrix closes it by making every area a row that a script checks.",
    },
    release: {
      steps: [
        {
          title: "build and tests",
          detail: "the checks every pull request already passes",
          tone: "a",
        },
        {
          title: "probe the preview",
          detail: "automated requests on the paths that must never break",
          tone: "a",
        },
        {
          title: "wait 10 minutes",
          detail: "the new build tested outside live traffic before the domain switches",
          tone: "a",
        },
        { title: "watch 15 minutes", detail: "the live site checked every 30 seconds", tone: "a" },
      ],
      rollback:
        "three failed checks in a row (about a minute) bring back the last good version, once; after that, a person decides",
      caption: "Designed and reviewed; not yet rehearsed on a live project.",
    },
    context: {
      beforeLabel: "before",
      afterLabel: "after",
      rows: [
        {
          label: "Rules added to a follow-up prompt about code",
          before: 4.9,
          after: 0.9,
          beforeText: "4.9 KB",
          afterText: "0.9 KB",
        },
        {
          label: "Memory loaded at session start",
          before: 35,
          after: 25,
          beforeText: "35 KB",
          afterText: "25 KB",
        },
        {
          label: "Weekly limit used per request: 1M window (before) vs 400k (after)",
          before: 2.3,
          after: 1,
          beforeText: "≈ 2.3×",
          afterText: "1×",
        },
      ],
      caption:
        "Versions 1.4.0 and 1.8.0. Kilobytes measured on the injected text; the window ratio is estimated from my transcripts.",
    },
    calib: {
      gateLabel: "gate",
      beforeLabel: "before 1.8.0",
      afterLabel: "since 1.8.0",
      rows: [
        {
          gate: "change size",
          before: "400 source lines",
          after: "1,500; one topic stays together",
        },
        {
          gate: "duplicated text",
          before: "3 times in 2 files",
          after: "6 times in 3 files; seed data ignored",
        },
        {
          gate: "deleting a build cache",
          before: "blocked",
          after: "allowed; .. and links still blocked",
        },
        {
          gate: "lint after an edit",
          before: "every file",
          after: "skips throwaway scripts outside a project",
        },
        {
          gate: "changelog",
          before: "a line in every pull request",
          after: "collected from titles at release",
        },
        { gate: "routines' scope", before: "every repository", after: "active ones: 12 of 47" },
      ],
      caption:
        "Thresholds recalibrated from the gate log, with test runs filtered out. Each change says how to roll it back.",
    },
    limits: {
      triggersTitle: "PG still changes when",
      triggers: [
        {
          label: "an incident slips through:",
          body: "a real failure that a gate should have caught.",
        },
        {
          label: "a tool or model changes:",
          body: "an update breaks a hook or changes how the agent behaves.",
        },
        { label: "I ask:", body: "a deliberate decision, not a routine finding work for itself." },
      ],
      wallsTitle: "No rule can reach",
      walls: [
        {
          label: "a determined attacker:",
          body: "writing a script to a file and running it beats any text rule; that is the operating system's job.",
        },
        {
          label: "the meaning of code:",
          body: "a pattern check cannot tell good logic from bad; that is what review and tests are for.",
        },
        {
          label: "a target that becomes the goal:",
          body: "once the count of gates or green runs is the aim, it stops measuring quality.",
        },
      ],
      signalTitle: "Stop signal:",
      signal:
        "two rounds in a row that find only edge cases never seen in real work. The parser rewrite hit it after nine.",
      caption:
        "Decided on October 14, 2026. The quality of the work should come from the checks that exist, not from their number.",
    },
    vault: {
      vault: "VAULT",
      vaultSub: "157 secrets · self-hosted",
      bridge: "BRIDGE",
      bridgeSub: "passes to the process",
      target: "TARGET PROCESS",
      targetSub: "deploy · API call · CI",
      never: ["chat ✕", "code ✕", "logs ✕"],
      caption: "The agent can use a password or key it can never read.",
    },
    cadence: {
      status: "Status on October 14: all PG routines switched off until their setup is fixed.",
      rows: [
        { name: "Pull request review", dots: 5, freq: "weekdays · returns" },
        { name: "Health check", dots: 1, freq: "weekly · returns" },
        { name: "Vulnerability watch", dots: 1, freq: "monthly · returns" },
        { name: "Reviewer calibration", dots: 1, freq: "monthly · stays off" },
        { name: "Look at similar projects", dots: 1, freq: "monthly · stays off" },
        { name: "Model line-up check", dots: 1, freq: "monthly · stays off" },
        { name: "Repository clean-up", dots: 0, freq: "manual only", manual: true },
      ],
      caption:
        "Dots show the planned cadence. The three that stay off only work on PG itself, which is in maintenance mode.",
    },
    waffle: {
      groups: [
        { label: "active in the last 30 days", count: 12, tone: "a" },
        { label: "finished or resting", count: 34, tone: "n" },
        { label: "never checked by routines", count: 1, tone: "b" },
      ],
      facts: [
        { n: "33", label: "with branch protection, 31 of them strict" },
        { n: "44", label: "with GitHub vulnerability alerts on" },
      ],
      caption: "One square per repository, counted from GitHub on October 14, 2026.",
    },
    versions: {
      ticks: [
        { day: 0, label: "Sep 12" },
        { day: 19, label: "Oct 1" },
        { day: 32, label: "Oct 14" },
      ],
      points: [
        { v: "1.0.0", date: "Sep 12", day: 0, theme: "first public export of Prompt-Guard" },
        {
          v: "1.1.0",
          date: "Sep 13",
          day: 1,
          theme: "full English protocol, bilingual block messages",
        },
        {
          v: "1.2.0",
          date: "Sep 27",
          day: 15,
          theme: "rebuilt after comparing 35 open-source projects",
        },
        {
          v: "1.2.1–1.2.6",
          date: "Sep 28",
          day: 16,
          patches: 6,
          theme: "six fixes: test verdicts only from exit codes",
        },
        { v: "1.3.0", date: "Oct 5", day: 23, theme: "pull requests merge with proof of review" },
        { v: "1.4.0", date: "Oct 5", day: 23, theme: "the same rules for a smaller context bill" },
        { v: "1.5.0", date: "Oct 6", day: 24, theme: "a row for every system-design area" },
        {
          v: "1.6.0",
          date: "Oct 10",
          day: 28,
          theme: "extensions under guard, every layer of the stack",
        },
        {
          v: "1.7.0",
          date: "Oct 11",
          day: 29,
          theme: "architecture that stays decided, release pipeline",
        },
        { v: "1.8.0", date: "Oct 14", day: 32, theme: "proportionality, then maintenance mode" },
      ],
      caption:
        "The strip has one cell per day; a filled cell is a release, and a number means several that day.",
    },
    ideas: {
      rows: [
        {
          idea: "Checks, not written rules",
          before: "a rule written as text, which an agent can forget",
          after: "a gate that runs by itself, with a test proving it blocks",
          why: "with the rule only written down, 79 % of commits still went straight to the main branch",
        },
        {
          idea: "Every failure becomes a check",
          before: "a mistake, then a promise to be more careful",
          after: "a scar written down with its cause, then a new gate or checklist item",
          why: "170 real failures are catalogued as scars, and every checklist item cites one",
        },
        {
          idea: "Proof, not claims",
          before: "“done”, because the agent says so",
          after:
            "a command ran, its result was checked, and the report ends with VERIFIED, UNVERIFIED or FAILED",
          why: "in one benchmark 75.8 % of the successes AI agents reported had no evidence",
        },
      ],
      beforeLabel: "Instead of",
      afterLabel: "Now",
      whyLabel: "Why",
      caption:
        "Each idea swaps a habit for a mechanism; the reason is a measured number, not a preference.",
    },
    guards: {
      core: "THE RULES",
      coreSub: "hooks, git gates, settings and gate tools",
      guardsTitle: "What stops them being switched off",
      guards: [
        {
          label: "Seal:",
          body: "checksums on the control layer; a change outside a window I opened shows up at the next session and in the weekly audit",
        },
        {
          label: "Extensions:",
          body: "installing, enabling or updating a mod needs my phrase; turning one off is always allowed",
        },
        {
          label: "Database target:",
          body: "destructive SQL is blocked unless the target is provably on my machine",
        },
        {
          label: "Patches:",
          body: "patching or unpacking an archive is blocked in PG's folder and every folder above it",
        },
      ],
      outer: "The operating system's sandbox:",
      outerSub:
        "the line against an agent determined to get around the guard. PG does not claim to hold it.",
      caption:
        "Built against mistakes and instructions smuggled in from outside, not against a determined agent.",
    },
    install: {
      steps: [
        {
          title: "copy the repository",
          detail: "git clone; needs Node 20+, git and Claude Code",
          tone: "a",
        },
        { title: "dry run", detail: "shows the plan and touches nothing", tone: "a" },
        {
          title: "install",
          detail: "copies into ~/.claude and never overwrites a file you changed",
          tone: "a",
        },
        {
          title: "self-test, by itself",
          detail: "the installer ends with it; the green output is the proof, not its word",
          tone: "a",
        },
      ],
      rollback: "an uninstaller comes in the same repository",
      caption: "The public 1.8.0: 409 files, cleaned of private data.",
    },
  },
  explain: explainEn,
  explainUi: explainUiEn,
  colophon:
    "This page went through the process it describes: an agent drafted it, it passed the gates above and an AI review, and I reviewed and published it. The numbers came from commands run on the day it shipped, not from memory.",
};
