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
  na porcie testowym jest uzywany ponownie.
- **Windows: `Error: Process from config.webServer exited early` = port zarezerwowany przez system.** Hyper-V/WSL
  rezerwuje cale zakresy portow (na tej maszynie m.in. 4122-4221, wiec domyslny 4173 w srodku). Serwer nie moze
  zbindowac i konczy sie po cichu z kodem 0, a Playwright widzi tylko "exited early". Sprawdz zakresy:
  `netsh interface ipv4 show excludedportrange protocol=tcp`, potem odpal z wolnym portem:
  `E2E_PORT=5200 npx playwright test`. Na Linuksie (CI) problem nie wystepuje.
- `workers: 1` celowo: strona glowna renderuje scene Three.js, rownolegle przegladarki dawaly timeouty
  przy zamykaniu kontekstu (6/12 lokalnie); na jednym workerze 12/12.
- Klucze API niepotrzebne. Jeden test (`e2e/mobile.spec.ts`, linki bledu w formularzu leada) wysyla formularz,
  ale przechwytuje `**/_serverFn/**` i zwraca 500, wiec zadanie nie dochodzi do `lead.server.ts`. W CI nie ma
  `RESEND_API_KEY`, a `sendLead()` i tak konczy sie wczesniej bez klucza.
- UWAGA przy recznym klikaniu formularza leada na lokalnym buildzie: jesli masz `RESEND_API_KEY` wyeksportowany
  w powloce, wyslanie formularza wysle PRAWDZIWEGO maila na `LEAD_TO` (domyslnie hello@kamiljan.com). Repo nie
  ma `.env`, wiec normalnie konczy sie to stanem bledu; do sprawdzania stanu bledu uzywaj przechwycenia jak w tescie.
- Porazka: `test-results/<test>/error-context.md` (snapshot strony) + `npx playwright show-trace test-results/<test>/trace.zip`.
- W CI: przy porazce artefakt `playwright-test-results` (Summary runu, 7 dni) = ten sam `test-results/`;
  job ma `timeout-minutes: 20`. Decyzja o buildzie node-server: `docs/adr/0004-e2e-against-node-server-build.md`.
- Specy: `e2e/smoke.spec.ts` (strona glowna bez bledow konsoli), `e2e/palette.spec.ts` (paleta komend +
  regresja: drugi skok do case study na tej samej stronie otwiera wlasciwe studium; Ctrl+K w trakcie animacji
  zamykania startuje z pustym wyszukiwaniem), `e2e/mobile.spec.ts` (projekt `mobile`, Pixel 7: brak przewijania
  w bok, portret na /o-mnie, 44 px linki siostrzane i linki panelu czatu, 16 px pola formularza).
- Pomiar kontrolek panelu czatu tylko przy OTWARTYM panelu i po `expect(panel).toHaveCSS("transform", "none")`:
  zamkniety `.chatbot-panel` ma `scale(.97)`, wiec kazda kontrolka mierzy sie jako 43 px zamiast 44, a w trakcie
  animacji otwierania 43.7 px. To zrodlo falszywych alarmow w audytach mobile.

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

## CI — bramka Mutation (`.github/workflows/mutation.yml`)

- Job "Mutation (zmienione pliki)" (wymagany): Stryker `@stryker-mutator/core` + `vitest-runner` 10.0.0 tylko na
  plikach `src/**/*.ts(x)` zmienionych w PR (bez testow/typow), `coverageAnalysis` perTest, `ignoreStatic`,
  prog `thresholds.break: 50`. Swiadome ominiecie = etykieta PR `allow-low-mutation`.
- Pliki bez logiki (tresc strony, dane) = `.github/mutation-exclude.txt`, jedna linia `<sciezka> # <powod>` (powod
  wymagany, dokladna sciezka). Krok „Zakres" pomija je z `::notice::`; PR zmieniajacy tylko takie pliki = job skipped.
- Blad „Zmienione pliki nie maja ZADNEGO testu" = dry run Strykera nie znalazl testu importujacego plik (vitest-runner
  odpala testy powiazane). To luka w testach, nie awaria narzedzia: dopisz test, a plik bez logiki dodaj do listy wyzej.
- Stryker liczy na **vitest@4.1.11** (`npm install --no-save` tylko w jobie; `package.json` zostaje na Vitest 5).
  Powod: runner 10.0.0 na Vitest 5 filtruje testy mutanta wzorcem "describe it", a Vitest 5 dopasowuje
  "describe > it" -> 0 testow na mutanta, wszystko "Survived" (PR #38: 0/24 i 0/80). Upstream: stryker-js#6210.
- Straznik po Strykerze: mutant "Survived" z `coveredBy` > 0 i `testsCompleted` 0 = FAIL
  "runner nie odpalil testow". Ten komunikat != slabe testy — sprawdz wersje vitest vs runner.
- Zdjecie pinu (gdy wyjdzie runner z fixem #6210): podbij runner w kroku Install, usun `vitest@4.1.11`, odpal
  reprodukcje nizej na Vitest 5 — straznik zielony i realne zabicia = mozna mergowac.

Reprodukcja lokalna 1:1 z CI (Git Bash, `pip install pyyaml`; wynik tez w `reports/mutation/mutation.json`):

```bash
npm ci
npm install --no-save --no-audit --no-fund @stryker-mutator/core@10.0.0 @stryker-mutator/vitest-runner@10.0.0 vitest@4.1.11
FILES=src/lib/caseStudyHash.ts,src/lib/palette.ts bash -eo pipefail <(python -c "import yaml; s = yaml.safe_load(open('.github/workflows/mutation.yml', encoding='utf-8'))['jobs']['mutation']['steps']; print(next(x for x in s if x.get('name', '').startswith('Stryker'))['run'])")
npm ci   # przywraca Vitest 5 z package-lock w node_modules
```

## Typowe awarie

| Objaw                        | Pierwszy krok                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Strona nie wstaje po deploy  | rollback (wyzej), potem debug na branchu                                                                                                                                                                                                                                                                                                                                                                            |
| Bot odpowiada "unconfigured" | `ANTHROPIC_API_KEY` brak/wygasl w Vercel — sprawdz i ustaw ponownie                                                                                                                                                                                                                                                                                                                                                 |
| Lead nie dociera mailem      | Leady (chat + `/kontakt`) ida prosto do Resend w `lead.server.ts`, NIE przez stub z `email.server.ts`. W Vercel Function Logs szukaj `[lead]`: `RESEND_API_KEY missing` (brak klucza, formularz pokazuje „nie dziala”), `Resend rejected the email {status}` (klucz/nadawca), `Resend request failed` (siec), `rate-limited` (>5 zgloszen / 10 min z jednego IP). `AI brief failed` = mail poszedl bez podsumowania |
| Blad 500 na dowolnej akcji   | Vercel Function Logs -> stack trace -> `systematic-debugging`                                                                                                                                                                                                                                                                                                                                                       |
| Wygasly sekret/API key       | Vercel env vars -> zrotuj -> redeploy (push pusty commit lub Redeploy)                                                                                                                                                                                                                                                                                                                                              |
| Domena/DNS                   | panel Name.com (rejestrator) + Vercel Domains tab                                                                                                                                                                                                                                                                                                                                                                   |

## Kontakty

- Wlasciciel: Kamil Jan, mountainallservice@gmail.com
- Klient: brak — to wlasna strona Kamila (portfolio/CV), nie projekt klienta
