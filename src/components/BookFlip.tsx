import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
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
 *
 * The page elements handed to HTMLFlipBook must stay the same objects: the
 * library rebuilds every page (updateFromHtml) whenever its children change,
 * and doing that on each turn broke the flip mid-animation on phones. So the
 * children are memoised per book, and which pages get an image travels through
 * LoadedPages context instead of props.
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

const LoadedPages = createContext<ReadonlySet<number>>(new Set());

type PageProps = { book: BookKey; index: number; alt: string };

const Page = forwardRef<HTMLDivElement, PageProps>(function Page({ book, index, alt }, ref) {
  const load = useContext(LoadedPages);
  return (
    <div className="bf-page" ref={ref}>
      {load.has(index) ? (
        <img src={pageSrc(book, index + 1)} alt={alt} decoding="async" draggable={false} />
      ) : null}
    </div>
  );
});

// a constant, so HTMLFlipBook's memo is not defeated by a new object each render
const BOOK_STYLE = {};

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

  const load = useMemo(() => pagesToLoad(current, meta.pages), [current, meta.pages]);
  const onFlip = useCallback((e: { data: number }) => setCurrent(e.data), []);
  const pageWord = c.page.toLowerCase();
  const pages = useMemo(
    () =>
      Array.from({ length: meta.pages }, (_, i) => (
        <Page key={i} book={book} index={i} alt={`${title}, ${pageWord} ${String(i + 1)}`} />
      )),
    [book, meta.pages, title, pageWord],
  );

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
        <LoadedPages.Provider value={load}>
          <HTMLFlipBook
            key={book}
            ref={bookRef}
            className="bf-book"
            style={BOOK_STYLE}
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
            onFlip={onFlip}
          >
            {pages}
          </HTMLFlipBook>
        </LoadedPages.Provider>
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
