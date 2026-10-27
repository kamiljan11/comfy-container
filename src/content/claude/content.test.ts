import { describe, expect, it } from "vitest";
import type { Content, FigureKey } from "../../components/claude/types";
import { releasesPerDay, stackPercents, timelineSpan } from "../../lib/chartMath";
import { hasWholeNumber, numbersIn, stringsIn } from "../../lib/wholeNumber";
import { en } from "./en";
import { pl } from "./pl";
import { tellSectionsEn } from "./tell.en";

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
  ideas: c.figures.ideas.rows.length,
  guards: c.figures.guards.guards.length,
  install: c.figures.install.steps.map((s) => s.tone),
});

// The page map's lead names the number of parts in words; this keeps the word in step with `parts`.
const PART_WORDS = {
  en: { 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine" },
  pl: { 6: "Sześć", 7: "Siedem", 8: "Osiem", 9: "Dziewięć" },
} as const;

describe("/claude content", () => {
  it("has the same sections, in the same order and parts, in both languages", () => {
    const shape = (c: Content) => c.sections.map((s) => [s.id, s.part, s.figure ?? null]);
    expect(shape(pl)).toEqual(shape(en));
    expect(pl.parts.length).toBe(en.parts.length);
  });

  it("asks the same number of questions in every section in both languages", () => {
    const faq = (c: Content) =>
      c.sections.map((s) => [s.id, s.faq?.length ?? 0, s.items?.length ?? 0]);
    expect(faq(pl)).toEqual(faq(en));
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

      it("names the number of parts in the page map's lead", () => {
        const words: Record<number, string> = PART_WORDS[name];
        expect(words[c.parts.length], `no word for ${String(c.parts.length)} parts`).toBeDefined();
        expect(c.mapLead.startsWith(`${words[c.parts.length]} `), c.mapLead).toBe(true);
      });

      it("draws the idea, guard and install figures only with numbers the article states", () => {
        // these three retell a section in a picture; a number found only in the picture has no source
        const { figures, explain: _e, explainUi: _u, ...rest } = c;
        const article = stringsIn(rest);
        const drawn = stringsIn([figures.ideas, figures.guards, figures.install]);
        const found = numbersIn(drawn);
        expect(found.length).toBeGreaterThan(0);
        for (const n of found) expect(hasWholeNumber(article, n), n).toBe(true);
      });

      it("places every figure exactly once", () => {
        const placed = c.sections.flatMap((s) => (s.figure ? [s.figure] : []));
        expect(new Set(placed).size).toBe(placed.length);
        expect([...placed].sort()).toEqual((Object.keys(c.figures) as FigureKey[]).sort());
      });

      it("gives every section something to read", () => {
        for (const s of c.sections) {
          const body =
            (s.lead ? 1 : 0) +
            (s.paragraphs?.length ?? 0) +
            (s.items?.length ?? 0) +
            (s.faq?.length ?? 0);
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

      it("tells the short versions and answers only with numbers the article already states", () => {
        // the last part retells the article; a number that stands only there would be a second, unchecked source
        const tell = new Set(tellSectionsEn.map((s) => s.id));
        // the map lead and the part's own blurb point at the last part, so they are not the article either
        const tellPart = tellSectionsEn[0].part;
        const { explain: _e, explainUi: _u, mapLead: _m, parts, sections, ...rest } = c;
        const article = stringsIn({
          ...rest,
          parts: parts.filter((_, i) => i !== tellPart),
          sections: sections.filter((s) => !tell.has(s.id)),
        });
        const told = sections.filter((s) => tell.has(s.id));
        expect(told.length, "the short versions are in this language too").toBe(tell.size);
        for (const s of told) {
          const text = [s.title, s.lead ?? "", ...(s.paragraphs ?? [])]
            .concat((s.items ?? []).concat(s.faq ?? []).flatMap((i) => [i.label, i.body]))
            .join(" ");
          for (const n of numbersIn(text)) {
            expect(hasWholeNumber(article, n), `${s.id}: ${n}`).toBe(true);
          }
        }
      });

      it("keeps every question unique and every answer short enough to read on a phone", () => {
        const faq = c.sections.flatMap((s) => s.faq ?? []);
        expect(faq.length).toBe(25);
        expect(new Set(faq.map((q) => q.label)).size).toBe(faq.length);
        for (const q of faq) {
          expect(q.label.trim().endsWith("?"), q.label).toBe(true);
          expect(q.body.length, q.label).toBeLessThanOrEqual(480);
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
