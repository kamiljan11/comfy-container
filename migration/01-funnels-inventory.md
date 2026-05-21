# MySpiritWay Migration Inventory

Captured: 2026-05-21
Source: Systeme.io dashboard (kamiljan@myspiritway.org account)
Target: kamiljan.com via `mountainallservice/comfy-container`

## 1:1 Funnel Mapping

Every Systeme.io funnel mapped to a public URL on myspiritway.org and the new route on kamiljan.com.

| # | Funnel Name (Systeme.io) | Created | Public URL (myspiritway.org) | New Route (kamiljan.com) | Status |
|---|---|---|---|---|---|
| 1 | MAINPAGE | 2024-01-26 | / | /spirituality | ✅ Hub route built |
| 2 | DMT | 2024-01-26 | /dmt + /dmtpractice | /spirituality/dmt | ✅ Content live |
| 3 | Simplified Practical Spirituality | 2024-02-26 | /sps | /spirituality/sps | ✅ Full book (6 parts) |
| 4 | Integrate Your Shattered Self | 2024-11-10 | /iyss | /spirituality/iyss | ✅ Placeholder + content |
| 5 | Simplified Practical Spirituality - Short Summary | 2025-05-26 | /sps2 | /spirituality/sps2 | ✅ Full content |
| 6 | 1:1 Consultation - MOFU - Clarity Call | 2025-10-02 | /clarity | /spirituality/clarity | ⏳ TODO iter 6 |
| 7 | BOFU - 3 products spiritual marketing | 2025-10-05 | /spiritual-marketing | /spirituality/spiritual-marketing | ⏳ TODO iter 6 |
| 8 | newsletter widgets | 2025-11-23 | (embedded widgets) | (inline signup forms) | ⏳ TODO iter 5 |
| 9 | Szkolenie z Marketingu | 2025-12-09 | /spiritual-marketing-blog (PL) | /spirituality/marketing-training | ⏳ TODO iter 6 |

## Public Page Inventory (myspiritway.org)

| Path | Purpose | Funnel | Migrated? |
|---|---|---|---|
| `/` | Main landing | MAINPAGE | ✅ → /spirituality |
| `/sps` | Complete book | SPS funnel | ✅ → /spirituality/sps |
| `/sps2` | Short summary | SPS Short Summary | ✅ → /spirituality/sps2 |
| `/dmt` | DMT intro | DMT funnel | ✅ → /spirituality/dmt |
| `/dmtpractice` | DMT live practice | DMT funnel | ⏳ TODO iter 6 |
| `/iyss` | Integrate Shattered Self | IYSS funnel | ✅ placeholder → /spirituality/iyss |
| `/aboutkamiljan` | About | MAINPAGE | ✅ → /spirituality/about |
| `/support_myspiritway` | Fair Exchange | MAINPAGE | ✅ → /spirituality/support |
| `/contact-myspiritway` | Contact | MAINPAGE | ✅ → /spirituality/contact |
| `/blog/posts` | Blog index | MAINPAGE | ⏳ TODO iter 6 |
| `/blog/modular-yoga-asana-for-daily-practice` | Blog post | MAINPAGE | ⏳ TODO iter 6 |
| `/clarity` | Clarity Call booking | Clarity funnel | ⏳ TODO iter 6 |
| `/spiritual-marketing` | BOFU products | BOFU funnel | ⏳ TODO iter 6 |
| `/spiritual-marketing-blog` | PL marketing training | Szkolenie z Marketingu | ⏳ TODO iter 6 |

## Email Campaigns (5 total, ~31 emails)

| # | Campaign | Emails | Created | Trigger (assumed) | Migration Plan |
|---|---|---|---|---|---|
| 1 | Practical Marketing (Useful Content) + Others | 6 | 2025-10-11 | Marketing list subscription | Iter 3: extract content |
| 2 | Practical Spirituality for Modern People | 11 | 2025-03-24 | SPS form subscription | Iter 3: extract → welcomeSequence in src/server/email.ts |
| 3 | The Awakening Circle: Deep Spirituality | 1 | 2025-01-11 | (single email) | Iter 3: extract |
| 4 | Integrate Your Shattered Self | 7 | 2024-11-26 | IYSS form subscription | Iter 3: extract → IYSS sequence |
| 5 | DMT EMAILS | 6 | 2024-11-24 | DMT form / left email | Iter 3: extract → DMT sequence |

## Automation Logic (to extract in iter 4)

Pattern observed: each funnel has an opt-in form → adds contact to CRM with tag → triggers matching email campaign.

| Form | Tag (assumed) | Triggers Campaign |
|---|---|---|
| MAINPAGE main page | `main-page` | (none observed) |
| SPS book form | `Simplified Practical Spirituality` | Practical Spirituality for Modern People |
| SPS² form | `Simplified (square) Practical Spirituality` | Practical Spirituality for Modern People |
| IYSS form | (IYSS tag) | Integrate Your Shattered Self |
| DMT form | (DMT tag) | DMT EMAILS |
| Clarity Call | `clarity-call` | (booking confirmation) |
| BOFU spiritual marketing | (BOFU tag) | Practical Marketing |

## Calendar / Booking

- Google Calendar booking already set up — just need the booking link
- New plan: paste Google Calendar link directly into `/spirituality/clarity` page (no Cal.com needed)
- TODO: get the live booking URL from Kamil

## Payments

All existing payment links work standalone (no Systeme.io dependency):
- **Cards (Multi-currency):** Revolut, PayPal, Wise, Stripe
- **Monthly:** Buy Me a Coffee, Ko-Fi
- **Crypto:** BTC (`bc1qmz0ydhuvlax9s8n6zgvxw5cvs5fucl0tt0jc23`), ETH (`0x1dA94A7bDd2aE4181Fb42c74C1E79d54CcEc8aD2`)
- **SWIFT:** IBAN LT79 3250 0272 4579 4080 (Kamil Włodarczyk, Revolut Bank UAB)

All already integrated into `/spirituality/support` route.

## Forms — Current State

Live on kamiljan.com:
- `/spirituality/contact` — full contact form, posts to `submitContactForm` server function via `src/server/contact.ts`

Behind the scenes (simulated until email provider plugged in):
- `src/server/email.ts` exports `sendEmail()` — currently runs in **STUB mode** (logs to console). Switch to real Resend transport by setting `EMAIL_PROVIDER=resend` + `RESEND_API_KEY` env var.
- `welcomeSequence` array ready to accept extracted email content from Systeme.io campaigns.

## Migration Coverage Summary

- **Routes built:** 9 (hub + sps + sps2 + dmt + iyss + about + support + contact + spiritual.tsx layout)
- **Content fully migrated:** SPS (book, 6 parts), SPS², About, Support, Contact, DMT (intro + benefits + FAQ)
- **Placeholders with link to original:** IYSS
- **Pending iter 6:** clarity, spiritual-marketing, spiritual-marketing-blog, blog/posts, dmtpractice
- **Pending iter 3:** Email campaign content extraction (31 emails)
- **Pending iter 4:** Automation rules + tag schema mapping
- **Pending iter 5:** Cloudflare Worker form handler + KV storage for subscribers

## Next Steps for Kamil

1. Provide email provider credentials (Resend recommended — free 3K/mo) so we can flip `EMAIL_PROVIDER=resend` and start real sends
2. Provide Google Calendar booking link for `/spirituality/clarity` page
3. Continue iterations 3–7 in subsequent sessions
4. Once everything is live: set up 301 redirects on myspiritway.org → kamiljan.com/spirituality/* before letting Systeme.io subscription expire (critical for SEO preservation of 12 years of search authority)
