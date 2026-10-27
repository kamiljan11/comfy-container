// Shapes of the /claude copy. The words live in src/content/claude/{en,pl}.ts; the components in this folder
// draw them. Both languages fill the same type, so a figure cannot exist in one language and be missing in the other.

export type Item = { label: string; body: string };
export type Stat = { n: string; label: string };
export type LinkRef = { href: string; text: string };

/* ── Diagrams carried over from the earlier page (geometry in diagrams.tsx) ── */

export type ArchLabels = {
  kamil: string;
  kamilSub: string;
  code: string;
  codeSub1: string;
  codeSub2: string;
  cowork: string;
  coworkSub1: string;
  coworkSub2: string;
  shared: string;
  vault: string;
  vaultSub: string;
  vaultNote1: string;
  vaultNote2: string;
  memory: string;
  memorySub: string;
  memoryNote1: string;
  memoryNote2: string;
  gates: string;
  gatesList: string;
  projects: string;
  projectsSub: string;
  caption: string;
};

export type MindBranch = { title: string; leaves: string[] };
export type MindLabels = {
  center: string;
  centerSub: string;
  branches: MindBranch[];
  caption: string;
}; // 8 branches

export type PipeLabels = {
  stages: string[]; // 9
  gates: string[]; // 9
  live: string;
  blocked: string;
  caption: string;
};

export type ReviewLabels = {
  orchestrator: string;
  gates: string;
  gatesSub: string;
  finders: string[]; // 4 boxes
  aggregate: string;
  aggregateSub: string;
  verifier: string;
  verifierSub: string;
  fixer: string;
  rule: string;
  caption: string;
};

export type LoopLabels = { steps: string[]; caption: string }; // 6 steps

export type VaultLabels = {
  vault: string;
  vaultSub: string;
  bridge: string;
  bridgeSub: string;
  target: string;
  targetSub: string;
  never: string[]; // 3
  caption: string;
};

export type CadenceRow = { name: string; dots: number; freq: string; manual?: boolean };
export type CadenceLabels = { rows: CadenceRow[]; status: string; caption: string };

/* ── Figures added with the 1.8.0 rewrite (charts.tsx) ── */

/** One public release on the timeline. `day` = days after 2026-09-12 (1.0.0), so spacing is true to the calendar. */
export type VersionPoint = {
  v: string;
  date: string;
  day: number;
  theme: string;
  patches?: number;
  /** `data-explain` id of this release's row, for the few releases the article explains. */
  explainId?: string;
};
export type VersionLabels = {
  points: VersionPoint[];
  ticks: { day: number; label: string }[];
  caption: string;
};

/** Tone of a mark: a = teal (the system acting), b = red (blocking / failure), n = neutral gray. */
export type Tone = "a" | "b" | "n";

export type TierRung = {
  tier: string;
  trigger: string;
  reviewers: string;
  cost: number;
  costLabel: string;
};
export type TierLabels = { rungs: TierRung[]; costTitle: string; caption: string };

export type ExceptionLevel = {
  level: string;
  who: string;
  window: string;
  examples: string;
  tone: Tone;
};
export type ExceptionLabels = {
  levels: ExceptionLevel[];
  whoLabel: string;
  windowLabel: string;
  examplesLabel: string;
  caption: string;
};

export type MergeBranch = { when: string; needs: string; auto: boolean };
export type MergeLabels = {
  start: string;
  checks: string;
  branches: MergeBranch[];
  autoLabel: string;
  phraseLabel: string;
  caption: string;
};

/** `final`: a check of the last fixes, not a full review round (explained apart from the rounds). */
export type RoundBar = { label: string; blocking: number; major: number; final?: boolean };
export type RoundsLabels = {
  rounds: RoundBar[];
  blockingLabel: string;
  majorLabel: string;
  caption: string;
};

export type StackSegment = { label: string; value: number; tone: Tone };
/** `unit` is printed after every value (e.g. "%" for a row of shares); a row of plain counts leaves it out. */
export type StackRow = { title: string; total: string; unit?: string; segments: StackSegment[] };
export type StackLabels = { rows: StackRow[]; caption: string };

export type ReleaseStep = { title: string; detail: string; tone: Tone };
export type ReleaseLabels = { steps: ReleaseStep[]; rollback: string; caption: string };

/** Paired bars on one axis per row: before (gray) and after (teal). Each row has its own scale and unit. */
export type BeforeAfterRow = {
  label: string;
  before: number;
  after: number;
  beforeText: string;
  afterText: string;
};
export type BeforeAfterLabels = {
  rows: BeforeAfterRow[];
  beforeLabel: string;
  afterLabel: string;
  caption: string;
};

export type CalibRow = { gate: string; before: string; after: string };
export type CalibLabels = {
  rows: CalibRow[];
  gateLabel: string;
  beforeLabel: string;
  afterLabel: string;
  caption: string;
};

export type LimitsLabels = {
  triggersTitle: string;
  triggers: Item[];
  wallsTitle: string;
  walls: Item[];
  signalTitle: string;
  signal: string;
  caption: string;
};

export type WaffleGroup = { label: string; count: number; tone: Tone };
export type WaffleLabels = { groups: WaffleGroup[]; facts: Stat[]; caption: string };

/** One idea as the habit it replaces: `before` (gray) turns into `after` (teal); `why` is the measured reason. */
export type IdeaRow = { idea: string; before: string; after: string; why: string };
export type IdeaLabels = {
  rows: IdeaRow[];
  beforeLabel: string;
  afterLabel: string;
  whyLabel: string;
  caption: string;
};

/** The rules in the middle, the guards around them, and the line PG does not claim to hold (the outer box). */
export type GuardLabels = {
  core: string;
  coreSub: string;
  guardsTitle: string;
  guards: Item[];
  outer: string;
  outerSub: string;
  caption: string;
};

/** Every figure the page can place, by key. */
export type Figures = {
  arch: ArchLabels;
  mind: MindLabels;
  pipe: PipeLabels;
  tiers: TierLabels;
  exceptions: ExceptionLabels;
  merge: MergeLabels;
  review: ReviewLabels;
  rounds: RoundsLabels;
  loop: LoopLabels;
  matrix: StackLabels;
  release: ReleaseLabels;
  context: BeforeAfterLabels;
  calib: CalibLabels;
  limits: LimitsLabels;
  vault: VaultLabels;
  cadence: CadenceLabels;
  waffle: WaffleLabels;
  versions: VersionLabels;
  ideas: IdeaLabels;
  guards: GuardLabels;
  install: ReleaseLabels;
};
export type FigureKey = keyof Figures;

/**
 * Plain-language explanation of one element of a figure. `id` matches a `data-explain` attribute the figure
 * draws, so pointing at (or tapping) that element shows `body`. Written for a reader who has never heard of
 * PG: what the thing does, when it acts, and one real example.
 */
export type Explain = { id: string; term: string; body: string };
/**
 * Explanations per figure. Partial only so the type allows a figure that is not finished yet; every figure on
 * the page must have entries, and `Explain.test.ts` fails when one has none.
 */
export type Explains = Partial<Record<FigureKey, Explain[]>>;
export type ExplainUi = { hint: string; pick: string; close: string };

/**
 * One section of the article. `id` is the same in both languages (an English slug), so a shared link like
 * /claude#review lands on the same section whichever language the reader picks. `part` groups sections
 * for the page map at the top.
 */
export type Section = {
  id: string;
  part: number;
  title: string;
  lead?: string;
  paragraphs?: string[];
  figure?: FigureKey;
  items?: Item[];
  /** Questions and answers, shown folded: `label` is the question, `body` the answer. */
  faq?: Item[];
  code?: string[];
  link?: LinkRef;
};

export type Part = { title: string; blurb: string };

export type Content = {
  title: string;
  role: string;
  tocLabel: string;
  mapTitle: string;
  mapLead: string;
  versionLine: string;
  intro: string;
  repoCta: string;
  stats: Stat[];
  statsNote: string;
  parts: Part[];
  sections: Section[];
  figures: Figures;
  explain: Explains;
  explainUi: ExplainUi;
  colophon: string;
};
