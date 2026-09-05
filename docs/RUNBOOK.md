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
| Lead nie dociera mailem             | `RESEND_API_KEY` brak -> transport = stub (tylko log); sprawdz Vercel Function Logs |
| Blad 500 na dowolnej akcji          | Vercel Function Logs -> stack trace -> `systematic-debugging`           |
| Wygasly sekret/API key              | Vercel env vars -> zrotuj -> redeploy (push pusty commit lub Redeploy)   |
| Domena/DNS                          | panel Name.com (rejestrator) + Vercel Domains tab                       |

## Kontakty

- Wlasciciel: Kamil Jan, mountainallservice@gmail.com
- Klient: brak — to wlasna strona Kamila (portfolio/CV), nie projekt klienta
