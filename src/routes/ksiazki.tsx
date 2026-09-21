import { createFileRoute } from "@tanstack/react-router";
import { T, type Lang } from "../i18n";
import { useLang } from "../hooks/useLang";
import { FlowWaves } from "../components/FlowWaves";
import { lazy, Suspense, useEffect, useState } from "react";
import { type BookKey } from "../data/bookPages";
import { BookErrorBoundary } from "../components/BookErrorBoundary";
import { pageMeta } from "../lib/seo";

/* The flipbook is client-only (page-flip measures the DOM) and loaded lazily,
   so the page renders on the server without it. If the chunk fails to load,
   or the flipbook throws while rendering (BookErrorBoundary), the reader says
   so and the PDF buttons above still work. */
const BookFlip = lazy(() =>
  import("../components/BookFlip")
    .then((m) => ({ default: m.BookFlip }))
    .catch((err: unknown) => {
      console.error("[books] flipbook failed to load", err);
      return { default: BookFlipUnavailable };
    }),
);

function BookFlipUnavailable({ lang }: { lang: Lang }) {
  return (
    <p className="books-reader-error" role="status">
      {lang === "pl"
        ? "Czytnik nie wczytał się. Obie książki są do pobrania jako PDF powyżej."
        : "The reader did not load. Both books can be downloaded as PDFs above."}
    </p>
  );
}

function ReaderWait({ text }: { text: string }) {
  return (
    <div className="books-reader-wait" role="status">
      {text}
    </div>
  );
}

/**
 * /ksiazki — the two free books on their own page, so the "Books" item in the
 * About menu lands on the books. This is now the only place the books live:
 * the folded "Beyond work" aside on /o-mnie was removed and its flowing waves
 * moved here. Copy: the `beyond` block in src/i18n.ts.
 */

const BOOKS = [
  {
    key: "short",
    href: "/books/Simplified-Practical-Spirituality-Short.pdf",
    primary: true,
  },
  {
    key: "full",
    href: "/books/Simplified-Practical-Spirituality.pdf",
    primary: false,
  },
] as const;

type Copy = {
  eyebrow: string;
  download: string;
  start: string;
  read: string;
  readerTitle: string;
  readerHint: string;
  loading: string;
  switchLabel: string;
};

const COPY: Record<Lang, Copy> = {
  pl: {
    eyebrow: "KSIĄŻKI",
    download: "Pobierz PDF",
    start: "Zacznij tutaj",
    read: "Czytaj na stronie",
    readerTitle: "Czytaj tutaj",
    readerHint:
      "Przewracaj strony kliknięciem, przesunięciem palca albo strzałkami na klawiaturze.",
    loading: "Wczytuję książkę…",
    switchLabel: "Wybierz książkę",
  },
  en: {
    eyebrow: "BOOKS",
    download: "Download PDF",
    start: "Start here",
    read: "Read on the page",
    readerTitle: "Read here",
    readerHint: "Turn pages with a click, a swipe or the arrow keys.",
    loading: "Loading the book…",
    switchLabel: "Choose a book",
  },
};

export const Route = createFileRoute("/ksiazki")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Książki | Simplified Practical Spirituality | Kamil Jan",
        description:
          "Dwie darmowe książki Kamila Jana: praktyczny przewodnik ponad tradycjami, w wersji skróconej (99 stron) i pełnej (199 stron). PDF po angielsku, bez zapisu na listę.",
        url: "https://kamiljan.com/ksiazki",
        locale: "pl_PL",
      }),
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/ksiazki" }],
  }),
  component: BooksPage,
});

function BooksPage() {
  const [lang] = useLang("pl");
  const b = T[lang].beyond;
  const c = COPY[lang];
  const [book, setBook] = useState<BookKey>("short");
  const [client, setClient] = useState(false);
  useEffect(() => setClient(true), []);

  const openReader = (key: BookKey) => {
    setBook(key);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("books-reader")
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="svc-page books-page">
      <FlowWaves />
      <div className="container">
        <header className="svc-head">
          <span className="svc-eyebrow">{c.eyebrow}</span>
          <h1 className="svc-h1">{b.title}</h1>
          <p className="svc-lead">{b.body}</p>
        </header>

        <div className="books-grid">
          {BOOKS.map((book) => (
            <article key={book.key} className="books-card">
              {book.primary && <span className="books-start">{c.start}</span>}
              <h2 className="books-name">{b[book.key]}</h2>
              <div className="books-actions">
                <button
                  type="button"
                  className={book.primary ? "btn-primary" : "btn-ghost"}
                  onClick={() => openReader(book.key)}
                >
                  {c.read}
                </button>
                <a className="btn-ghost" href={book.href} download>
                  {c.download}
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="books-hint">{b.hint}</p>

        <section className="books-reader" id="books-reader" aria-labelledby="books-reader-h">
          <h2 className="books-reader-h" id="books-reader-h">
            {c.readerTitle}
          </h2>
          <div className="books-tabs" role="group" aria-label={c.switchLabel}>
            {BOOKS.map((x) => (
              <button
                key={x.key}
                type="button"
                aria-pressed={book === x.key}
                className="books-tab"
                onClick={() => setBook(x.key)}
              >
                {b[x.key]}
              </button>
            ))}
          </div>
          <p className="books-reader-hint" id="books-reader-hint">
            {c.readerHint}
          </p>
          {client ? (
            <BookErrorBoundary
              key={book}
              book={book}
              fallback={<BookFlipUnavailable lang={lang} />}
            >
              <Suspense fallback={<ReaderWait text={c.loading} />}>
                <BookFlip book={book} title={b[book]} lang={lang} hintId="books-reader-hint" />
              </Suspense>
            </BookErrorBoundary>
          ) : (
            <ReaderWait text={c.loading} />
          )}
        </section>
      </div>
    </div>
  );
}
