import { useEffect, useMemo, useRef, useState } from "react";
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
  type PaletteItem,
} from "../lib/palette";

/**
 * The site's command palette (Ctrl+K / ⌘K, or the search button in the
 * header). Reuses the installed Radix dialog and cmdk primitives; the look
 * comes from `.cmdp` in site.css, because the shadcn theme tokens here are the
 * light template ones, not the site's. What it lists and how it matches lives
 * in src/lib/palette.ts (tested); this file only renders it.
 *
 * Two things happen without leaving the page: a question from any service or
 * area page is answered inside the palette, and the e-mail address copies
 * itself. Everything else navigates.
 */

const GROUPS: PaletteGroup[] = ["pages", "services", "areas", "cases", "faq"];
const EMAIL = "hello@kamiljan.com";
const WHATSAPP = "https://wa.me/3548888901";
const LINKEDIN = "https://linkedin.com/in/kamiljan11";

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
  // Every opening starts with an empty search and the list, never the answer a
  // previous visitor left open. Ctrl+K pressed while the dialog is still
  // animating closed reuses the mounted content, which kept both. Reset while
  // rendering the opening (React's "adjust state on a prop change"), so the old
  // query is never painted, not even for one frame as with an effect.
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<PaletteItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setAnswer(null);
      setCopied(false);
    }
  }

  // Focus follows the view: the list unmounts when an answer opens, and a
  // keyboard user left on a detached input has nowhere to type.
  const answerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!open) return;
    // one frame later: Radix's focus scope moves focus itself when the view
    // swaps, and doing it in the same tick loses the race
    const frame = requestAnimationFrame(() => {
      if (answer) answerRef.current?.focus();
      else inputRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [answer, open]);

  // "Copied" is feedback, not a new label: put the address back so the next
  // reader still sees what was copied.
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2_000);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  const go = (href: string) => {
    onOpenChange(false);
    void navigate({ href });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(
      () => {
        setCopied(true);
      },
      (err: unknown) => {
        // A denied or missing clipboard is not worth closing the palette over:
        // the address stays on screen next to the row, so it can still be read.
        console.warn("[palette] copying the e-mail address failed", err);
      },
    );
  };

  const openExternal = (href: string) => {
    onOpenChange(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="cmdp"
        onEscapeKeyDown={(e) => {
          // Escape in the answer view goes back to the list; it only closes the
          // palette when the list is what you are looking at. This has to be
          // Radix's own hook: its dismissable layer listens on the document and
          // closes before a handler on the content ever sees the key.
          if (answer) {
            e.preventDefault();
            setAnswer(null);
          }
        }}
      >
        <DialogTitle className="sr-only">{t.title}</DialogTitle>
        <DialogDescription className="sr-only">{t.description}</DialogDescription>
        {answer ? (
          <div className="cmdp-answer">
            <h2 className="cmdp-answer-q">{answer.label}</h2>
            <p className="cmdp-answer-a">{answer.answer}</p>
            <div className="cmdp-answer-actions">
              <button
                ref={answerRef}
                type="button"
                className="cmdp-answer-open"
                onClick={() => {
                  go(answer.href);
                }}
              >
                {t.answerOpen}
              </button>
              <button
                type="button"
                className="cmdp-answer-back"
                onClick={() => {
                  setAnswer(null);
                }}
              >
                {t.answerBack}
              </button>
            </div>
          </div>
        ) : (
          <Command filter={paletteScore} loop>
            <CommandInput
              ref={inputRef}
              placeholder={t.placeholder}
              value={query}
              onValueChange={setQuery}
            />
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
                          // a question answers itself here; everything else is a
                          // page. An FAQ row without an answer would navigate
                          // instead, which palette.test.ts rules out by checking
                          // every row carries one.
                          if (i.group === "faq" && i.answer) setAnswer(i);
                          else go(i.href);
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
                {/* also stays open: the point is to copy and carry on reading */}
                <CommandItem
                  value="action:copy"
                  keywords={[t.copyEmail, EMAIL]}
                  onSelect={copyEmail}
                >
                  <span className="cmdp-label">{t.copyEmail}</span>
                  <span className="cmdp-hint">{copied ? t.copied : EMAIL}</span>
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
                <CommandItem
                  value="action:whatsapp"
                  keywords={[t.whatsapp, "whatsapp"]}
                  onSelect={() => {
                    openExternal(WHATSAPP);
                  }}
                >
                  <span className="cmdp-label">{t.whatsapp}</span>
                  <span className="cmdp-hint">+354 888 8901</span>
                </CommandItem>
                <CommandItem
                  value="action:linkedin"
                  keywords={[t.linkedin, "linkedin"]}
                  onSelect={() => {
                    openExternal(LINKEDIN);
                  }}
                >
                  <span className="cmdp-label">{t.linkedin}</span>
                  <span className="cmdp-hint">linkedin.com/in/kamiljan11</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
            <div className="cmdp-foot" aria-hidden="true">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> {t.keyMove}
              </span>
              <span>
                <kbd>↵</kbd> {t.keyPick}
              </span>
              <span>
                <kbd>esc</kbd> {t.keyClose}
              </span>
            </div>
          </Command>
        )}
      </DialogContent>
    </Dialog>
  );
}
