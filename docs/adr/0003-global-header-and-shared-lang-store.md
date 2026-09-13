# 0003 — One header for every route, one language store for the whole site

- Status: accepted
- Date: 2026-09-13
- Context PR: #23

## Context

The menu was markup inside `src/routes/index.tsx`. Every other route (`/cv`, `/claude`,
`/case-studies`, `/uslugi/*`) rendered its own bar with a "← kamiljan.com" link and, on some,
its own language toggle. So the menu disappeared the moment a visitor left the homepage, and
the site was about to grow more pages (`/kontakt`, `/blog`, areas, `/o-mnie`) in the
letsautomate.pl-style restructure Kamil asked for.

Language was a `useState` copy in each route. With a header living outside the page, a toggle
in the header would have flipped its own flag without changing a word of the page under it.

## Decision

1. `SiteHeader` is mounted once in `src/routes/__root.tsx` and every route drops its own bar.
   Dropdowns open on click (not hover), close on Escape / outside click / navigation; below
   900px the same items become a sheet with accordions. Internal links use TanStack `<Link>`
   so navigation stays client-side and the header does not re-mount.
2. `useLang` is a single module-level store read through `useSyncExternalStore`. The server
   snapshot is the per-route `ssrDefault` (`ssrLangFor(pathname)` for the header, the literal
   the page passes), so server HTML and the first hydration render agree; the client then
   switches to the reader's choice (URL → localStorage → browser). A language that arrived
   via `?lang=` is saved, so it survives a plain navigation.

## Alternatives rejected

- **Copy the new nav into every route.** That is the pattern that caused the vanishing menu;
  the next page added would forget it again.
- **React context provider in `__root` for the language.** Works, but every consumer re-renders
  through the provider and the value still needs the same URL/storage resolution; the external
  store gives the same sharing with less plumbing and a correct server snapshot per caller.
- **Hover dropdowns.** Kamil asked for click; hover also behaves differently for mouse,
  keyboard and touch.

## Consequences

- One place to change navigation. New routes get the header for free.
- The module-level `current` is only ever touched in the browser (React calls the server
  snapshot during SSR), so no state leaks between requests — keep it that way: do not call
  `snapshot()` outside render/effects.
- The per-route `ssrDefault` must match `ssrLangFor` for that path, or the header and the page
  hydrate in different languages. Adding a Polish-first route means adding it to `ssrLangFor`.
