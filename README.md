# kamiljan.com — Personal Site

**Live:** [kamiljan.com](https://kamiljan.com) · **Status:** production · **Built by** [Kamil Jan](https://kamiljan.com)

Personal site and CV: what I build, what it is running in production, and how to get hold of
me. The public front for the work in the rest of this account.

## What it does

- **Home** (`/`) — what I do, in one screen, with an AI chat widget that answers questions about
  the work and forwards real leads by email
- **Case studies** (`/case-studies`) — the systems behind the products, written for someone
  deciding whether to work with me
- **CV** (`/cv`) — background and contact
- **`/claude`** — how the AI/agent tooling behind this account is actually built (skills,
  quality gates, the secrets vault)
- **`/uslugi/*`** — Polish-market service pages, reachable via the sitemap, deliberately left
  out of the header nav (see the file's own doc-comment for why)

See `docs/ARCHITECTURE.md` for the module map and `docs/adr/` for the decisions behind the stack.

## Stack

React 19 + TypeScript · Vite 7 · TanStack Start/Router (file-based routing + server functions) ·
Tailwind CSS 4 + shadcn/ui (Radix) · Anthropic Claude (`@ai-sdk/anthropic`) for the chat bot and
AI-written lead briefs · Resend for outbound mail · hosted on Vercel, deployed on every push to
`main`.

No database — there is nothing to migrate or back up. The chat bot, lead capture, contact form
and newsletter signup all run as stateless TanStack Start server functions (`src/server/*.server.ts`)
that call Anthropic/Resend directly per request; the newsletter subscriber list is an in-memory
dev stub (see `docs/ARCHITECTURE.md`), not a persisted store.

## Running locally

```bash
npm install
npm run dev
```

```bash
npm run lint
npx tsc -b        # this repo has no project references, but -b still typechecks it fully
npm test          # vitest — pure helpers only, see src/server/*.test.ts
npm run build
```

## Environment variables

Everything is optional in dev — see `.env.example` for the full list with comments. Nothing here
ever reaches the browser; each key is read only inside `src/server/*.server.ts`. Without any of
them the site still runs: the bot returns a graceful "unconfigured" state and mail is only
console-logged (stub transport).

| Variable | Used by | Without it |
|---|---|---|
| `ANTHROPIC_API_KEY` | chat bot, AI lead brief | bot answers "unconfigured"; lead email sends without an AI summary |
| `RESEND_API_KEY` | contact form, newsletter, lead capture | mail is console-logged only (stub transport) |
| `EMAIL_PROVIDER` | selects the transport in `email.server.ts` | defaults to `stub` |
| `RESEND_FROM` | overrides the lead email's From header | falls back to a pre-verified sender, see `docs/adr/` |
| `LEAD_TO` | overrides where lead emails land | defaults to `hello@kamiljan.com` |

## How security is handled

No database means no data at rest to leak, but the AI keys and mail credentials above are real
secrets — they live only in Vercel's environment variables, never in the repo. Every push triggers
build, lint, typecheck, Semgrep static analysis and a Gitleaks secret scan, with a pre-commit hook
blocking credential-shaped strings before they're ever committed.

## Licence

Proprietary. All rights reserved. See `LICENSE`.
