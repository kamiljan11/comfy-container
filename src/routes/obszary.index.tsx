import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../hooks/useLang";
import { AREAS } from "../data/areas";
import { pageMeta } from "../lib/seo";

/** Index of the area pages — where in a company the work lands. */

const COPY = {
  en: {
    eyebrow: "AREAS",
    h1: "Where automation lands in a company",
    lead: "Six places where the same kinds of work show up: sales, customer service, administration, HR, data, and the processes that fit no template.",
    cta: "Not sure where to start?",
    button: "Book a free consultation",
    ctaLead: "One conversation is usually enough to see which area to start with.",
  },
  pl: {
    eyebrow: "OBSZARY",
    h1: "Gdzie w firmie ląduje automatyzacja",
    lead: "Sześć miejsc, w których pojawia się ta sama praca: sprzedaż, obsługa klienta, administracja, HR, dane i procesy, do których nie pasuje żaden szablon.",
    cta: "Nie wiesz, od czego zacząć?",
    button: "Umów bezpłatną konsultację",
    ctaLead: "Jedna rozmowa zwykle wystarcza, żeby zobaczyć, od którego obszaru zacząć.",
  },
} as const;

export const Route = createFileRoute("/obszary/")({
  head: () => ({
    meta: [
      ...pageMeta({
        title:
          "Obszary: automatyzacja w sprzedaży, obsłudze, administracji, HR i danych | Kamil Jan",
        description:
          "Automatyzacja procesów i AI według obszaru firmy: sprzedaż i marketing, obsługa klienta, administracja i dokumenty, HR i rekrutacja, dane i raporty, nietypowe procesy.",
        url: "https://kamiljan.com/obszary",
        locale: "pl_PL",
      }),
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/obszary" }],
  }),
  component: AreasIndex,
});

function AreasIndex() {
  const [lang] = useLang("pl");
  const c = COPY[lang];
  const list = AREAS[lang];

  return (
    <div className="svc-page">
      <div className="container">
        <header className="svc-head">
          <span className="svc-eyebrow">{c.eyebrow}</span>
          <h1>{c.h1}</h1>
          <p className="svc-lead">{c.lead}</p>
        </header>

        <div className="svc-index-grid">
          {list.map((a, i) => (
            <Link
              key={a.slug}
              to="/obszary/$slug"
              params={{ slug: a.slug }}
              className="svc-index-card"
            >
              <span className="svc-index-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="svc-index-body">
                <span className="svc-index-title">{a.navLabel}</span>
                <span className="svc-index-sub">{a.h1}</span>
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
