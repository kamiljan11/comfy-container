import { type ReactNode } from "react";
import { type Lang } from "../../i18n";
import { type DrawingProps } from "./Frame";
import { AdministracjaIDokumenty } from "./AdministracjaIDokumenty";
import { AiWProcesach } from "./AiWProcesach";
import { AutomatyzacjaProcesow } from "./AutomatyzacjaProcesow";
import { DaneIRaporty } from "./DaneIRaporty";
import { DoradztwoAi } from "./DoradztwoAi";
import { HrIRekrutacja } from "./HrIRekrutacja";
import { Integracje } from "./Integracje";
import { NietypoweProcesyAi } from "./NietypoweProcesyAi";
import { ObslugaKlienta } from "./ObslugaKlienta";
import { SprzedazIMarketing } from "./SprzedazIMarketing";
import { SystemyDlaFirm } from "./SystemyDlaFirm";
import { WdrozenieISzkolenie } from "./WdrozenieISzkolenie";

/**
 * One before/after drawing per service and area page, shown in the hero of
 * ServicePageBody. Twelve inline SVGs (drawn and then reviewed by a visual
 * critic pass, 2026-09-13), one file each, keyed by the page slug.
 *
 * Every colour is a CSS variable with a fallback, so the drawings follow the
 * site tokens; the dashed "flow" paths animate through .ill-flow in site.css,
 * which is gated behind prefers-reduced-motion: no-preference. Numbers inside
 * the drawings are digits only — nothing to translate.
 */

/** Page slug -> drawing. Service and area slugs never overlap. */
const BY_SLUG: Record<string, (p: DrawingProps) => ReactNode> = {
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
