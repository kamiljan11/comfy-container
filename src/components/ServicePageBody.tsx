import { useEffect, useLayoutEffect, useRef, type ReactElement, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { type Lang } from "../i18n";
import { type Service } from "../data/services";

/**
 * The body of one service (/uslugi/$slug) or area (/obszary/$slug) page. Both
 * kinds share the Service shape and the same sections; the route only decides
 * the data source and where the "other pages" links point.
 *
 * Pacing follows how a buyer reads: what this is → what hurts → how it is
 * answered → proof it runs somewhere → what working together looks like →
 * the objections → one way to act. Every section is a different visual shape
 * (chips, icon cards, a timeline, metric tiles, a step rail, an accordion)
 * because six stacked card grids read as one long grey block.
 *
 * Landmarks: the hero is a <section>, not a <header>. A <header> here would be
 * a direct descendant of <body> (RootComponent renders <SiteHeader/><Outlet/>
 * with no wrapper) and would therefore register as a second "banner" landmark
 * next to the site bar. The <main> stays: grep of src/ finds no other <main>
 * on these routes, so this supplies the one the page is currently missing.
 *
 * Everything that is not in `s` lives in COPY below, in both languages — a
 * page must never fall back to Polish strings on the English toggle.
 *
 * Motion is progressive enhancement. The markup renders fully visible; the
 * reveal hook only hides what is still below the fold, and only once it is
 * running and can be certain it will bring it back. Under
 * prefers-reduced-motion it hides nothing at all.
 */

type Step = { meta: string; title: string; body: string };

type Copy = {
  ctaPrimary: string;
  ctaSecondary: string;
  proofsEyebrow: string;
  caseStudies: string;
  processEyebrow: string;
  processTitle: string;
  processLead: string;
  steps: Step[];
  faqEyebrow: string;
  finalTitle: string;
  finalLead: string;
  finalNote: string;
};

const COPY: Record<Lang, Copy> = {
  pl: {
    ctaPrimary: "Umów bezpłatną konsultację",
    ctaSecondary: "Zobacz typowe problemy",
    proofsEyebrow: "DOWODY",
    caseStudies: "Pełne opisy wdrożeń z decyzjami i odrzuconymi alternatywami",
    processEyebrow: "WSPÓŁPRACA",
    processTitle: "Jak wygląda współpraca",
    processLead:
      "Cztery kroki. Pierwszy jest bezpłatny i często wystarcza, żeby wiedzieć, czy w ogóle jest o czym rozmawiać.",
    steps: [
      {
        meta: "30 minut · bez zobowiązań",
        title: "Bezpłatna konsultacja",
        body: "Rozmawiamy o jednym procesie: co się w nim dzieje, ile razy w miesiącu i gdzie ucieka czas. Jeśli nie ma tu czego automatyzować, powiem to na tej rozmowie.",
      },
      {
        meta: "Bez zobowiązania do budowy",
        title: "Mapa procesu i wycena",
        body: "Dostajesz proces opisany z zaznaczonymi miejscami strat, proponowany zakres, widełki kosztu i szacowany czas — razem z listą rzeczy, których nie warto ruszać.",
      },
      {
        meta: "Korzyść po każdym etapie",
        title: "Budowa etapami",
        body: "Każdy etap kończy się czymś, co da się włączyć do pracy i ocenić w liczbach, zanim ruszy kolejny. Zamiast kwartału ciszy i jednego dużego uruchomienia.",
      },
      {
        meta: "Materiały zostają u Was",
        title: "Szkolenie, przekazanie i wsparcie",
        body: "Zespół uczy się na Waszych danych, dokumentacja i dostępy zostają po Waszej stronie. Jestem przy pierwszych nietypowych przypadkach — te pojawiają się po starcie, nie w dniu uruchomienia.",
      },
    ],
    faqEyebrow: "WĄTPLIWOŚCI",
    finalTitle: "Zacznijmy od jednego procesu",
    finalLead:
      "Trzydzieści minut wystarczy, żeby powiedzieć, czy jest tu co automatyzować. Jeśli nie ma — usłyszysz to wprost, zanim powstanie jakakolwiek oferta.",
    finalNote: "Bez zobowiązań. Bez oferty, zanim zrozumiem proces.",
  },
  en: {
    ctaPrimary: "Book a free consultation",
    ctaSecondary: "See the usual problems",
    proofsEyebrow: "EVIDENCE",
    caseStudies: "Full write-ups with the decisions and the rejected alternatives",
    processEyebrow: "WORKING TOGETHER",
    processTitle: "How we work together",
    processLead:
      "Four steps. The first one is free and is often enough to know whether there is anything here worth doing.",
    steps: [
      {
        meta: "30 minutes · no obligation",
        title: "A free consultation",
        body: "We go through one process: what happens in it, how many times a month, and where the time goes. If there is nothing here worth automating, I will say so on that call.",
      },
      {
        meta: "No obligation to build",
        title: "Process map and a quote",
        body: "You get the process written down with the losses marked, a proposed scope, a cost range and a time estimate — together with the list of things not worth touching.",
      },
      {
        meta: "A benefit after every stage",
        title: "Built in stages",
        body: "Every stage ends with something that can go into use and be judged in numbers before the next one starts. Instead of a quiet quarter and one large launch.",
      },
      {
        meta: "The materials stay with you",
        title: "Training, handover and support",
        body: "Your team learns on your own data; documentation and access stay on your side. I am there for the first unusual cases — they show up after launch, not on launch day.",
      },
    ],
    faqEyebrow: "SECOND THOUGHTS",
    finalTitle: "Let us start with one process",
    finalLead:
      "Thirty minutes is enough to tell you whether there is anything here worth automating. If there is not, you will hear it plainly, before any proposal exists.",
    finalNote: "No obligation. No proposal before I understand the process.",
  },
};

/* ── Icons ──────────────────────────────────────────────────────────────
   One small line icon per problem tag. Tags come from the data files and are
   a closed set per language (services.ts), but an area page may invent one,
   so an unmapped tag falls back to the neutral mark rather than a gap. */

const ICONS: Record<string, ReactElement> = {
  data: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-13" />
      <path d="M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
    </>
  ),
  speed: (
    <>
      <path d="M3.2 18a8.8 8.8 0 1 1 17.6 0" />
      <path d="M12 18l4.2-5.4" />
      <path d="M3.2 18h3M17.8 18h3" />
    </>
  ),
  flow: (
    <>
      <circle cx="5.2" cy="6" r="2.2" />
      <circle cx="5.2" cy="18" r="2.2" />
      <circle cx="18.8" cy="12" r="2.2" />
      <path d="M7.4 6h4.4a3 3 0 0 1 3 3v.8" />
      <path d="M7.4 18h4.4a3 3 0 0 0 3-3v-.8" />
    </>
  ),
  risk: (
    <>
      <path d="M12 3.6 2.9 19.6h18.2L12 3.6Z" />
      <path d="M12 9.6v4.2" />
      <path d="M12 17.2h.01" />
    </>
  ),
  tool: (
    <>
      <path d="M15.4 3.4a5.2 5.2 0 0 0-6.6 6.6L3 15.8V21h5.2l5.8-5.8a5.2 5.2 0 0 0 6.6-6.6l-3.3 3.3-2.9-.7-.7-2.9 3.3-3.3Z" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M2.6 20.2a6.4 6.4 0 0 1 12.8 0" />
      <path d="M16.2 5.2a3.3 3.3 0 0 1 0 5.9" />
      <path d="M17.6 14.4a6.4 6.4 0 0 1 3.8 5.8" />
    </>
  ),
  team: (
    <>
      <circle cx="12" cy="6.4" r="2.9" />
      <circle cx="5" cy="16.4" r="2.6" />
      <circle cx="19" cy="16.4" r="2.6" />
      <path d="M9.6 8.6 6.6 13.9M14.4 8.6l3 5.3M7.6 17.6h8.8" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4.4" />
      <path d="M12 12h.01" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.6h5.2a2.8 2.8 0 0 1 2.8 2.8V21a2.4 2.4 0 0 0-2.4-2.4H4V4.6Z" />
      <path d="M20 4.6h-5.2A2.8 2.8 0 0 0 12 7.4V21a2.4 2.4 0 0 1 2.4-2.4H20V4.6Z" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.4 13.9 9 19.6 12 13.9 15 12 20.6 10.1 15 4.4 12l5.7-3L12 3.4Z" />
    </>
  ),
};

/** Tag → icon. Both languages, because one component serves both toggles. */
const TAG_ICONS: Record<string, string> = {
  dane: "data",
  data: "data",
  efektywnosc: "speed",
  efficiency: "speed",
  procesy: "flow",
  process: "flow",
  ryzyko: "risk",
  risk: "risk",
  technologia: "tool",
  technology: "tool",
  tooling: "tool",
  narzedzia: "tool",
  zasoby: "people",
  resources: "people",
  people: "people",
  ludzie: "people",
  zespol: "team",
  team: "team",
  strategia: "target",
  strategy: "target",
  wiedza: "book",
  knowledge: "book",
};

/** Diacritics off so "Efektywność" and "Zespół" hit the same keys as plain
 *  ASCII would. ł has no NFD decomposition, hence the explicit replace. The
 *  combining range is written as escapes so the file stays ASCII-safe for
 *  scripts/check-encoding.mjs. */
const normalizeTag = (tag: string) =>
  tag.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

function TagIcon({ tag }: { tag: string }) {
  const key = TAG_ICONS[normalizeTag(tag)] ?? "spark";
  return (
    <svg
      className="sl-ico"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[key] ?? ICONS.spark}
    </svg>
  );
}

function Chevron() {
  return (
    <svg
      className="sl-chev"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ── Motion ─────────────────────────────────────────────────────────────── */

const REVEAL_MS = 700;
const STAGGER_MS = 70;
const MAX_STAGGER = 5;
const FOLD = 0.92;
const SAFETY_MS = 1600;

/** useLayoutEffect warns when it runs on the server; the hide pass only ever
 *  matters in a browser, so fall back to useEffect where there is no window. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const clearReveal = (el: HTMLElement) => {
  el.classList.remove("sl-hidden", "sl-in");
  el.style.removeProperty("--sl-d");
};

/**
 * Scroll reveal, written so that the page is never worse off for having it.
 *
 * Nothing is hidden in the markup or in a stylesheet: the hook adds the
 * hidden class itself, before the first paint, and only to elements that are
 * still below the fold — so no in-view text flashes out and back, and a
 * browser without JS (or a reader with prefers-reduced-motion) gets the plain
 * document. Once an element has finished animating both classes come off
 * again, which keeps the reveal transition from overriding hover transitions.
 *
 * The stagger delay is the element's index WITHIN THE BATCH that crossed the
 * threshold together, not its position among its DOM siblings: a card that
 * scrolls into view alone animates immediately instead of sitting still for
 * 280ms because it happens to be the fifth child of its grid.
 */
function useReveal(rootRef: RefObject<HTMLElement | null>) {
  const nodesRef = useRef<HTMLElement[]>([]);

  // Hide before paint, so a slow device never shows "visible → suddenly gone".
  useIsoLayoutEffect(() => {
    nodesRef.current = [];
    const root = rootRef.current;
    if (!root) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-sl-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * FOLD,
    );
    nodes.forEach((el) => el.classList.add("sl-hidden"));
    nodesRef.current = nodes;

    return () => {
      nodes.forEach(clearReveal);
      nodesRef.current = [];
    };
  }, [rootRef]);

  // Observe and reveal. Runs after the hide pass above.
  useEffect(() => {
    const nodes = nodesRef.current;
    if (nodes.length === 0) return;

    const timers: number[] = [];
    const reveal = (el: HTMLElement, batchIndex: number) => {
      if (!el.classList.contains("sl-hidden") || el.classList.contains("sl-in")) return;
      const delay = Math.min(Math.max(batchIndex, 0), MAX_STAGGER) * STAGGER_MS;
      el.style.setProperty("--sl-d", `${delay}ms`);
      el.classList.add("sl-in");
      timers.push(
        window.setTimeout(
          () => {
            clearReveal(el);
          },
          REVEAL_MS + delay + 80,
        ),
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        // one batch = everything that crossed in this callback, so the
        // stagger reads as a group entrance instead of as lag
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, batchIndex) => {
            io.unobserve(entry.target);
            reveal(entry.target as HTMLElement, batchIndex);
          });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((el) => io.observe(el));

    // safety net: a missed observer must never leave copy invisible
    timers.push(
      window.setTimeout(() => {
        nodes
          .filter((el) => el.classList.contains("sl-hidden") && !el.classList.contains("sl-in"))
          .forEach(reveal);
      }, SAFETY_MS),
    );

    return () => {
      io.disconnect();
      timers.forEach((id) => {
        window.clearTimeout(id);
      });
      nodes.forEach(clearReveal);
    };
  }, [rootRef]);
}

/** Reading progress. Decorative, so it is aria-hidden and costs one rAF. */
function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="sl-prog" aria-hidden="true">
      <span ref={barRef} className="sl-prog-bar" />
    </div>
  );
}

const pad2 = (n: number) => String(n).padStart(2, "0");

/* ── Page ───────────────────────────────────────────────────────────────── */

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
  const rootRef = useRef<HTMLDivElement>(null);
  const t = COPY[lang];
  useReveal(rootRef);

  return (
    <div className="sl" ref={rootRef}>
      <ReadingProgress />

      {/* section, not header: see the landmark note at the top of this file */}
      <section className="sl-hero" aria-labelledby="sl-hero-h">
        <div className="sl-wrap">
          <span className="sl-eyebrow">{s.eyebrow}</span>
          <h1 className="sl-h1" id="sl-hero-h">
            {s.h1}
          </h1>
          <p className="sl-lead">{s.lead}</p>

          <ul className="sl-chips">
            {s.micro.map((m, i) => (
              <li key={`${String(i)}-${m}`} className="sl-chip">
                <span className="sl-chip-dot" aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>

          <div className="sl-actions">
            <Link to="/kontakt" className="sl-btn">
              {t.ctaPrimary}
              <span className="sl-btn-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a href="#sl-problems" className="sl-btn-ghost">
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      <main className="sl-main">
        <section className="sl-sec" id="sl-problems" aria-labelledby="sl-problems-h">
          <div className="sl-wrap">
            <div className="sl-sec-head" data-sl-reveal>
              <span className="sl-eyebrow">{s.problemsEyebrow}</span>
              <h2 className="sl-h2" id="sl-problems-h">
                {s.problemsTitle}
              </h2>
              <p className="sl-sec-lead">{s.problemsLead}</p>
            </div>

            <div className="sl-grid">
              {s.problems.map((p, i) => (
                <article key={`${String(i)}-${p.tag}`} className="sl-card" data-sl-reveal>
                  <div className="sl-card-top">
                    <span className="sl-ico-box" aria-hidden="true">
                      <TagIcon tag={p.tag} />
                    </span>
                    <span className="sl-card-n" aria-hidden="true">
                      {pad2(i + 1)}
                    </span>
                  </div>
                  <span className="sl-tag">{p.tag}</span>
                  <h3 className="sl-card-h3">{p.title}</h3>
                  <p className="sl-card-p">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sl-sec" id="sl-answer" aria-labelledby="sl-answer-h">
          <div className="sl-wrap">
            <div className="sl-sec-head" data-sl-reveal>
              <span className="sl-eyebrow">{s.answerEyebrow}</span>
              <h2 className="sl-h2" id="sl-answer-h">
                {s.answerTitle}
              </h2>
              <p className="sl-sec-lead">{s.answerLead}</p>
            </div>

            <ol className="sl-flow">
              {s.points.map((p, i) => (
                <li key={`${String(i)}-${p.title}`} className="sl-step" data-sl-reveal>
                  <span className="sl-step-badge" aria-hidden="true">
                    {pad2(i + 1)}
                  </span>
                  <div className="sl-step-body">
                    <h3 className="sl-step-h3">{p.title}</h3>
                    <p className="sl-step-p">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {s.proofs.length > 0 && (
          <section className="sl-sec" id="sl-proofs" aria-labelledby="sl-proofs-h">
            <div className="sl-wrap">
              <div className="sl-sec-head" data-sl-reveal>
                <span className="sl-eyebrow">{t.proofsEyebrow}</span>
                <h2 className="sl-h2" id="sl-proofs-h">
                  {s.proofsTitle}
                </h2>
              </div>

              <div className="sl-proofs">
                {s.proofs.map((p, i) => (
                  <article key={`${String(i)}-${p.sector}`} className="sl-proof" data-sl-reveal>
                    <span className="sl-tag sl-tag-teal">{p.sector}</span>
                    <h3 className="sl-proof-h3">{p.title}</h3>
                    <p className="sl-metric">{p.metric}</p>
                  </article>
                ))}
              </div>

              <p className="sl-proof-link">
                <Link to="/case-studies">
                  {t.caseStudies}
                  <span className="sl-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </p>
            </div>
          </section>
        )}

        <section className="sl-sec" id="sl-process" aria-labelledby="sl-process-h">
          <div className="sl-wrap">
            <div className="sl-sec-head" data-sl-reveal>
              <span className="sl-eyebrow">{t.processEyebrow}</span>
              <h2 className="sl-h2" id="sl-process-h">
                {t.processTitle}
              </h2>
              <p className="sl-sec-lead">{t.processLead}</p>
            </div>

            <ol className="sl-proc-grid">
              {t.steps.map((step, i) => (
                <li key={`${String(i)}-${step.title}`} className="sl-proc" data-sl-reveal>
                  <span className="sl-proc-badge" aria-hidden="true">
                    {pad2(i + 1)}
                  </span>
                  <span className="sl-proc-meta">{step.meta}</span>
                  <h3 className="sl-proc-h3">{step.title}</h3>
                  <p className="sl-proc-p">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sl-sec" id="sl-faq" aria-labelledby="sl-faq-h">
          <div className="sl-wrap">
            <div className="sl-sec-head" data-sl-reveal>
              <span className="sl-eyebrow">{t.faqEyebrow}</span>
              <h2 className="sl-h2" id="sl-faq-h">
                {s.faqTitle}
              </h2>
            </div>

            <div className="sl-faq">
              {s.faq.map((f, i) => (
                <details
                  key={`${String(i)}-${f.q}`}
                  className="sl-faq-item"
                  open={i === 0}
                  data-sl-reveal
                >
                  {/* a real h3 so the questions show up in a screen reader's
                      heading list like every other section's subheads */}
                  <summary className="sl-faq-q">
                    <h3 className="sl-faq-q-text">{f.q}</h3>
                    <Chevron />
                  </summary>
                  <p className="sl-faq-a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="sl-sec sl-sec-last" id="sl-cta" aria-labelledby="sl-cta-h">
          <div className="sl-wrap">
            <div className="sl-cta" data-sl-reveal>
              <h2 className="sl-cta-h2" id="sl-cta-h">
                {t.finalTitle}
              </h2>
              <p className="sl-cta-p">{t.finalLead}</p>
              <Link to="/kontakt" className="sl-btn">
                {t.ctaPrimary}
                <span className="sl-btn-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <p className="sl-cta-note">{t.finalNote}</p>
            </div>
          </div>
        </section>
      </main>

      {/* outside <main> on purpose: it is navigation between sibling pages,
          not part of this page's content */}
      <nav className="sl-more" aria-label={othersTitle}>
        <div className="sl-wrap">
          <h2 className="sl-more-h2">{othersTitle}</h2>
          <div className="sl-more-grid">
            {others.map((o) => (
              <Link key={o.slug} to={othersTo} params={{ slug: o.slug }} className="sl-more-link">
                {o.navLabel}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
