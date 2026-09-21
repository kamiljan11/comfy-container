import { Frame, type DrawingProps, type Copy } from "./Frame";

/** AI beside the process vs AI inside the process — hero drawing for /uslugi/ai-w-procesach. */

const COPY: Copy = {
  pl: {
    title: "AI obok procesu kontra AI w procesie",
    desc: "Po lewej człowiek przepisuje dane między systemem firmy a oknem czatu i na końcu zostaje oferta, której nikt nie umie zweryfikować. Po prawej jedno zapytanie jest kierowane albo do tabeli 12 857 rekordów, która odpowiada bez modelu, albo do modelu zamkniętego w Twoich danych, i wraca jedna sprawdzona kwota.",
  },
  en: {
    title: "AI beside the process vs AI inside the process",
    desc: "On the left a person retypes data between the business system and a chat window and ends with a quote nobody can verify. On the right one question is routed either to a 12 857-row table that answers without the model or to a model locked inside your own data, and a single checked amount comes back.",
  },
};

export function AiWProcesach({ lang }: DrawingProps) {
  return (
    <Frame id="ai-w-procesach" copy={COPY[lang]}>
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
