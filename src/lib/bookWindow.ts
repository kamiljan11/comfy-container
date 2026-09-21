/**
 * Which page indexes (0-based) the flipbook should give an image source:
 * the page being read, a few before it and a few after it, clamped to the
 * book. Everything else stays empty until the reader gets close, so opening
 * a 199-page book downloads about ten images, not 199.
 */
export const WINDOW = 4;

export function pagesToLoad(current: number, total: number, window = WINDOW): Set<number> {
  const pages = new Set<number>();
  if (total <= 0) return pages;
  const at = Math.min(Math.max(current, 0), total - 1);
  for (let i = at - window; i <= at + window; i++) {
    if (i >= 0 && i < total) pages.add(i);
  }
  return pages;
}
