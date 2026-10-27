import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { explainIdAt } from "../../lib/explainTarget";
import type { Explain, ExplainUi } from "./types";

/**
 * A figure plus a panel that explains its parts in plain words. Pointing at an element of the figure, tapping
 * it, or picking its name from the row of buttons under it shows the explanation; Esc clears it. The panel
 * sits under the figure, not over it: the diagrams scroll sideways on a phone and a floating bubble would be
 * clipped, and the buttons give keyboard and screen-reader users the same content the pointer gets.
 */
export function ExplainedFigure({
  items,
  ui,
  children,
}: {
  items: Explain[];
  ui: ExplainUi;
  children: ReactNode;
}) {
  const [active, setActive] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const panel = useRef<HTMLDivElement>(null);
  // set by a tap or click on the figure itself: on a phone the panel sits below a tall figure, out of sight
  const reveal = useRef(false);
  const [tapCount, setTapCount] = useState(0);
  const known = new Set(items.map((i) => i.id));
  const pick = (id: string | null) => {
    if (id && known.has(id)) setActive(id);
  };

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    // The figure is an opaque child (SVG or HTML drawn by diagrams.tsx/charts.tsx), so the highlight is a class
    // toggled from outside instead of a prop threaded into eighteen components. Safe because their classNames are static.
    for (const el of root.querySelectorAll("[data-explain]")) {
      el.classList.toggle("ax-on", el.getAttribute("data-explain") === active);
    }
  }, [active]);

  // Esc hides the explanation wherever focus is: after pointing with a mouse, focus never enters the figure.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) setActive(null); // a menu that handled Esc keeps it
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    const el = panel.current;
    if (!active || !reveal.current || !el) return;
    reveal.current = false;
    const r = el.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) el.scrollIntoView({ block: "nearest" });
  }, [active, tapCount]);

  const current = items.find((i) => i.id === active);
  return (
    <div
      ref={wrap}
      className="ax-wrap"
      onPointerOver={(e) => {
        if (e.pointerType === "mouse") pick(explainIdAt(e.target));
      }}
      onClick={(e) => {
        const id = explainIdAt(e.target);
        if (!id || !known.has(id)) return;
        reveal.current = true;
        setActive(id);
        setTapCount((n) => n + 1); // a second tap on the same part still brings the panel into view
      }}
    >
      {children}
      <div className="ax-chips" role="group" aria-label={ui.pick}>
        {items.map((i) => (
          <button
            key={i.id}
            type="button"
            className="ax-chip"
            aria-pressed={i.id === active}
            aria-controls={panelId}
            onClick={() => setActive(i.id)}
            onFocus={() => setActive(i.id)}
          >
            {i.term}
          </button>
        ))}
      </div>
      <div id={panelId} ref={panel} className="ax-panel" aria-live="polite" tabIndex={-1}>
        {current ? (
          <>
            <p className="ax-term">{current.term}</p>
            <p className="ax-body">{current.body}</p>
            <button
              type="button"
              className="ax-close"
              onClick={() => {
                setActive(null);
                // the button disappears with the explanation: keep keyboard focus in the panel, not on <body>
                panel.current?.focus();
              }}
            >
              {ui.close}
            </button>
          </>
        ) : (
          <p className="ax-hint">{ui.hint}</p>
        )}
      </div>
    </div>
  );
}
