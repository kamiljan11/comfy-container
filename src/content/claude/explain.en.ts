import type { ExplainUi, Explains } from "../../components/claude/types";

// Plain-language explanations of the parts of the /claude figures (EN). Ids match the `data-explain`
// attributes the figures draw; Explain.test.ts checks both directions and that EN and PL explain the same parts.
export const explainUiEn: ExplainUi = {
  hint: "Point at or tap any part of the diagram, or pick it below, to see what it does in plain words.",
  pick: "Parts of this diagram",
  close: "Hide",
};

export const explainEn: Explains = {
  arch: [
    {
      id: "kamil",
      term: "The person in charge",
      body: "I write down what should be built, choose the design, read the review results and decide on release. The AI does the typing, like a building crew working from an architect's plan, with the architect signing off the finished house.",
    },
    {
      id: "code",
      term: "AI that writes code",
      body: "Claude Code is an AI assistant that runs in the terminal. It writes and changes software, runs tests and ships it to production. Through connectors (MCP) it can also use GitHub, a web browser and mail.",
    },
    {
      id: "cowork",
      term: "AI for office work",
      body: "Claude Desktop (Cowork) is the same AI as an office helper: it drafts mail and documents, does research, prepares outreach and design work. It follows the same rules and reads the same memory as the coding one.",
    },
    {
      id: "vault",
      term: "Safe for passwords",
      body: "157 passwords and API keys (the codes programs use to talk to each other) are kept in one place. A program receives a key only at the moment it needs it, like a hotel desk handing over a room key. The key never appears in the chat.",
    },
    {
      id: "memory",
      term: "Shared notebook",
      body: "More than 2,300 notes that the AI reads when a session starts, so it remembers decisions from weeks ago. After each session it writes a short summary of what happened, like a shift log in a factory.",
    },
    {
      id: "gates",
      term: "Automatic checkpoints",
      body: "PG, the quality system, is a row of checks on the path of every change: request, edit, command, session end, commit (saving a change), push (sending it to GitHub), CI (automatic testing), review and a final proof from the live site. Like airport security, it does not care who you are.",
    },
    {
      id: "projects",
      term: "All 47 projects",
      body: "47 repositories (folders of code kept under version control): apps, websites and automations. The same checks cover a client's shop and a small tool, so quality does not depend on which project it is.",
    },
  ],
  mind: [
    {
      id: "center",
      term: "The whole quality system",
      body: "Higher Mind, or PG (Prompt-Guard), is a set of automatic checks around an AI that writes code. It began as a list of rules added to every request and grew into eight parts. The idea behind it: a rule you only intend to follow gets forgotten, a check that runs by itself does not.",
    },
    {
      id: "branch-0",
      term: "Rules sent with every request",
      body: 'Each non-trivial request to the AI gets a short protocol attached: ask when something is unclear, check before claiming, say "done" only with proof. Reports stay short, and the task is routed to the right ready-made skill. A pilot\'s checklist, delivered automatically.',
    },
    {
      id: "branch-1",
      term: "Triggers on every action",
      body: "Small programs that fire at set moments. After each file edit one scans the code for mistakes. Before each terminal command another blocks dangerous ones, such as erasing history. At the end of a session a third works out how risky the change was.",
    },
    {
      id: "branch-2",
      term: "Checks when saving code",
      body: "Git is the history book of the code. When changes are saved or sent to the server, checks look for leaked passwords, an outdated base, invented libraries, leftover TODO notes and faulty database code. A library name has to really exist, so a typo cannot let a fake one in.",
    },
    {
      id: "branch-3",
      term: "Specialist AI reviewers",
      body: "Several AI reviewers, each covering one field (code, security, data, operations, screens, product, testing), read the change independently. Two more: a verifier who tries to disprove their findings, and a devil's advocate who argues against the plan. Like a contract read separately by a lawyer and an accountant.",
    },
    {
      id: "branch-4",
      term: "The written playbook",
      body: 'Short documents read when they are needed: design before code, what "done" means at each risk level, and 170 "scars", real failures from the past. Every rule points to the mistake it came from.',
    },
    {
      id: "branch-5",
      term: "Starter kit for projects",
      body: "Every new project gets a ready kit: automatic tests, mutation testing (breaking the code on purpose to see whether the tests notice), written rules on which parts of the code may depend on which, a test checklist, privacy notes and an operations guide. Safety is not bolted on at the end.",
    },
    {
      id: "branch-6",
      term: "Scheduled helpers",
      body: "Jobs that run on a timer while nobody is typing: reviewing open pull requests (proposed changes), a health check and a watch for known security holes. Right now all of them are switched off until their setup is repaired.",
    },
    {
      id: "branch-7",
      term: "The system tests itself",
      body: "Every check has a test proving that it blocks its own case. A script verifies that each written rule has a matching check, and a weekly audit looks for checks that stopped working. Like the test button on a smoke alarm.",
    },
  ],
  pipe: [
    {
      id: "stage-0",
      term: "Your request",
      body: 'The task goes to the AI with a protocol attached: ask when unclear, verify before claiming, finish only with proof. It is added automatically, so the AI cannot "forget" it. Like a pre-flight checklist.',
    },
    {
      id: "stage-1",
      term: "Every edit is checked",
      body: "After each file the AI changes, the code is scanned for mistakes (lint) and for type errors, meaning pieces that do not fit together. Errors go straight back to the AI to fix, like a proofreader marking every paragraph.",
    },
    {
      id: "stage-2",
      term: "Commands are screened",
      body: "Before the AI runs a terminal command, a guard reads it. It blocks skipping the checks (the no-verify switch), forced overwriting of history, deleting folders and downloading scripts to run blindly. Like airport security: all that matters is what is in the bag.",
    },
    {
      id: "stage-3",
      term: "End of session check",
      body: "When the AI wants to finish, an automatic check (a gate) measures how risky the change was and runs the tests. For medium and high risk it refuses to close until specialist reviewers have looked. Like a foreman who inspects the station before the shift ends.",
    },
    {
      id: "stage-4",
      term: "Check when saving",
      body: "A commit saves the change in the history. At that moment the description is checked, and so are secrets (leaked passwords), new libraries and database code. Like the document check just before boarding.",
    },
    {
      id: "stage-5",
      term: "Check when sending",
      body: "A push sends the code to the server. Sending straight to the main version is blocked, and so are oversized changes and import cycles, where parts of a program depend on each other in a loop.",
    },
    {
      id: "stage-6",
      term: "Automatic test run",
      body: "CI is a robot that builds and tests the change on a clean machine. It also runs mutation tests, which break the code on purpose to see whether the tests notice, and scans for secrets once more.",
    },
    {
      id: "stage-7",
      term: "Joining the main version",
      body: "A merge adds the change to the main code. The script merges only if the checks ran on the current result of the merge, not on a state from before someone else's change. Green CI on a stale result once let a broken change into the main version.",
    },
    {
      id: "stage-8",
      term: "Proof from the live site",
      body: 'After release, a script requests the real production address and expects status 200, which means "OK". A successful build alone is not enough. Like phoning a restaurant to ask if it is open, instead of reading its sign.',
    },
    {
      id: "live",
      term: "Live for real users",
      body: "The change now runs for real users. The strip below the path says who may skip a check: nobody, silently. Risky steps need a review by separate AI reviewers, and irreversible ones need my typed phrase in the chat.",
    },
  ],
  review: [
    {
      id: "orchestrator",
      term: "The conductor",
      body: "The main session starts the review: it works out how risky the change is, sends the code to the reviewers and collects what they report. Reviewers do not talk to each other or argue with the conductor. Each works alone.",
    },
    {
      id: "gates",
      term: "Scripts go first",
      body: "Cheap scripts check lint, types, tests and SQL before any AI reviewer starts. Reviewers see only code that already passed, so they spend their effort on real problems, not typos. Like a spell check before an editor reads the article.",
    },
    {
      id: "finder-0",
      term: "Code reviewer",
      body: "Reads the change for readability, correctness, tests and logging. It works read-only, starts with a blank memory, and must back every remark with a command it ran. Like a colleague who never heard the earlier discussion.",
    },
    {
      id: "finder-1",
      term: "Security reviewer",
      body: "Hunts for ways in and ways for data to leak: holes in login, one customer seeing another's data, exposed secrets, payment mistakes. Used on high-risk changes. Like a locksmith testing every door of a new building.",
    },
    {
      id: "finder-2",
      term: "Database and operations reviewers",
      body: "The data reviewer checks database changes: structure, indexes, safe rollback. The operations reviewer looks at deployment: timeouts, retries, logs and how to undo a release. Like an electrician and a plumber inspecting the same building.",
    },
    {
      id: "finder-3",
      term: "Reviewers for the user's side",
      body: "UX checks screens, languages, accessibility and phones. Product asks whether the change solves a named problem and whether a stranger could take it over. QA runs the app and clicks through it like a real customer.",
    },
    {
      id: "aggregate",
      term: "Findings merged by a script",
      body: "A plain script, not an AI, combines the reports. A finding blocks the change only if enough reviewers found it independently or the verifier reproduces it. A finding with no executed command as proof is dropped.",
    },
    {
      id: "verifier",
      term: "The sceptic",
      body: "A fresh AI whose only job is to disprove the findings. It reruns the command behind each one and rules reproduced or not. It looks for errors in the reports, not for confirmation, which guards against everyone agreeing for no reason.",
    },
    {
      id: "fixer",
      term: "Fix, then check again",
      body: "The main session repairs what was confirmed, and the scripts run again from the start. The review ends when the gates pass on the repaired code, not when the fixing is done.",
    },
  ],
  loop: [
    {
      id: "step-0",
      term: "Something goes wrong",
      body: "A real incident happens, or the same correction has to be made twice. That starts the loop. Example: a check before pushing code sat dead for six days and nobody noticed.",
    },
    {
      id: "step-1",
      term: "Find the real cause",
      body: 'I ask "why" five times to get beneath the symptom. In the push example, the check was dead because an earlier line had already used up its input, and the health check only looked whether the file existed.',
    },
    {
      id: "step-2",
      term: "Write the scar down",
      body: 'The failure goes into a register as a "scar" with an ID: what happened, the proof and the rule it produced. There are 170. Each rule carries the ID of the failure behind it, so nobody has to guess why it exists.',
    },
    {
      id: "step-3",
      term: "Build and test the check",
      body: "A check is built that catches exactly this case, plus a test proving that it blocks. I do not trust a check without that test, because a green result may just mean a broken alarm.",
    },
    {
      id: "step-4",
      term: "Every rule needs a check",
      body: "A script compares the written rules with the checks that exist. A rule that lives only as text fails the audit. This keeps the policy from sliding back into good intentions.",
    },
    {
      id: "step-5",
      term: "Weekly audit",
      body: "Once a week the system inspects itself: do the checks still fire, are there silent skips? Anything that stopped working becomes a new incident at step one, so the loop feeds itself. It is paused for now.",
    },
  ],
  vault: [
    {
      id: "vault",
      term: "Self-hosted password safe",
      body: "157 passwords and keys sit on my own server, not in someone else's cloud. The AI cannot browse them.",
    },
    {
      id: "bridge",
      term: "The go-between",
      body: "When a task needs a key, the bridge takes it from the safe and hands it straight to the one program that needs it. Like a parcel passed through a hatch: the AI sees that it arrived but never holds it.",
    },
    {
      id: "target",
      term: "Program using the key",
      body: "A deployment, an API call or a CI run receives the key as a hidden setting (an environment variable), uses it and ends. The key exists only inside that process while it runs.",
    },
    {
      id: "never",
      term: "Where the key never appears",
      body: "The key never shows up in the chat, the code or the logs. PG also blocks a secret typed into a command line and scans every save for leaks, so pasting a key into a public file gets stopped.",
    },
  ],
  cadence: [
    {
      id: "row-0",
      term: "Daily pull request review",
      body: "On weekdays an AI reads open pull requests (proposed changes) in active projects and reports problems. Active means touched in the last 30 days: 12 of 47 at the first count. One of three routines due to return.",
    },
    {
      id: "row-1",
      term: "Weekly health check",
      body: "Once a week a script, not an AI, inspects the whole system: do the checks still fire, did any routine fail, how often were gates bypassed. Like a car service. Due to return.",
    },
    {
      id: "row-2",
      term: "Monthly vulnerability watch",
      body: 'Once a month it checks active projects for known security holes in the libraries they use. It tells "scanned, nothing found" from "could not scan", so a failed read never looks like an all clear. Due to return.',
    },
    {
      id: "row-3",
      term: "Reviewer calibration",
      body: "Once a month it tests that the AI reviewers stay consistent: the same defect shown in two different wrappers must get the same verdict. It only concerns PG itself, so it stays off while PG is in maintenance.",
    },
    {
      id: "row-4",
      term: "Look at similar projects",
      body: "Once a month it looks at what comparable open projects are doing, to spot ideas worth borrowing. It only works on PG itself, so it stays off.",
    },
    {
      id: "row-5",
      term: "Model line-up check",
      body: "Once a month it looks at the AI models Anthropic currently offers and suggests which one should do which job in the system, for example a cheaper model for routine checks. It only concerns PG itself, so it stays off.",
    },
    {
      id: "row-6",
      term: "Repository clean-up",
      body: "Tidying a project's files and old branches is done by hand, when I ask for it. Anything that could go looking for work on its own is switched off by design, so nothing touches old projects unless I ask.",
    },
  ],
  tiers: [
    {
      id: "rung-0",
      term: "Lowest risk: text and styling",
      body: "Docs, copy, styles and images. Only free script checks run, with no AI reviewer and so no AI cost. Fixing a typo should not start a security audit, just as a graze in an emergency room gets a plaster.",
    },
    {
      id: "rung-1",
      term: "A small, isolated change",
      body: "One self-contained component or helper. A code review is recommended, at about the cost of one review. The level comes from the files changed, not from what the AI says about them.",
    },
    {
      id: "rung-2",
      term: "Shared code, medium risk",
      body: "Logic used in many places, an API, new outside libraries (dependencies), settings of the automatic test server (CI) or more than 150 lines. It needs code and operations reviewers, plus UX or data where relevant. The cost is about four reviews.",
    },
    {
      id: "rung-3",
      term: "Highest risk",
      body: "Login, permissions, payments, secrets, changes to the database structure (migrations), scheduled jobs or more than 600 lines. Code, security, data and operations reviewers, then a verifier. About 8 to 10 reviews, with the strongest model on security, data and verification.",
    },
  ],
  exceptions: [
    {
      id: "level-0",
      term: "The AI decides",
      body: "For minor checks such as change size, a TODO note or the wording of a change's description, the AI may fix the problem or go on knowingly. Every pass is logged with the gate's name. Like a shift manager approving a small expense.",
    },
    {
      id: "level-1",
      term: "After a review",
      body: "For riskier steps such as deleting files or a hard reset (throwing away unsaved work), separate AI reviewers must first review that exact code and the AI must fix their findings. Only then does permission last 15 minutes, for one command in one repository.",
    },
    {
      id: "level-2",
      term: "Only me",
      body: "For steps that cannot be undone or that switch off other checks, such as a force-push (forcibly overwriting history) or changes to the gates, I must type the phrase in the chat. It lasts 30 minutes and 3 uses. The AI cannot grant it to itself.",
    },
  ],
  merge: [
    {
      id: "start",
      term: "A proposed change",
      body: "A pull request is a request to add a change to the main code. Every merge used to need my typed phrase. Now a script decides from the risk of the change and the proof attached to it. On since October 4.",
    },
    {
      id: "checks",
      term: "All checks green",
      body: "Merging starts only if every automatic check passed on the current merge result, meaning the code as it will look once joined. Green on an old state once let a change into the main version that then broke it.",
    },
    {
      id: "branch-0",
      term: "Docs only: merges alone",
      body: "The change touches only documentation, so there is nothing to review. The script merges it once the checks are green.",
    },
    {
      id: "branch-1",
      term: "Ordinary code: one review",
      body: "An ordinary code change merges by itself if a code review of exactly this diff (the list of changed lines) exists. The review names the diff by its checksum and is valid for two hours, so it cannot be reused for another change.",
    },
    {
      id: "branch-2",
      term: "Shared logic: two reviews",
      body: "Code used in many places merges by itself after a code review and an operations review of this exact change. Without that proof it waits.",
    },
    {
      id: "branch-3",
      term: "Sensitive: waits for me",
      body: 'Logins, payments, migrations, dependencies, CI settings and instructions for AI agents never merge on their own. They wait until I type "pozwol ALLOW_MERGE" (pozwol means allow).',
    },
  ],
};
