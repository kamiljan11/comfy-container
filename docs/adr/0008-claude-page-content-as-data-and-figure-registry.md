# 0008 - /claude: article as typed data, a figure registry and a page map

- Status: accepted
- Date: 2026-10-14

## Context

`src/routes/claude.tsx` had grown to 2,527 lines. It held the types, both language versions of the article
(about 780 lines each) and seven SVG diagrams. Every PG release added an "update X.Y.Z" section at the
top, so the article became a stack of changelogs, and older sections kept numbers that were no longer
true. On 2026-10-14 PG went into maintenance mode, and Kamil asked for the whole article to be rewritten
sentence by sentence, with many more charts, so a reader can navigate without reading a wall of text.

## Decision

- The article is data: `src/content/claude/en.ts` and `pl.ts`, typed by `src/components/claude/types.ts`
  (`Content`, `Section`, `Figures`). A section has a stable English `id` (the same anchor in both
  languages), a `part` (one of seven) and an optional `figure` key.
- Figures are components in `src/components/claude/` (`diagrams.tsx` for the SVG diagrams,
  `charts.tsx` for the HTML/SVG charts). `src/components/claude/Figure.tsx` maps a key to a component in one exhaustive
  `switch`, so a key without a component fails `tsc`.
- Chart arithmetic lives in `src/lib/chartMath.ts` (pure, tested). It throws on data it cannot draw
  honestly instead of drawing a wrong shape.
- `src/content/claude/content.test.ts` holds the two languages together: same ids, parts and figures,
  identical numbers in every chart, and numbers that appear twice on the page in step with each other.
- A page map (a card per part, a link to every section) replaces the collapsed table of contents.
  `PageToc` and `src/lib/pageToc.ts` had no other user and are removed.
- No more "update X.Y.Z" sections. A fact that changes is changed where it is written. Sources and
  recount commands for every number are in `docs/CLAUDE-PAGE-NUMBERS.md`.

## Alternatives

- Keep everything in the route: one 2,500-line file that mixes copy, geometry and page logic. It is
  what made the stale numbers easy to miss.
- Markdown/MDX per section: easier prose editing, but the charts take structured data (counts, tones,
  days), and the parity test needs the numbers as values, not as text inside prose.
- A headless CMS: a paid service and a network dependency for one page that changes a few times a year.
- Keep `PageToc` next to the map: two lists of the same 25 sections on one screen.

## Consequences

- To change a sentence or a number: edit both content files, run the tests. The parity test fails when
  only one language changed a number.
- To add a chart: a type and key in `types.ts`, a component, a `case` in `src/components/claude/Figure.tsx`,
  CSS in `site.css`. `Figure.test.ts` renders every figure in both languages.
- Recurring cost: two content files of about 1,000 lines each to keep in step (the test checks the
  numbers, a person checks the wording) and about 750 lines of chart CSS. No runtime cost and no new
  dependency.
- Rollback: revert the PR (both commits, or the one squash commit); the old route is self-contained.
- Disclosure: the page keeps publishing the fleet's protection counts (repositories under branch protection,
  number of secrets kept out of the AI's reach) as the previous version did. They are counts, never names or
  values, and they are part of what the article demonstrates.
- How we know it worked: the site has no analytics, so success is measured on the content itself. Every
  number on the page has a row in `docs/CLAUDE-PAGE-NUMBERS.md`, the parity test stays green, and the
  next PG release changes sentences in place instead of adding an "update X.Y.Z" section.
