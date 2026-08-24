import { useEffect, useRef } from "react";

/**
 * Custom SVG pointer. The stylesheet sets `cursor: none` on body, links and
 * buttons globally, so this has to render on every page — while it lived
 * inside the homepage route, /cv, /claude, /case-studies and /uslugi/* showed
 * no pointer at all on desktop.
 *
 * Hover state uses event delegation rather than listeners attached per
 * element: the earlier version bound them once on mount, so anything rendered
 * afterwards — a client-side navigation, an opened accordion — never lit up.
 * It also left those listeners behind on unmount.
 *
 * Hidden under 768px by CSS; touch devices have no pointer to replace.
 */
export function Cursor() {
  const ptrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ptrRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      el.classList.toggle("hovering", !!t?.closest?.("a, button, summary, details"));
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div ref={ptrRef} className="cursor-ptr" aria-hidden="true">
      <svg
        width="22"
        height="26"
        viewBox="0 0 22 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1.5 1.5L1.5 19L6 14.5L9 22L11.5 21L8.5 13.5H15L1.5 1.5Z" fill="#22d3ee" />
      </svg>
    </div>
  );
}
