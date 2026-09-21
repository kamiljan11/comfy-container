# 0005 — The books on /ksiazki as a flipbook of pre-rendered pages

- Status: accepted
- Date: 2026-09-21

## Context

Kamil asked for the two free books to be readable on the page as an interactive book, on a
phone and on a desktop, styled to the site, instead of only offering the PDFs. The short book
has 99 A5 pages, the full one 199.

Options looked at (GitHub and npm data checked on 2026-09-21):

- **pdf.js in the browser**: renders the PDF directly, but ships a large library and renders
  every page on the device, which is slow on phones.
- **turn.js**: the best-known flipbook, but jQuery-based and not cleanly open source.
- **react-pageflip** (wraps `page-flip`, MIT): about 60 000 weekly downloads, touch and swipe,
  single-page mode on narrow screens. It shows images or HTML, not PDFs, and declares no React
  peer dependency, so React 19 support is unverified and has to be tested here.
- Small React flipbooks with PDF support: under 120 weekly downloads and under 70 stars.

## Decision

Pages are rendered once, offline, from the PDFs in `public/books/` to WebP files in
`public/books/pages/<book>/` by `scripts/render-book-pages.py` (PyMuPDF + Pillow, scale 1.6,
quality 74: about 50 KB a page on average, about 15 MB for both books). A manifest,
`src/data/bookPages.ts`, is generated with the page counts so the component never guesses.

`react-pageflip` and `page-flip` are pinned to exact versions (`page-flip` too, because
`react-pageflip` depends on it as `"latest"`). The flipbook is loaded client-only with
`React.lazy`, so server rendering never touches the DOM-bound library, and the page stays
usable without it: the PDF download buttons remain, and if the library fails to load the error
is logged and the reader keeps those buttons.

We add what the library lacks: arrow-key navigation, and `prefers-reduced-motion` turning the
flip animation off.

## Consequences

- When a PDF changes, the script has to be run again and the images committed. The manifest
  test fails if the image count and the manifest disagree.
- Links inside the PDF (for example "read the full chapter") are not clickable in the images;
  the PDF download stays for that.
- About 15 MB of static images in the repo.
- Rollback: revert the PR; nothing else depends on these files.
