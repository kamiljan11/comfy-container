export type CaseStudy = {
  slug: string
  title: string
  oneLiner: string
  role: string
  stack: string[]
  problem: string
  approach: string
  hardParts: string[]
  outcome: string
  reflection: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    "slug": "b2b-quote-to-order-platform",
    "title": "A 13-stage quote-to-order pipeline that runs a multi-vertical B2B operation",
    "oneLiner": "Founder-engineer who built and ships the React/TypeScript/Supabase platform a non-technical sales team runs daily in the field to quote, price, and fulfill B2B orders across three verticals.",
    "role": "Founder and operator. I designed and built the platform end to end, own the Postgres data model and security policies, hire and direct the developers who extend it, and train the sales team that uses it. So I sit in the unusual seat of being both the engineer and the first customer of my own software.",
    "stack": [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Row-Level Security",
      "SQL migrations",
      "TanStack Query",
      "Vercel",
      "Twilio (SMS)"
    ],
    "problem": "A B2B distribution business spanning auto parts, print, and freight was being run on manual quoting and spreadsheets. Each vertical priced differently, every order was tracked by hand, and customers had to be chased for status. As volume grew this stopped scaling. Quotes were slow and inconsistent, order state lived in someone's head, and there was no clean separation between what a client, a sales rep, and an admin should each be able to see.",
    "approach": "The core abstraction is a 13-stage quote-to-order state machine, modeled explicitly in Postgres rather than implied by scattered booleans, so an order's position in the lifecycle is always a single source of truth. Pricing is computed per line item instead of as one flat quote, because a parts order, a print job, and a freight shipment have genuinely different cost structures and can't share a single formula. Access is enforced at the database layer with row-level security for three personas (client, sales rep, admin) rather than trusting the frontend, so the same policies hold no matter which client calls the API. Once an order is confirmed, a logistics flow fires automatically: SMS status updates to the customer over Twilio, customs-handling steps, and delivery, which removes the manual chase. Supabase backs the app with SQL migrations checked into the repo so schema changes are reviewable and reproducible, TanStack Query handles server-state caching and invalidation on the client, and Vercel hosts the React/TypeScript app, which the team uses as a mobile app in the field. The deliberate trade-off was building on a managed backend-as-a-service instead of a custom server to ship fast as a solo founder, accepting that meaningful logic lives in RLS policies and SQL rather than a conventional application layer.",
    "hardParts": [
      "Making the multi-stage stateful pipeline trustworthy, not just feature-complete. The hard part wasn't any single screen. It was that a 13-stage state machine has to be reliable enough for non-technical staff to run all day without wedging, double-firing side effects, or needing an engineer to babysit it. That meant treating order state as explicit, constrained transitions in the database rather than ad-hoc flags, so an order can't silently land in an impossible state.",
      "Diagnosing and fixing a Postgres RLS infinite recursion. A row-level-security policy referenced another table whose own policy referenced back, so the planner recursed and queries failed. The fix was to move the privileged lookup into a SECURITY DEFINER function that runs with the owner's rights and bypasses the recursive policy evaluation, then call that function from the policy. That broke the cycle while keeping the access checks correct.",
      "Designing per-line pricing flexible enough for three different verticals. Parts, print, and freight don't price the same way, so a single quote-level formula was never going to hold. Pricing had to be computed per line item with vertical-specific logic while still rolling up into one coherent order and one commission calculation.",
      "Enforcing role-based access for three personas at the data layer. Client, sales rep, and admin each need a different slice of the same tables. Getting that right with RLS, so the database itself refuses to return rows a persona shouldn't see, is harder and safer than filtering in the UI, especially once policies start interacting with each other, which is exactly what triggered the recursion bug."
    ],
    "outcome": "The platform is live and in daily use as the operational backbone of a real B2B business. It replaced manual quoting and spreadsheet-based order tracking, and it runs in the field as a mobile app used by people with no technical background. That was the real bar it had to clear: not a demo, but software non-engineers depend on every working day.",
    "reflection": "Pushing security and a fair amount of business logic into Postgres RLS and SQL was the right call for shipping fast solo, but it concentrates correctness in policies that are hard to reason about, and the infinite-recursion bug was a direct symptom of that. If I were starting again I'd invest earlier in a test harness that exercises RLS policies per persona, so policy interactions surface in CI instead of as a failed query in production. The honest tension is between the speed of letting the database enforce everything and the difficulty of debugging it once policies reference each other."
  },
  {
    "slug": "realtime-voice-agents-telephony-automation",
    "title": "Bridging classic telephony to a streaming LLM so a phone call feels like a conversation, not a walkie-talkie",
    "oneLiner": "Built telephony automation bridging Twilio's phone network to a streaming LLM over WebSockets: scripted TTS and SMS run in production, with an interactive realtime agent on top, all scoped so the model phrases and routes while deterministic systems own every real action.",
    "role": "Sole engineer. Designed and built the realtime audio bridge, the scripted-call path, the SMS automation tied into the logistics flow, and the dev tunnel setup. Owned the architecture decision of where the LLM is allowed to act versus only speak.",
    "stack": [
      "Twilio (Programmable Voice + SMS)",
      "OpenAI Realtime API",
      "WebSockets",
      "RetellAI",
      "Python",
      "TwiML",
      "Amazon Polly TTS",
      "SSH tunnel for local webhook delivery"
    ],
    "problem": "Inbound and outbound phone work and order-status updates were done by hand, one call and one message at a time. The goal was to take the repetitive, on-script parts of that communication off a human's plate: voice agents that can place and answer calls unattended, and SMS that fires automatically as an order moves through delivery. The hard requirement was that this had to be safe to run against real customers, not a demo.",
    "approach": "I built two distinct call paths because they have different cost and risk profiles. The simple path is one-way scripted TTS over TwiML with Polly voices, multilingual across English and Polish, for announcements and status calls where no dialogue is needed. The harder path is a two-way interactive agent: a small Python server holds a WebSocket to the OpenAI Realtime API and bridges its audio stream to Twilio's media stream in real time, so the caller and the model actually talk. Some agent flows run on RetellAI, where its higher-level orchestration fit better than hand-rolling the loop. The central architectural decision is the reliability stance. The model phrases and routes; it never executes the action. Scoped, bounded flows decide what it can say, and deterministic systems own order changes, sends, and anything with a consequence. SMS automation is woven directly into the order-to-delivery logistics flow rather than bolted on as a separate notifier, and the same family includes a WhatsApp bot. During development the realtime server runs locally and is exposed to Twilio's webhooks through an SSH tunnel, which lets me iterate on live telephony callbacks without deploying on every change.",
    "hardParts": [
      "Bridging two protocols that were never meant to meet. Twilio speaks a webhook-plus-media-stream model rooted in classic telephony, while the LLM speaks a bidirectional WebSocket audio stream. I had to pump audio frames between them in real time, match codecs and framing, and keep both sides fed without the buffer underruns that produce dropouts or robotic gaps.",
      "Latency and turn-taking. A naive request-response loop makes a call feel like a walkie-talkie. Natural conversation meant streaming audio continuously, detecting when the caller starts talking, and supporting barge-in so the agent stops speaking the instant it's interrupted, all inside the round-trip budget of a live phone call where even a few hundred milliseconds is audible.",
      "Keeping a generative model on script for a business call. A free-roaming LLM will eventually improvise a commitment the business can't honor. I constrained it to scoped flows so it cannot wander off the call's purpose or invent promises, and drew a hard line: the model produces language and routing decisions, but deterministic code performs every actual action. That separation is what makes it safe to point at real customers.",
      "The dev-loop problem of public webhooks hitting a local server. Twilio has to reach a callback URL, but during iteration the realtime server runs on my dev machine. I exposed localhost to Twilio's webhooks through an SSH tunnel so live telephony callbacks reached the local server, which removed a deploy from every test cycle and made iterating on call behavior fast."
    ],
    "outcome": "Working voice and SMS automation in real use inside operations and client work. The scripted-call and SMS paths run unattended as part of the order-to-delivery flow, and the interactive realtime agent handles two-way calls. The honest framing of impact: it reliably takes the repetitive, on-script communication off a person's hands, and because the model is boxed in, it does that without the failure mode of an AI agent making a commitment the business then has to walk back.",
    "reflection": "The biggest real trade-off is that scoping the model tightly is exactly why it's trustworthy and exactly why it's narrow. The flows that keep it from hallucinating a commitment also mean it can't gracefully handle a caller who goes off-script; those edge cases fall back rather than improvise. I'd keep that boundary, because for a business call I'd rather have a known fallback than an LLM freelancing a promise, but it means the agent's competence ends sharply at the edge of its scripted flow instead of degrading smoothly. The other honest limitation: the SSH-tunnel dev setup is great for iteration speed but is a development convenience, not a production posture, and I was clear-eyed that those are two different things."
  },
  {
    "slug": "multi-market-pricing-to-contract-saas",
    "title": "A 13-stage quote-to-contract pipeline for productized web services across 10 country markets",
    "oneLiner": "Architected and shipped a multi-market SaaS that turns a country-specific visitor into a signed, VAT-aware contract, then ran real client builds on top of it.",
    "role": "Founder and system architect of the web agency behind it. I designed the architecture, hired and directed the developers who built it, and ran sales myself, so I owned the product decisions and lived with the consequences of every one.",
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase (Postgres + Auth)",
      "Vercel",
      "Server-side PDF/DOCX generation",
      "Third-party e-signature provider",
      "Third-party billing/payments provider",
      "i18n / geo-detection",
      "Push notifications"
    ],
    "problem": "Selling the same productized web packages across several countries breaks the moment you try to systematize it. Each market needs its own pricing, its own tax treatment, and a contract that is legally a different document. The path from a cold enquiry to a countersigned deal was also ad-hoc: quotes in one place, contracts in another, signatures chased over email. The business needed one backbone that took a prospect from \"what does this cost in my country\" to a signed, billable agreement without a human stitching the steps together.",
    "approach": "The core decision was to treat a contract as a function of structured data rather than a hand-edited document. Country, package, and VAT rule go in; a correctly localized PDF or DOCX comes out, generated server-side so the legal text and tax logic never live in the browser. Around that I built a lead-to-contract state machine in Postgres on Supabase, where a prospect advances through explicit stages and each transition fires the next side effect: generate the contract, request the signature, open billing. Geo-detection at the edge picks the visitor's market and drives the right pricing through i18n, with a manual override so a wrong guess is never a dead end. The deliberate architectural line was build-versus-buy. I bought the commodities (auth, payments, e-signature) and built only the part that is actually my differentiator, the pricing-and-contract engine. Hosting stays lean on Vercel and Supabase, sized for SME volume rather than hypothetical scale. Real client sites in the car-rental, tours, and beauty verticals were then delivered on top of this backbone, which is what proved the pipeline end to end instead of in a demo.",
    "hardParts": [
      "Per-country contract generation as data, not templates. The same product yields a legally distinct document per market: different VAT treatment (standard-rated, reverse-charge, exempt), different mandatory clauses, different number and date formatting. I modeled the tax and clause logic as structured rules keyed by country and rendered server-side, so adding a market is a data change rather than a new code path or a duplicated template that drifts out of sync.",
      "The lead-to-contract state machine. Closing a deal is a sequence of irreversible, externally dependent steps (generate, sign, bill) and the failure modes are nasty: a signature webhook that arrives twice, a billing call that times out after the contract is already signed, a prospect who bounces between stages. I made state transitions explicit and the source of truth, so side effects are driven by state changes and the flow can resume from wherever it stalled instead of leaving a half-closed deal.",
      "Wiring third-party e-sign and billing into one closing flow. Two external providers, each async and webhook-driven, had to compose into a single 'deal is done' outcome. The hard part was the seams: reconciling provider callbacks against my own state, handling out-of-order and duplicate events idempotently, and making sure a provider hiccup never produced a signed-but-unbilled or billed-but-unsigned deal.",
      "Geo-detection that is right often and never annoying. Inferring a market from request signals is easy to get subtly wrong, and a wrong price shown confidently is worse than no price. I detect at the edge to keep it fast and default to the inferred market, but always expose a visible, sticky manual switch so a VPN or a traveling user can correct it in one click without the detection fighting back."
    ],
    "outcome": "A working SaaS backbone that turns a services business into a repeatable, multi-country pipeline: a visitor sees correct local pricing, moves through a tracked lead-to-contract flow, and ends with a VAT-aware, e-signed, billed agreement. Its real validation is that live client sites across three verticals were shipped on top of it, not that it passed a demo. It supports pricing and contracts for 10 country markets and runs the full 13-stage quote-to-contract sequence end to end.",
    "reflection": "The honest trade-off is the build-lean bet. By buying e-signature and billing instead of building them, I shipped fast and kept the surface small, but I inherited two vendors' data models and webhook quirks, and a real share of my engineering went into reconciling their async callbacks against my own state rather than into product. If a market's e-sign or tax rules don't fit a vendor's assumptions, I'm constrained by their box, not mine. For SME scale it was clearly the right call; if this grew into a high-volume product the contract engine would stay mine, but I'd reassess whether owning the e-signature step is worth taking back in-house."
  },
  {
    "slug": "energy-audit-field-crm",
    "title": "A field-sales CRM that generates funding-application contracts straight from order data",
    "oneLiner": "Built a role-based field-sales CRM for energy-audit field teams, with a 9-stage pipeline and automatic generation of the funding-application paperwork from structured order data.",
    "role": "Sole engineer. I owned the whole thing: the data model, the row-level security policies, the document-generation service, and the React frontend the field teams actually use.",
    "stack": [
      "React",
      "TypeScript",
      "Supabase (Postgres)",
      "Postgres row-level security",
      "Server-side DOCX/PDF generation",
      "Maps",
      "Push notifications"
    ],
    "problem": "Energy-audit field teams were running a long sales pipeline out of spreadsheets and hand-assembling the funding-application contract for every job. Three roles, salesperson, auditor, and admin, needed to work the same dataset but each see only their own slice. The funding contract is the actual deliverable that unlocks the money, so a wrong field on the document is not a cosmetic bug. It can sink an application.",
    "approach": "I modeled the order as a single record that moves through 9 explicit pipeline stages, and made stage transitions the backbone that everything else hangs off: documents, notifications, and visibility all key off stage and role. Access control lives in the database as Postgres row-level security, not in the frontend, so each of the three personas is constrained at the data layer no matter what client talks to the API. The funding contracts are produced server-side. Structured order fields get mapped into a templated DOCX, then rendered to PDF, so the legal layout stays fixed and only the data varies. The frontend is a React and TypeScript app built mobile-first because it lives on phones in the field, with a map view of jobs and a leaderboard layered on the same order data. The main trade-off I made was to keep the document templates as code-managed templates rather than building a visual template editor. That's slower for non-technical staff to change wording, but it kept the legally-shaped output deterministic and reviewable in version control, which mattered more here.",
    "hardParts": [
      "Generating legally-shaped funding paperwork from structured data correctly, every time. The contract layout is mandated, so I couldn't free-form it. I built a templated DOCX with explicit field bindings and rendered to PDF server-side, and I treated any unmapped or null field as a hard failure instead of letting it silently emit a blank, because a blank on a funding application reads as a real, signed answer.",
      "Enforcing three-persona separation at the data layer with row-level security instead of hiding it in the UI. The hard part wasn't writing one policy. It was making the policies compose with the 9 pipeline stages: a salesperson sees their own orders, an auditor sees only orders that have reached the stages relevant to them, an admin sees everything. Getting those predicates right in Postgres RLS, and making sure a missing policy fails closed rather than open, is where most of the careful work went.",
      "Keeping a 9-stage pipeline reliable for people on phones in the field, where connectivity is flaky and the same order can be touched by different roles. Stage transitions had to be the single source of truth so that documents, the map, the leaderboard, and notifications all stayed consistent with the order's real state instead of drifting.",
      "Wiring push notifications and the leaderboard off pipeline events without turning every stage change into a tangle of side effects. I kept the order and stage model as the one place state changes, and let the derived features read from it, so adding a feature didn't mean threading new logic through every transition."
    ],
    "outcome": "It shipped as a working field CRM that the teams use daily on their phones. It removed the manual contract assembly entirely, since the funding paperwork now comes straight out of the order data, and it gave the operation a single pipeline of record instead of scattered spreadsheets, with each role seeing only what it should. It's a proprietary build with no public URL, so I'm describing it generically.",
    "reflection": "Putting access control in Postgres RLS was the right call for correctness. It fails closed and doesn't trust the client. But it has a real cost I'll flag honestly: every new feature that reads order data has to be reasoned about against the policies, and debugging \"why can't this user see this row\" means reading SQL predicates, not frontend code. For a small team that's an acceptable tax on a system handling funding-application data. If the role model had been likely to grow well beyond three personas, I'd have reconsidered and pushed more of the authorization into an explicit, testable policy layer rather than leaning entirely on hand-written RLS."
  },
  {
    "slug": "autonomous-agent-infrastructure",
    "title": "A self-hosted agent runtime with namespaced RAG memory, scheduled autonomy, and checkpoint-resume that survives rate limits",
    "oneLiner": "The durable substrate that lets my AI agents run unattended on a schedule, keep memory across runs, and recover from API rate limits without a human restarting them.",
    "role": "Sole architect and engineer. I designed the runtime, wrote the Python orchestration and the custom MCP servers, set up the vector store and the namespacing scheme, and built the scheduling and recovery logic. This is personal infrastructure that a few of my own projects run on day to day.",
    "stack": [
      "Python",
      "Vector database (namespaced index)",
      "Retrieval-augmented generation (RAG)",
      "Custom MCP servers",
      "n8n",
      "LLM orchestration via API",
      "Scheduled task runner"
    ],
    "problem": "Off-the-shelf chat agents forget everything between runs, need a human watching them, and die the moment they hit an LLM API rate limit. For an agent to be useful in a business (drafting outbound email overnight, watching repos, logging sessions) it needs memory that persists, it needs to run unattended on a schedule, and it has to survive a rate limit without someone restarting it at 3am. None of that ships in the box, so I built the runtime.",
    "approach": "The core design principle is a split of responsibility: the model assembles and phrases, but data and code own the facts and the state. Agents answer from a RAG layer over a vector database instead of open generation, so responses stay grounded in retrieved data. Memory is namespaced, with a separate namespace per knowledge domain, so a knowledge base stays isolated from something like a portfolio index and retrieval never bleeds unrelated context into a prompt. Long-running agents compress older history into running summaries to keep the session inside the token window rather than truncating blindly or overflowing the budget. The scheduler fires tasks on a timer with no human in the loop. The riskiest piece is rate-limit survival, handled by checkpoint-and-resume: a long job persists its progress, so when it hits a limit it picks up where it stopped instead of dying. Custom MCP servers expose my own tools to the models behind a clean, validated contract, and in multi-agent workflows the deterministic system, not the model, owns the actual state changes. n8n handles the glue and event triggers between the pieces.",
    "hardParts": [
      "Checkpoint-and-resume across rate-limit boundaries. A scheduled agent can hit a rate limit halfway through a multi-step job, hours after I've gone to bed. Catching the error is the easy part. The hard part is making every step idempotent and serializing enough state (which step, what partial output, what's already been written) so the job resumes cleanly on the next window without re-running side effects like sending the same email twice. That meant treating the agent loop as a resumable state machine rather than a single API call.",
      "Context compression that doesn't lose the thread. Long sessions accumulate history that blows past the context window. Naive truncation drops the instruction or the goal; keeping everything overflows the budget and costs money on every turn. I compress older history into running summaries while preserving the load-bearing facts, so the agent stays coherent over a long run without re-feeding the full transcript each time.",
      "Namespaced RAG so retrieval stays clean across domains. One index serving several unrelated domains will happily return portfolio chunks when you asked a knowledge-base question, which poisons the answer. Partitioning the index into namespaces and routing each query to the right one keeps retrieval relevant and keeps grounding honest, because the agent can only cite from the domain it's supposed to be answering from.",
      "Letting several agents collaborate while a deterministic system owns state. Multiple LLM calls coordinating is a recipe for nondeterministic, conflicting writes. The call I made was that the model never mutates state directly. It proposes; deterministic code validates and commits. That keeps the system auditable and reproducible even though the reasoning layer is probabilistic.",
      "Designing the custom MCP servers as a stable tool contract. Exposing my own tools to the models meant defining schemas tight enough that the model calls them correctly, with server-side validation so a malformed or hallucinated argument fails loudly instead of corrupting downstream state."
    ],
    "outcome": "A working personal agent platform that runs scheduled, memory-backed automations unattended: recurring outbound-email drafting, repo monitoring, session logging, all firing on their own and keeping context across runs. The grounding-plus-deterministic-state stance has held up in practice. Agents stay factual because they answer from retrieved data, and state stays correct because code commits it, not the model. It's the substrate a few of my own projects run on.",
    "reflection": "The honest limitation: this is applied orchestration of foundation models over an API, not model training or fine-tuning, and there's no formal automated eval harness yet. Today the quality bar is held by grounding (answers come from retrieved data), structured output (the model fills a schema instead of free-forming state), and human review. That has been good enough to trust in production, but it won't catch silent regressions at scale. If I rebuilt it, the eval harness comes first instead of last: a regression suite that scores grounding accuracy and resume correctness on every change, so I'm measuring reliability instead of inferring it from the fact that nothing has visibly broken."
  }
]
