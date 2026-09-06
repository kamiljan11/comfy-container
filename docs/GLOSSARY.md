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
