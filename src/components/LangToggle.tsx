import { useId } from "react";
import { type Lang } from "../i18n";

/**
 * Language switch shared by every standalone page. The flags and the
 * resolve-then-persist logic were copy-pasted across three routes; a fourth
 * copy for the service pages was the point to pull it out.
 *
 * The clip path id is generated per instance — two hardcoded copies of the
 * same id on one page would make the first one win for both flags.
 */

export function FlagPL() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15" className="flag-svg" aria-hidden="true">
      <rect width="22" height="15" rx="2.5" fill="#fff" />
      <path d="M0 7.5h22V12.5a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 0 12.5V7.5Z" fill="#dc143c" />
    </svg>
  );
}

export function FlagGB() {
  const clip = useId();
  return (
    <svg width="22" height="15" viewBox="0 0 60 30" className="flag-svg" aria-hidden="true">
      <clipPath id={clip}>
        <rect width="60" height="30" rx="5" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function LangToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button type="button" className="lang-toggle" onClick={onToggle} aria-label="Switch language">
      {lang === "en" ? <FlagGB /> : <FlagPL />}
    </button>
  );
}
