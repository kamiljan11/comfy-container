// Numbers written in /claude copy, and whether one stands in a longer text as a whole number. Used by the
// tests that keep the explanations and the short versions from inventing a figure the article does not state.

/** Number tokens in a text: "1,500", "40 824", "2.3", "75,8" and plain digits. */
export function numbersIn(text: string): string[] {
  return text.match(/\d[\d,. ]*\d|\d/g) ?? [];
}

/**
 * A whole number, not a piece of a longer one: "15" must not pass because the text says "150" or "1.15".
 * Plain index search instead of a RegExp built from the number (Semgrep: non-literal RegExp).
 */
export function hasWholeNumber(text: string, n: string): boolean {
  for (let at = text.indexOf(n); at !== -1; at = text.indexOf(n, at + 1)) {
    const before = text[at - 1] ?? "";
    const after = text.slice(at + n.length, at + n.length + 2);
    // "15" is not a whole number in "150", "1.15" or "15.5"; a full stop or comma that ends a sentence is fine
    if (!/[\d.,]/.test(before) && !/^(\d|[.,]\d)/.test(after)) return true;
  }
  return false;
}

/**
 * Every string in a value, joined: the words a reader sees. Numbers stored as data (a chart's day offsets, bar
 * values) are left out, so a small number in the copy cannot pass because a chart happens to store it.
 */
export function stringsIn(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(stringsIn).join("\n");
  if (value && typeof value === "object") return Object.values(value).map(stringsIn).join("\n");
  return "";
}
