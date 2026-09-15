# REVIEW-LEARNINGS — pamiec recenzenta (wzor: CodeRabbit Learnings)

Regly wyniesione z korekt Kamila w PR-ach i z incydentow. KAZDY recenzent
(claude-review na PR, code-reviewer w sesji, petla auto-improve) MUSI je czytac
i stosowac przed ocena kodu. Petla auto-improve dopisuje wpisy automatycznie
z dyskusji PR; mozna tez dopisywac recznie.

Format wpisu (jedna linia, konkret, bez lania wody):

- [RRRR-MM-DD] regula (zrodlo: PR #n / sesja / incydent)

## Wpisy

- [2026-07-18] Repo Lovable: deploy idzie przez push do main — nie proponuj blokowania direct-push; zmiany jakosci przez PR (zrodlo: sesja wdrozeniowa pipeline)
- [2026-07-18] Nie dodawaj vercel.json ani supabase/migrations w projektach Lovable (zrodlo: CLAUDE.md global)
- [2026-09-12] `on.pull_request.types: [labeled, unlabeled]` nie filtruje po nazwie etykiety — job-level `if` musi sam sprawdzic `github.event.label.name`, inaczej kazda etykieta odpala pelny job (zrodlo: review PR #15, poprawka #16)
- [2026-09-15] Zmieniajac wlasciwosc CSS w istniejacej regule (color, scroll-margin-top...), `grep -n` cala regule: ta sama wlasciwosc nizej w bloku wygrywa i poprawka jest martwa, a strona i tak sie renderuje, wiec audyt wizualny tego nie zlapie. Po zmianie koloru bazowego sprawdz tez :hover/:focus, czy nie staly sie no-opem (zrodlo: review PR #35)
