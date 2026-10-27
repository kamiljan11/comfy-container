import { useEffect, useRef } from "react";
import type { Item } from "./types";

/**
 * Questions and answers, folded: a reader scans the questions and opens only the ones they care about.
 * Native <details>, so it works without JavaScript, with the keyboard and in a screen reader, and the answers
 * stay in the HTML for search engines. Paper has no click, so every answer opens for printing and the ones the
 * reader had not opened fold again afterwards.
 */
export function Faq({ items }: { items: Item[] }) {
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let opened: HTMLDetailsElement[] = [];
    const before = () => {
      opened = [...(list.current?.querySelectorAll("details:not([open])") ?? [])].filter(
        (d): d is HTMLDetailsElement => d instanceof HTMLDetailsElement,
      );
      for (const d of opened) d.open = true;
    };
    const after = () => {
      for (const d of opened) d.open = false;
      opened = [];
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  return (
    <div ref={list} className="faq">
      {items.map((it) => (
        <details key={it.label} className="faq-item">
          {/* a real h3, so the questions show up in a screen reader's heading list */}
          <summary className="faq-q">
            <h3 className="faq-q-text">{it.label}</h3>
          </summary>
          <p className="faq-a">{it.body}</p>
        </details>
      ))}
    </div>
  );
}
