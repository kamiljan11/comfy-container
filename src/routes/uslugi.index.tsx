import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../hooks/useLang";
import { SERVICES } from "../data/services";

/** Index of the service pages — "Wszystkie usługi" in the header's Usługi menu. */

const COPY = {
  en: {
    eyebrow: "SERVICES",
    h1: "What I build for companies",
    lead: "Six kinds of work, all of them running in production somewhere. Every page below states what the problem usually looks like, how I approach it, and where the limits are — including the cases where I would tell you not to do it.",
    cta: "Talk it through",
    button: "Book a free consultation",
    ctaLead:
      "One conversation is usually enough to see whether there is anything worth automating.",
  },
  pl: {
    eyebrow: "USŁUGI",
    h1: "Co buduję dla firm",
    lead: "Sześć rodzajów pracy, każdy działający gdzieś w produkcji. Każda strona mówi, jak zwykle wygląda problem, jak do niego podchodzę i gdzie leżą granice — łącznie z przypadkami, w których odradzam robotę.",
    cta: "Porozmawiajmy",
    button: "Umów bezpłatną konsultację",
    ctaLead: "Jedna rozmowa zwykle wystarcza, żeby zobaczyć, czy jest tu w ogóle co automatyzować.",
  },
} as const;

export const Route = createFileRoute("/uslugi/")({
  head: () => ({
    meta: [
      { title: "Usługi — automatyzacja, AI i systemy dla firm | Kamil Jan" },
      {
        name: "description",
        content:
          "Systemy wewnętrzne, automatyzacja procesów, AI w procesach, integracje, doradztwo i wdrożenia. Wszystko oparte na wdrożeniach działających w produkcji.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/uslugi" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const [lang] = useLang("pl");
  const c = COPY[lang];
  const list = SERVICES[lang];

  return (
    <div className="svc-page">
      <div className="container">
        <header className="svc-head">
          <span className="svc-eyebrow">{c.eyebrow}</span>
          <h1>{c.h1}</h1>
          <p className="svc-lead">{c.lead}</p>
        </header>

        <div className="svc-index-grid">
          {list.map((s, i) => (
            <Link
              key={s.slug}
              to="/uslugi/$slug"
              params={{ slug: s.slug }}
              className="svc-index-card"
            >
              <span className="svc-index-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="svc-index-body">
                <span className="svc-index-title">{s.navLabel}</span>
                <span className="svc-index-sub">{s.h1}</span>
              </span>
            </Link>
          ))}
        </div>

        <section className="svc-cta">
          <h2>{c.cta}</h2>
          <p>{c.ctaLead}</p>
          <Link className="btn-primary" to="/kontakt">
            {c.button}
          </Link>
        </section>
      </div>
    </div>
  );
}
