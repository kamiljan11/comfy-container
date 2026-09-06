# Reguly pracy w tym repo (obowiazuja kazdego agenta AI i czlowieka)

## Zanim napiszesz JAKIKOLWIEK nowy kod

1. **Grep first.** Przeszukaj repo czy istniejaca funkcja/util/komponent robi to samo. Jesli tak — uzyj albo rozszerz. Duplikacja logiki = odrzucona zmiana.
2. Przeczytaj sasiednie pliki modulu, ktory zmieniasz. Trzymaj sie ich konwencji, nie swoich preferencji.
3. Zmiana architektoniczna (nowy modul, zaleznosc, wzorzec, schemat danych) -> najpierw ADR w `docs/adr/`, potem implementacja.

## Podczas pisania

4. **Male atomowe zmiany.** Jedna logiczna zmiana naraz. Nie mieszaj refaktoru z feature. Nie przepisuj plikow spoza zadania.
5. **Testy sa czescia zadania.** Nowa logika = testy w tej samej zmianie (happy path + najgrozniejsze edge case'y).
6. Bezpieczenstwo zawsze: parametryzowane zapytania, walidacja kazdego inputu, authz na poziomie rekordu, zadnych sekretow w kodzie — tylko env.
7. Nie wylaczaj lintera i nie uzywaj `any` / `@ts-ignore` / `eslint-disable` zeby "przeszlo". Napraw przyczyne.

## Zanim powiesz "gotowe" (Definition of Done)

8. Uruchom lint + typecheck + testy. Czerwone = nie jest gotowe.
9. Self-review diffa oczami wrogiego recenzenta: co tu sie wysypie o 3 w nocy?
10. Nie commituj z `--no-verify`. Czerwone CI to nie sugestia, to sciana.
11. **Dokumentacja rowna sie kod:** kazda zmiana funkcjonalna -> wpis w `CHANGELOG.md` [Unreleased]; zmiana setup/komend/env -> aktualizacja `README.md`; zmiana deploy/ops -> `docs/RUNBOOK.md`.
12. **Flow galezi:** feature branch -> PR -> zielone CI + review -> merge. Nie pushuj prosto na main.
13. **Release:** wersje SemVer; przy wydaniu przenies [Unreleased] pod numer, tagnij `vX.Y.Z`, push tag.

## PG v3 (2026-09-05): tier, paradygmat, dzialy

- `pg.tier_floor: T2` <!-- portfolio publiczne + realny lead-capture (AI + email) na produkcji; stop-gate podnosi tier z diffu, nigdy nie obniza -->
- Paradygmat: `~/.claude/pg/paradigm.md` — functional core / imperative shell; klasy tylko dla stanu z niezmiennikami; **obcy senior przejmuje repo w 1 dzien** (README 15 min, `docs/ARCHITECTURE.md`, `docs/GLOSSARY.md`, ADR, RUNBOOK — wszystkie cztery istnieja w tym repo, patrz `docs/`).
- Definition of Done per tier: `~/.claude/pg/dod.md`. Przed deployem: `~/.claude/pg/prr.md`. Incydent: `~/.claude/pg/postmortem.md` (action item = bramka/case).
- Review T2+: skill `pg-review` (finderzy dzialowi -> agregacja -> weryfikator). Metryki: `node ~/.claude/bin/fleet-metrics.js --repo .` (baseline: `docs/quality/baseline-metrics.json`).
- Lint/TS baseline: `eslint.config.js` (live) + `eslint.config.mas-strict.mjs` (strict-baseline proposal, nieporownany jeszcze — patrz `docs/quality/BACKLOG.md`); `tsconfig.json` juz ma `"strict": true`.
- Commity: Conventional Commits; PR wg `.github/pull_request_template.md`.

## Kontekst projektu

- Stack: TanStack Start/Router 1.16x + React 19 + Vite 7 + Tailwind 4 + shadcn/ui; AI = Anthropic Claude Haiku przez `@ai-sdk/anthropic`; mail = Resend; hosting = Vercel (git push = deploy). Brak bazy danych. Pelna mapa: `docs/ARCHITECTURE.md`.
- Komendy: `npm run dev` / `npm run build` / `npm run lint` / `npx tsc -b` / `npm test`
- Plik wzorcowy komponentu: `src/components/ChatBot.tsx` (stan + efekty + fallbacky UI)
- Plik wzorcowy API/serwisu: `src/server/lead.server.ts` (walidacja na brzegu, typed `Result`, zero silent throw)
