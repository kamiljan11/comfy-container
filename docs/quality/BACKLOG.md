# Quality backlog — deliberately deferred (PG v3 github-ready pass, 2026-09-05)

Everything below was found during the github-ready pass and intentionally NOT fixed in that PR,
per scope discipline (small PR, root causes only, no drive-by refactors). Each item names what,
why deferred, and the risk of leaving it.

## Content

- **`src/server/email.server.ts`'s `welcomeSequence[0].body` links a dead route, and this one IS
  live** (corrected after checking callers — an earlier pass of this file wrongly called it inert).
  It points at `https://kamiljan.com/spirituality`, which doesn't exist as a route (see the
  orphaned-content item below) — the real files are served at
  `/books/Simplified-Practical-Spirituality.pdf` (used correctly elsewhere: `src/routes/index.tsx`,
  `src/routes/__root.tsx`). `welcomeSequence[0]` sends immediately (only *additional* future
  messages need the not-yet-built scheduler, per this file's own comment) and IS wired: every
  newsletter signup (`src/lib/newsletter.functions.ts` `subscribeToNewsletter` ->
  `startWelcomeSequence`) sends it to the real subscriber address, via whichever transport is
  active — a real email via Resend if `RESEND_API_KEY`/`EMAIL_PROVIDER=resend` are set in Vercel
  (unverified from the repo whether they are), or just a console log otherwise. A content/link fix
  was drafted and then reverted out of this PR (docs/CI-only scope, per explicit instruction to
  keep this pass to type/log/const/test changes) — recommend a one-line follow-up PR to fix the
  URL; low severity (cosmetic dead link, not a security/data issue) but worth doing soon since it
  is reachable today, not hypothetical.
- **`src/content/spirituality/*.md` (6 files) is orphaned.** The `/spirituality/*` route section
  was built (see `migration/STATUS.md`, 2026-05-21) and later removed — commits `815d069` (drop 13
  dead `/spirituality` 404s from the sitemap) and `ea811cc` (remove orphaned spirituality
  components). The markdown source files were never deleted. Risk: low (dead weight, not served
  anywhere). Action needed: Kamil decides — delete, or keep as an archive for a future revival.
- **`migration/STATUS.md` and `.lovable/plan.md` are stale planning docs**, not live
  documentation — they describe a mid-migration state (Lovable auto-deploy, in-progress
  spirituality routes) that no longer matches `main`. Left as historical record rather than
  deleted or "corrected", per the no-rewriting-history-docs rule. `docs/adr/0001-*.md` explicitly
  flags this so a future reader doesn't trust them by mistake.

## Tests / CI

- **`e2e/smoke.spec.ts` imports `@playwright/test`, which is not a dependency** and has no
  `playwright.config.ts`. `.github/workflows/quality.yml`'s `e2e` job guards on
  `hashFiles('playwright.config.ts', ...)` so it silently no-ops rather than failing red — but the
  test cannot actually be run today (`npx playwright test` would error on a missing package). Real
  fix (add `@playwright/test` devDependency + a minimal config) is infra, not "polish" — out of
  scope for this PR's 25-file/root-cause budget. Recommendation: separate small PR.
- **`fleet-metrics.js` reports `catchBlocks: 11 total / 11 silent`.** Manually reviewed all 11
  (`ChatBot.tsx` x6, `bot.server.ts`/`lead.server.ts` x3, `email.server.ts` x1 has a named catch
  already) during this pass: every one either returns a typed `{ ok: false, error }` result or
  guards a non-critical `sessionStorage`/`localStorage` call where there's nothing meaningful to
  log. Not "fixed" by adding `console.error` everywhere — that would be gaming the metric, not
  improving reliability. Flagging here so the number's context isn't lost.
- **`docs/adr/0000-template.md`, `tsconfig.base.json`, `eslint.config.mas-strict.mjs`** were
  dropped in by the PG v3 bootstrap script as create-only proposals. `tsconfig.json` already has
  `"strict": true` (no gap to close), and the existing `eslint.config.js` was left as the live
  config per the bootstrap's own "don't overwrite a Lovable-origin config" rule. Nobody has
  compared the strict-baseline proposal against the live config yet.

## Structure (files over the size guideline — not split in this PR, per the "don't split >1000-line files here" rule in `~/.claude/pg/github-ready.md`)

| File | LOC | Why not split now |
|---|---|---|
| `src/data/caseStudies.ts` | ~1540 | Content (case-study copy as data), not logic density |
| `src/data/services.ts` | ~1389 | Same — service-page copy as data |
| `src/routes/claude.tsx` | ~1055 | Single content-heavy page component |

`src/routes/index.tsx`'s `HomePage` component is ~585 lines (over the 60-line-function
guideline) — same reasoning: a single marketing page, not control-flow complexity. Splitting any
of these is a real refactor with real regression risk on carefully-worded, adversarially-reviewed
copy; do it as its own PR with a diff a reviewer can actually read, not folded into a docs pass.

## Tracking

- **`ANTHROPIC_API_KEY` paid-API usage**: this repo calls Anthropic directly for the chat bot and
  lead brief (see `docs/adr/0002-anthropic-for-bot-and-lead-brief.md`). If the key is set in the
  live Vercel project, this repo is a paid-API consumer alongside `mas-warsztat-app` — worth
  reconciling with whatever tracks that fleet-wide (not verified from inside this repo).
- **Mixed lockfiles**: `bun.lock`, `bun.lockb`, and `package-lock.json` are all committed. CI
  (`quality.yml`) runs `npm ci` against `package-lock.json`; the two bun lockfiles look like local
  dev tooling (not touched here — could be intentional if Kamil uses bun locally).
- **`npm install`/`npm ci` silently overrides the global MAS git hooks for this repo.** The tracked
  `prepare` script (`scripts/setup-hooks.mjs`) runs `git config core.hooksPath scripts/git-hooks`
  on every install, which is a *local* (repo-scoped) override that wins over the global
  `core.hooksPath` (`~/.claude/git-hooks/`) set up for the Senior Quality Pipeline. Confirmed on
  this worktree: `git config core.hooksPath` reads `scripts/git-hooks` after `npm ci`, not the
  global path. The local `scripts/git-hooks/pre-commit` only checks for smart-quote/encoding
  breakage (`scripts/check-encoding.mjs`) — it does **not** run the global secret scan, lint,
  typecheck, or Conventional Commits message check. Net effect: any commit made in a normal
  clone of this repo (after `npm install`) skips the fleet-wide pre-commit gates and only gets the
  narrower repo-local one. Not changed here — this predates the PG pass and removing/renaming a
  build-safety guard "by the way" is exactly the kind of drive-by change this PR avoids. Risk:
  medium (secrets could reach a local commit unscanned before CI's Gitleaks job catches them on
  push) — flagging for Kamil to decide whether `scripts/setup-hooks.mjs` should chain to the global
  hooks instead of replacing them.
