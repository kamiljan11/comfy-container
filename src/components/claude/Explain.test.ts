import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { en } from "../../content/claude/en";
import { pl } from "../../content/claude/pl";
import { explainIdAt } from "../../lib/explainTarget";
import { hasWholeNumber, numbersIn, stringsIn } from "../../lib/wholeNumber";
import { ExplainedFigure } from "./Explain";
import { Figure } from "./Figure";
import type { Content, FigureKey } from "./types";

// The explanation panel only works if the figure draws an element for every explanation and every element it
// marks has words behind it. Both directions are checked on the server render, in both languages.
const MAX_BODY = 330;
const drawnIds = (c: Content, k: FigureKey) =>
  [
    ...renderToString(createElement(Figure, { k, f: c.figures })).matchAll(
      /data-explain="([^"]+)"/g,
    ),
  ].map((m) => m[1]);

describe.each([
  ["en", en],
  ["pl", pl],
] as const)("explanations (%s)", (_lang, c) => {
  const keys = Object.keys(c.explain) as FigureKey[];

  // every figure, so a new one cannot ship as the only figure a reader cannot ask about
  it("covers every figure on the page", () => {
    expect([...keys].sort()).toEqual(Object.keys(c.figures).sort());
  });

  it.each(keys)("%s: every explanation has an element and every element an explanation", (k) => {
    const ids = (c.explain[k] ?? []).map((e) => e.id);
    expect(new Set(drawnIds(c, k))).toEqual(new Set(ids));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every number in an explanation already stands in the article in the same language", () => {
    const { explain: _e, explainUi: _u, ...article } = c;
    const text = stringsIn(article);
    for (const k of keys) {
      for (const e of c.explain[k] ?? []) {
        for (const n of numbersIn(`${e.term} ${e.body}`)) {
          expect(hasWholeNumber(text, n), `${k}/${e.id}: ${n}`).toBe(true);
        }
      }
    }
  });

  it("terms and bodies are filled and short enough to read under a figure", () => {
    for (const k of keys) {
      for (const e of c.explain[k] ?? []) {
        expect(e.term.trim(), `${k}/${e.id}`).not.toBe("");
        expect(e.body.length, `${k}/${e.id}`).toBeGreaterThan(40);
        expect(e.body.length, `${k}/${e.id}`).toBeLessThanOrEqual(MAX_BODY);
      }
    }
  });
});

it("both languages explain the same elements in the same order", () => {
  const ids = (c: Content) =>
    Object.fromEntries(Object.entries(c.explain).map(([k, v]) => [k, (v ?? []).map((e) => e.id)]));
  expect(ids(pl)).toEqual(ids(en));
});

it("renders the hint, one button per element and no open explanation before any choice", () => {
  const items = en.explain.vault ?? [];
  const html = renderToString(
    createElement(ExplainedFigure, {
      items,
      ui: en.explainUi,
      children: createElement(Figure, { k: "vault", f: en.figures }),
    }),
  );
  expect(html.match(/class="ax-chip"/g)?.length).toBe(items.length);
  expect(html).toContain('aria-pressed="false"');
  expect(html).not.toContain('aria-pressed="true"');
  expect(html).toContain("ax-hint");
});

// Node has no DOM: the pointer path itself (closest() on SVG and HTML elements) is covered by e2e/claude-explain.spec.ts.
it("explainIdAt is null for anything that is not an element", () => {
  expect(explainIdAt(null)).toBeNull();
  expect(explainIdAt({} as EventTarget)).toBeNull();
});
