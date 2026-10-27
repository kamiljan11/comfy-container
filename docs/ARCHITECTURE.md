# ARCHITECTURE — map for a stranger (1 page)

<!-- Goal: a senior who has never seen this repo finds the place to change in 15 min. Update on every ADR. -->

## What this is (3 sentences)

kamiljan.com — Kamil Jan's personal site and CV. It sells one thing: hiring or contracting Kamil,
to a recruiter or a company deciding whether to work with him. No customers, no payments, no
database — the only "transaction" is a visitor becoming a lead, captured by an AI chat widget and
a contact form and emailed straight to Kamil.

## Stack (boring, with versions — from `package.json`)

- **Framework:** TanStack Start 1.167 + TanStack Router 1.168 (file-based routing under `src/routes/`,
  server functions under `src/lib/*.functions.ts` + `src/server/*.server.ts`) on React 19 + Vite 7.
- **Styling:** Tailwind CSS 4 + shadcn/ui components on Radix primitives (`src/components/ui/`).
- **AI:** Vercel AI SDK (`ai` 6.x) + `@ai-sdk/anthropic` 3.x, model `claude-haiku-4-5` pinned in
  code. Why Anthropic and not Google Gemini or the Lovable AI Gateway: `docs/adr/0002-anthropic-for-bot-and-lead-brief.md`.
- **Mail:** Resend, called directly over `fetch` (no SDK dependency).
- **Hosting:** Vercel — every push to `main` deploys (verified live: `Server: Vercel` response
  header on kamiljan.com). Why not Lovable: `docs/adr/0001-lovable-to-vercel-hosting.md`.
- **No database.** The one piece of "state" (newsletter subscribers) is an in-memory stub, reset
  on every deploy — see `src/server/subscribers.server.ts`.
- **Supply chain:** `.npmrc` / `bunfig.toml` both enforce a 7-day quarantine on freshly published
  packages before they're installable.

`wrangler.jsonc` and the Cloudflare Workers plugin in `vite.config.ts` are inherited from this
repo's original Lovable/TanStack-Start scaffold. **[NIEPEWNE]** whether Vercel's build actually
exercises the Cloudflare (nitro) target or auto-detects its own — not verified against the Vercel
project's build settings from inside this repo; the live `Server: Vercel` header confirms the
_result_, not which adapter produced it.

## Modules and boundaries (what's where)

| Path                                                                  | Responsibility                                                                                                                                                                                                                     | Entry point                                                          | Tier      |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------- |
| `src/routes/`                                                         | Pages (file-based routing): `/`, `/case-studies`, `/cv`, `/claude`, `/uslugi/*`                                                                                                                                                    | `createFileRoute(...)` per file                                      | T1        |
| `src/routeTree.gen.ts`                                                | **Generated** by the TanStack router plugin on every build/dev run. Never hand-edit; that's why it carries `as any` and a file-level `eslint-disable` — those are not hand-written debt                                            | —                                                                    | generated |
| `src/data/caseStudies.ts`, `src/data/services.ts`                     | All case-study and service copy, as data (not hardcoded in JSX) — this is what Kamil edits when a case study changes                                                                                                               | typed arrays                                                         | T1        |
| `src/content/claude/en.ts`, `pl.ts`                                   | The /claude article as typed data: seven parts, sections with stable ids, and the data of every chart. Both languages are kept in step by `content.test.ts` (ADR 0008); sources of every number in `docs/CLAUDE-PAGE-NUMBERS.md`   | `en`, `pl` (`Content`)                                               | T1        |
| `src/components/claude/`, `src/lib/chartMath.ts`                      | The /claude diagrams (SVG) and charts (HTML/SVG), the content types and the figure registry; chart arithmetic is pure and tested                                                                                                   | `Figure` in `src/components/claude/Figure.tsx`                       | T1        |
| `src/i18n.ts`                                                         | EN/PL copy dictionary for the site chrome (nav, hero, footer)                                                                                                                                                                      | `type SiteTranslation`                                               | T1        |
| `src/data/siteMap.ts`                                                 | The About menu's items: one list read by the header menus and the command palette                                                                                                                                                  | `ABOUT_ITEMS[lang]`                                                  | T1        |
| `src/lib/palette.ts`                                                  | The command palette as pure data and logic. It builds every destination (pages, services, areas, case studies) from the data files, and holds the diacritics-insensitive matcher and the Ctrl/⌘K rule. Tested in `palette.test.ts` | `paletteItems()`, `paletteScore()`, `isPaletteShortcut()`            | T1        |
| `src/components/CommandPalette.tsx`, `src/hooks/useCommandPalette.ts` | The palette dialog (installed cmdk + Radix dialog, styled by `.cmdp` in `site.css`) and its open state and global shortcut. The header's search button opens it too                                                                | `<CommandPalette>`, `useCommandPalette()`                            | T1        |
| `src/lib/caseStudyHash.ts`                                            | Opens the collapsed case study a link points at. The route calls it with the router's hash, which is ahead of `window.location` during a router navigation. Tested                                                                 | `hashToId()`, `openStudy()`                                          | T1        |
| `src/hooks/useLang.ts`                                                | Resolves language from `?lang=`, then `localStorage`, then browser locale; keeps `?lang=` in the URL                                                                                                                               | `useLang()`                                                          | T1        |
| `src/components/ChatBot.tsx`                                          | Chat UI: typing effect, quick replies, the "message Kamil" lead form, session-storage history                                                                                                                                      | React component                                                      | T2        |
| `src/lib/*.functions.ts`                                              | Client-callable server functions (`createServerFn`) — thin input validation, delegate to `src/server/*.server.ts`                                                                                                                  | `askBot`, `submitLead`, `submitContactForm`, `subscribeToNewsletter` | T2        |
| `src/server/bot.server.ts`                                            | The chat bot's entire knowledge base as one adversarially-reviewed system prompt (privacy rules, positioning, Q&A), + the Anthropic call                                                                                           | `runBot()`                                                           | T2        |
| `src/server/lead.server.ts`                                           | Validates a lead (honeypot, email regex, length caps), asks Anthropic for a 2-3 sentence brief, emails it via Resend                                                                                                               | `sendLead()`                                                         | T2        |
| `src/server/email.server.ts`                                          | Pluggable mail transport (`stub` console-log vs `resend`); contact form + newsletter both route through here                                                                                                                       | `sendEmail()`                                                        | T1        |
| `src/server/subscribers.server.ts`                                    | Newsletter subscriber storage — in-memory stub today; a commented-out Cloudflare KV transport is ready to uncomment                                                                                                                | `saveSubscriber()`                                                   | T1        |
| `src/content/spirituality/*.md`                                       | **Orphaned.** Source content for a `/spirituality/*` section that was built, then removed (see `docs/quality/BACKLOG.md`)                                                                                                          | —                                                                    | dead      |

### /claude: explaining a figure in plain words

Every figure on `/claude` explains its elements (`Explain.test.ts` fails when a figure has none). To add one: give the element a stable
`data-explain="<id>"` in `src/components/claude/diagrams.tsx` or `charts.tsx` (on the SVG `rect`/`g` or the
HTML card), then add `{ id, term, body }` for that id under the figure's key in **both**
`src/content/claude/explain.en.ts` and `explain.pl.ts`. `Explain.test.ts` fails until every marked element has
a text, every text has an element, the two languages list the same ids, and every number in a text also appears
in that language's article. `src/routes/claude.tsx` wraps a figure in `ExplainedFigure` when it has entries; since every figure must have
them, a figure without entries is a failing test, not a plain figure. Texts that describe state (a routine "is off", "due to
return") must change together with the figure when that state changes.

### /claude: which sections have a figure

A section gets a figure only when a picture shows something the list next to it cannot: a flow, a
before-and-after, what surrounds what. "Three ideas", "Guarding the guards" and "Install it yourself" got one
in October 2026; "VERIFIED · UNVERIFIED · FAILED", "Memory", "Does it hold at scale?" and "Honest limits" stay
text on purpose, because their points are separate facts and a figure there would only repeat the list. The
last part ("In short, and questions") is text by design: it retells the figures above. A figure that retells its section
carries only numbers the article states (`content.test.ts`).

### /claude: the short versions and the questions

The last part of `/claude` retells the article: `src/content/claude/tell.en.ts` and `tell.pl.ts` export the part
and its sections, which `en.ts`/`pl.ts` append to `parts` and `sections`. A section may carry `faq` (question =
`label`, answer = `body`), rendered by `src/components/claude/Faq.tsx` as native `<details>`; before printing it
opens every answer and folds the ones the reader had not opened afterwards. The part adds no facts of its own:
`content.test.ts` fails when a number written in digits does not stand in the rest of the article in the same
language, when the languages ask a different number of questions, when there are not exactly 25 questions (the
count the part was built with; adding or removing a question means changing the test on purpose), when a question repeats or does not end with
"?", or when an answer is longer than 480 characters (it has to read on a phone). Numbers written as words are
not checked, so read them against the article by hand. Change a fact in the article, and change it here too.

## Data flow — a chat message that becomes a lead

```mermaid
flowchart LR
  V[Visitor] -->|types a message| UI[ChatBot.tsx]
  UI -->|createServerFn| ASK[askBot / bot.functions.ts]
  ASK --> BOTSRV[bot.server.ts: runBot]
  BOTSRV -->|generateText, claude-haiku-4-5| ANTH[(Anthropic API)]
  ANTH --> BOTSRV --> UI

  UI -->|"message Kamil" form| SUB[submitLead / lead.functions.ts]
  SUB --> LEADSRV[lead.server.ts: sendLead]
  LEADSRV -->|2-3 sentence brief, same model| ANTH
  LEADSRV -->|POST /emails| RESEND[(Resend API)]
  RESEND -->|inbox| KAMIL[hello@kamiljan.com]
```

The contact form and newsletter signup follow the same shape, minus the AI brief step:
route -> `*.functions.ts` (validate) -> `email.server.ts` (`sendEmail`) -> Resend or console stub.

## Where is…

- **The AI system prompt / what the bot can and can't say:** `src/server/bot.server.ts`, the
  `SYSTEM` constant. It's the bot's entire knowledge base — no RAG, no external lookup.
- **Lead delivery / spam handling:** `src/server/lead.server.ts` — honeypot field, email regex,
  hardcoded recipient (`hello@kamiljan.com` by default), so the worst an abuser can do is spam
  Kamil's own inbox, not run an open relay.
- **i18n:** `src/i18n.ts` (site chrome) + `src/hooks/useLang.ts` (resolution/persistence). Content
  files (`caseStudies.ts`, `services.ts`, `bot.server.ts`) carry their own EN/PL copy inline.
- **Secrets:** Vercel project environment variables only. Nothing in the repo; see `.env.example`
  for names.
- **Feature flags:** none — the codebase doesn't have a flag system. The email transport's
  `stub` vs `resend` switch (`EMAIL_PROVIDER`) is the closest thing to one.
- **Logs:** Vercel function logs (`vercel.com` dashboard) — no Sentry or other APM wired into this
  repo (see `docs/RUNBOOK.md`).

## Decisions that are hard to reverse

See `docs/adr/`. Each one names the alternative considered and why it lost.

## Kill switch

- **Bot / lead brief misbehaving:** unset `ANTHROPIC_API_KEY` in Vercel and redeploy — the bot
  degrades to a fixed "unconfigured" message, and leads still arrive by email without the AI brief.
- **Mail flooding / abuse:** unset `RESEND_API_KEY` — everything falls back to the console-log
  stub transport; nothing external is sent.
- **Whole site:** `git revert` the bad commit on `main` and push — Vercel redeploys automatically
  (see `docs/RUNBOOK.md` for the full rollback drill).
