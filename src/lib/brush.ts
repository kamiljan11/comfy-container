/**
 * Pure maths for the watercolour brush on the contact portrait
 * (src/components/SketchPortrait.tsx). No DOM here, so it is unit-tested.
 *
 * A stroke is a list of dabs: between two pointer positions we place dabs at
 * a fixed spacing, and every dab is drawn as a few soft, slightly offset blobs
 * so the edge looks like pigment spreading in water rather than a round stamp.
 */

export type Point = { x: number; y: number };
export type Blob = { x: number; y: number; r: number; alpha: number; hue: number };

/** Dabs from `from` to `to`, every `spacing` px, excluding `from` itself. */
export function dabsBetween(from: Point, to: Point, spacing: number): Point[] {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  if (dist === 0 || spacing <= 0) return [];
  const n = Math.max(1, Math.floor(dist / spacing));
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / n;
    return { x: from.x + dx * t, y: from.y + dy * t };
  });
}

/** Small deterministic PRNG (mulberry32), so a seed gives the same wash. */
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

/**
 * The blobs for one dab. `size` is the brush radius in px; hues stay in the
 * site's teal-to-sky range (180-205) so the wash matches --teal / --teal-2.
 */
export function blobsForDab(p: Point, size: number, rand: () => number, count = 4): Blob[] {
  return Array.from({ length: count }, () => {
    const angle = rand() * Math.PI * 2;
    const offset = rand() * size * 0.45;
    return {
      x: p.x + Math.cos(angle) * offset,
      y: p.y + Math.sin(angle) * offset,
      r: size * (0.55 + rand() * 0.6),
      // faint on purpose: pigment builds up where strokes overlap, like watercolour
      alpha: 0.018 + rand() * 0.032,
      hue: 180 + rand() * 25,
    };
  });
}

/**
 * The stroke painted once when the section comes into view: a gentle S-curve
 * across the chest, in fractions of the canvas size.
 */
export function introPath(width: number, height: number, steps = 24): Point[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    return {
      x: width * (0.18 + 0.64 * t),
      y: height * (0.42 + 0.12 * Math.sin(t * Math.PI * 1.6) + 0.1 * t),
    };
  });
}
