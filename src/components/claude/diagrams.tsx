// The diagrams of /claude. Inline SVG inked for the light cv-paper shell (see site.css "/claude — inline diagrams").
// Labels come from src/content/claude/*: these components hold geometry only, so a copy edit never moves a box.
import { stackLines, wrapLabel } from "../../lib/wrapLabel";
import type {
  ArchLabels,
  CadenceLabels,
  LoopLabels,
  MindLabels,
  PipeLabels,
  ReviewLabels,
  VaultLabels,
} from "./types";

/* ══ Diagram: the whole machine ══ */
export function AiArch({ t }: { t: ArchLabels }) {
  return (
    <div className="aid-scroll" tabIndex={0}>
      <svg viewBox="0 0 760 392" className="aid" role="img" aria-label={t.caption}>
        <defs>
          <marker
            id="aiar"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 Z" className="aid-arrowhead" />
          </marker>
        </defs>

        <rect
          data-explain="kamil"
          x="270"
          y="10"
          width="220"
          height="48"
          rx="9"
          className="aid-box aid-strong"
        />
        <text x="380" y="31" textAnchor="middle" className="aid-t">
          {t.kamil}
        </text>
        <text x="380" y="47" textAnchor="middle" className="aid-s">
          {t.kamilSub}
        </text>

        <path d="M340 58 L275 92" className="aid-ln" markerEnd="url(#aiar)" />
        <path d="M420 58 L485 92" className="aid-ln" markerEnd="url(#aiar)" />

        <rect
          data-explain="code"
          x="150"
          y="96"
          width="210"
          height="76"
          rx="9"
          className="aid-box"
        />
        <text x="255" y="119" textAnchor="middle" className="aid-t">
          {t.code}
        </text>
        <text x="255" y="138" textAnchor="middle" className="aid-s">
          {t.codeSub1}
        </text>
        <text x="255" y="154" textAnchor="middle" className="aid-s">
          {t.codeSub2}
        </text>

        <rect
          data-explain="cowork"
          x="400"
          y="96"
          width="210"
          height="76"
          rx="9"
          className="aid-box"
        />
        <text x="505" y="119" textAnchor="middle" className="aid-t">
          {t.cowork}
        </text>
        <text x="505" y="138" textAnchor="middle" className="aid-s">
          {t.coworkSub1}
        </text>
        <text x="505" y="154" textAnchor="middle" className="aid-s">
          {t.coworkSub2}
        </text>

        <path
          d="M362 134 L398 134"
          className="aid-ln"
          markerEnd="url(#aiar)"
          markerStart="url(#aiar)"
        />
        <text x="380" y="188" textAnchor="middle" className="aid-xs">
          {t.shared}
        </text>

        <rect
          data-explain="vault"
          x="16"
          y="96"
          width="108"
          height="56"
          rx="9"
          className="aid-box aid-side"
        />
        <text x="70" y="119" textAnchor="middle" className="aid-t">
          {t.vault}
        </text>
        <text x="70" y="136" textAnchor="middle" className="aid-s">
          {t.vaultSub}
        </text>
        <path d="M124 124 L148 124" className="aid-ln" markerEnd="url(#aiar)" />
        <text x="70" y="168" textAnchor="middle" className="aid-xs">
          {t.vaultNote1}
        </text>
        <text x="70" y="181" textAnchor="middle" className="aid-xs">
          {t.vaultNote2}
        </text>

        <rect
          data-explain="memory"
          x="636"
          y="96"
          width="108"
          height="56"
          rx="9"
          className="aid-box aid-side"
        />
        <text x="690" y="119" textAnchor="middle" className="aid-t">
          {t.memory}
        </text>
        <text x="690" y="136" textAnchor="middle" className="aid-s">
          {t.memorySub}
        </text>
        <path
          d="M612 124 L634 124"
          className="aid-ln"
          markerEnd="url(#aiar)"
          markerStart="url(#aiar)"
        />
        <text x="690" y="168" textAnchor="middle" className="aid-xs">
          {t.memoryNote1}
        </text>
        <text x="690" y="181" textAnchor="middle" className="aid-xs">
          {t.memoryNote2}
        </text>

        <path d="M255 172 L255 208" className="aid-ln" markerEnd="url(#aiar)" />
        <path d="M505 172 L505 208" className="aid-ln" markerEnd="url(#aiar)" />
        <rect
          data-explain="gates"
          x="150"
          y="212"
          width="460"
          height="42"
          rx="9"
          className="aid-band"
        />
        <text x="380" y="230" textAnchor="middle" className="aid-t aid-accent">
          {t.gates}
        </text>
        <text x="380" y="246" textAnchor="middle" className="aid-s">
          {t.gatesList}
        </text>

        <path d="M380 254 L380 290" className="aid-ln" markerEnd="url(#aiar)" />
        {/* one band, not a row of project names: PG is the layer under every project, whichever it is */}
        <rect
          data-explain="projects"
          x="150"
          y="294"
          width="460"
          height="44"
          rx="9"
          className="aid-box aid-prod"
        />
        <text x="380" y="313" textAnchor="middle" className="aid-t">
          {t.projects}
        </text>
        <text x="380" y="329" textAnchor="middle" className="aid-s">
          {t.projectsSub}
        </text>

        <text x="380" y="368" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: mind map (8 branches around the centre) ══ */
export function AiMindMap({ t }: { t: MindLabels }) {
  const bw = 180;
  // Leaves wrap to the box width (10px italic ≈ 30 chars here). A wrapped
  // leaf's second line sits closer than the next leaf, so a two-line item
  // still reads as one item; boxes and rows grow with the tallest branch.
  const leafGroups = t.branches.map((b) => b.leaves.map((l) => wrapLabel(l, 30)));
  const leafY = leafGroups.map((groups) => stackLines(groups, 38, 12, 18));
  const bh = Math.max(38, ...leafY.flat(2)) + 16;
  const gap = 32;
  const rowY = [0, 1, 2, 3].map((r) => 36 + r * (bh + gap));
  const bottom = rowY[3] + bh;
  const cx = 380;
  const cy = (36 + bottom) / 2;
  // Branch anchors: two columns of four, connected to the centre by curves.
  const pos = [...rowY.map((y) => ({ x: 30, y })), ...rowY.map((y) => ({ x: 550, y }))];
  return (
    <div className="aid-scroll" tabIndex={0}>
      <svg
        viewBox={`0 0 760 ${String(bottom + 44)}`}
        className="aid"
        role="img"
        aria-label={t.caption}
      >
        {t.branches.map((b, i) => {
          const p = pos[i];
          const left = i < 4;
          const ax = left ? p.x + bw : p.x;
          const ay = p.y + bh / 2;
          const c1x = left ? ax + 70 : ax - 70;
          const c2x = left ? cx - 90 : cx + 90;
          return (
            <g key={b.title} data-explain={`branch-${String(i)}`}>
              <path
                d={`M${ax} ${ay} C ${c1x} ${ay}, ${c2x} ${cy}, ${cx} ${cy}`}
                className="aid-ln aid-thin"
              />
              <rect x={p.x} y={p.y} width={bw} height={bh} rx="9" className="aid-box aid-side" />
              <text x={p.x + bw / 2} y={p.y + 20} textAnchor="middle" className="aid-t">
                {b.title}
              </text>
              {leafGroups[i].map((lines, k) =>
                lines.map((l, j) => (
                  <text
                    key={`${String(k)}-${String(j)}`}
                    x={p.x + bw / 2}
                    y={p.y + leafY[i][k][j]}
                    textAnchor="middle"
                    className="aid-xs"
                  >
                    {l}
                  </text>
                )),
              )}
            </g>
          );
        })}
        <circle data-explain="center" cx={cx} cy={cy} r="64" className="aid-box aid-strong" />
        <text x={cx} y={cy - 4} textAnchor="middle" className="aid-t aid-accent">
          {t.center}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="aid-xs">
          {t.centerSub}
        </text>
        <text x={cx} y={bottom + 30} textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: the life of a change (N stages) ══ */
/* Chips alternate between two rows, so a chip may be almost two steps wide
   without touching its same-row neighbours; the rows are stacked with a gap,
   so neighbours in the other row never overlap either. Labels are wrapped to
   CHIP_CHARS per line (wrapLabel), and the heights follow the longest label —
   the copy can change without anything spilling out of its box. */
const CHIP_CHARS = 20;
const CHIP_LINE = 13;

export function AiPipeline({ t }: { t: PipeLabels }) {
  const n = t.stages.length;
  const x0 = 78;
  const x1 = 652;
  const step = (x1 - x0) / (n - 1);
  const xs = Array.from({ length: n }, (_, i) => x0 + i * step);
  const chipW = Math.min(128, 2 * step - 16);
  const chips = t.gates.map((g) => wrapLabel(g, CHIP_CHARS));
  const chipH = 10 + CHIP_LINE * Math.max(...chips.map((c) => c.length));
  const rowY = [94, 94 + chipH + 16];
  const blocked = wrapLabel(`✕ ${t.blocked}`, 110);
  const blockedY = rowY[1] + chipH + 26;
  const captionY = blockedY + 14 * (blocked.length - 1) + 24;
  return (
    <div className="aid-scroll" tabIndex={0}>
      <svg
        viewBox={`0 0 760 ${String(captionY + 12)}`}
        className="aid"
        role="img"
        aria-label={t.caption}
      >
        <defs>
          <marker
            id="aipr"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 Z" className="aid-arrowhead" />
          </marker>
        </defs>
        <path d={`M${x0 - 20} 62 L${x1 + 20} 62`} className="aid-ln" markerEnd="url(#aipr)" />
        <rect
          data-explain="live"
          x="690"
          y="45"
          width="60"
          height="34"
          rx="8"
          className="aid-box aid-strong"
        />
        <text x="720" y="66" textAnchor="middle" className="aid-t aid-accent">
          {t.live}
        </text>

        {xs.map((x, i) => {
          const y = rowY[i % 2];
          const lines = chips[i];
          // vertically centre however many lines this chip has
          const firstLine = y + chipH / 2 - ((lines.length - 1) * CHIP_LINE) / 2 + 3.5;
          return (
            <g key={i} data-explain={`stage-${String(i)}`}>
              <circle cx={x} cy="62" r="5" className="aid-node" />
              <text x={x} y={i % 2 === 0 ? 42 : 28} textAnchor="middle" className="aid-s aid-stage">
                {t.stages[i]}
              </text>
              <path
                d={`M${String(x)} 70 L${String(x)} ${String(y - 2)}`}
                className="aid-ln aid-thin"
              />
              <rect
                x={x - chipW / 2}
                y={y}
                width={chipW}
                height={chipH}
                rx="7"
                className="aid-chip"
              />
              {lines.map((line, j) => (
                <text
                  key={j}
                  x={x}
                  y={firstLine + j * CHIP_LINE}
                  textAnchor="middle"
                  className="aid-xs aid-chip-t"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {blocked.map((line, j) => (
          <text
            key={j}
            x="380"
            y={blockedY + j * 14}
            textAnchor="middle"
            className="aid-xs aid-red"
          >
            {line}
          </text>
        ))}
        <text x="380" y={captionY} textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: review pipeline ══ */
export function AiReview({ t }: { t: ReviewLabels }) {
  // Both boxes stay centred on y=94 (where the arrows meet) and grow with
  // their wrapped labels: bold 13px fits ~13 chars in the 130px band, 10px
  // italic ~18 chars in the 112px aggregate box.
  const gateLines = wrapLabel(t.gates, 13);
  const bandH = 46 + 16 * gateLines.length;
  const bandY = 94 - bandH / 2;
  const aggLines = wrapLabel(t.aggregateSub, 18);
  const aggH = 42 + 14 * aggLines.length;
  const aggY = 94 - aggH / 2;
  return (
    <div className="aid-scroll" tabIndex={0}>
      <svg viewBox="0 0 760 236" className="aid" role="img" aria-label={t.caption}>
        <defs>
          <marker
            id="airv"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 Z" className="aid-arrowhead" />
          </marker>
        </defs>
        <rect
          data-explain="orchestrator"
          x="16"
          y="70"
          width="128"
          height="48"
          rx="9"
          className="aid-box aid-strong"
        />
        <text x="80" y="98" textAnchor="middle" className="aid-t">
          {t.orchestrator}
        </text>

        <path d="M144 94 L176 94" className="aid-ln" markerEnd="url(#airv)" />
        <rect
          data-explain="gates"
          x="180"
          y={bandY}
          width="130"
          height={bandH}
          rx="9"
          className="aid-band"
        />
        {gateLines.map((line, j) => (
          <text
            key={j}
            x="245"
            y={bandY + 22 + 16 * j}
            textAnchor="middle"
            className="aid-t aid-accent"
          >
            {line}
          </text>
        ))}
        <text
          x="245"
          y={bandY + 40 + 16 * (gateLines.length - 1)}
          textAnchor="middle"
          className="aid-xs"
        >
          {t.gatesSub}
        </text>

        {t.finders.map((f, i) => (
          <g key={f} data-explain={`finder-${String(i)}`}>
            <path
              d={`M310 94 L346 ${34 + i * 40}`}
              className="aid-ln aid-thin"
              markerEnd="url(#airv)"
            />
            <rect
              x="350"
              y={18 + i * 40}
              width="118"
              height="32"
              rx="7"
              className="aid-box aid-side"
            />
            <text x="409" y={39 + i * 40} textAnchor="middle" className="aid-s">
              {f}
            </text>
            <path
              d={`M468 ${34 + i * 40} L504 94`}
              className="aid-ln aid-thin"
              markerEnd="url(#airv)"
            />
          </g>
        ))}

        <rect
          data-explain="aggregate"
          x="508"
          y={aggY}
          width="112"
          height={aggH}
          rx="9"
          className="aid-box"
        />
        <text x="564" y={aggY + 22} textAnchor="middle" className="aid-t">
          {t.aggregate}
        </text>
        {aggLines.map((line, j) => (
          <text key={j} x="564" y={aggY + 40 + 14 * j} textAnchor="middle" className="aid-xs">
            {line}
          </text>
        ))}

        <path
          d={`M564 ${String(aggY + aggH)} L564 148`}
          className="aid-ln"
          markerEnd="url(#airv)"
        />
        <rect
          data-explain="verifier"
          x="508"
          y="152"
          width="112"
          height="48"
          rx="9"
          className="aid-box aid-strong"
        />
        <text x="564" y="172" textAnchor="middle" className="aid-t">
          {t.verifier}
        </text>
        <text x="564" y="189" textAnchor="middle" className="aid-xs">
          {t.verifierSub}
        </text>

        <path d="M620 94 L654 94" className="aid-ln" markerEnd="url(#airv)" />
        <rect
          data-explain="fixer"
          x="658"
          y="70"
          width="92"
          height="48"
          rx="9"
          className="aid-box aid-prod"
        />
        <text x="704" y="98" textAnchor="middle" className="aid-s aid-prod-t">
          {t.fixer}
        </text>

        <text x="380" y="216" textAnchor="middle" className="aid-xs aid-red">
          ✕ {t.rule}
        </text>
        <text x="380" y="231" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: scar → gate loop (6 steps in a ring) ══ */
export function AiLoop({ t }: { t: LoopLabels }) {
  const cx = 380;
  const cy = 128;
  const rx = 300;
  const ry = 88;
  const n = t.steps.length;
  const pts = t.steps.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });
  return (
    <div className="aid-scroll" tabIndex={0}>
      <svg viewBox="0 0 760 290" className="aid" role="img" aria-label={t.caption}>
        <defs>
          <marker
            id="ailp"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 Z" className="aid-arrowhead" />
          </marker>
        </defs>
        {pts.map((p, i) => {
          const q = pts[(i + 1) % n];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const len = Math.hypot(dx, dy) || 1;
          const pad = 66;
          const sx = p.x + (dx / len) * pad;
          const sy = p.y + (dy / len) * (pad * 0.42);
          const ex = q.x - (dx / len) * pad;
          const ey = q.y - (dy / len) * (pad * 0.42);
          return (
            <path
              key={i}
              d={`M${sx} ${sy} L${ex} ${ey}`}
              className="aid-ln"
              markerEnd="url(#ailp)"
            />
          );
        })}
        {pts.map((p, i) => {
          const words = t.steps[i].split(" ");
          const mid = Math.ceil(words.length / 2);
          const l1 = words.slice(0, mid).join(" ");
          const l2 = words.slice(mid).join(" ");
          return (
            <g key={i} data-explain={`step-${String(i)}`}>
              <rect
                x={p.x - 64}
                y={p.y - 20}
                width="128"
                height="40"
                rx="8"
                className={i === 3 ? "aid-box aid-strong" : "aid-box aid-side"}
              />
              <text x={p.x} y={p.y - 3} textAnchor="middle" className="aid-xs">
                {l1}
              </text>
              <text x={p.x} y={p.y + 11} textAnchor="middle" className="aid-xs">
                {l2}
              </text>
            </g>
          );
        })}
        <text x="380" y="280" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Diagram: a secret's journey ══ */
export function AiVaultFlow({ t }: { t: VaultLabels }) {
  return (
    <div className="aid-scroll" tabIndex={0}>
      <svg viewBox="0 0 760 148" className="aid" role="img" aria-label={t.caption}>
        <defs>
          <marker
            id="aivr"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 Z" className="aid-arrowhead" />
          </marker>
        </defs>
        <rect
          data-explain="vault"
          x="40"
          y="24"
          width="160"
          height="52"
          rx="9"
          className="aid-box aid-strong"
        />
        <text x="120" y="46" textAnchor="middle" className="aid-t">
          {t.vault}
        </text>
        <text x="120" y="63" textAnchor="middle" className="aid-s">
          {t.vaultSub}
        </text>
        <path d="M200 50 L296 50" className="aid-ln" markerEnd="url(#aivr)" />
        <rect
          data-explain="bridge"
          x="300"
          y="24"
          width="150"
          height="52"
          rx="9"
          className="aid-box"
        />
        <text x="375" y="46" textAnchor="middle" className="aid-t">
          {t.bridge}
        </text>
        <text x="375" y="63" textAnchor="middle" className="aid-s">
          {t.bridgeSub}
        </text>
        <path d="M450 50 L546 50" className="aid-ln" markerEnd="url(#aivr)" />
        <rect
          data-explain="target"
          x="550"
          y="24"
          width="172"
          height="52"
          rx="9"
          className="aid-box"
        />
        <text x="636" y="46" textAnchor="middle" className="aid-t">
          {t.target}
        </text>
        <text x="636" y="63" textAnchor="middle" className="aid-s">
          {t.targetSub}
        </text>
        {t.never.map((n, i) => (
          <text
            data-explain="never"
            key={n}
            x={380 + (i - 1) * 110}
            y="106"
            textAnchor="middle"
            className="aid-s aid-red"
          >
            {n}
          </text>
        ))}
        <text x="380" y="134" textAnchor="middle" className="aid-xs">
          {t.caption}
        </text>
      </svg>
    </div>
  );
}

/* ══ Cadence strip ══ */
export function AiCadence({ t }: { t: CadenceLabels }) {
  // A list, not role="table": the rows are label · cadence · frequency, read in order.
  // The dots are the planned cadence; the status line says whether the routines run at all today.
  return (
    <figure className="cad-fig">
      <p className="cad-status">{t.status}</p>
      <ul className="cad-grid">
        {t.rows.map((r, i) => (
          <li className="cad-row" key={r.name} data-explain={`row-${String(i)}`}>
            <span className="cad-name">{r.name}</span>
            <span className="cad-dots" aria-hidden="true">
              {r.manual ? (
                <span className="cad-manual">⊘</span>
              ) : (
                Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < r.dots ? "cad-dot" : "cad-dot off"} />
                ))
              )}
            </span>
            <span className="cad-freq">{r.freq}</span>
          </li>
        ))}
      </ul>
      <figcaption className="aid-cap">{t.caption}</figcaption>
    </figure>
  );
}
