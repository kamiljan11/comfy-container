# kamiljan.com — Personal Site

**Live:** [kamiljan.com](https://kamiljan.com) · **Status:** production · **Built by** [Kamil Jan](https://kamiljan.com)

Personal site and CV: what I build, what it is running in production, and how to get hold of
me. The public front for the work in the rest of this account.

## What it does

- **Home** — what I do, in one screen
- **Case studies** — the systems behind the products, written for someone deciding whether to
  work with me
- **CV** — background and contact

## Stack

React + TypeScript · Vite · TanStack Router · Tailwind CSS · hosted on Vercel.

No backend and no database. A personal site that needs a server is a personal site that will
be broken in two years.

## Running locally

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run build
npx tsc -b        # note: -b, not --noEmit (project references)
```

## How security is handled

No backend, no credentials, nothing to leak. The same gates run anyway: every push triggers
build, lint, typecheck, Semgrep static analysis and a Gitleaks secret scan, with a pre-commit
hook blocking credential-shaped strings.

## Licence

Proprietary. All rights reserved.
