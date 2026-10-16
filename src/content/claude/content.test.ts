import { describe, expect, it } from "vitest";
import type { Content, FigureKey } from "../../components/claude/types";
import { releasesPerDay, stackPercents, timelineSpan } from "../../lib/chartMath";
import { en } from "./en";
import { pl } from "./pl";

// The two languages are one article. Anything a reader could compare across them (anchors, structure,
// the numbers in the charts) must be identical; only the words may differ.

const numbers = (c: Content) => ({
  stats: c.stats.map((s) => s.n),
  tiers: c.figures.tiers.rungs.map((r) => [r.tier, r.cost]),
  rounds: c.figures.rounds.rounds.map((r) => [r.blocking, r.major]),
  matrix: c.figures.matrix.rows.map((r) => [
    r.total.split(" ")[0],
    r.unit ?? "",
    r.segments.map((s) => [s.value, s.tone]),
  ]),
  context: c.figures.context.rows.map((r) => [r.before, r.after]),
  waffle: c.figures.waffle.groups.map((g) => [g.count, g.tone]),
  waffleFacts: c.figures.waffle.facts.map((f) => f.n),
  versions: c.figures.versions.points.map((p) => [p.v, p.day, p.patches ?? 1]),
  ticks: c.figures.versions.ticks.map((k) => k.day),
  cadence: c.figures.cadence.rows.map((r) => [r.dots, r.manual ?? false]),
  exceptions: c.figures.exceptions.levels.map((l) => l.tone),
  merge: c.figures.merge.branches.map((b) => b.auto),
  release: c.figures.release.steps.map((s) => s.tone),
  calib: c.figures.calib.rows.length,
  pipe: [c.figures.pipe.stages.length, c.figures.pipe.gates.length],
  mind: c.figures.mind.branches.map((b) => b.leaves.length),
  loop: c.figures.loop.steps.length,
  review: c.figures.review.finders.length,
});

describe("/claude content", () => {
  it("has the same sections, in the same order and parts, in both languages", () => {
    const shape = (c: Content) => c.sections.map((s) => [s.id, s.part, s.figure ?? null]);
    expect(shape(pl)).toEqual(shape(en));
    expect(pl.parts.length).toBe(en.parts.length);
  });

  it("puts the same numbers in every chart in both languages", () => {
    expect(numbers(pl)).toEqual(numbers(en));
  });

  for (const [name, c] of [
    ["en", en],
    ["pl", pl],
  ] as const) {
    describe(name, () => {
      it("uses unique anchors that are safe in a URL", () => {
        const ids = c.sections.map((s) => s.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const id of ids) expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
        expect(ids).not.toContain("page-map");
        // the part dividers own #part-1 ... #part-N
        for (const id of ids) expect(id).not.toMatch(/^part-\d+$/);
      });

      it("keeps every part non-empty and every section in a real part, in order", () => {
        const parts = c.sections.map((s) => s.part);
        expect([...parts].sort((a, b) => a - b)).toEqual(parts);
        for (let i = 0; i < c.parts.length; i++) expect(parts).toContain(i);
        for (const p of parts) expect(p).toBeLessThan(c.parts.length);
      });

      it("places every figure exactly once", () => {
        const placed = c.sections.flatMap((s) => (s.figure ? [s.figure] : []));
        expect(new Set(placed).size).toBe(placed.length);
        expect([...placed].sort()).toEqual((Object.keys(c.figures) as FigureKey[]).sort());
      });

      it("gives every section something to read", () => {
        for (const s of c.sections) {
          const body = (s.lead ? 1 : 0) + (s.paragraphs?.length ?? 0) + (s.items?.length ?? 0);
          expect(body + (s.figure ? 1 : 0), s.id).toBeGreaterThan(0);
        }
      });

      it("adds up the parts of every stacked bar the way the chart claims", () => {
        for (const row of c.figures.matrix.rows) {
          const sum = row.segments.reduce((a, s) => a + s.value, 0);
          // a row of shares sums to 100; a row of counts sums to the total it prints
          const expected = row.unit === "%" ? 100 : Number(row.total.split(" ")[0]);
          expect(sum, row.title).toBe(expected);
          expect(() => stackPercents(row.segments.map((s) => s.value))).not.toThrow();
        }
      });

      it("keeps the numbers that appear twice on the page in step with each other", () => {
        // found by shape, not position, so reordering the stats cannot pair the wrong numbers
        const only = (re: RegExp) => {
          const hit = c.stats.filter((s) => re.test(s.n) || re.test(s.label));
          expect(hit, String(re)).toHaveLength(1);
          return hit[0];
        };
        const int = (s: string) => {
          expect(s, "a whole number").toMatch(/^\d+$/);
          return Number(s);
        };
        // "31 / 47" in the stats = the waffle's repositories
        const fleet = int(
          only(/^\d+ \/ \d+$/)
            .n.split("/")[1]
            .trim(),
        );
        expect(c.figures.waffle.groups.reduce((a, g) => a + g.count, 0)).toBe(fleet);
        // "15" public versions in 33 days = the releases on the timeline, patch bundles counted one by one
        const span = c.figures.versions.ticks.at(-1)?.day ?? 0;
        const releases = c.figures.versions.points.reduce((a, p) => a + (p.patches ?? 1), 0);
        expect(int(only(new RegExp(`\\b${String(span + 1)}\\b`)).n)).toBe(releases);
        // before/after bars print exactly the values they draw (a number token, not a substring)
        const tokens = (s: string) =>
          (s.match(/\d+(?:[.,]\d+)?/g) ?? []).map((t) => Number(t.replace(",", ".")));
        for (const r of c.figures.context.rows) {
          expect(tokens(r.beforeText), r.beforeText).toContain(r.before);
          expect(tokens(r.afterText), r.afterText).toContain(r.after);
        }
      });

      it("draws the release strip from the content without throwing", () => {
        const span = timelineSpan(c.figures.versions);
        expect(span).toBe(Math.max(...c.figures.versions.ticks.map((k) => k.day)));
        expect(releasesPerDay(c.figures.versions.points, span)).toHaveLength(span + 1);
      });
    });
  }
});
