/**
 * The table of contents for a long page, derived from the page itself.
 *
 * /claude is 16 screens on a phone and carries 15 sections whose headings come
 * from a dozen separate copy fields in two languages. A hand-kept list would
 * drift away from the page on the first edit, so the entries are read from the
 * rendered headings instead. Pure functions here; the component only calls them.
 */

export type TocEntry = { id: string; label: string };

/**
 * An id for a heading that has none: its text, lowercased, diacritics folded
 * (so a Polish heading yields an ASCII fragment), everything else a hyphen.
 * `index` keeps two identically named headings apart.
 */
export function headingId(text: string, index: number): string {
  const slug = text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/gi, "l")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug ? `${slug}-${String(index + 1)}` : `section-${String(index + 1)}`;
}

/**
 * Every heading in `root` becomes an entry, and one that has no id gets the
 * generated one written back, because the links point at it. Headings with no
 * text (a decorative one, a heading built only from an icon) are skipped: an
 * entry with an empty label is a dead row in the list.
 */
export function collectToc(root: ParentNode, selector = "h2"): TocEntry[] {
  const entries: TocEntry[] = [];
  const headings = [...root.querySelectorAll(selector)];
  for (const [i, heading] of headings.entries()) {
    const label = (heading.textContent ?? "").trim();
    if (!label) continue;
    const id = heading.id || headingId(label, i);
    if (!heading.id) heading.id = id;
    entries.push({ id, label });
  }
  return entries;
}
