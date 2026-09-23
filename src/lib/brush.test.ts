import { describe, expect, it } from "vitest";
import { blobsForDab, dabsBetween, introPath, rng } from "./brush";

describe("dabsBetween", () => {
  it("places dabs at the spacing and ends on the target", () => {
    const dabs = dabsBetween({ x: 0, y: 0 }, { x: 100, y: 0 }, 10);
    expect(dabs).toHaveLength(10);
    expect(dabs.at(-1)).toEqual({ x: 100, y: 0 });
    expect(dabs[0]).toEqual({ x: 10, y: 0 });
  });

  it("gives one dab for a move shorter than the spacing", () => {
    expect(dabsBetween({ x: 0, y: 0 }, { x: 3, y: 4 }, 10)).toEqual([{ x: 3, y: 4 }]);
  });

  it("gives nothing for no movement or a bad spacing", () => {
    expect(dabsBetween({ x: 5, y: 5 }, { x: 5, y: 5 }, 10)).toEqual([]);
    expect(dabsBetween({ x: 0, y: 0 }, { x: 50, y: 0 }, 0)).toEqual([]);
  });
});

describe("blobsForDab", () => {
  it("is deterministic for a seed and stays near the dab", () => {
    const a = blobsForDab({ x: 100, y: 100 }, 40, rng(7));
    const b = blobsForDab({ x: 100, y: 100 }, 40, rng(7));
    expect(a).toEqual(b);
    for (const blob of a) {
      expect(Math.hypot(blob.x - 100, blob.y - 100)).toBeLessThanOrEqual(40 * 0.45 + 1e-9);
      expect(blob.r).toBeGreaterThanOrEqual(22);
      expect(blob.r).toBeLessThanOrEqual(46);
    }
  });

  it("keeps each blob faint and in the teal-to-sky hue range", () => {
    for (const blob of blobsForDab({ x: 0, y: 0 }, 30, rng(1), 50)) {
      expect(blob.alpha).toBeGreaterThan(0);
      expect(blob.alpha).toBeLessThan(0.051);
      expect(blob.hue).toBeGreaterThanOrEqual(180);
      expect(blob.hue).toBeLessThanOrEqual(205);
    }
  });
});

describe("rng", () => {
  it("returns values in [0, 1) and differs by seed", () => {
    const r = rng(42);
    const xs = Array.from({ length: 200 }, r);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...xs)).toBeLessThan(1);
    expect(rng(1)()).not.toBe(rng(2)());
  });
});

describe("introPath", () => {
  it("stays inside the canvas and moves left to right", () => {
    const pts = introPath(400, 500);
    expect(pts).toHaveLength(25);
    for (const p of pts) {
      expect(p.x).toBeGreaterThan(0);
      expect(p.x).toBeLessThan(400);
      expect(p.y).toBeGreaterThan(0);
      expect(p.y).toBeLessThan(500);
    }
    expect(pts[0]!.x).toBeLessThan(pts.at(-1)!.x);
  });
});
