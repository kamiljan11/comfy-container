/**
 * Arithmetic behind the /claude charts. Pure, so the shapes on the page can be tested without a browser:
 * a stacked bar whose segments add up to 99.9 % or a bar that vanishes at a small value is a chart that lies.
 */

/**
 * Percent widths for the segments of one stacked bar, summing to exactly 100.
 * Largest-remainder rounding to `decimals` places, so rounding never leaves a gap or an overflow at the end.
 * Negative or non-finite values are a caller bug and throw; an all-zero bar has no honest widths and throws too.
 */
export function stackPercents(values: readonly number[], decimals = 1): number[] {
  if (values.some((v) => !Number.isFinite(v) || v < 0)) {
    throw new RangeError(`stackPercents: values must be finite and >= 0, got ${values.join(", ")}`);
  }
  const total = values.reduce((a, b) => a + b, 0);
  if (total === 0) throw new RangeError("stackPercents: all values are zero");

  const unit = 10 ** decimals;
  const raw = values.map((v) => (v / total) * 100 * unit);
  const floors = raw.map(Math.floor);
  let left = 100 * unit - floors.reduce((a, b) => a + b, 0);
  // hand the leftover units to the largest remainders; ties go to the earlier segment
  const order = raw
    .map((r, i) => ({ i, rem: r - Math.floor(r) }))
    .sort((a, b) => b.rem - a.rem || a.i - b.i);
  for (const { i } of order) {
    if (left <= 0) break;
    floors[i] += 1;
    left -= 1;
  }
  return floors.map((f) => f / unit);
}

/**
 * Width of a bar in percent of the track, scaled to `max`. A positive value never drops below `minVisible`
 * percent (a real value drawn as nothing reads as zero); zero stays zero.
 */
export function barPercent(value: number, max: number, minVisible = 2): number {
  if (!Number.isFinite(value) || !Number.isFinite(max) || value < 0 || max <= 0) {
    throw new RangeError(`barPercent: need value >= 0 and max > 0, got ${value} / ${max}`);
  }
  if (value === 0) return 0;
  return Math.min(100, Math.max(minVisible, (value / max) * 100));
}

/**
 * Releases per day across `span` days (day 0 = the first release), for the calendar strip above the
 * version timeline. A point outside the span is a data error and throws instead of silently disappearing.
 */
export function releasesPerDay(
  points: readonly { day: number; patches?: number }[],
  span: number,
): number[] {
  const days = Array.from({ length: span + 1 }, () => 0);
  for (const p of points) {
    if (!Number.isInteger(p.day) || p.day < 0 || p.day > span) {
      throw new RangeError(`releasesPerDay: day ${p.day} outside 0..${span}`);
    }
    days[p.day] += p.patches ?? 1;
  }
  return days;
}

/**
 * Last day of the release-history strip: the last tick. Every release must fall inside it, so a release added
 * without moving the last tick fails here, in the content test, instead of while the page renders.
 */
export function timelineSpan(t: {
  ticks: readonly { day: number }[];
  points: readonly { day: number }[];
}): number {
  if (t.ticks.length === 0) throw new RangeError("timelineSpan: no ticks");
  const span = Math.max(...t.ticks.map((k) => k.day));
  const last = Math.max(...t.points.map((p) => p.day));
  if (last > span)
    throw new RangeError(
      `timelineSpan: release on day ${String(last)} after the last tick (${String(span)})`,
    );
  return span;
}
