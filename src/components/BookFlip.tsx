import { forwardRef, useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import HTMLFlipBook from "react-pageflip";
import { type Lang } from "../i18n";
import { BOOK_PAGES, pageSrc, type BookKey } from "../data/bookPages";
import { pagesToLoad } from "../lib/bookWindow";

/**
 * One book as a flipbook (docs/adr/0005). Client-only: /ksiazki mounts it
 * after hydration, because page-flip measures the DOM when it starts.
 *
 * Only the pages around the one being read get an image source (see
 * pagesToLoad), so a phone does not download 199 pages to show one.
 * Arrow keys turn pages when the book has focus, and prefers-reduced-motion
 * turns the flip animation off; the library does neither on its own.
 */

type Copy = { prev: string; next: string; page: string; label: string };

const COPY: Record<Lang, Copy> = {
  pl: { prev: "Poprzednia strona", next: "Następna strona", page: "Strona", label: "Książka" },
  en: { prev: "Previous page", next: "Next page", page: "Page", label: "Book" },
};

/** The slice of page-flip's API we use; the package types it as any. */
type PageFlipApi = {
  flipNext: () => void;
  flipPrev: () => void;
};
type FlipBookRef = { pageFlip: () => PageFlipApi | undefined };

const Page = forwardRef<HTMLDivElement, { src: string | null; alt: string }>(function Page(
  { src, alt },
  ref,
) {
  return (
    <div className="bf-page" ref={ref}>
      {src ? <img src={src} alt={alt} decoding="async" draggable={false} /> : null}
    </div>
  );
});

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Props = { book: BookKey; title: string; lang: Lang; hintId?: string };

export function BookFlip({ book, title, lang, hintId }: Props) {
  const c = COPY[lang];
  const meta = BOOK_PAGES[book];
  const bookRef = useRef<FlipBookRef | null>(null);
  const [current, setCurrent] = useState(0);
  const [reduced] = useState(prefersReducedMotion);

  // a new book starts on its cover
  useEffect(() => setCurrent(0), [book]);

  const api = () => bookRef.current?.pageFlip();
  const next = useCallback(() => api()?.flipNext(), []);
  const prev = useCallback(() => api()?.flipPrev(), []);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const load = pagesToLoad(current, meta.pages);

  return (
    <div className="bf">
      <div
        className="bf-stage"
        tabIndex={0}
        role="region"
        aria-label={`${c.label}: ${title}`}
        aria-describedby={hintId}
        onKeyDown={onKey}
      >
        <HTMLFlipBook
          key={book}
          ref={bookRef}
          className="bf-book"
          style={{}}
          width={meta.width / 2}
          height={meta.height / 2}
          size="stretch"
          minWidth={260}
          maxWidth={520}
          minHeight={369}
          maxHeight={738}
          startPage={0}
          drawShadow={!reduced}
          flippingTime={reduced ? 1 : 700}
          usePortrait
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.35}
          showCover
          mobileScrollSupport
          clickEventForward={false}
          useMouseEvents
          swipeDistance={30}
          showPageCorners={!reduced}
          disableFlipByClick={false}
          onFlip={(e: { data: number }) => setCurrent(e.data)}
        >
          {Array.from({ length: meta.pages }, (_, i) => (
            <Page
              key={i}
              src={load.has(i) ? pageSrc(book, i + 1) : null}
              alt={`${title}, ${c.page.toLowerCase()} ${String(i + 1)}`}
            />
          ))}
        </HTMLFlipBook>
      </div>
      <div className="bf-controls">
        <button type="button" className="bf-btn" onClick={prev} aria-label={c.prev}>
          ←
        </button>
        <span className="bf-count" aria-live="polite">
          {c.page} {current + 1} / {meta.pages}
        </span>
        <button type="button" className="bf-btn" onClick={next} aria-label={c.next}>
          →
        </button>
      </div>
    </div>
  );
}
