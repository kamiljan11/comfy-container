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
*result*, not which adapter produced it.

## Modules and boundaries (what's where)

| Path | Responsibility | Entry point | Tier |
|---|---|---|---|
| `src/routes/` | Pages (file-based routing): `/`, `/case-studies`, `/cv`, `/claude`, `/uslugi/*` | `createFileRoute(...)` per file | T1 |
| `src/routeTree.gen.ts` | **Generated** by the TanStack router plugin on every build/dev run. Never hand-edit; that's why it carries `as any` and a file-level `eslint-disable` — those are not hand-written debt | — | generated |
| `src/data/caseStudies.ts`, `src/data/services.ts` | All case-study and service copy, as data (not hardcoded in JSX) — this is what Kamil edits when a case study changes | typed arrays | T1 |
| `src/i18n.ts` | EN/PL copy dictionary for the site chrome (nav, hero, footer) | `type SiteTranslation` | T1 |
| `src/hooks/useLang.ts` | Resolves language from `?lang=`, then `localStorage`, then browser locale; keeps `?lang=` in the URL | `useLang()` | T1 |
| `src/components/ChatBot.tsx` | Chat UI: typing effect, quick replies, the "message Kamil" lead form, session-storage history | React component | T2 |
| `src/lib/*.functions.ts` | Client-callable server functions (`createServerFn`) — thin input validation, delegate to `src/server/*.server.ts` | `askBot`, `submitLead`, `submitContactForm`, `subscribeToNewsletter` | T2 |
| `src/server/bot.server.ts` | The chat bot's entire knowledge base as one adversarially-reviewed system prompt (privacy rules, positioning, Q&A), + the Anthropic call | `runBot()` | T2 |
| `src/server/lead.server.ts` | Validates a lead (honeypot, email regex, length caps), asks Anthropic for a 2-3 sentence brief, emails it via Resend | `sendLead()` | T2 |
| `src/server/email.server.ts` | Pluggable mail transport (`stub` console-log vs `resend`); contact form + newsletter both route through here | `sendEmail()` | T1 |
| `src/server/subscribers.server.ts` | Newsletter subscriber storage — in-memory stub today; a commented-out Cloudflare KV transport is ready to uncomment | `saveSubscriber()` | T1 |
| `src/content/spirituality/*.md` | **Orphaned.** Source content for a `/spirituality/*` section that was built, then removed (see `docs/quality/BACKLOG.md`) | — | dead |

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
