import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { en } from "../../content/claude/en";
import { pl } from "../../content/claude/pl";
import { Figure } from "./Figure";
import type { FigureKey } from "./types";

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
        it(`renders "${k}" with a label for screen readers`, () => {
          const html = renderToString(createElement(Figure, { k, f: c.figures }));
          expect(html.length).toBeGreaterThan(200);
          expect(html).toMatch(/aria-label="[^"]{10,}"|<figcaption|<table/);
        });
      }

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
