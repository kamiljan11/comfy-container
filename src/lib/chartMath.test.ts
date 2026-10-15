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
    expect(() => stackPercents([0, 0])).toThrow(RangeError);
    expect(() => stackPercents([3, -1])).toThrow(RangeError);
    expect(() => stackPercents([Number.NaN])).toThrow(RangeError);
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
    expect(() => barPercent(1, 0)).toThrow(RangeError);
    expect(() => barPercent(-1, 10)).toThrow(RangeError);
  });
});

describe("releasesPerDay", () => {
  it("counts releases and patch bundles per day", () => {
    const days = releasesPerDay([{ day: 0 }, { day: 2, patches: 6 }, { day: 2 }], 3);
    expect(days).toEqual([1, 0, 7, 0]);
  });

  it("throws on a day outside the span instead of dropping it", () => {
    expect(() => releasesPerDay([{ day: 4 }], 3)).toThrow(RangeError);
    expect(() => releasesPerDay([{ day: 1.5 }], 3)).toThrow(RangeError);
  });
});

describe("timelineSpan", () => {
  it("ends the strip at the last tick", () => {
    expect(
      timelineSpan({ ticks: [{ day: 0 }, { day: 32 }], points: [{ day: 0 }, { day: 32 }] }),
    ).toBe(32);
  });

  it("refuses a release after the last tick, or no ticks at all", () => {
    expect(() => timelineSpan({ ticks: [{ day: 32 }], points: [{ day: 33 }] })).toThrow(RangeError);
    expect(() => timelineSpan({ ticks: [], points: [] })).toThrow(RangeError);
  });
});
