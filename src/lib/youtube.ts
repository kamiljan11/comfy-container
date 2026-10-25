/**
 * YouTube links for blog posts that show one of Kamil's videos (ADR 0009).
 * Pure functions so the URL rules are tested without a browser.
 */

/** A YouTube video id: exactly 11 characters from the URL-safe base64 set. */
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

export function isVideoId(id: string): boolean {
  return VIDEO_ID.test(id);
}

/**
 * The player URL, loaded only after the reader clicks (so autoplay is what
 * they asked for). youtube-nocookie.com is YouTube's privacy-enhanced mode;
 * rel=0 keeps suggestions to the same channel.
 */
export function embedUrl(id: string, start = 0): string {
  if (!isVideoId(id)) throw new Error(`not a YouTube video id: ${id}`);
  const q = new URLSearchParams({ autoplay: "1", rel: "0" });
  if (start > 0) q.set("start", String(Math.floor(start)));
  return `https://www.youtube-nocookie.com/embed/${id}?${q.toString()}`;
}

/** The ordinary watch page, for the "open on YouTube" link. */
export function watchUrl(id: string, start = 0): string {
  if (!isVideoId(id)) throw new Error(`not a YouTube video id: ${id}`);
  const t = start > 0 ? `&t=${Math.floor(start)}s` : "";
  return `https://www.youtube.com/watch?v=${id}${t}`;
}
