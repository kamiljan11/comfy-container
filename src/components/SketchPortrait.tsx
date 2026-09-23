import { useEffect, useRef } from "react";
import { blobsForDab, dabsBetween, introPath, rng, type Point } from "../lib/brush";

/**
 * The contact-section portrait as a white-pencil sketch that the visitor paints
 * with a teal watercolour wash by moving the cursor over the section (after the
 * effect on cetuspro.com). The paint stays; the sketch lines sit on top, so they
 * are never covered.
 *
 * Pointer events are read from the whole section (`sectionRef`), because the
 * contact text overlaps the portrait. Nothing blocks scrolling on a phone
 * (no touch-action: none): there the wash paints itself once when the section
 * comes into view, and a finger drag or tap adds more. With reduced motion the
 * intro stroke is skipped and only the visitor's own strokes paint.
 */

type Props = { sectionRef: React.RefObject<HTMLElement | null> };

const SPACING = 7;

export function SketchPortrait({ sectionRef }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const section = sectionRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !section || !ctx) return;

    const rand = rng(Date.now() & 0xffff);
    let scale = 1;
    let last: Point | null = null;

    const fit = () => {
      const r = wrap.getBoundingClientRect();
      scale = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(r.width * scale);
      const h = Math.round(r.height * scale);
      if (w === canvas.width && h === canvas.height) return;
      // resizing clears the canvas; keep the paint by copying it over
      const prev = document.createElement("canvas");
      prev.width = canvas.width;
      prev.height = canvas.height;
      prev.getContext("2d")?.drawImage(canvas, 0, 0);
      canvas.width = w;
      canvas.height = h;
      if (prev.width && prev.height) ctx.drawImage(prev, 0, 0, w, h);
    };

    const size = () => Math.max(22, canvas.width * 0.085);

    const dab = (p: Point) => {
      for (const b of blobsForDab(p, size(), rand)) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        // a darker ring near the edge, where pigment collects when a wash dries
        g.addColorStop(0, `hsla(${String(b.hue)}, 80%, 58%, ${String(b.alpha * 0.7)})`);
        g.addColorStop(0.78, `hsla(${String(b.hue)}, 85%, 50%, ${String(b.alpha)})`);
        g.addColorStop(1, `hsla(${String(b.hue)}, 85%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const toCanvas = (e: PointerEvent): Point | null => {
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      // paint only when the pointer is over the portrait (with a small margin)
      if (x < -20 || y < -20 || x > r.width + 20 || y > r.height + 20) return null;
      return { x: x * scale, y: y * scale };
    };

    // Pointer events can fire far more often than frames (high-rate mice,
    // coalesced touch), so events only record the target and one frame paints
    // the path from the last painted point to it.
    let target: Point | null = null;
    let moveRaf = 0;
    const paintToTarget = () => {
      moveRaf = 0;
      if (!target) return;
      for (const d of last ? dabsBetween(last, target, SPACING * scale) : [target]) dab(d);
      last = target;
    };
    const onMove = (e: PointerEvent) => {
      const p = toCanvas(e);
      if (!p) {
        last = null;
        target = null;
        return;
      }
      target = p;
      if (!moveRaf) moveRaf = requestAnimationFrame(paintToTarget);
    };
    const onLeave = () => {
      last = null;
      target = null;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerdown", onMove);
    section.addEventListener("pointerleave", onLeave);

    // the intro stroke, once, when the section is on screen
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((en) => en.isIntersecting)) return;
        io.disconnect();
        if (reduced) return;
        const pts = introPath(canvas.width, canvas.height);
        let i = 1;
        const step = () => {
          const a = pts[i - 1];
          const b = pts[i];
          if (!a || !b) return;
          for (const d of dabsBetween(a, b, SPACING * scale)) dab(d);
          i += 1;
          raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.35 },
    );
    io.observe(wrap);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(moveRaf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerdown", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [sectionRef]);

  return (
    <div className="contact-photo sketch-portrait" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="sketch-wash" />
      <img
        src="/kamil-sketch.webp"
        alt=""
        className="sketch-lines"
        loading="lazy"
        decoding="async"
        width="912"
        height="1168"
      />
    </div>
  );
}
