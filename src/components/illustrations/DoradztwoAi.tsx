import { Frame, type DrawingProps, type Copy } from "./Frame";

/** From a pile of ideas to ranked payback — hero drawing for /uslugi/doradztwo-ai. */

const COPY: Copy = {
  pl: {
    title: "Od stosu pomysłów do priorytetów według zwrotu",
    desc: "Stos nieuporządkowanych kandydatów do automatyzacji przechodzi przez prosty rachunek zwrotu i wychodzi z niego jako uporządkowana lista: pozycja pierwsza zatwierdzona haczykiem, ostatnia odrzucona krzyżykiem.",
  },
  en: {
    title: "From a pile of ideas to ranked payback",
    desc: "A stack of unsorted automation candidates passes through a simple payback calculation and comes out as a ranked shortlist, with the top item approved by a check mark and the last one rejected by a cross.",
  },
};

export function DoradztwoAi({ lang }: DrawingProps) {
  return (
    <Frame id="doradztwo-ai" copy={COPY[lang]}>
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
