import { describe, expect, it } from "vitest";
import {
  linksBetween,
  nodeAlpha,
  rng,
  seedNodes,
  spawnNode,
  stepNodes,
  type NetNode,
} from "./portraitNet";

const opts = { w: 400, h: 500, pointer: null, pull: 120, max: 200 };
const still = (x: number, y: number, life = Number.POSITIVE_INFINITY): NetNode => ({
  x,
  y,
  vx: 0,
  vy: 0,
  hub: false,
  life,
});

describe("seedNodes", () => {
  it("places permanent nodes inside the canvas, deterministically per seed", () => {
    const a = seedNodes(40, 400, 500, rng(3));
    expect(a).toEqual(seedNodes(40, 400, 500, rng(3)));
    for (const n of a) {
      expect(n.x).toBeGreaterThanOrEqual(0);
      expect(n.x).toBeLessThanOrEqual(400);
      expect(n.y).toBeGreaterThanOrEqual(0);
      expect(n.y).toBeLessThanOrEqual(500);
      expect(n.life).toBe(Number.POSITIVE_INFINITY);
    }
    expect(a.some((n) => n.hub)).toBe(true);
  });
});

describe("stepNodes", () => {
  it("removes short-lived nodes when their life runs out and keeps background ones", () => {
    const out = stepNodes([still(10, 10, 0.05), still(20, 20)], 0.1, opts);
    expect(out).toHaveLength(1);
    expect(out[0]!.life).toBe(Number.POSITIVE_INFINITY);
  });

  it("pulls a node inside the radius towards the pointer, not one outside it", () => {
    const near = still(100, 100, 5);
    const far = still(390, 490, 5);
    const [n2, f2] = stepNodes([near, far], 0.1, { ...opts, pointer: { x: 150, y: 100 } });
    expect(n2!.x).toBeGreaterThan(100);
    expect(f2!.x).toBe(390);
    expect(f2!.y).toBe(490);
  });

  it("bounces off the edges and never leaves the canvas", () => {
    const n: NetNode = { x: 399, y: 250, vx: 400, vy: 0, hub: false, life: 5 };
    const [out] = stepNodes([n], 0.1, opts);
    expect(out!.x).toBeLessThanOrEqual(400);
    expect(out!.vx).toBeLessThan(0);
  });

  it("keeps background nodes moving so the network never freezes", () => {
    let nodes = [still(200, 250)];
    for (let i = 0; i < 50; i++) nodes = stepNodes(nodes, 0.1, opts);
    expect(Math.hypot(nodes[0]!.vx, nodes[0]!.vy)).toBeGreaterThan(0);
  });

  it("caps the count by dropping the short-lived nodes nearest expiry", () => {
    const bg = [still(1, 1), still(2, 2)];
    const temp = [still(3, 3, 0.5), still(4, 4, 2), still(5, 5, 1)];
    const out = stepNodes([...bg, ...temp], 0.01, { ...opts, max: 3 });
    expect(out).toHaveLength(3);
    expect(out.filter((n) => n.life === Number.POSITIVE_INFINITY)).toHaveLength(2);
    expect(out.find((n) => n.life !== Number.POSITIVE_INFINITY)!.x).toBe(4);
  });

  it("does not change its input", () => {
    const n = still(100, 100, 3);
    stepNodes([n], 0.5, { ...opts, pointer: { x: 120, y: 100 } });
    expect(n).toEqual(still(100, 100, 3));
  });
});

describe("linksBetween", () => {
  it("links only nodes closer than the distance, strongest first", () => {
    const links = linksBetween([still(0, 0), still(10, 0), still(100, 0)], 50);
    expect(links).toEqual([{ a: 0, b: 1, strength: 0.8 }]);
  });

  it("caps links per node", () => {
    const hub = still(50, 50);
    const around = Array.from({ length: 8 }, (_, i) =>
      still(50 + Math.cos(i) * 10, 50 + Math.sin(i) * 10),
    );
    const links = linksBetween([hub, ...around], 30, 3);
    expect(links.filter((l) => l.a === 0 || l.b === 0).length).toBeLessThanOrEqual(3);
  });
});

describe("spawnNode and nodeAlpha", () => {
  it("spawns a short-lived node at the pointer that fades in and out", () => {
    const n = spawnNode({ x: 5, y: 6 }, rng(1));
    expect(n.x).toBe(5);
    expect(n.y).toBe(6);
    expect(n.life).toBe(2.6);
    expect(nodeAlpha(n)).toBe(0);
    expect(nodeAlpha({ ...n, life: 1.5 })).toBe(1);
    expect(nodeAlpha({ ...n, life: 0.25 })).toBeCloseTo(0.25);
    expect(nodeAlpha(still(0, 0))).toBe(1);
  });
});
