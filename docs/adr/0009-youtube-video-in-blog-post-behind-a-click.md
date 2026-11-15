# 0009 - YouTube video in a blog post, loaded only after a click

- Status: accepted
- Date: 2026-10-25

## Context

Kamil publishes videos on his YouTube channel and wants them on kamiljan.com/blog.
The blog had no way to show a video. A plain YouTube iframe contacts Google on
page load (cookies, IP, ~1 MB of player script) for every reader, even those who
never press play, and the privacy policy says the site uses no third-party cookies.

## Decision

- New block `{ t: "youtube", id, title, poster }` in `src/data/posts.ts`, rendered
  by `src/components/YouTubeFacade.tsx`.
- Before the click it is our own poster (a local copy of the video's thumbnail
  under `public/blog/<slug>/`) inside a `<button>`; no request goes to YouTube.
- The click swaps in the `youtube-nocookie.com` player with `autoplay=1&rel=0`.
- URLs are built only from a validated 11-character id (`src/lib/youtube.ts`).
- The privacy policy names YouTube (after a click) under technical data and providers.

## Alternatives considered

- Plain iframe: simplest, but third-party requests on load for every reader.
- Link out only (like ADR 0007): no in-page playback, which is the point of the post.
- `lite-youtube-embed` package: same idea, but a new dependency for ~40 lines of code.

## Consequences

- Poster must be refreshed by hand if the YouTube thumbnail changes.
- Tests check the id, the title and that the poster exists on disk.
- Changing the player provider (or loading it before the click) means updating the privacy policy (`src/data/privacy.ts`) in the same PR.
