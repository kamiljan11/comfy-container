import { Link } from "@tanstack/react-router";
import { type Lang } from "../i18n";
import { type Service } from "../data/services";

/**
 * The body of one service (/uslugi/$slug) or area (/obszary/$slug) page. Both
 * kinds share the Service shape and the same sections; the route only decides
 * the data source and where the "other pages" links point.
 */

const UI = {
  en: {
    ctaTitle: "Worth a conversation?",
    ctaLead:
      "Describe the process in a couple of sentences. If there is nothing here worth automating, I will say so — that answer is free and saves us both time.",
    cta: "Book a free consultation",
    proofLink: "Full write-ups with the decisions and the rejected alternatives →",
  },
  pl: {
    ctaTitle: "Warto porozmawiać?",
    ctaLead:
      "Opisz proces w dwóch zdaniach. Jeśli nie ma tu czego automatyzować, powiem to wprost — ta odpowiedź jest darmowa i oszczędza czas nam obu.",
    cta: "Umów bezpłatną konsultację",
    proofLink: "Pełne opisy wdrożeń z decyzjami i odrzuconymi alternatywami →",
  },
} as const;

type Props = {
  s: Service;
  lang: Lang;
  /** Sibling pages for the "other …" block at the end. */
  others: Service[];
  othersTitle: string;
  /** "/uslugi/$slug" or "/obszary/$slug" — the route pattern of the siblings. */
  othersTo: "/uslugi/$slug" | "/obszary/$slug";
};

export function ServicePageBody({ s, lang, others, othersTitle, othersTo }: Props) {
  const t = UI[lang];
  return (
    <div className="svc-page">
      <div className="container">
        <header className="svc-head">
          <span className="svc-eyebrow">{s.eyebrow}</span>
          <h1>{s.h1}</h1>
          <p className="svc-lead">{s.lead}</p>
          <ul className="svc-micro">
            {s.micro.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </header>

        <section className="svc-sec">
          <span className="svc-eyebrow">{s.problemsEyebrow}</span>
          <h2>{s.problemsTitle}</h2>
          <p className="svc-sec-lead">{s.problemsLead}</p>
          <div className="svc-grid">
            {s.problems.map((p) => (
              <article key={p.title} className="svc-card">
                <span className="svc-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="svc-sec">
          <span className="svc-eyebrow">{s.answerEyebrow}</span>
          <h2>{s.answerTitle}</h2>
          <p className="svc-sec-lead">{s.answerLead}</p>
          <ol className="svc-points">
            {s.points.map((p, i) => (
              <li key={p.title}>
                <span className="svc-point-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* an area with no fitting production system has no proofs, and an
            empty "running in production" section would say the opposite */}
        {s.proofs.length > 0 && (
          <section className="svc-sec">
            <h2>{s.proofsTitle}</h2>
            <div className="svc-proofs">
              {s.proofs.map((p) => (
                <article key={p.title} className="svc-proof">
                  <span className="svc-tag">{p.sector}</span>
                  <h3>{p.title}</h3>
                  <p className="svc-metric">{p.metric}</p>
                </article>
              ))}
            </div>
            <p className="svc-proof-link">
              <Link to="/case-studies">{t.proofLink}</Link>
            </p>
          </section>
        )}

        <section className="svc-sec">
          <h2>{s.faqTitle}</h2>
          <div className="svc-faq">
            {s.faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="svc-cta">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaLead}</p>
          <Link className="btn-primary" to="/kontakt">
            {t.cta}
          </Link>
        </section>

        <nav className="svc-more" aria-label={othersTitle}>
          <h2>{othersTitle}</h2>
          <div className="svc-more-grid">
            {others.map((o) => (
              <Link key={o.slug} to={othersTo} params={{ slug: o.slug }}>
                {o.navLabel}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
