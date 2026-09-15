/**
 * Opening a collapsed case study from a link (TOC, shared URL, command palette).
 * Kept out of the route so it runs in the node test environment.
 */

/**
 * The study id a hash points at: without the "#", percent-decoded. A malformed
 * escape (a hand-typed "%E0") falls back to the raw text, so a bad URL can't
 * throw inside the page's effect and take the page down.
 */
export function hashToId(hash: string): string {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/**
 * Open the `<details>` with this id and scroll it into view. Returns whether a
 * study was opened; anything that isn't a study (no element, another tag, an
 * empty id) is left alone.
 */
export function openStudy(id: string, doc: Pick<Document, "getElementById">): boolean {
  if (!id) return false;
  const el = doc.getElementById(id);
  if (!el || el.tagName !== "DETAILS") return false;
  (el as HTMLDetailsElement).open = true;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}
