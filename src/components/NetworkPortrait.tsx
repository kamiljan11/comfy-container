import { useEffect, useRef } from "react";
import {
  NET_COLOURS,
  linksBetween,
  nodeAlpha,
  rng,
  seedNodes,
  spawnNode,
  stepNodes,
  type NetNode,
  type Point,
} from "../lib/portraitNet";

/**
 * The contact-section portrait: Kamil's photo in front, with the hero's network
 * (Hero3D.tsx: teal nodes, pulsing hubs, thin links) drawn over the figure and
 * clipped to its silhouette by using the photo itself as the canvas mask.
 *
 * The network drifts on its own; moving the cursor over the section pulls the
 * nearby nodes towards it and drops short-lived nodes, so a stroke leaves a
 * brighter trail of connections. Pointer events are read from the whole section
 * because the contact text overlaps the portrait. Nothing blocks scrolling on a
 * phone (no touch-action: none, no preventDefault). The loop only runs while the
 * portrait is on screen; with reduced motion one still frame is drawn.
 * ADR: docs/adr/0006-contact-sketch-portrait-canvas.md (revised 2026-09-25).
 */

type Props = { sectionRef: React.RefObject<HTMLElement | null> };

const PHOTO = "/kamil-cutout.webp";
const SPAWN_EVERY_PX = 14;

export function NetworkPortrait({ sectionRef }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const section = sectionRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !section || !ctx) return;

    const rand = rng(Date.now() & 0xffff);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scale = 1;
    let nodes: NetNode[] = [];
    let pointer: Point | null = null;
    let lastSpawn: Point | null = null;
    let raf = 0;
    let running = false;
    let prevT = 0;

    const px = (v: number) => v * scale;

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const maxDist = w * 0.17;
      ctx.lineWidth = px(1);
      for (const l of linksBetween(nodes, maxDist)) {
        const a = nodes[l.a];
        const b = nodes[l.b];
        if (!a || !b) continue;
        ctx.globalAlpha = 0.75 * l.strength * Math.min(nodeAlpha(a), nodeAlpha(b));
        ctx.strokeStyle = NET_COLOURS.link;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      nodes.forEach((n, i) => {
        const pulse = n.hub ? 0.75 + Math.sin(t / 600 + i * 0.7) * 0.25 : 0.6;
        ctx.globalAlpha = pulse * nodeAlpha(n);
        ctx.fillStyle = n.hub ? NET_COLOURS.hub : NET_COLOURS.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, px(n.hub ? 3 : 1.6), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const frame = (t: number) => {
      const dt = Math.min(0.05, prevT ? (t - prevT) / 1000 : 0.016);
      prevT = t;
      nodes = stepNodes(nodes, dt, {
        w: canvas.width,
        h: canvas.height,
        pointer,
        pull: canvas.width * 0.22,
        max: 260,
      });
      draw(t);
      wrap.dataset.nodes = String(nodes.length); // read by e2e/network-portrait.spec.ts
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      prevT = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const fit = () => {
      const r = wrap.getBoundingClientRect();
      const nextScale = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(r.width * nextScale);
      const h = Math.round(r.height * nextScale);
      if (!w || !h || (w === canvas.width && h === canvas.height)) return;
      const sx = canvas.width ? w / canvas.width : 1;
      const sy = canvas.height ? h / canvas.height : 1;
      canvas.width = w;
      canvas.height = h;
      scale = nextScale;
      // a resize keeps the network, rescaled, instead of starting over
      nodes = nodes.length
        ? nodes.map((n) => ({ ...n, x: n.x * sx, y: n.y * sy }))
        : seedNodes(Math.round(40 + (w * h) / 16000), w, h, rand);
      draw(performance.now());
      wrap.dataset.nodes = String(nodes.length);
    };

    const toCanvas = (e: PointerEvent): Point | null => {
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return null;
      return { x: x * scale, y: y * scale };
    };
    const onMove = (e: PointerEvent) => {
      const p = toCanvas(e);
      pointer = p;
      if (!p || reduced) return;
      if (!lastSpawn || Math.hypot(p.x - lastSpawn.x, p.y - lastSpawn.y) > px(SPAWN_EVERY_PX)) {
        nodes = [...nodes, spawnNode(p, rand)];
        lastSpawn = p;
      }
    };
    const onLeave = () => {
      pointer = null;
      lastSpawn = null;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerdown", onMove);
    section.addEventListener("pointerleave", onLeave);

    // run the loop only while the portrait is on screen
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) start();
      else stop();
    });
    io.observe(wrap);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerdown", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [sectionRef]);

  return (
    <div className="contact-photo net-portrait" ref={wrapRef} aria-hidden="true">
      <img
        src={PHOTO}
        alt=""
        className="net-photo"
        loading="lazy"
        decoding="async"
        width="853"
        height="1100"
      />
      <canvas ref={canvasRef} className="net-canvas" />
    </div>
  );
}
