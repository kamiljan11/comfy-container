import type { Part, Section } from "../../components/claude/types";

// The last part of /claude: the same system told in three lengths, and the questions people ask about it.
// Built only from facts the article above already states: every number written in digits here also stands in the article
// (src/content/claude/content.test.ts checks it), so a change to a fact means a change in two places.

export const tellPartEn: Part = {
  title: "In short, and questions",
  blurb:
    "The whole system in 30 seconds, 3 minutes or 15, and answers to what clients, recruiters and developers ask.",
};

export const tellSectionsEn: Section[] = [
  {
    id: "in-30-seconds",
    part: 6,
    title: "In 30 seconds",
    paragraphs: [
      "I build software with AI coding agents, and anyone who does knows the catch: the AI can be wrong and still say it is done. So I built Higher Mind, a quality system that sits under every project. Checks run by themselves at every step, from the prompt to production. On risky changes, separate AI reviewers each check one speciality with a clean slate. Anything that cannot be undone, like payments, logins or keys, waits for me. Every check comes from a real failure in my own projects: 170 so far. It is open source, and it says plainly where it stops.",
    ],
  },
  {
    id: "in-3-minutes",
    part: 6,
    title: "In 3 minutes",
    paragraphs: [
      "The problem first. AI coding agents are fast, but they overstate success: in one benchmark 75.8 % of the successes they reported had no evidence. When I audited my own projects, every rule I had written down was broken at scale: 6 of 7 repositories had no architecture decision records, the changelog was 105 commits behind, and 79 % of commits went straight to the main branch.",
      "So I stopped writing rules and turned them into mechanisms. Three ideas carry the whole thing. Checks, not written rules: whatever matters runs by itself when something happens; I call such a check a gate. Every failure becomes a check: 170 real failures are catalogued as scars, my name for a failure written down with its cause, and every gate points to the one it came from. Proof, not claims: “done” means a command ran and its result was checked, and every report ends with VERIFIED, UNVERIFIED or FAILED.",
      "In practice every change gets a risk tier measured from what actually changed, never from how the request was worded. Documentation is low; payments and logins are high; the higher the tier, the more checking. On a risky change several AI reviewers read it independently, each from its own angle: code, security, data, operations. A script, not a model, combines what they found, and a separate verifier tries to disprove it. A change joins the main code without me only with proof of review, and logins, payments, changes to the database structure and dependencies still wait for my phrase.",
      "And honestly: it is proven at the scale of one owner and dozens of repositories, not a large company. Reviewers cost tokens, eight to ten times one review on the riskiest changes, so the free script checks run first. The release pipeline has not had its drill on a live project yet, and the scheduled routines are switched off until I fix their setup.",
    ],
  },
  {
    id: "in-15-minutes",
    part: 6,
    title: "In 15 minutes: six steps to talk through",
    lead: "The outline of a 15-minute talk, a few sentences per step to expand on, in the order I tell it: where it came from, what it is, one change from start to finish, what it taught me, where it stops, and where it is going.",
    items: [
      {
        label: "Where it came from.",
        body: "AI coding agents write the code in my projects, while I own the specification, the review and the deploy. An audit of my own repositories showed that rules written as text do not survive real work: 6 of 7 repositories had no architecture decision records, code review ran in 2.5 % of sessions, and 79 % of commits went straight to main. An agent can forget a rule, so a written rule is not enough.",
      },
      {
        label: "What it is.",
        body: "PG, short for Prompt-Guard, began as rules added to every prompt and grew into the whole quality system. The name Higher Mind comes from my other project, a guidebook on practical spirituality: a rule you intend to follow is a belief, a check that runs on its own is a practice. It has 11 hooks, small programs that fire at fixed moments, git gates at commit and push, 9 specialist AI reviewers, 51 tools that use no AI tokens and a catalogue of 170 scars. It is a public repository you can install in five minutes.",
      },
      {
        label: "One change, start to finish.",
        body: "Say I ask for discount codes in a shop. After every file edit the agent gets its style and type errors back at once. Every terminal command passes a guard that blocks the dangerous ones, such as rewriting history or deleting outside build folders. Every commit and push pass their own gates. When the session ends, the last check measures the risk tier: discount codes touch payments, so the tier is the highest, T3, and the session cannot close until the reviewers for code, security, data and operations have checked it. A finding without proof is dropped, a script combines the rest, and the verifier tries to disprove them. A change like that merges only after I type my phrase.",
      },
      {
        label: "What it taught me.",
        body: "Whoever wrote the code, a person or a model, does not see its own mistakes, so the reviewers start with a clean slate. A check without its own test can be dead: my push gate read its input twice and did nothing for six days, so every git hook now has a test that runs the whole script. And a block that stops normal work far more often than it catches a mistake does harm. That is why version 1.8.0 put one rule above the others: no incident, no new block. A new check only watches and logs at first.",
      },
      {
        label: "Where it stops.",
        body: "The guard is built against mistakes and against instructions smuggled in from outside, not against an agent determined to get around it; that belongs to the operating system's sandbox. Merging without my phrase rests on one model's review, a probabilistic proof. On October 14 I decided PG is complete for now: a rewrite of the guard's parser went through nine review rounds that kept finding cases that never happened in real work. Effort was growing, protection was not.",
      },
      {
        label: "Where it is going.",
        body: "Proportion. The routines look only at repositories with real work in the last 30 days: 12 of 47 today. Changes to PG reach new repositories through the template, and old project repositories stay untouched unless I ask. PG itself now changes only after an incident that slipped through, when a tool or model update breaks a hook, or when I ask.",
      },
    ],
  },
  {
    id: "faq-clients",
    part: 6,
    title: "Questions clients ask",
    faq: [
      {
        label: "Why should I care how the code is checked?",
        body: "Because more and more code is written by AI, and AI can be wrong while saying it is done. With this system a change reaches your product only after automatic checks, on risky changes only after independent reviewers, and anything that cannot be undone waits for a person. You can also see what was checked: every report ends with a status word and its proof.",
      },
      {
        label: "Does this mean my app will have no bugs?",
        body: "No, and nobody should promise that. PG lowers the risk and catches the kinds of failure that have already happened once. Reviews can be wrong too, and merging without my phrase rests on a probabilistic proof. The limits are written down in the open, in the last section of the part above.",
      },
      {
        label: "What if the AI deletes my database?",
        body: "Every command that talks to a database is traced to where it points. A command that would delete or wipe data is blocked unless the database is provably on my machine, and a command the guard cannot read counts as dangerous. Erasing the project history and mass deletes are blocked too. This stops mistakes and smuggled instructions; it is not a defence against a determined attacker.",
      },
      {
        label: "Will all this checking slow my changes down?",
        body: "Checking is proportional to risk. Copy, styles and documentation pass only the script checks; payments, logins and data get the full review. In version 1.8.0 I removed blocks that stopped normal work more often than they caught mistakes: for example, a change may now have up to 1,500 source lines before it must be split.",
      },
      {
        label: "Who has the final say on risky changes?",
        body: "I do. Logins, payments, changes to the database structure, outside libraries, the automatic test setup and the agents' own instructions never go live on their own; they wait until I type my phrase in the chat. The same words echoed in an agent's reply unlock nothing, and every use goes into the log.",
      },
      {
        label: "Where do passwords and keys live?",
        body: "In a vault on my own hardware: 157 keys, tokens and logins. A bridge passes a value straight into the process that needs it, so it never appears in the chat, the code or the logs. A secret typed into a command is blocked, and automatic scans keep secrets out of the code.",
      },
      {
        label: "Could someone else take over my project?",
        body: "That is a design goal. Every style decision answers one question: can a senior engineer who has never seen the repository run it in 15 minutes and find the place to change in 15 more? New repositories start from a template with automatic tests, and architecture decisions are written down with their evidence.",
      },
      {
        label: "Does all this checking cost a lot?",
        body: "It costs AI usage, so it is spent on purpose. Plain script checks that use no AI run first. AI reviewers run only where the risk is: about four times the cost of one review on a shared piece of code, eight to ten times on the riskiest changes such as payments. Copy and documentation changes get none.",
      },
    ],
  },
  {
    id: "faq-recruiters",
    part: 6,
    title: "Questions recruiters ask",
    faq: [
      {
        label: "What did you build yourself, and what did the AI do?",
        body: "AI coding agents write the code. My part is the specification, the review and the deploy: I defined the problem from an audit, made the architecture decisions, set the limits and the approvals, and I decide what is risky enough to wait for me. I would not claim to have typed the code by hand.",
      },
      {
        label: "What was the biggest failure?",
        body: "A check that never ran. The push gate read its input twice, so it saw nothing and protected nothing for six days, and nothing noticed, because nothing tested the gate itself. Now every git hook has a test that runs the whole script with real input, so a gate that stops blocking turns a test red.",
      },
      {
        label: "What did you learn from building it?",
        body: "Rules written as text do not act; mechanisms that fire on an event do. Whoever wrote the code, a person or a model, does not see its own mistakes, so reviewers start with a clean slate. And proportion matters: since version 1.8.0 there is no new block without an incident behind it.",
      },
      {
        label: "How do you know it works?",
        body: "Every gate has a test proving it blocks, and the whole test suite has 606 checks. Mutation testing plants small bugs to prove the tests catch them. Before a new guard rule could block anything, it ran against 40,824 real commands.",
      },
      {
        label: "What would you do differently?",
        body: "Measure before blocking. For weeks every risk I noticed got a new gate, until the gate log showed that some of them stopped normal work far more often than they caught a mistake. Since 1.8.0 a new check starts by only watching.",
      },
      {
        label: "Why the name Higher Mind?",
        body: "It comes from my other long project, a free guidebook on practical spirituality, whose rule is practice over belief. A rule you intend to follow is a belief; a check that runs on its own is a practice. PG is that higher mind above every coding session.",
      },
      {
        label: "Can others use it?",
        body: "Yes. The whole system is a public repository, cleaned of private data, which you can install in five minutes with Node 20+, git and Claude Code. The installer never overwrites a file you changed and ends with a self-test, and the green output is the proof.",
      },
      {
        label: "How fast does it change?",
        body: "Fifteen public versions in 33 days, each answering something real: an audit, a comparison with 35 open-source projects, a failure, or friction in my own work. Since October 14 it is in maintenance mode: it changes after an incident, a broken hook or my request, not for its own sake.",
      },
    ],
  },
  {
    id: "faq-developers",
    part: 6,
    title: "Questions developers ask",
    faq: [
      {
        label: "Isn't this overengineering?",
        body: "It is heavy, and it is proven at the scale of one owner, not a large company. But it audits itself: since 1.8.0 there is no new block without an incident, a new check starts by watching, and limits that got in the way were raised, like the change size, now 1,500 source lines. On October 14 I stopped adding mechanisms because more had started to cost more than it protected.",
      },
      {
        label: "How is this different from CI and linters?",
        body: "CI is one of its layers. PG also guards the agent while it works: at the prompt, after every edit, at every terminal command and when the session ends, then at commit and push. On top of that come reviewers with a clean slate, a catalogue of scars where every gate points to a real failure, and proof instead of claims.",
      },
      {
        label: "What if an AI reviewer is wrong, or gets fooled?",
        body: "Reviewers work independently and only read; a finding without proof is dropped; a script, not a model, combines them; and the verifier tries to disprove each one. The weak spot is the CI review: it is one model, a probabilistic proof that a crafted diff can try to talk around. That is why risky paths always wait for my phrase.",
      },
      {
        label: "Can't the agent just get around the gates?",
        body: "Small quality gates it may pass itself, and every pass is logged. Steps that cannot be undone need my phrase, typed by me; the same words in an agent's reply unlock nothing. The control layer is sealed with checksums. But the guard is built against mistakes and smuggled instructions, not a determined agent: running any script can do anything, and that case belongs to the sandbox.",
      },
      {
        label: "How much does it cost in tokens?",
        body: "Roughly four times one review at T2 and eight to ten at T3, with the free script checks first so no reviewer looks at red lint. The full rules go into the prompt once per session, then a one-line reminder. The context window stays at 400k, because in my transcripts 1M used about 2.3 times more of the weekly limit.",
      },
      {
        label: "Why separate reviewers instead of one good model?",
        body: "Whoever wrote the code does not see its own mistakes, so reviewers get only the change and the task and never see each other's findings: agents that discuss drift toward the majority. Each gets its own slice of the diff, because given a 9,799-line diff reviewers read about 10 to 30 % of it.",
      },
      {
        label: "How are the gates themselves tested?",
        body: "Every gate has a test that proves it blocks, and a script checks that every written rule has a gate. Mutation testing proves the tests catch planted bugs. Hooks, git gates and settings are sealed with checksums, and a change outside a window I opened shows up at the start of the next session.",
      },
      {
        label: "Does it hold on a large codebase?",
        body: "Consistency drifts in large systems through unwritten assumptions, so they are written where a script can read them: each architecture document has a block of layers and forbidden imports, and the push gate blocks a new import cycle. A file that more than 40 others import is flagged before an edit. Old cycles only warn.",
      },
      {
        label: "Why is part of it in Polish?",
        body: "The rules injected into the prompt have a full English version, and every block message has an English line with its escape hatch. The doctrine and the reviewer checklists are still in Polish; the model reads them fine, and the README is in both.",
      },
    ],
  },
];
