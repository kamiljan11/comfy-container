import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Hero3D from "./Hero3D";
import ChatBot from "./ChatBot";
import { useLang } from "../hooks/useLang";
import { PainGrid, SolutionTabs } from "./OfferSections";
import { T, type Lang } from "../i18n";
import { localizeYears } from "../lib/years";
import { SketchPortrait } from "./SketchPortrait";

/* ── Rotating colored hero word ── */
const HERO_ROT: Record<Lang, string[]> = {
  // what a company gets, not what I do ("Your business. Less …"); kept short so
  // the line never overflows on a phone
  en: ["manual work.", "chaos.", "retyping.", "overhead.", "guesswork."],
  pl: ["ręcznej pracy.", "chaosu.", "przepisywania.", "kosztów.", "zgadywania."],
};
function RotatingWord({ lang }: { lang: Lang }) {
  const words = HERO_ROT[lang];
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <em className="hero-rot">
      <span key={i} className="hero-rot-in">
        {words[i]}
      </span>
    </em>
  );
}

/* ── Count-up stat ── */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  // start at the REAL value so SSR/SEO/no-JS never shows "0+" (signal, not noise);
  // the client resets to 0 on mount and animates up
  const [count, setCount] = useState(value);
  useEffect(() => {
    // start straight from page load — hero stats are above the fold, no scroll gating
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(value);
      return;
    }
    setCount(0);
    const dur = 1600;
    let t0: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(step);
      else setCount(value);
    };
    // small delay so the count rises in sync with the hero stats fading in
    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, 750);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <div>
      <div className="hero-stat-val">
        {count}
        <span>{suffix}</span>
      </div>
      <div className="hero-stat-lbl">{label}</div>
    </div>
  );
}

/* ── Scroll progress ── */
function ScrollProg() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div ref={barRef} className="scroll-prog" />;
}

/* ── Marquee strip ── */
const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "TanStack",
  "Supabase",
  "Cloudflare Workers",
  "Vercel",
  "Python",
  "n8n",
  "MCP",
  "RAG",
  "Pinecone",
  "OpenAI",
  "RetellAI",
  "Twilio",
  "fal.ai",
  "Playwright",
  "Meta Ads",
  "Google Ads",
];

function Marquee() {
  const items = [...STACK, ...STACK];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((s, i) => (
          <span key={i} className="marquee-item">
            {s}
            <span className="marquee-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Static structural data ── */
const PROJECT_META = [
  {
    num: "01",
    logo: "/logos/masgroup.webp",
    name: "MAS Group",
    tags: ["Operations", "B2B"],
    year: "2021–now",
    href: "https://github.com/kamiljan11/mas-group" as string | null,
  },
  {
    num: "02",
    logo: "/logos/flyt.webp",
    name: "Flyt",
    tags: ["Marketplace", "SaaS"],
    year: "2026",
    href: "https://github.com/kamiljan11/flyt-marketplace" as string | null,
  },
  {
    num: "03",
    logo: "/logos/quickfix.webp",
    name: "QuickFix",
    tags: ["Brand", "Growth"],
    year: "2026",
    href: "https://github.com/kamiljan11/quickfix-iceland" as string | null,
  },
  {
    num: "04",
    logo: "/logos/sleipnir.webp",
    name: "Sleipnir Glacier Tours",
    tags: ["Tourism", "Operations"],
    year: "2022–2024",
    // no public repo for Sleipnir, so no link (the project list points at GitHub, not live sites)
    href: null as string | null,
  },
  {
    num: "05",
    logo: "/logos/reykjawwwik.svg",
    name: "Reykjawwwik",
    tags: ["Agency", "Product"],
    year: "2026",
    href: "https://github.com/kamiljan11/reykjawwwik-platform" as string | null,
  },
  {
    num: "06",
    logo: "/logos/ekomoc.webp",
    name: "Ekomoc CRM",
    tags: ["SaaS", "CRM"],
    year: "2026",
    href: "https://github.com/kamiljan11/ekomoc" as string | null,
  },
  {
    num: "07",
    logo: "/logos/mountaincar-garage.webp",
    name: "Workshop 3.0",
    tags: ["SaaS", "AI"],
    year: "2026",
    href: "https://github.com/kamiljan11/mas-warsztat" as string | null,
  },
];

const CAP_NUMS = ["01", "02", "03", "04"];

const ENGAGE_META = [
  { href: "#contact", featured: true },
  { href: "#contact", featured: false },
  { href: "#contact", featured: false },
  { href: "mailto:hello@kamiljan.com", featured: false },
];

/**
 * Two pages from one body. `offer` is the homepage — what a company gets, then
 * the proof (Work) and a way to get in touch. `about` is /o-mnie — who Kamil
 * is: About, capabilities, ways to work together, the books. Kamil's split:
 * Work stays on the homepage, everything personal moves to /o-mnie.
 * The server language follows ssrLangFor: English on /, Polish on /o-mnie.
 */
export function HomePage({ variant }: { variant: "offer" | "about" }) {
  const isOffer = variant === "offer";
  const [lang] = useLang(isOffer ? "en" : "pl");
  const [openEngage, setOpenEngage] = useState<number | null>(0);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const onBtnMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const b = btnRef.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    b.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
  };
  const onBtnLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "";
  };

  const t = T[lang];

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".work-row, .cap-card, .engage-card");
    const labels = document.querySelectorAll<HTMLElement>(".section-label");
    const heads = document.querySelectorAll<HTMLElement>(".contact-h2");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (el.matches(".section-label")) el.classList.add("label-in");
            else if (el.matches(".contact-h2")) el.classList.add("h2-in");
            else {
              const idx = Array.from(el.parentElement?.children ?? []).indexOf(el);
              el.style.transitionDelay = `${idx * 0.06}s`;
              el.classList.add("visible");
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    [...cards, ...labels, ...heads].forEach((el) => observer.observe(el));
    // safety net — never leave anything stuck hidden if the observer misses
    const safety = setTimeout(() => {
      cards.forEach((el) => el.classList.add("visible"));
      labels.forEach((el) => el.classList.add("label-in"));
      heads.forEach((el) => el.classList.add("h2-in"));
    }, 1400);
    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, []);

  // cursor-follow glow on capability/engage cards (desktop only, one passive listener)
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest(
        ".cap-card, .engage-card",
      ) as HTMLElement | null;
      const glow = card?.querySelector<HTMLElement>(".card-glow");
      if (!card || !glow) return;
      const r = card.getBoundingClientRect();
      glow.style.setProperty("--mx", `${e.clientX - r.left}px`);
      glow.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div>
      <ScrollProg />

      {isOffer && (
        <>
          {/* ── Hero ── */}
          <section className="hero">
            <div className="hero-canvas-wrap">
              <Hero3D />
            </div>
            <div className="aurora" aria-hidden="true" />
            <div className="hero-fade-top" />
            <div className="hero-fade-bottom" />
            <div className="hero-content">
              <p className="hero-eyebrow">{t.hero.eyebrow}</p>
              <h1 className="hero-h1">
                <span className="line-mask">
                  <span className="line-in">{t.hero.h1a}</span>
                </span>
                <span className="line-mask">
                  <span className="line-in">{t.hero.h1b}</span>
                </span>
                <span className="line-mask">
                  <span className="line-in">
                    <RotatingWord lang={lang} />
                  </span>
                </span>
              </h1>
              <p className="hero-sub">{t.hero.sub}</p>
              <div className="hero-actions">
                <Link
                  ref={btnRef}
                  to="/kontakt"
                  className="btn-primary"
                  onMouseMove={onBtnMove}
                  onMouseLeave={onBtnLeave}
                >
                  {t.hero.cta}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <a href="#work" className="btn-ghost">
                  {t.hero.ctaGhost}
                </a>
              </div>
              <p className="hero-partner">{t.hero.partner}</p>
              <div className="hero-stats">
                <StatCounter value={6} suffix="+" label={t.stats[0]} />
                <StatCounter value={12} suffix="+" label={t.about.meta[0]} />
              </div>
            </div>
          </section>

          {/* ── Tech marquee ── */}
          <Marquee />

          {/* ── Offer: the problem first, then the ways it gets solved ── */}
          <PainGrid lang={lang} />
          <SolutionTabs lang={lang} />
        </>
      )}

      {!isOffer && (
        <header className="omnie-head">
          <div className="container">
            <p className="hero-eyebrow">{t.hero.eyebrow}</p>
            <h1 className="omnie-h1">Kamil Jan</h1>
            <div className="hero-stats">
              <StatCounter value={6} suffix="+" label={t.stats[0]} />
              <StatCounter value={12} suffix="+" label={t.about.meta[0]} />
            </div>
          </div>
        </header>
      )}

      {!isOffer && (
        <>
          {/* ── About ── */}
          <section className="about" id="about">
            <div className="container">
              <span className="section-label">{t.about.label}</span>
              <div className="about-grid">
                <div className="about-inner">
                  <p className="about-p">
                    {t.about.p1a}
                    <strong>{t.about.p1b}</strong>
                    {t.about.p1c}
                    <strong>{t.about.p1d}</strong>
                    {t.about.p1e}
                  </p>
                </div>
                <div className="about-photo-wrap">
                  <div className="about-photo">
                    <img
                      src="/kamil-suit.webp"
                      alt="Kamil Jan"
                      loading="lazy"
                      decoding="async"
                      width="675"
                      height="900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {isOffer && (
        <>
          {/* ── Work ── */}
          <section className="work" id="work">
            <div className="container">
              <span className="section-label">{t.work.label}</span>
              <div className="work-table">
                {PROJECT_META.map((p, i) => {
                  const outcome = t.projects[i]?.outcome ?? "";
                  const inner = (
                    <>
                      <div className="work-logo">
                        <img
                          src={p.logo}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          width="36"
                          height="36"
                        />
                      </div>
                      <div>
                        <div className="work-name">{p.name}</div>
                        <div className="work-outcome">{outcome}</div>
                      </div>
                      <div className="work-tags">
                        {p.tags.map((tag) => (
                          <span key={tag} className="work-tag">
                            {tag}
                          </span>
                        ))}
                        {/* a row that opens a GitHub write-up says so; a live product link does not */}
                        {p.href?.startsWith("https://github.com/") ? (
                          <span className="work-tag">GitHub</span>
                        ) : null}
                      </div>
                      <div className="work-year">{localizeYears(p.year, lang)}</div>
                      {p.href ? (
                        <svg
                          className="work-arrow"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M2 7h10M8 3l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </>
                  );
                  if (p.href) {
                    return (
                      <a
                        key={p.num}
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={
                          p.href.startsWith("https://github.com/")
                            ? `${p.name} (GitHub)`
                            : undefined
                        }
                        className="work-row work-row-link"
                      >
                        {inner}
                      </a>
                    );
                  }
                  return (
                    <div key={p.num} className="work-row">
                      {inner}
                    </div>
                  );
                })}
              </div>
              <div className="work-swipe-hint">{lang === "pl" ? "Przesuń" : "Swipe"} →</div>
              <div style={{ marginTop: 22, textAlign: "center" }}>
                <a href="/case-studies" className="btn-ghost">
                  {lang === "pl" ? "Czytaj pełne case studies" : "Read the full case studies"} →
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {!isOffer && (
        <>
          {/* ── Capabilities ── */}
          <section className="cap" id="capabilities">
            <div className="container">
              <span className="section-label">{t.capabilities.label}</span>
              <div className="cap-grid">
                {t.caps.map((c, i) => (
                  <div key={i} className="cap-card">
                    <div className="card-glow" aria-hidden="true" />
                    <div className="cap-head">
                      <div className="cap-num">{CAP_NUMS[i]}</div>
                      <h3 className="cap-title">{c.title}</h3>
                    </div>
                    <div className="cap-body">
                      <div className="cap-body-inner">
                        <div className="cap-desc">{c.desc}</div>
                        <div className="cap-tags">
                          {c.tags.map((tag) => (
                            <span key={tag} className="cap-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Engage ── */}
          <section className="engage" id="engage">
            <div className="container">
              <span className="section-label">{t.engage.label}</span>
              <div className="engage-grid">
                {ENGAGE_META.map((meta, i) => {
                  const e = t.engageModes[i];
                  return (
                    <div
                      key={i}
                      className={`engage-card${meta.featured ? " featured" : ""}${openEngage === i ? " expanded" : ""}`}
                    >
                      <div className="card-glow" aria-hidden="true" />
                      <button
                        className="engage-head"
                        onClick={() => setOpenEngage(openEngage === i ? null : i)}
                        aria-expanded={openEngage === i}
                      >
                        <div>
                          <div className="engage-mode">{e?.mode}</div>
                          <div className="engage-title">{e?.title}</div>
                        </div>
                        <svg
                          className="engage-chevron"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 6l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div className="engage-body">
                        <div className="engage-body-inner">
                          <div className="engage-desc">{e?.desc}</div>
                          <div className="engage-detail">{e?.detail}</div>
                          <a href={meta.href} className="engage-cta">
                            {e?.cta}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path
                                d="M2 7h10M8 3l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Contact ── */}
      <section className="contact" id="contact" ref={contactRef}>
        <SketchPortrait sectionRef={contactRef} />
        <div className="container">
          <div className="contact-inner">
            <h2 className="contact-h2">
              <span className="line-mask">
                <span className="line-in">{t.contact.h2}</span>
              </span>
            </h2>
            <p className="contact-sub">{t.contact.sub}</p>
            <a href="mailto:hello@kamiljan.com" className="contact-email">
              hello@kamiljan.com
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3 9h12M10 4l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <div className="contact-alts">
              {t.contact.findMe}
              <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              &middot;
              <a href="https://github.com/kamiljan11" target="_blank" rel="noreferrer">
                GitHub
              </a>
              &middot;
              <a href="/cv">CV</a>
            </div>
            <div className="contact-sig">
              <img
                src="/signature.webp"
                alt="Kamil Jan signature"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── AI assistant (chat) ── */}
      <ChatBot lang={lang} />
    </div>
  );
}
