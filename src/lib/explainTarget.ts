/** The `data-explain` id of the element under a pointer or tap, or null outside any explained element. */
export function explainIdAt(target: EventTarget | null): string | null {
  const el =
    typeof Element !== "undefined" && target instanceof Element
      ? target.closest("[data-explain]")
      : null;
  return el ? el.getAttribute("data-explain") : null;
}
