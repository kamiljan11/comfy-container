# 0006 — Contact portrait as a sketch the visitor paints

- Status: accepted
- Date: 2026-09-23

## Context

Kamil liked the portrait on cetuspro.com: a pencil sketch that a watercolour wash
spreads over wherever the cursor moves. He asked for something like it on the
contact-section portrait (homepage and /o-mnie), in the site's own style.

Checked on cetuspro.com (2026-09-23): a sketch image, the colour image at 18 %
opacity, and a canvas painting a blue wash on top, with `touch-action: none` on
the portrait, which traps a finger that lands on it on a phone.

## Decision

- The sketch is an image generated once with fal.ai nano-banana-pro from
  `kamil-cutout.webp` (a filter-made sketch looked cheap), turned into light
  lines for the dark background: `public/kamil-sketch.webp`.
- A canvas under the lines paints a teal wash (`src/lib/brush.ts`, pure and
  unit-tested; `src/components/SketchPortrait.tsx`, the DOM shell). The wash is
  clipped to the figure with a CSS mask (`public/kamil-sketch-mask.webp`) and
  capped at 55 % opacity.
- Pointer events are read from the whole section, painted once per frame, and
  capped at 80 dabs per frame.
- Phones: no `touch-action: none`; the wash paints one stroke by itself when the
  section comes into view. Reduced motion skips that stroke.

## Consequences

- About 116 KB of new images, loaded lazily. `kamil-cutout.webp` is no longer
  referenced by the page; it stays as the source for regenerating the sketch.
- A new photo means a new sketch and mask (same fal.ai prompt, see CHANGELOG).
- Rollback: revert the PR; nothing else depends on the component.

## Revision 2026-09-25: photo in front, the hero's network over it

Kamil saw the watercolour sketch on production and asked for his photo as the
main front layer, with an effect that ties in with the hero instead. Replaced:

- Front layer: the photo `public/kamil-cutout.webp` (as before the sketch).
- Over it: the hero's network (`Hero3D.tsx` colours `#1fc9aa` hubs, `#1a9b84`
  nodes and links) on a canvas, clipped to the figure by using the same photo
  as the canvas mask (`mask-image`), blended with `screen`.
- The cursor pulls nearby nodes and drops short-lived ones, so a stroke leaves a
  trail of connections. Maths in `src/lib/portraitNet.ts` (unit-tested);
  `src/components/NetworkPortrait.tsx` is the DOM shell. The animation loop runs
  only while the portrait is on screen; reduced motion draws one still frame.
- Removed: `SketchPortrait.tsx`, `src/lib/brush.ts`, `kamil-sketch.webp`,
  `kamil-sketch-mask.webp`. The fal.ai sketch is no longer used.
