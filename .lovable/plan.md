# Odejście od Lovable: Supabase + Vercel

## Cel
Przenieść całą aplikację `kamiljan.com` z Lovable (hosting + Lovable Cloud) na własne konto **Supabase** (baza + auth) oraz **Vercel** (hosting + CI/CD), tak żeby deploy odbywał się przez `git push` bez ręcznego klikania "Publish".

## Stan obecny
- Frontend: **TanStack Start** (React 19 + Vite + Tailwind v4).
- Runtime: **Cloudflare Workers** — ustawione przez `wrangler.jsonc` i `@lovable.dev/vite-tanstack-config`.
- Backend: **Lovable Cloud** (Supabase pod spodem), ale w kodzie nie ma jeszcze wygenerowanych `@/integrations/supabase/*`.
- Sekrety: trzymane w Lovable (np. `LOVABLE_API_KEY`, `RESEND_API_KEY`).
- Domena: `kamiljan.com` oraz `www.kamiljan.com` obecnie zarządzane przez Lovable.
- Server functions: `createServerFn` z `src/lib/*.functions.ts` + helpery w `src/server/*.server.ts` (lead, email, subscribers, bot).

## Kluczowe decyzje do podjęcia

1. **Czy zostać przy TanStack Start, czy przepisać na Next.js?**
   - TanStack Start da się hostować na Vercel, ale wymaga zmiany presetu z Cloudflare Workers na `@tanstack/react-start-vercel` (lub nitro-vercel).
   - Next.js oznaczałby przepisanie routing, head, i18n, `createServerFn` na API routes / server actions — znacznie więcej pracy.
   - **Rekomendacja**: zostać przy TanStack Start i tylko zmienić adapter deployu.

2. **Czy używać Vercel Postgres / Supabase / innej bazy?**
   - Użytkownik wybrał Supabase.
   - **Rekomendacja**: Supabase dla auth, bazy PostgreSQL i ewentualnego storage. Zostawia też otwartą furtkę na RLS, realtime, edge functions.

3. **Jak rozwiązać "kliknięcie publish"?**
   - Vercel deployuje automatycznie po pushu na `main`.
   - Supabase migrations można wrzucać przez CLI w CI/CD.
   - Nie będzie już przycisku "Publish" — tylko `git push`.

## Plan krok po kroku

### Faza 1 — Przygotowanie kont i repozytorium (nie wymaga zmian w kodzie)

1. Załóż konto **Supabase** (supabase.com) i stwórz nowy projekt.
2. Załóż konto **Vercel** (vercel.com) i zaimportuj repozytorium GitHub z tego projektu.
3. Upewnij się, że repozytorium GitHub jest własnością użytkownika (a nie tylko synchronizowane z Lovable).
4. Zapisz:
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY` (anon/public)
   - `SUPABASE_SERVICE_ROLE_KEY` (serwisowy, tajny)

### Faza 2 — Zmiana środowiska i konfiguracji buildu

1. Zainstalować paczki dla Vercel + Supabase:
   - `@tanstack/react-start-vercel` (lub odpowiedni preset nitro)
   - `@supabase/supabase-js`
   - opcjonalnie `supabase` CLI do migracji
2. Zmienić `vite.config.ts`:
   - usunąć/wymienić `@lovable.dev/vite-tanstack-config`
   - użyć standardowej konfiguracji TanStack Start z presetem Vercel
3. Usunąć `wrangler.jsonc` i wszelkie Cloudflare-specific kod (np. komentarze KV w `subscribers.server.ts`).
4. Zmienić `package.json`:
   - usunąć cloudflare-specific scripts
   - dodać scripts pod Vercel (standardowe `build`, `dev`)
5. Dodać `.env.example` z nowymi zmiennymi (bez wartości):
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM`
   - `LEAD_TO`

### Faza 3 — Migracja server functions na Supabase

1. Wygenerować typy bazy Supabase (`supabase gen types typescript`) do `src/lib/supabase.types.ts`.
2. Stworzyć własny Supabase client browserowy w `src/lib/supabase.client.ts` (zamiast `@/integrations/supabase/client`).
3. Stworzyć client serwisowy w `src/lib/supabase.server.ts` (tylko dla serwera, importowany dynamicznie w `createServerFn`).
4. Dla każdej server function dodać migrację SQL, jeśli potrzebuje tabeli:
   - `subscribers` — tabela emaili (newsletter)
   - `leads` — tabela leadów z chatu/formularza
   - `contact_messages` — tabela wiadomości kontaktowych
5. Zmienić `src/server/subscribers.server.ts` żeby zamiast in-memory/KV zapisywać do Supabase.
6. Zmienić `src/server/lead.server.ts` i `src/server/email.server.ts` — logika zostaje, ale tabela leadów w Supabase zamiast konsoli.
7. Zmienić `src/lib/bot.functions.ts` — obecnie używa Lovable AI Gateway. Po odejściu od Lovable klucz `LOVABLE_API_KEY` przestanie działać. Opcje:
   - przełączyć bota na własny klucz OpenAI/Anthropic (użytkownik musi dodać swój klucz)
   - lub usunąć bota tymczasowo
   - **Rekomendacja**: użyć własnego klucza Anthropic/OpenAI i zapytać użytkownika, czy go dodać.

### Faza 4 — Migracja sekretów i zmienne środowiskowe

1. Dodać w Vercel Dashboard (Project Settings → Environment Variables):
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM`
   - `LEAD_TO`
   - nowy klucz AI (np. `ANTHROPIC_API_KEY` lub `OPENAI_API_KEY`) zamiast `LOVABLE_API_KEY`
2. Nie commitować żadnych wartości do repo.

### Faza 5 — Domena i DNS

1. W Vercel dodać domeny `kamiljan.com` i `www.kamiljan.com`.
2. W panelu zarządzania domeną (Lovable, jeśli tam kupiona) przekierować DNS na Vercel:
   - rekordy A na adresy Vercel
   - rekord CNAME dla `www` na `cname.vercel-dns.com`
3. Poczekać na propagację i wygenerować certyfikat SSL w Vercel.
4. W Supabase ustawić domeny dozwolone w redirect URLs (jeśli używamy auth).

### Faza 6 — Testy, build i go-live

1. Lokalnie: `npm install`, `npm run dev`, przeklikać wszystkie formularze (kontakt, newsletter, chat).
2. Lokalny build: `npm run build`, `npm run typecheck`, `npm run lint`.
3. Wypchnąć na `main` i poczekać na Vercel preview.
4. Sprawdzić wszystkie ścieżki: `/`, `/case-studies`, `/cv`, `/spirituality/*`, formularze, metadane, linki do mediów.
5. Przekierować ruch z Lovable na Vercel (przez DNS).
6. Po 24–48h przetestować maile, leady, newsletter, bota.

## Ryzyka i jak je ograniczyć

| Ryzyko | Ograniczenie |
|--------|--------------|
| Stracenie danych z obecnego Lovable Cloud | Przed migracją wyeksportować wszystko z Lovable Cloud (jeśli cokolwiek tam jest) lub zaakceptować start od zera. |
| Bot przestanie działać bez `LOVABLE_API_KEY` | Przenieść bota na własny klucz AI lub wyłączyć tymczasowo. |
| Formularze wysyłają maile w trybie stub | Ustawić `EMAIL_PROVIDER=resend` i dodać `RESEND_API_KEY` w Vercel. |
| Długa propagacja DNS | Obniżyć TTL przed zmianą, mieć preview URL z Vercel. |
| Lovable Cloud może być włączony i generować koszty | Po migracji wyłączyć Lovable Cloud / usunąć projekt z Lovable. |
| TanStack Start na Vercel to mniej testowany setup niż Next.js | Zrobić pełen build lokalnie i E2E przed go-live. |

## Szacunek pracy

- Założenie kont i repozytorium: 30 min
- Konfiguracja Vercel + zmiana buildu: 2–4h
- Podpięcie Supabase (client, typy, migracje): 3–5h
- Migracja formularzy i leadów na Supabase: 2–3h
- Migracja bota na własny klucz AI: 1–2h
- Domena, DNS, SSL: 30–60 min + propagacja
- Testy i poprawki: 2–4h

**Razem: około 1–2 dni roboczych** (nie licząc propagacji DNS i czekania na dostęp do konta).

## Co jest potrzebne od Ciebie

1. Wybór: czy zostajemy przy **TanStack Start**, czy chcesz przepisać na **Next.js**?
2. Klucz do AI bota — własny **OpenAI** czy **Anthropic**? (Lovable API Key nie będzie działać poza Lovable.)
3. Czy masz dostęp do zarządzania domeną `kamiljan.com` (rekordy DNS) w panelu Lovable?
4. Czy chcesz włączyć auth użytkowników w Supabase, czy na razie tylko baza danych dla leadów/newslettera?

## Rekomendacja końcowa

Najbardziej praktyczna droga to: **zostać przy TanStack Start, zmienić tylko adapter na Vercel, dodać Supabase jako bazę, i przełączyć bota na własny klucz AI**. Daje to automatyczne deploye przez `git push` bez przepisywania całej aplikacji.
