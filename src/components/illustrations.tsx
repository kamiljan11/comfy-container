import { type ReactNode } from "react";
import { type Lang } from "../i18n";

/**
 * One before/after drawing per service and area page, shown in the hero of
 * ServicePageBody. Twelve hand-tuned inline SVGs (drawn and then reviewed by
 * a visual critic pass, 2026-09-13), keyed by the page slug so a page with
 * no drawing simply renders without one.
 *
 * Every colour is a CSS variable with a fallback, so the drawings follow the
 * site tokens; the dashed "flow" paths animate through .ill-flow in site.css,
 * which is gated behind prefers-reduced-motion: no-preference.
 *
 * Accessibility: role="img" with a title and a description in the page
 * language; the ids are namespaced by slug so two drawings on one page never
 * collide. Numbers inside the drawings are digits only — nothing to translate.
 */

type Props = { lang: Lang };
type Copy = Record<Lang, { title: string; desc: string }>;

function Frame({ id, copy, children }: { id: string; copy: Copy[Lang]; children: ReactNode }) {
  const t = `ill-${id}-t`;
  const d = `ill-${id}-d`;
  return (
    <svg
      className="ill"
      viewBox="0 0 640 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={`${t} ${d}`}
    >
      <title id={t}>{copy.title}</title>
      <desc id={d}>{copy.desc}</desc>
      {children}
    </svg>
  );
}

const ADMINISTRACJAIDOKUMENTY_COPY: Copy = {
  pl: {
    title: "Trzy wersje wzoru kontra jeden szablon i dane",
    desc: "Po lewej stos trzech kopii tego samego wzoru umowy — v1, v2, v3 — ze znakiem zapytania, która jest aktualna, a w wierzchnim dokumencie zieje puste wymagane pole. Po prawej jeden rekord danych i jeden szablon z nazwanymi polami wchodzą do bramki, która przepuszcza tylko komplet, i dopiero z niej wychodzą trzy gotowe dokumenty: DOCX, PDF i faktura.",
  },
  en: {
    title: "Three template versions versus one template and the data",
    desc: "On the left a stack of three copies of the same contract template — v1, v2, v3 — with a question mark over which one is current, and a blank required field gaping in the top document. On the right one data record and one template with named fields pass through a gate that only lets a complete set through, and out of it come three finished documents: DOCX, PDF and invoice.",
  },
};

function AdministracjaIDokumenty({ lang }: Props) {
  return (
    <Frame id="administracja-i-dokumenty" copy={ADMINISTRACJAIDOKUMENTY_COPY[lang]}>
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

const AIWPROCESACH_COPY: Copy = {
  pl: {
    title: "AI obok procesu kontra AI w procesie",
    desc: "Po lewej człowiek przepisuje dane między systemem firmy a oknem czatu i na końcu zostaje oferta, której nikt nie umie zweryfikować. Po prawej jedno zapytanie jest kierowane albo do tabeli 12 857 rekordów, która odpowiada za zero tokenów, albo do modelu zamkniętego w Twoich danych, i wraca jedna sprawdzona kwota.",
  },
  en: {
    title: "AI beside the process vs AI inside the process",
    desc: "On the left a person retypes data between the business system and a chat window and ends with a quote nobody can verify. On the right one question is routed either to a 12 857-row table that answers for zero tokens or to a model locked inside your own data, and a single checked amount comes back.",
  },
};

function AiWProcesach({ lang }: Props) {
  return (
    <Frame id="ai-w-procesach" copy={AIWPROCESACH_COPY[lang]}>
      <g
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily="inherit"
      >
        <rect
          x="16"
          y="24"
          width="288"
          height="312"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity="0.4"
        />
        <rect
          x="336"
          y="24"
          width="288"
          height="312"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity="0.4"
        />
        <g stroke="var(--text-2, #94a3b8)">
          <rect x="36" y="60" width="84" height="54" rx="8" strokeOpacity="0.75" />
          <path d="M36 76h84M78 76v38M36 94h84" />
          <rect x="200" y="60" width="84" height="54" rx="8" strokeOpacity="0.75" />
          <rect x="210" y="72" width="44" height="14" rx="7" />
          <rect x="230" y="94" width="44" height="12" rx="6" />
          <circle cx="160" cy="144" r="11" />
          <path d="M142 180a18 17 0 0 1 36 0" />
          <path d="M78 122C78 142 104 150 130 152" />
          <path d="M190 152c26-6 48-14 52-30" />
          <path d="M160 184v46" />
          <rect x="118" y="246" width="84" height="54" rx="8" strokeOpacity="0.75" />
          <path d="M132 262h30" />
        </g>
        <g fill="var(--text-2, #94a3b8)" stroke="none">
          <path d="M133 152l-9-4 1 9zM78 118l-5 10h10zM188 152l9-4-1 9zM242 118l-5 10 10-1zM160 242l-6-10h12z" />
          <text x="160" y="290" fontSize="26" textAnchor="middle">
            ?
          </text>
        </g>
        <g stroke="var(--teal, #22d3ee)">
          <rect
            x="436"
            y="60"
            width="88"
            height="40"
            rx="8"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity="0.75"
          />
          <path d="M452 74h44M452 86h28" stroke="var(--text-2, #94a3b8)" />
          <path className="ill-flow" d="M480 100c0 20-46 14-78 32" strokeDasharray="6 6" />
          <path className="ill-flow" d="M480 100c0 22 52 15 84 36" strokeDasharray="6 6" />
          <ellipse cx="402" cy="154" rx="48" ry="10" />
          <path d="M354 154v50M450 154v50" />
          <path d="M354 204a48 10 0 0 0 96 0" />
          <rect x="522" y="148" width="84" height="60" rx="8" />
          <rect x="552" y="184" width="24" height="16" rx="3" />
          <path d="M556 184v-5a8 8 0 0 1 16 0v5" />
          <path d="M452 179h60" stroke="var(--text-2, #94a3b8)" />
          <path d="M402 216c0 16 10 20 28 24" stroke="var(--text-2, #94a3b8)" />
          <path d="M564 210c0 16-10 22-30 26" stroke="var(--text-2, #94a3b8)" />
          <rect x="396" y="246" width="168" height="54" rx="8" />
          <path d="M424 268l7 7 13-15" />
          <path d="M460 285h62" stroke="var(--text-2, #94a3b8)" />
        </g>
        <g stroke="none">
          <path d="M402 140l-6-10h12zM564 144l-6-10h12z" fill="var(--teal, #22d3ee)" />
          <path
            d="M518 179l-10-5v10zM440 241l-10-5 2 10zM524 241l10-5-2 10z"
            fill="var(--text-2, #94a3b8)"
          />
          <text x="402" y="180" fontSize="18" textAnchor="middle" fill="var(--teal-2, #67e8f9)">
            12 857
          </text>
          <text x="402" y="199" fontSize="15" textAnchor="middle" fill="var(--text-2, #94a3b8)">
            0 tok
          </text>
          <text x="564" y="166" fontSize="18" textAnchor="middle" fill="var(--teal-2, #67e8f9)">
            AI
          </text>
          <text x="460" y="273" fontSize="18" fill="var(--teal-2, #67e8f9)">
            1 240
          </text>
        </g>
      </g>
    </Frame>
  );
}

const AUTOMATYZACJAPROCESOW_COPY: Copy = {
  pl: {
    title: "Ręczne przepisywanie między systemami kontra jeden przepływ",
    desc: "Po lewej pracownik przy klawiaturze ręcznie przepisuje dane między CRM, magazynem i księgowością, a na drodze stoją znaki błędu i zegar czekania; po prawej te same trzy systemy spina jeden automatyczny przepływ zakończony znakiem poprawności, z osobną ścieżką wyjątku, która wysyła widoczny alert do człowieka.",
  },
  en: {
    title: "Person retyping between systems versus one flow",
    desc: "On the left a person at a keyboard retypes data between CRM, warehouse and accounting, with error marks and a clock showing mistakes and waiting; on the right the same three systems feed one automated flow that ends in a check mark, with a separate exception path raising a visible alert to a human.",
  },
};

function AutomatyzacjaProcesow({ lang }: Props) {
  return (
    <Frame id="automatyzacja-procesow" copy={AUTOMATYZACJAPROCESOW_COPY[lang]}>
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

const DANEIRAPORTY_COPY: Copy = {
  pl: {
    title: "Trzy arkusze i ręczne przepisywanie kontra jedno źródło",
    desc: "Po lewej osoba w kółko przepisuje te same dane między trzema arkuszami (CRM, ERP, XLS); strzałka prowadzi do jednego źródła danych, z którego automatycznie powstaje raport ze wskaźnikami i znakiem potwierdzenia.",
  },
  en: {
    title: "Three spreadsheets retyped by hand versus one dashboard",
    desc: "On the left a person retypes the same records in a loop between three spreadsheets (CRM, ERP, XLS); an arrow leads to a single data source that feeds one dashboard with rising bars and a check mark.",
  },
};

function DaneIRaporty({ lang }: Props) {
  return (
    <Frame id="dane-i-raporty" copy={DANEIRAPORTY_COPY[lang]}>
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

const DORADZTWOAI_COPY: Copy = {
  pl: {
    title: "Od stosu pomysłów do priorytetów według zwrotu",
    desc: "Stos nieuporządkowanych kandydatów do automatyzacji przechodzi przez prosty rachunek zwrotu i wychodzi z niego jako uporządkowana lista: pozycja pierwsza zatwierdzona haczykiem, ostatnia odrzucona krzyżykiem.",
  },
  en: {
    title: "From a pile of ideas to ranked payback",
    desc: "A stack of unsorted automation candidates passes through a simple payback calculation and comes out as a ranked shortlist, with the top item approved by a check mark and the last one rejected by a cross.",
  },
};

function DoradztwoAi({ lang }: Props) {
  return (
    <Frame id="doradztwo-ai" copy={DORADZTWOAI_COPY[lang]}>
      <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <g transform="rotate(-4.5 88 105)">
          <rect
            x="28"
            y="92"
            width="120"
            height="26"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".6"
          />
          <path
            d="M40 105h60"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".45"
            strokeWidth="3"
          />
          <text
            x="134"
            y="110"
            fontFamily="inherit"
            fontSize="16"
            textAnchor="middle"
            fill="var(--text-2, #94a3b8)"
          >
            ?
          </text>
        </g>
        <g transform="rotate(4 106 141)">
          <rect
            x="46"
            y="128"
            width="120"
            height="26"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".6"
          />
          <path
            d="M58 141h84"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".45"
            strokeWidth="3"
          />
        </g>
        <g transform="rotate(-3 94 177)">
          <rect
            x="34"
            y="164"
            width="120"
            height="26"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".6"
          />
          <path
            d="M46 177h60"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".45"
            strokeWidth="3"
          />
          <text
            x="140"
            y="182"
            fontFamily="inherit"
            fontSize="16"
            textAnchor="middle"
            fill="var(--text-2, #94a3b8)"
          >
            ?
          </text>
        </g>
        <g transform="rotate(4.5 108 213)">
          <rect
            x="48"
            y="200"
            width="120"
            height="26"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".6"
          />
          <path
            d="M60 213h84"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".45"
            strokeWidth="3"
          />
        </g>
        <g transform="rotate(-4 96 249)">
          <rect
            x="36"
            y="236"
            width="120"
            height="26"
            rx="8"
            fill="var(--surface, #0e1e2a)"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".6"
          />
          <path
            d="M48 249h60"
            stroke="var(--text-2, #94a3b8)"
            strokeOpacity=".45"
            strokeWidth="3"
          />
          <text
            x="142"
            y="254"
            fontFamily="inherit"
            fontSize="16"
            textAnchor="middle"
            fill="var(--text-2, #94a3b8)"
          >
            ?
          </text>
        </g>
        <path
          className="ill-flow"
          d="M180 180H236"
          stroke="var(--teal, #22d3ee)"
          strokeDasharray="7 7"
        />
        <path d="M236 175l8 5-8 5" stroke="var(--teal, #22d3ee)" />
        <rect
          x="256"
          y="100"
          width="128"
          height="160"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".6"
        />
        <rect
          x="272"
          y="114"
          width="96"
          height="32"
          rx="6"
          stroke="var(--teal, #22d3ee)"
          strokeOpacity=".9"
        />
        <text
          x="356"
          y="136"
          fontFamily="inherit"
          fontSize="14"
          textAnchor="end"
          fill="var(--teal-2, #67e8f9)"
        >
          ROI
        </text>
        <rect
          x="272"
          y="162"
          width="24"
          height="22"
          rx="6"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".5"
        />
        <rect
          x="308"
          y="162"
          width="24"
          height="22"
          rx="6"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".5"
        />
        <rect
          x="344"
          y="162"
          width="24"
          height="22"
          rx="6"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".5"
        />
        <rect
          x="272"
          y="192"
          width="24"
          height="22"
          rx="6"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".5"
        />
        <rect
          x="308"
          y="192"
          width="24"
          height="22"
          rx="6"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".5"
        />
        <rect
          x="344"
          y="192"
          width="24"
          height="22"
          rx="6"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".5"
        />
        <rect
          x="272"
          y="222"
          width="24"
          height="22"
          rx="6"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".5"
        />
        <rect
          x="308"
          y="222"
          width="24"
          height="22"
          rx="6"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".5"
        />
        <rect x="344" y="222" width="24" height="22" rx="6" stroke="var(--teal, #22d3ee)" />
        <text
          x="356"
          y="238"
          fontFamily="inherit"
          fontSize="13"
          textAnchor="middle"
          fill="var(--teal-2, #67e8f9)"
        >
          =
        </text>
        <path
          className="ill-flow"
          d="M396 180H424"
          stroke="var(--teal, #22d3ee)"
          strokeDasharray="7 7"
        />
        <path d="M424 175l8 5-8 5" stroke="var(--teal, #22d3ee)" />
        <rect
          x="440"
          y="108"
          width="176"
          height="40"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--teal, #22d3ee)"
        />
        <text
          x="458"
          y="133"
          fontFamily="inherit"
          fontSize="14"
          textAnchor="middle"
          fill="var(--teal-2, #67e8f9)"
        >
          1
        </text>
        <path d="M478 128h88" stroke="var(--teal-2, #67e8f9)" strokeWidth="3" strokeOpacity=".85" />
        <path d="M578 128l8 8 14-16" stroke="var(--teal-2, #67e8f9)" strokeWidth="2" />
        <rect
          x="440"
          y="160"
          width="176"
          height="40"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".6"
        />
        <text
          x="458"
          y="185"
          fontFamily="inherit"
          fontSize="14"
          textAnchor="middle"
          fill="var(--text-2, #94a3b8)"
        >
          2
        </text>
        <path d="M478 180h62" stroke="var(--text-2, #94a3b8)" strokeWidth="3" strokeOpacity=".6" />
        <rect
          x="440"
          y="212"
          width="176"
          height="40"
          rx="8"
          fill="var(--surface, #0e1e2a)"
          stroke="var(--text-2, #94a3b8)"
          strokeOpacity=".5"
        />
        <text
          x="458"
          y="237"
          fontFamily="inherit"
          fontSize="14"
          textAnchor="middle"
          fill="var(--text-2, #94a3b8)"
          opacity=".85"
        >
          3
        </text>
        <path d="M478 232h42" stroke="var(--text-2, #94a3b8)" strokeWidth="3" strokeOpacity=".45" />
        <path
          d="M580 224l16 16m0-16l-16 16"
          stroke="var(--text-2, #94a3b8)"
          strokeWidth="2"
          strokeOpacity=".75"
        />
      </g>
    </Frame>
  );
}

const HRIREKRUTACJA_COPY: Copy = {
  pl: {
    title: "Trzy źródła zgłoszeń, jedna karta, decyzja u człowieka",
    desc: "Po lewej zgłoszenia ze skrzynki, arkusza i portalu z ogłoszeniami schodzą się na jednej osobie, która przepisuje je ręcznie — ten sam kandydat trafia do bazy dwa razy. Po prawej te same trzy źródła wpadają jednym obiegiem do wspólnej karty kandydata, duplikat zostaje scalony, a sprawa idzie nazwanymi etapami do człowieka, który podejmuje decyzję. Automat porządkuje dane, nie ocenia ludzi.",
  },
  en: {
    title: "Three intake channels, one record, the decision stays human",
    desc: "On the left, applications from an inbox, a spreadsheet and a job board all land on one person who retypes them by hand, so the same candidate ends up in the database twice. On the right the same three sources flow into one shared candidate record, the duplicate is merged, and the case moves through named stages to a person who makes the decision. The automation tidies the data; it does not judge people.",
  },
};

function HrIRekrutacja({ lang }: Props) {
  return (
    <Frame id="hr-i-rekrutacja" copy={HRIREKRUTACJA_COPY[lang]}>
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

const INTEGRACJE_COPY: Copy = {
  pl: {
    title: "Ręczne przepisywanie między narzędziami kontra jeden przepływ",
    desc: "Po lewej człowiek ręcznie przenosi dane między trzema niepołączonymi systemami — CRM, ERP i WMS — nad nim znak ostrzegawczy; po prawej te same trzy systemy zasilają jeden automatyczny przepływ synchronizacji, potwierdzony znakiem zaznaczenia.",
  },
  en: {
    title: "Manual copy-paste between tools versus one synced flow",
    desc: "On the left a person carries data by hand between three disconnected systems — CRM, ERP and WMS — under a warning sign; on the right the same three systems feed one automatic sync flow confirmed by a check mark.",
  },
};

function Integracje({ lang }: Props) {
  return (
    <Frame id="integracje" copy={INTEGRACJE_COPY[lang]}>
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
          <circle cx="232" cy="118" r="13" />
          <path d="M232 131V184" />
          <path d="M198 160 232 146 266 160" />
          <path d="M232 184 214 222M232 184 250 222" />
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

const NIETYPOWEPROCESYAI_COPY: Copy = {
  pl: {
    title: "Od arkusza z wyjątkami do reguł w bazie",
    desc: "Po lewej jedna osoba przepisuje dane w kółko między arkuszem z doklejoną kolumną na wyjątki, karteczką i mailem; po prawej jeden przepływ: zgłoszenie, baza pilnująca reguł i kompletny dokument PDF, a model AI zostaje po drugiej stronie granicy, przy samej treści wiadomości.",
  },
  en: {
    title: "From spreadsheet exceptions to rules in the database",
    desc: "On the left one person retypes data back and forth between a spreadsheet with a bolted-on exceptions column, a sticky note and an email; on the right a single flow: the incoming case, a database that enforces the rules and a complete PDF document, while the AI model stays behind a boundary, drafting message wording only.",
  },
};

function NietypoweProcesyAi({ lang }: Props) {
  return (
    <Frame id="nietypowe-procesy-ai" copy={NIETYPOWEPROCESYAI_COPY[lang]}>
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

const OBSLUGAKLIENTA_COPY: Copy = {
  pl: {
    title: "Szukanie statusu kontra status wysłany z systemu",
    desc: "Po lewej jedno pytanie klienta zmusza pracownika do szukania odpowiedzi w arkuszu, wątku czatu i skrzynce mailowej; po prawej zamówienie idzie przez trzy etapy, a przejście na etap trzeci samo wysyła klientowi SMS z potwierdzeniem, natomiast pozostałe sprawy odbijają do człowieka.",
  },
  en: {
    title: "Hunting for a status versus an update sent automatically",
    desc: "On the left, a single customer question sends one person searching a spreadsheet, a chat thread and an inbox; on the right, an order moves through three stages and the third stage sends the customer a confirmed SMS update by itself, while everything else branches off to a person.",
  },
};

function ObslugaKlienta({ lang }: Props) {
  return (
    <Frame id="obsluga-klienta" copy={OBSLUGAKLIENTA_COPY[lang]}>
      <g
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily="inherit"
      >
        <path
          d="M320 48V318"
          stroke="var(--text-2,#7fb5c8)"
          strokeOpacity=".35"
          strokeDasharray="4 8"
        />
        <circle
          cx="320"
          cy="140"
          r="15"
          fill="var(--surface,#0e1e2a)"
          stroke="var(--text-2,#7fb5c8)"
          strokeOpacity=".6"
        />
        <path d="M316 133l7 7-7 7" stroke="var(--teal-2,#22d3ee)" />
        <g stroke="var(--text-2,#7fb5c8)">
          <path
            d="M44 64H106a8 8 0 0 1 8 8V104a8 8 0 0 1-8 8H74L54 128 60 112H44a8 8 0 0 1-8-8V72a8 8 0 0 1 8-8Z"
            fill="var(--surface,#0e1e2a)"
          />
          <circle cx="150" cy="88" r="14" />
          <path d="M150 79v9l7 5" />
          <path d="M72 130V170" />
          <path d="M66 162l6 8 6-8" />
          <circle cx="72" cy="194" r="13" />
          <path d="M48 230c0-13 11-23 24-23s24 10 24 23" />
          <rect x="180" y="62" width="112" height="62" rx="8" fill="var(--surface,#0e1e2a)" />
          <path
            d="M188 146H284a8 8 0 0 1 8 8V190a8 8 0 0 1-8 8H218L196 208 202 198H188a8 8 0 0 1-8-8V154a8 8 0 0 1 8-8Z"
            fill="var(--surface,#0e1e2a)"
          />
          <rect x="180" y="226" width="112" height="62" rx="8" fill="var(--surface,#0e1e2a)" />
          <g strokeOpacity=".55">
            <path d="M180 84h112M180 104h112M216 62v62M254 62v62" />
            <path d="M196 164h72M196 178h48" />
            <path d="M182 234l54 32 54-32" />
          </g>
          <g strokeDasharray="5 6">
            <path d="M178 104c-38 6-60 46-78 78" />
            <path d="M178 172c-28 4-54 14-74 22" />
            <path d="M178 254c-30-4-56-18-74-36" />
          </g>
          <path d="M108 178l-8 4-1-9" />
          <path d="M112 193l-8 1 5-7" />
          <path d="M106 226l-2-8 7 3" />
        </g>
        <g stroke="var(--text-2,#7fb5c8)">
          <rect
            x="352"
            y="70"
            width="62"
            height="34"
            rx="8"
            fill="var(--surface,#0e1e2a)"
            strokeOpacity=".6"
          />
          <rect
            x="444"
            y="70"
            width="62"
            height="34"
            rx="8"
            fill="var(--surface,#0e1e2a)"
            strokeOpacity=".6"
          />
          <path d="M414 87h22" />
          <path d="M436 82l6 5-6 5" />
          <path d="M506 87h22" />
          <path d="M528 82l6 5-6 5" />
          <path d="M567 134H432a12 12 0 0 0-12 12v24" />
          <path d="M414 162l6 8 6-8" />
          <circle cx="420" cy="192" r="13" />
          <path d="M396 226c0-13 11-23 24-23s24 10 24 23" />
          <path
            d="M348 176H378a8 8 0 0 1 8 8V198a8 8 0 0 1-8 8H362L348 216 354 206H348a8 8 0 0 1-8-8V184a8 8 0 0 1 8-8Z"
            fill="var(--surface,#0e1e2a)"
          />
          <path d="M350 191h26" strokeOpacity=".55" />
        </g>
        <rect
          x="536"
          y="70"
          width="62"
          height="34"
          rx="8"
          fill="var(--surface,#0e1e2a)"
          stroke="var(--teal-2,#22d3ee)"
        />
        <path
          className="ill-flow"
          d="M567 104v64"
          stroke="var(--teal-2,#22d3ee)"
          strokeDasharray="6 6"
        />
        <circle cx="567" cy="134" r="3" fill="var(--teal-2,#22d3ee)" />
        <rect
          x="529"
          y="168"
          width="76"
          height="128"
          rx="10"
          fill="var(--surface,#0e1e2a)"
          stroke="var(--teal-2,#22d3ee)"
        />
        <path
          d="M549 188H585a8 8 0 0 1 8 8V214a8 8 0 0 1-8 8H561L547 232 553 222H549a8 8 0 0 1-8-8V196a8 8 0 0 1 8-8Z"
          stroke="var(--teal,#0891b2)"
        />
        <path d="M551 200h32M551 211h20" stroke="var(--teal,#0891b2)" />
        <circle cx="567" cy="272" r="13" stroke="var(--teal-2,#22d3ee)" />
        <path d="M560 272l5 6 10-13" stroke="var(--teal,#0891b2)" />
        <g stroke="none" textAnchor="middle" fontSize="14">
          <text x="75" y="94" fill="var(--text-2,#7fb5c8)">
            ?
          </text>
          <text x="383" y="92" fill="var(--text-2,#7fb5c8)">
            1
          </text>
          <text x="475" y="92" fill="var(--text-2,#7fb5c8)">
            2
          </text>
          <text x="567" y="92" fill="var(--teal-2,#22d3ee)">
            3
          </text>
          <text x="567" y="248" fill="var(--teal-2,#22d3ee)">
            SMS
          </text>
        </g>
      </g>
    </Frame>
  );
}

const SPRZEDAZIMARKETING_COPY: Copy = {
  pl: {
    title: "Droga od leada do faktury: raz przerwana, raz domknięta",
    desc: "Dwa razy ten sam łańcuch czterech kroków: lead, oferta, podpis, faktura. U góry etykieta źródła wisi obok leada ze znakiem zapytania, a połączenie między podpisem a fakturą jest zerwane. U dołu etykieta jest przypięta do leada, a podpis prowadzi do faktury oznaczonej ptaszkiem.",
  },
  en: {
    title: "The path from lead to invoice: once broken, once closed",
    desc: "The same four-step chain drawn twice: lead, quote, signature, invoice. Above, the source tag floats beside the lead with a question mark and the link between signature and invoice is snapped. Below, the tag is attached to the lead and the signature runs through to an invoice marked with a check.",
  },
};

function SprzedazIMarketing({ lang }: Props) {
  return (
    <Frame id="sprzedaz-i-marketing" copy={SPRZEDAZIMARKETING_COPY[lang]}>
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

const SYSTEMYDLAFIRM_COPY: Copy = {
  pl: {
    title: "Trzy wersje tej samej liczby kontra jedno źródło",
    desc: "Po lewej arkusz, czat i notatka pokazują trzy różne kwoty, a osoba przepisuje je między nimi; po prawej jedna baza zasila telefon i ścieżkę etapów od 1 do 13 zakończoną potwierdzeniem.",
  },
  en: {
    title: "Three versions of one number versus one source",
    desc: "On the left a spreadsheet, a chat thread and a paper note each show a different amount while a person retypes between them; on the right one database feeds a phone and a stage rail from 1 to 13 ending in a check mark.",
  },
};

function SystemyDlaFirm({ lang }: Props) {
  return (
    <Frame id="systemy-dla-firm" copy={SYSTEMYDLAFIRM_COPY[lang]}>
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
        <g fill="var(--text-2, #94a3b8)" fontSize="12" textAnchor="middle">
          <text x="372" y="274">
            1
          </text>
          <text x="592" y="274">
            13
          </text>
        </g>
      </g>
    </Frame>
  );
}

const WDROZENIEISZKOLENIE_COPY: Copy = {
  pl: {
    title: "Od nieużywanego systemu do zespołu, który pracuje",
    desc: "Trzy etapy: gotowy system stoi nieużywany, a człowiek wraca do arkusza; potem nauka na własnych danych z instrukcjami, które zostają; na końcu cały zespół pracuje w jednym systemie oznaczonym znakiem zgodności.",
  },
  en: {
    title: "From an unused system to a working team",
    desc: "Three stages: a finished system sits unused while a person goes back to the spreadsheet; then training on your own data with short materials that stay; finally the whole team works in one system marked with a check.",
  },
};

function WdrozenieISzkolenie({ lang }: Props) {
  return (
    <Frame id="wdrozenie-i-szkolenie" copy={WDROZENIEISZKOLENIE_COPY[lang]}>
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

/** Page slug -> drawing. Service and area slugs never overlap. */
const BY_SLUG: Record<string, (p: Props) => ReactNode> = {
  "administracja-i-dokumenty": AdministracjaIDokumenty,
  "ai-w-procesach": AiWProcesach,
  "automatyzacja-procesow": AutomatyzacjaProcesow,
  "dane-i-raporty": DaneIRaporty,
  "doradztwo-ai": DoradztwoAi,
  "hr-i-rekrutacja": HrIRekrutacja,
  integracje: Integracje,
  "nietypowe-procesy-ai": NietypoweProcesyAi,
  "obsluga-klienta": ObslugaKlienta,
  "sprzedaz-i-marketing": SprzedazIMarketing,
  "systemy-dla-firm": SystemyDlaFirm,
  "wdrozenie-i-szkolenie": WdrozenieISzkolenie,
};

/** The drawing for one page, or nothing when the page has none. The only
 *  export, so Vite's fast refresh keeps working for this file. */
export function Illustration({ slug, lang }: { slug: string; lang: Lang }) {
  const Draw = BY_SLUG[slug];
  if (!Draw) return null;
  return (
    <figure className="sl-hero-art">
      <Draw lang={lang} />
    </figure>
  );
}
