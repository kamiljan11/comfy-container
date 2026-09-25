/**
 * Pure maths for the network drawn over the contact portrait
 * (src/components/NetworkPortrait.tsx). It echoes the hero (Hero3D.tsx): the
 * same teal nodes, hubs that pulse and thin links between nodes that are close.
 * No DOM here, so every step is unit-tested.
 *
 * Coordinates are canvas pixels. Nodes drift slowly and bounce off the edges;
 * the pointer pulls nearby nodes towards it and adds short-lived ones, so a
 * stroke across the portrait leaves a brighter trail of connections.
 */

export type Point = { x: number; y: number };

export type NetNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hub: boolean;
  /** seconds left; Infinity for the permanent background nodes */
  life: number;
};

export type Link = { a: number; b: number; strength: number };

/** Hero colours (Hero3D.tsx): hub nodes, plain nodes and links. */
export const NET_COLOURS = { hub: "#1fc9aa", node: "#1a9b84", link: "#1a9b84" } as const;

/** Small deterministic PRNG (mulberry32), so a seed gives the same network. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The permanent background nodes, spread over the canvas; about 1 in 8 is a hub. */
export function seedNodes(count: number, w: number, h: number, rand: () => number): NetNode[] {
  return Array.from({ length: count }, () => ({
    x: rand() * w,
    y: rand() * h,
    vx: (rand() - 0.5) * 8,
    vy: (rand() - 0.5) * 8,
    hub: rand() < 0.125,
    life: Number.POSITIVE_INFINITY,
  }));
}

/** A short-lived node dropped by the pointer, with a small random kick. */
export function spawnNode(p: Point, rand: () => number, life = 2.6): NetNode {
  return {
    x: p.x,
    y: p.y,
    vx: (rand() - 0.5) * 30,
    vy: (rand() - 0.5) * 30,
    hub: rand() < 0.2,
    life,
  };
}

export type StepOptions = {
  w: number;
  h: number;
  pointer: Point | null;
  /** radius (px) inside which the pointer pulls nodes */
  pull: number;
  /** cap on nodes kept, oldest short-lived ones go first */
  max: number;
};

/**
 * Advance the network by `dt` seconds. Returns a new array; the input is not
 * changed. Short-lived nodes lose life and disappear at 0; every node bounces
 * off the canvas edges; nodes inside `pull` of the pointer are drawn towards
 * it, and all speeds are damped so the network settles when the pointer stops.
 */
export function stepNodes(nodes: NetNode[], dt: number, o: StepOptions): NetNode[] {
  const out: NetNode[] = [];
  for (const n of nodes) {
    const life = n.life - dt;
    if (life <= 0) continue;
    let { vx, vy } = n;
    if (o.pointer) {
      const dx = o.pointer.x - n.x;
      const dy = o.pointer.y - n.y;
      const d = Math.hypot(dx, dy);
      if (d > 1 && d < o.pull) {
        const f = (1 - d / o.pull) * 90;
        vx += (dx / d) * f * dt;
        vy += (dy / d) * f * dt;
      }
    }
    const damp = Math.pow(0.35, dt);
    vx *= damp;
    vy *= damp;
    // background nodes keep a minimum drift so the network never freezes
    if (n.life === Number.POSITIVE_INFINITY && Math.hypot(vx, vy) < 2) {
      vx = vx === 0 ? 2 : vx * 1.2;
      vy = vy * 1.2;
    }
    let x = n.x + vx * dt;
    let y = n.y + vy * dt;
    if (x < 0 || x > o.w) {
      vx = -vx;
      x = Math.min(Math.max(x, 0), o.w);
    }
    if (y < 0 || y > o.h) {
      vy = -vy;
      y = Math.min(Math.max(y, 0), o.h);
    }
    out.push({ ...n, x, y, vx, vy, life });
  }
  if (out.length <= o.max) return out;
  // drop the short-lived nodes closest to expiring first, keep the background
  const temp = out
    .map((n, i) => ({ n, i }))
    .filter(({ n }) => n.life !== Number.POSITIVE_INFINITY)
    .sort((a, b) => a.n.life - b.n.life)
    .slice(0, out.length - o.max)
    .map(({ i }) => i);
  const drop = new Set(temp);
  return out.filter((_, i) => !drop.has(i));
}

/**
 * Links between nodes closer than `maxDist`, strongest for the closest, at most
 * `maxLinks` per node so dense clusters do not turn into a solid blob.
 */
export function linksBetween(nodes: NetNode[], maxDist: number, maxLinks = 4): Link[] {
  const count = new Array<number>(nodes.length).fill(0);
  const cand: Link[] = [];
  for (let a = 0; a < nodes.length; a++) {
    for (let b = a + 1; b < nodes.length; b++) {
      const na = nodes[a];
      const nb = nodes[b];
      if (!na || !nb) continue;
      const d = Math.hypot(na.x - nb.x, na.y - nb.y);
      if (d < maxDist) cand.push({ a, b, strength: 1 - d / maxDist });
    }
  }
  cand.sort((x, y) => y.strength - x.strength);
  const out: Link[] = [];
  for (const l of cand) {
    if ((count[l.a] ?? 0) >= maxLinks || (count[l.b] ?? 0) >= maxLinks) continue;
    count[l.a] = (count[l.a] ?? 0) + 1;
    count[l.b] = (count[l.b] ?? 0) + 1;
    out.push(l);
  }
  return out;
}

/** 0..1 opacity of a short-lived node: fades in fast and out over its last second. */
export function nodeAlpha(n: NetNode, lifeAtSpawn = 2.6): number {
  if (n.life === Number.POSITIVE_INFINITY) return 1;
  const age = lifeAtSpawn - n.life;
  return Math.max(0, Math.min(1, age / 0.15, n.life / 1));
}
