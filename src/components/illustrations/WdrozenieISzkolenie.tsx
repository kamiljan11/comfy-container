import { Frame, type DrawingProps, type Copy } from "./Frame";

/** From an unused system to a working team — hero drawing for /uslugi/wdrozenie-i-szkolenie. */

const COPY: Copy = {
  pl: {
    title: "Od nieużywanego systemu do zespołu, który pracuje",
    desc: "Trzy etapy: gotowy system stoi nieużywany, a człowiek wraca do arkusza; potem nauka na własnych danych z instrukcjami, które zostają; na końcu cały zespół pracuje w jednym systemie oznaczonym znakiem zgodności.",
  },
  en: {
    title: "From an unused system to a working team",
    desc: "Three stages: a finished system sits unused while a person goes back to the spreadsheet; then training on your own data with short materials that stay; finally the whole team works in one system marked with a check.",
  },
};

export function WdrozenieISzkolenie({ lang }: DrawingProps) {
  return (
    <Frame id="wdrozenie-i-szkolenie" copy={COPY[lang]}>
      <g
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily="inherit"
      >
        <rect
          x="24"
          y="64"
          width="176"
          height="232"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border, #1f2f3d)"
        />
        <rect
          x="232"
          y="64"
          width="176"
          height="232"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border, #1f2f3d)"
        />
        <rect
          x="440"
          y="64"
          width="176"
          height="232"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border, #1f2f3d)"
        />
        <g stroke="none" fill="var(--text-2, #94a3b8)" fontSize="13" textAnchor="middle">
          <text x="112" y="92">
            1
          </text>
          <text x="320" y="92">
            2
          </text>
          <text x="528" y="92">
            3
          </text>
        </g>
        <g stroke="var(--text-2, #94a3b8)" transform="translate(12,8)">
          <rect x="52" y="104" width="96" height="60" rx="8" />
          <path d="M68 126H118M68 142H104M100 164v12M80 176h40" />
          <circle cx="62" cy="206" r="8" />
          <path d="M49 230a13 13 0 0 1 26 0" />
          <rect x="96" y="196" width="56" height="44" rx="8" />
          <path d="M115 196v44M134 196v44M96 212h56M96 226h56" />
          <path className="ill-flow" strokeDasharray="4 4" d="M140 168c4 12 -4 18 -14 22" />
          <path d="M132 182l-6 8l10 1" />
        </g>
        <g stroke="var(--teal, #22d3ee)" transform="translate(0,8)">
          <rect x="260" y="104" width="96" height="60" rx="8" />
          <path d="M308 164v12M288 176h40" />
          <circle cx="272" cy="206" r="8" />
          <path d="M259 230a13 13 0 0 1 26 0" />
          <circle cx="310" cy="206" r="8" />
          <path d="M297 230a13 13 0 0 1 26 0" />
          <g stroke="var(--teal-2, #67e8f9)">
            <path d="M276 122H330M276 134H318M276 146H326" />
            <rect x="332" y="192" width="48" height="54" rx="6" />
            <path d="M342 210h28M342 224h20" />
          </g>
        </g>
        <g stroke="var(--teal, #22d3ee)" transform="translate(12,8)">
          <rect x="468" y="104" width="96" height="60" rx="8" />
          <path d="M516 164v12M496 176h40" />
          <path stroke="var(--teal-2, #67e8f9)" strokeWidth="2" d="M492 134l13 14l23-27" />
          <circle cx="478" cy="206" r="8" />
          <path d="M465 230a13 13 0 0 1 26 0" />
          <circle cx="516" cy="206" r="8" />
          <path d="M503 230a13 13 0 0 1 26 0" />
          <circle cx="554" cy="206" r="8" />
          <path d="M541 230a13 13 0 0 1 26 0" />
        </g>
        <g stroke="var(--teal, #22d3ee)" strokeWidth="2" transform="translate(0,8)">
          <path className="ill-flow" strokeDasharray="4 4" d="M202 180h28" />
          <path d="M225 175l6 5l-6 5" />
          <path className="ill-flow" strokeDasharray="4 4" d="M410 180h28" />
          <path d="M433 175l6 5l-6 5" />
        </g>
      </g>
    </Frame>
  );
}
