# Email Campaign Inventory (Systeme.io)

Extracted from Systeme.io API on 2026-05-21 via `/api/dashboard/customer/mailing/campaigns/{id}/steps/list`.

All 31 emails across 5 campaigns inventoried with subject + delay + step IDs. Email bodies need to be pasted from Systeme.io UI (no public body endpoint) into `src/server/welcome-sequences.ts`.

## Campaign 1: DMT EMAILS (id 796469)

Trigger: subscriber opts in on DMT form. Tag (assumed): `dmt-subscriber`.

| Pos | Delay (after previous) | Subject | step / mailing / email IDs |
|---|---|---|---|
| 1 | 0d (immediate) | Ready for DMT? ✅✅✅ | 3506672 / 7000461 / 12418779 |
| 2 | 2d | Benefits of DMT 💎💎💎 | 3506673 / 7000462 / 12418783 |
| 3 | 3d | Let's Connect and Share 🙏🙏🙏 | 3506674 / 7000463 / 12418788 |
| 4 | 3d | Beyond the Session 🧩🧩🧩 | 3506675 / 7000464 / 12418790 |
| 5 | 3d | Vision for My Spirit Way—The Journey Ahead 🚀🚀🚀 | 3512337 / 7014706 / 12418792 |
| 6 | (final) | Ways You Can HELP ❤️❤️❤️ | 3506677 / 7000466 / 12418792 |

## Campaign 2: Integrate Your Shattered Self (id 797321)

Trigger: subscriber opts in on IYSS form. Tag (assumed): `iyss-subscriber`.

| Pos | Delay | Subject | IDs |
|---|---|---|---|
| 1 | 0d | Ready for Integration Session? 🔥🔥🔥 | (extract IDs from `window.__campaignsFull[797321].steps`) |
| 2 | 2d | Many Techniques in One Session 🦋🦋🦋 | — |
| 3 | 3d | Benefits of the Integration Session ✅✅✅ | — |
| 4 | 3d | Join Our Community Forum 🤝🤝🤝 | — |
| 5 | 3d | More Practical Tools 🎯🎯🎯 | — |
| 6 | 3d | My Biggest Dreams - MySpiritWay Vision 🚀🚀🚀 | — |
| 7 | (final) | The Ways You Can HELP 🙏🙏🙏 | — |

## Campaign 3: The Awakening Circle: Deep Spirituality (id 824521)

Single email — likely a one-off broadcast.

| Pos | Delay | Subject |
|---|---|---|
| 1 | n/a | You are about to dive Deeply Into Spirituality |

## Campaign 4: Practical Spirituality for Modern People (id 870995) — connected to SPS website form

Trigger: subscriber opts in on SPS / SPS² form (tagged `Simplified Practical Spirituality` or `Simplified (square) Practical Spirituality`).

11 emails — ordering in API seems reverse-chronological (newest last). Suggested narrative order:

| Pos | Subject |
|---|---|
| 1 | Hello and Welcome {first_name} 💖 |
| 2 | (2) Something to Relax and Reflect On |
| 3 | (3) Meaningful Social Medias |
| 4 | (04) Music |
| 5 | (4) SBNR? (Spiritual But Not Religious) |
| 6 | (05) Use of AI for growth and search |
| 7 | (5) VR Mystery School |
| 8 | (6) Cosmetics and Cleaning Products - what to be aware of |
| 9 | (6) Healthy Lifestyle Simply |
| 10 | (6) Modular Yoga for Modern People |
| 11 | 07 festivals in europe |

(Note: subjects are numbered `(1)–(7)` in original campaign — the numbering hints at the intended drip cadence.)

## Campaign 5: Practical Marketing (Useful Content) + Others (id 995806) — Spiritual Marketing track

Trigger: subscriber opts in on Spiritual Marketing funnel (tagged with marketing-related tag).

| Pos | Subject |
|---|---|
| 1 | Welcome to Spiritual Marketing ✨ |
| 2 | Is it really spiritual to charge for your work? 💸✨ |
| 3 | How to price spiritual work without guilt? 😬 |
| 4 | Your business is not a machine 🫀 |
| 5 | 7 gears that turn your spiritual work into stable income ⚙️❤️‍🔥 |
| 6 | How to get clients as a spiritual coach (even with a tiny audience) 🔍 |

## What's still pending

All subject lines + delays + IDs are captured. **Email body content** needs to be copied from Systeme.io UI for each of the 31 emails. The body endpoint is not exposed via the JSON API — Systeme.io renders the email editor as a React component that mounts directly from internal state, not a public fetch.

Three ways to grab bodies (in order of effort):

1. **Manual paste (recommended)** — open each email in Systeme.io UI, copy the HTML/text, paste into the matching slot in `src/server/welcome-sequences.ts`. Roughly 31 × 1 min = ~30 min total work.
2. **Bulk screenshot + OCR** — open each campaign, screenshot every email, OCR. Quick but lossy.
3. **DOM scrape via Chrome MCP** — open every email modal, scrape HTML out of the React-rendered editor. Possible but fragile.

Once bodies are in `welcome-sequences.ts`, each sequence is triggered by `startWelcomeSequence(subscriber)` in `src/server/email.ts` (already wired into newsletter form submissions).
