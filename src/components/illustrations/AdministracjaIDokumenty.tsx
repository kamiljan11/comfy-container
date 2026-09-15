import { Frame, type DrawingProps, type Copy } from "./Frame";

/** Three template versions versus one template and the data — hero drawing for /obszary/administracja-i-dokumenty. */

const COPY: Copy = {
  pl: {
    title: "Trzy wersje wzoru kontra jeden szablon i dane",
    desc: "Po lewej stos trzech kopii tego samego wzoru umowy (v1, v2, v3) ze znakiem zapytania, która jest aktualna, a w wierzchnim dokumencie zieje puste wymagane pole. Po prawej jeden rekord danych i jeden szablon z nazwanymi polami wchodzą do bramki, która przepuszcza tylko komplet, i dopiero z niej wychodzą trzy gotowe dokumenty: DOCX, PDF i faktura.",
  },
  en: {
    title: "Three template versions versus one template and the data",
    desc: "On the left a stack of three copies of the same contract template (v1, v2, v3) with a question mark over which one is current, and a blank required field gaping in the top document. On the right one data record and one template with named fields pass through a gate that only lets a complete set through, and out of it come three finished documents: DOCX, PDF and invoice.",
  },
};

export function AdministracjaIDokumenty({ lang }: DrawingProps) {
  return (
    <Frame id="administracja-i-dokumenty" copy={COPY[lang]}>
      <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect
          x="16"
          y="36"
          width="280"
          height="288"
          rx="8"
          fill="var(--bg-alt, #09161f)"
          stroke="var(--border, rgba(255,255,255,.07))"
        />
        <rect
          x="344"
          y="36"
          width="280"
          height="288"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--border-teal, rgba(8,145,178,.3))"
          strokeWidth="2"
        />
        <g stroke="var(--text-2, #7fb5c8)">
          <rect
            x="48"
            y="88"
            width="104"
            height="128"
            rx="8"
            fill="var(--bg-alt, #09161f)"
            strokeOpacity=".45"
            strokeWidth="2"
          />
          <rect
            x="70"
            y="108"
            width="104"
            height="128"
            rx="8"
            fill="var(--bg-alt, #09161f)"
            strokeOpacity=".45"
            strokeWidth="2"
          />
          <rect
            x="92"
            y="128"
            width="104"
            height="128"
            rx="8"
            fill="var(--bg-alt, #09161f)"
            strokeOpacity=".6"
            strokeWidth="2"
          />
          <rect
            x="100"
            y="160"
            width="52"
            height="8"
            rx="4"
            fill="var(--text-2, #7fb5c8)"
            fillOpacity=".22"
            stroke="none"
          />
          <path strokeOpacity=".45" d="M100 186 H184 M100 200 H184 M100 214 H164" />
          <rect
            x="100"
            y="224"
            width="76"
            height="16"
            rx="4"
            strokeDasharray="4 4"
            strokeOpacity=".6"
          />
          <circle cx="238" cy="112" r="16" strokeOpacity=".6" />
          <path
            strokeOpacity=".6"
            d="M224 122 C214 134 208 142 202 152 M202 152 l8 -6 M202 152 l0 -10"
          />
        </g>
        <path
          stroke="var(--teal, #0891b2)"
          strokeWidth="2"
          d="M304 180 H334 M334 180 l-9 -5 M334 180 l-9 5"
        />
        <g stroke="var(--teal, #0891b2)">
          <rect
            x="364"
            y="96"
            width="78"
            height="60"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            strokeWidth="2"
          />
          <path
            stroke="var(--teal-2, #22d3ee)"
            strokeOpacity=".5"
            d="M376 128 H430 M376 140 H414"
          />
          <rect
            x="364"
            y="204"
            width="78"
            height="60"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            strokeWidth="2"
          />
          <g stroke="var(--teal-2, #22d3ee)" strokeOpacity=".6" strokeDasharray="4 4">
            <rect x="376" y="232" width="26" height="12" rx="3" />
            <rect x="408" y="232" width="22" height="12" rx="3" />
            <rect x="376" y="248" width="42" height="12" rx="3" />
          </g>
          <g stroke="var(--teal-2, #22d3ee)" strokeWidth="2" strokeDasharray="6 6">
            <path d="M442 126 C466 126 452 152 452 180" />
            <path d="M442 234 C466 234 452 208 452 180" />
            <path d="M488 180 C508 180 502 110 514 100" />
            <path d="M488 180 H514" />
            <path d="M488 180 C508 180 502 250 514 260" />
          </g>
          <path
            stroke="var(--teal-2, #22d3ee)"
            strokeWidth="2"
            d="M514 100 l-9 1 M514 100 l-5 8 M514 180 l-8 -5 M514 180 l-8 5 M514 260 l-9 -1 M514 260 l-5 -8"
          />
          <rect
            x="456"
            y="164"
            width="32"
            height="32"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            stroke="var(--teal-2, #22d3ee)"
            strokeWidth="2"
          />
          <path stroke="var(--teal-2, #22d3ee)" strokeWidth="2" d="M464 180 l6 7 l12 -15" />
          <rect
            x="516"
            y="68"
            width="92"
            height="64"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            strokeWidth="2"
          />
          <rect
            x="516"
            y="148"
            width="92"
            height="64"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            strokeWidth="2"
          />
          <rect
            x="516"
            y="228"
            width="92"
            height="64"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            strokeWidth="2"
          />
          <path
            stroke="var(--teal-2, #22d3ee)"
            strokeOpacity=".45"
            d="M530 106 H594 M530 118 H578 M530 186 H594 M530 198 H578 M530 266 H594 M530 278 H578"
          />
        </g>
      </g>
      <g fontFamily="inherit" fontSize="12" stroke="none" fill="var(--text-2, #7fb5c8)">
        <text x="56" y="104" fillOpacity=".7">
          v1
        </text>
        <text x="78" y="124" fillOpacity=".7">
          v2
        </text>
        <text x="100" y="152" fillOpacity=".85">
          v3
        </text>
        <text x="238" y="118" textAnchor="middle" fontSize="14" fillOpacity=".85">
          ?
        </text>
        <g fill="var(--teal-2, #22d3ee)">
          <text x="376" y="120">
            DATA
          </text>
          <text x="376" y="224">
            TPL
          </text>
          <text x="530" y="94">
            DOCX
          </text>
          <text x="530" y="174">
            PDF
          </text>
          <text x="530" y="254">
            INV
          </text>
        </g>
      </g>
    </Frame>
  );
}
