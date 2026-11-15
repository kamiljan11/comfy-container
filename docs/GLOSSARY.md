# GLOSSARY — domain terms

<!-- Names in code MUST come from here. A new term in a diff = a new row here. -->

This is a single-tenant personal site, not a multi-tenant SaaS — there's no `org`/`tenant`
concept. The terms below are the ones that actually recur in this codebase.

| Term in code | Meaning |
|---|---|
| `lead` | A visitor who left contact info (name/email/message) through the chat's "message Kamil" form or the contact form. Always ends up as one email to `hello@kamiljan.com`. |
| `brief` | The 2-3 sentence AI-generated summary of a lead (who they are, what they want, urgency), produced by `buildBrief()` in `src/server/lead.server.ts`. Best-effort — if Anthropic is unconfigured or errors, the lead still sends without one. |
| `transcript` | The chat history array (`LeadMessage[]`) attached to a lead, so the brief and the email have conversation context, not just the last message. |
| `honeypot` (`hp` field) | A hidden form field real visitors never fill. If it's non-empty, `sendLead()` silently accepts and drops the submission — a bot filled it. |
| `transport` | The active implementation behind `EmailTransport` in `email.server.ts` — either `stub` (console-log only, the default) or `resend` (real send via the Resend API). |
| `case study` | One entry in `src/data/caseStudies.ts` — a full write-up of a system Kamil built, aimed at a recruiter deciding whether to hire him. |
| `service` / `usluga` | One entry in `src/data/services.ts`, rendered at `/uslugi/<slug>` — a Polish-market service pitch page, intentionally not linked from the header nav (see the route file's own doc-comment). |
| `SYSTEM` prompt | The single string constant in `bot.server.ts` that is the chat bot's entire knowledge base. Closed-world by design: if a fact isn't in it, the bot says so rather than inferring. |
| `ssrDefault` | The language (`en`/`pl`) the server renders before the client can resolve the visitor's real preference from `?lang=`/`localStorage`/browser locale. See `useLang.ts`. |
| stub / dead-letter route | Anything wired to log to the console instead of a real provider — currently the default for mail (no `RESEND_API_KEY`) and for newsletter subscriber storage (always in-memory, KV is commented out). |
| `PG` | Coding Higher Mind (from the Polish "Prompt Guard"): Kamil's quality system for AI-assisted work, described on `/claude`. Its source is the public repo `kamiljan11/coding-higher-mind`. |
| `part` | One of the seven chapters of the `/claude` article (`Section.part`, 0-6). Each part opens with a divider (`#part-N`) and has a card on the page map. |
| `faq` | Questions and answers in a `/claude` section (`Section.faq`: question = `label`, answer = `body`), shown folded by `Faq.tsx`. Only the last part, "In short, and questions" (`tell.en.ts`, `tell.pl.ts`), uses it. |
| `figure` / `FigureKey` | A chart or diagram placed in one `/claude` section, picked by key in `src/components/claude/Figure.tsx`. Its data lives in `Content.figures`. |
| `explain panel` | Panel under a `/claude` figure (`src/components/claude/Explain.tsx`) that explains the element marked `data-explain` the reader points at or taps; texts in `src/content/claude/explain.{en,pl}.ts`. Not a `part` (chapter). |
| page map | The overview at the top of `/claude` (`#page-map`): a card per part with a link to every section. It replaced the old collapsed table of contents. |
| scar | In PG: a past failure written down in `pg/cases.md` together with the check that now catches it. |
| gate | In PG: an automatic check that can stop a step (a hook, a pre-commit check, CI). |
| seal | In PG: checksums over the control layer (hooks, git gates, settings, gate tools); a change made outside an opened window shows up at the next session start and in the weekly audit. Drawn in the "Guarding the guards" figure on `/claude`. |
| status word | In PG: the last word of every report, VERIFIED (proof quoted), UNVERIFIED (what is missing) or FAILED (what happened). |
| tier (T0-T3) | In PG: the risk level of a change, taken from its diff. It sets how many AI reviewers look at it (`pg.tier_floor` in `CLAUDE.md`). |
