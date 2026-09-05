# ADR-0001 — Hosting: exit Lovable's Publish button for Vercel git-push deploy

Date: 2026-08-09 | Status: accepted

**Kontekst:** Repo was scaffolded and hosted on Lovable (TanStack Start template, Cloudflare
Workers runtime via `wrangler.jsonc`). Deploy required clicking "Publish" in the Lovable UI —
`.lovable/plan.md` (kept in-repo as the original planning doc) states the goal plainly: deploy on
`git push` with no manual click.

**Decyzja:** Host on Vercel. Every push to `main` deploys automatically. Verified live today:
`curl -I https://kamiljan.com` returns `Server: Vercel`.

**Rozwazone alternatywy:** (a) Stay on Lovable, keep clicking Publish — rejected, that was the
problem being solved. (b) Rewrite to Next.js for first-class Vercel support — rejected in
`.lovable/plan.md` itself as "znacznie więcej pracy" (routing/head/i18n/`createServerFn` all
change); kept TanStack Start and only swapped the deploy target.

**Konsekwencje:** No more manual publish step; CI (`.github/workflows/quality.yml`) and this repo's
branch-protection assumptions (PRs, not direct Lovable edits) now apply cleanly. The repo still
carries Cloudflare Workers config (`wrangler.jsonc`, the `cloudflare` build-only plugin in
`vite.config.ts`) inherited from the Lovable scaffold — **[NIEPEWNE]** whether Vercel's build
actually uses it; not verified against Vercel's own project settings.

**Pulapki dla przyszlego siebie:** `migration/STATUS.md` (dated 2026-05-21) and parts of
`.lovable/plan.md` still describe "Lovable auto-deploys to kamiljan.com" — that's the pre-this-ADR
state and is stale. Trust the README and the live response header over those two files.
