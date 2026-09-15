import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { type Lang } from "../i18n";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  PALETTE_COPY,
  paletteItems,
  paletteKeywords,
  paletteScore,
  type PaletteGroup,
} from "../lib/palette";

/**
 * The site's command palette (Ctrl+K / ⌘K, or the search button in the
 * header). Reuses the installed Radix dialog and cmdk primitives; the look
 * comes from `.cmdp` in site.css, because the shadcn theme tokens here are the
 * light template ones, not the site's. What it lists and how it matches lives
 * in src/lib/palette.ts (tested); this file only renders it.
 */

const GROUPS: PaletteGroup[] = ["pages", "services", "areas", "cases"];
const EMAIL = "hello@kamiljan.com";

type Props = {
  lang: Lang;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleLang: () => void;
};

export function CommandPalette({ lang, open, onOpenChange, onToggleLang }: Props) {
  const navigate = useNavigate();
  const t = PALETTE_COPY[lang];
  const items = useMemo(() => paletteItems(lang), [lang]);
  // Every opening starts with an empty search. Ctrl+K pressed while the dialog is
  // still animating closed reuses the mounted content, which kept the last query.
  // Reset while rendering the opening (React's "adjust state on a prop change"),
  // so the old query is never painted, not even for one frame as with an effect.
  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setQuery("");
  }

  const go = (href: string) => {
    onOpenChange(false);
    void navigate({ href });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="cmdp">
        <DialogTitle className="sr-only">{t.title}</DialogTitle>
        <DialogDescription className="sr-only">{t.description}</DialogDescription>
        <Command filter={paletteScore} loop>
          <CommandInput placeholder={t.placeholder} value={query} onValueChange={setQuery} />
          <CommandList>
            <CommandEmpty>{t.empty}</CommandEmpty>
            {GROUPS.map((group) => (
              <CommandGroup key={group} heading={t.groups[group]}>
                {items
                  .filter((i) => i.group === group)
                  .map((i) => (
                    <CommandItem
                      key={i.id}
                      value={i.id}
                      keywords={paletteKeywords(i)}
                      onSelect={() => {
                        go(i.href);
                      }}
                    >
                      <span className="cmdp-label">{i.label}</span>
                      <span className="cmdp-hint">{i.hint}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
            <CommandGroup heading={t.groups.actions}>
              {/* stays open on purpose: the list re-renders in the other language and the search goes on */}
              <CommandItem value="action:lang" keywords={[t.switchLang]} onSelect={onToggleLang}>
                <span className="cmdp-label">{t.switchLang}</span>
              </CommandItem>
              <CommandItem
                value="action:email"
                keywords={[t.email, EMAIL]}
                onSelect={() => {
                  onOpenChange(false);
                  window.location.href = `mailto:${EMAIL}`;
                }}
              >
                <span className="cmdp-label">{t.email}</span>
                <span className="cmdp-hint">{EMAIL}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
