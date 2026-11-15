# Liczby na /claude: skad sa i jak je przeliczyc

Kazda liczba na kamiljan.com/claude (pliki `src/content/claude/en.ts` i `pl.ts`) ma tu zrodlo i komende.
Objasnienia elementow rysunkow (`explain.en.ts` / `explain.pl.ts`) nie wprowadzaja wlasnych liczb: kazda liczba z nich
musi juz stac w artykule w tym samym jezyku (pilnuje `src/components/claude/Explain.test.ts`). To samo dla ostatniej
czesci (`tell.en.ts` / `tell.pl.ts`: wersje skrocone i pytania; pilnuje `src/content/claude/content.test.ts`). Test widzi tylko liczby zapisane cyframi; slowne ("piec minut", "osiem do dziesieciu") sprawdzasz recznie. Przeliczasz artykul -> sprawdz tez je.
Rysunki `ideas`, `guards` i `install` tez nie maja wlasnych liczb (79 %, 185, 75.8 %, Node 20+, 464 pliki, 1.9.0 pochodza z
sekcji obok; pilnuje `content.test.ts`).
Stan: 4 listopada 2026, PG 1.9.0. Liczby w obu jezykach musza byc identyczne — pilnuje tego
`src/content/claude/content.test.ts`. Wersja PG stoi tez poza plikami tresci: opis strony w `src/routes/claude.tsx`
(meta `description`, wyniki wyszukiwania i podglady linkow); ten sam test pilnuje, ze ma te sama wersje co `versionLine`.
Data konca paska wersji stoi slownie w objasnieniu paska (`explain.*.ts`, klucz `strip`; ostatnie wydanie, 4 listopada).
Status rysunku rutyn (`figures.cadence.status`) ma wlasna date stanu rutyn (15 listopada: wlaczenie zegara kontroli
zdrowia); obie sprawdzasz recznie. Kiedy przeliczasz: po wydaniu `kamiljan11/coding-higher-mind`
albo gdy zdanie w artykule przestaje byc prawda (PG jest w trybie utrzymania, wiec rzadko).

Komendy z GitHubem potrzebuja tokenu z dostepem do konta w `GH_TOKEN`. Token bierzesz z sejfu sekretow
(nigdy z pliku w repo ani z czatu). Liczby z sekcji "Prywatne" liczy wlasciciel systemu na swojej maszynie;
tu jest tylko, co liczy dana komenda, bez prywatnych sciezek.

## Publiczne repo (kazdy moze przeliczyc)

Checkout `kamiljan11/coding-higher-mind`, commit `7c26d75` (PG 1.9.0).

| liczba na stronie                                                   | komenda                                                                                                                                                                                                     | wynik 4.11              |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 14 hookow na 8 zdarzeniach                                          | `python3 -c "import json;h=json.load(open('settings.pg-hooks.json'))['hooks'];print(len(h), len({c['command'].split('/')[-1].split()[0].strip('\"') for e in h.values() for m in e for c in m['hooks']}))"` | `8 14`                  |
| 185 blizn                                                           | `grep -cE '^\| [A-Z][A-Z0-9-]+ \|' pg/cases.md`                                                                                                                                                             | 185                     |
| 61 narzedzi, 46 zestawow testow                                     | `ls bin \| grep -v '^test_' \| grep -vc '^lib$'` ; `ls bin \| grep -c '^test_'`                                                                                                                             | 61 ; 46                 |
| 9 recenzentow (7 dzialow + weryfikator + adwokat diabla `catfish`)  | `ls agents \| grep -vc landscape-reader` (`landscape-reader` to czytnik obcych repo, nie recenzent)                                                                                                         | 9                       |
| 19 skilli w eksporcie                                               | `python3 -c "import json;print(len(json.load(open('skills.json'))['skills']))"`                                                                                                                             | 19                      |
| 464 pliki                                                           | `git ls-tree -r --name-only HEAD \| wc -l`                                                                                                                                                                  | 464                     |
| 16 wersji w 54 dni (z dniem wydania 1.0.0)                          | `grep -E '^## \[?[0-9]' CHANGELOG.md` (1.0.0 = 2026-09-12 ... 1.9.0 = 2026-11-04)                                                                                                                           | 16                      |
| rundy recenzji 1.7.0 (1+11, 1+13, 0+11, 0+8, 0+9, 0+8, koncowe 1+2) | `pg/adr/0004-bramki-wdrozenia-bake-watch-rollback.md`, akapity "Aktualizacja v2" ... "v7-v8" (koncowe = r7 1 blocker + 1 major, r8 1 major)                                                                 | jak obok                |
| progi 1.8.0 (400 -> 1500 linii, 6x w 3 plikach, ...)                | wpis `[1.8.0]` w `CHANGELOG.md`                                                                                                                                                                             | jak w tabeli kalibracji |

## Prywatne (maszyna wlasciciela)

| liczba na stronie                                            | komenda                                                                                                                               | wynik 4.11                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| 730 sprawdzen w testach bramek                               | `node bin/test_hooks_v3.js 2>&1 \| grep -c '^ok'` w katalogu `~/.claude`                                                              | 730                              |
| 165 sekretow                                                 | polecenie `check` mostu do sejfu sekretow, liczba wypisanych NAZW (wartosci nigdy)                                                    | 165                              |
| 78 skilli (61 w narzedziu do kodu, 58 na pulpicie, 41 w obu) | `ls -d ~/.claude/skills/*/` ; katalog skilli aplikacji desktopowej, nazwy unikalne; czesc wspolna = `comm -12` obu posortowanych list | 61 ; 58 ; 41 wspolnych, 78 rozne |
| 2600+ notatek                                                | `find <vault> -name '*.md'` bez katalogow `.stversions`, `.trash`, `.obsidian`                                                        | > 2600                           |
| okno 1M = ok. 2,3x limitu vs 400k                            | szacunek z transkryptow sesji (globalne instrukcje agenta, sekcja o higienie kontekstu)                                               | szacunek, tak opisany na stronie |
| 4,9 -> 0,9 KB, 35 -> 25 KB                                   | wpisy `[1.4.0]` i `[1.8.0]` w publicznym `CHANGELOG.md`                                                                               | jak obok                         |

## Sekcje dopisane 15 listopada (koordynator wielu sesji, petla uzycia)

Stan tych liczb: 15 listopada 2026, `~/.claude` main `f404c63` (reszta strony nadal ma stan z 4 listopada). Kiedy przeliczac:
po kazdym tygodniowym przebiegu petli zmieniaja sie liczby z "pierwszego raportu" — strona podaje pierwszy raport z data, wiec
przeliczasz dopiero, gdy zdanie przestaje byc prawda (np. raport zacznie wskazywac martwe reguly).

| liczba na stronie                                                         | komenda / zrodlo                                                                                                                                                                                  | wynik 15.11              |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 27 mechanicznych regul wyszukiwania                                       | `grep -c "^\s*{ *id:" bin/pg-prechecks.js` w `~/.claude` (przed 15.11: 23)                                                                                                                        | 27                       |
| 60 minut i do 200 uzyc frazy dla pracy nad PG (zwykle 30 minut, 3 uzycia) | `hooks/lib/overrides.js`, wpis `ALLOW_CONTROL_PLANE: { ttlMin: 60, uses: 200 }` i wartosci domyslne w tym pliku                                                                                   | 60 / 200                 |
| 8 kandydatow, max 5 tygodniowo                                            | sekcja `PETLA UZYCIA` w logu `hooks/guard_health.py` (pierwszy przebieg 15.11); limit 5 = `pg/usage-loop.json`                                                                                    | 8 ; 5                    |
| bramka rozmiaru zmiany obejsciem 14 z 14                                  | ta sama sekcja, kandydat `noisy-hook:LARGE_DIFF` (pierwszy przebieg na zywym systemie 15.11; kolejne przebiegi licza dalej)                                                                       | 14/14                    |
| 36 w 14 repo, 22 w 9, 21 w 9, 12 w 8 (okno 28 dni)                        | sekcja `PETLA UZYCIA` (kandydaci `recurring:*`: naprawione w oknie 28 dni + liczba repo); sam `grep -c` na `logs/review-outcomes.jsonl` liczy cala historie, wiec daje wiecej (np. 43 zamiast 36) | jak obok                 |
| 6 tygodni migawek przed wskazaniem martwych regul                         | `pg/usage-loop.json` (`dead_weeks: 6`) i ADR-0013; raport pisze "potrzeba 7" migawek, bo 6 tygodni = 7 migawek tygodniowych                                                                       | 6 tygodni                |
| 188 zapisanych awarii (185 na 4 listopada)                                | `pg/adr/0014-wyzwalacze-z-blizn-observe.md`, akapit "Kontekst" (stan 15.11); katalog rosnie, wiec `grep` na `pg/cases.md` daje pozniej wiecej (193 tego samego dnia wieczorem)                    | 188                      |
| 0 trafien w ok. 5300 komendach Dockera                                    | ADR-0014, wiersz 1 tabeli (replay na 8778 transkryptach)                                                                                                                                          | 0 / ok. 5300             |
| 2 pliki na 2964 migracje                                                  | ADR-0014, wiersz 3 tabeli (26 repo)                                                                                                                                                               | 2 / 2964                 |
| 19 lekcji, 82 % okna, 10 % -> 36 %                                        | `LESSONS.md` w prywatnym repo `claude-orchestrator` (wiersze 3 i 8; liczba wierszy tabeli = 19)                                                                                                   | 19 ; 82 % ; 10 % -> 36 % |

## GitHub (konto kamiljan11)

| liczba na stronie                            | komenda                                                                                                                       | wynik 4.11  |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 50 repozytoriow                              | `gh repo list kamiljan11 --limit 200 --no-archived --json name --jq length`                                                   | 50          |
| 33 z ochrona galezi, 31 scisla               | dla kazdego repo `gh api repos/kamiljan11/<repo>/branches/<domyslna>/protection` (jest = chroniona; `"strict":true` = scisla) | 33 / 31     |
| 44 z alertami Dependabot                     | dla kazdego repo `gh api repos/kamiljan11/<repo>/vulnerability-alerts` (204 = wlaczone)                                       | 44          |
| 13 aktywnych / 36 w spoczynku / 1 wykluczone | `python3 bin/fleet-active-repos.py --json` (klucze `active`, `dormant`, `excluded`)                                           | 13 / 36 / 1 |

## Audyty (zrodlo = zapis audytu, nie komenda)

| liczba                                                                                         | zrodlo                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 437 opcji: 46 % / 26 % / 28 %                                                                  | wpis `[1.5.0]` w publicznym CHANGELOG                                                                                                                                                                                                               |
| 37 obszarow, decyzja wymuszona: 15 / czesciowo 11 / wcale 11                                   | audyt 2026-10-06; ta sama liczba byla w poprzedniej wersji /claude (sekcja 1.5.0, przed przepisaniem)                                                                                                                                               |
| aplikacja klienta: 31 / 5 / 1                                                                  | wpis `[1.5.0]` w publicznym CHANGELOG                                                                                                                                                                                                               |
| okolo 60 luk                                                                                   | wpis `[1.5.0]` w publicznym CHANGELOG ("about 60"); dokladna liczba jest tylko w prywatnym dzienniku, wiec strona podaje publiczna                                                                                                                  |
| 6 z 7 repo bez ADR, changelog 105 commitow w tyle, review w 2,5 % sesji, 79 % commitow na main | audyt startowy PG, `README.md` publicznego repo                                                                                                                                                                                                     |
| 75,8 %                                                                                         | benchmark arXiv 2606.09863. Strona (po fact-checku 15.11, commit `97f067c`): udzial porazek agenta zgloszonych jako sukces. `README.md` publicznego repo opisuje to jeszcze jako "sukcesy bez dowodu" — przy przeliczaniu sprawdz w pracy zrodlowej |
| 58 %, 61-77 % vs 22-35 %                                                                       | `docs/VERIFIED-PROTOCOL.md` publicznego repo (badania ze zrodlami)                                                                                                                                                                                  |
| 9 799 linii diffu, recenzent czytal 10-30 %                                                    | wpis `[1.5.0]` w publicznym CHANGELOG                                                                                                                                                                                                               |
| 62 wiersze macierzy obszarow                                                                   | wpis `[1.6.0]` w publicznym CHANGELOG (`docs/architecture/obszary.md`, 62 rows)                                                                                                                                                                     |
| 90 dni historii werdyktow                                                                      | `pg/adr/0003-recenzja-pg-review-w-ci-jako-dowod-auto-merge.md` w publicznym repo                                                                                                                                                                    |
| 35 projektow, plan z 23 pozycjami                                                              | wpis `[1.2.0]` w publicznym CHANGELOG ("35 open-source agent-guard projects"); 23 z zapisu porownania 2026-09-26, opublikowane juz w poprzedniej wersji /claude                                                                                     |
| 9 rund recenzji parsera                                                                        | decyzja o trybie utrzymania z 2026-10-14 (prywatna notatka decyzji); sygnal stopu opisany na stronie                                                                                                                                                |
| reguly recenzentow: code 9, data 8, ops 8, product 9, qa 11, security 9, ux 8                  | `grep -cE '^[0-9]+\. ' agents/<rola>-reviewer.md` w publicznym repo; strona pisze "krotka lista", bez jednej liczby                                                                                                                                 |
