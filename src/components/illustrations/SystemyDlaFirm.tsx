import { Frame, type DrawingProps, type Copy } from "./Frame";

/** Three versions of one number versus one source — hero drawing for /uslugi/systemy-dla-firm. */

const COPY: Copy = {
  pl: {
    title: "Trzy wersje tej samej liczby kontra jedno źródło",
    desc: "Po lewej arkusz, czat i notatka pokazują trzy różne kwoty, a osoba przepisuje je między nimi; po prawej jedna baza zasila telefon i ścieżkę etapów zakończoną potwierdzeniem.",
  },
  en: {
    title: "Three versions of one number versus one source",
    desc: "On the left a spreadsheet, a chat thread and a paper note each show a different amount while a person retypes between them; on the right one database feeds a phone and a stage rail ending in a check mark.",
  },
};

export function SystemyDlaFirm({ lang }: DrawingProps) {
  return (
    <Frame id="systemy-dla-firm" copy={COPY[lang]}>
      <g
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily="inherit"
      >
        <g stroke="var(--text-2, #94a3b8)">
          <rect x="24" y="44" width="104" height="60" rx="8" fill="var(--surface, #0e1e2a)" />
          <path d="M24 64h104M24 84h104M58 44v60" strokeOpacity=".5" />
          <rect x="24" y="150" width="104" height="60" rx="8" fill="var(--surface, #0e1e2a)" />
          <rect x="36" y="160" width="46" height="16" rx="8" strokeOpacity=".5" />
          <rect x="52" y="182" width="28" height="15" rx="7.5" strokeOpacity=".5" />
          <rect x="24" y="256" width="104" height="60" rx="8" fill="var(--surface, #0e1e2a)" />
          <path d="M38 270h50M38 282h64M38 294h28" strokeOpacity=".5" />
          <circle cx="236" cy="139" r="13" fill="var(--surface, #0e1e2a)" />
          <path d="M212 178c0-13 10.7-24 24-24s24 11 24 24" />
          <path d="M216 170l-14 16M256 170l14 16" />
          <rect x="196" y="186" width="80" height="11" rx="4" fill="var(--surface, #0e1e2a)" />
        </g>
        <g stroke="var(--text-2, #94a3b8)" strokeDasharray="5 5" className="ill-flow">
          <path d="M134 74C176 78 196 92 221 124" />
          <path d="M134 183h54" />
          <path d="M134 286c42-6 54-40 62-80" />
        </g>
        <g stroke="var(--text-2, #94a3b8)">
          <path d="M212 120L221 124 219 114" />
          <path d="M182 178L188 183 182 188" />
          <path d="M190 214L196 206 199 216" />
        </g>
        <g fill="var(--text-2, #94a3b8)" fontSize="14" textAnchor="end">
          <text x="118" y="98">
            4800
          </text>
          <text x="118" y="204">
            4300
          </text>
          <text x="118" y="310">
            4080
          </text>
        </g>
        <g stroke="var(--teal-2, #67e8f9)">
          <path d="M290 180h38" />
          <path d="M322 174L328 180 322 186" />
        </g>
        <rect
          x="348"
          y="44"
          width="268"
          height="272"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--teal, #22d3ee)"
          strokeOpacity=".55"
        />
        <g stroke="var(--teal-2, #67e8f9)">
          <path d="M372 86v30a24 8 0 0 0 48 0V86" />
          <ellipse cx="396" cy="86" rx="24" ry="8" fill="var(--surface, #0e1e2a)" />
          <path d="M372 100a24 8 0 0 0 48 0" strokeOpacity=".5" />
        </g>
        <rect
          x="524"
          y="72"
          width="58"
          height="112"
          rx="10"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--teal-2, #67e8f9)"
        />
        <rect
          x="532"
          y="84"
          width="42"
          height="88"
          rx="6"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".45"
        />
        <text x="553" y="118" fontSize="14" textAnchor="middle" fill="var(--teal-2, #67e8f9)">
          4800
        </text>
        <path d="M542 142l7 8 14-16" stroke="var(--teal-2, #67e8f9)" strokeWidth="2" />
        <path d="M540 160h28" stroke="var(--text-2, #94a3b8)" strokeOpacity=".45" />
        <g stroke="var(--teal-2, #67e8f9)" strokeDasharray="5 5" className="ill-flow">
          <path d="M426 100h90" />
          <path d="M396 126C396 180 382 196 374 230" />
        </g>
        <g stroke="var(--teal-2, #67e8f9)">
          <path d="M510 94L516 100 510 106" />
          <path d="M380 224L374 230 371 221" />
        </g>
        <path d="M372 246h88" stroke="var(--teal-2, #67e8f9)" />
        <path d="M460 246h119" stroke="var(--text-2, #94a3b8)" strokeOpacity=".45" />
        <g fill="var(--teal-2, #67e8f9)">
          <circle cx="372" cy="246" r="5.5" />
          <circle cx="416" cy="246" r="5.5" />
          <circle cx="460" cy="246" r="5.5" />
        </g>
        <circle cx="460" cy="246" r="11" stroke="var(--teal-2, #67e8f9)" strokeOpacity=".6" />
        <g fill="var(--surface, #0e1e2a)" stroke="var(--text-2, #94a3b8)" strokeOpacity=".6">
          <circle cx="504" cy="246" r="5.5" />
          <circle cx="548" cy="246" r="5.5" />
        </g>
        <circle
          cx="592"
          cy="246"
          r="13"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--teal-2, #67e8f9)"
        />
        <path d="M585 246l5 6 10-12" stroke="var(--teal-2, #67e8f9)" strokeWidth="2" />
      </g>
    </Frame>
  );
}
