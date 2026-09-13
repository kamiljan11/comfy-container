import { Frame, type DrawingProps, type Copy } from "./Frame";

/** The path from lead to invoice: once broken, once closed — hero drawing for /obszary/sprzedaz-i-marketing. */

const COPY: Copy = {
  pl: {
    title: "Droga od leada do faktury: raz przerwana, raz domknięta",
    desc: "Dwa razy ten sam łańcuch czterech kroków: lead, oferta, podpis, faktura. U góry etykieta źródła wisi obok leada ze znakiem zapytania, a połączenie między podpisem a fakturą jest zerwane. U dołu etykieta jest przypięta do leada, a podpis prowadzi do faktury oznaczonej ptaszkiem.",
  },
  en: {
    title: "The path from lead to invoice: once broken, once closed",
    desc: "The same four-step chain drawn twice: lead, quote, signature, invoice. Above, the source tag floats beside the lead with a question mark and the link between signature and invoice is snapped. Below, the tag is attached to the lead and the signature runs through to an invoice marked with a check.",
  },
};

export function SprzedazIMarketing({ lang }: DrawingProps) {
  return (
    <Frame id="sprzedaz-i-marketing" copy={COPY[lang]}>
      <g
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily="inherit"
        fontSize="22"
      >
        <g stroke="var(--text-2, #7fb5c8)">
          <rect x="40" y="90" width="110" height="64" rx="8" fill="var(--surface, #0e1e2a)" />
          <rect x="190" y="90" width="110" height="64" rx="8" fill="var(--surface, #0e1e2a)" />
          <rect x="340" y="90" width="110" height="64" rx="8" fill="var(--surface, #0e1e2a)" />
          <rect x="490" y="90" width="110" height="64" rx="8" fill="var(--surface, #0e1e2a)" />
          <g fill="var(--text-2, #7fb5c8)" stroke="none" textAnchor="middle">
            <text x="64" y="130">
              1
            </text>
            <text x="214" y="130">
              2
            </text>
            <text x="364" y="130">
              3
            </text>
            <text x="514" y="130">
              4
            </text>
          </g>
          <circle cx="116" cy="113" r="7" />
          <path d="M103 135c2-16 24-16 26 0" />
          <rect x="254" y="106" width="24" height="32" rx="4" />
          <path d="M260 115h12M260 121h12M260 127h7" />
          <path d="M403 135h26" />
          <path d="M404 125c4-14 8 4 12-6c3-7 7 9 12 1" />
          <rect x="554" y="106" width="24" height="32" rx="4" />
          <path d="M560 114h12M560 120h12M560 130h12" />
          <path d="M150 122h34" />
          <path d="M184 118l6 4-6 4" />
          <path d="M300 122h34" />
          <path d="M334 118l6 4-6 4" />
          <path d="M450 122h12l4-4" />
          <path d="M490 122h-12l-4 4" />
          <rect x="52" y="56" width="36" height="24" rx="6" strokeDasharray="4 4" />
          <text
            x="70"
            y="75"
            fontSize="20"
            textAnchor="middle"
            fill="var(--text-2, #7fb5c8)"
            stroke="none"
          >
            ?
          </text>
        </g>
        <path
          d="M40 194h256M344 194h256"
          stroke="var(--border-2, rgba(255,255,255,0.13))"
          strokeDasharray="4 6"
        />
        <path d="M310 188l10 10 10-10" stroke="var(--teal, #0891b2)" />
        <g stroke="var(--teal, #0891b2)">
          <rect x="40" y="234" width="110" height="64" rx="8" fill="var(--surface, #0e1e2a)" />
          <rect x="190" y="234" width="110" height="64" rx="8" fill="var(--surface, #0e1e2a)" />
          <rect x="340" y="234" width="110" height="64" rx="8" fill="var(--surface, #0e1e2a)" />
          <rect x="490" y="234" width="110" height="64" rx="8" fill="var(--surface, #0e1e2a)" />
          <g stroke="var(--teal-2, #22d3ee)">
            <g fill="var(--teal-2, #22d3ee)" stroke="none" textAnchor="middle">
              <text x="64" y="274">
                1
              </text>
              <text x="214" y="274">
                2
              </text>
              <text x="364" y="274">
                3
              </text>
              <text x="514" y="274">
                4
              </text>
            </g>
            <circle cx="116" cy="257" r="7" />
            <path d="M103 279c2-16 24-16 26 0" />
            <rect x="254" y="250" width="24" height="32" rx="4" />
            <path d="M260 259h12M260 265h12M260 271h7" />
            <path d="M403 279h26" />
            <path d="M404 269c4-14 8 4 12-6c3-7 7 9 12 1" />
            <rect x="554" y="250" width="24" height="32" rx="4" />
            <path d="M560 258h12M560 264h12M560 274h12" />
          </g>
          <path d="M150 266h34" />
          <path d="M184 262l6 4-6 4" />
          <path d="M300 266h34" />
          <path d="M334 262l6 4-6 4" />
          <path d="M450 266h34" stroke="var(--teal-2, #22d3ee)" />
          <path d="M484 262l6 4-6 4" stroke="var(--teal-2, #22d3ee)" />
          <rect
            x="52"
            y="224"
            width="36"
            height="24"
            rx="6"
            fill="var(--surface, #0e1e2a)"
            stroke="var(--teal-2, #22d3ee)"
          />
          <circle cx="64" cy="236" r="3" fill="var(--teal-2, #22d3ee)" stroke="none" />
          <path d="M72 236h10" stroke="var(--teal-2, #22d3ee)" />
          <circle
            cx="600"
            cy="234"
            r="13"
            fill="var(--surface, #0e1e2a)"
            stroke="var(--teal-2, #22d3ee)"
          />
          <path d="M594 234l4 5 9-10" stroke="var(--teal-2, #22d3ee)" />
        </g>
      </g>
    </Frame>
  );
}
