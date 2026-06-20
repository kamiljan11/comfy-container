import { createFileRoute, Link } from '@tanstack/react-router'
import { CASE_STUDIES } from '../data/caseStudies'

export const Route = createFileRoute('/case-studies')({
  head: () => ({
    meta: [
      { title: 'Kamil Jan Włodarczyk — Case Studies' },
      {
        name: 'description',
        content:
          'Engineering case studies by Kamil Jan Włodarczyk — applied / forward-deployed AI engineer. How real production systems were built: the problem, the architecture, the hard parts, and the honest trade-offs.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://kamiljan.com/case-studies' }],
  }),
  component: CaseStudiesPage,
})

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
          How a few of these systems were actually built — the problem, the architecture, the genuinely hard parts,
          and the honest trade-offs. No invented metrics; client names and figures left out on purpose.
        </p>
        <nav className="cs-toc" aria-label="Case studies">
          {CASE_STUDIES.map((cs) => (
            <a key={cs.slug} href={`#${cs.slug}`}>
              {cs.title}
            </a>
          ))}
        </nav>
      </header>

      {CASE_STUDIES.map((cs) => (
        <article key={cs.slug} id={cs.slug} className="cs-paper">
          <h2>{cs.title}</h2>
          <p className="cs-oneliner">{cs.oneLiner}</p>

          <div className="cs-stack">
            {cs.stack.map((s) => (
              <span key={s} className="cs-tag">{s}</span>
            ))}
          </div>

          <p className="cs-role"><b>Role.</b> {cs.role}</p>

          <section className="cs-sec">
            <h3>The problem</h3>
            <p>{cs.problem}</p>
          </section>

          <section className="cs-sec">
            <h3>Approach</h3>
            <p>{cs.approach}</p>
          </section>

          <section className="cs-sec">
            <h3>The hard parts</h3>
            <ul className="cs-hard">
              {cs.hardParts.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </section>

          <section className="cs-sec">
            <h3>Outcome</h3>
            <p>{cs.outcome}</p>
          </section>

          <section className="cs-sec">
            <h3>What I'd do differently</h3>
            <p>{cs.reflection}</p>
          </section>

          <a href="#top" className="cs-back-top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            ↑ Back to top
          </a>
        </article>
      ))}

      <div className="cs-foot">
        <p>Want the depth behind any of these? <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a></p>
        <Link to="/" className="cv-back">← back to kamiljan.com</Link>
      </div>
    </div>
  )
}
