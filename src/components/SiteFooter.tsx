import { Link, useRouterState } from "@tanstack/react-router";
import { T, type Lang } from "../i18n";
import { SERVICES } from "../data/services";
import { AREAS } from "../data/areas";
import { ABOUT_ITEMS } from "../data/siteMap";
import { useLang, ssrLangFor } from "../hooks/useLang";

/**
 * One footer for every route, rendered by __root next to SiteHeader. It used
 * to exist only on the homepage, so every subpage ended in nothing.
 *
 * The link lists come from the same data as the header menu (SERVICES, AREAS,
 * ABOUT_ITEMS), so a page added there shows up here without a second edit.
 * The tagline is the homepage hero line, for the same reason.
 */

type Copy = {
  services: string;
  allServices: string;
  areas: string;
  allAreas: string;
  about: string;
  cases: string;
  blog: string;
  contact: string;
  cta: string;
  place: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    services: "Services",
    allServices: "All services",
    areas: "Areas",
    allAreas: "All areas",
    about: "About",
    cases: "Case studies",
    blog: "Blog",
    contact: "Contact",
    cta: "Free consultation",
    place: "Reykjavík, Iceland · remote-first",
  },
  pl: {
    services: "Usługi",
    allServices: "Wszystkie usługi",
    areas: "Obszary",
    allAreas: "Wszystkie obszary",
    about: "O mnie",
    cases: "Realizacje",
    blog: "Blog",
    contact: "Kontakt",
    cta: "Bezpłatna konsultacja",
    place: "Reykjavík, Islandia · praca zdalna",
  },
};

export function SiteFooter() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [lang] = useLang(ssrLangFor(pathname));
  const t = COPY[lang];
  // the "About" menu also has #anchors into /o-mnie; the footer lists pages only
  const aboutPages = ABOUT_ITEMS[lang].filter((a) => !a.hash);

  return (
    <footer className="sf">
      <div className="sf-grid">
        <div className="sf-brand">
          <Link to="/" aria-label="Kamil Jan">
            <img src="/signature.webp" alt="" className="sf-sig" loading="lazy" decoding="async" />
          </Link>
          <p className="sf-tag">{T[lang].hero.sub}</p>
          <Link to="/kontakt" className="btn-primary sf-cta">
            {t.cta}
          </Link>
        </div>

        <nav className="sf-col" aria-label={t.services}>
          <h2 className="sf-h">{t.services}</h2>
          <ul>
            {SERVICES[lang].map((s) => (
              <li key={s.slug}>
                <Link to="/uslugi/$slug" params={{ slug: s.slug }}>
                  {s.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/uslugi" className="sf-all">
                {t.allServices} →
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="sf-col" aria-label={t.areas}>
          <h2 className="sf-h">{t.areas}</h2>
          <ul>
            {AREAS[lang].map((a) => (
              <li key={a.slug}>
                <Link to="/obszary/$slug" params={{ slug: a.slug }}>
                  {a.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/obszary" className="sf-all">
                {t.allAreas} →
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="sf-col" aria-label={t.about}>
          <h2 className="sf-h">{t.about}</h2>
          <ul>
            {aboutPages.map((a) => (
              <li key={a.to}>
                <Link to={a.to}>{a.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/case-studies">{t.cases}</Link>
            </li>
            <li>
              <Link to="/blog">{t.blog}</Link>
            </li>
          </ul>
        </nav>

        <div className="sf-col">
          <h2 className="sf-h">{t.contact}</h2>
          <ul>
            <li>
              <a href="mailto:hello@kamiljan.com">hello@kamiljan.com</a>
            </li>
            <li>
              <a href="https://wa.me/3548888901" target="_blank" rel="noreferrer">
                WhatsApp +354 8888901
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/kamiljan11" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/kamiljan11" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="sf-bottom">
        <span>&copy; {new Date().getFullYear()} Kamil Jan Włodarczyk</span>
        <span>{t.place}</span>
      </div>
    </footer>
  );
}
