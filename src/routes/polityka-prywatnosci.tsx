import { pageMeta } from "../lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "../hooks/useLang";
import { PRIVACY, PRIVACY_UPDATED } from "../data/privacy";
import { formatDate } from "../lib/formatDate";

/**
 * /polityka-prywatnosci — the GDPR information the consultation form and the
 * chat link to. Content lives in src/data/privacy.ts, written from what the
 * code does; this file only lays it out.
 */

export const Route = createFileRoute("/polityka-prywatnosci")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Polityka prywatności | Kamil Jan",
        description:
          "Jakie dane zbiera kamiljan.com, po co, kto je przetwarza i jakie masz prawa. Administrator: Kamil Jan Włodarczyk.",
        url: "https://kamiljan.com/polityka-prywatnosci",
        locale: "pl_PL",
      }),
    ],
    links: [{ rel: "canonical", href: "https://kamiljan.com/polityka-prywatnosci" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const [lang] = useLang("pl");
  const d = PRIVACY[lang];
  return (
    <div className="svc-page privacy-page">
      <article className="post">
        <h1 className="post-h1">{d.title}</h1>
        <p className="post-lead">{d.lead}</p>
        <p className="privacy-updated">
          {d.updatedLabel}:{" "}
          <time dateTime={PRIVACY_UPDATED}>{formatDate(PRIVACY_UPDATED, lang)}</time>
        </p>
        <div className="post-body">
          {d.sections.map((s) => (
            <section key={s.h}>
              <h2 className="post-h2">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
