import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouterState } from "@tanstack/react-router";
import { type Lang } from "../i18n";
import { SERVICES } from "../data/services";
import { useLang, ssrLangFor } from "../hooks/useLang";
import { LangToggle } from "./LangToggle";

/**
 * The one header for every page. It used to live inside the homepage, so the
 * subpages had a "← kamiljan.com" link instead of a menu — the menu vanished
 * the moment anyone left the landing page.
 *
 * Dropdowns open on click, not hover (Kamil's call, and it is also the only
 * behaviour that works the same with a mouse, a keyboard and a finger), close
 * on Escape, on a click outside and on navigation. Below 900px the same items
 * become a full-screen sheet with the groups as accordions.
 */

type Menu = "services" | "about";

type Copy = {
  nav: string;
  services: string;
  allServices: string;
  cases: string;
  blog: string;
  about: string;
  aboutItems: Array<{ href: string; label: string; hint: string }>;
  cta: string;
  menu: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    nav: "Main",
    services: "Services",
    allServices: "All services",
    cases: "Case studies",
    blog: "Blog",
    about: "About",
    aboutItems: [
      { href: "/#about", label: "About me", hint: "Who I am and how I work" },
      { href: "/cv", label: "CV", hint: "Roles, companies, experience" },
      { href: "/claude", label: "AI system", hint: "How I build with AI agents" },
    ],
    cta: "Free consultation",
    menu: "Menu",
  },
  pl: {
    nav: "Główne",
    services: "Usługi",
    allServices: "Wszystkie usługi",
    cases: "Realizacje",
    blog: "Blog",
    about: "O mnie",
    aboutItems: [
      { href: "/#about", label: "O mnie", hint: "Kim jestem i jak pracuję" },
      { href: "/cv", label: "CV", hint: "Role, firmy, doświadczenie" },
      { href: "/claude", label: "System AI", hint: "Jak buduję z agentami AI" },
    ],
    cta: "Bezpłatna konsultacja",
    menu: "Menu",
  },
};

function Chevron() {
  return (
    <svg className="nav-dd-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path
        d="M2 3.5 5 6.5 8 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [lang, toggleLang] = useLang(ssrLangFor(pathname));
  const t = COPY[lang];
  const services = SERVICES[lang];

  const [open, setOpen] = useState<Menu | null>(null);
  const [sheet, setSheet] = useState(false);
  const [sheetGroup, setSheetGroup] = useState<Menu | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttons = useRef<Record<Menu, HTMLButtonElement | null>>({ services: null, about: null });

  // a new page closes whatever was open
  useEffect(() => {
    setOpen(null);
    setSheet(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      buttons.current[open]?.focus();
      setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheet]);

  const toggle = (m: Menu) => setOpen((o) => (o === m ? null : m));
  const current = (p: string) =>
    pathname === p || pathname.startsWith(`${p}/`) ? "page" : undefined;
  const svcHref = (slug: string) => `/uslugi/${slug}?lang=${lang}`;
  // an in-page link (/#about on the homepage) does not change the path, so the
  // pathname effect would leave the sheet covering the section it jumped to
  const closeSheetOnLink = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest("a")) setSheet(false);
  };

  return (
    <>
      <div
        id="site-menu"
        className={`mobile-menu${sheet ? " open" : ""}`}
        onClick={closeSheetOnLink}
      >
        <div className="mm-group">
          <button
            type="button"
            className="mm-toggle"
            aria-expanded={sheetGroup === "services"}
            aria-controls="mm-services"
            onClick={() => setSheetGroup((g) => (g === "services" ? null : "services"))}
          >
            {t.services}
            <Chevron />
          </button>
          <div className="mm-sub" id="mm-services" hidden={sheetGroup !== "services"}>
            {services.map((s) => (
              <a key={s.slug} href={svcHref(s.slug)}>
                {s.navLabel}
              </a>
            ))}
            <a href="/uslugi" className="mm-all">
              {t.allServices} →
            </a>
          </div>
        </div>
        <a href="/case-studies">{t.cases}</a>
        <a href="/blog">{t.blog}</a>
        <div className="mm-group">
          <button
            type="button"
            className="mm-toggle"
            aria-expanded={sheetGroup === "about"}
            aria-controls="mm-about"
            onClick={() => setSheetGroup((g) => (g === "about" ? null : "about"))}
          >
            {t.about}
            <Chevron />
          </button>
          <div className="mm-sub" id="mm-about" hidden={sheetGroup !== "about"}>
            {t.aboutItems.map((a) => (
              <a key={a.href} href={a.href}>
                {a.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mobile-menu-divider" />
        <a href="/kontakt" className="mobile-menu-cta">
          {t.cta}
        </a>
      </div>

      <nav className="nav" ref={navRef} aria-label={t.nav}>
        <a href="/" className="nav-sig-wrap" aria-label="Kamil Jan">
          <img src="/signature.webp" alt="Kamil Jan" className="nav-sig" />
        </a>
        <ul className="nav-links">
          <li className="nav-dd">
            <button
              ref={(el) => {
                buttons.current.services = el;
              }}
              type="button"
              className="nav-dd-btn"
              aria-expanded={open === "services"}
              aria-controls="dd-services"
              onClick={() => toggle("services")}
            >
              {t.services}
              <Chevron />
            </button>
            <div id="dd-services" className={`nav-dd-panel${open === "services" ? " open" : ""}`}>
              {services.map((s) => (
                <a key={s.slug} className="nav-dd-item" href={svcHref(s.slug)}>
                  <strong>{s.navLabel}</strong>
                  <span>{s.micro[0]}</span>
                </a>
              ))}
              <a className="nav-dd-all" href="/uslugi">
                {t.allServices} →
              </a>
            </div>
          </li>
          <li>
            <a href="/case-studies" aria-current={current("/case-studies")}>
              {t.cases}
            </a>
          </li>
          <li>
            <a href="/blog" aria-current={current("/blog")}>
              {t.blog}
            </a>
          </li>
          <li className="nav-dd">
            <button
              ref={(el) => {
                buttons.current.about = el;
              }}
              type="button"
              className="nav-dd-btn"
              aria-expanded={open === "about"}
              aria-controls="dd-about"
              onClick={() => toggle("about")}
            >
              {t.about}
              <Chevron />
            </button>
            <div
              id="dd-about"
              className={`nav-dd-panel nav-dd-narrow${open === "about" ? " open" : ""}`}
            >
              {t.aboutItems.map((a) => (
                <a key={a.href} className="nav-dd-item" href={a.href}>
                  <strong>{a.label}</strong>
                  <span>{a.hint}</span>
                </a>
              ))}
            </div>
          </li>
        </ul>
        <div className="nav-right">
          <LangToggle lang={lang} onToggle={toggleLang} />
          <a href="/kontakt" className="nav-cta" aria-current={current("/kontakt")}>
            {t.cta}
          </a>
          <button
            type="button"
            className={`hamburger${sheet ? " open" : ""}`}
            onClick={() => setSheet((o) => !o)}
            aria-label={t.menu}
            aria-expanded={sheet}
            aria-controls="site-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </>
  );
}
