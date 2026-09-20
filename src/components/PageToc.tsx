import { useEffect, useState, type RefObject } from "react";
import { collectToc, type TocEntry } from "../lib/pageToc";

/**
 * A table of contents for one long page, collapsed by default.
 *
 * It reads the page's own headings after mount (see src/lib/pageToc.ts), so it
 * cannot fall out of step with the copy or the language. Nothing renders until
 * there are enough headings to be worth a list, and nothing renders at all
 * without JavaScript, which is right for a navigation aid: the page below it
 * is complete on its own.
 */

type Props = {
  /** The article whose headings make the list. */
  bodyRef: RefObject<HTMLElement | null>;
  label: string;
  /**
   * The page language. The headings are read from the DOM, and the server
   * renders English before the language hook switches the page, so without
   * this the list keeps the headings of the language the visitor never saw.
   */
  lang: string;
  /** Below this many headings a list is noise, not navigation. */
  min?: number;
};

export function PageToc({ bodyRef, label, lang, min = 4 }: Props) {
  const [entries, setEntries] = useState<TocEntry[]>([]);

  useEffect(() => {
    if (!bodyRef.current) return;
    setEntries(collectToc(bodyRef.current));
  }, [bodyRef, lang]);

  if (entries.length < min) return null;

  return (
    <details className="ptoc">
      <summary className="ptoc-sum">
        <span>{label}</span>
        <span className="ptoc-count">{entries.length}</span>
      </summary>
      <nav aria-label={label}>
        <ol className="ptoc-list">
          {entries.map((e) => (
            <li key={e.id}>
              <a href={`#${e.id}`}>{e.label}</a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
