import { Frame, type DrawingProps, type Copy } from "./Frame";

/** Three spreadsheets retyped by hand versus one dashboard — hero drawing for /obszary/dane-i-raporty. */

const COPY: Copy = {
  pl: {
    title: "Trzy arkusze i ręczne przepisywanie kontra jedno źródło",
    desc: "Po lewej osoba w kółko przepisuje te same dane między trzema arkuszami (CRM, ERP, XLS); strzałka prowadzi do jednego źródła danych, z którego automatycznie powstaje raport ze wskaźnikami i znakiem potwierdzenia.",
  },
  en: {
    title: "Three spreadsheets retyped by hand versus one dashboard",
    desc: "On the left a person retypes the same records in a loop between three spreadsheets (CRM, ERP, XLS); an arrow leads to a single data source that feeds one dashboard with rising bars and a check mark.",
  },
};

export function DaneIRaporty({ lang }: DrawingProps) {
  return (
    <Frame id="dane-i-raporty" copy={COPY[lang]}>
      <g
        transform="translate(0,20)"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily="inherit"
        fontSize="13"
      >
        <rect
          x="36"
          y="48"
          width="84"
          height="64"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
          opacity=".9"
        />
        <rect
          x="150"
          y="48"
          width="84"
          height="64"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
          opacity=".9"
        />
        <rect
          x="93"
          y="170"
          width="84"
          height="64"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
          opacity=".9"
        />
        <g stroke="var(--text-2, #94a3b8)" opacity=".45">
          <path d="M44 80h68M44 94h68M78 72v32" />
          <path d="M158 80h68M158 94h68M192 72v32" />
          <path d="M101 202h68M101 216h68M135 194v32" />
        </g>
        <g fill="var(--text-2, #94a3b8)" stroke="none">
          <text x="46" y="67">
            CRM
          </text>
          <text x="160" y="67">
            ERP
          </text>
          <text x="103" y="189">
            XLS
          </text>
        </g>
        <g stroke="var(--text-2, #94a3b8)">
          <circle cx="48" cy="196" r="8" />
          <path d="M32 226a16 15 0 0 1 32 0" />
          <path d="M122 80h20M136 75l8 5-8 5" />
          <path d="M192 118c0 26-6 38-20 46M182 164h-10l5-9" />
          <path d="M87 205H72M78 200l-8 5 8 5" />
          <path d="M52 182v-62M47 127l5-8 5 8" />
        </g>
        <path
          className="ill-flow"
          d="M240 158c78 0 88-75 166-88"
          stroke="var(--teal, #22d3ee)"
          strokeDasharray="6 7"
        />
        <path d="M400 65l8 5-8 5" stroke="var(--teal, #22d3ee)" />
        <path
          d="M428 66v44a42 11 0 0 0 84 0V66"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--teal, #22d3ee)"
        />
        <ellipse
          cx="470"
          cy="66"
          rx="42"
          ry="11"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--teal, #22d3ee)"
        />
        <path d="M428 88a42 11 0 0 0 84 0" stroke="var(--teal-2, #67e8f9)" opacity=".55" />
        <path d="M470 121v23M465 137l5 8 5-8" stroke="var(--teal, #22d3ee)" />
        <rect
          x="396"
          y="150"
          width="200"
          height="120"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--teal, #22d3ee)"
        />
        <rect
          x="412"
          y="166"
          width="54"
          height="6"
          rx="3"
          fill="var(--text-2, #94a3b8)"
          stroke="none"
        />
        <g fill="var(--teal, #22d3ee)" fillOpacity=".22" stroke="var(--teal, #22d3ee)">
          <rect x="414" y="218" width="22" height="32" rx="4" />
          <rect x="446" y="202" width="22" height="48" rx="4" />
          <rect x="478" y="186" width="22" height="64" rx="4" />
          <rect x="510" y="170" width="22" height="80" rx="4" />
        </g>
        <path d="M410 252h172" stroke="var(--text-2, #94a3b8)" opacity=".5" />
        <circle cx="566" cy="178" r="13" stroke="var(--teal-2, #67e8f9)" />
        <path d="M560 178l5 5 8-10" stroke="var(--teal-2, #67e8f9)" />
      </g>
    </Frame>
  );
}
