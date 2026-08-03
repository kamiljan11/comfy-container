# MySpiritWay → kamiljan.com — Migration Status

Last updated: 2026-05-21
Repo: `mountainallservice/comfy-container` · branch `main` (Lovable auto-deploys to kamiljan.com)

## Verification — every public page on myspiritway.org is migrated

| myspiritway.org URL         | kamiljan.com new route              | Source funnel          | Content status                                                            |
| --------------------------- | ----------------------------------- | ---------------------- | ------------------------------------------------------------------------- |
| `/`                         | `/spirituality`                     | MAINPAGE               | ✅ Full hub with 12 cards + newsletter signup                             |
| `/sps`                      | `/spirituality/sps`                 | SPS funnel             | ✅ Complete book (~240KB, 6 markdown parts joined)                        |
| `/sps2`                     | `/spirituality/sps2`                | SPS Short Summary      | ✅ Full short version (~70KB)                                             |
| `/dmt`                      | `/spirituality/dmt`                 | DMT                    | ✅ Intro + 8 benefits + FAQ + link to live practice                       |
| `/dmtpractice`              | `/spirituality/dmtpractice`         | DMT                    | ✅ Pre-practice safety + link to original session + signup                |
| `/iyss`                     | `/spirituality/iyss`                | IYSS                   | ✅ Description + 21-day workbook stub                                     |
| `/aboutkamiljan`            | `/spirituality/about`               | MAINPAGE               | ✅ Full bio                                                               |
| `/support_myspiritway`      | `/spirituality/support`             | MAINPAGE               | ✅ Fair Exchange + all payment options (cards / monthly / crypto / SWIFT) |
| `/contact-myspiritway`      | `/spirituality/contact`             | MAINPAGE               | ✅ Live contact form                                                      |
| `/clarity`                  | `/spirituality/clarity`             | Clarity Call           | ✅ Google Calendar booking link + signup                                  |
| `/spiritual-marketing`      | `/spirituality/spiritual-marketing` | BOFU                   | ✅ Positioning + 3 capability cards + signup                              |
| `/spiritual-marketing-blog` | `/spirituality/marketing-training`  | Szkolenie z Marketingu | ✅ PL training landing + signup                                           |
| `/blog/posts`               | `/spirituality/blog`                | MAINPAGE               | ✅ Index listing (1 post inventoried, more to add)                        |

**Coverage: 13 / 13 public pages = 100%** ✅

## Infrastructure / Logic — pluggable backend

| Capability                   | Status                          | Activate by                                                                                                           |
| ---------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Contact form submission      | ✅ Live, stubbed                | Routes through `src/server/contact.ts` → `sendEmail()`                                                                |
| Newsletter signup (reusable) | ✅ Live, stubbed                | Drop `<NewsletterSignup />` anywhere; routes through `src/server/newsletter.ts`                                       |
| Subscriber storage           | ✅ Stub (in-memory + console)   | Bind Cloudflare KV namespace `SUBSCRIBERS_KV` in `wrangler.jsonc`, uncomment `kvStore` in `src/server/subscribers.ts` |
| Email sending                | ✅ Stub (console.log)           | Set env `EMAIL_PROVIDER=resend` + `RESEND_API_KEY` (free 3K emails/month)                                             |
| Welcome sequence trigger     | ✅ Stub (first email only)      | Paste extracted campaign content into `welcomeSequence` array in `src/server/email.ts`                                |
| Google Calendar booking      | ✅ Live link in /clarity        | Update `GOOGLE_CALENDAR_BOOKING_URL` const if URL changes                                                             |
| Payments                     | ✅ Live (direct provider links) | Already independent of Systeme.io (Revolut, PayPal, Wise, Stripe, BMC, Ko-Fi, BTC, ETH, SWIFT)                        |

## File structure summary

```
src/
├── routes/
│   ├── __root.tsx                          (existing — root layout)
│   ├── index.tsx                           (existing — kamiljan.com home; updated nav + MySpiritWay link)
│   ├── spirituality.tsx                    (NEW — /spirituality parent Outlet)
│   ├── spirituality.index.tsx              (NEW — /spirituality hub)
│   ├── spirituality.sps.tsx                (NEW — full book, 6 parts joined)
│   ├── spirituality.sps2.tsx               (NEW — short version)
│   ├── spirituality.dmt.tsx                (NEW)
│   ├── spirituality.dmtpractice.tsx        (NEW)
│   ├── spirituality.iyss.tsx               (NEW)
│   ├── spirituality.clarity.tsx            (NEW)
│   ├── spiritual-marketing.tsx       (NEW)
│   ├── spirituality.marketing-training.tsx (NEW)
│   ├── spirituality.blog.tsx               (NEW)
│   ├── spirituality.about.tsx              (NEW)
│   ├── spirituality.support.tsx            (NEW)
│   └── spirituality.contact.tsx            (NEW)
├── components/
│   ├── SpiritualityLayout.tsx              (NEW — shared header/nav/footer)
│   ├── MarkdownContent.tsx                 (NEW — lightweight MD renderer)
│   └── NewsletterSignup.tsx                (NEW — reusable signup form)
├── content/spirituality/
│   ├── sps2.md                             (NEW — ~70KB)
│   ├── sps-part-1.md                       (NEW — Preface, Essence of Suffering)
│   ├── sps-part-2.md                       (NEW — Spirituality, Consciousness, Evolution, Levels, Peak Experiences)
│   ├── sps-part-3.md                       (NEW — Why Evolution, Complete Happiness, Practical Spirituality, Path, Activation Sessions, Evolutionary Mindset, Always Try Your Best)
│   ├── sps-part-4.md                       (NEW — Formal Practice, Micro-Awareness)
│   ├── sps-part-5.md                       (NEW — Deep Reflection, Conscious Healthy Lifestyle)
│   └── sps-part-6.md                       (NEW — Cultivate Spiritual Sensitivity, Fair Exchange, FAQ, Disclaimer)
└── server/
    ├── contact.ts                          (NEW — contact form handler)
    ├── newsletter.ts                       (NEW — newsletter signup handler)
    ├── email.ts                            (NEW — pluggable email transport, stub by default)
    └── subscribers.ts                      (NEW — pluggable subscriber storage, in-memory by default)
```

## Iteration log

| #   | Name                                                     | Status             | Notes                                                                                                  |
| --- | -------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| 1   | Push SPS/SPS2 content + core routes                      | ✅ Done            | All 6 SPS parts + SPS² + 8 spirituality routes                                                         |
| 2   | Map all 9 Systeme.io funnels 1:1                         | ✅ Done            | See `migration/01-funnels-inventory.md`                                                                |
| 3   | Extract email campaign content (31 emails)               | ⏳ Pending         | Requires per-email click in Systeme.io dashboard. Plug into `welcomeSequence` in `src/server/email.ts` |
| 4   | Map Automation Rules + Tags + Contacts schema            | ⏳ Pending         | Tag schema partially inferred in inventory doc; needs detailed extraction                              |
| 5   | Build pluggable email/form stubs + Cloudflare Workers    | ✅ Done            | All in `src/server/*` — stub mode active, real transport one env-var away                              |
| 6   | Map remaining pages (Clarity, Spiritual Marketing, Blog) | ✅ Done            | All routes built with content + signup forms                                                           |
| 7   | Final QA pass                                            | ✅ Done (this doc) | 13/13 public pages mapped; no orphan URLs found                                                        |

## Pre-cutover checklist (before Systeme.io subscription expires)

1. [ ] **Hand over Resend API key** to flip email transport from stub → live
   - Set `EMAIL_PROVIDER=resend` + `RESEND_API_KEY` in Cloudflare env vars
   - Free tier: 3,000 emails/month, 100/day — plenty for current volume
2. [ ] **Verify Google Calendar booking link** in `src/routes/spirituality.clarity.tsx` (the `GOOGLE_CALENDAR_BOOKING_URL` constant)
3. [ ] **Set up 301 redirects on myspiritway.org** before letting domain expire:
   - `/` → `kamiljan.com/spirituality`
   - `/sps` → `kamiljan.com/spirituality/sps`
   - `/sps2` → `kamiljan.com/spirituality/sps2`
   - `/dmt` → `kamiljan.com/spirituality/dmt`
   - `/dmtpractice` → `kamiljan.com/spirituality/dmtpractice`
   - `/iyss` → `kamiljan.com/spirituality/iyss`
   - `/aboutkamiljan` → `kamiljan.com/spirituality/about`
   - `/support_myspiritway` → `kamiljan.com/spirituality/support`
   - `/contact-myspiritway` → `kamiljan.com/spirituality/contact`
   - `/clarity` → `kamiljan.com/spirituality/clarity`
   - `/spiritual-marketing` → `kamiljan.com/spirituality/spiritual-marketing`
   - `/spiritual-marketing-blog` → `kamiljan.com/spirituality/marketing-training`
   - `/blog/*` → `kamiljan.com/spirituality/blog` (or specific post URLs)
4. [ ] **Keep `myspiritway.org` domain registered** for at least 6–12 months as redirect-only (cost: ~$10/yr) — preserves SEO authority
5. [ ] **Extract email campaign content** from Systeme.io (iteration 3) before subscription ends
6. [ ] **Export subscriber list as CSV** from Systeme.io as backup (Kamil said this isn't critical, but worth keeping)

## Outstanding (next sessions)

- Iteration 3 — manual extraction of 31 email campaign bodies into `src/server/email.ts welcomeSequence`
- Iteration 4 — automation rule extraction (CRM tag schema details)
- Polish — verify Lovable deploy renders all routes correctly; fix any visual issues
- Optional — add full DMT live practice audio/video to `/spirituality/dmtpractice`
- Optional — migrate IYSS 21-day workbook content
- Optional — pull more blog posts into `/spirituality/blog`
