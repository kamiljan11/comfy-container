import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LangToggle } from "../components/LangToggle";
import { useLang } from "../hooks/useLang";
import { SERVICES, SERVICE_SLUGS, getService } from "../data/services";

/**
 * One service page. The slug is language-independent (Polish, because these
 * pages exist to rank for Polish queries) while the copy switches with the
 * toggle, so a shared link keeps working regardless of the reader's language.
 */

const UI = {
  en: {
    back: "← kamiljan.com",
    services: "All services →",
    ctaTitle: "Worth a conversation?",
    ctaLead:
      "Describe the process in a couple of sentences. If there is nothing here worth automating, I will say so — that answer is free and saves us both time.",
    more: "Other things I build",
  },
  pl: {
    back: "← kamiljan.com",
    services: "Wszystkie usługi →",
    ctaTitle: "Warto porozmawiać?",
    ctaLead:
      "Opisz proces w dwóch zdaniach. Jeśli nie ma tu czego automatyzować, powiem to wprost — ta odpowiedź jest darmowa i oszczędza czas nam obu.",
    more: "Inne rzeczy, które buduję",
  },
} as const;

export const Route = createFileRoute("/uslugi/$slug")({
  loader: ({ params }) => {
    if (!SERVICE_SLUGS.includes(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    // Meta has to be resolvable on the server, before the client picks a
    // language. Polish is the default here because these pages target Polish
    // search queries.
    const s = getService("pl", params.slug);
    return {
      meta: [
        { title: s?.metaTitle ?? "Usługi — Kamil Jan" },
        { name: "description", content: s?.metaDescription ?? "" },
      ],
      links: [{ rel: "canonical", href: `https://kamiljan.com/uslugi/${params.slug}` }],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const [lang, toggle] = useLang("pl");
  const t = UI[lang];
  const s = getService(lang, slug);
  const others = SERVICES[lang].filter((x) => x.slug !== slug);

  if (!s) return null;

  return (
    <div className="svc-page">
      <div className="cv-bar">
        <Link to="/" className="cv-back">
          {t.back}
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/uslugi" className="cv-back">
            {t.services}
          </Link>
          <LangToggle lang={lang} onToggle={toggle} />
        </div>
      </div>

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
            <Link to="/case-studies">
              {lang === "pl"
                ? "Pełne opisy wdrożeń z decyzjami i odrzuconymi alternatywami →"
                : "Full write-ups with the decisions and the rejected alternatives →"}
            </Link>
          </p>
        </section>

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
          <a className="btn-primary" href="mailto:hello@kamiljan.com">
            hello@kamiljan.com
          </a>
        </section>

        <nav className="svc-more" aria-label={t.more}>
          <h2>{t.more}</h2>
          <div className="svc-more-grid">
            {others.map((o) => (
              <Link key={o.slug} to="/uslugi/$slug" params={{ slug: o.slug }}>
                {o.navLabel}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
