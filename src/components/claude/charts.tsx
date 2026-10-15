// The charts and infographics added with the 1.8.0 rewrite of /claude.
// HTML first (they reflow on a phone instead of scrolling sideways); SVG only where geometry carries meaning.
// Palette (contrast-checked on the light paper): teal #0a7d8c = the system acting,
// red #b4442e = blocking / failure, gray = before / neutral. Every value is also written as text next to
// its mark, so no reading depends on color alone.
import { barPercent, releasesPerDay, stackPercents, timelineSpan } from "../../lib/chartMath";
import type {
  BeforeAfterLabels,
  CalibLabels,
  ExceptionLabels,
  LimitsLabels,
  MergeLabels,
  ReleaseLabels,
  RoundsLabels,
  StackLabels,
  TierLabels,
  Tone,
  VersionLabels,
  WaffleLabels,
} from "./types";

const toneClass = (t: Tone) => `ch-tone-${t}`;

function Caption({ text }: { text: string }) {
  return <figcaption className="aid-cap">{text}</figcaption>;
}

/* ── Release history: a calendar strip (true spacing) above a readable list ── */
export function VersionTimeline({ t }: { t: VersionLabels }) {
  // the last tick closes the strip, so a new release only needs a new point and a new last tick
  const span = timelineSpan(t);
  const perDay = releasesPerDay(t.points, span);
  return (
    <figure className="ch-fig">
      <div
        className="vt-strip"
        aria-hidden="true"
        style={{ gridTemplateColumns: `repeat(${String(span + 1)}, minmax(0, 1fr))` }}
      >
        {perDay.map((n, day) => (
          <span key={day} className={n ? "vt-day on" : "vt-day"} title={n ? String(n) : undefined}>
            {n > 1 ? n : ""}
          </span>
        ))}
      </div>
      <div className="vt-ticks" aria-hidden="true">
        {t.ticks.map((k) => (
          <span key={k.day} style={{ left: `${String((k.day / span) * 100)}%` }}>
            {k.label}
          </span>
        ))}
      </div>
      <ol className="vt-list">
        {t.points.map((p) => (
          <li key={p.v}>
            <span className="vt-date">{p.date}</span>
            <span className="vt-v">{p.v}</span>
            <span className="vt-theme">{p.theme}</span>
          </li>
        ))}
      </ol>
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── Risk tiers: what triggers each one, who must review, what it costs ── */
export function TierLadder({ t }: { t: TierLabels }) {
  const max = Math.max(1, ...t.rungs.map((r) => r.cost));
  return (
    <figure className="ch-fig">
      <ol className="tl-list">
        {t.rungs.map((r) => (
          <li key={r.tier} className="tl-rung">
            <span className="tl-tier">{r.tier}</span>
            <span className="tl-trigger">{r.trigger}</span>
            <span className="tl-rev">{r.reviewers}</span>
            <span className="tl-cost">
              <span className="tl-cost-t">{t.costTitle}</span>
              <span className="ch-track">
                <span
                  className="ch-bar ch-tone-a"
                  style={{ width: `${String(barPercent(r.cost, max))}%` }}
                />
              </span>
              <span className="tl-cost-l">{r.costLabel}</span>
            </span>
          </li>
        ))}
      </ol>
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── Exceptions: three levels of who may wave a gate through ── */
export function ExceptionCards({ t }: { t: ExceptionLabels }) {
  return (
    <figure className="ch-fig">
      <div className="ex-grid">
        {t.levels.map((l) => (
          <div key={l.level} className={`ex-card ${toneClass(l.tone)}`}>
            <p className="ex-level">{l.level}</p>
            <dl>
              <dt>{t.whoLabel}</dt>
              <dd>{l.who}</dd>
              <dt>{t.windowLabel}</dt>
              <dd>{l.window}</dd>
              <dt>{t.examplesLabel}</dt>
              <dd>{l.examples}</dd>
            </dl>
          </div>
        ))}
      </div>
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── Merge: the decision the merge script makes for a pull request ── */
export function MergeFlow({ t }: { t: MergeLabels }) {
  return (
    <figure className="ch-fig">
      <div className="mf-head">
        <span className="mf-pill">{t.start}</span>
        <span className="mf-arrow" aria-hidden="true">
          →
        </span>
        <span className="mf-pill mf-strong">{t.checks}</span>
      </div>
      <ul className="mf-grid">
        {t.branches.map((b) => (
          <li key={b.when} className={b.auto ? "mf-card" : "mf-card mf-human"}>
            <span className="mf-when">{b.when}</span>
            <span className="mf-needs">{b.needs}</span>
            <span className={b.auto ? "mf-chip ch-tone-a" : "mf-chip ch-tone-b"}>
              {b.auto ? t.autoLabel : t.phraseLabel}
            </span>
          </li>
        ))}
      </ul>
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── Review rounds: blocking and major findings per round, stacked columns ── */
export function RoundsChart({ t }: { t: RoundsLabels }) {
  const W = 760;
  const H = 230;
  const base = 180;
  const top = 30;
  const max = Math.max(1, ...t.rounds.map((r) => r.blocking + r.major));
  const gap = 2; // surface gap between the stacked segments, drawn above the blocking part, not cut from the major one
  const step = (W - 120) / t.rounds.length;
  const barW = Math.min(56, step - 24);
  const y = (v: number) => ((base - top) * v) / max;
  return (
    <figure className="ch-fig">
      <div className="ch-legend">
        <span>
          <i className="ch-key ch-tone-b" /> {t.blockingLabel}
        </span>
        <span>
          <i className="ch-key ch-tone-a" /> {t.majorLabel}
        </span>
      </div>
      <div className="aid-scroll">
        <svg
          viewBox={`0 0 ${String(W)} ${String(H)}`}
          className="aid"
          role="img"
          aria-label={t.caption}
        >
          <line x1="60" x2={W - 40} y1={base} y2={base} className="aid-ln" />
          {t.rounds.map((r, i) => {
            const x = 60 + i * step + (step - barW) / 2;
            const hb = y(r.blocking);
            const hm = y(r.major);
            const total = r.blocking + r.major;
            return (
              <g key={r.label}>
                <title>{`${r.label}: ${String(r.blocking)} ${t.blockingLabel}, ${String(r.major)} ${t.majorLabel}`}</title>
                {r.major > 0 && (
                  <rect
                    x={x}
                    y={base - hb - hm - (r.blocking > 0 ? gap : 0)}
                    width={barW}
                    height={hm}
                    rx="4"
                    className="ch-svg-a"
                  />
                )}
                {r.blocking > 0 && (
                  <rect x={x} y={base - hb} width={barW} height={hb} rx="4" className="ch-svg-b" />
                )}
                <text
                  x={x + barW / 2}
                  y={base - hb - hm - (r.blocking > 0 ? gap : 0) - 8}
                  textAnchor="middle"
                  className="aid-t"
                >
                  {r.blocking ? `${String(r.blocking)} + ${String(r.major)}` : String(total)}
                </text>
                <text x={x + barW / 2} y={base + 20} textAnchor="middle" className="aid-s">
                  {r.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── 100 % stacked bars: a whole and its parts, one bar per row ── */
export function StackBars({ t }: { t: StackLabels }) {
  return (
    <figure className="ch-fig">
      {t.rows.map((row) => {
        const pct = stackPercents(row.segments.map((s) => s.value));
        const unit = row.unit ? `\u00a0${row.unit}` : "";
        return (
          <div key={row.title} className="sb-row">
            <p className="sb-title">
              {row.title} <span className="sb-total">{row.total}</span>
            </p>
            <div
              className="sb-bar"
              role="img"
              aria-label={`${row.title}: ${row.segments.map((s) => `${s.label} ${String(s.value)}${unit}`).join(", ")}`}
            >
              {row.segments.map((s, i) =>
                s.value > 0 ? (
                  <span
                    key={s.label}
                    className={`sb-seg ${toneClass(s.tone)}`}
                    style={{ width: `${String(pct[i])}%` }}
                    title={`${s.label}: ${String(s.value)}${unit}`}
                  />
                ) : null,
              )}
            </div>
            <ul className="sb-keys">
              {row.segments.map((s) => (
                <li key={s.label}>
                  <i className={`ch-key ${toneClass(s.tone)}`} /> {s.label}{" "}
                  <b>
                    {s.value}
                    {unit}
                  </b>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── Release pipeline: steps in order, with the way back underneath ── */
export function ReleaseSteps({ t }: { t: ReleaseLabels }) {
  return (
    <figure className="ch-fig">
      <ol className="rs-list">
        {t.steps.map((s, i) => (
          <li key={s.title} className={`rs-step ${toneClass(s.tone)}`}>
            <span className="rs-n">{i + 1}</span>
            <span className="rs-title">{s.title}</span>
            <span className="rs-detail">{s.detail}</span>
          </li>
        ))}
      </ol>
      <p className="rs-back">↺ {t.rollback}</p>
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── Before / after: one row per measure, each on its own scale ── */
export function BeforeAfter({ t }: { t: BeforeAfterLabels }) {
  return (
    <figure className="ch-fig">
      <div className="ch-legend">
        <span>
          <i className="ch-key ch-tone-n" /> {t.beforeLabel}
        </span>
        <span>
          <i className="ch-key ch-tone-a" /> {t.afterLabel}
        </span>
      </div>
      {t.rows.map((r) => {
        const max = Math.max(r.before, r.after) || 1;
        return (
          <div key={r.label} className="ba-row">
            <p className="ba-label">{r.label}</p>
            <div className="ba-bars">
              <span className="ch-track">
                <span
                  className="ch-bar ch-tone-n"
                  style={{ width: `${String(barPercent(r.before, max))}%` }}
                />
              </span>
              <span className="ba-val">{r.beforeText}</span>
              <span className="ch-track">
                <span
                  className="ch-bar ch-tone-a"
                  style={{ width: `${String(barPercent(r.after, max))}%` }}
                />
              </span>
              <span className="ba-val ba-after">{r.afterText}</span>
            </div>
          </div>
        );
      })}
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── Calibrated gates: a plain table, because the values have different units ── */
export function CalibTable({ t }: { t: CalibLabels }) {
  return (
    <figure className="ch-fig">
      <div className="ct-wrap">
        <table className="ct">
          <thead>
            <tr>
              <th scope="col">{t.gateLabel}</th>
              <th scope="col">{t.beforeLabel}</th>
              <th scope="col">{t.afterLabel}</th>
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r) => (
              <tr key={r.gate}>
                <th scope="row">{r.gate}</th>
                <td className="ct-before">{r.before}</td>
                <td className="ct-after">{r.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── Where improvement ends: what may still change PG, and what no change can reach ── */
export function LimitsBoard({ t }: { t: LimitsLabels }) {
  return (
    <figure className="ch-fig">
      <div className="lb-grid">
        <div className="lb-col ch-tone-a">
          <p className="lb-h">{t.triggersTitle}</p>
          <ol>
            {t.triggers.map((i) => (
              <li key={i.label}>
                <b>{i.label}</b> {i.body}
              </li>
            ))}
          </ol>
        </div>
        <div className="lb-col ch-tone-b">
          <p className="lb-h">{t.wallsTitle}</p>
          <ol>
            {t.walls.map((i) => (
              <li key={i.label}>
                <b>{i.label}</b> {i.body}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="lb-signal">
        <b>{t.signalTitle}</b> {t.signal}
      </p>
      <Caption text={t.caption} />
    </figure>
  );
}

/* ── Waffle: one square per repository ── */
export function Waffle({ t }: { t: WaffleLabels }) {
  const cells = t.groups.flatMap((g) => Array.from({ length: g.count }, () => g.tone));
  return (
    <figure className="ch-fig">
      <div
        className="wf-grid"
        role="img"
        aria-label={t.groups.map((g) => `${g.label}: ${String(g.count)}`).join(", ")}
      >
        {cells.map((tone, i) => (
          <span key={i} className={`wf-cell ${toneClass(tone)}`} />
        ))}
      </div>
      <ul className="sb-keys">
        {t.groups.map((g) => (
          <li key={g.label}>
            <i className={`ch-key ${toneClass(g.tone)}`} /> {g.label} <b>{g.count}</b>
          </li>
        ))}
      </ul>
      <div className="wf-facts">
        {t.facts.map((f) => (
          <span key={f.label} className="wf-fact">
            <b>{f.n}</b> {f.label}
          </span>
        ))}
      </div>
      <Caption text={t.caption} />
    </figure>
  );
}
