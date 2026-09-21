import { Frame, type DrawingProps, type Copy } from "./Frame";

/** Manual copy-paste between tools versus one synced flow — hero drawing for /uslugi/integracje. */

const COPY: Copy = {
  pl: {
    title: "Ręczne przepisywanie między narzędziami kontra jeden przepływ",
    desc: "Po lewej człowiek ręcznie przenosi dane między trzema niepołączonymi systemami (CRM, ERP i WMS), nad nim znak ostrzegawczy; po prawej te same trzy systemy zasilają jeden automatyczny przepływ synchronizacji, potwierdzony znakiem zaznaczenia.",
  },
  en: {
    title: "Manual copy-paste between tools versus one synced flow",
    desc: "On the left a person carries data by hand between three disconnected systems (CRM, ERP and WMS), under a warning sign; on the right the same three systems feed one automatic sync flow confirmed by a check mark.",
  },
};

export function Integracje({ lang }: DrawingProps) {
  return (
    <Frame id="integracje" copy={COPY[lang]}>
      <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect
          x="24"
          y="36"
          width="268"
          height="288"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border, #1f2f3d)"
        />
        <rect
          x="348"
          y="36"
          width="268"
          height="288"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border, #1f2f3d)"
        />
        <g stroke="var(--text-2, #94a3b8)">
          <rect x="44" y="72" width="84" height="52" rx="8" />
          <rect x="44" y="154" width="84" height="52" rx="8" />
          <rect x="44" y="236" width="84" height="52" rx="8" />
          <g opacity=".5">
            <path d="M81 134 91 144M91 134 81 144" />
            <path d="M81 216 91 226M91 216 81 226" />
          </g>
          <path d="M132 98 186 140" />
          <path d="M177 138 186 140 181 131" />
          <path d="M132 180H186" />
          <path d="M178 176 186 180 178 184" />
          <path d="M186 220 132 262" />
          <path d="M137 253 132 262 142 260" />
          <circle cx="232" cy="128" r="13" />
          <path d="M208 170c0-13.3 10.7-24 24-24s24 10.7 24 24" />
          <rect x="188" y="160" width="20" height="26" rx="3" />
          <rect x="258" y="160" width="20" height="26" rx="3" />
          <path d="M193 169h10M193 176h10M263 169h10M263 176h10" opacity=".7" />
          <path d="M252 68 263 88H241Z" />
          <path d="M252 75V80" />
          <circle cx="252" cy="84" r="1.2" fill="var(--text-2, #94a3b8)" />
        </g>
        <g stroke="var(--teal, #22d3ee)">
          <path d="M304 180H338" />
          <path d="M330 174 338 180 330 186" />
          <rect x="368" y="72" width="84" height="52" rx="8" />
          <rect x="368" y="154" width="84" height="52" rx="8" />
          <rect x="368" y="236" width="84" height="52" rx="8" />
          <path className="ill-flow" strokeDasharray="6 6" d="M456 98C482 98 478 140 496 166" />
          <path className="ill-flow" strokeDasharray="6 6" d="M456 180H496" />
          <path className="ill-flow" strokeDasharray="6 6" d="M456 262C482 262 478 220 496 194" />
        </g>
        <g stroke="var(--teal-2, #67e8f9)">
          <rect x="496" y="152" width="80" height="56" rx="8" fill="var(--surface, #0e1e2a)" />
          <circle cx="576" cy="208" r="14" fill="var(--surface, #0e1e2a)" />
          <path d="M569 208 574 213 584 202" />
        </g>
      </g>
      <g fontFamily="inherit" fontSize="13" textAnchor="middle" letterSpacing=".5">
        <g fill="var(--text-2, #94a3b8)">
          <text x="86" y="103">
            CRM
          </text>
          <text x="86" y="185">
            ERP
          </text>
          <text x="86" y="267">
            WMS
          </text>
        </g>
        <g fill="var(--teal-2, #67e8f9)">
          <text x="410" y="103">
            CRM
          </text>
          <text x="410" y="185">
            ERP
          </text>
          <text x="410" y="267">
            WMS
          </text>
          <text x="536" y="185" letterSpacing="1.5">
            SYNC
          </text>
        </g>
      </g>
    </Frame>
  );
}
