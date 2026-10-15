# Liczby na /claude: skad sa i jak je przeliczyc

Kazda liczba na kamiljan.com/claude (pliki `src/content/claude/en.ts` i `pl.ts`) ma tu zrodlo i komende.
Stan: 14 pazdziernika 2026, PG 1.8.0. Liczby w obu jezykach musza byc identyczne — pilnuje tego
`src/content/claude/content.test.ts`. Kiedy przeliczasz: po wydaniu `kamiljan11/coding-higher-mind`
albo gdy zdanie w artykule przestaje byc prawda (PG jest w trybie utrzymania, wiec rzadko).

Wszystko liczone na laptopie Kamila. Komendy z GitHubem ida przez most Infisical:
`cd ~/infisical && python3 infisical_bridge.py run --secrets GITHUB_Token -- bash -c 'export GH_TOKEN=$GITHUB_Token; <komenda>'`.

## Publiczne repo (kazdy moze przeliczyc)

Checkout `kamiljan11/coding-higher-mind`, commit `8b5d960` (PG 1.8.0).

| liczba na stronie                                                   | komenda                                                                                                                                                                                                     | wynik 14.10             |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 11 hookow na 7 zdarzeniach                                          | `python3 -c "import json;h=json.load(open('settings.pg-hooks.json'))['hooks'];print(len(h), len({c['command'].split('/')[-1].split()[0].strip('\"') for e in h.values() for m in e for c in m['hooks']}))"` | `7 11`                  |
| 170 blizn                                                           | `grep -cE '^\| [A-Z][A-Z0-9-]+ \|' pg/cases.md`                                                                                                                                                             | 170                     |
| 51 narzedzi, 28 zestawow testow                                     | `ls bin \| grep -v '^test_' \| grep -vc '^lib$'` ; `ls bin \| grep -c '^test_'`                                                                                                                             | 51 ; 28                 |
| 9 recenzentow (7 dzialow + weryfikator + adwokat diabla `catfish`)  | `ls agents \| grep -vc landscape-reader` (`landscape-reader` to czytnik obcych repo, nie recenzent)                                                                                                         | 9                       |
| 18 skilli w eksporcie                                               | `python3 -c "import json;print(len(json.load(open('skills.json'))['skills']))"`                                                                                                                             | 18                      |
| 409 plikow                                                          | `git ls-tree -r --name-only HEAD \| wc -l`                                                                                                                                                                  | 409                     |
| 15 wersji w 33 dni                                                  | `grep -E '^## \[?[0-9]' CHANGELOG.md` (1.0.0 = 2026-09-12 ... 1.8.0 = 2026-10-14)                                                                                                                           | 15                      |
| rundy recenzji 1.7.0 (1+11, 1+13, 0+11, 0+8, 0+9, 0+8, koncowe 1+2) | `pg/adr/0004-bramki-wdrozenia-bake-watch-rollback.md`, akapity "Aktualizacja v2" ... "v7-v8" (koncowe = r7 1 blocker + 1 major, r8 1 major)                                                                 | jak obok                |
| progi 1.8.0 (400 -> 1500 linii, 6x w 3 plikach, ...)                | wpis `[1.8.0]` w `CHANGELOG.md`                                                                                                                                                                             | jak w tabeli kalibracji |

## Laptop (prywatne, liczy Kamil albo jego agent)

| liczba na stronie                 | komenda                                                                                                                                                                | wynik 14.10                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| 606 sprawdzen w testach bramek    | `cd ~/.claude && node bin/test_hooks_v3.js 2>&1 \| grep -c '^ok'`                                                                                                      | 606                              |
| 157 sekretow                      | `cd ~/infisical && python3 infisical_bridge.py check \| grep -cE '^\s*[-*]?\s*[A-Z][A-Z0-9_]{2,}'` (same nazwy, nigdy wartosci)                                        | 157                              |
| 114 skilli (56 + 58)              | `ls -d ~/.claude/skills/*/ \| wc -l` ; `ls -d ~/.config/Claude/local-agent-mode-sessions/skills-plugin/*/*/skills/*/ \| awk -F/ '{print $(NF-1)}' \| sort -u \| wc -l` | 56 ; 58                          |
| 2300+ notatek                     | `find ~/Obsidian/MAIN -name '*.md' -not -path '*/.stversions/*' -not -path '*/.trash/*' -not -path '*/.obsidian/*' \| wc -l`                                           | > 2300                           |
| okno 1M = ok. 2,3x limitu vs 400k | szacunek z transkryptow (`~/.claude/CLAUDE.md`, sekcja Long-Session Context Hygiene)                                                                                   | szacunek, tak opisany na stronie |
| 4,9 -> 0,9 KB, 35 -> 25 KB        | wpisy `[1.4.0]` i `[1.8.0]` w publicznym `CHANGELOG.md`                                                                                                                | jak obok                         |

## GitHub (konto kamiljan11)

| liczba na stronie                            | komenda                                                                                                                       | wynik 14.10 |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 47 repozytoriow                              | `gh repo list kamiljan11 --limit 200 --no-archived --json name --jq length`                                                   | 47          |
| 33 z ochrona galezi, 31 scisla               | dla kazdego repo `gh api repos/kamiljan11/<repo>/branches/<domyslna>/protection` (jest = chroniona; `"strict":true` = scisla) | 33 / 31     |
| 44 z alertami Dependabot                     | dla kazdego repo `gh api repos/kamiljan11/<repo>/vulnerability-alerts` (204 = wlaczone)                                       | 44          |
| 12 aktywnych / 34 w spoczynku / 1 wykluczone | `python3 ~/.claude/bin/fleet-active-repos.py --json` (klucze `active`, `dormant`, `excluded`)                                 | 12 / 34 / 1 |

## Audyty (zrodlo = zapis audytu, nie komenda)

| liczba                                                                                         | zrodlo                                                                                                                   |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 437 opcji: 46 % / 26 % / 28 %                                                                  | wpis `[1.5.0]` w publicznym CHANGELOG                                                                                    |
| 37 obszarow, decyzja wymuszona: 15 / czesciowo 11 / wcale 11                                   | audyt 2026-10-06; ta sama liczba byla w poprzedniej wersji /claude (sekcja 1.5.0, przed przepisaniem)                    |
| aplikacja klienta: 31 / 5 / 1                                                                  | wpis `[1.5.0]` w publicznym CHANGELOG                                                                                    |
| 66 luk                                                                                         | prywatny log `~/Obsidian/MAIN/Log/Done.md` (2026-10-06, "triage 66 luk"); publiczny CHANGELOG pisze ostroznie "about 60" |
| 6 z 7 repo bez ADR, changelog 105 commitow w tyle, review w 2,5 % sesji, 79 % commitow na main | audyt startowy PG, `README.md` publicznego repo                                                                          |
| 75,8 %                                                                                         | `README.md` publicznego repo (benchmark ze zrodlem)                                                                      |
| 58 %, 61-77 % vs 22-35 %                                                                       | `docs/VERIFIED-PROTOCOL.md` publicznego repo (badania ze zrodlami)                                                       |
