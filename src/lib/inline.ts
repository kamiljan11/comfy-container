/**
 * The small inline syntax blog text may use: [label](https://…) for a link
 * and `code` for code. Pure: text in, segments out; the post page renders
 * them. Only http(s) and site-relative links become anchors, so a typo like
 * [x](javascript:…) stays plain text instead of turning into a live link.
 */

export type Segment =
  | { kind: "text"; text: string }
  | { kind: "code"; text: string }
  | { kind: "link"; text: string; href: string };

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;
const SAFE_HREF = /^(https?:\/\/|\/)/;

export function inlineSegments(input: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of input.matchAll(TOKEN)) {
    const at = m.index;
    if (at > last) out.push({ kind: "text", text: input.slice(last, at) });
    const [whole, label, href, code] = m;
    if (code !== undefined) out.push({ kind: "code", text: code });
    else if (label !== undefined && href !== undefined && SAFE_HREF.test(href))
      out.push({ kind: "link", text: label, href });
    else out.push({ kind: "text", text: whole });
    last = at + whole.length;
  }
  if (last < input.length) out.push({ kind: "text", text: input.slice(last) });
  return out;
}
