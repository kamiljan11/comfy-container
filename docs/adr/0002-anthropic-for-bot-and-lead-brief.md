# ADR-0002 — AI provider for the chat bot and lead brief: Anthropic Claude Haiku direct

Date: 2026-08-09 | Status: accepted

**Kontekst:** The `/` chat bot (`src/server/bot.server.ts`) and the AI-written lead brief
(`src/server/lead.server.ts`) need an LLM call. Both went through two provider changes on the
same day, in order: Lovable AI Gateway -> Google Gemini direct -> Anthropic Claude direct.

**Decyzja:** Call Anthropic directly via the Vercel AI SDK (`@ai-sdk/anthropic` 3.x + `ai` 6.x),
model `claude-haiku-4-5` (`generateText`), reading `ANTHROPIC_API_KEY` server-side only.

**Rozwazone alternatywy:**
1. Lovable AI Gateway (`@ai-sdk/openai-compatible` through Lovable's proxy) — rejected first,
   same motivation as ADR-0001: remove the Lovable dependency (commit `e348883`).
2. Google Gemini direct (`@ai-sdk/google`, `GEMINI_API_KEY`, free tier) — shipped for less than a
   day (commit `e348883`), then replaced by this decision (commit `0e942a4`). **[NIEPEWNE]**: the
   commit message documents the *what* (provider swap, version pin `@ai-sdk/anthropic@3.0.14` for
   `ai@6` compatibility, confirmed the system prompt stays server-side and never reaches the
   client bundle) but not an explicit business *why* over Gemini — treat any cost/quality
   rationale as inference, not fact, until confirmed with Kamil.

**Konsekwencje:** Requires a paid `ANTHROPIC_API_KEY` in Vercel (Gemini's free tier is gone).
**[NIEPEWNE]** whether this key is actually set in the live Vercel project — the code degrades
gracefully to an "unconfigured" bot reply and a brief-less lead email if it's absent, so this
can't be confirmed from the repo alone. If it is set, this is a second live paid-Anthropic-API
consumer beyond `mas-warsztat-app` and should be reflected wherever that's tracked.

**Pulapki dla przyszlego siebie:** Don't reintroduce `@ai-sdk/google` here from an old brief or
memory note — the live code is Anthropic. `MODEL` is a literal string in both `bot.server.ts` and
`lead.server.ts`; a future model bump means editing both.
