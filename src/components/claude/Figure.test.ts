import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { en } from "../../content/claude/en";
import { pl } from "../../content/claude/pl";
import { Figure } from "./Figure";
import type { FigureKey } from "./types";

// the same escaping React applies to text and attributes in renderToString
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

// Every figure the article places must render from its content in both languages. The content test
// checks the numbers; this one catches a chart that throws or draws nothing for the data it is given.

const KEYS: FigureKey[] = [
  "arch",
  "mind",
  "pipe",
  "tiers",
  "exceptions",
  "merge",
  "review",
  "rounds",
  "loop",
  "matrix",
  "release",
  "context",
  "calib",
  "limits",
  "vault",
  "cadence",
  "waffle",
  "versions",
];

describe("/claude figures", () => {
  for (const [name, c] of [
    ["en", en],
    ["pl", pl],
  ] as const) {
    describe(name, () => {
      it("lists every figure the article places", () => {
        const placed = c.sections.flatMap((s) => (s.figure ? [s.figure] : []));
        expect([...placed].sort()).toEqual([...KEYS].sort());
      });

      for (const k of KEYS) {
        it(`renders "${k}" as its own figure, with its caption`, () => {
          const html = renderToString(createElement(Figure, { k, f: c.figures }));
          // the caption is unique per figure, so a key that renders another figure fails here
          expect(html).toContain(escapeHtml(c.figures[k].caption));
          // every SVG on the page is a labelled image, never an unnamed drawing
          const svgs = html.match(/<svg[^>]*>/g) ?? [];
          for (const svg of svgs) expect(svg, k).toMatch(/role="img"[^>]*aria-label="[^"]{10,}"/);
        });
      }

      // Geometry (bar widths, coordinates, wrapped labels) is checked by a snapshot of the rendered markup:
      // a change in a chart's arithmetic shows up here as a diff to review, not silently on the page.
      // After an intended change to content or layout: `npx vitest run -u` and review the .snap diff.
      it("draws every figure exactly as last reviewed", () => {
        for (const k of KEYS) {
          expect(renderToString(createElement(Figure, { k, f: c.figures }))).toMatchSnapshot(k);
        }
      });

      it("gives every figure a caption of its own", () => {
        const captions = KEYS.map((k) => c.figures[k].caption);
        expect(new Set(captions).size).toBe(KEYS.length);
      });

      // The SVG diagrams lay out a fixed number of slots; more or fewer items overlap or leave gaps.
      it("gives the fixed-layout diagrams the number of items they are drawn for", () => {
        const f = c.figures;
        expect(f.mind.branches).toHaveLength(8);
        expect(f.pipe.gates).toHaveLength(f.pipe.stages.length);
        expect(f.loop.steps).toHaveLength(6);
        expect(f.review.finders).toHaveLength(4);
      });

      it("prints the values of the review rounds for screen readers, not only as SVG text", () => {
        const html = renderToString(createElement(Figure, { k: "rounds", f: c.figures }));
        for (const r of c.figures.rounds.rounds) {
          expect(html).toContain(`${r.label}: ${String(r.blocking)}`);
        }
      });
    });
  }
});
