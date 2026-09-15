import { type ReactNode } from "react";
import { type Lang } from "../../i18n";

export type DrawingProps = { lang: Lang };
export type Copy = Record<Lang, { title: string; desc: string }>;

/**
 * The shared shell of every hero drawing: a 640x360 viewBox, role="img", and
 * a title + description in the page language. The ids are namespaced by the
 * page slug so two drawings on one page never collide in aria-labelledby.
 */
export function Frame({
  id,
  copy,
  children,
}: {
  id: string;
  copy: Copy[Lang];
  children: ReactNode;
}) {
  const titleId = `ill-${id}-t`;
  const descId = `ill-${id}-d`;
  return (
    <svg
      className="ill"
      viewBox="0 0 640 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
    >
      <title id={titleId}>{copy.title}</title>
      <desc id={descId}>{copy.desc}</desc>
      {children}
    </svg>
  );
}
