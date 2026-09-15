import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { type Lang } from "../i18n";
import { SERVICES } from "../data/services";
import { AREAS } from "../data/areas";
import { useLang, ssrLangFor } from "../hooks/useLang";
import { LangToggle } from "./LangToggle";
import { CommandPalette } from "./CommandPalette";
import { ABOUT_ITEMS } from "../data/siteMap";
import { PALETTE_COPY } from "../lib/palette";
import { useCommandPalette } from "../hooks/useCommandPalette";

/**
 * The one header for every page (ADR 0003). It used to live inside the
 * homepage, so the subpages had a "← kamiljan.com" link instead of a menu —
 * the menu vanished the moment anyone left the landing page.
 *
 * Dropdowns open on click, not hover (Kamil's call, and it is also the only
 * behaviour that works the same with a mouse, a keyboard and a finger), close
 * on Escape, on a click outside and on navigation. Below 900px the same items
 * become a full-screen sheet with the groups as accordions. Internal links are
 * router <Link>s, so moving between pages stays client-side.
 */

type Menu = "services" | "areas" | "about";

type Copy = {
  nav: string;
  services: string;
  allServices: string;
  areas: string;
  allAreas: string;
  cases: string;
  blog: string;
  about: string;
  cta: string;
  menu: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    nav: "Main",
    services: "Services",
    allServices: "All services",
    areas: "Areas",
    allAreas: "All areas",
    cases: "Case studies",
    blog: "Blog",
    about: "About",
    cta: "Free consultation",
    menu: "Menu",
  },
  pl: {
    nav: "Główne",
    services: "Usługi",
    allServices: "Wszystkie usługi",
    areas: "Obszary",
    allAreas: "Wszystkie obszary",
    cases: "Realizacje",
    blog: "Blog",
    about: "O mnie",
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
  const areas = AREAS[lang];
  const aboutItems = ABOUT_ITEMS[lang];
  const paletteCopy = PALETTE_COPY[lang];

  const [open, setOpen] = useState<Menu | null>(null);
  const [sheet, setSheet] = useState(false);
  const [sheetGroup, setSheetGroup] = useState<Menu | null>(null);
  const palette = useCommandPalette();
  const navRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const buttons = useRef<Record<Menu, HTMLButtonElement | null>>({
    services: null,
    areas: null,
    about: null,
  });

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

  // the sheet takes focus when it opens and hands it back to the hamburger on
  // Escape, so a keyboard user always knows where they are
  useEffect(() => {
    if (!sheet) return;
    sheetRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSheet(false);
      hamburgerRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheet]);

  // the palette covers the page, so whatever menu was open closes under it
  useEffect(() => {
    if (!palette.open) return;
    setOpen(null);
    setSheet(false);
  }, [palette.open]);

  const toggle = (m: Menu) => setOpen((o) => (o === m ? null : m));
  const current = (p: string) =>
    pathname === p || pathname.startsWith(`${p}/`) ? "page" : undefined;
  // an in-page link (/#about on the homepage) does not change the path, so the
  // pathname effect would leave the sheet covering the section it jumped to
  const closeSheetOnLink = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest("a")) setSheet(false);
  };

  return (
    <>
      <nav className={`nav${sheet ? " nav-sheet-open" : ""}`} ref={navRef} aria-label={t.nav}>
        <Link to="/" className="nav-sig-wrap" aria-label="Kamil Jan">
          <img src="/signature.webp" alt="Kamil Jan" className="nav-sig" />
        </Link>
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
                <Link
                  key={s.slug}
                  className="nav-dd-item"
                  to="/uslugi/$slug"
                  params={{ slug: s.slug }}
                  onClick={() => setOpen(null)}
                >
                  <strong>{s.navLabel}</strong>
                  <span>{s.micro[0]}</span>
                </Link>
              ))}
              <Link className="nav-dd-all" to="/uslugi" onClick={() => setOpen(null)}>
                {t.allServices} →
              </Link>
            </div>
          </li>
          <li className="nav-dd">
            <button
              ref={(el) => {
                buttons.current.areas = el;
              }}
              type="button"
              className="nav-dd-btn"
              aria-expanded={open === "areas"}
              aria-controls="dd-areas"
              onClick={() => toggle("areas")}
            >
              {t.areas}
              <Chevron />
            </button>
            <div id="dd-areas" className={`nav-dd-panel${open === "areas" ? " open" : ""}`}>
              {areas.map((a) => (
                <Link
                  key={a.slug}
                  className="nav-dd-item"
                  to="/obszary/$slug"
                  params={{ slug: a.slug }}
                  onClick={() => setOpen(null)}
                >
                  <strong>{a.navLabel}</strong>
                  <span>{a.micro[0]}</span>
                </Link>
              ))}
              <Link className="nav-dd-all" to="/obszary" onClick={() => setOpen(null)}>
                {t.allAreas} →
              </Link>
            </div>
          </li>
          <li>
            <Link to="/case-studies" aria-current={current("/case-studies")}>
              {t.cases}
            </Link>
          </li>
          <li>
            <Link to="/blog" aria-current={current("/blog")}>
              {t.blog}
            </Link>
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
              {aboutItems.map((a) => (
                <Link
                  key={a.label}
                  className="nav-dd-item"
                  to={a.to}
                  hash={a.hash}
                  onClick={() => setOpen(null)}
                >
                  <strong>{a.label}</strong>
                  <span>{a.hint}</span>
                </Link>
              ))}
            </div>
          </li>
        </ul>
        <div className="nav-right">
          <button
            type="button"
            className="nav-search"
            onClick={() => {
              palette.setOpen(true);
            }}
            aria-label={paletteCopy.open}
            aria-haspopup="dialog"
            aria-keyshortcuts={palette.shortcut.aria}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <kbd className="nav-search-kbd">{palette.shortcut.label}</kbd>
          </button>
          <LangToggle lang={lang} onToggle={toggleLang} />
          <Link to="/kontakt" className="nav-cta" aria-current={current("/kontakt")}>
            {t.cta}
          </Link>
          <button
            type="button"
            ref={hamburgerRef}
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

      {/* after <nav> on purpose: Tab from the hamburger (the last item in the
          bar) must land in the sheet, not skip past it into the page */}
      <div
        id="site-menu"
        ref={sheetRef}
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
              <Link key={s.slug} to="/uslugi/$slug" params={{ slug: s.slug }}>
                {s.navLabel}
              </Link>
            ))}
            <Link to="/uslugi" className="mm-all">
              {t.allServices} →
            </Link>
          </div>
        </div>
        <div className="mm-group">
          <button
            type="button"
            className="mm-toggle"
            aria-expanded={sheetGroup === "areas"}
            aria-controls="mm-areas"
            onClick={() => setSheetGroup((g) => (g === "areas" ? null : "areas"))}
          >
            {t.areas}
            <Chevron />
          </button>
          <div className="mm-sub" id="mm-areas" hidden={sheetGroup !== "areas"}>
            {areas.map((a) => (
              <Link key={a.slug} to="/obszary/$slug" params={{ slug: a.slug }}>
                {a.navLabel}
              </Link>
            ))}
            <Link to="/obszary" className="mm-all">
              {t.allAreas} →
            </Link>
          </div>
        </div>
        <Link to="/case-studies">{t.cases}</Link>
        <Link to="/blog">{t.blog}</Link>
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
            {aboutItems.map((a) => (
              <Link key={a.label} to={a.to} hash={a.hash}>
                {a.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mobile-menu-divider" />
        <Link to="/kontakt" className="mobile-menu-cta">
          {t.cta}
        </Link>
      </div>

      <CommandPalette
        lang={lang}
        open={palette.open}
        onOpenChange={palette.setOpen}
        onToggleLang={toggleLang}
      />
    </>
  );
}
