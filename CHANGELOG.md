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

### Fixed

- Capabilities (desktop ≥769px): the four cards are now a stack of sheets — each one pins under the nav (`position: sticky`, tops 90/102/114/126px) and the next slides over it. Phones keep the accordion.
- `position: sticky` now works site-wide: `overflow-x: hidden` on both `html` and `body` made `body` its own scroll container, so nothing could stick; switched to `overflow-x: clip` (with `hidden` kept as fallback). `.cap` uses `overflow: clip` for the same reason.
