/**
 * The table of contents for a long page, derived from the page itself.
 *
 * /claude is 16 screens on a phone and carries 15 sections whose headings come
 * from a dozen separate copy fields in two languages. A hand-kept list would
 * drift away from the page on the first edit, so the entries are read from the
 * rendered headings instead. Pure functions here; the component only calls them.
 */

import { normalizeText } from "./text";

export type TocEntry = { id: string; label: string };

/** Marks an id this module generated, so a later pass may replace it. */
const OWNED = "data-toc-id";

/**
 * An id for a heading that has none: its text, lowercased, diacritics folded
 * (so a Polish heading yields an ASCII fragment), everything else a hyphen.
 * `index` keeps two identically named headings apart.
 */
export function headingId(text: string, index: number): string {
  const slug = normalizeText(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug ? `${slug}-${String(index + 1)}` : `section-${String(index + 1)}`;
}

/** `want`, or the first free variant of it, so no two elements share an id. */
function freeId(want: string, taken: Set<string>): string {
  if (!taken.has(want)) return want;
  for (let n = 2; ; n++) {
    const candidate = `${want}-${String(n)}`;
    if (!taken.has(candidate)) return candidate;
  }
}

/**
 * Every heading in `root` becomes an entry, and one that has no id of its own
 * gets a generated one written back, because the links point at it.
 *
 * Called again after the language switches, it regenerates the ids it made
 * itself (a Polish heading under an English fragment is a lie in the address
 * bar) while leaving ids the page author wrote alone, and it never hands out an
 * id another element already uses. Headings with no text are skipped: an entry
 * with an empty label is a dead row in the list.
 */
export function collectToc(root: ParentNode, selector = "h2"): TocEntry[] {
  const headings = [...root.querySelectorAll(selector)];
  const owned = new Set(headings.map((h) => h.getAttribute(OWNED)).filter(Boolean));
  // every id on the page except the ones this module handed out: those are free
  // to be replaced by the ids for the language now on screen
  const taken = new Set(
    [...root.querySelectorAll("[id]")].map((e) => e.id).filter((id) => id && !owned.has(id)),
  );

  const entries: TocEntry[] = [];
  for (const [i, heading] of headings.entries()) {
    const label = (heading.textContent ?? "").trim();
    if (!label) continue;
    const ours = heading.getAttribute(OWNED);
    const authored = heading.id && heading.id !== ours ? heading.id : "";
    const id = authored || freeId(headingId(label, i), taken);
    if (!authored) {
      heading.id = id;
      heading.setAttribute(OWNED, id);
    }
    taken.add(id);
    entries.push({ id, label });
  }
  return entries;
}
