import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { hashToId, openStudy } from "../lib/caseStudyHash";
import { useEffect } from "react";
import { CASE_STUDIES, FEATURED, SECONDARY, type CaseStudy } from "../data/caseStudies";
import { useLang } from "../hooks/useLang";
import { type Lang } from "../i18n";

/** Approximate reading time from all prose fields (~200 wpm). */
function readMins(cs: CaseStudy): number {
  const words = [
    cs.problem,
    cs.context,
    cs.myRole,
    cs.build,
    cs.evals,
    cs.limitations,
    cs.results,
    cs.principle,
    ...cs.decisions.flatMap((d) => [d.decision, d.why, d.rejected, d.tradeoff]),
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
}

const CS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Kamil Jan Włodarczyk | Engineering Case Studies",
  url: "https://kamiljan.com/case-studies",
  hasPart: FEATURED.map((cs) => ({
    "@type": "Article",
    headline: cs.title,
    url: `https://kamiljan.com/case-studies#${cs.slug}`,
    author: { "@type": "Person", name: "Kamil Jan Włodarczyk" },
  })),
};

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Kamil Jan Włodarczyk | Case Studies" },
      {
        name: "description",
        content:
          "Engineering case studies by Kamil Jan Włodarczyk, AI automation & implementation engineer. How real production systems were built: the problem, the decisions and rejected alternatives, how I knew it worked, and the honest trade-offs.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/case-studies" }],
  }),
  component: CaseStudiesPage,
});

/** Everything on the page that is not study copy. The studies themselves come
 *  from CASE_STUDIES[lang]; the route's meta stays English because the slug is. */
const UI: Record<
  Lang,
  {
    h1: string;
    intro: string;
    problem: string;
    context: string;
    role: string;
    decisions: string;
    why: string;
    rejected: string;
    tradeoff: string;
    build: string;
    evals: string;
    limitations: string;
    results: string;
    principle: string;
    min: string;
    backTop: string;
    more: string;
    moreSub: string;
  }
> = {
  en: {
    h1: "Case studies",
    intro:
      "Twenty projects, each written up the same way: the problem, the decisions I made and the alternatives I rejected, how I knew it worked, and what I'd do differently. Open any one to read it in full.",
    problem: "The problem",
    context: "Context & constraints",
    role: "My role.",
    decisions: "The decisions that mattered",
    why: "Why",
    rejected: "Rejected",
    tradeoff: "Trade-off",
    build: "Building & deploying it",
    evals: "How I knew it worked",
    limitations: "What didn't work",
    results: "Results & impact",
    principle: "What I'd carry forward",
    min: "min",
    backTop: "↑ Back to top",
    more: "More work",
    moreSub: "Shorter write-ups: same honesty, less depth.",
  },
  pl: {
    h1: "Realizacje",
    intro:
      "Dwadzieścia projektów, każdy opisany tak samo: problem, decyzje, które podjąłem, i alternatywy, które odrzuciłem, skąd wiedziałem, że działa, i co zrobiłbym inaczej. Otwórz dowolny, żeby przeczytać całość.",
    problem: "Problem",
    context: "Kontekst i ograniczenia",
    role: "Moja rola.",
    decisions: "Decyzje, które miały znaczenie",
    why: "Dlaczego",
    rejected: "Odrzucone",
    tradeoff: "Kompromis",
    build: "Budowa i wdrożenie",
    evals: "Skąd wiedziałem, że działa",
    limitations: "Co nie zadziałało",
    results: "Wyniki i wpływ",
    principle: "Co zabieram dalej",
    min: "min",
    backTop: "↑ Do góry",
    more: "Więcej prac",
    moreSub: "Krótsze opisy: ta sama szczerość, mniej głębi.",
  },
};

/** Whitelisted proof domains mentioned in study prose, mapped to a URL that actually resolves. */
const PROOF_LINKS: Record<string, string> = {
  "journeyiceland.is": "https://www.journeyiceland.is",
  "flyt.is": "https://flyt.is",
  "quickfix.is": "https://quickfix.is",
  "reykjawwwik.is": "https://reykjawwwik.is",
  "garage.mountaincar.is": "https://garage.mountaincar.is",
  "mountaincar.is": "https://mountaincar.is",
  "kamiljan.com/case-studies": "https://kamiljan.com/case-studies",
  "github.com/kamiljan11/code-reading-quest": "https://github.com/kamiljan11/code-reading-quest",
};
const PROOF_RE = new RegExp(
  `(${Object.keys(PROOF_LINKS)
    .sort((a, b) => b.length - a.length)
    .map((d) => d.replace(/[.\\/]/g, "\\$&"))
    .join("|")})`,
  "g",
);

/** Render a prose chunk with whitelisted domains turned into live proof links. */
function linkify(p: string, key: number) {
  const segs = p.split(PROOF_RE);
  if (segs.length === 1) return <p key={key}>{p}</p>;
  return (
    <p key={key}>
      {segs.map((seg, i) =>
        PROOF_LINKS[seg] ? (
          <a key={i} href={PROOF_LINKS[seg]} target="_blank" rel="noopener noreferrer">
            {seg}
          </a>
        ) : (
          seg
        ),
      )}
    </p>
  );
}

/** Render a long field that may contain blank-line-separated paragraphs. */
function Paras({ text }: { text: string }) {
  const parts = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return <>{parts.map((p, i) => linkify(p, i))}</>;
}

function CaseStudiesPage() {
  // English slug, so the server renders English; the reader's saved choice
  // (or the header toggle) switches the studies and the labels together.
  const [lang] = useLang("en");
  const t = UI[lang];
  const studies = CASE_STUDIES[lang];

  // Open a collapsed study when it's linked from the TOC, a shared #hash or the
  // command palette. A router navigation re-renders with the new hash BEFORE it
  // pushes the URL (and pushState fires no hashchange), so the router's hash is
  // read here; the hashchange listener covers native jumps (plain #links, the
  // address bar).
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    openStudy(hashToId(hash), document);
    const onHashChange = () => {
      openStudy(hashToId(window.location.hash), document);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [hash]);

  return (
    <div className="cv-page">
      <div className="read-progress" aria-hidden="true" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CS_SCHEMA) }}
      />
      <header className="cs-head">
        <h1>{t.h1}</h1>
        <p className="cs-intro">{t.intro}</p>
      </header>

      {studies.map((cs, i) => (
        <details key={cs.slug} id={cs.slug} className="cs-fold">
          {/* Collapsed, this is one card: title, preview and a few tags are
              always visible: the same info the old separate TOC cards
              showed, so twenty of these scan in a screen or two without a
              second, duplicate list above them. Everything else waits until
              it is opened. */}
          <summary className="cs-fold-sum">
            <span className="cs-fold-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="cs-fold-headline">
              <h2>{cs.title}</h2>
              <p className="cs-fold-preview-inline">{cs.resultsPreview}</p>
              <span className="cs-fold-meta">
                {cs.stack.slice(0, 3).map((s) => (
                  <span key={s} className="cs-tag">
                    {s}
                  </span>
                ))}
                <span className="cs-fold-time">
                  {readMins(cs)} {t.min}
                </span>
              </span>
            </span>
            <span className="cs-chev" aria-hidden="true">
              ▾
            </span>
          </summary>

          <div className="cs-fold-body">
            <div className="cs-stack cs-fold-stack">
              {cs.stack.map((s) => (
                <span key={s} className="cs-tag">
                  {s}
                </span>
              ))}
            </div>

            <section className="cs-sec">
              <h3>{t.problem}</h3>
              <Paras text={cs.problem} />
            </section>

            <section className="cs-sec">
              <h3>{t.context}</h3>
              <Paras text={cs.context} />
              <p className="cs-role">
                <b>{t.role}</b> {cs.myRole}
              </p>
            </section>

            <section className="cs-sec">
              <h3>{t.decisions}</h3>
              <ol className="cs-decisions">
                {cs.decisions.map((d, i) => (
                  <li key={i} className="cs-decision">
                    <p className="cs-d-head">{d.decision}</p>
                    <p className="cs-d-line">
                      <span className="cs-d-label">{t.why}</span> {d.why}
                    </p>
                    <p className="cs-d-line">
                      <span className="cs-d-label cs-d-rej">{t.rejected}</span> {d.rejected}
                    </p>
                    <p className="cs-d-line">
                      <span className="cs-d-label cs-d-trade">{t.tradeoff}</span> {d.tradeoff}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="cs-sec">
              <h3>{t.build}</h3>
              <Paras text={cs.build} />
            </section>

            <section className="cs-sec">
              <h3>{t.evals}</h3>
              <Paras text={cs.evals} />
            </section>

            <section className="cs-sec">
              <h3>{t.limitations}</h3>
              <Paras text={cs.limitations} />
            </section>

            <section className="cs-sec">
              <h3>{t.results}</h3>
              <Paras text={cs.results} />
            </section>

            <section className="cs-sec">
              <h3>{t.principle}</h3>
              <Paras text={cs.principle} />
            </section>

            <a
              href="#top"
              className="cs-back-top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {t.backTop}
            </a>
          </div>
        </details>
      ))}

      {SECONDARY.length > 0 && (
        <section className="cs-more">
          <h2 className="cs-more-h">{t.more}</h2>
          <p className="cs-more-sub">{t.moreSub}</p>
          <div className="cs-more-grid">
            {SECONDARY.map((s) => (
              <div key={s.slug} className="cs-card">
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <div className="cs-stack">
                  {s.stack.map((t) => (
                    <span key={t} className="cs-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="cs-foot">
        <p>
          Want the depth behind any of these?{" "}
          <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a>
        </p>
        <Link to="/" className="cv-back">
          ← back to kamiljan.com
        </Link>
      </div>
    </div>
  );
}
