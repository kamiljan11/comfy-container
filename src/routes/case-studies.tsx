import { createFileRoute, Link } from '@tanstack/react-router'
import { FEATURED, SECONDARY } from '../data/caseStudies'

export const Route = createFileRoute('/case-studies')({
  head: () => ({
    meta: [
      { title: 'Kamil Jan Włodarczyk — Case Studies' },
      {
        name: 'description',
        content:
          'Engineering case studies by Kamil Jan Włodarczyk — AI automation & implementation engineer. How real production systems were built: the problem, the decisions and rejected alternatives, how I knew it worked, and the honest trade-offs.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://kamiljan.com/case-studies' }],
  }),
  component: CaseStudiesPage,
})

/** Render a long field that may contain blank-line-separated paragraphs. */
function Paras({ text }: { text: string }) {
  const parts = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  return (
    <>
      {parts.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  )
}

function CaseStudiesPage() {
  return (
    <div className="cv-page">
      <div className="cv-bar">
        <Link to="/" className="cv-back">← kamiljan.com</Link>
        <a href="/cv" className="cv-download">View CV →</a>
      </div>

      <header className="cs-head">
        <h1>Case studies</h1>
        <p className="cs-intro">
          How a few of these systems were actually built — the problem, the decisions I made and the alternatives I
          rejected, how I knew it worked, and what I'd do differently. No invented metrics; private numbers stay private.
        </p>
        <nav className="cs-toc" aria-label="Case studies">
          {FEATURED.map((cs) => (
            <a key={cs.slug} href={`#${cs.slug}`}>
              {cs.title}
            </a>
          ))}
        </nav>
      </header>

      {FEATURED.map((cs) => (
        <article key={cs.slug} id={cs.slug} className="cs-paper">
          <h2>{cs.title}</h2>
          <p className="cs-preview">{cs.resultsPreview}</p>

          <div className="cs-stack">
            {cs.stack.map((s) => (
              <span key={s} className="cs-tag">{s}</span>
            ))}
          </div>

          <section className="cs-sec">
            <h3>The problem</h3>
            <Paras text={cs.problem} />
          </section>

          <section className="cs-sec">
            <h3>Context &amp; constraints</h3>
            <Paras text={cs.context} />
            <p className="cs-role"><b>My role.</b> {cs.myRole}</p>
          </section>

          <section className="cs-sec">
            <h3>The decisions that mattered</h3>
            <ol className="cs-decisions">
              {cs.decisions.map((d, i) => (
                <li key={i} className="cs-decision">
                  <p className="cs-d-head">{d.decision}</p>
                  <p className="cs-d-line"><span className="cs-d-label">Why</span> {d.why}</p>
                  <p className="cs-d-line"><span className="cs-d-label cs-d-rej">Rejected</span> {d.rejected}</p>
                  <p className="cs-d-line"><span className="cs-d-label cs-d-trade">Trade-off</span> {d.tradeoff}</p>
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

          <a href="#top" className="cs-back-top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            ↑ Back to top
          </a>
        </article>
      ))}

      <section className="cs-more">
        <h2 className="cs-more-h">More work</h2>
        <p className="cs-more-sub">Shorter writes-ups — same honesty, less depth.</p>
        <div className="cs-more-grid">
          {SECONDARY.map((s) => (
            <div key={s.slug} className="cs-card">
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
              <div className="cs-stack">
                {s.stack.map((t) => (
                  <span key={t} className="cs-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="cs-foot">
        <p>Want the depth behind any of these? <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a></p>
        <Link to="/" className="cv-back">← back to kamiljan.com</Link>
      </div>
    </div>
  )
}
