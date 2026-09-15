/**
 * Split a diagram label into lines of at most `max` characters, so SVG text
 * (which never wraps on its own) stays inside its box whatever the copy says.
 *
 * A label written as "a + b + c" breaks before a "+" when both halves fit,
 * choosing the most balanced break, so the second line reads "+ b + c".
 * Anything else wraps greedily on spaces. A single word longer than `max`
 * keeps its own line rather than being cut mid-word.
 */
export function wrapLabel(text: string, max: number): string[] {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return [clean];

  const parts = clean.split(" + ");
  let best: [string, string] | null = null;
  for (let i = 1; i < parts.length; i++) {
    const head = parts.slice(0, i).join(" + ");
    const tail = `+ ${parts.slice(i).join(" + ")}`;
    if (head.length > max || tail.length > max) continue;
    const width = Math.max(head.length, tail.length);
    if (!best || width < Math.max(best[0].length, best[1].length)) best = [head, tail];
  }
  if (best) return best;

  const lines: string[] = [];
  let line = "";
  for (const word of clean.split(" ")) {
    if (line && `${line} ${word}`.length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Baselines for a stack of wrapped items: lines of one item sit `lineGap`
 * apart, the next item starts `groupGap` below — so a label wrapped onto two
 * lines still reads as one item and not as two. Returns one array of
 * y-offsets per item, in the order given.
 */
export function stackLines(
  groups: string[][],
  start: number,
  lineGap: number,
  groupGap: number,
): number[][] {
  const out: number[][] = [];
  let y = start;
  groups.forEach((lines, k) => {
    if (k > 0) y += groupGap;
    const row: number[] = [];
    lines.forEach((_, j) => {
      if (j > 0) y += lineGap;
      row.push(y);
    });
    out.push(row);
  });
  return out;
}
