import { Frame, type DrawingProps, type Copy } from "./Frame";

/** From spreadsheet exceptions to rules in the database — hero drawing for /obszary/nietypowe-procesy-ai. */

const COPY: Copy = {
  pl: {
    title: "Od arkusza z wyjątkami do reguł w bazie",
    desc: "Po lewej jedna osoba przepisuje dane w kółko między arkuszem z doklejoną kolumną na wyjątki, karteczką i mailem; po prawej jeden przepływ: zgłoszenie, baza pilnująca reguł i kompletny dokument PDF, a model AI zostaje po drugiej stronie granicy, przy samej treści wiadomości.",
  },
  en: {
    title: "From spreadsheet exceptions to rules in the database",
    desc: "On the left one person retypes data back and forth between a spreadsheet with a bolted-on exceptions column, a sticky note and an email; on the right a single flow: the incoming case, a database that enforces the rules and a complete PDF document, while the AI model stays behind a boundary, drafting message wording only.",
  },
};

export function NietypoweProcesyAi({ lang }: DrawingProps) {
  return (
    <Frame id="nietypowe-procesy-ai" copy={COPY[lang]}>
      <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <g stroke="var(--text-2, #7fb5c8)" opacity=".8">
          <rect x="36" y="56" width="124" height="82" rx="8" fill="var(--surface, #0e1e2a)" />
          <path d="M36 80h124M78 80v58M120 80v58" />
          <path d="M46 96h20M88 96h20M130 96h20M46 116h20M88 116h20M130 116h20" opacity=".7" />
          <path d="M160 56h26a8 8 0 0 1 8 8v66a8 8 0 0 1-8 8h-26" strokeDasharray="5 5" />
          <text
            x="177"
            y="103"
            textAnchor="middle"
            fontFamily="inherit"
            fontSize="14"
            fill="var(--text-2, #7fb5c8)"
            stroke="none"
          >
            ?
          </text>
          <g transform="rotate(-8 239 87)">
            <rect x="212" y="62" width="54" height="50" rx="8" fill="var(--surface, #0e1e2a)" />
            <path d="M224 80h30M224 94h20" opacity=".7" />
          </g>
          <rect x="44" y="246" width="76" height="52" rx="8" fill="var(--surface, #0e1e2a)" />
          <path d="M44 254l38 26 38-26" />
          <circle cx="196" cy="222" r="12" fill="var(--surface, #0e1e2a)" />
          <path d="M196 234v14M174 262q22-28 44 0" />
          <path d="M184 208C168 184 152 160 140 142" />
          <path d="M140 142l1 7M140 142l6 4M184 208l-1-7M184 208l-6-4" />
          <path d="M208 212C218 180 226 146 232 118" />
          <path d="M232 118l-4 6M232 118l2 7M208 212l5-5M208 212l-1-7" />
          <path d="M180 250C158 254 138 262 124 268" />
          <path d="M124 268l4-6M124 268l7 1M180 250l-7-2M180 250l-6 4" />
        </g>
        <g stroke="var(--teal-2, #22d3ee)">
          <path d="M284 180h60" strokeDasharray="8 6" />
          <path d="M344 180l-9-6M344 180l-9 6" />
        </g>
        <g stroke="var(--teal-2, #22d3ee)">
          <rect x="368" y="48" width="104" height="44" rx="8" fill="var(--surface, #0e1e2a)" />
          <path d="M382 66h58M382 78h40" stroke="var(--teal, #0891b2)" />
          <path d="M420 96v22M420 118l-5-6M420 118l5-6" />
          <path d="M364 132v50a56 12 0 0 0 112 0v-50" fill="var(--surface, #0e1e2a)" />
          <ellipse cx="420" cy="132" rx="56" ry="12" fill="var(--surface, #0e1e2a)" />
          <text
            x="404"
            y="173"
            textAnchor="middle"
            fontFamily="inherit"
            fontSize="14"
            fill="var(--teal-2, #22d3ee)"
            stroke="none"
          >
            DB
          </text>
          <path d="M436 172l6 7 12-15" strokeWidth="2" />
          <path d="M420 198v24M420 222l-5-6M420 222l5-6" />
          <rect x="380" y="224" width="80" height="92" rx="8" fill="var(--surface, #0e1e2a)" />
          <path d="M442 224v18h18" opacity=".7" />
          <path d="M396 266l14 16 30-36" strokeWidth="2" />
          <text
            x="420"
            y="304"
            textAnchor="middle"
            fontFamily="inherit"
            fontSize="14"
            fill="var(--teal-2, #22d3ee)"
            stroke="none"
          >
            PDF
          </text>
        </g>
        <path d="M498 40v280" stroke="var(--text-2, #7fb5c8)" strokeDasharray="4 8" opacity=".7" />
        <g stroke="var(--teal-2, #22d3ee)">
          <rect x="516" y="52" width="96" height="58" rx="8" fill="var(--surface, #0e1e2a)" />
          <path d="M556 110l8 16 8-16" fill="var(--surface, #0e1e2a)" />
          <path d="M530 74h66M530 88h44" stroke="var(--teal, #0891b2)" />
          <path d="M564 126v50" strokeDasharray="5 5" />
          <rect x="532" y="176" width="64" height="56" rx="8" fill="var(--surface, #0e1e2a)" />
          <path d="M524 192h8M524 214h8M596 192h8M596 214h8" />
          <text
            x="564"
            y="210"
            textAnchor="middle"
            fontFamily="inherit"
            fontSize="14"
            fill="var(--teal-2, #22d3ee)"
            stroke="none"
          >
            AI
          </text>
        </g>
      </g>
    </Frame>
  );
}
