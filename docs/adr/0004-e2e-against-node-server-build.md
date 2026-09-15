# 0004 — E2E tests run against a Node-server build of the site

- Status: accepted
- Date: 2026-09-15
- Context PR: #39

## Context

The required CI check "E2E smoke (Playwright)" only runs when a Playwright config exists, and
the repo had none, so it passed on every PR without running a test. Running the tests needs a
server that serves the real app.

The production build goes through `@lovable.dev/vite-tanstack-config`, whose Cloudflare plugin
makes nitro write a Workers bundle to `.output/` (Vercel runs its own build on deploy). Two
obvious ways to serve it locally both fail:

- `vite preview` exits with `ERR_MODULE_NOT_FOUND ... dist/server/server.js`: TanStack Start's
  preview plugin expects a different output layout.
- `vite dev` re-optimises dependencies on the first request and reloads the page. In this repo
  that has produced "Invalid hook call" console errors, which would make the smoke test (zero
  console errors on the home page) flaky.

## Decision

Playwright's `webServer` builds the app with `NITRO_PRESET=node-server` and serves
`node .output/server/index.mjs` on port 4173 (`playwright.config.ts`). The app code and the Vite
pipeline are the same as in production; only nitro's output target differs.

The suite runs on one worker with no retries. On parallel workers the home page (a Three.js
scene) made the home-page tests hit 30 s teardown timeouts in 6 of 12 local runs; on one worker
12 of 12 passed. No API keys are needed: the chat bot calls its server function only when a
visitor sends a message, and no test does.

## Consequences

- Tests exercise a production build: SSR, hydration, minified client code, real routing.
- The build is not byte-identical to what Vercel serves (different nitro preset), so problems
  specific to the Vercel runtime are not covered. The production check stays
  `curl -I https://kamiljan.com` after deploy (see `docs/RUNBOOK.md`).
- The E2E job builds the site itself, about a minute on CI, on top of the Build job.
- After a local E2E run, `.output/` holds the Node-server build; `npm run build` rewrites it.

## Alternatives rejected

- `vite preview`: fails on this build (see Context).
- `vite dev`: dependency re-optimisation makes the console-error assertion flaky.
- `wrangler dev` on the Cloudflare output: a new, heavy dependency, for an output Vercel does
  not run anyway.
- Testing each Vercel preview URL: couples CI to Vercel's deploy timing and deployment
  protection, and is slower.
