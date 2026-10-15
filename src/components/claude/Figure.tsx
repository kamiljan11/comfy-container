import type { ReactNode } from "react";
import {
  AiArch,
  AiCadence,
  AiLoop,
  AiMindMap,
  AiPipeline,
  AiReview,
  AiVaultFlow,
} from "./diagrams";
import {
  BeforeAfter,
  CalibTable,
  ExceptionCards,
  LimitsBoard,
  MergeFlow,
  ReleaseSteps,
  RoundsChart,
  StackBars,
  TierLadder,
  VersionTimeline,
  Waffle,
} from "./charts";
import type { FigureKey, Figures } from "./types";

/**
 * One switch from a figure key to its component. Exhaustive over `FigureKey`: a key added to the
 * content types without a component here fails the type check instead of rendering nothing.
 */
export function Figure({ k, f }: { k: FigureKey; f: Figures }): ReactNode {
  switch (k) {
    case "arch":
      return <AiArch t={f.arch} />;
    case "mind":
      return <AiMindMap t={f.mind} />;
    case "pipe":
      return <AiPipeline t={f.pipe} />;
    case "tiers":
      return <TierLadder t={f.tiers} />;
    case "exceptions":
      return <ExceptionCards t={f.exceptions} />;
    case "merge":
      return <MergeFlow t={f.merge} />;
    case "review":
      return <AiReview t={f.review} />;
    case "rounds":
      return <RoundsChart t={f.rounds} />;
    case "loop":
      return <AiLoop t={f.loop} />;
    case "matrix":
      return <StackBars t={f.matrix} />;
    case "release":
      return <ReleaseSteps t={f.release} />;
    case "context":
      return <BeforeAfter t={f.context} />;
    case "calib":
      return <CalibTable t={f.calib} />;
    case "limits":
      return <LimitsBoard t={f.limits} />;
    case "vault":
      return <AiVaultFlow t={f.vault} />;
    case "cadence":
      return <AiCadence t={f.cadence} />;
    case "waffle":
      return <Waffle t={f.waffle} />;
    case "versions":
      return <VersionTimeline t={f.versions} />;
    default: {
      const never: never = k;
      return never;
    }
  }
}
