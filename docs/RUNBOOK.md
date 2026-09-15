# RUNBOOK — operacje i awarie

<!-- Ten plik czyta czlowiek o 3 w nocy — zero prozy, same komendy. -->

## Podstawy

- Produkcja: https://kamiljan.com (weryfikacja live: `curl -I https://kamiljan.com` -> `Server: Vercel`)
- Hosting: Vercel — panel projektu w koncie Vercel Kamila
- Domena: kamiljan.com — rejestrator **Name.com** (nie ISNIC — to domena .com, nie .is)
- Repo: github.com/kamiljan11/comfy-container (prywatne)
- Sekrety: Vercel Project Settings -> Environment Variables (nazwy w `.env.example`); zadnych
  sekretow w repo. Infisical "MAS Group" (localhost:8222) trzyma kopie/inne projekty floty, ale
  runtime tego serwisu czyta wylacznie ze zmiennych srodowiskowych Vercela.

## Deploy

- Standard: merge/push do `main` -> Vercel deployuje automatycznie (brak przycisku Publish, patrz
  `docs/adr/0001-lovable-to-vercel-hosting.md`).
- Reczny fallback: `npm run build` lokalnie tylko do weryfikacji builda — nie wgrywa niczego,
  produkcja idzie wylacznie przez Vercel.

## Testy E2E (Playwright)

- CI: job `E2E smoke (Playwright)` w `.github/workflows/quality.yml` (wymagany check) -> `npx playwright test`
  z `playwright.config.ts`. Do 2026-09-15 w repo nie bylo configu, wiec job przechodzil bez uruchomienia testu.
- Serwer testowy: `webServer` buduje z `NITRO_PRESET=node-server` i startuje `node .output/server/index.mjs`
  na porcie 4173. `vite preview` NIE dziala dla tego builda (plugin TanStack szuka `dist/server/server.js`,
  nitro pisze `.output/`).
- Lokalnie: `npx playwright install chromium` (raz), potem `npx playwright test`. Poza CI dzialajacy serwer
  na 4173 jest uzywany ponownie.
- `workers: 1` celowo: strona glowna renderuje scene Three.js, rownolegle przegladarki dawaly timeouty
  przy zamykaniu kontekstu (6/12 lokalnie); na jednym workerze 12/12.
- Klucze API niepotrzebne: chatbot wola serwer dopiero po wyslaniu wiadomosci, testy tego nie robia.
- Porazka: `test-results/<test>/error-context.md` (snapshot strony) + `npx playwright show-trace test-results/<test>/trace.zip`.
- W CI: przy porazce artefakt `playwright-test-results` (Summary runu, 7 dni) = ten sam `test-results/`;
  job ma `timeout-minutes: 20`. Decyzja o buildzie node-server: `docs/adr/0004-e2e-against-node-server-build.md`.
- Specy: `e2e/smoke.spec.ts` (strona glowna bez bledow konsoli), `e2e/palette.spec.ts` (paleta komend +
  regresja: drugi skok do case study na tej samej stronie otwiera wlasciwe studium).

## Rollback (cel: <5 min)

```bash
git revert <sha-zlego-commita> && git push   # -> redeploy automatyczny na Vercel
# albo: Vercel dashboard -> Deployments -> poprzedni deploy -> "Promote to Production"
```

## Monitoring

- Bledy runtime: **brak APM/Sentry w tym repo** (Sentry pojawia sie w tresci case studies jako
  opis INNYCH projektow Kamila, nie tego serwisu) — jedyne zrodlo bledow to Vercel Function Logs
  w dashboardzie.
- Healthcheck: brak dedykowanego endpointu — strona glowna (`/`) zwracajaca 200 jest healthcheckiem.
- CI: zakladka Actions w repo (Quality Gate musi byc zielony).
- Awaria bota/leada: sprawdz, czy `ANTHROPIC_API_KEY`/`RESEND_API_KEY` sa ustawione w Vercel —
  bez nich system degraduje sie celowo (patrz `docs/ARCHITECTURE.md` -> Kill switch), nie pada.

## Typowe awarie

| Objaw                              | Pierwszy krok                                                          |
| ----------------------------------- | ----------------------------------------------------------------------- |
| Strona nie wstaje po deploy         | rollback (wyzej), potem debug na branchu                                |
| Bot odpowiada "unconfigured"        | `ANTHROPIC_API_KEY` brak/wygasl w Vercel — sprawdz i ustaw ponownie      |
| Lead nie dociera mailem             | Leady (chat + `/kontakt`) ida prosto do Resend w `lead.server.ts`, NIE przez stub z `email.server.ts`. W Vercel Function Logs szukaj `[lead]`: `RESEND_API_KEY missing` (brak klucza, formularz pokazuje „nie dziala”), `Resend rejected the email {status}` (klucz/nadawca), `Resend request failed` (siec), `rate-limited` (>5 zgloszen / 10 min z jednego IP). `AI brief failed` = mail poszedl bez podsumowania |
| Blad 500 na dowolnej akcji          | Vercel Function Logs -> stack trace -> `systematic-debugging`           |
| Wygasly sekret/API key              | Vercel env vars -> zrotuj -> redeploy (push pusty commit lub Redeploy)   |
| Domena/DNS                          | panel Name.com (rejestrator) + Vercel Domains tab                       |

## Kontakty

- Wlasciciel: Kamil Jan, mountainallservice@gmail.com
- Klient: brak — to wlasna strona Kamila (portfolio/CV), nie projekt klienta
