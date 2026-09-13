import { useRef, useState, type KeyboardEvent } from "react";
import { T, type Lang } from "../i18n";
import { SERVICES, pickHomePains } from "../data/services";

/**
 * The homepage's offer block, in the order a buyer thinks: first the problem
 * they recognise, then the ways it gets solved. Both read from SERVICES, so
 * the /uslugi pages stay the single source of the copy — editing a service
 * there updates the card and the tab here.
 *
 * Links carry ?lang= because the homepage can be in a language that was only
 * set by the URL and never saved, and /uslugi would otherwise fall back to the
 * browser language.
 */

const serviceHref = (slug: string, lang: Lang) => `/uslugi/${slug}?lang=${lang}`;

export function PainGrid({ lang }: { lang: Lang }) {
  const t = T[lang].pains;
  const pains = pickHomePains(SERVICES[lang]);
  return (
    <section className="pains" id="problems">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="offer-title">{t.title}</h2>
        <p className="offer-lead">{t.lead}</p>
        <div className="pains-grid">
          {pains.map((p) => (
            <a key={p.slug} className="pain-card" href={serviceHref(p.slug, lang)}>
              <span className="pain-tag">{p.tag}</span>
              <h3 className="pain-title">{p.title}</h3>
              <p className="pain-body">{p.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEP: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

export function SolutionTabs({ lang }: { lang: Lang }) {
  const t = T[lang].solutions;
  const list = SERVICES[lang];
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = list[active] ?? list[0];
  if (!current) return null;
  const proof = current.proofs[0];

  // roving tabindex: arrows move between tabs, Tab leaves the list
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = STEP[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + list.length) % list.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="solutions" id="solutions">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="offer-title">{t.title}</h2>
        <p className="offer-lead">{t.lead}</p>
        <div className="sol-wrap">
          <div className="sol-tabs" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
            {list.map((s, i) => (
              <button
                key={s.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`sol-tab-${s.slug}`}
                aria-selected={i === active}
                aria-controls="sol-panel"
                tabIndex={i === active ? 0 : -1}
                className={`sol-tab${i === active ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="sol-num">{String(i + 1).padStart(2, "0")}</span>
                {s.navLabel}
              </button>
            ))}
          </div>
          <div
            className="sol-panel"
            role="tabpanel"
            id="sol-panel"
            aria-labelledby={`sol-tab-${current.slug}`}
          >
            <span className="sol-eyebrow">{current.eyebrow}</span>
            <h3 className="sol-h">{current.h1}</h3>
            <p className="sol-lead">{current.lead}</p>
            {proof && (
              <div className="sol-proof">
                <span className="sol-proof-label">
                  {t.proofLabel} · {proof.sector}
                </span>
                <strong>{proof.title}</strong>
                <span>{proof.metric}</span>
              </div>
            )}
            <a className="btn-primary sol-cta" href={serviceHref(current.slug, lang)}>
              {t.more}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
