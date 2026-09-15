/**
 * Text for matching, not for display: lower case, with Polish (and other Latin)
 * letters folded to plain ASCII, so "Łódź" matches "lodz". "ł" is replaced by
 * hand because Unicode gives it no decomposed form; every other letter loses
 * its combining marks after NFD. Spaces are kept; callers trim if they need to.
 * Used by the command palette's search and the service pages' tag matching.
 */
export function normalizeText(text: string): string {
  return text.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/\p{M}/gu, "");
}
