/**
 * Three waves drifting sideways at different speeds, behind a page's content.
 * Decorative only: aria-hidden, no pointer events, and still under
 * prefers-reduced-motion (the rules are in site.css, `.flow-waves`). The
 * parent needs `position: relative` and content above `z-index: 0`.
 */
export function FlowWaves() {
  return (
    <div className="flow-waves" aria-hidden="true">
      <div className="flow-wave flow-wave-1" />
      <div className="flow-wave flow-wave-2" />
      <div className="flow-wave flow-wave-3" />
    </div>
  );
}
