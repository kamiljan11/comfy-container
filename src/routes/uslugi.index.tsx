import { createFileRoute, Link } from "@tanstack/react-router";
import { LangToggle } from "../components/LangToggle";
import { useLang } from "../hooks/useLang";
import { SERVICES } from "../data/services";

/**
 * Index of the service pages. Deliberately absent from the site header — the
 * homepage sells a person to hire, these pages sell the work, and a recruiter
 * reading front-to-back should not land in an agency pitch. Search engines
 * still reach them through the sitemap and the links between them.
 */

const COPY = {
  en: {
    back: "← kamiljan.com",
    cases: "Case studies →",
    eyebrow: "SERVICES",
    h1: "What I build for companies",
    lead: "Six kinds of work, all of them running in production somewhere. Every page below states what the problem usually looks like, how I approach it, and where the limits are — including the cases where I would tell you not to do it.",
    cta: "Talk it through",
    ctaLead:
      "One conversation is usually enough to see whether there is anything worth automating.",
  },
  pl: {
    back: "← kamiljan.com",
    cases: "Case studies →",
    eyebrow: "USŁUGI",
    h1: "Co buduję dla firm",
    lead: "Sześć rodzajów pracy, każdy działający gdzieś w produkcji. Każda strona mówi, jak zwykle wygląda problem, jak do niego podchodzę i gdzie leżą granice — łącznie z przypadkami, w których odradzam robotę.",
    cta: "Porozmawiajmy",
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
  const [lang, toggle] = useLang("pl");
  const c = COPY[lang];
  const list = SERVICES[lang];

  return (
    <div className="svc-page">
      <div className="cv-bar">
        <Link to="/" className="cv-back">
          {c.back}
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/case-studies" className="cv-back">
            {c.cases}
          </Link>
          <LangToggle lang={lang} onToggle={toggle} />
        </div>
      </div>

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
          <a className="btn-primary" href="mailto:hello@kamiljan.com">
            hello@kamiljan.com
          </a>
        </section>
      </div>
    </div>
  );
}
