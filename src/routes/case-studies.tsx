import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { FEATURED, SECONDARY, type CaseStudy } from "../data/caseStudies";

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
  name: "Kamil Jan Włodarczyk — Engineering Case Studies",
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
      { title: "Kamil Jan Włodarczyk — Case Studies" },
      {
        name: "description",
        content:
          "Engineering case studies by Kamil Jan Włodarczyk — AI automation & implementation engineer. How real production systems were built: the problem, the decisions and rejected alternatives, how I knew it worked, and the honest trade-offs.",
      },
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/case-studies" }],
  }),
  component: CaseStudiesPage,
});

/** Render a long field that may contain blank-line-separated paragraphs. */
function Paras({ text }: { text: string }) {
  const parts = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <>
      {parts.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
}

function CaseStudiesPage() {
  // Open a collapsed study when it's linked from the TOC or a shared #hash.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el && el.tagName === "DETAILS") {
        (el as HTMLDetailsElement).open = true;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className="cv-page">
      <div className="read-progress" aria-hidden="true" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CS_SCHEMA) }}
      />
      <div className="cv-bar">
        <Link to="/" className="cv-back">
          ← kamiljan.com
        </Link>
        <a href="/cv" className="cv-download">
          View CV →
        </a>
      </div>

      <header className="cs-head">
        <h1>Case studies</h1>
        <p className="cs-intro">
          How a few of these systems were actually built — the problem, the decisions I made and the
          alternatives I rejected, how I knew it worked, and what I'd do differently. Tap any one to
          read it in full.
        </p>
        <nav className="cs-toc-grid" aria-label="Case studies">
          {FEATURED.map((cs, i) => (
            <a key={cs.slug} href={`#${cs.slug}`} className="cs-toc-card">
              <span className="cs-toc-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="cs-toc-body">
                <span className="cs-toc-title">{cs.title}</span>
                <span className="cs-toc-preview">{cs.resultsPreview}</span>
                <span className="cs-toc-meta">
                  {cs.stack.slice(0, 3).map((s) => (
                    <span key={s} className="cs-tag">
                      {s}
                    </span>
                  ))}
                  <span className="cs-toc-time">{readMins(cs)} min</span>
                </span>
              </span>
            </a>
          ))}
        </nav>
      </header>

      {FEATURED.map((cs) => (
        <details key={cs.slug} id={cs.slug} className="cs-fold">
          <summary className="cs-fold-sum">
            <div className="cs-fold-main">
              <h2>{cs.title}</h2>
              <p className="cs-fold-preview">{cs.resultsPreview}</p>
              <div className="cs-stack">
                {cs.stack.slice(0, 6).map((s) => (
                  <span key={s} className="cs-tag">
                    {s}
                  </span>
                ))}
                {cs.stack.length > 6 && (
                  <span className="cs-tag cs-tag-more">+{cs.stack.length - 6}</span>
                )}
              </div>
              <span className="cs-fold-time">{readMins(cs)} min read</span>
            </div>
            <span className="cs-chev" aria-hidden="true">
              ▾
            </span>
          </summary>

          <div className="cs-fold-body">
            <section className="cs-sec">
              <h3>The problem</h3>
              <Paras text={cs.problem} />
            </section>

            <section className="cs-sec">
              <h3>Context &amp; constraints</h3>
              <Paras text={cs.context} />
              <p className="cs-role">
                <b>My role.</b> {cs.myRole}
              </p>
            </section>

            <section className="cs-sec">
              <h3>The decisions that mattered</h3>
              <ol className="cs-decisions">
                {cs.decisions.map((d, i) => (
                  <li key={i} className="cs-decision">
                    <p className="cs-d-head">{d.decision}</p>
                    <p className="cs-d-line">
                      <span className="cs-d-label">Why</span> {d.why}
                    </p>
                    <p className="cs-d-line">
                      <span className="cs-d-label cs-d-rej">Rejected</span> {d.rejected}
                    </p>
                    <p className="cs-d-line">
                      <span className="cs-d-label cs-d-trade">Trade-off</span> {d.tradeoff}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="cs-sec">
              <h3>Building &amp; deploying it</h3>
              <Paras text={cs.build} />
            </section>

            <section className="cs-sec">
              <h3>How I knew it worked</h3>
              <Paras text={cs.evals} />
            </section>

            <section className="cs-sec">
              <h3>What didn't work</h3>
              <Paras text={cs.limitations} />
            </section>

            <section className="cs-sec">
              <h3>Results &amp; impact</h3>
              <Paras text={cs.results} />
            </section>

            <section className="cs-sec">
              <h3>What I'd carry forward</h3>
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
              ↑ Back to top
            </a>
          </div>
        </details>
      ))}

      {SECONDARY.length > 0 && (
        <section className="cs-more">
          <h2 className="cs-more-h">More work</h2>
          <p className="cs-more-sub">Shorter write-ups — same honesty, less depth.</p>
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
