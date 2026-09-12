# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), wersjonowanie: [SemVer](https://semver.org/).
Kazdy PR dopisuje zmiany do [Unreleased]; przy release przenosimy pod numer wersji z data.

## [Unreleased]

### Added

- Pipeline jakosci: CI (build/lint/typecheck/test/semgrep/audit/licencje), Claude review na PR, szablony dokumentacji
- `docs/ARCHITECTURE.md`, `docs/GLOSSARY.md`, `docs/adr/0001-*` and `0002-*`, filled-in `docs/RUNBOOK.md`, `docs/quality/BACKLOG.md`
- `LICENSE`, `.env.example`
- Vitest (`npm test`) + unit tests for the pure helpers in `src/server/lead.server.ts` (`esc`, `br`, `isValidEmail`)

### Changed

- README: corrected the "no backend" claim (the AI chat bot and lead capture run as real server functions calling Anthropic + Resend), documented env vars and testing
- `src/server/lead.server.ts`: magic numbers (transcript/message/name/email length caps) named as constants; `isValidEmail` extracted from an inline regex check
- `src/components/Hero3D.tsx`: `renderer` typed as `THREE.WebGLRenderer | null` instead of `any` (the only hand-written `any` in the repo; `src/routeTree.gen.ts`'s are router-plugin-generated and out of scope), with the two resulting "possibly null" call sites (`tick`'s render loop, `onResize`) guarded instead of suppressed
- Homepage copy (EN + PL) no longer says "I write the code" / "Full-stack": hero sub, the 2024 milestone and the Websites & Products card now match the CV and the chat bot's rule — AI coding agents write the code, Kamil owns the spec, architecture, review and deploy.

### Fixed

- CI `mutation.yml`: Stryker ran from the `npx -p` cache and could not resolve `@stryker-mutator/vitest-runner` nor `typescript` (both resolve from the project), so the first PR that actually exercised the gate (#13) died with `ERR_MODULE_NOT_FOUND`. Now installed into the project (`--no-save`) after `npm ci`.
- About (desktop): the photo's `position: sticky` engages again — `.about` had `overflow: hidden`, which made it a scroll container, so the photo scrolled 1:1 with the page; switched to `overflow: clip`. It holds for as long as the text column is taller than the photo (~108px at 1280px wide).
- Capabilities (desktop ≥769px): the four cards are now a stack of sheets — each one pins under the 120px fixed nav (`position: sticky`, tops 132/144/156/168px) and the next slides over it. Phones keep the accordion.
- `position: sticky` now works site-wide: `overflow-x: hidden` on both `html` and `body` made `body` its own scroll container, so nothing could stick; switched to `overflow-x: clip` (with `hidden` kept as fallback). `.cap` uses `overflow: clip` for the same reason.
- Security: `npm audit fix` (lockfile only, no major bumps) — clears the 5 high advisories (`sharp` libheif GHSA-rgj7-g3m4-5g8c via `miniflare`/`wrangler`/`@cloudflare/vite-plugin`, and `js-yaml`) that turned the CI audit step red. 2 moderate left (`vitest` → needs major 5.x).

### Security

- `vitest` 3.2 → 5.0 (dev only) clears the last 2 moderate advisories (`vitest`, `@vitest/mocker`); `npm audit` now reports 0. vitest 5 needs Node ≥22.12, so CI (`quality.yml`, `mutation.yml`) moves from Node 20 (EOL) to 24.
