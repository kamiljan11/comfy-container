import { type ReactNode } from "react";

/**
 * One line drawing per card in "Problems I get called in for" on the homepage.
 *
 * Keyed by the service slug, not by the card's tag: the tag is translated copy
 * and the slug is not, so the drawing stays with its card in both languages.
 * Each one draws the specific failure the card describes rather than a generic
 * symbol, because six generic glyphs in a row say nothing the headings do not.
 *
 * Decorative: every card already has a tag, a heading and a paragraph, so the
 * svg is aria-hidden and adds no second voice for a screen reader. Strokes use
 * currentColor, so the colour comes from .pain-icon in site.css.
 */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** One truth in three places: three panels, each showing a different state. */
function ThreePlaces(): ReactNode {
  return (
    <>
      <rect x="2.2" y="3.4" width="8.6" height="7" rx="1.6" {...S} />
      <rect x="13.2" y="3.4" width="8.6" height="7" rx="1.6" {...S} />
      <rect x="7.7" y="13.6" width="8.6" height="7" rx="1.6" {...S} />
      <circle cx="6.5" cy="6.9" r="1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="6.9" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17.1" r="1" fill="currentColor" stroke="none" />
    </>
  );
}

/** The run stops mid-flow and waits for a hand: a gap, then a pointer. */
function WaitsForAClick(): ReactNode {
  return (
    <>
      <path d="M2.6 7.4h6.2" {...S} />
      <path d="M14.4 7.4h6.8" {...S} />
      <path d="m18.6 4.8 2.6 2.6-2.6 2.6" {...S} />
      <path d="M8.6 12.4v8.4l2.2-2.2 1.5 3.1 2-.9-1.5-3.1h3z" {...S} />
    </>
  );
}

/** The assistant sits beside the loop instead of inside it. */
function BesideTheProcess(): ReactNode {
  return (
    <>
      <path d="M11.4 4.6a6.2 6.2 0 1 1-5.9 8.1" {...S} />
      <path d="m3.6 10.1 1.9 2.9 2.9-1.6" {...S} />
      <rect x="14.6" y="14.2" width="7.2" height="5.4" rx="1.6" {...S} />
      <path d="m17 19.6-.6 2 2.4-2" {...S} />
      <path d="M16.8 16.9h2.8" {...S} />
    </>
  );
}

/** The number on the screen is last week's: a chart behind a clock. */
function LastWeeksNumbers(): ReactNode {
  return (
    <>
      <path d="M2.6 19.2V6.4" {...S} />
      <path d="M2.6 19.2h10.6" {...S} />
      <path d="m4.8 15.6 3-3.4 2.6 2 3.4-4.4" strokeDasharray="2 1.8" {...S} />
      <circle cx="17.6" cy="8.6" r="4.4" {...S} />
      <path d="M17.6 6.3v2.5l1.8 1.1" {...S} />
    </>
  );
}

/** Every box claims the same thing; only one of them was checked. */
function EveryVendorPromises(): ReactNode {
  return (
    <>
      <rect x="2.4" y="3.6" width="8" height="6.4" rx="1.6" {...S} />
      <rect x="2.4" y="13.2" width="8" height="6.4" rx="1.6" {...S} />
      <rect x="13.4" y="3.6" width="8" height="6.4" rx="1.6" {...S} />
      <path d="m14 16.6 2.4 2.5 4.6-5" {...S} />
    </>
  );
}

/** Nobody said what changes, so the gap fills itself in. */
function TeamFearsReplacement(): ReactNode {
  return (
    <>
      <circle cx="7.6" cy="7.4" r="3.2" {...S} />
      <path d="M2.4 19.8a5.2 5.2 0 0 1 10.4 0" {...S} />
      <circle cx="17.4" cy="7.4" r="3.2" strokeDasharray="2.4 2.4" {...S} />
      <path d="M12.2 19.8a5.2 5.2 0 0 1 10.4 0" strokeDasharray="2.4 2.4" {...S} />
    </>
  );
}

const BY_SLUG: Record<string, () => ReactNode> = {
  "systemy-dla-firm": ThreePlaces,
  "automatyzacja-procesow": WaitsForAClick,
  "ai-w-procesach": BesideTheProcess,
  integracje: LastWeeksNumbers,
  "doradztwo-ai": EveryVendorPromises,
  "wdrozenie-i-szkolenie": TeamFearsReplacement,
};

/** The drawing for one card, or nothing when a slug has none. */
export function PainIcon({ slug }: { slug: string }) {
  const Draw = BY_SLUG[slug];
  if (!Draw) return null;
  return (
    <svg
      className="pain-icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <Draw />
    </svg>
  );
}
