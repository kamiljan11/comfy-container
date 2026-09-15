import { createFileRoute } from "@tanstack/react-router";
import { T, type Lang } from "../i18n";
import { useLang } from "../hooks/useLang";

/**
 * /ksiazki — the two free books on their own page, so the "Books" item in the
 * About menu lands on the books instead of the bottom of the whole /o-mnie
 * page. The copy is the same `beyond` block the About page folds away
 * (src/i18n.ts), so there is one text to edit, not two.
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

const COPY: Record<Lang, { eyebrow: string; download: string; start: string }> = {
  pl: { eyebrow: "KSIĄŻKI", download: "Pobierz PDF", start: "Zacznij tutaj" },
  en: { eyebrow: "BOOKS", download: "Download PDF", start: "Start here" },
};

export const Route = createFileRoute("/ksiazki")({
  head: () => ({
    meta: [
      { title: "Książki — Simplified Practical Spirituality | Kamil Jan" },
      {
        name: "description",
        content:
          "Dwie darmowe książki Kamila Jana: praktyczny przewodnik ponad tradycjami, w wersji skróconej (102 strony) i pełnej (205 stron). PDF po angielsku, bez zapisu na listę.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/ksiazki" }],
  }),
  component: BooksPage,
});

function BooksPage() {
  const [lang] = useLang("pl");
  const b = T[lang].beyond;
  const c = COPY[lang];
  return (
    <div className="svc-page books-page">
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
              <a className={book.primary ? "btn-primary" : "btn-ghost"} href={book.href} download>
                {c.download}
              </a>
            </article>
          ))}
        </div>
        <p className="books-hint">{b.hint}</p>
      </div>
    </div>
  );
}
