import { Frame, type DrawingProps, type Copy } from "./Frame";

/** Hunting for a status versus an update sent automatically — hero drawing for /obszary/obsluga-klienta. */

const COPY: Copy = {
  pl: {
    title: "Szukanie statusu kontra status wysłany z systemu",
    desc: "Po lewej jedno pytanie klienta zmusza pracownika do szukania odpowiedzi w arkuszu, wątku czatu i skrzynce mailowej; po prawej zamówienie idzie przez trzy etapy, a przejście na etap trzeci samo wysyła klientowi SMS z potwierdzeniem, natomiast pozostałe sprawy odbijają do człowieka.",
  },
  en: {
    title: "Hunting for a status versus an update sent automatically",
    desc: "On the left, a single customer question sends one person searching a spreadsheet, a chat thread and an inbox; on the right, an order moves through three stages and the third stage sends the customer a confirmed SMS update by itself, while everything else branches off to a person.",
  },
};

export function ObslugaKlienta({ lang }: DrawingProps) {
  return (
    <Frame id="obsluga-klienta" copy={COPY[lang]}>
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
