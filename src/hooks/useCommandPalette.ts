import { useEffect, useState } from "react";
import { isMacPlatform, isPaletteShortcut, shortcutHint } from "../lib/palette";

/**
 * Open state and the global shortcut of the command palette. Ctrl+K (⌘K on a
 * Mac) toggles it from anywhere on the site; which keys count is decided by the
 * tested `isPaletteShortcut`. The hint starts as "Ctrl K" — what the server
 * renders — and becomes "⌘K" once the browser says it is a Mac.
 */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(false);

  useEffect(() => {
    const isMac = isMacPlatform(navigator.userAgent);
    setMac(isMac);
    const onKey = (e: KeyboardEvent) => {
      if (!isPaletteShortcut(e, isMac)) return;
      e.preventDefault();
      setOpen((o) => !o);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return { open, setOpen, shortcut: shortcutHint(mac) };
}
