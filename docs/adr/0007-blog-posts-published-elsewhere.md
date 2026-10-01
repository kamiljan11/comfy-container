# 0007 - Blog posts that point to an article published elsewhere

- Status: accepted
- Date: 2026-10-01

## Context

Kamil writes articles for toRzeszów.pl (a local news site) and wants each one on
kamiljan.com/blog too, without copying the article (duplicate content, and the
text belongs on the portal). He first asked for the portal page inside an iframe
with our header on top. Checked on 2026-10-01 in a browser on the live article:
torzeszow.pl sends `X-Frame-Options: SAMEORIGIN` (no CSP frame-ancestors), so a
browser refuses to frame it on our domain. Working around that (proxy, copy) is
off the table.

## Decision

- `Post` gets an optional `external: { url, source }`. Such a post is a short
  teaser in our own words (2 to 4 paragraphs and the key tips), not the article.
- /blog keeps one behaviour for every card: the title and "Czytaj" go to our
  teaser page (same internal `Link` as before). The card shows a source label
  (`toRzeszów.pl`) so the reader knows the full text lives elsewhere.
- The teaser page shows a clear button to the full article, opened in a new tab
  (`target="_blank" rel="noopener"`), so the kamiljan.com tab stays open.
- `**bold**` added to the inline syntax (`src/lib/inline.ts`) for key facts.

## Alternatives

- iframe with our header bar: blocked by the portal's headers (see above).
- Card links straight to the portal: one card behaving differently from the
  others, and no page of ours for search or sharing. Rejected.

## Consequences

- `posts.test.ts` checks external posts: https URL, a source name, short body
  (a teaser stays a teaser), and the usual dash and hype-word rules.
- If the portal ever allows framing, this ADR is where to revisit the iframe.

## Revision 2026-10-01: every post has a thumbnail

Kamil asked for a thumbnail on every blog card. `Post.cover` is required
(`src`, `width`, `height`, `alt` in PL and EN), shown at the top of the /blog
card at 1200:630 and linked to the post (out of the tab order; the title link
stays the accessible one). The external post uses the article's own photo
(Pexels 7544758; the Pexels licence allows changes), downloaded from Pexels,
never hotlinked from the portal, with the title drawn on it. claude-autoshutdown
reuses its monitor screenshot. `posts.test.ts` fails on a missing file or alt.
