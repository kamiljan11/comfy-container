import { Frame, type DrawingProps, type Copy } from "./Frame";

/** Three intake channels, one record, the decision stays human — hero drawing for /obszary/hr-i-rekrutacja. */

const COPY: Copy = {
  pl: {
    title: "Trzy źródła zgłoszeń, jedna karta, decyzja u człowieka",
    desc: "Po lewej zgłoszenia ze skrzynki, arkusza i portalu z ogłoszeniami schodzą się na jednej osobie, która przepisuje je ręcznie, więc ten sam kandydat trafia do bazy dwa razy. Po prawej te same trzy źródła wpadają jednym obiegiem do wspólnej karty kandydata, duplikat zostaje scalony, a sprawa idzie nazwanymi etapami do człowieka, który podejmuje decyzję. Automat porządkuje dane, nie ocenia ludzi.",
  },
  en: {
    title: "Three intake channels, one record, the decision stays human",
    desc: "On the left, applications from an inbox, a spreadsheet and a job board all land on one person who retypes them by hand, so the same candidate ends up in the database twice. On the right the same three sources flow into one shared candidate record, the duplicate is merged, and the case moves through named stages to a person who makes the decision. The automation tidies the data; it does not judge people.",
  },
};

export function HrIRekrutacja({ lang }: DrawingProps) {
  return (
    <Frame id="hr-i-rekrutacja" copy={COPY[lang]}>
      <g
        fill="none"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily="inherit"
        fontSize="14"
      >
        <rect
          x="16"
          y="40"
          width="272"
          height="284"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border-2, #2b3640)"
        />
        <rect
          x="352"
          y="40"
          width="272"
          height="284"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border-2, #2b3640)"
        />
        <g stroke="var(--text-2, #7fb5c8)" strokeOpacity="0.6" fillOpacity="0.6">
          <rect x="40" y="70" width="56" height="40" rx="8" />
          <path d="M54 82h28v16h-28zM54 82l14 10 14-10" />
          <rect x="40" y="150" width="56" height="40" rx="8" />
          <path d="M54 162h28v16h-28zM54 170h28M68 162v16" />
          <rect x="40" y="230" width="56" height="40" rx="8" />
          <path d="M52 242h32v18h-32zM52 248h32M56 254h12" />
          <path d="M100 90L136 124" />
          <path d="M144 131 L134 127 L139 121 Z" fill="var(--text-2, #7fb5c8)" stroke="none" />
          <path d="M100 170L134 162" />
          <path d="M144 160 L135 166 L133 158 Z" fill="var(--text-2, #7fb5c8)" stroke="none" />
          <path d="M100 250L139 188" />
          <path d="M144 180 L142 191 L135 186 Z" fill="var(--text-2, #7fb5c8)" stroke="none" />
          <circle cx="168" cy="138" r="11" />
          <path d="M150 170c0-10 8-18 18-18s18 8 18 18" />
          <path d="M184 171L191 211" />
          <path d="M192 220 L187 210 L195 210 Z" fill="var(--text-2, #7fb5c8)" stroke="none" />
          <path d="M178 172L197 248" />
          <path d="M200 258 L194 249 L201 247 Z" fill="var(--text-2, #7fb5c8)" stroke="none" />
          <rect
            x="196"
            y="206"
            width="76"
            height="44"
            rx="8"
            fill="var(--surface-2, #122530)"
            fillOpacity="1"
          />
          <circle cx="214" cy="228" r="7" />
          <path d="M228 222h30M228 234h18" />
          <path d="M238 250L246 262" strokeDasharray="4 4" />
          <rect
            x="204"
            y="262"
            width="76"
            height="44"
            rx="8"
            fill="var(--surface-2, #122530)"
            fillOpacity="1"
          />
          <circle cx="222" cy="284" r="7" />
          <path d="M236 278h30M236 290h18" />
        </g>
        <path d="M300 182h30" stroke="var(--teal-2, #22d3ee)" />
        <path d="M338 182 L328 176 L328 188 Z" fill="var(--teal-2, #22d3ee)" />
        <g stroke="var(--teal, #0891b2)">
          <rect x="372" y="66" width="40" height="28" rx="8" />
          <path d="M382 74h20v12h-20zM382 74l10 7 10-7" />
          <rect x="372" y="110" width="40" height="28" rx="8" />
          <path d="M382 118h20v12h-20zM382 124h20M392 118v12" />
          <rect x="372" y="154" width="40" height="28" rx="8" />
          <path d="M381 162h22v13h-22zM381 166h22" />
          <rect x="466" y="86" width="148" height="64" rx="8" />
        </g>
        <path
          className="ill-flow"
          d="M416 80C426 88 428 104 433 120"
          stroke="var(--teal-2, #22d3ee)"
          strokeDasharray="6 6"
        />
        <path
          className="ill-flow"
          d="M416 124h16"
          stroke="var(--teal-2, #22d3ee)"
          strokeDasharray="6 6"
        />
        <path
          className="ill-flow"
          d="M416 168C426 160 428 144 433 128"
          stroke="var(--teal-2, #22d3ee)"
          strokeDasharray="6 6"
        />
        <g stroke="var(--teal-2, #22d3ee)">
          <circle cx="438" cy="124" r="6" />
          <path d="M444 124h16" />
          <rect x="460" y="92" width="148" height="64" rx="8" fill="var(--surface-2, #122530)" />
          <circle cx="486" cy="124" r="11" />
          <path d="M508 112h80M508 124h80M508 136h48" />
        </g>
        <path
          className="ill-flow"
          d="M466 158C440 178 400 180 396 203"
          stroke="var(--teal-2, #22d3ee)"
          strokeDasharray="6 6"
        />
        <path d="M396 212 L392 202 L400 202 Z" fill="var(--teal-2, #22d3ee)" />
        <g stroke="var(--teal-2, #22d3ee)">
          <rect x="372" y="214" width="48" height="36" rx="8" />
          <rect x="442" y="214" width="48" height="36" rx="8" />
          <rect x="512" y="214" width="48" height="36" rx="8" />
          <path d="M424 232h6M494 232h6M564 232h4" />
          <circle cx="596" cy="216" r="11" />
          <path d="M578 248c0-10 8-18 18-18s18 8 18 18" />
        </g>
        <g fill="var(--teal-2, #22d3ee)">
          <path d="M438 232 L429 228 L429 236 Z" />
          <path d="M508 232 L499 228 L499 236 Z" />
          <path d="M574 232 L565 228 L565 236 Z" />
          <g stroke="none" textAnchor="middle" fontSize="13">
            <text x="396" y="237">
              1
            </text>
            <text x="466" y="237">
              2
            </text>
            <text x="536" y="237">
              3
            </text>
          </g>
        </g>
      </g>
    </Frame>
  );
}
