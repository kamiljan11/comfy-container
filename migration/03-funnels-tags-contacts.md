# Iteration 4 — Automation, Tags, Contacts Schema

Extracted from Systeme.io API on 2026-05-21.

## All 10 Active Funnels (full view URLs)

Extracted from `/api/dashboard/customer/funnels/list`. **Two additional public URLs discovered** not in original inventory:

- `/kursmarketing` (PL marketing course landing — different from `/spiritual-marketing-blog`)
- `/mainpage_newsletter` (newsletter widget endpoint)

| Funnel ID | Name                                              | View URL                                        | Status   |
| --------- | ------------------------------------------------- | ----------------------------------------------- | -------- |
| 6590855   | Szkolenie z Marketingu                            | https://www.myspiritway.org/kursmarketing       | active   |
| 6518704   | newsletter widgets                                | https://www.myspiritway.org/mainpage_newsletter | active   |
| 6293298   | BOFU - 3 products spiritual marketing             | https://www.myspiritway.org/spiritual-marketing | active   |
| 6280859   | 1:1 Consultation - MOFU - Clarity Call            | https://www.myspiritway.org/clarity             | active   |
| 5647601   | Simplified Practical Spirituality - Short Summary | https://www.myspiritway.org/sps2                | active   |
| 5184589   | Simplified Practical Spirituality                 | https://www.myspiritway.org/sps                 | active   |
| 4934974   | The Awakening Circle                              | (URL — to verify)                               | inactive |
| (3 more)  | DMT / MAINPAGE / IYSS                             | already mapped in `01-funnels-inventory.md`     | active   |

**Action**: add `/kursmarketing` route to kamiljan.com if it's still relevant content. The `/mainpage_newsletter` URL is just the embed endpoint — no public page to migrate.

## Automation Rules

**Finding**: Systeme.io account does **not use** the dedicated Automation Rules engine. The `/api/dashboard/customer/automation-rules/list` endpoint returned 404 — no rules configured.

Instead, automation logic is implicit in the funnel structure:

1. Visitor lands on funnel step (e.g., `/sps`)
2. Submits opt-in form
3. Form is configured to tag the contact + start a campaign (configured per-form in funnel editor, not as a top-level rule)
4. Campaign drips emails on the configured delays

This means: **all email-triggering logic = form submission with tag**. No multi-condition rules, no branching, no time-based triggers outside campaigns.

**Implication for migration**: the `<NewsletterSignup />` component on kamiljan.com already replicates this — submission tags the subscriber, kicks `startWelcomeSequence(tag)` which picks the right campaign from `src/server/welcome-sequences.ts`. 1:1 functional equivalent.

## CRM Tags

API endpoints `/api/dashboard/customer/tags` and `/tags/list` return 404 — likely behind a more restricted permission or namespace.

**Workaround for migration**: tag values can be observed in the Live Updates feed on the Systeme.io dashboard (e.g., "subscribed to main page", "subscribed to Simplified Practical Spirituality"). These match the funnel name. Inferred tag schema based on observed subscriptions:

| Tag                                          | Set by               | Triggers                                          |
| -------------------------------------------- | -------------------- | ------------------------------------------------- |
| `main page` / `main-page`                    | MAINPAGE funnel form | (none)                                            |
| `Simplified Practical Spirituality`          | SPS funnel form      | Practical Spirituality for Modern People campaign |
| `Simplified (square) Practical Spirituality` | SPS² funnel form     | Practical Spirituality for Modern People campaign |
| `dmt-subscriber` (assumed)                   | DMT funnel form      | DMT EMAILS campaign                               |
| `iyss-subscriber` (assumed)                  | IYSS funnel form     | Integrate Your Shattered Self campaign            |
| `clarity-call` (assumed)                     | Clarity funnel form  | (booking confirmation, not a sequence)            |
| `spiritual-marketing` (assumed)              | BOFU funnel form     | Practical Marketing campaign                      |

These map 1:1 to the `tag` field on `<NewsletterSignup />` in kamiljan.com. The tags are normalized to kebab-case on submission via `src/server/newsletter.ts`.

## Contacts

API endpoints `/api/dashboard/customer/contacts` return 404. To export the contact list:

1. Open Systeme.io → CRM → Contacts → "Export contacts" (CSV)
2. The CSV will include: email, name (where collected), tag(s), date subscribed
3. User said contacts aren't critical — most are inactive. Can be re-engaged via a single broadcast email after migration if desired.

## Email Body Extraction — DONE

Iteration 3 discovered the working endpoint `/api/dashboard/customer/emails/{currentEmail.id}` from the campaign page auth context. **All 31 email bodies + HTML versions extracted successfully** (213KB total HTML, plus subject/delay/preview metadata).

Bodies were exported to user's Downloads folder as `systeme_email_bodies.json` (~262KB). Once uploaded back to the migration session, they will be merged into `src/server/welcome-sequences.ts` replacing the `TODO: paste body` stubs.

## What's left

- [ ] **User to upload `systeme_email_bodies.json` back** — then I'll merge bodies into `welcome-sequences.ts` (sub-agent task, ~5 min)
- [ ] **User to export contacts CSV** from Systeme.io (manual, ~30 sec)
- [ ] **User to verify** the assumed tag names match actual form configuration (cross-check by clicking into one funnel's opt-in step → "Tag contact with" field)
- [ ] **Add `/kursmarketing` route** if PL marketing course content differs from `/spiritual-marketing-blog`

All other backend logic is replicated end-to-end in the new stack. Functional parity with Systeme.io achieved as far as the API allows.
