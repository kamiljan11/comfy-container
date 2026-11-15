import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../hooks/useLang";
import { CV_CONTENT, type Job } from "../data/cv";
import { inlineSegments } from "../lib/inline";
import { pageMeta } from "../lib/seo";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Kamil Jan Włodarczyk | CV",
        description:
          "CV of Kamil Jan Włodarczyk, AI automation & implementation engineer. Reykjavík, Iceland.",
        url: "https://kamiljan.com/cv",
      }),
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/cv" }],
  }),
  component: CVPage,
});

/** CV text with [label](https://…) links rendered as anchors (src/lib/inline.ts). */
function Inline({ text }: { text: string }) {
  return (
    <>
      {inlineSegments(text).map((s, i) =>
        s.kind === "link" ? (
          <a key={i} href={s.href} target="_blank" rel="noreferrer">
            {s.text}
          </a>
        ) : s.kind === "bold" ? (
          <b key={i}>{s.text}</b>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

/** Links the job title: the org for a role, the name for a project. */
function JobTitle({ job, linkOn }: { job: Job; linkOn: "org" | "role" }) {
  const link = (t: string) =>
    job.url ? (
      <a href={job.url} target="_blank" rel="noreferrer">
        {t}
      </a>
    ) : (
      t
    );
  return (
    <h3>
      {linkOn === "role" ? link(job.role) : job.role}{" "}
      <span>· {linkOn === "org" ? link(job.org) : job.org}</span>
    </h3>
  );
}

function CVPage() {
  const [lang] = useLang("en");

  const cv = CV_CONTENT[lang];

  return (
    <div className="cv-page">
      <div className="read-progress" aria-hidden="true" />
      <div className="cv-bar cv-bar-end">
        <button type="button" className="cv-download" onClick={() => window.print()}>
          {cv.download}
        </button>
      </div>

      <article className="cv-paper cv-pro">
        <header className="cv-head">
          <img
            className="cv-photo"
            src="/kamil-cv.webp"
            alt="Kamil Jan Włodarczyk"
            width={132}
            height={132}
          />
          <div className="cv-head-text">
            <h1>Kamil Jan Włodarczyk</h1>
            <p className="cv-role">{cv.role}</p>
            <p className="cv-contact">
              {cv.contact}
              <br />
              <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a> ·{" "}
              <a href="https://wa.me/3548888901" target="_blank" rel="noreferrer">
                WhatsApp +354 8888901
              </a>
              <br />
              <a href="https://kamiljan.com" target="_blank" rel="noreferrer">
                kamiljan.com
              </a>{" "}
              ·{" "}
              <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">
                linkedin.com/in/kamiljan11
              </a>{" "}
              ·{" "}
              <a href="https://github.com/kamiljan11" target="_blank" rel="noreferrer">
                github.com/kamiljan11
              </a>
            </p>
          </div>
        </header>

        <div className="cv-body">
          <section className="cv-sec">
            <h2>{cv.sec.summary}</h2>
            <p className="cv-summary">
              <Inline text={cv.summary} />
            </p>
          </section>

          <section className="cv-sec">
            <h2>{cv.sec.skills}</h2>
            <ul className="cv-skills">
              {cv.skills.map((s, i) => (
                <li key={i}>
                  <b>{s.label}</b> {s.body}
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-sec">
            <h2>{cv.sec.experience}</h2>
            {cv.experience.map((e) => (
              <div key={e.role + e.org} className="cv-job">
                <div className="cv-job-dates">{e.dates}</div>
                <div className="cv-job-main">
                  <JobTitle job={e} linkOn="org" />
                  {e.loc && <p className="cv-job-loc">{e.loc}</p>}
                  <ul className="cv-bullets">
                    {e.bullets.map((b, i) => (
                      <li key={i}>
                        <Inline text={b} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          <section className="cv-sec">
            <h2>{cv.sec.projects}</h2>
            {cv.projects.map((e) => (
              <div key={e.role + e.org} className="cv-job">
                <div className="cv-job-dates">{e.dates}</div>
                <div className="cv-job-main">
                  <JobTitle job={e} linkOn="role" />
                  {e.loc && <p className="cv-job-loc">{e.loc}</p>}
                  <ul className="cv-bullets">
                    {e.bullets.map((b, i) => (
                      <li key={i}>
                        <Inline text={b} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {cv.education.length > 0 && (
            <section className="cv-sec">
              <h2>{cv.sec.education}</h2>
              <ul className="cv-list">
                {cv.education.map((s, i) => (
                  <li key={i}>
                    <b>{s.label}</b> {s.body}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="cv-sec">
            <h2>{cv.sec.languages}</h2>
            <ul className="cv-list">
              {cv.languages.map((s, i) => (
                <li key={i}>
                  <b>{s.label}</b> {s.body}
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-sec">
            <h2>{cv.sec.openTo}</h2>
            <p>{cv.openTo}</p>
          </section>
        </div>
      </article>
    </div>
  );
}
