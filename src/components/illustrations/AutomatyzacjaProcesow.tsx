import { Frame, type DrawingProps, type Copy } from "./Frame";

/** Person retyping between systems versus one flow — hero drawing for /uslugi/automatyzacja-procesow. */

const COPY: Copy = {
  pl: {
    title: "Ręczne przepisywanie między systemami kontra jeden przepływ",
    desc: "Po lewej pracownik przy klawiaturze ręcznie przepisuje dane między CRM, magazynem i księgowością, a na drodze stoją znaki błędu i zegar czekania; po prawej te same trzy systemy spina jeden automatyczny przepływ zakończony znakiem poprawności, z osobną ścieżką wyjątku, która wysyła widoczny alert do człowieka.",
  },
  en: {
    title: "Person retyping between systems versus one flow",
    desc: "On the left a person at a keyboard retypes data between CRM, warehouse and accounting, with error marks and a clock showing mistakes and waiting; on the right the same three systems feed one automated flow that ends in a check mark, with a separate exception path raising a visible alert to a human.",
  },
};

export function AutomatyzacjaProcesow({ lang }: DrawingProps) {
  return (
    <Frame id="automatyzacja-procesow" copy={COPY[lang]}>
      <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect
          x="16"
          y="32"
          width="272"
          height="300"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border, #1f2f3d)"
        />
        <rect
          x="352"
          y="32"
          width="272"
          height="300"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border, #1f2f3d)"
        />
        <path d="M300 182 H340" stroke="var(--teal, #22d3ee)" />
        <path d="M340 182 l-7 -4 M340 182 l-7 4" stroke="var(--teal, #22d3ee)" />
        <rect x="40" y="62" width="76" height="44" rx="8" stroke="var(--text-2, #94a3b8)" />
        <rect x="40" y="160" width="76" height="44" rx="8" stroke="var(--text-2, #94a3b8)" />
        <rect x="40" y="258" width="76" height="44" rx="8" stroke="var(--text-2, #94a3b8)" />
        <path d="M116 84 C150 84 148 112 176 112" stroke="var(--text-2, #94a3b8)" />
        <path d="M116 182 C150 182 148 160 176 160" stroke="var(--text-2, #94a3b8)" />
        <path d="M116 280 C150 280 148 208 176 208" stroke="var(--text-2, #94a3b8)" />
        <path
          d="M176 112 l-7 -4 M176 112 l-7 4 M176 160 l-7 -4 M176 160 l-7 4 M176 208 l-7 -4 M176 208 l-7 4"
          stroke="var(--text-2, #94a3b8)"
        />
        <circle cx="206" cy="120" r="15" stroke="var(--teal-2, #67e8f9)" />
        <path d="M180 178 c0-16 12-26 26-26 s26 10 26 26" stroke="var(--teal-2, #67e8f9)" />
        <rect x="176" y="190" width="60" height="18" rx="8" stroke="var(--text-2, #94a3b8)" />
        <path
          d="M184 196 h10 M200 196 h12 M218 196 h10 M188 202 h36"
          stroke="var(--text-2, #94a3b8)"
        />
        <circle
          cx="140"
          cy="84"
          r="10"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
        />
        <circle
          cx="140"
          cy="280"
          r="10"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
        />
        <circle cx="250" cy="284" r="16" stroke="var(--text-2, #94a3b8)" />
        <path d="M250 274 V284 H258" stroke="var(--text-2, #94a3b8)" />
        <rect x="368" y="64" width="58" height="34" rx="8" stroke="var(--text-2, #94a3b8)" />
        <rect x="368" y="149" width="58" height="34" rx="8" stroke="var(--text-2, #94a3b8)" />
        <rect x="368" y="234" width="58" height="34" rx="8" stroke="var(--text-2, #94a3b8)" />
        <path
          d="M426 81 C446 81 444 166 452 166 M426 166 H452 M426 251 C446 251 444 166 452 166"
          stroke="var(--teal, #22d3ee)"
        />
        <path d="M452 166 l-7 -4 M452 166 l-7 4" stroke="var(--teal, #22d3ee)" />
        <rect
          x="456"
          y="144"
          width="66"
          height="44"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--teal, #22d3ee)"
        />
        <circle cx="489" cy="166" r="9" stroke="var(--teal-2, #67e8f9)" />
        <path
          d="M498 166 h5 M495 160 l3 -3 M489 157 v-5 M483 160 l-3 -3 M480 166 h-5 M483 172 l-3 3 M489 175 v5 M495 172 l3 3"
          stroke="var(--teal-2, #67e8f9)"
        />
        <path
          className="ill-flow"
          d="M522 166 H548"
          stroke="var(--teal-2, #67e8f9)"
          strokeDasharray="6 6"
        />
        <path d="M550 166 l-7 -4 M550 166 l-7 4" stroke="var(--teal-2, #67e8f9)" />
        <circle cx="578" cy="166" r="24" stroke="var(--teal, #22d3ee)" />
        <path d="M567 166 l7 8 l14 -17" stroke="var(--teal-2, #67e8f9)" />
        <path d="M489 188 V252" stroke="var(--text-2, #94a3b8)" />
        <path d="M489 254 l18 32 H471 z" stroke="var(--teal-2, #67e8f9)" />
        <path d="M513 274 H541" stroke="var(--text-2, #94a3b8)" />
        <path d="M543 274 l-7 -4 M543 274 l-7 4" stroke="var(--text-2, #94a3b8)" />
        <circle cx="560" cy="262" r="9" stroke="var(--text-2, #94a3b8)" />
        <path d="M548 288 c0-10 6-16 12-16 s12 6 12 16" stroke="var(--text-2, #94a3b8)" />
      </g>
      <g fontFamily="inherit" fontSize="13" textAnchor="middle" fill="var(--text-2, #94a3b8)">
        <text x="78" y="89">
          CRM
        </text>
        <text x="78" y="187">
          WMS
        </text>
        <text x="78" y="285">
          ERP
        </text>
        <text x="140" y="89">
          !
        </text>
        <text x="140" y="285">
          !
        </text>
        <text x="397" y="86">
          CRM
        </text>
        <text x="397" y="171">
          WMS
        </text>
        <text x="397" y="256">
          ERP
        </text>
        <text x="489" y="282" fill="var(--teal-2, #67e8f9)">
          !
        </text>
      </g>
    </Frame>
  );
}
