import { describe, expect, it } from "vitest";
import { barPercent, releasesPerDay, stackPercents, timelineSpan } from "./chartMath";

describe("stackPercents", () => {
  it("sums to exactly 100 when plain rounding would not", () => {
    const p = stackPercents([1, 1, 1]);
    expect(p).toEqual([33.4, 33.3, 33.3]);
    expect(p.reduce((a, b) => a + b, 0)).toBeCloseTo(100, 10);
  });

  it("keeps exact shares exact", () => {
    expect(stackPercents([46, 26, 28])).toEqual([46, 26, 28]);
    expect(stackPercents([37, 25], 0).reduce((a, b) => a + b, 0)).toBe(100);
  });

  it("allows a zero segment next to real ones", () => {
    expect(stackPercents([0, 12, 35])).toEqual([0, 25.5, 74.5]);
  });

  it("refuses data it cannot draw honestly", () => {
    expect(() => stackPercents([0, 0])).toThrow(
      new RangeError("stackPercents: all values are zero"),
    );
    expect(() => stackPercents([3, -1])).toThrow(
      new RangeError("stackPercents: values must be finite and >= 0, got 3, -1"),
    );
    expect(() => stackPercents([Number.NaN])).toThrow(/finite/);
    expect(() => stackPercents([Number.POSITIVE_INFINITY, 1])).toThrow(/finite/);
  });

  it("gives the leftover to the largest remainder, and a tie to the earlier segment", () => {
    // raw 16.67 / 33.33 / 50.0 at 0 decimals -> floors 16/33/50, one unit left, largest remainder wins
    expect(stackPercents([1, 2, 3], 0)).toEqual([17, 33, 50]);
    // raw 33.33 x3 -> one unit left, equal remainders: the earliest segment takes it
    expect(stackPercents([1, 1, 1], 0)).toEqual([34, 33, 33]);
    // raw 14.29 / 85.71: the later, larger remainder wins over position
    expect(stackPercents([1, 6], 0)).toEqual([14, 86]);
  });
});

describe("barPercent", () => {
  it("scales to the max and caps at 100", () => {
    expect(barPercent(5, 10)).toBe(50);
    expect(barPercent(12, 10)).toBe(100);
  });

  it("never draws a positive value as nothing, and zero as something", () => {
    expect(barPercent(0.1, 1000)).toBe(2);
    expect(barPercent(0, 10)).toBe(0);
  });

  it("rejects an empty or negative scale", () => {
    expect(() => barPercent(1, 0)).toThrow(
      new RangeError("barPercent: need value >= 0 and max > 0, got 1 / 0"),
    );
    expect(() => barPercent(-1, 10)).toThrow(/got -1 \/ 10/);
    expect(() => barPercent(Number.NaN, 10)).toThrow(RangeError);
    expect(() => barPercent(1, Number.POSITIVE_INFINITY)).toThrow(RangeError);
    expect(() => barPercent(1, -5)).toThrow(RangeError);
  });

  it("honours a custom minimum and keeps a value equal to the max at 100", () => {
    expect(barPercent(1, 1000, 5)).toBe(5);
    expect(barPercent(10, 10)).toBe(100);
  });
});

describe("releasesPerDay", () => {
  it("counts releases and patch bundles per day", () => {
    const days = releasesPerDay([{ day: 0 }, { day: 2, patches: 6 }, { day: 2 }], 3);
    expect(days).toEqual([1, 0, 7, 0]);
  });

  it("throws on a day outside the span instead of dropping it", () => {
    expect(() => releasesPerDay([{ day: 4 }], 3)).toThrow(
      new RangeError("releasesPerDay: day 4 outside 0..3"),
    );
    expect(() => releasesPerDay([{ day: 1.5 }], 3)).toThrow(RangeError);
    expect(() => releasesPerDay([{ day: -1 }], 3)).toThrow(RangeError);
    // both ends of the span are inside it
    expect(releasesPerDay([{ day: 0 }, { day: 3 }], 3)).toEqual([1, 0, 0, 1]);
  });
});

describe("timelineSpan", () => {
  it("ends the strip at the last tick", () => {
    expect(
      timelineSpan({ ticks: [{ day: 0 }, { day: 32 }], points: [{ day: 0 }, { day: 32 }] }),
    ).toBe(32);
  });

  it("refuses a release after the last tick, or no ticks at all", () => {
    expect(() => timelineSpan({ ticks: [{ day: 32 }], points: [{ day: 33 }] })).toThrow(
      new RangeError("timelineSpan: release on day 33 after the last tick (32)"),
    );
    expect(() => timelineSpan({ ticks: [], points: [] })).toThrow(
      new RangeError("timelineSpan: no ticks"),
    );
    // the latest release decides, not the first; unordered ticks still end at the largest
    expect(() =>
      timelineSpan({ ticks: [{ day: 30 }, { day: 10 }], points: [{ day: 31 }, { day: 0 }] }),
    ).toThrow(/day 31/);
    expect(timelineSpan({ ticks: [{ day: 30 }, { day: 10 }], points: [{ day: 30 }] })).toBe(30);
  });
});
