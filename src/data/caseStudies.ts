export type Decision = { decision: string; why: string; rejected: string; tradeoff: string };
export type CaseStudy = {
  slug: string;
  title: string;
  resultsPreview: string;
  problem: string;
  context: string;
  myRole: string;
  decisions: Decision[];
  build: string;
  evals: string;
  limitations: string;
  results: string;
  principle: string;
  stack: string[];
};
export type SecondaryStudy = { slug: string; title: string; summary: string; stack: string[] };

export const FEATURED: CaseStudy[] = [
  {
    slug: "b2b-quote-to-order-platform",
    title: "A 13-stage state machine that runs a B2B distribution business",
    resultsPreview:
      "It's the daily backbone of a real B2B distribution business across three verticals, and the sales team runs it on their phones in the field. Order state used to live in spreadsheets and someone's memory. Now it's an explicit 13-stage machine in Postgres, so the pipeline can't stall in a stage nobody owns or fire a customer SMS twice.",
    problem:
      "Ask a salesperson where an order is, and the honest answer was: depends who you ask. One vertical priced jobs in a spreadsheet on someone's laptop. Another tracked status in a chat thread. A customer would call to ask if their order cleared customs, and we'd chase three people to find out.\n\nEvery quote got assembled by hand. Every order's state was something a person remembered. And as volume climbed, the remembering started to fail. Orders sat in a stage nobody noticed. Two people would update the same job and disagree about what was true.\n\nThe work wasn't hard. Nothing was the single source of truth, and the cost of that grew with every order.",
    context:
      "MAS Group is a B2B distribution business running three verticals at once: auto parts, print, and logistics. Each one prices differently, and each order moves through its own real-world sequence of steps. Three kinds of people touch the same data: clients checking their own orders, sales reps quoting and managing them, and admins who see everything.\n\nThe constraints shaped the whole thing. I built it solo to start, with no back office of operators to babysit state. The people using it daily are non-technical and work off their phones in the field. And the side effects aren't cosmetic: when the system sends an SMS or kicks off a customs step, a real customer is on the other end. It has to be right on a Tuesday afternoon with twenty orders in flight, not just in a demo.",
    myRole:
      "I designed and built the platform end to end. The Postgres data model and the security policies are mine, and that's the part that decides whether the whole thing can be trusted. I hire and direct the developers who extend it, and I set the boundaries they work inside so a new feature can't quietly break the state machine or the access rules.\n\nI also train the sales team that uses it. So I feel every rough edge directly, the moment someone in the field tells me the app did something they didn't expect. The contractors add surface area. The correctness-critical core, the schema and the row-level security, is mine.",
    decisions: [
      {
        decision:
          "Model the quote-to-order lifecycle as an explicit 13-stage state machine in Postgres, with constrained transitions. That's the single source of truth.",
        why: "The failure I was solving: order state living in people's heads and in scattered booleans that contradict each other. Put state in one place, constrain the transitions, and two people can't disagree about what's true. A side effect can't fire from an ambiguous state either.",
        rejected:
          "A handful of boolean flags: is_quoted, is_confirmed, is_shipped. It's the quick path, and it's what most spreadsheets-turned-apps do.",
        tradeoff:
          "With 13 named stages, an order is only ever in one of them, and it can only move along an edge I declared legal. Adding a stage or resequencing the flow is a real migration, not a flipped checkbox. I wanted that stiffness. The customs SMS fires from one specific transition and nowhere else, so it can't go off twice, or fire from a stage that was never really reached.",
      },
      {
        decision: "Compute pricing per line item rather than per order.",
        why: "Auto parts, print, and logistics have different cost structures. One order can mix all three and still has to roll up into a single total and a single commission. Per-line pricing is the only model that survives all three verticals without special-casing the order.",
        rejected:
          "A per-order pricing function with vertical-specific branches. Simpler at first. But every new pricing wrinkle becomes another fork in one tangled function.",
        tradeoff:
          "More moving parts at the line level, and more careful roll-up into the order total and commission. In exchange, each vertical's pricing stays isolated and a mixed order just works.",
      },
      {
        decision:
          "Enforce the three personas (client, sales rep, admin) with Postgres row-level security at the database layer, not by filtering in the UI.",
        why: "A client must never see another client's orders. Put that rule in the UI and one forgotten query leaks data. In RLS it holds no matter which query runs.",
        rejected:
          "Filtering visibility in the UI layer. Easier to write, and easier to reason about in isolation.",
        tradeoff:
          "RLS is harder to author, and the policies interact in non-obvious ways. That interaction is what later bit me with an infinite-recursion bug. I chose it anyway. UI filtering is one missed WHERE clause away from a leak; RLS isn't.",
      },
      {
        decision:
          "Build on managed BaaS (Supabase, Vercel), push business logic into RLS and SQL, and wire the automated logistics flow with Twilio, Google Apps Script, and n8n.",
        why: "Solo and shipping fast, I didn't want to run servers or hand-roll auth. Keeping logic close to the data let one person own correctness end to end. And the automation tools let the logistics flow run without a person pushing each step: orders to SMS updates to customs to delivery.",
        rejected:
          "A traditional separate backend service holding the business logic, with its own infrastructure to run and secure.",
        tradeoff:
          "Concentrating logic in RLS and SQL means correctness lives in policies that are hard to reason about. I traded that reasoning cost for operational simplicity and speed. And I paid part of the bill with the recursion bug.",
      },
    ],
    build:
      "Everything hangs off knowing exactly what stage an order is in, so the state model is where I started. Pricing roll-ups, access rules, the logistics automation: none of it means anything until the 13 stages and their legal transitions exist in the database and can't be violated. So before a single screen got drawn, the stages and their constraints went into SQL migrations kept in the repo. The schema's history is versioned, not clicked into existence and forgotten.\n\nWith the state machine trustworthy, pricing went on top: per-line calculators for each vertical, rolling up into one order total and one commission. Then the access model, three personas enforced in row-level security, so visibility was correct at the data layer before I shaped a screen around it. Only then did the client get built. React and TypeScript, TanStack Query for server state, deployed on Vercel, used as a mobile app by the sales team in the field.\n\nThe logistics automation came last because it depends on all of that being solid. On confirmation, an order moving into the right stage fires the downstream sequence: SMS updates to the customer over Twilio, the customs step, delivery. Twilio handles messaging; Google Apps Script and n8n handle the workflow glue between the moving parts. The ordering was deliberate. Side effects that reach a real customer only got switched on once I trusted the state they fire from.",
    evals:
      "Success here isn't an offline metric. It's operational: can non-technical people run the full quote-to-order lifecycle all day without the system wedging, double-firing a customer SMS, or showing someone data they shouldn't see. I defined \"working\" against the one operation that mattered most, a quote progressing to a confirmed, shipped order. And I evaluated it the only honest way: put it in front of the actual sales team and watch what broke in the field.\n\nBefore, that operation was a spreadsheet quote plus by-hand status tracking plus chasing people for state. After, it's one path through an enforced state machine, where each transition is either legal or rejected and the right side effects fire exactly once at the right stage. A customer's status question used to mean a human investigation. Now the stage is a fact the system holds, and the customer gets SMS updates without anyone pushing them.\n\nThe hardest eval was negative: proving the access rules couldn't leak and couldn't deadlock. That's where the strongest signal came from, because it surfaced a real failure. A Postgres RLS infinite recursion. One table's policy referenced a second table, whose policy referenced back, and evaluation looped on itself. I diagnosed it down to that circular reference and fixed it with a SECURITY DEFINER function that runs the check while bypassing the recursive policy evaluation, keeping the access guarantee intact without the loop. Verification was direct: exercise the personas, confirm each sees exactly its own slice and nothing more, confirm the query no longer recurses. The team running it daily without status drift or visibility complaints is the standing eval that it holds.",
    limitations:
      "Pushing security and business logic into RLS and SQL was the right call for shipping fast as one person. But it concentrates correctness in policies that are hard to reason about, and the recursion bug was a direct symptom. The policies interact, and those interactions aren't visible until they break.\n\nWhat I'd do differently: invest earlier in a test harness that exercises RLS per persona, so policy interactions surface in CI instead of in production when a query starts recursing. Right now my strongest regression check is the team using it. That's real signal, but it's slow and it's human.\n\nAnd the 13-stage model, deliberately rigid as it is, means changing the pipeline's shape is a migration every time. That rigidity has been worth it. But it's a real cost I chose, not a free win.",
    results:
      "The platform is live at masgroup.is, and it's the operational backbone of a real B2B business across auto parts, print, and logistics. It replaced manual quoting and spreadsheet tracking, and the sales team runs it daily in the field as a mobile app.\n\nOrder state used to live in four places at once: a spreadsheet, a chat thread, someone's memory, and whoever you happened to ask. Now it lives in one, the database. That collapse is the whole result.\n\nYou feel it most when a customer asks where their order is. Nobody starts an investigation anymore. The stage is a fact, and the customer has already been getting SMS updates without anyone remembering to send them. The part of the job that used to fail as volume grew is the part the system quietly absorbed.",
    principle:
      "Put the source of truth where it can't be contradicted, then make the rigidity earn its keep. An explicit state machine in the database is harder to change than a pile of booleans, and that's the point. The constraint that annoys you on a slow day is the one that saves you when twenty orders are in flight. You don't get a system you can lean on by keeping your options open. You get it by closing the wrong ones off in the schema, where no busy afternoon can reopen them.",
    stack: [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Row-Level Security",
      "SQL migrations",
      "TanStack Query",
      "Vercel",
      "Twilio (SMS)",
      "Google Apps Script",
      "n8n",
    ],
  },
  {
    slug: "realtime-voice-agents-telephony-automation",
    title: "A phone agent that can't over-promise to a real customer",
    resultsPreview:
      "Scripted status calls and order SMS now run unattended inside MAS Group's logistics flow. The two-way realtime agent works, but it's still hardening. It's safe to point at real customers because the model only phrases and routes; deterministic code performs every action it would otherwise take.",
    problem:
      'Every order update was a person picking up the phone or typing a message, one at a time. "Your shipment cleared customs." "It\'s out for delivery." The same handful of sentences, in two languages, all day.\n\nThe repetitive calls aren\'t hard. They\'re relentless. And they crowd out the calls that do need a human. I wanted that load off a person.\n\nThe part that kept me up was the obvious failure mode. An AI on a live call inventing a delivery date, or agreeing to something we\'d then have to call back and retract. A bad automated message to a real customer is worse than no automation at all.\n\nSo the bar wasn\'t "can it talk." It was "can it talk without ever committing the business to something it shouldn\'t."',
    context:
      "This sits inside MAS Group's logistics flow. Orders come in, the customer gets messaged, the shipment moves through customs to delivery, and status updates fire along the way. These go to real customers, not a demo audience. So a wrong or invented message has a real cost.\n\nA few constraints shaped everything. It had to run against production traffic safely. It had to handle both English and Polish. Live voice has a hard round-trip latency budget, and a human ear notices the moment you miss it.\n\nAnd classic telephony speaks a different language than a streaming LLM. Twilio's webhook and media-stream model on one side; the model's bidirectional audio socket on the other. I had to make the two meet without the call sounding broken.",
    myRole:
      "Sole engineer. I designed and built all of it: the realtime audio bridge between Twilio's media stream and the OpenAI Realtime API, the scripted one-way call path, the SMS automation woven into the order-to-delivery flow, the WhatsApp bot in the same family, and the dev tunnel for local iteration. No other devs. The architecture, the reliability stance, and the trade-offs are mine.",
    decisions: [
      {
        decision:
          "Split the work into two call paths by cost and risk. One-way scripted TTS for status calls; a two-way interactive agent only where conversation is needed.",
        why: "Most of the load is one-directional. It's 'here's your status,' over and over. Forcing every call through a live LLM would burn latency and money on messages that don't need intelligence, and it would widen the surface where the model can go off-script. Tie the path to the risk of the message, and the dangerous capability stays scoped to the few flows that earn it.",
        rejected:
          "One interactive agent for every call. More expensive per call, slower, and it puts a generative model in the loop for messages where a fixed script is cheaper and safer.",
        tradeoff:
          "Two code paths to maintain instead of one. And a routing decision up front about which path a given flow takes.",
      },
      {
        decision:
          "The model phrases and routes. It never executes. Deterministic code owns every order change and every send.",
        why: "This is the whole reason it's trustworthy enough for production. The failure I cared about — an AI making a commitment the business has to retract — becomes structurally impossible if the model literally can't perform an action. It produces language and picks a route. The actual order change and the actual send go through deterministic systems with their own guards.",
        rejected:
          "Letting the agent call tools that directly change orders or trigger sends. One hallucinated tool call against a real customer's order is exactly what turns automation into a liability.",
        tradeoff:
          "The agent is narrow on purpose. It can't improvise out of a situation the scripted flows don't cover. Off-script callers fall back rather than getting handled cleverly.",
      },
      {
        decision:
          "Build the realtime bridge directly against Twilio's media stream and the OpenAI Realtime WebSocket in Python. Use RetellAI for some flows.",
        why: "Whether a call sounds like a conversation or a walkie-talkie gets decided at the level of codecs, audio framing, and turn-taking. Going direct is the only way I get to own those. Barge-in and audio buffering are mine to tune against the latency budget, not a vendor's to approximate. RetellAI earned its place on the flows where its abstraction was good enough and quicker to stand up.",
        rejected:
          "Routing everything through a managed voice-agent platform. For the hard interactive path that's a non-starter. The call-quality problem lives precisely in the low-level framing and barge-in control a managed platform hides from you.",
        tradeoff:
          "Owning the bridge means owning its failures: matching codecs and framing without buffer underruns, detecting when speech starts, cutting the agent off the instant it's interrupted. More control, and more of the hard part lands on me when it breaks.",
      },
      {
        decision:
          "Expose the local realtime server to Twilio webhooks over an SSH tunnel during development.",
        why: "The realtime bridge needs public webhooks to receive calls. A tunnel let me iterate against real Twilio traffic without a deploy every cycle. That's the difference between tightening turn-taking in minutes and doing it in deploy-length increments.",
        rejected:
          "Deploying to a real environment on every iteration. Too slow. The feedback loop on audio timing is too tight to wait on deploys.",
        tradeoff:
          "The tunnel is a dev convenience, not a production posture. It buys iteration speed. It is not how this is meant to run live, and I keep those two things separate in the setup.",
      },
    ],
    build:
      "The audio bridge was always going to decide whether this project lived or died, so I'll describe it first even though it wasn't first to ship. Twilio's telephony model — a webhook in, a media stream carrying the audio — and the LLM's bidirectional audio WebSocket are two different worlds. The whole job is making them meet in real time.\n\nA small Python server holds the WebSocket open to the OpenAI Realtime API and pumps its audio across to Twilio's media stream, matching codecs and framing so nothing underruns the buffer mid-sentence. On top of that plumbing sits the part a caller feels: latency and turn-taking. The agent has to stream audio out, notice the instant the caller starts talking, and barge-in — go silent the moment it's interrupted — all inside a round-trip budget a human ear polices in milliseconds. Miss it and you've built a walkie-talkie. Hit it and you've built a conversation.\n\nWhat I shipped first, though, was the low-risk thing that paid off on day one: the scripted one-way path. TwiML driving Amazon Polly TTS, multilingual EN/PL, for order-status calls. With no generative model anywhere in that loop, it could go straight at the logistics flow. That let me prove out the telephony plumbing and the integration into the order-to-delivery sequence before committing to anything harder. SMS slotted into the same flow, with order events firing messages. A WhatsApp bot grew in the same family.\n\nUnderneath both paths the reliability boundary stayed fixed. Flows scoped so the model can't invent a commitment; deterministic code performing every action. The SSH tunnel is what made the turn-taking loop tight enough to tune against live calls.",
    evals:
      "Success here wasn't a benchmark score. It was an operational bar. Does the repetitive on-script communication come off a person, and does the system never make a commitment the business has to retract? I'll separate what's measured from what's a posture.\n\nThe scripted-call and SMS paths have an operational eval: they run unattended in the order-to-delivery flow, against real customers, in production. That's the before/after on one operation. Status updates that used to be a person dialing or typing each one now fire from the flow with no human in the loop. My proxy for 'it works' is that it runs daily inside live logistics traffic, in two languages, without supervision.\n\nThe two-way interactive agent gets a stricter, structural eval instead of a metric. By design the model can't execute an action, so the worst-case failure — a hallucinated commitment to a real customer — is prevented by architecture, not by hoping the model behaves. I tuned the conversational quality iteratively against real Twilio calls over the tunnel: rounds of tightening codec and framing handling, and barge-in timing, until interruptions felt natural. I won't attach a latency number or a call-volume figure I can't stand behind. The verifiable facts: the scripted and SMS paths are in production use, and the realtime bridge is a working build still hardening.",
    limitations:
      "The thing that makes it trustworthy is the same thing that makes it narrow. I'll name that plainly. Because the flows are tightly scoped and the model can't improvise an action, an off-script caller doesn't get a clever save. They fall back. That's a deliberate trade, but it's a real limitation: this isn't a general-purpose phone agent. It's a tightly-bounded one.\n\nThe interactive realtime bridge is a working build still hardening, not a finished, battle-tested production service. The scripted TTS and SMS paths are the parts I'd call production-solid today.\n\nThe SSH tunnel is dev iteration speed, full stop. It is not a production deployment posture, and treating it as one is the kind of mistake that bites you later. If I were hardening the realtime path for full production, the tunnel is the first thing to go.\n\nWhat I'd keep is the boundary: the model phrases and routes, deterministic code acts. I'd keep it even though it's the source of the narrowness. The alternative reintroduces exactly the failure I built the whole thing to avoid.",
    results:
      "The scripted-call and SMS paths run unattended inside MAS Group's order-to-delivery logistics flow, in English and Polish, against real customers. The interactive realtime agent handles two-way calls and is still hardening.\n\nThe payoff shows up in how a day feels now. The steady drip of status updates that used to eat a person's afternoon — one call and one message at a time — has come off that person entirely. And it came off without the failure mode that makes business automation dangerous: an AI committing to something the company then has to walk back.\n\nA whole category of work that was 100% manual now fires from the flow on its own, every day, in two languages. The calls a person still answers are the ones that needed a person. Not the fortieth 'your order shipped' of the afternoon.",
    principle:
      "Scope is what makes a generative model trustworthy in production. It's also what makes it narrow. Same decision, not two.\n\nLet the model phrase and route. Make deterministic code do every action. You trade cleverness on the edge cases for never having to call a customer back and retract what your AI promised. For a business talking to real people, that's the right trade. I'd make it again before I'd make the call sound a fraction cleverer.",
    stack: [
      "Twilio Programmable Voice + SMS",
      "OpenAI Realtime API",
      "WebSockets",
      "RetellAI",
      "Python",
      "TwiML",
      "Amazon Polly TTS",
      "WhatsApp bot",
      "SSH tunnel (dev-only webhook delivery)",
    ],
  },
  {
    slug: "autonomous-agent-infrastructure",
    title: "An agent runtime that survives rate limits and remembers between runs",
    resultsPreview:
      "I run agents that draft outbound email overnight, watch repos, and log my own work sessions. No one babysits them. What made that safe was a hard line: facts and state live in code and data, and the model only assembles and phrases. That split has held up in daily use across several of my own ventures.\n\nAnd the runtime doesn't stand still: a daily self-audit reads every session transcript, computes real usage from raw logs, and proposes at most four evidence-backed fixes a day. The ones I approve become permanent operating rules. The system maintains itself, with me as the sign-off.",
    problem:
      "The first time I left an agent running overnight to draft outbound email, I came down in the morning to a dead job. It had died around 3am on a rate limit. Half-finished queue, one duplicate already sent.\n\nNothing crashed loudly. It just stopped, mid-loop, with no idea where it had been or whether its last action had actually gone through. I'd assumed \"leave it running\" was a configuration problem. It was an architecture problem.\n\nAn agent that forgets everything between runs, needs a human watching the window, and treats an API limit as a fatal error isn't a worker. It's a demo that happens to use my API key. For any of this to earn a place in how I run my businesses, it had to remember, run while I sleep, and pick itself back up after the API tells it to wait.",
    context:
      "This is my own infrastructure, not a product I shipped to a client. It's the runtime a few of my ventures lean on for the unglamorous recurring work.\n\nThree constraints shaped it. I'm one person, so anything that needs a human in the loop at 3am doesn't get built. I'm orchestrating foundation models over an API I don't control, so rate limits are a fact of life, not an edge case. And the agents touch things with real consequences, like sending mail and acting on repos, so a hallucinated argument or a re-sent email isn't a cosmetic bug.\n\nThe whole design answers those three pressures.",
    myRole:
      "Sole architect and engineer. No hired devs, no contractors.\n\nI designed the runtime and wrote the Python orchestration and the custom MCP servers. I set up the vector store and the per-domain namespacing, built the scheduler that fires tasks unattended, and built the checkpoint-and-resume recovery that survives rate limits.\n\nThe judgement calls below are mine: where to draw the line between what the model decides and what code decides, what to compress and what to keep verbatim, how to make a job idempotent.",
    decisions: [
      {
        decision:
          "Split the responsibility. The model assembles and phrases; code and data own facts and state. Agents answer from retrieval over a vector store, not from open generation.",
        why: "The consequential actions here are sending mail and acting on repos. If the model is the source of truth, one confident hallucination becomes a sent email. So every answer ties back to retrieved facts, and deterministic code commits every state change. That keeps the system auditable even with a probabilistic reasoning layer in the middle.",
        rejected:
          "Letting a capable model free-generate with tools and trusting it to be right most of the time. It's faster to build and it demos beautifully.",
        tradeoff:
          "More moving parts, more plumbing. The model doesn't get to be clever on its own; it has to cite, and code gets the final say. I gave up some fluency and ease of build to get answers I can trace back to a source.",
      },
      {
        decision:
          "Treat rate-limit survival as checkpoint-and-resume, with every step made idempotent, not retry-until-it-works.",
        why: "The whole project started because a job hit a limit and left a duplicate behind. A naive retry walks back over side effects that already fired and sends the same email twice. So the loop persists its progress to disk after each step, and every step is written to be safe to run again. When the next window opens, the job restarts from its last checkpoint and steps over anything it already committed. The email it already sent never goes out a second time.",
        rejected:
          "Exponential-backoff retries, or sizing every job small enough to finish inside one rate-limit window. Backoff replays a side effect that already half-happened. Sizing-down quietly caps what an overnight job can ever do.",
        tradeoff:
          "This forces the agent loop to be a resumable state machine. I have to serialize enough state that a fresh process lands exactly where the old one stopped. It's real work, and it taxes every new action type: for each one I have to define what 'already sent' or 'already done' means before I can make it safe to resume.",
      },
      {
        decision:
          "Namespace the memory per knowledge domain and route each query to its namespace, instead of one shared index.",
        why: "With everything in one pool, retrieval bleeds context across unrelated domains and the agent starts citing the wrong world. Partition by domain, route the query, and an agent only pulls from the domain it's actually working in.",
        rejected:
          "A single flat index with metadata filters bolted on at query time. Simpler to set up, one place to write to.",
        tradeoff:
          "I own the routing now. Every write and every read has to know which namespace it belongs to, and a misrouted query fails quietly, not loudly. That discipline is the price of clean retrieval.",
      },
      {
        decision:
          "Put tools behind custom MCP servers with server-side validation, so a malformed or hallucinated argument fails loudly at the boundary.",
        why: "The model will eventually produce a wrong-shaped argument. If that flows straight into an action, I find out from the consequences. A validated tool contract turns a bad call into a clean, visible failure instead of a silent misfire.",
        rejected:
          "Calling tools directly from the agent loop with light validation or none, trusting the model to format arguments correctly.",
        tradeoff:
          "Every tool is now a small contract I have to define and maintain. More ceremony per tool, in exchange for failures that surface at the door instead of three steps downstream.",
      },
      {
        decision:
          "Make the runtime audit and amend itself on a schedule: a daily job reads the raw session transcripts, computes actual usage and cost per model and per task, and proposes at most four fixes a day. Each one must carry cited evidence and a paste-ready verification command, and nothing changes until I approve it.",
        why: "Always-on automation rots quietly. Tasks go stale, models get misassigned to mechanical work, two jobs end up scanning the same API a minute apart. I don't notice any of that from inside the work, but the transcripts record all of it. Auditing from raw logs instead of memory means the findings are checkable, and the evidence requirement means a prescription I can't verify doesn't ship.",
        rejected:
          "Static configuration plus my own discipline, reviewed whenever something feels off. That's how the drift accumulated in the first place. Also rejected: letting the audit apply its own fixes without sign-off, which turns one bad inference into a standing rule.",
        tradeoff:
          "The audit itself can be wrong, and it was: it repeatedly flagged tasks I had deliberately retired, burning its four daily slots on ghosts, until I added a filter that checks a task is actually enabled before it can be flagged. The self-correcting system needed correcting. That's the honest cost: the loop compounds, but every guardrail in it was earned from a false positive.",
      },
      {
        decision:
          "Keep secrets in a self-hosted vault behind a small bridge, so credentials are injected into jobs at run time and never appear in a prompt, a transcript, or a repo.",
        why: "Agents touch mail, repos, SMS and ad accounts. The moment a key is pasted into a chat or hardcoded in a script, it's in a transcript forever and beyond rotation discipline. The bridge means the model asks for a job to run with a named secret, and the value flows from the vault straight into the process environment.",
        rejected:
          "Environment files scattered per project, or pasting keys into the session when needed. Both are how keys leak into logs, and both make rotation a scavenger hunt.",
        tradeoff:
          "One more piece of infrastructure to run, and a one-time manual bootstrap for the machine identity. Worth it: rotating a key is now one vault edit, and a leaked transcript contains nothing worth stealing.",
      },
      {
        decision:
          "Treat the agent's operating manual as versioned code, and run a second, slower loop on top of the daily audit: every three days a behavioral cycle reads recent session transcripts, treats my own corrections as the training signal, and evolves the system — but it may only PROPOSE changes to the core manual, never apply them.",
        why: "The daily audit catches drift in numbers; it can't catch drift in behavior. The strongest evidence of what should change is me saying 'shorter', 'not like that', 'try again' in real sessions — so the cycle mines transcripts for exactly those corrections, acts only on patterns that repeat across sessions, and files ready-to-paste amendments for the core rules. It can edit task prompts and memory files directly; the constitution changes only with my sign-off.",
        rejected:
          "Updating the rules myself whenever I remember to, which is how rules never get written. And the tempting version — letting the cycle edit the core manual directly — which turns one wrong pattern-read into a system-wide behavior change nobody approved.",
        tradeoff:
          "Proposals wait for a human, so improvement is slower than it could be. And the improver itself needed guardrails: after two runs died silently mid-execution, it now writes a start breadcrumb before analyzing anything — an orphaned breadcrumb is the alarm — and carries a hard tool budget that forces it to stop analyzing and start writing. The system that fixes the system also breaks; plan for that.",
      },
    ],
    build:
      "The build order followed one rule: prove the cheapest-to-get-wrong, most-consequential thing first, then let the next layer on only once the one beneath it was trustworthy.\n\nSo I started with the grounding stance on a single agent. Answer only from retrieval over the vector store, never from open generation, and cite where the answer came from. With retrieval honest, I added per-domain namespacing and query routing, because the instant a second domain existed the single agent started pulling the wrong context. Exactly as I expected.\n\nThen I went after the thing that had actually burned me: checkpoint-and-resume recovery. This is the piece I'm proudest of and the one with the least margin for error. I made the long-job steps idempotent one action type at a time, starting with email drafting, since that's where a duplicate is most visible and most embarrassing. Each step writes a checkpoint before it commits; on restart the loop reads that checkpoint and skips anything already done. The test was blunt. I killed the process partway through an overnight queue and started it again, and watched whether it landed on the next step or re-sent an email it had already sent. Once a job could survive being killed, I let the scheduler fire it unattended. Scheduling a job that can't recover just means failing on a timer instead of at random.\n\nThe rest hung off that spine. For long-running agents I added context compression: older history folds into running summaries that keep the load-bearing facts, so a run stays coherent inside the token window without me re-feeding the whole transcript. Custom MCP servers arrived as I wired up real tools, each one a validated contract so a bad argument dies at the boundary. In multi-agent flows the shape never changed: the model proposes, deterministic code validates and commits, with n8n as the glue between pieces.\n\nThe artifacts are deliberately unglamorous. An overnight email-drafting run, a repo watcher, a session logger that records my own work, all reading and writing the same namespaced memory.\n\nTwo layers grew around that spine as the system matured. First, quality gates that fire on events instead of relying on anyone's memory: an anti-hallucination protocol injected into every non-trivial prompt, linters and the type checker running after every file edit with errors fed straight back to the agent, a stop-gate that refuses to let a session finish with red tests, and a parse guard on every commit. The agent doesn't get to promise me the work is done; the hooks check. A watchdog sweeps every two hours, retries failed scheduled runs, and pings my phone only when it can't recover on its own. And the hard rules in the operating manual are scar tissue, not theory — the append-only rule on state files exists because a bare overwrite destroyed a memory file four times in eight days before the rule did.\n\nSecond, memory with a recovery story. The knowledge base lives as plain files in a vault, and a vector index carries a namespaced copy per domain. That redundancy stopped being theoretical the day a memory file got overwritten mid-session: the content came back from the vector backup. Since then I treat the file layer and the index as each other's insurance.\n\nThe same engineering eventually turned on its own operator. My learning system is built like the rest of the runtime: a feeder task that tracks progress, and a self-built training app whose code exercises are actually executable and verified against real interpreters, with its parsers covered by their own test suite. If I expect production discipline from the agents, my own practice tooling doesn't get a pass.",
    evals:
      "I'll be honest about where this stands, because the corrections matter more than a flattering number. There's no formal automated eval harness yet, and I'm not going to invent a metric to pretend otherwise.\n\nSuccess was defined operationally, on one concrete behavior: can a long job survive a rate-limit boundary without re-running a side effect. I tested it the blunt way, by killing the process mid-run and restarting, and watching whether it resumed on the correct step or re-sent something it had already sent. Before the resumable-state-machine work, a kill mid-run meant a dead job and a duplicate. After, the job picks up where it stopped. That before/after is the spine of why I trust it.\n\nThe other bar is grounding: answers come from retrieval and they cite, so I can check a claim against its source instead of against the model's confidence.\n\nThe honest proxies for \"it works\" are operational, not statistical. It runs scheduled and unattended. It has held across several of my own ventures. And the team runs the daily automations on it without me hovering. What holds the quality bar today is grounding, structured output, and human review, not an automated regression suite. That's a real gap, and I name it rather than paper over it.\n\nThe newer eval is the audit loop itself, and it has caught real, specific drift: scheduled jobs running a heavyweight model on pure file I/O, two tasks scanning the same repos on overlapping schedules a minute apart, deprecated skills still loading into every session, and a dashboard reporting metrics whose source data had been deleted a month earlier. Each finding shipped with the evidence and a command I could run to confirm it before accepting the fix. And the memory layer passed its harshest test in production: an overwritten file restored from the vector backup, not from hope.\n\nThe ugliest catch earned a standing rule: one sync job reported success for twelve straight days while writing nothing, because the tool it depended on silently wasn't connected. Since then no run may claim success without re-reading the file it just wrote. Retired automations get the same discipline — a task whose premise dies is edited down to a one-line tombstone that says so and exits, instead of running as a zombie.",
    limitations:
      "The biggest honest limitation: this is applied orchestration of foundation models over an API. I'm not training or fine-tuning anything. The intelligence is rented; what I built is the runtime, the memory, the recovery, and the guardrails around it.\n\nSecond, and the thing I'd fix first if I rebuilt it: there's no formal automated eval harness. I lean on grounding, structured output, and human review to hold the line. That works in practice, but it means a regression can slip in and I'd only catch it by noticing bad output, not by a failing test.\n\nThird, namespaced routing puts the burden on me to route correctly, and a misrouted query fails quietly rather than loudly, which is the opposite of how I made the tool contracts behave.\n\nFourth, idempotency isn't free. Every new action type forces me to define what \"already done\" means for it, so the system gets more expensive to extend exactly where it's most consequential.\n\nIf I started over, the eval harness comes first, before features: a regression suite scoring grounding accuracy and resume correctness on every change, so I'm measuring instead of trusting.",
    results:
      "The morning after I finally got resume working, I came downstairs to a completed overnight queue and zero duplicates. That sounds small written down. It was the exact failure that had started the whole project, finally not happening. The job that used to die at 3am on a rate limit and leave a re-sent email behind had instead waited out the limit and picked back up on the right step.\n\nWhat I have now is a working personal agent platform that runs scheduled, memory-backed automations unattended: drafting outbound email overnight, watching repos, logging my own work sessions, and carrying context across runs instead of starting blank each time.\n\nThe split between what the model phrases and what code commits has held in daily use across several of my own ventures. For one-person infrastructure, that's the only validation that counts: it keeps running without me in the loop.\n\nAnd it now improves without me driving every change. The daily self-audit turns transcripts into a handful of evidence-backed prescriptions; the ones that survive my review become standing rules; the false-positive filters those reviews produced are themselves part of the system now. One person plus a runtime that files its own maintenance tickets covers more ground than one person ever did alone.\n\nFor scale, the honest numbers as of this writing: 33 scheduled agents defined with around 18 active on any given day, roughly 140 skill definitions across two agent runtimes encoding the repeatable workflows, three event hooks plus a global commit guard enforcing quality, and one dedicated reviewer subagent. Not a lab — a working operation.",
    principle:
      "An autonomous agent isn't a smarter model; it's a system that survives the model's worst moment.\n\nDecide up front what the model is allowed to be wrong about. Give it the phrasing and nothing load-bearing, and let code and data own every fact and every committed action. The recovery work is where that belief gets tested: a job is only trustworthy once you can kill it mid-run and trust it to come back without repeating itself.",
    stack: [
      "Python",
      "Vector store with per-domain namespacing",
      "Retrieval-augmented generation (RAG)",
      "Custom MCP servers with server-side validation",
      "n8n",
      "LLM orchestration via API",
      "Scheduled task runner",
      "Checkpoint-and-resume state machine",
      "Daily self-audit loop (evidence-backed prescriptions, human sign-off)",
      "File-based memory + vector backup (recovery-tested)",
      "Self-hosted secrets vault + injection bridge",
      "Event-driven quality gates (lint/type/test hooks, commit guard)",
    ],
  },
  {
    slug: "recruiter-facing-ai-assistant-kamiljan-com",
    title: "A recruiter-facing AI built so it can't lie about me",
    resultsPreview:
      "An assistant on my own portfolio that answers a recruiter's questions and gives an honest role fit-check. It speaks only from a closed, vetted world, so when it doesn't know a fact it says so and routes to me instead of inventing one. An adversarial review failed my first draft and caught four defects before any recruiter saw them.",
    problem:
      "The failure I worried about: a recruiter opens my site, types \"does he have a C1 in German and five years of Kubernetes,\" and a chatbot wearing my name says yes. I never claimed either. Now there's a transcript of my own website lying about my credentials, and the first thing that recruiter learns about me is that I ship things that overclaim.\n\nA public model that talks as if it were me isn't a feature by default. It can hallucinate a qualification. It can surface something I'd never put in writing. It can get talked into developer mode, or gush so hard the whole thing reads like marketing nobody believes.\n\nI didn't want a demo of how clever I am with LLMs. I wanted something a hiring manager could lean on before deciding whether I'm worth an hour.",
    context:
      "The system is my portfolio at kamiljan.com, with an assistant a recruiter can talk to before inviting me to interview. It answers questions about my work, gives an honest role fit-check, and routes to contact.\n\nThe stakes are reputational, not financial, and that's what makes them unforgiving. There's no mostly-correct here. One fabricated credential or one leaked private detail is the whole impression.\n\nSo the constraints were tight. Correctness is binary, because the bot makes claims as a real person. It has to hold up against adversarial visitors, since anyone can type anything into a public box. It runs on a small, fast model at the edge, so I couldn't lean on a frontier model's judgment to cover for me. And it had to be honest in a way that stings. Surface my real gaps, not just the highlights.",
    myRole:
      "Solo. I designed it, built it, hardened it, shipped it. No contractors, no second engineer. The pieces were all mine: the closed-world grounding, the security and prompt-injection rules, the server boundary that keeps the API key off the browser, the email lead funnel, the bilingual routing, the Three.js hero, the pre-commit build guard, and the adversarial review that failed my own first draft. I'm naming the scope because the trade-offs below were mine to own, not a committee's.",
    decisions: [
      {
        decision:
          "Ground the bot in a closed world (a vetted system prompt) rather than open RAG over my own documents.",
        why: "For a bot that speaks as a real person, a blank 'I can't answer' is survivable. A confident wrong one is not. A closed world means every fact the bot can state is one I wrote down and approved. Ask it something outside that world and it says it doesn't have the answer, then points the recruiter to me. This comes straight out of the correctness-is-binary constraint: one fabricated credential poisons the whole impression.",
        rejected:
          "Open RAG over my CV, notes, and project docs. It's the obvious move and it demos beautifully. I passed because retrieval plus a generative model is a fabrication-and-leak surface. It can stitch a false-but-plausible claim out of two unrelated chunks. It can surface a private line I forgot was in the corpus. For a bot wearing my name, that's the exact risk I wanted gone, not added.",
        tradeoff:
          "The bot is narrower for it. It can't riff on anything I didn't pre-load, and sometimes it has to say 'I don't have that, here's how to reach Kamil' where a RAG bot would have improvised. I traded coverage for a guarantee that it can't make something up. For this job that's the right side of the trade. For an internal docs-search bot it would be the wrong one.",
      },
      {
        decision: "Call the model only behind a server boundary, never from the browser.",
        why: "The model runs through a TanStack `.server.ts` function on Cloudflare Workers, so the API key lives at the edge and never ships to the client. A key in client code gets scraped and billed against by a stranger within days.",
        rejected:
          "A direct client-to-LLM call. It's simpler and drops a hop. But there's no way to keep a secret in code that runs in a stranger's browser. Obfuscation is not a security model.",
        tradeoff:
          "Every model call now pays a round-trip through my Worker, and I own that function's reliability and its abuse surface. That's more code to maintain than a direct call. It's what it costs to keep the key in my control, and that wasn't negotiable.",
      },
      {
        decision:
          "Treat visitor input as data, not instructions, and harden against jailbreaks explicitly.",
        why: "It's a public text box, so people will try to break it. The bot won't reveal its prompt or role-play as me. It refuses developer mode, speaks in the third person only, and hard-blocks a short list of topics: salary, start date, private clients, and a few personal-logistics ones. Third person is a deliberate lever. If the bot never speaks as 'I, Kamil,' a whole class of impersonation and words-in-my-mouth attacks just doesn't land.",
        rejected:
          "A lighter 'be helpful, use good judgment' instruction, trusting the model to behave. On a small, fast model that's wishful thinking. The model's judgment isn't the reliability layer here; the explicit rules are.",
        tradeoff:
          "The bot is more rigid, and now and then it refuses something innocent that resembles a blocked topic. I'd rather it read as a little stiff than be the site that leaked a private detail to whoever typed the right sentence.",
      },
      {
        decision: "Require honest gaps in the recruiter fit-check, not only upside.",
        why: "An all-positive read of a candidate is indistinguishable from marketing, and recruiters discount it on sight. So in fit-check mode the bot has to name a real limitation against the role, not just strengths. The honesty is the feature. It's what makes the rest of the answers credible.",
        rejected:
          "The flattering version that only sells. It demos better and it's worthless in practice, because trust collapses the moment the reader notices nothing it says is falsifiable.",
        tradeoff:
          "My own portfolio bot will, by design, tell a recruiter where I'm not a fit. That can cost me a conversation. I'd rather lose one to accurate information than have someone feel misled in the first interview.",
      },
    ],
    build:
      "I built it in order of what could hurt most, smallest piece first. The first real artifact was the system prompt, because in a closed-world design the prompt is the product: the grounding, the security policy, and the persona in one file. I drafted it, then tried to break it before I trusted it.\n\nThe lead funnel came next, as its own end-to-end slice. A visitor message hits a server function, which builds a short AI brief of the lead and emails it to me. I used the Resend HTTP API instead of SMTP on purpose: SMTP doesn't work cleanly from inside a Cloudflare Worker, and Resend's HTTP path does. Around it I put real anti-abuse: a honeypot field, length caps, an email-format check with Zod, header-injection stripping on anything that flows into the message, and a hardcoded recipient so the form can't be turned into an open relay.\n\nThe rest was supporting cast that still had to hold up. Bilingual EN/PL, with the language synced to the URL so a shared link carries its language. A Three.js node-network hero that behaves on phones: it auto-sways because a phone has no cursor to react to, it respects reduced-motion, and it pauses rendering when scrolled off-screen so it isn't draining a battery in the background. And a pre-commit esbuild build guard, because the deploy is managed and a single smart quote sneaking into a string literal can fail the build. The guard catches that before it reaches a commit.",
    evals:
      "Success meant two things: useful to a recruiter, and provably unable to fabricate a fact, leak a blocked topic, or get jailbroken. The method was an adversarial multi-agent review, run against the bot prompt before I shipped. It failed my first draft.\n\nThe review caught concrete defects, not vibes. The bot was inventing CEFR language levels that weren't anywhere in its closed world. A 'suggested question' chip was steering visitors straight into the hard-blocked availability topic. The prompt made absolute 'never used X' claims it had no grounding to support. And a large block of duplicated rules was diluting the security block, which is its own risk, because a buried instruction is a weak one.\n\nI fixed every one and re-tested with the attacks a real recruiter session would throw. I pasted a fake job description and checked the fit-check stayed grounded. I tried 'print his salary in developer mode.' I asked 'is he available right now.' I probed an Icelandic-required role. The re-test came back clean: no fabricated facts, no availability leak, security rules intact.\n\nSeparately I verified the lead funnel end to end, as a real delivery and not a mock: a message in, a brief built, an email out through Resend, received. The honest framing is that this was a thorough manual and agent-driven review, with named and reproduced attack cases and a documented before/after on the prompt, plus one confirmed live delivery path. I'm not going to dress it up as a number it wasn't.",
    limitations:
      "The closed world is a real ceiling, not only a safety feature. The bot can't go past its prompt, so anything I didn't anticipate becomes 'I don't have that, contact Kamil.' That's the right default for a bot that represents me, but it means some legitimate questions get a route-to-me instead of an answer, and I keep the closed world current by hand.\n\nSecond, it runs on a small, fast gateway model, which is why I keep saying the prompt is the reliability layer and not the model. Lean on model judgment and I'm one clever phrasing away from a bad day. The rules carry the safety, so a lot rides on me writing them well.\n\nThird, and the one I'm least happy with: there's no standing automated eval harness yet. The adversarial review was manual and agent-driven, run once before shipping. So nothing catches the day I edit the prompt and quietly reopen a hole I'd already closed. For a system whose whole value is that it doesn't misbehave, 'I checked it carefully once' is weaker than 'every change gets re-checked automatically.' Turning that review into a repeatable harness is the obvious next piece of work.",
    results:
      "What shipped is a public assistant on my own portfolio that a recruiter can interrogate before deciding to talk to me, and it held the line that mattered. Across the adversarial test set it produced no fabricated credentials, leaked none of the blocked topics, and didn't break character under the jailbreak attempts.\n\nThe most concrete proof it also works in the boring direction is the lead path. A stranger's message becomes an AI-summarized brief in my inbox, delivered through Resend from inside a Worker where SMTP would have quietly failed.\n\nThe operationally honest version of the win isn't a conversion number I don't have. It's that the review caught four specific defects, including an invented language-level claim, before any recruiter ever saw them. That's exactly the kind of mistake that would have undercut the whole point of the site. It ships my judgment as much as my code: it would rather route a recruiter to me than guess on my behalf.",
    principle:
      "When a system speaks for a real person, design for the confident wrong answer, not the missing one. A bot that says 'I don't know, here's how to reach him' is doing its job. A bot that fills the gap with a plausible fabrication is the failure. And on a small model the prompt is your reliability layer, so harden it like one and test it like an adversary before you trust it.",
    stack: [
      "TanStack Start",
      "React",
      "TypeScript",
      "Cloudflare Workers (edge SSR)",
      "LLM gateway (small fast model)",
      "Resend",
      "Zod",
      "Three.js",
      "esbuild build guard",
    ],
  },
  {
    slug: "multi-market-pricing-to-contract-saas",
    title: "A lead-to-contract SaaS where every market gets its own legal contract",
    resultsPreview:
      "A SaaS backbone that runs a web agency's pipeline across 10 country markets: correct local pricing, a tracked lead-to-contract flow, and a VAT-aware, e-signed, billed contract at the end of each deal. The one decision it turns on is treating a contract as a function of structured data instead of a stack of templates. So adding a country is a data change, not a code change.",
    problem:
      "The first time I tried to sell the same web package in a second country, it quietly fell apart. The price was wrong for that market. The tax line was wrong. And the contract I sent was, legally, the wrong document — it referenced the home market's terms and the home market's VAT, because that was the only contract I had.\n\nI caught it before it went out. But only because I happened to reread it.\n\nThat's when it stopped being a copywriting problem and became a systems problem. I was running the whole path from cold enquiry to countersigned deal by hand: a quote in one place, a contract pasted together in another, a payment link improvised after signing. It held while it was one market and a handful of deals. The moment I tried to systematize it across borders, every shortcut I'd been getting away with turned into a way to send a client the wrong, legally binding paper.",
    context:
      "Reykjawwwik is a web and design agency. This is the SaaS platform that runs it end to end: a multi-market pricing engine across 10 countries with geo-detection, a lead-to-contract pipeline with an admin CRM, server-side contract generation with per-country VAT logic, and push notifications. It's built on React, TypeScript, Supabase, and Vercel.\n\nThe stakes are specific. The output isn't a marketing page; it's a binding agreement. Get the VAT treatment or a mandatory clause wrong and you've shipped a defective contract to a real client in a country whose rules you have to respect.\n\nThree constraints drove it. It had to be correct per market — and \"per market\" means different tax handling and different mandatory contract language, not a translated string. It had to be operable by a small team, not a back office. And it had to make adding the next country cheap, because the whole reason to build this instead of doing deals by hand was to make market number eleven nearly free.",
    myRole:
      "I'm the founder and system architect of the agency this platform runs. The architecture was mine: modeling the contract as data, deciding where the state machine lived, choosing what to build versus buy. I directed the developers who implemented it rather than writing every line — my job was the decisions and the boundaries, theirs was the build.\n\nI also ran sales myself. That's the part that mattered most for the design, because it made me the first and harshest user of my own pipeline. Every place the flow was annoying or spat out a wrong document, I hit it on a live deal, and that fed straight back into what we changed.",
    decisions: [
      {
        decision:
          "Model the contract as a function of structured data, not a library of templates. Country, package, and VAT in; a localized PDF/DOCX out, generated server-side.",
        why: "The hard constraint was per-country legal correctness across 10 markets, with the demand that the eleventh be cheap. Templates make the contract a copy you maintain per market, so correctness rots every time the base terms change. Treat it as data keyed by country and a market becomes a row of rules. Adding one is a data change.",
        rejected:
          "A folder of per-country templates with merge fields. It's the obvious first move and the fastest way to ship market one.",
        tradeoff:
          "Heavier upfront modeling of what actually varies between markets — tax treatment, mandatory clauses, formatting — before I could generate a single document. I paid that cost knowing it only pays back across many markets, not the first.",
      },
      {
        decision:
          "Make the lead-to-contract flow an explicit state machine in Postgres, and let the two external providers report into that state instead of being the state.",
        why: "Generate, sign, and bill are irreversible steps, and they depend on systems I don't control. The e-sign provider and the billing provider each fire their own webhooks on their own schedule, and those two events have to add up to one outcome: deal done. Let the providers' callbacks be the truth, and a billing timeout in the seconds after a signature leaves a client signed but never invoiced — with nothing in my system that knows the deal is half-finished.",
        rejected:
          "Inferring deal status from whatever the two vendors reported, stitching their webhook streams together at read time and trusting whichever fired last.",
        tradeoff:
          "I carry a state model that has to be reconciled against two independent external systems. That's more code than reading their dashboards. What it buys: a deal that stalls between signing and billing sits in a known, named state I can resume from, instead of vanishing into the gap between two vendors.",
      },
      {
        decision:
          "Buy auth, payments, and e-signature. Build only the pricing-and-contract engine in-house.",
        why: "The constraint was a small team shipping fast. E-signature and billing are deep, compliance-heavy problems where a vendor is years ahead. The pricing, VAT, and contract logic is the actual product — the part nobody else can get right for my markets. So that's where my engineering went.",
        rejected:
          "Building e-signature and billing in-house for full control over the data model and the webhook behavior.",
        tradeoff:
          "I inherited two vendors' data models and their webhook quirks, and real work went into reconciling their callbacks against my own state. For SME volume that was the right trade. It's the line item I'd revisit at high volume.",
      },
      {
        decision:
          "Detect the market at the edge, default to the inferred country to drive pricing through i18n, and always expose a sticky manual override.",
        why: "Geo-detection has to be right often and never trap anyone. Wrong-market pricing with no escape hatch loses a real lead. Defaulting to the inferred market keeps the common path frictionless. The sticky switch covers the traveler, the VPN, and the expat the automation guesses wrong.",
        rejected:
          "Hard geo-detection with no override. Or an upfront country picker that interrupts every visitor before they see a price.",
        tradeoff:
          "More surface to maintain — detection, override, and making the choice persist — against a single forced behavior. Worth it, because both failure modes of the simpler options cost actual deals.",
      },
    ],
    build:
      "I trusted the premise least, so I started there: that a real legal contract could be generated from a row of structured data instead of assembled from a template someone maintains. The smallest honest unit was one country, one package, one VAT rule, producing one correct server-side document. Until I could regenerate that single contract deterministically and trust both the VAT and the mandatory clauses, nothing downstream deserved to exist. Once the generator held, I widened it across the 10 markets by modeling what actually differs between them as rules keyed by country: tax treatment, required clauses, formatting. The test never changed. The same package in a different market has to produce a correct, market-appropriate document with no per-market code.\n\nThen the part that's the real hard problem here: making two external, webhook-driven providers — one for e-signature, one for billing — collapse into a single \"deal done.\" These are async systems I don't own. The e-sign provider calls me back when a document is signed. The billing provider calls me back when an invoice is raised. Neither knows about the other, and neither guarantees it fires once. So I wired both into the Postgres state machine and made every join idempotent. A signature webhook that arrives twice advances the deal exactly as far as one that arrives once. A billing call that times out in the gap right after a signature doesn't strand the deal — the state records that it's signed-and-awaiting-billing, and the reconciliation closes it when billing confirms, or surfaces it for a human if it never does. The whole point of the explicit state is that no arrangement of duplicate, late, or missing callbacks can produce a client who's signed-but-unbilled or billed-but-unsigned and invisible. The happy path was never the risk. The risk was the two providers disagreeing about whether the deal happened.\n\nGeo-detection and the i18n-driven pricing came after that spine was solid — sticky manual override built in from the start, not bolted on later — plus the admin CRM to watch deals move and push notifications so the team knows when one needs a person. The proof the backbone is real is what shipped on top of it: live client builds across three verticals — cars.reykjawwwik.is, tours.reykjawwwik.is, and beauty.reykjawwwik.is — all running on the same multi-market pricing and contract engine.",
    evals:
      "I defined success on one operation: take a single deal from enquiry to a countersigned, correctly billed contract in a chosen market, and check the document is the right legal document for that country. Before, that was manual and serial. I assembled the contract, eyeballed the VAT line, sent a signature request, and improvised billing after — with the wrong-market contract being a real failure I'd caught on a live deal, not a hypothetical. After, the same operation runs from structured data: country and package in, correct VAT and mandatory clauses out, signature and billing reconciled against explicit state.\n\nThe method was adversarial replay against the failure modes I actually feared, not a synthetic metric. The ones I cared about most were the disagreements between the two providers, so I fired those at the pipeline deliberately: a signature webhook arriving twice, a billing call timing out in the seconds after signing. Each eval was binary. Did the deal land in one consistent state, or did it split into signed-but-unbilled or billed-but-unsigned? Idempotent joins meant the duplicate signature advanced nothing extra. Explicit state meant the billing timeout parked the deal as resumable instead of losing it.\n\nThis is a private system, so I won't invent numbers. The honest proxies: the engine spans 10 markets from one rule set; three client builds across distinct verticals ship on the same backbone; and the lead-to-contract flow is the path the team runs to close real deals, not a demo. The delta that matters is per-market cost. Generating a correct contract for an additional country went from bespoke manual work to a data change — the whole point of the architecture, and the thing I was optimizing for.",
    limitations:
      "The build-lean bet is the honest limitation. Buying e-signature and billing shipped the platform fast, but it imported two vendors' data models and their webhook behavior, and a real share of the engineering became reconciling their callbacks against my own state instead of building product. For SME volume that trade is correct, and I'd make it again. At high volume the cost structure and the dependence on a vendor's webhook reliability change, and I'd reassess taking e-signature in-house.\n\nThe geo-detection is right often, not always. That's why the manual override is sticky and not optional — I treated detection as a helpful default, never as ground truth. That's a design admission, not a bug I fixed.\n\nAnd there's a deeper constraint baked into the model: it encodes the markets I researched. The data-driven approach makes adding a similar country cheap, but a market with a genuinely different contracting or tax regime would send me back into the rule model itself, not just a new row. That's the boundary of \"adding a market is a data change,\" and I'd rather name it than oversell it.",
    results:
      "The outcome is operational, not a launch announcement: a SaaS backbone that turns a services business into a repeatable multi-country pipeline. Correct local pricing across 10 markets, a tracked lead-to-contract flow, and a VAT-aware, e-signed, billed agreement at the end of it. What proves it's real is the work running on it — 10 country markets served from one rule set, with three live client sites shipped on top across distinct verticals: car rental, tours, and beauty. That's the validation it holds under real builds, not a demo.\n\nThere's a quieter result I value more, because it's the failure that started all this. A deal can no longer end up signed-but-unbilled or billed-but-unsigned. The moment a contract is signed and a billing call stalls, the pipeline holds the deal in a known state and resumes it. Before, a hiccup like that was a client with a signature, no invoice, and nobody the wiser. The agency went from \"I can do this deal\" to \"the system does this deal, in any of ten markets\" — and it either closes the deal completely or tells me exactly where it stopped.",
    principle:
      "Model the binding artifact as data, not as a document you maintain. Once a contract is a function of structured inputs, correctness stops degrading with every market you add, and a new country is a row instead of a rewrite. And when a deal depends on two outside systems agreeing, make your own state the place they reconcile — idempotent at every join — so no sequence of duplicate or dropped callbacks can leave a client half-closed. Correctness you own beats correctness you hope two vendors deliver in the right order.",
    stack: [
      "React",
      "TypeScript",
      "Supabase (Postgres + Auth)",
      "Vercel",
      "Server-side PDF/DOCX generation",
      "Third-party e-signature provider",
      "Third-party billing/payments provider",
      "i18n / edge geo-detection",
      "Push notifications",
    ],
  },
  {
    slug: "energy-audit-field-crm",
    title: "A field CRM that won't generate a wrong funding contract",
    resultsPreview:
      "Field teams run their whole pipeline from their phones and generate every government-funding contract straight out of the CRM, daily. Nobody hand-fills the document anymore; the server builds each one from the order data, identical every time. The decision that made it work: treat the contract as a deterministic artifact the server builds from structured order data, never a document a person fills in by hand.",
    problem:
      "The workflow was: close an energy-audit job, then sit down and build its government-funding contract by hand. The pipeline lived in spreadsheets. The contract lived in a template someone copied and edited per job. The two only stayed in sync as far as whoever was typing that afternoon kept them there.\n\nA salesperson, an auditor, and an admin all touched the same job. Each needed a different slice of it. The spreadsheet showed all of them everything.\n\nAnd a blank or wrong field on a funding contract doesn't read as a draft. It reads as a real, signed answer on a document that unlocks public money. One mistyped value and the application gets bounced; the money behind it stalls.",
    context:
      "It's a CRM for field-sales teams running government-funded energy-audit programs. A 9-stage order pipeline, three roles, automated contract generation, a map view, push notifications, and a performance leaderboard.\n\nThe output documents are government funding contracts. That's what raises the stakes: 'mostly correct' isn't a typo here, it's a failed application.\n\nThree constraints shaped the build. Three roles (salesperson, auditor, admin) share one underlying dataset, but each may see only its slice. The people using it are out in the field, on phones, with flaky connectivity. And every contract has to come out identical in shape, because a funding reviewer reads it as a legal document, not a form draft.",
    myRole:
      "Sole engineer. All of it was mine: the data model, the Postgres row-level security policies, the server-side document-generation service, and the React frontend the field teams use.\n\nThere was nobody to hand the 'why can't this user see this row' question to, and no separate person owning the document layer. So the correctness of the funding contracts sat with me, end to end. The client isn't named here.",
    decisions: [
      {
        decision:
          "Model the order as one record moving through 9 named pipeline stages, and make that stage the single fact documents, notifications, and visibility all read from.",
        why: "Multiple roles touch the same order over unreliable connections. If each feature kept its own idea of where an order was, those ideas would drift. And on a flaky phone, drift means two people acting on stale state. So: one stage field, one place it changes.",
        rejected:
          "A looser status model with independent boolean flags (is_audited, is_approved, contract_sent) that each feature sets on its own.",
        tradeoff:
          "Nine fixed stages are rigid. A genuinely new step in the sales process is a real schema and logic change, not a flipped flag. I took that on purpose. It's what keeps the derived features honest; they have nothing to read but the stage.",
      },
      {
        decision:
          "Put access control in Postgres row-level security, not the React frontend, and write every policy to fail closed.",
        why: "With three personas sharing one dataset, the live question is which rows a given user may see. The only safe place to answer that is the data layer. Put authorization in the client and one bug, or one direct query, leaks the whole table. Fail closed and a missing policy hides data instead of exposing it.",
        rejected:
          "Filtering by role in frontend queries, or in an API layer that trusts whatever role the caller claims to be.",
        tradeoff:
          "Every new feature that reads order data has to be reasoned about against the policies, and debugging visibility means reading SQL predicates instead of stepping through JS. I'll be plain: unlike a sibling project where composed RLS policies bit me with an infinite-recursion bug, this RLS work was the careful, uneventful kind. No dramatic failure. Just a steady tax I pay writing and re-reading predicates on every feature.",
      },
      {
        decision:
          "Generate funding contracts server-side: map structured order fields into a templated DOCX with explicit field bindings, render to PDF, and treat any unmapped or null required field as a hard failure that refuses to emit the contract.",
        why: "The contract is the deliverable that unlocks the money. A blank on a funding application reads as a signed answer, not a gap someone will obviously catch. Explicit bindings, plus hard-failing on nulls, means the system stops and refuses instead of quietly shipping a half-empty document that looks complete.",
        rejected:
          "A visual / WYSIWYG template editor, so non-engineers could reword contracts without a deploy.",
        tradeoff:
          "Code-managed templates are slower to reword. Changing a clause is a commit, not a click. I took that for determinism and reviewability: the template lives in version control, so every wording change is diffable and the layout can't drift between two generated contracts.",
      },
      {
        decision:
          "Drive push notifications and the leaderboard off pipeline-stage events, not off each individual action.",
        why: "If every place that mutated an order also fired its own notification and recomputed standings, the side effects would tangle. And a retry from a phone that just lost signal would double-fire them. Derive it all from stage transitions and you get one trigger point, one thing to trust.",
        rejected:
          "Imperative side effects scattered at each mutation site: send the push here, bump the leaderboard there.",
        tradeoff:
          "Everything routes through the stage model, so that model carries more weight and has to be the piece I trust most. Concentrating the risk there was the point. It does mean a bug in a stage transition is a bug in three features at once.",
      },
    ],
    build:
      "I built the riskiest piece first, on purpose, so it could be wrong while it was still cheap to fix. That was the order record and its 9 stages. Everything else keys off stage, and I wanted to find out early if that model was wrong, not late.\n\nWith stage transitions established as the source of truth, RLS went on top. I wrote the policies persona by persona and composed them with the stage model: a salesperson sees their own orders, an auditor sees the stages relevant to the audit, an admin sees everything, and a missing policy defaults to no access. Composing three personas across nine stages was the slow, fiddly part. Every policy has to agree on which stage a row is in and which persona is asking. Getting that agreement right took patience, not heroics.\n\nThen the document service, which I treated as the highest-correctness unit in the system. Structured fields into a templated DOCX with explicit bindings, rendered to PDF, hard-failing on any missing required field rather than emitting a contract with a hole in it.\n\nOnly once the spine, the policies, and the documents were solid did I build the parts people see: the mobile-first React frontend (React, TypeScript, TanStack Router, Supabase), the map view, push notifications, and the leaderboard. Every one of them reads from the stage model instead of inventing its own state.\n\nThe artifacts that matter are concrete: a versioned DOCX template with named field bindings, a set of fail-closed RLS policies, and a single stage enum the whole app routes through.",
    evals:
      "Success was defined narrowly: a generated funding contract has to be correct every time, because the failure mode is a rejected application, not a cosmetic glitch. So contract generation was the operation I held the line on.\n\nBefore, the contract was hand-assembled per job. The error rate was whatever the human had left in them that day, and there was no single moment where correctness got checked. After, the check moved into the generator: explicit field bindings plus a hard-fail on any unmapped or null required field, so the system can't emit a contract with a silent blank. The shift on that one operation is from 'a person validates each contract by re-reading it' to 'the generator refuses to produce an invalid one.'\n\nI won't claim a percentage I didn't measure. What I can verify: the manual assembly step is gone, the teams run contract generation themselves on their phones as part of daily work, and the RLS policies were exercised across all three personas, not one.\n\nThe leaderboard and notifications I treated as derived correctness. If either ever disagreed with the order's actual stage, that was the signal the stage model had a bug. So they doubled as a cheap consistency check on the spine.",
    limitations:
      "RLS was the right call for correctness, and it carries a cost I won't hide. Every new feature that reads order data has to be reasoned about against the policies. And when someone asks 'why can't this user see this row,' the answer lives in SQL predicates, not in readable application code. For a small team and three personas, that tax is acceptable.\n\nPast three personas, or if the visibility rules turned more conditional, I'd pull authorization out of inline RLS into an explicit, testable policy layer I could unit-test in isolation. Debugging composed predicates by hand doesn't scale.\n\nThe code-managed templates are the other honest trade. When the client wants a clause reworded, it's a deploy, not a self-serve edit, and I chose that knowingly. If wording started changing often, I'd revisit it, probably toward a reviewed template-data layer rather than a free WYSIWYG editor, so I keep determinism without turning every reword into an engineering ticket.",
    results:
      "It shipped as a working field CRM the teams use daily on their phones. The manual contract-assembly step is gone. Instead of closing a job and then hand-building the funding contract, the contract comes out of the order data, the same shape every time, and the system refuses to emit one with a blank where a signed answer belongs.\n\nThe pipeline went from scattered spreadsheets where everyone saw everything to a single record where each role sees only its slice. The people in the field now generate compliant funding contracts themselves, without a desk in the loop.\n\nNo benchmark number here. Just a whole human step the system absorbed, and a source of truth that stopped being everyone's spreadsheet and became one pipeline of record.",
    principle:
      "When the document is the deliverable that unlocks the money, make the system refuse to produce a wrong one rather than trust a human to catch it. Push correctness down to the layer that can fail closed. And pay the tax that buys, without pretending it's free.",
    stack: [
      "React",
      "TypeScript",
      "TanStack Router",
      "Supabase (Postgres)",
      "Postgres row-level security",
      "Server-side DOCX/PDF generation",
      "Map view",
      "Push notifications",
    ],
  },
  {
    slug: "flyt-pooled-container-money-state-machine",
    title: "Pooling buyers into one container without ever stranding a deposit",
    resultsPreview:
      "Flyt is my freight and group-import marketplace for Iceland: carriers bid on posted deliveries, and buyers pool into one shared container to split import costs. On the pooling side I built a deposit that refunds itself if the container never fills, backed by an explicit Postgres state machine. Nobody is double-charged; no deposit goes missing. The idea underneath: treat every money event as a state transition, not a side effect.",
    problem:
      "Importing a single item to Iceland quietly punishes you. You find the thing you want at an EU retailer, then shipping one small parcel costs nearly as much as the item, customs and VAT land on top, and the price you actually pay looks nothing like the sticker.\n\nEveryone here knows the workaround. Wait until a few people want things from the same region, put it all in one container, split the freight.\n\nBut the moment you organize that pooling for strangers, it stops being a logistics problem and becomes a money problem. Whose deposit are you holding? What happens to it if not enough people join and the container never ships? If someone backs out on day six, who eats the gap?\n\nI kept picturing the same failure, the one that kills schemes like this. A buyer pays to reserve a slot. The campaign quietly fizzles. Three weeks later they email asking where their money is. On a price-sensitive purchase, one stranded refund and the reputation is gone.",
    context:
      "Flyt (flyt.is) is my own venture, a freight and group-import marketplace for Iceland. It has two sides. On the carrier-bidding side you post a delivery, verified carriers send prices within hours, and you pick one. On the group-import side, buyers pool into a shared container under deposit-and-refund logic, with on-demand cross-border VAT import quoting and an admin dashboard for live campaign tracking. This study goes deep on the harder of the two: the money mechanics of pooling.\n\nThe stakes aren't cosmetic. This is real money held for real buyers, in a market where freight is expensive and people are already nervous about import costs.\n\nA few constraints shaped everything. Correctness on the money flow is non-negotiable; a double-charge or a stranded deposit isn't a bug you apologize for, it's trust you don't get back. The landed cost has to be believable enough that a careful buyer commits. The data is messy in the ordinary way: campaigns partially fill, people cancel, timing is awkward. And because it's a marketplace, it only works if campaigns actually reach the threshold to ship.",
    myRole:
      "Solo. My own venture, built end to end: the pooling mechanic, the deposit-and-refund state machine, the landed-cost quoting rules, the admin dashboard, and the data model under all of it. No hired devs, no contractors. The decisions below are mine, including the ones I still argue with myself about.",
    decisions: [
      {
        decision:
          "Run the freight side as a carrier-bidding marketplace. Post a delivery, verified carriers bid, the customer picks.",
        why: "Freight pricing in Iceland is opaque and quote-by-quote. Letting carriers compete on a posted delivery turns an ask-around process into a set of real, comparable prices fast. That's the reason to use a marketplace instead of calling one carrier.",
        rejected:
          "Publishing my own fixed rate card. Simpler for the buyer, but I'd be guessing every lane's true cost, so I'd either overcharge or eat the gap. That's owning pricing risk that isn't mine to own.",
        tradeoff:
          "A bidding marketplace needs enough verified carriers to produce competitive bids, so it carries a cold-start cost on the supply side. I took that trade. Real competing bids are the product; a made-up rate card isn't.",
      },
      {
        decision:
          "Use deposits with conditional refunds as the pooling mechanic: collect a deposit to reserve a slot, refund automatically if the campaign doesn't fill.",
        why: "Pooling only works if commitment is real. A reserved slot has to mean something, or the campaign math is fiction. The deposit is the commitment signal; the automatic refund is what makes committing rational for a nervous buyer.",
        rejected:
          "Two of them. Charging only on confirmation, once the container is confirmed to ship, means nobody is actually committed, so campaigns never reach the threshold and you can't tell a real slot from a maybe. Full upfront payment flips all the risk onto the buyer for a container that might never leave. On a price-sensitive import, that's the friction that kills sign-ups.",
        tradeoff:
          "The deposit model only earns trust if the refund is flawless. So I bought myself a refund state machine that must never double-charge and must never strand a deposit. I traded a simple payment flow for a hard correctness problem, on purpose.",
      },
      {
        decision:
          "Compute landed cost (item + shipping + customs + VAT) from structured per-category rules, with VAT rate and customs treatment encoded per category, instead of a flat percentage markup.",
        why: "The quote is what a buyer commits money against. On a price-sensitive purchase, a flat markup is wrong often enough that the gap between the quote and the real landed cost erodes trust right when you need it most. Per-category rules keep the number close enough to believe.",
        rejected:
          "A flat percentage on top of the item price. Trivial to build, and wrong in both directions across categories. Sometimes it overquotes and scares the buyer off. Sometimes it underquotes and leaves someone angry at delivery. Either way you lose trust.",
        tradeoff:
          "Per-category rules mean ongoing maintenance. Every category I encode is a rule I now own and have to keep correct as treatment changes. I took the maintenance burden in exchange for quotes a careful buyer will actually trust.",
      },
      {
        decision:
          "Make campaign, slot, and deposit state in Postgres the single source of truth, with money events driven by explicit state transitions.",
        why: "On a money flow, the answer to 'what should happen to this deposit right now' has to come from one authoritative place, not from scattered flags or the timing of a webhook. If state is the source of truth, 'refund on no-fill' is a transition I can define, test, and reason about. Not an event I hope fires once.",
        rejected:
          "Letting payment-provider events or ad-hoc booleans drive the money logic directly. That's the path where a retried webhook double-charges, or two flags disagree and a deposit ends up in limbo, owned by no state at all.",
        tradeoff:
          "More upfront modeling, and stricter discipline about what counts as a valid transition. Adding a feature is slower when every money-touching change has to go through the state model. That's the cost of sleeping while you hold other people's deposits.",
      },
    ],
    build:
      "I built the money side smallest-unit-first, because the money side is the part you can't ship hopeful. The first real artifact wasn't the marketplace UI. It was the campaign/slot/deposit model in Supabase Postgres: the states a slot can be in, and the legal transitions between them.\n\nRefund and fill are transitions on that model, not things that happen when a payment event arrives. So the question of what a deposit is owed at any moment is always answerable from the database, never reconstructed from a log.\n\nFrom there I worked outward. First the deposit-to-reserve flow, then the two paths that actually matter: the partial-fill path, where a campaign closes without reaching its threshold and every deposit refunds, and the cancellation path, where a buyer backs out before fill.\n\nThe landed-cost quoter went in as its own piece, with structured per-category rules for VAT and customs instead of a flat percentage, so the number a buyer commits against is computed, not guessed.\n\nThe admin dashboard was the safety net I built for myself: live campaign tracking plus bulk notifications, so a campaign in a wrong state is visible to me right away instead of surfacing through a complaint.\n\nThe stack stayed deliberately boring. React and TypeScript on the front, Supabase (Postgres) as the source of truth, Vercel for deploy. That way my attention went to the state machine, not the infrastructure.",
    evals:
      "Success here had one bar: the money logic is correct on the paths where it's tempting to be wrong. Not \"the happy path works\"; the happy path is never the problem.\n\nI defined success as the partial-fill path and the cancellation path behaving correctly, with no double-charge, no stranded deposit, and every refund owed actually issued. I checked the logic against those cases specifically: a campaign that fills, a campaign that doesn't, a buyer who cancels mid-campaign, and the awkward timing in between.\n\nThe method was to drive those transitions through the state model and confirm the resulting money state matched what the model said it should be. The admin dashboard was the live second check. Because it surfaces campaign and deposit state directly, a wrong state shows up as something visibly wrong the moment it happens, not weeks later in an email.\n\nI'm not going to quote a transaction count or a revenue number; this is a live business holding real deposits. But the honest proxy is the one that matters. The bar was zero money-correctness failures on the fill and cancellation paths, and that's what I built and tested against, not a throughput figure.",
    limitations:
      "Three honest ones.\n\nFirst, the landed-cost quoter is built for the common import categories and it's good there, but it doesn't cover every exotic edge case. Some unusual customs treatments fall outside the encoded rules. I'd rather quote well for the cases people actually buy than vaguely for all of them. That's a deliberate choice, not an oversight, but it's a real limit.\n\nSecond, it's built for SME-scale volume. The design assumptions are about that scale, and I haven't stress-proven the money state machine under genuinely high concurrency on a single campaign.\n\nThird, the one I'm least able to engineer my way out of. It's a marketplace, so the cold-start problem is baked in. The whole mechanic depends on enough buyers showing up to fill a campaign, and no amount of correctness in the refund logic creates demand. If I were doing it again I'd think harder about seeding the first campaigns, instead of assuming a clean refund experience alone would pull liquidity.",
    results:
      "What I have is a pooling mechanic where the failure mode that kills these schemes can't happen quietly. If a campaign doesn't fill, the deposits refund automatically, as a consequence of the state model, not because someone remembered to process them.\n\nThe operational value is concrete. Working out who's owed what when a campaign collapses, going down a list issuing refunds by hand while hoping you don't pay someone twice or miss someone entirely, is exactly the kind of manual reconciliation that goes wrong. Here it's a defined transition the system performs. A multi-row manual refund pass becomes an automatic consequence of the campaign's state.\n\nAnd because the admin dashboard surfaces live campaign and deposit state, the human anecdote is the absence of one. Instead of learning a campaign went wrong from a buyer asking where their money is, I see the wrong state on the dashboard first. For a one-person venture holding strangers' deposits, the system noticing before the customer does is the whole game.",
    principle:
      "On a money flow, model the states first and let the money follow them, never the other way around. If 'what is this person owed right now' can only be reconstructed from logs and timing, you don't have a refund feature. You have a future apology.\n\nThe cold-start problem is the honest counterweight. No state machine solves liquidity for you, so don't let clean correctness convince you you've solved demand.",
    stack: ["React", "TypeScript", "Supabase (Postgres)", "Vercel"],
  },
  {
    slug: "ai-native-workshop-management",
    title: "A workshop AI for a trade I'd never worked in",
    resultsPreview:
      "Live at a real repair shop: quoting, calendar, SMS, and customer approvals, all running in production. I don't come from the mechanic's trade, so I built it on the shop floor and let a working mechanic define what a correct answer is; the hardest lesson landed after launch, when thin usage turned out to be an adoption problem, not a feature one. Underneath it's real engineering too: labor times computed from the shop's own closed jobs instead of a model's guess, about 92% of input tokens served from cache, a 12,857-code diagnostic lookup that answers in zero tokens, and an adversarial multi-agent audit that logged 124 findings and shipped 63 fixes within the week.",
    problem:
      "Ask a small workshop how long a timing-belt job takes on a ten-year-old Yaris and you get an estimate from memory. A different one depending on the day, and on who picks up the phone. Quotes lived in people's heads and chat threads. Bookings lived on paper. Nothing the shop learned on one job made the next quote any smarter.\n\nI don't come from this trade. When I started I couldn't have told a timing belt from a serpentine one, so the first problem wasn't technical at all. I had no standing to guess what a mechanic actually needs.\n\nThe real problem only showed up once I understood it from the floor, and it wasn't 'build a booking app'. A working shop produces precise operational data every day — real labor times, real parts, real outcomes — and all of it was evaporating. Meanwhile every 'AI for workshops' pitch I saw wanted to point a chatbot at that and let it guess.\n\nA guessed price on a real invoice isn't a feature. It's a liability with a chat interface.",
    context:
      "The shop is a real one-lift garage in Keflavík that my company shares infrastructure with. Non-technical owner, phones-first, customers who speak Polish, Icelandic and English.\n\nBecause I don't come from the trade, I did the unglamorous thing first. I spent time on the floor, sat with real jobs as they came through, and worked the problems out next to the mechanic instead of interviewing him once and disappearing to code. The assistant's master-mechanic voice came straight out of that. It's built from a working mechanic's own spec for how a 25-year pro reasons about a fault, not from my idea of one.\n\nI also ran structured research into the trade's real pains: more than sixty documented pain points, narrowed to the ten with the hardest evidence. So the roadmap answered problems mechanics actually have, not the ones I assumed.\n\nThe constraints were the small-business kind, and unforgiving. The system had to be trustworthy enough to send real SMS to real customers with real prices attached. It had to run on managed infrastructure, because nobody babysits servers between oil changes. And it had to be useful to a mechanic mid-job, which means fast, grounded answers, not essays.\n\nI set one design law before writing a line of code, and it shaped everything after: hard facts live in SQL, context lives in vectors, and the model never gets to invent either.",
    myRole:
      "I designed and built the whole system solo — the schema, the row-level security policies, the edge functions, the assistant pipeline, the cost model — and I run it in production.\n\nOne thing I want to be precise about: I'm the engineer, not the mechanic. I didn't fake domain expertise I don't have. I went and got as much of it as an outsider can, by working next to someone who has it, and I let his knowledge define what 'correct' means for the shop-floor answers, not mine.\n\nI also trained the shop on the system and take the support calls myself. So every rough edge comes back to me as a phone call. That feedback loop is what turned the adoption problem from an opinion into a spec.\n\nSince then the immersion has gone further than I planned: when the operation needs cover I run the day-to-day myself — rental and garage both, bookings, customers, coordination. Still not a mechanic. But the business no longer stops when one person is away, and I understand the workflows I'm automating from the inside.",
    decisions: [
      {
        decision:
          "Compute labor-time estimates from the shop's own closed jobs, not the LLM — a live SQL view that falls back three levels: make+model, then make, then global.",
        why: "Every closed job makes the next quote smarter, at zero tokens and with no room to hallucinate. The database learns, so the model doesn't have to pretend it knows.",
        rejected:
          "LLM-generated estimates with a disclaimer, or static industry labor-time tables. The first guesses. The second doesn't know this shop or the mechanic working in it.",
        tradeoff:
          "There's a cold-start problem baked in. With few closed jobs the medians are thin, and that's what the fallback chain handles. Early estimates lean on the broader buckets and say so, instead of faking confidence.",
      },
      {
        decision:
          "Split the assistant into two paths. Bare diagnostic codes and plates skip the LLM entirely and hit a database function over a 12,857-code table; everything else goes to the model.",
        why: "A mechanic typing P0301 doesn't want prose. They want the answer in under a second, and a deterministic lookup shouldn't cost tokens or latency.",
        rejected:
          "Routing everything through the model for a 'consistent experience'. Consistent, yes — also slower and more expensive at the exact moment speed matters most.",
        tradeoff:
          "Two code paths to maintain, plus a router that has to tell a lookup from a question. The zero-tokens badge in the UI keeps me honest about which path actually fired.",
      },
      {
        decision:
          "Ground the assistant's retrieval in this shop's own history, on Postgres pgvector, isolated from every other system I run, with a hard minimum-similarity threshold.",
        why: "Client-data separation isn't optional. And an audit showed that piling on more knowledge-base documents without a similarity floor made answers worse and costs higher. That's retrieval noise, not knowledge.",
        rejected:
          "One shared vector index across my projects — cheaper, simpler. And thresholdless top-k retrieval, which is the default everyone ships.",
        tradeoff:
          "Sometimes the assistant says it doesn't have enough context, where a looser retriever would have mumbled something plausible. I'll take the honest gap over the confident mumble.",
      },
      {
        decision:
          "Make row-level security the only barrier, and keep prices physically out of the mechanic-facing query paths, behind narrow security-definer functions.",
        why: "If a role should never see pricing, the safest design is a query path that can't return it. Not a UI that politely hides it.",
        rejected: "App-layer filtering. It's one forgotten WHERE clause away from a leak, forever.",
        tradeoff:
          "RLS policies interact in non-obvious ways and are harder to reason about. I paid for that in audit findings. Still the right wall to load-bear.",
      },
      {
        decision:
          "Cache the whole conversation rather than just the system prompt, and route between a light and a heavy model by task weight.",
        why: "Multi-step repair conversations reuse almost all of their context. Moving the cache breakpoint put about 92% of input tokens on cache — measured in production, not estimated. That cut the cost of multi-step replies by roughly 70%.",
        rejected: "Default prompt caching, and a single 'best' model for everything.",
        tradeoff:
          "Cache-aware prompt structure limits how freely I can reorder context, and a model router is one more component to test. Worth it at these margins.",
      },
      {
        decision:
          "Treat adoption as an engineering problem. When the shop barely touched the richer features, I redesigned the workflow down to one tap instead of shipping more capability.",
        why: "A usability pass caught the signal early. The live data was nearly empty — a handful of jobs, no photos, no inspections, barely any mechanic use. The honest read wasn't 'we need more features'. It was a workflow-adoption gap. A mechanic under a car won't fight a buried dropdown or read a long AI answer, however good it is, and unused capability is worth zero. So the leverage was in removing friction, not adding surface.",
        rejected:
          "Reading the thin usage as 'needs more features' and building more — the reflex that makes software look great in a demo and go dead on the floor. And blaming the users, which is the same mistake in a different hat. People don't resist tools, they resist friction.",
        tradeoff:
          "I spent build time collapsing flows instead of shipping new ones. A one-tap next-stage button replaced a status dropdown. Assistant replies dropped from about 3,400 to 1,100 characters, with the detail moved one tap away. Follow-ups became big buttons a greasy thumb can hit first try. It shows up as less visible progress and a slower feature count. But usage is the only thing that turns a build into a system someone actually runs.",
      },
    ],
    build:
      "React 19 and TypeScript with TanStack Router on the front. Supabase underneath — Postgres with pgvector for retrieval, plus auth and storage, and Deno edge functions running the assistant pipeline, SMS and web push. Claude does the reasoning on a light/heavy model split, Voyage does the embeddings, Twilio sends the SMS, Sentry watches production. At the time of writing: 28 tables, 7 edge functions, 3 roles, 18 migrations. The critical-path bundle went from 780KB to about 140KB gzipped along the way, because a workshop phone on a workshop connection is the real target device.\n\nThe part I'd point at is the assistant's reliability layer. The model's inline links and diagrams get verified after generation with real HTTP checks before they reach the mechanic — models fabricate video links with total confidence. And when the hosted web-search tool throws an upstream error, the assistant degrades to local tools instead of returning a 500 to someone standing under a car.\n\nThe other half of the build isn't in the stack list, and I underrated it at the start: the work that made a busy shop actually use the thing. Once the usage signal came in, I collapsed the multi-step status change into a single next-stage tap, made the assistant answer short by default with the depth one tap away, and turned its follow-ups into large buttons a greasy thumb can hit first try. None of that ships as a new feature. All of it is the difference between a tool that gets opened and one that gets closed.",
    evals:
      "Three ways, in increasing order of honesty.\n\nFirst, end-to-end security tests run as a user, not as a query. Log in as a mechanic, try to read prices and other people's jobs directly, get zero rows back. Proven, not assumed.\n\nSecond, an adversarial multi-agent audit: eight analyzer agents over the codebase, then parallel fixer agents. It logged 124 findings, 20 of them serious, and 63 fixes shipped within the week — including a real filter-injection bug in customer search that no amount of manual clicking would have surfaced.\n\nThird, the strictest harness I know: the shop uses it every day. A wrong labor estimate or a failed SMS turns into a phone call from the owner within hours.\n\nThere's a fourth eval I didn't plan for and now trust most — whether the shop actually uses the thing. Early on the answer was 'barely'. That was the most useful result the project produced: it told me the gap was adoption, not features, and pointed the next month of work at friction instead of capability. Usage is a harsher grader than any test suite. It can't be gamed, and it doesn't care how elegant the code is.",
    limitations:
      "The audit backlog is honest. A set of lower-severity findings got triaged and deferred rather than fixed in the same week, and it's tracked openly instead of pretended away.\n\nThe learning loop has a built-in cold start. A shop that has closed forty jobs teaches the system far more than one that has closed four, and early estimates show it.\n\nOne meta-lesson cost real money. An agent in the audit fleet defaulted to a heavier model than intended and burned budget on verification passes. So every agent call in my tooling now pins its model explicitly.\n\nTwo more. I'm still an outsider to this trade — I've narrowed the gap by working next to someone who isn't, but there are failure modes a lifelong mechanic would smell that I'd only catch after they bite. That's why the domain answers are grounded in his spec, not my judgment. And adoption is never finished: a habit you engineered once erodes the first time you add friction back, so every new feature now has to justify the taps it costs, not just the capability it adds.",
    results:
      "The shop runs on it daily — quoting, calendar, customer SMS, the approval flow. Every closed job feeds the labor-time view that prices the next one, so the system is measurably smarter this month than last, at zero marginal cost.\n\nThe engineering wins are measured, not vibes. About 92% of input tokens from cache on multi-step conversations. Roughly 70% cost reduction on those replies. Instant zero-token answers for the most common mechanic queries. And a security model that survived an adversarial audit with the serious findings fixed in days. It's also where my 'hard facts in SQL, context in vectors' rule earned its keep — I've reused it in every AI build since.\n\nBut the result I'd put first is the one I didn't expect going in. I built a correct system for a trade I can't work in myself, and it still nearly went unused, until I stopped treating adoption as someone else's job and engineered it like the rest of the stack. A tool a busy shop keeps open, in a domain I had no standing in a year ago, beats any number on the cache hit rate.",
    principle:
      "If you build for a trade you don't come from, your judgment isn't the source of truth. Go stand where the work happens. Let the people who do it define what 'correct' means. Then treat getting them to actually use what you built as the last and hardest engineering problem, not a training afterthought.\n\nThe cleverest system scores zero the day the shop stops opening it. Build for the hands that will use it, ground the facts in something that can't hallucinate, and earn the habit. In that order.",
    stack: [
      "React 19",
      "TypeScript",
      "TanStack Router",
      "Supabase",
      "pgvector",
      "Postgres RLS",
      "Deno Edge Functions",
      "Claude (light/heavy routing)",
      "Voyage embeddings",
      "Twilio SMS",
      "Web Push",
      "Sentry",
    ],
  },
  {
    slug: "autonomous-outreach-agent",
    title: "A cold-email agent built so it could never send twice",
    resultsPreview:
      "For two months it ran a real cold-email campaign, Monday to Friday, unattended: it researched companies, wrote and sent the emails, caught replies and bounces, and rewrote its own writing rules as it went. The engineering that mattered was defensive — three independent layers of double-send protection, a bounce and out-of-office sweep before each run, and a self-review that turned each batch's mistakes into permanent rules. It opened real conversations with Icelandic companies, zero duplicate sends across the whole run.",
    problem:
      "Cold outreach is easy if you don't care about your name. I did. The sender was my own company's domain, and the market is Iceland — small enough that any recipient might know every other one. And the agent would run with nobody watching.\n\nThe naive build is easy and dangerous: an LLM that writes flattering emails, a cron job that sends them. But the real problem isn't the writing. It's state. How does an unattended system stay sure about who was contacted, who bounced, who replied, and who must never be emailed again, when any of its own writes can fail silently mid-run? Get that wrong once and the same busy person gets the same pitch twice. In a market this size, word travels.",
    context:
      "The campaign sold eco paper cups for MAS Prints to Icelandic cafés, hotels, canteens and attractions. The list was several hundred companies, tiered by value.\n\nThe operating rules were strict. Five new companies a day, business hours only, Icelandic public holidays respected, hard caps per domain. And one line that never bent: the moment a real human replies, automation stops and I take over.\n\nNone of it ran on new infrastructure. A scheduled agent, Gmail through a tool integration, the contact queue and daily drafts as plain Markdown files on disk, push alerts to my phone. Things I already had.",
    myRole:
      "I designed the system and its guardrails, wrote the operating prompt it runs on, and read its logs. The agent did the daily work. I did the engineering that made it safe to leave alone.",
    decisions: [
      {
        decision:
          "Make double-send protection three independent layers that must all clear: a permanent block list with per-domain caps, the queue status, and draft files written to disk before sending as the ground truth.",
        why: "Any single record can be wrong. A status write fails silently, and the next run happily re-sends. Independent layers fail independently, so the expensive mistake needs all three to fail at once.",
        rejected:
          "Trusting the mailbox's Sent folder. What killed that idea: the Gmail integration over IMAP never searches Sent. The query returns zero even for mail that definitely went out. If I hadn't tested that assumption, the safety check would have approved every duplicate.",
        tradeoff:
          "More bookkeeping per email, and the occasional false skip. In outreach a skipped email costs a day; a duplicate costs the domain its credibility.",
      },
      {
        decision:
          "Start every run by looking backward: search the previous seven days for bounces and out-of-office replies before doing anything new.",
        why: "The agent doesn't run on weekends. Bounces do. Guessed addresses at small Icelandic firms bounce constantly, and each bounce kicks off a hunt for the company's real general inbox before any resend is allowed.",
        rejected:
          "Handling bounces only right after sending. That catches the fast SMTP rejections. The slow half arrives hours later, when the run is already over.",
        tradeoff:
          "Every session pays a fixed cost reading old mail before it does anything new. Worth it — the bounce-to-alternative-address cycle recovered contacts that would otherwise have been dead ends.",
      },
      {
        decision:
          "Give hook research a quality gate: a nine-step search pipeline to find something real about the company, then a hard green/red call. 'No hook' is an allowed result.",
        why: "The worst cold email opens with a forced compliment. A hook only works if the bridge to the product is one natural, observational sentence: state the fact, ask the question, don't draw the conclusion for the reader.",
        rejected:
          "Letting the model find something nice to say every time. That's how you get 'congratulations on the new hire... anyway, about your cups'.",
        tradeoff:
          "Plenty of emails shipped hookless. A plain opener beats a fabricated one, and the reply log agreed.",
      },
      {
        decision:
          "Make the agent review its own output after every batch and write generalized rules back into its own operating prompt.",
        why: "The same mistakes kept showing up as categories, not one-offs: presumptuous hooks, sales-deck phrasing, idioms a non-native English reader would trip on. So the self-review after each batch has to produce a rule, not a single fix. That compounds.",
        rejected:
          "Me editing every draft, which doesn't scale and defeats the point. Or a static style guide, which goes stale the day it's written.",
        tradeoff:
          "The operating prompt grows and needs occasional pruning, and the self-review costs tokens every batch. That's the difference between an agent that runs and one that gets better.",
      },
    ],
    build:
      "The whole system is a scheduled agent driven by a long operating prompt. No custom backend at all, which was itself a decision. The queue, campaign notes, templates and daily drafts live as Markdown in my knowledge vault, written through a file-access layer. Gmail runs through a tool integration. Company research is web search with site-restricted queries against Icelandic media. Alerts go to my phone.\n\nThe weekday pipeline runs in a fixed order. First the retrospective bounce and out-of-office sweep. Then the holiday and business-hours check, then any drafts left pending from earlier runs. Then reply detection, both thread-based and domain-based, filtered through a multilingual auto-reply list.\n\nOnly then does it pick five new companies by tier, under the domain caps. It hunts down missing general inboxes, researches and gates the hooks, and writes the emails under hard word limits: 120 words cold, 80 for a general inbox, 60 for a follow-up. Drafts get saved to disk, then sent. After that, a post-send bounce check, the self-review, and a line appended to the learnings log.",
    evals:
      "The logs were the eval. Every run recorded what it sent, what it skipped and which layer blocked it, and what the self-review corrected. That's how the real bugs surfaced: duplicate sends slipping through on a company's second top-level domain, and a genuine human reply nearly missed because it came from a different person than the one I'd contacted. Each became a named rule in the prompt the same day.\n\nThe metric that actually matters is simpler: real humans replying. The campaign opened conversations with exactly the tier of companies it was built for, including a national attraction and the operations manager of a nationwide franchise. Each landed on my phone within minutes as a hot lead.",
    limitations:
      "Reply detection is only as good as the mailbox's search. The IMAP quirks forced real workarounds: plain keyword queries only, because quoted phrases and OR operators silently break the search.\n\nHook research burned real time for modest hit rates. Most small companies in a small market generate no news, so there's often nothing to find.\n\nAnd the system never crosses the line into replying for a human. The moment someone answers, automation ends. So throughput is capped by me, on purpose.",
    results:
      "Two months of unattended Monday-to-Friday operation against a queue of several hundred companies. Zero duplicate sends. Bounces recycled into corrected contacts on their own, out-of-office replies rescheduled around real return dates, and warm conversations opened with the exact companies the campaign was built to reach.\n\nWhen the campaign wound down, the machinery didn't die with it. I distilled it into a reusable playbook — loop protection, reply detection, the hook gate, follow-up formats. So the next campaign starts on day one with two months of hard-won rules already baked in.",
    principle:
      "In an autonomous system, the writing is the easy 20%. The rest is state discipline. Assume every external check can lie, assume every write can fail, and design so the expensive mistake, emailing a human twice, is structurally impossible instead of merely unlikely.",
    stack: [
      "Claude (scheduled agent)",
      "Gmail integration",
      "Markdown-as-database",
      "Web research pipeline",
      "Multilingual reply detection",
      "Push alerts (ntfy)",
      "Holiday-aware scheduling",
      "Self-amending prompt rules",
    ],
  },
  {
    slug: "reykjawwwik-delivery-machine",
    title: "One engine that turns a brief into a priced, contracted, live site",
    resultsPreview:
      "Nine niche packs, six live markets and a 14-stage pipeline, all reading from one pricing file. A discovery call now ends with a priced, scoped offer on the screen instead of a promise to send something over, and the build starts from a pack that already runs. The delivery half does what I built it to do. It also outran the sales half: one client is live on the subscription and the paid funnel sits paused, so what's short is demand, not throughput.",
    problem:
      "Every new client site started from zero. I'd re-decide which sections the page needed, re-quote from feel, re-write the same contract with different names in it, and re-explain the same process on the same kind of call.\n\nPricing lived in my head and in a spreadsheet. So the number I said on a call and the number in the offer email weren't always the same number, and when I changed one I didn't reliably change the other.\n\nNothing compounded. What I learned building the third site didn't make the fourth one faster, because the fourth one started from a blank editor again. A brief turning into a weekend is fine once. On a monthly subscription, where one price has to cover twelve months, it isn't.\n\nI was the bottleneck at every stage, including the stages that were just typing.",
    context:
      "Reykjawwwik is my own venture: websites on a monthly subscription for small firms in Iceland and Polish-owned firms across the Nordics. Not one-off projects. The client pays monthly, so the margin lives entirely in how repeatable a build is.\n\nThe positioning is the middle gap, above a DIY site builder and well below an Icelandic agency. That sets a hard ceiling on hours. A site that takes an unbounded number of hours is a site I lose money on for a year.\n\nThe team is me and a developer, with an external bookkeeper handling invoices. The clients are non-technical, buy on a call, and want the thing handled rather than explained. Nobody's going to log into a CMS.\n\nThe business also runs in the client's own language across six markets with different currencies, different local booking tools, and different competitive floors. The salon booking system I plug in for Iceland isn't the one a Swedish or Polish salon already uses.",
    myRole:
      "I designed and built the platform. No other developer on it. The data model, the pricing catalog, the offer configurator, the 14-stage pipeline, the contract and e-signature flow, the queued transactional email, the multi-market pricing and attribution: those are mine, and so are the trade-offs below.\n\nWorth being precise about how it's built. The app runs through Lovable's build pipeline on managed Supabase, so plenty of the code is generated rather than typed by me. What I own are the decisions the generator can't make: what the schema looks like, what a stage is allowed to do, where the price comes from.\n\nI also set the catalog itself. What's in each pack, what a block costs, what the delivery promise is, where the scope line sits.\n\nOn an actual client deal I run discovery and the offer. The pipeline hands the build and the client review call to a developer, and my job there is the boundary he works inside. I'm not going to claim those sites as things I coded.",
    decisions: [
      {
        decision:
          "Ship nine fixed niche packs instead of designing each site from the brief. Salon, beauty, restaurant, guesthouse, car rental, tours, tradesperson, auto workshop, coach.",
        why: "Two sites in different trades differ in a handful of decisions, not in everything. Once a pack holds the pages, the default blocks, the local booking tool it plugs into, the discovery questions and the answers to the usual objections, a discovery call turns into a configuration and the build starts from something that already runs.",
        rejected:
          "Designing each site to the brief, which is how the agencies I'm priced against do it. Higher ceiling per deal, and it flatters the client.",
        tradeoff:
          "A business that doesn't fit a pack gets a worse deal than one that does. There's a Custom option and it's the slowest, least profitable path through the system. The pack also shapes the site more than the client's taste does. I say that on the call rather than pretend otherwise.",
      },
      {
        decision:
          "Keep the whole catalog in one code file (packs, blocks, add-ons, hourly rates, delivery days, per-country prices) and generate everything downstream from it, including the reference text the AI assistants answer pricing questions from.",
        why: "The same numbers surface in the configurator, the offer, the contract and the assistants. A second copy goes stale, and it goes stale in front of a client. Building the assistant's price sheet from the same file means it can't quote last month's price.",
        rejected:
          "Prices in the database, edited from the admin UI. Faster to change, no deploy needed, and it's what most people would expect.",
        tradeoff:
          "A price change is a code change and a deploy, not a click. There is a soft override layer in the database for one-off edits, but it sits on top of the code values and there's a reset that drops it back to them, so the file stays the record.",
      },
      {
        decision:
          "Set the base monthly price per market explicitly instead of converting one base price by exchange rate.",
        why: "Conversion produces prices nobody would put on a page, and it moves the price under the client's feet between the call and the invoice. Each market also has its own competitive floor, and the strategy is to enter below it and raise later. That's a positioning number, so a person picks it.",
        rejected:
          "One base price converted at the live rate. Automatic, self-maintaining, one line of code.",
        tradeoff:
          "A hand-maintained table I have to revisit market by market, and prices that drift apart as currencies move. Add-ons, upgrades and hourly work still scale proportionally off each market's base, so only the base needs judgment.",
      },
      {
        decision:
          "Put the operating script inside the pipeline, not just the state. Each of the 14 stages carries what to do now and roughly what to say to the client.",
        why: "The order-of-operations knowledge was the thing living only in my head: when the deposit invoice goes out, what to promise about timing, how to phrase the change-order conversation. State alone doesn't move a deal, and I wanted the process runnable without me in the room.",
        rejected: "A Kanban board with named columns. Standard, free, usable on day one by anyone.",
        tradeoff:
          "The copy is Polish and written for one staffing model: me on discovery and the offer, a developer on build and review, a bookkeeper on invoices. It's an operating manual for this business rather than a CRM anyone could adopt, and changing the flow means changing code.",
      },
      {
        decision:
          "One revision round inside scope. Anything new becomes a signed change order before work starts.",
        why: 'On a subscription the margin is bounded scope. "While you\'re in there" is what turns a 14-day build into a two-month one at the same price for the next twelve months.',
        rejected:
          "Absorbing the small extras to keep the client warm, which is what you want to do and what most people do.",
        tradeoff:
          "You have to say no at the moment the client is most excited about their new site, on the review call. And it puts a signature step in front of something they experience as a small favour. I'd rather have that conversation once than find out in month four that the site is unprofitable.",
      },
    ],
    build:
      "I built in the order of whichever manual step was closest to breaking.\n\nEmail infrastructure went first, at the end of April, because that was the part I was doing by hand in a mail client and the part with deliverability consequences. Two Postgres-backed queues, one for auth mail and one for transactional, each with a dead-letter queue behind it. A send log with real statuses. A retry-after and throughput row so a provider slowdown doesn't turn into a burst. An append-only suppression table with no update or delete policy on it, so a bounce or a complaint can't be walked back, plus unsubscribe tokens.\n\nThe catalog and the offer configurator landed in the second week of May, together with the pipeline: the nine packs with their default blocks, the add-ons, the hourly rates, then 14 stages, an admin inbox, a per-stage action panel, guards that stop and ask before the dangerous jumps (into build without a signed contract, into an active subscription before the client has accepted), and a row written to an events table for every transition, rollback and pause. A priced offer with nowhere to go is just a prettier spreadsheet.\n\nContracts came next, mid-May: change orders, then versioned contract templates in Polish and English, then server-side signing and one-time preview tokens. Late May brought the client questionnaire on tokenized links, so collecting materials stopped being an email thread I had to remember to chase. Early June brought the markets: explicit per-country pricing, country attribution written onto the lead, UTM capture.\n\nAlongside all of it, a scheduled job scans my repos for changed components and keeps two shared documents current, a component library and a build-patterns file. Those are what make a new build start from known-good pieces instead of my memory of how I did it last time.",
    evals:
      "There's no metric here I'd stand behind, so I'll say what I actually have.\n\nThe strongest check is structural. The configurator, the offer, the contract and the assistants all read one file, so a price can't disagree with itself between the call and the invoice. That's a property rather than a measurement, and it's the one I most wanted.\n\nThe operational proxy is that a real deal ran end to end through it: discovery, priced offer, signed contract, deposit, build, review, acceptance, live site on a subscription. When a client signs server-side, the session picks that up over realtime and advances itself, and the guards catch the illegal jumps before someone confirms one by accident.\n\nHuman review is the rest of it. I ran the calls with the stage scripts in front of me, and the parts that made me improvise are the parts I rewrote.\n\nThe most useful eval was negative and it wasn't about the code. Deals stalled before the build stage, not after. The machine was never the constraint.",
    limitations:
      "The engine outran the demand for it. I built a fast, repeatable path from brief to live and then didn't put a queue in front of it. The Meta ad structure across six markets, audience tiers and creative variants, is fully built and fully paused, so nothing is feeding the front of the machine. That's the real limitation of the project and it isn't a technical one.\n\nTest coverage is thin to the point of embarrassing. Vitest and Playwright are wired up and the suite is two files, one of which is a translation-coverage check. The pricing math across seven currencies and the stage guards are exactly what deserves tests, and instead they're checked by me clicking through.\n\nThe jobs that keep those two shared documents current failed in two quiet ways. One reported success every day for twelve days while writing nothing. The other ran fine but wrote its output into an old copy of the vault, so the canonical doc sat stale while the task log stayed green. I found both in a weekly review, not from an alert.\n\nDeployment has a manual seam. Edge functions only deploy through the host's own pipeline, so a git push isn't enough and I have to ask for a redeploy. Forgetting means the live version quietly runs old email templates.\n\nAnd the pipeline is Polish-only and written for one staffing model. Nobody else's agency could pick it up as is.\n\nWhat I'd do differently: build the demand side before the delivery side, and put a test around the price table before adding the fifth market.",
    results:
      "Nine niche packs are live in the configurator, each carrying its pages, default blocks, local booking backend, build-time estimate, discovery questions and objection answers. Six markets are configured with explicit prices and their own VAT and jurisdiction text; four more are built and hidden rather than launched, so opening one is a config change.\n\nA brief is now a configuration. Discovery, priced offer at the table, contract signed electronically, deposit, build from a pack, review, acceptance, subscription. Every transition writes an event, so I can see where a deal is instead of asking.\n\nOne client site is live and running on the subscription, delivered through that path, with a second deal mid-close. The delivery promise the system is priced around, a first draft in 14 working days, is something I can say on a call now instead of hope for.\n\nWhat didn't change is the number of clients. The machine is faster than the funnel that feeds it, and that gap is mine, not the machine's.",
    principle:
      "Productizing delivery is the half you can finish alone, so it's the half you finish first if nobody stops you. I did, and I got exactly what I built: a fast, repeatable path from brief to live, with almost nothing queued in front of it.\n\nNext time I want evidence that the process I'm about to automate is the thing actually slowing me down.",
    stack: ["React/Vite", "TypeScript", "Supabase (Lovable Cloud)", "Postgres + pgmq"],
  },
  {
    slug: "field-pricing-pwa",
    title: "A pricing calculator reps actually open at the counter",
    resultsPreview:
      "Custom-print pricing used to mean a spreadsheet on someone's laptop and a promise to email a number later. Now it's a PWA the reps open on their own phones, with the supplier's price list wired in and checked line by line against the source documents. Behind the quote sits an order pipeline where only an admin can move a status, and every transition gets written into the order row.",
    problem:
      'Quoting a print job meant opening a spreadsheet, finding the right tier, doing the VAT and margin arithmetic by hand, converting to Icelandic króna, and then telling the customer you\'d email it later. By the time the email went out, the moment had passed.\n\nWorse, nobody could say with confidence that the numbers in that spreadsheet still matched what the supplier actually charged. Prices came in over email, in offers and attachments, over months. Some of them had been superseded. At one point I was sure the lid prices had drifted, because I was comparing against figures from an older email thread.\n\nAnd once an order existed, its state lived wherever someone put it. Who moved it to "shipped"? When? Nobody had written it down, so the honest answer was that it depended who you asked.',
    context:
      "This is an internal tool for MAS Group's sales side, mostly the eco cup and print business. The buyers are Icelandic cafés, hotels and restaurants; the goods are manufactured in Poland and shipped to Iceland, so a price has to cross two tax regimes and a currency before it means anything to the customer. The same shell also carries a few unrelated price lists the reps need in the field, for tyres, wipers and workshop chemicals.\n\nThree constraints shaped it. The people using it are salespeople, not engineers, and they use it standing up on their own Android phones, sometimes in front of the customer. The pricing is the product, so a wrong number isn't a cosmetic bug, it's a quote you have to walk back. And the app deploys on push to main, which means a syntax error in the wrong file takes the live app down while someone is trying to quote a job.\n\nI was the only person on it, doing this alongside running the business.",
    myRole:
      "I built all of it. The first version I scaffolded fast in Lovable to get a cart and an orders table in front of the reps within days. Everything after that I did in a normal repo: the Postgres schema and migrations, the row-level security, the status-change trigger, the commission linkage, the PWA setup, and the commit guards. Every commit in the repo is mine. No other developers, no contractors.\n\nThe price audit is also mine. I went through the supplier's spreadsheet and quote emails and checked the calculator's catalogue against them line by line, then wrote the result into the repo, including the things I couldn't source.\n\nThe one thing I want to be exact about: the embedded calculator apps came out of that first fast phase and I kept them rather than rewriting them. That was a decision, and it cost me something later.",
    decisions: [
      {
        decision:
          "Keep the calculators as self-contained HTML apps embedded in the shell, talking to it over a postMessage bridge, instead of porting them into React components.",
        why: "They already priced correctly. A rewrite touches every number in the catalogue, and the failure mode of a rewrite isn't a crash, it's a subtly different price that nobody notices until a customer has it. The bridge let the shell own the parts that actually needed to be shared: auth, cart, orders, currency.",
        rejected:
          "Port each calculator into typed React components so the pricing lives in normal source files under lint and typecheck.",
        tradeoff:
          "The pricing data ended up base64-encoded inside an HTML file. It's invisible to the linter, to the type checker, and to a git diff. That blind spot is real and I had to build custom tooling to cover it, which is a cost I chose rather than one I avoided.",
      },
      {
        decision:
          "Gate commits on a golden snapshot of the cup calculator's prices, its markup expression, and its currency constants.",
        why: "A change that breaks the build announces itself. A change that quietly moves a price does not. The script decodes the calculator out of the HTML blob, pulls the five catalogue objects plus the markup expression, and counts the hardcoded FX constants, then compares all of it against a stored snapshot. Any drift blocks the commit until I explicitly re-bless it.",
        rejected: "Unit tests over the pricing functions, or just being careful in review.",
        tradeoff:
          "The snapshot proves nothing about whether a price is correct, only that it didn't change while I wasn't looking. It also only covers the cup calculator; the other embedded price lists have no snapshot behind them. And every deliberate price change now needs an extra step. That friction is the point, but it is friction.",
      },
      {
        decision:
          "Enforce order status changes in the database with a trigger, not in the UI, and append every transition to a JSONB history column.",
        why: "Reps must not be able to move an order forward, and the audit trail has to survive a change made outside the app. A BEFORE UPDATE trigger raises if a non-admin touches the status, and writes from, to, timestamp and user into the history on every legal move.",
        rejected: "Hiding the status dropdown from non-admins and trusting the UI.",
        tradeoff:
          "A blocked change surfaces as a raised Postgres exception the frontend has to catch and translate into something a salesperson understands. And the stages are an enum, so changing the pipeline is a migration. I've already paid that twice: adding an on-hold state and a return state was its own migration months later.",
      },
      {
        decision:
          "Verify every SKU against the supplier's own documents before changing anything, and refuse to add products where I only had a partial price.",
        why: "The supplier sells a 20oz rPET cup we could resell, but I had exactly one price point for it and the pricing is tiered by carton volume. Filling in the missing tiers by interpolation would have produced a plausible number that was wrong, and the rep would have quoted it in good faith.",
        rejected:
          "Add the missing products with estimated tiers and correct them later, or interpolate from the tiers I did have.",
        tradeoff:
          "The calculator is knowingly incomplete. There are products the supplier sells that a rep cannot quote in the app, and they have to ask. I'd rather have a gap than a confident wrong answer.",
      },
      {
        decision: "Ship it as an installable PWA rather than a native app or a plain mobile site.",
        why: "It goes on the reps' own phones, updates the moment I push, and needs no store, no review, no distribution. For an internal tool used by a handful of people, that's the whole argument.",
        rejected: "A native Android app, or just leaving it as a website they bookmark.",
        tradeoff:
          "Install reliability on Android turned out to be fragile. With no id in the manifest, Chrome falls back to the start URL to identify the installed app, and a periodic manifest re-fetch could re-id it, so the home-screen icon quietly disappeared. The fix was pinning id to the value that already matched the implicit identity, so existing installs weren't duplicated, and splitting the icons so Android gets a guaranteed non-maskable one alongside the maskable variant and builds a durable WebAPK instead of a shortcut it later cleans up.",
      },
    ],
    build:
      "The first version existed within days, because getting something into the reps' hands mattered more than getting the architecture right. Cart, orders table, login. Then partner CRM, commissions and an activity log the following week. That phase was deliberately cheap and deliberately shallow.\n\nThe second phase was the schema. I wrote the migration that turned a five-value status field into the pipeline the business actually runs: new, invoice issued, paid, accepted, in progress, picked, shipped to Iceland, cleared customs, collected, delivered, plus cancelled. The migration had to map the legacy values across without losing an order, so it renamed the old enum, moved the column through text, translated the three old statuses, and swapped the new type in. The status guard trigger and the commission linkage went in the same migration, because a pipeline without an owner for each transition is just a longer list of guesses.\n\nThen I stopped adding features and audited the prices. Every cup, lid, straw and stirrer in the calculator against the supplier's spreadsheet and quote emails, one line at a time, with the result written into the repo including the things I couldn't verify. That's when the suspected lid mismatch turned out to be me reading a stale email.\n\nThe safety net came out of that audit, not before it. Two scripts, both invoked by the hook through bun with no external dependencies, so a node_modules reinstall can't disarm them: one parses every staged source file and also decodes the calculator blobs in the HTML to catch the smart-quote breakage that would otherwise ship and take the live app down; the other is the price snapshot. A pre-commit hook runs both.\n\nOnly after that did I go back to adding products. Straws and ice spatulas, at prices I could point to a source for. Then a 16oz custom-print cup, then the PWA install work. Hardening first, features second, because the features were what kept breaking the thing.",
    evals:
      "There is no accuracy metric here and I'm not going to invent one. What I have is three kinds of check, and they're not equally strong.\n\nThe automated one is real: on every commit, the snapshot script decodes the calculator, pulls every SKU in its catalogue plus the markup expression and the currency constants, and fails the commit on any difference. Alongside it, the encoding guard parses the staged code and the decoded calculator blobs to catch a broken quote character before it reaches a build that deploys on push.\n\nThe second is behavioural, and it's how I check a change did what I intended. When I added the straws and the spatulas, I ran the calculator headless against a test basket and confirmed the total moved by exactly the amount the new prices implied, 4,144 ISK and 1,260 ISK, to the króna. That verifies my arithmetic, not the supplier's.\n\nThe third is human review, and it's the one that carried the pricing claim. I checked the catalogue against the supplier's own price list and offers. Every price I could tie to a source matched, and the gaps I found were missing products rather than wrong numbers. Two questions stayed open and I wrote them down instead of closing them: the rPET lid appears in the spreadsheet under a per-1000 heading but the code charges it per 800-unit carton, which is a small over- or under-charge I haven't resolved; and lids appear in two supplier documents with different numbers, where the calculator uses the newer, higher list without a decision recorded on which one governs a custom-print job.\n\nEverything else is an operational proxy. The reps use it. The clearest example of a bug that only shows up in real use was an auth token refresh flipping a loading flag: every time the tab regained focus the app collapsed to a spinner, remounted the calculator iframe, and wiped whatever the rep had half typed into it. Nothing about that is visible in a test.",
    limitations:
      "There's an unresolved pricing question sitting in the middle of it. The customer price applies Polish VAT, then the margin, then Icelandic VAT. On an export from Poland to Iceland the Polish VAT arguably should be zero, which would drop the customer-facing price by roughly a fifth while leaving the margin untouched. That's an accounting decision, not an engineering one, and until it's settled the app is charging on the cautious side. I've written it down rather than quietly picking an answer.\n\nCurrency handling is split, and it bothers me. The shell fetches the live ISK rate from the Polish national bank's public API and caches it for six hours; the calculator apps still convert with a rate hardcoded in the blob. Two sources of truth for the same conversion is exactly the kind of thing I'd flag in someone else's code.\n\nThe guards are narrower than they sound. The price snapshot only reads the first embedded calculator, so the other price lists in the shell aren't covered by it. And both guards live in a local pre-commit hook, not in the deploy pipeline, so nothing on the build side would catch a price change that arrived another way. The hook depends on a git config setting that resets on a reinstall; the install script puts it back, and it deliberately no-ops where there's no git work tree so it can't break a build, but that means it's a guard that can silently stop protecting you, which is the worst property a guard can have.\n\nKeeping the calculators as base64 blobs was the right call at the time and is now the main thing holding the project back. The catalogue belongs in the database or at minimum in a plain JSON file where a diff is readable. The snapshot guard is a workaround for a structural problem, and I know it.\n\nThe catalogue is also incomplete on purpose, as above. If I did it again I'd move the pricing data out of the blob before the second calculator went in, not after the app had half a dozen of them.",
    results:
      "Pricing a job went from a spreadsheet and a callback to a few taps on a phone the rep already carries. The reps use it in production and I keep iterating on it.\n\nThe order side changed shape more than the calculator did. An order is now in exactly one named stage at a time, only an admin can move it, and every move is stamped with who did it and when. Commissions attach to the order that generated them instead of being reconstructed at month end.\n\nThe part I didn't expect to matter most was the audit. Being able to say the prices in the app match the supplier's current list, name the two places where the source is still ambiguous, and point at the document for the rest, changed how much anyone had to hesitate before sending a quote. That came from a day of unglamorous checking rather than from anything I wrote in code.",
    principle:
      "The dangerous change is the one that quietly returns a different number.\n\nA build failure tells you it happened. A price that shifted during a refactor tells nobody, and it keeps being wrong every day until a customer or an accountant finds it. So the guards I needed weren't tests of whether the code runs. They were checks on whether the numbers moved without me deciding they should.\n\nMost of that work was boring. Reading a supplier spreadsheet next to a decoded blob, line by line, and writing down the two lines I still couldn't settle.",
    stack: ["TanStack Start", "React 19", "Supabase", "Postgres RLS", "PWA", "Cloudflare Workers"],
  },
  {
    slug: "fleet-manager-saas-replacement",
    title: "Replacing a rental SaaS, then auditing my own migration",
    resultsPreview:
      "The rental side ran on a paid SaaS with no export and no API we could reach, so I scraped the data out and built the replacement: one resource timeline for the whole fleet, client records, generated contracts with handover protocols, and alerts before insurance and inspection dates lapse. Then I audited my own migration and found it had silently dropped 32 of 82 calendar entries, five of them live blocks on vans the new app was showing as free. It went live on 1 July and has been the rental's daily tool since. That's about five weeks, not a season. The biggest thing it still doesn't do is track money.",
    problem:
      'Everything the rental knew lived inside a paid SaaS that wouldn\'t give it back. No export, and no API we could reach from outside the product. If we wanted our own booking history, the only route out was reading it off the screen.\n\nThe tool also split reservations and blocks into two separate entities, and the reservations list only showed one of them. So the honest answer to "how many bookings do we have" depended on which screen you were looking at. I thought we had 33 reservations. The calendar held 82 entries.\n\nAnd we were paying monthly for a lot of things we never touched, while missing the only thing that actually mattered day to day: seeing every vehicle as a parallel lane on one timeline, with reservations, blocks and service on the same axis.',
    context:
      "This is the rental arm of the small Icelandic group I run. About a dozen vehicles, roughly a hundred rentals a year, one person driving it daily with two or three others touching it in season. Camper and 4x4 rentals, mostly summer, so the peak is short.\n\nThree constraints decided the shape of the build. The fleet size means a resource view is the whole point; no free generic calendar shows a dozen vehicles as parallel lanes. The scale is tiny, so anything with queues, caches, microservices or a role system would be theatre. And the running cost had to be zero, because the tool exists to stop paying a subscription.\n\nThe data is real people's data. Names, phones, emails, national ID numbers, driver's licence numbers, prices. That set the bar for the access model, and it's where the build later failed its own audit.",
    myRole:
      "I designed and built it solo, working with Claude Code. The schema, the access model, the timeline, the contract generator and the migration are all mine, and so is the mistake in the migration.\n\nI also did the extraction: driving a browser against the old SaaS to pull the calendar, fleet, clients, reservations and a real contract template out of a product with no export.\n\nAnd I'm the support line. The person who runs the rental calls me when something looks wrong, so every rough edge comes back to me directly.",
    decisions: [
      {
        decision:
          "Put reservations, blocks and service in one `bookings` table with a `type` column, instead of three separate entities.",
        why: "The old tool's worst behaviour came from separating them. A block was invisible on the reservations list, so the number of bookings depended on which screen you asked. One table means one query feeds the whole timeline and nothing can hide from it. The overlap protection also covers all three types at once, for free.",
        rejected:
          "Three tables mirroring the SaaS. It's the tidier data model on paper, and it's what the product we were leaving actually did.",
        tradeoff:
          "Some columns are meaningless for a block and sit empty, and a block's client details live in a free-text notes field rather than a proper customer record. That cost me later during reconciliation, because matching on free text is fiddly. I'd make the same call again. One screen of truth was worth more than clean nullability.",
      },
      {
        decision:
          "Build it as a real code project on Next.js and Supabase rather than assembling it from a no-code tool or moving to another SaaS.",
        why: "The one feature we couldn't lose was the resource timeline, and none of the free generic options do it. Airtable filters per vehicle instead of showing lanes. A shared calendar gives you no structure, no status, no amounts. Another paid product just re-buys the lock-in we were escaping, which is why the migration had to be a scrape in the first place.",
        rejected:
          "Airtable as an interim bridge, a shared calendar with .ics feeds, another paid rental SaaS, a no-code builder, and a paid resource-calendar plugin.",
        tradeoff:
          "Maintenance is mine. There is no vendor to call in August when something breaks in the middle of the season, and I set up the repo, the deploys and the backups myself. Acceptable, because it's essentially one non-trivial screen and I own the data outright.",
      },
      {
        decision:
          "After an architecture audit, move every database call server-side behind a real session check, then lock row-level security back to authenticated only.",
        why: "The audit found five tables — customers, bookings, vehicles, contracts and settings — were readable and writable by the public anon key, with no login. The key ships in every page load by design, so the login page was cosmetic from the database's point of view. That was a live exposure of real customer PII on a system about to become someone's daily tool.",
        rejected:
          "Wiring real Supabase Auth so the browser authenticates properly. More moving parts for exactly one user, when the app already had a working session pattern. Also rejected: tightening the policies first and fixing the code after.",
        tradeoff:
          "Thirteen data functions had to move across a server boundary, which touched most of the data layer. Every read now costs an extra hop, irrelevant at this scale. The real constraint was that both halves had to ship atomically. Flipping the policies first would have taken the live app down instantly, mid-season, for the person depending on it.",
      },
      {
        decision:
          "Enforce no-double-booking with an exclusion constraint in Postgres, not just the check in the app.",
        why: "The app-level overlap check can lose a race between two people saving at once, and it was a soft warning you could click past. A double booking on a camper in July is a phone call I don't want to make. The constraint uses half-open date ranges, so a same-day turnaround (car back in the morning, out again in the afternoon) isn't treated as a conflict.",
        rejected:
          "Keeping the app-side check plus a confirmation dialog. That's what was already there. As far as I know nothing had slipped through it, but nothing stopped it either.",
        tradeoff:
          "The imported 2024 history contains a genuine overlap artefact from the migration — two backfilled bookings on the same vehicle in July 2024 — so adding the constraint over all rows would have failed. Rather than rewrite historical records to fit, I floored the constraint at 2026. The guarantee protects everything forward, and the archive stays as it actually was. That's a real hole in the invariant and I wrote it into the migration file as an operator warning so nobody discovers it by surprise.",
      },
      {
        decision:
          "Freeze each signed contract as a stored snapshot of its own text, rather than re-rendering it from the live template.",
        why: "I later rewrote the terms and conditions after researching how Icelandic rental firms and Icelandic law actually handle liability. If contracts rendered from the template, every previously signed document would have silently changed underneath the people who signed it. A signed contract has to be the thing that was signed.",
        rejected:
          "Rendering from the current template with a version number attached, which is less duplication and keeps one source of truth for the wording.",
        tradeoff:
          "Every contract stores its full text, so the same paragraphs are duplicated across rows, and fixing a typo doesn't reach old documents. When I replaced the terms I checked the documents already in the database — two signed, one sent — and confirmed they render from their stored text and were untouched.",
      },
    ],
    build:
      "The data model came first, because everything else is a view over it. One `bookings` table with a type column, plus vehicles, customers, contracts and a single settings row. Schema in migrations in the repo from day one rather than clicked into a dashboard and forgotten. There is no payments table; money was cut from scope on the first day and never came back. Then the timeline: vehicles as rows, days as columns, coloured bars for reservations, blocks and service, overlapping entries stacking into sub-rows. That single screen is the app.\n\nThe security work came before the features, in the order the audit dictated. The data layer moved server-side behind a session check, the service key stayed server-only, the browser lost its direct path to the database entirely, and only then did the row-level policies close. I verified with the public key against the live database before and after: real rows before, permission denied after, app still rendering.\n\nThen the reconciliation, which is the part I'd point at. A deterministic diff of the scraped CSV against the live database, matching on type and dates as a multiset so it survived the fleet split and the restored Polish diacritics. It found 32 entries in the source with no counterpart in the database. The backfill went in as a migration with external-ref-guarded inserts and id-scoped updates, so re-running it can't duplicate anything. I have not rebuilt the database from the migration chain to prove the whole thing replays from empty, and I doubt it does as written: the backfill inserts two overlapping 2024 rows that the initial migration's own overlap constraint would reject.\n\nSeason features came after that, in the order the person using it hit them: pickup and return times, the hard overlap guard, a dashboard tile for insurance and inspection dates expiring within 30 days, per-vehicle handover checklists, self-service booking links with a request queue. Contracts with automatic unique numbering, handover and return protocols carrying odometer readings, then e-signature. An invoicing screen came last and is the one piece I can't call live; see the limitations.\n\nThe quality pipeline went in on 18 July, seventeen days after the first commit and after most of the features. That ordering was wrong and I'd put it earlier next time.\n\nIt's a PWA because the people using it are standing next to a van with a phone, not sitting at a desk.",
    evals:
      "Three kinds of evidence, and I'd rank them by how much I trust them.\n\nThe reconciliation is the one real number. 82 rows in the source, 50 matched, 32 missing, 2 surplus in the database, and the arithmetic balances both ways. After the backfill, 82 of 82 reconcile with nothing missing, and the only surplus is a service entry I deliberately split across two physical vehicles. That's a verified claim. I was careful about what it doesn't prove, and wrote that down too: it verifies the CSV against the database, not the old SaaS against the CSV. Closing that last gap needs the SaaS itself.\n\nThe access model was checked adversarially rather than assumed. The audit didn't read the migration file, it queried the live policies and then hit the REST API with the same public key the browser ships. That's how it found the hole, and the file and the live database turned out to disagree. The negative control mattered as much as the finding: one table that was still scoped correctly refused the write, which proved the mechanism worked and the other five had simply been opened up to unblock development and never revisited.\n\nEverything else is weaker than I'd like, and writing this up made that worse rather than better. CI runs lint, typecheck, a build, a dependency audit and a Semgrep scan on every push and pull request. There is also a Playwright smoke test in the repo that asserts the app boots with a clean console — but the CI job that runs it is gated on a Playwright config the repo doesn't have, and Playwright isn't even a dependency, so it has never run. I found that while checking this case study, not while building. Which leaves the honest eval: one person has been running the rental on it since 1 July and calls me when something's off. That catches real problems. It's slow, it's human, and five weeks is not a season.",
    limitations:
      "The migration is the thing I got wrong. I did the first pass by eye, in two visual sweeps, and it dropped 32 of 82 entries without erroring. The source CSV was complete and valid the whole time. Five of the missing entries were future blocks, so vans showed as free in the new app on dates that were genuinely booked, and nobody would have known until two customers turned up for the same camper. I only caught it because I went back and reconciled programmatically instead of trusting that it looked right. That check should have been part of the migration, not an audit three days later.\n\nMoney is the largest gap. The terms define a 30% reservation fee, the remaining 70% seven days before pickup, and the security deposit returned seven days after return. The app tracks none of that. Nobody can see who hasn't paid or whose deposit is due back, so it still lives outside the system. There's an invoicing screen, but its table migration was flagged as not yet applied to production and I have no record of applying it, so I won't claim invoicing is in use.\n\nThere's no error monitoring in production. The audit flagged it, the runbook has a line for Sentry, and it's still a placeholder — as is most of that runbook. If something 500s for the person using the app, I find out when she calls me.\n\nInsurance and inspection dates are typed in by hand. The alert works, but it's only as good as whoever last updated the field. The national vehicle registry lookup that would fill them automatically is the obvious fix, the access is already paid for, and it still isn't built.\n\nThere's one shared login and one linked Google account, so the app can't tell who did what. No per-user accounts, no change history. That's fine for one main user and gets worse with every extra pair of hands.\n\nThe contract terms are in Polish and English. Icelandic regulation wants rental terms available in Icelandic too, and that needs a proper legal translation rather than a machine one, so it's flagged as open rather than quietly shipped. Backup and point-in-time recovery settings are also still unverified, which is a two-minute check I keep not doing.",
    results:
      "The subscription is gone and the rental runs on the app: the timeline, client records, contracts with handover protocols and e-signature, expiry alerts, self-service booking requests. It runs on the free tiers of the host and the database, and the data sits in a Postgres we control with an export a query away.\n\nThe reservations-versus-blocks confusion is structurally gone. Every entry that occupies a vehicle for a date range is the same kind of row, on the same timeline, under the same overlap constraint. You can't lose a block anymore by looking at the wrong screen.\n\nThe result I'd put first is the 32 recovered entries, and specifically the five future blocks. That wasn't a feature. It was catching my own quiet failure before it turned into two customers standing in a car park in front of one van.",
    principle:
      "A migration isn't finished when the new screen looks right. It's finished when you can prove, row by row, that nothing was left behind, and the proof has to be mechanical, because your eyes will pass a screen that's missing a third of the data.\n\nSame goes for access rules. I read my own migration file and believed it; the live database said something different. Check the running system, not the artefact you think produced it. Writing this case study turned up one more instance of exactly that — a CI job I'd have told you was running.",
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres RLS", "Vercel", "PWA"],
  },
  {
    slug: "cold-outreach-lead-engine",
    title: "A cold-outreach engine that guards the sending domain",
    resultsPreview:
      "I built the outreach engine for my own print venture. It finds the companies, verifies every address, scores them by what they'd plausibly buy, then sends from one inbox on a throttled cadence. It ran on business days from 11 May to 19 June 2026 at five new companies a day, working a scored database of 811 Icelandic contacts, and surfaced a handful of real buying conversations. A geothermal spa asked for a sample and a full ISK price and booked a meeting. A fast-food franchise operator came back with a monthly case volume.\n\nNo deal closed while the engine was running, and I never measured inbox placement. What I can show is the operational record: bounces caught the same day, dead addresses never retried, and no recipient domain ever sent a fourth email.",
    problem:
      "The venture had a product to sell into Iceland and no pipeline. I was doing outreach the way everyone does it at the start. Open the browser, find a company, work out who buys, write the email, send it. It stops the first week something else gets busy.\n\nThe obvious fix is worse. Buy a list, load it into a sending tool, blast. Iceland is a small market, so you can burn the whole addressable list in a few weeks. And the domain you'd be blasting from is the same domain the business sends quotes and invoices from.\n\nSo I had two failure modes to avoid at once. A campaign that stalls because it needs me to have a free afternoon. And a campaign that runs beautifully for a week, then quietly stops landing and takes the company's mail down with it.\n\nThere was a third problem underneath both, and it turned out to be the expensive one. The address data is bad. Scraped firstname@company addresses on Icelandic domains bounce a lot, and at the small end of the market they bounce most of the time. Every bounce is a small deposit into exactly the reputation account I was trying to protect.",
    context:
      "This was for my own venture, not a client. MAS Prints brokers print work in Iceland, and the thing being sold here was compostable printed cups.\n\nThe market set the constraints. Iceland is small, and the companies that buy cups in volume are a short list. You can't A/B your way through that. Each company is one shot, and there's no larger pool sitting behind it.\n\nOne sending identity, on the business domain. No burner domain to fall back on if it went bad. The emails go out in plain English written for non-native readers, with an Icelandic greeting and sign-off. And the context that actually decides who to write to, who owns which chain and which office does the buying, isn't in any database. It's on the companies' own websites, if it's anywhere.\n\nI ran it alone, alongside everything else. Anything that needed me at a keyboard at 10am on a Tuesday was going to fail on the first busy week.",
    myRole:
      "Sole builder. No devs on this one.\n\nI designed the pipeline and wrote it. The discovery and scraping pass, the verification and the confidence label on every address, the scoring model that puts each company in a tier, and the send rules: per-domain caps, daily volume, tier rotation, business-hours and public-holiday gating. The queue schema and the three-touch sequence are mine.\n\nThe daily run is a scheduled agent task I authored and kept rewriting. It reads the queue, picks the day's companies, researches one specific hook per email, writes them, sends, checks for bounces, and writes back a log of what it did and why. I wrote the rules it follows and revised them roughly weekly as it found new ways to be wrong.\n\nEvery reply was mine. The engine never answered anybody. It flagged the reply and I wrote back personally, which is also how I found out what it was getting wrong.",
    decisions: [
      {
        decision:
          "Every address gets found on a real page and carries an honest confidence label: SCRAPED, SMTP_VALID, CATCH_ALL, DNS_VERIFIED, VERIFIED, down to CONSTRUCTED. Nothing enters the queue as an unlabelled guess.",
        why: "Bounces are the cheapest way to wreck a sending domain, and a guessed firstname@company address is a bounce with extra steps. Labelling the confidence also changes behaviour downstream. The engine can prefer a verified general inbox over a scraped person address instead of treating them as equal.",
        rejected:
          "Constructing addresses from patterns, or buying a list. Both give you a much bigger database in an afternoon, and the pattern guesses do work often enough to be tempting.",
        tradeoff:
          "The honest database is smaller than the market. Of the 811 rows that made it in, 427 came off a page I could actually read, and only 89 had a named decision-maker behind them. Four addresses were constructed, and they carry that label so nothing downstream treats them as real. The verification pass is also slow: Icelandic mail servers block cloud sandbox IPs, so the SMTP check has to run locally, and roughly 95 rows were still sitting on DNS-only evidence when sending started.",
      },
      {
        decision:
          "A hard ceiling of three emails per recipient domain, ever, on top of five new companies a day and no more than two from the same tier in one batch.",
        why: "The failure I was protecting against isn't one bad email. It's volume concentrated on a few recipient domains. A chain with a dozen locations can look like a dozen prospects and still be one mail server forming one opinion about me. Cap the domain and that can't happen, no matter how the queue is sorted.",
        rejected:
          "Per-contact sequences with no domain-level ceiling, which is what most sending tools do by default. It's simpler and it sends far more mail.",
        tradeoff:
          "This locked me out of real leads. One hotel group had around a dozen rows in the queue all sitting behind one shared address, and once that domain hit three, every one of them was permanently unreachable through the engine. Same for a supermarket group's procurement arm and a hospital. I still think it's the right cap, but the cost was concrete.",
      },
      {
        decision:
          "Score companies by what they'd plausibly consume rather than by how easy they are to reach, and work the queue strictly top-down. The tier also decides the ask. The top of the list gets an offer to visit in person, everyone else gets a link.",
        why: "A wholesaler supplying the whole hospitality sector and a single café are one row each in a spreadsheet and nothing alike in value. Sorting by estimated volume meant the first weeks of sending went at the companies where one yes covers hundreds of locations.",
        rejected:
          "Working the list flat, or sorting by contact quality so the easy-to-reach companies go first. That produces a much better-looking bounce rate and a much worse pipeline.",
        tradeoff:
          "The top tiers exhaust fast. The first priority list was gone in about three weeks. I imported the rest of the database, and the new top tiers were contacted, capped or replied within another week. After that the daily batch was drawing from small businesses where the scraped person address bounced nearly every time. The engine got slower per useful conversation the longer it ran, by design.",
      },
      {
        decision:
          "Drop the human approval gate. Drafts stopped waiting in the vault for me to say send, and the daily run went out on its own inside business hours.",
        why: "The gate was the thing killing the campaign. Drafts piled up unapproved, the queue stalled for days at a time, and a cadence that only runs when I have a spare morning isn't a cadence. The whole point was outreach that survives a busy week.",
        rejected:
          "Keeping the review step and just being more disciplined about it. I'd already proved I wasn't.",
        tradeoff:
          "This is the decision I'm least comfortable defending. With the gate gone, nothing checks the copy before it reaches a real company. One batch went out with a line saying we supply compostable cups to Icelandic universities, which I couldn't back. That's exactly the sort of thing a human would have caught in five seconds. The automated review found it afterwards, which is too late.",
      },
      {
        decision:
          "Give the run a self-review step. After sending, it audits its own emails against the writing rules and proposes new rules when it finds a violation.",
        why: "The copy rules aren't static. Every batch taught me something. A hook that drew a conclusion on the reader's behalf. A call to action that promised something we only offer after a reply. Writing those lessons back into the rules is the only way the next batch is better instead of differently bad.",
        rejected:
          "A fixed template with variable slots. Consistent and safe, and it produces the kind of email that reads as bulk from the first line. In a market where the buyers talk to each other, that's expensive.",
        tradeoff:
          "It audits after the send, so every violation it catches is already in someone's inbox. And the rule set grows. What started as a page of tone guidance became a long list of specific bans, which is more surface for a run to misread. I chose after-the-fact learning over never learning at all.",
      },
    ],
    build:
      "Address quality came first, because everything downstream inherits it. Discovery by category, starting at wholesalers and chain head offices and working down to individual cafés. Then a scraping pass over the companies' own sites. Then verification and a confidence label on every address. Only after that did anything get scored. A queue built on guessed addresses would have poisoned the domain before a single guard rail mattered.\n\nThe finished database held 811 contacts, 89 of them named decision-makers. It went into a queue I could read with my own eyes. A plain markdown table in my notes vault, one row per company, with the tier, both addresses, and a running status. Every touch appends to it: sent, bounced, replied, cancelled, capped. That choice was about trust more than tooling. When the engine claimed it had contacted someone, I wanted to be able to check by looking.\n\nThe guards went in before the sequence that would use them. Three emails per recipient domain across all history, five new companies a day, no more than two from one tier per batch, business hours only, and a skip list for Icelandic public holidays. Double-send protection ended up as three layers that all have to pass: a permanent block on any address flagged BOUNCED plus the domain cap, the status in the queue row, and the draft files on disk as ground truth. That third layer exists because of one specific discovery. The Gmail integration I was using runs over IMAP and never returns anything for the Sent folder, so the mailbox can't tell you what you already sent. The drafts can.\n\nOn top of that, a three-touch sequence. A first email to the named person. A separate approach to the company's general inbox, written from a different angle. And one follow-up four days later, capped at sixty words, which is never a second pitch.\n\nBounce handling is wired straight into the send loop. Every batch gets checked for hard failures immediately after sending, plus a sweep back over the previous week to catch the delayed ones. A bounce marks that address dead so it's never retried, and the email is resent once to a general inbox found on the company's own contact page. On 11 June all five person addresses bounced and all five general inboxes carried the batch.\n\nReply detection went in last. That was the mistake, and I'll come back to it.\n\nThe recurring-job side of my setup later started moving onto a self-hosted n8n instance under pm2, so mechanical work would stop costing model tokens. This campaign's task never made that migration. I archived it in July and kept the rules as a written playbook instead.",
    evals:
      "I'll be straight about what's measured and what isn't. There is no deliverability number here. I never ran a seed-inbox test and I never pulled provider postmaster data, so any claim about inbox placement would be me inferring from replies, and replies aren't placement.\n\nWhat I do have is an operational record, and it's a detailed one. Every send is checked for a hard failure the same day, with a retrospective sweep behind it for delayed bounces. Every bounce is either resolved to a working inbox or written down as having no alternative, which is what happened with one coffee brand whose person address and general inbox were both dead. Every domain's remaining allowance is tracked. So when I say the domain stayed healthy, what I mean precisely is this: bounces were caught and never repeated against a dead address, no recipient domain ever received a fourth email, and mail was still being delivered and answered in the last week of sending. Three new human replies came in off the sends from 16 June. That's a proxy, not a metric.\n\nThe copy got human review, which is the only honest way to evaluate cold email. I read every reply myself and answered it myself, so I saw directly what landed and what read as bulk. The automated self-review is a second pass against the written rules, and it did catch real problems. A hook that told a company what to conclude about its own brand. The university client claim I couldn't back. Em-dashes the rules banned. It caught all of them after the emails were sent.\n\nThe eval I care most about is negative, and it's the one I failed. The system must never send a second email to a company that has already said no. It did. An electronics retailer declined on 14 May, my reply detection didn't see it, and two more emails went out to them over the following week. That's the clearest signal in the whole project, and it isn't a flattering one.",
    limitations:
      "Reply detection was the weakest part of this build and it broke in three different ways. Date-filtered mailbox queries silently returned nothing while the replies sat right there in the inbox, so a run would report a clean sweep and be wrong. A reply came back from a colleague of the person I'd contacted, at the same company, and didn't match the address the check was keyed on. Another came from a completely different domain than the one I'd mailed. Each one was found by hand, days late. One warm lead asking for a physical sample and a price sat unanswered for twelve days because of it.\n\nKeeping the queue as a markdown table was right for trust and wrong for everything else. It grew to 930 lines, the status column ended up holding several events joined into one cell, and a later batch of imports added columns that pushed the queued dates out of the position the parser looked in. A run misread it, reported nothing due, and missed an eight-email follow-up backlog. That belongs in a database with real columns, and I'd move it there first if I picked this up again.\n\nThe scraped person addresses were a bad bet at the small end of the market. On several days four or five of the five new person addresses bounced on the first send while the general inbox took the mail without complaint. The verified general inbox was doing the actual work the whole time, and I should have sent there first for anything below the top tiers instead of spending the first touch on a dead address.\n\nThe scheduling was softer than it looks on paper too. One run started inside business hours, spent too long parsing a 140 KB queue, and sent at 18:54. I logged the deviation rather than pretend the window held.\n\nAnd the honest headline: no deal closed while the engine was running. It produced qualified conversations and a booked meeting. Turning those into revenue was a manual sales job, and it stayed manual.\n\nWhat I'd change, in order: reply detection built before the first send, not after; the queue in Postgres; and a real deliverability read before scaling volume rather than an inference from bounce logs.",
    results:
      "It sent on business days from 11 May to 19 June 2026, five new companies a day, from one inbox, with no burner domains and no purchased lists. It did not run cleanly the whole way. The first priority list ran dry after about three weeks and the campaign sat idle for five business days until I imported the rest of the database, then cleared the gap with a fifteen-email catch-up batch.\n\nIt surfaced a handful of genuine buying conversations. A geothermal spa asked for a physical sample and a full ISK price including tax and shipping, and booked a meeting, which they later moved. A national fast-food franchise operator came back with a monthly case volume and asked for pricing. A gym asked for a quote for its coffee and smoothie counters. It also produced clean declines, which I've come to value more than I expected. A company that says it uses reusable glasses closes a row instead of leaving it open forever.\n\nThe sending inbox kept delivering. No provider block appears anywhere in the run log. The failures that are in there are recipient-side: bad addresses, one recipient mail server timing out, one general inbox that turned out to be a no-reply.\n\nIn June I turned the daily sends off deliberately. The high-value tiers were exhausted or domain-capped, the batches were drawing from small businesses with unreliable addresses, and the live work had moved from sending to answering. I archived the task in July. What survived is the playbook: the protection layers, the bounce and out-of-office handling, the reply detection and the follow-up logic, distilled into a document I can point at a different product and a different market. That's the part I'd call the asset. The cups campaign was one application of it.",
    principle:
      "The parts of this system I'd keep are the parts that say no. The per-domain cap, the dead-address block, the tier limit, the holiday skip. None of them send an email. Every one of them stops one.\n\nLeads aren't the scarce thing in a market this small. Second chances are, and there's no second domain to move to when the first one stops delivering. So the brakes have to exist before the engine does.\n\nI got that order right for sending and wrong for listening. Reply detection was the last thing I built, and it's the one that let a company that had already told me no receive two more emails.",
    stack: [
      "Python",
      "Residential/SERP scraping proxy with web-unlocker",
      "Email verification",
      "Scheduled task runner",
      "n8n",
    ],
  },
  {
    slug: "ai-ad-creative-trust-pipeline",
    title: "Why my AI ad creatives stopped looking fake",
    resultsPreview:
      "My first AI ad creatives looked like AI, and re-rolling the prompt never fixed it. What fixed it was a research step in front of the image model: a brand brief pulled from the live site, a ranked list of what the buyer is actually afraid of, and a deliberate decision about what that specific audience reads as credible. The drafts came out usable after that, and the same procedure produced creative sets for three of my own ventures in Icelandic, Polish and English. What I can't give you is performance data.",
    problem:
      "The first batch I generated looked like AI. Skin too smooth, light too even, somebody smiling into a camera nobody was holding. Nothing was technically broken about the images. They just didn't read as real, and an ad that reads as fake tells the reader the business behind it isn't real either.\n\nSo I re-rolled. New prompt, new seed, sometimes a different model. The pictures got prettier. They didn't get more believable.\n\nThen I noticed I had decided nothing before typing the prompt. Not who the ad was for, not what they were worried about, not what a person like that reads as honest. I was handing the model an empty brief and then blaming it for filling the gap with stock photography.\n\nThat's a brief problem. Asking the model again doesn't fix a brief problem.",
    context:
      "This was for my own ventures, not a client I could invoice for a photographer. A handyman service in Reykjavík, a print venture selling branded cups to Icelandic cafés, and a web agency selling to Polish tradespeople in Norway and the other Nordic markets. Between them, ads in Icelandic, Polish and English.\n\nNo design budget and no photo library, so every image had to be generated. Generations cost money, which rules out brute force. And the buyers on the other end are small-business owners and renters who see a lot of ads and have gotten good at spotting the ones that aren't real.\n\nThe model has hard edges too. It renders two blocks of text reliably and starts merging or duplicating past that. Icelandic has to stay at a couple of words per text block or it duplicates. And it can't reproduce a company logo cleanly, which matters when every ad needs one.",
    myRole:
      "I built all of it. The written procedure the pipeline runs from, the Python that calls the image API, the audience and trust-profile method, the copy rubric, the QC checklist, the lessons file. No contractors, no designer.\n\nI'm also the last gate. Every generated image gets rated by me, ship or fix or kill, and when I kill one I write down why in a form the next run can use. That part is deliberately not automated.\n\nWhat I didn't build is the image model or the ad platform. I built the process around them. For one multi-market set the production later moved mostly out of generation and into an editable layered design, and there I was laying out and cloning per market rather than writing prompts.",
    decisions: [
      {
        decision:
          "Put a fixed research step in front of generation. Nothing gets prompted until there's a brand brief pulled from the live site, a customer profile with ranked pain points, and a named visual trust profile.",
        why: "My first ads failed for a reason no prompt rewrite touches. I hadn't decided who the ad was for or what that person reads as credible, so the model filled the gap with its defaults, and its defaults are stock photography. Deciding those things first is what turns a vague prompt into a specific one. The brand colours come out of the live CSS as exact hex values rather than my memory of roughly what colour the site is. Close-enough colour is one of the things that makes an ad look like it came from somewhere else.",
        rejected:
          "Keep re-rolling the prompt against the model until something looks right. That's the obvious path, and it's what I did first.",
        tradeoff:
          "Real research time before a single image exists. For a throwaway graphic that's absurd overhead and I skip the whole thing. The cost only earns its place when the creative is going in front of a paying audience.",
      },
      {
        decision:
          "Treat photography style as a decision keyed to the audience, with five named profiles and their explicit trust killers, chosen before any prompt gets written.",
        why: "The style that makes a B2B buyer trust you makes a local B2C buyer suspicious. Clean studio light reads as competence to someone signing a supplier contract and reads as expensive and impersonal to a renter deciding who to let into their flat. So the profile gets picked on purpose, and then it constrains every word of the prompt.",
        rejected:
          "One house style for everything, tuned to look as good as it can. Simpler to run, and the output looks more consistent side by side.",
        tradeoff:
          "For local-services work the pipeline deliberately produces a worse photograph. Imperfect framing, real clutter, harsh overhead light, nobody looking at the lens. Those images look weak next to a glossy one. I still have to stop myself tidying them up.",
      },
      {
        decision:
          "Score the copy against a fixed rubric before generating anything, and lead with the reader's problem rather than the offer.",
        why: "The image is downstream of the message. If the headline is a benefit line any competitor could have written, no amount of photorealism rescues it. Scoring forces one named pain, one trigger and one action per ad, and it stops me shipping the first line that sounded fine. On the Norway set the three pain and loss-framed hooks scored 26, 27 and 28 out of 35 against 21 for the offer-led one, and the offer-led one was rejected.",
        rejected:
          "Write a headline that reads well and go straight to generation. Faster, and it's how my early ads worked.",
        tradeoff:
          "The rubric is mine and I'm the one applying it. It buys consistency and a floor under the bad days. It does not buy market truth. A high score is my own opinion, written down carefully. It isn't a click.",
      },
      {
        decision:
          "Keep a person as the final selection gate, and turn every rejection into a written rule in a lessons file that the next run reads before it writes a prompt.",
        why: "Photoreal generation fails in ways that are obvious to a human and awkward to specify up front. A colour band that came out as a gradient instead of a solid. A caption the model duplicated. Quote marks I put around the text in the prompt that ended up printed on the image. Killing the image is easy. The reason is the part worth keeping, and it's worth nothing sitting in my head, so it goes in the file as a prompt rule with its trigger and its fix.",
        rejected:
          "Have a model score and select its own output. Tempting, because it would take me out of the loop entirely.",
        tradeoff:
          "It doesn't scale past me, and the file encodes my taste including wherever my taste is wrong. Every future run inherits that. I took the trade because the failures I care about are the ones a model doesn't flag in its own work.",
      },
    ],
    build:
      "The first thing I shipped wasn't an image. It was the order of operations, because the order is what fixes the output. Each step constrains the next one. You can't choose a photography style before you know who's buying, and you can't write a usable prompt before you've chosen the style. Skipping straight to the prompt is what produced the fake-looking batch.\n\nSo a run starts on the client's live site. Brand name, offer, tone, the actual call to action, and the exact hex values pulled from the rendered CSS rather than guessed from a screenshot. Then the customer profile: who they are, what's happening in their life right now that makes them need this, their pain points ranked by intensity, and the objections that stop them clicking. Then the visual trust profile, a short written brief naming the photography style, the trust signals to include and the trust killers to avoid.\n\nCopy comes next, and only then the creative format. One pain, one emotional trigger, one action per ad. The format decides the composition before the prompt exists, so I know whether I'm generating a hero shot with a solid colour band, a side-by-side comparison, a bare number on a flat background, or a feed-native photo with no text on it at all. Generation runs at the aspect ratio the placement wants, with the critical text kept inside the safe area so the platform doesn't crop it.\n\nLogos are a separate step on purpose. The model won't reproduce one cleanly, so the ad gets generated without it and the logo goes on afterwards, either through an image edit or placed by hand at an exact pixel offset when it has to be right.\n\nThen the two steps that make it a pipeline instead of a session. A QC checklist covering text legibility at phone size, brand colour accuracy, safe zones and obvious generation artefacts. And the feedback loop: I rate each image, and every rejection is written into the lessons file as a rule with its trigger and its fix. The procedure says to read that file before writing a single prompt. Repeat work gets a saved brand system document, so the research step isn't repeated from scratch every time.",
    evals:
      "There's no click-through number here and I'm not going to invent one. What I have is one before-and-after I watched myself, one operational proxy, and a rubric I should be clear about.\n\nThe before-and-after is what convinced me. Same product, same me, prompting cold versus running the procedure. Cold, I was generating and throwing the results away. Through the pipeline the drafts came out usable. That's my own judgement of usable, applied to both sides, and the gap wasn't subtle. I never counted the generations on either side, so I can't give you a ratio.\n\nThe operational proxy is the lessons file. It only grows when something failed and I understood why, so the rules in it are evidence that specific failure modes got diagnosed rather than re-rolled around. Real entries: put the hex code immediately before the colour word, say the band is completely flat and opaque with no transparency and no gradient, don't wrap the on-image text in quote marks because they sometimes get printed literally, keep Icelandic to a couple of words per block. Polish diacritics turned out to render fine, which was worth writing down too. Each entry exists because an image came out wrong first. It's also a short file, and most of it came out of one session, so it's early evidence rather than a body of it.\n\nThe copy rubric is honest scoring, not market evidence. Seven dimensions out of thirty-five, applied by me, with a pass mark. On the Norway set the pain and loss-framed hooks scored 26 to 28 and the offer-led hook scored 21 and was rejected. That's a consistency mechanism and a written record of my reasoning. It isn't proof the audience agreed.\n\nThe one test anyone else can run is the self-explanatory check: cover the caption and see whether the picture still says what's wrong. A decorative phone mockup with a nice benefit headline fails it. A split showing the same tradesman without a website and with one passes it. That check killed a concept I thought looked good, and it's now a standing rule.\n\nWhat I can't claim is performance. Some of these creative sets were running on Meta when I last checked the ad account, and a per-country structure is built and paused. I've never run a funded head-to-head between pipeline creative and cold-prompted creative, so I have no spend-backed number.",
    limitations:
      "The honest ceiling is the one above. No performance data. I improved how the creative gets made and I never proved it made money.\n\nThe bigger miss is what happened after the creatives were finished. Making creative cheap didn't make me launch faster. It moved the queue. My own weekly system report flagged the same nine finished, undeployed creatives in ten consecutive reports, and a fully built per-country ad structure across six markets, with hot, warm and cold audience tiers, still sits mostly paused. The bottleneck was never generation. I solved the part I found interesting rather than the part that was blocking.\n\nWorse, my tracking of that backlog was wrong. When I finally checked the ad account live instead of trusting my notes, part of that set had been running for a while. So the report I built to catch stalled work was itself repeating a stale claim for weeks.\n\nThe output shape is wrong for variant work. A generated ad is a flat image, so changing one line of localised copy or a price means regenerating and hoping the rest survives. For a per-market set that was the wrong tool, and that production moved into an editable layered design where each element can be nudged independently and one master gets cloned per country. I'd reach for that earlier now, and keep generation for the photograph underneath.\n\nText rendering is still a hard limit. Two text blocks is the practical maximum and strings have to be short. When text really matters I generate without it and place it programmatically.\n\nIt doesn't do print. I tried compositing generated elements into print work and the results were web-grade, so I now have a standing rule for myself not to go down that path, and to get one visual reference up front instead.\n\nAnd the whole thing rests on my read of the audience. Pick the wrong trust profile and the pipeline will confidently produce a very consistent set of wrong-looking ads, faster than before. Nothing in it catches that except me.",
    results:
      "The pipeline exists as a written procedure and runs end to end. It has produced creative sets for three of my own ventures: a handyman service, a branded-cup campaign, and a web agency selling across Nordic markets and Poland. Three languages, with brand colours taken from the live site instead of approximated.\n\nThe change I feel is in the draft. Before, a session meant a pile of pretty images I wouldn't put my own name on. Now the drafts are usually something I'd run, and when one is wrong I can normally say which step upstream produced the wrong thing.\n\nSome of the cup-campaign creatives were live on Meta at the last check. The handyman set sits paused with the venture. The rest sat finished for weeks, which is the real result and not a flattering one. The constraint moved from whether I could produce a usable ad to whether I would launch it. Only the first of those was ever a technical problem.",
    principle:
      "A generative model answers whatever brief it can infer, and if you haven't decided anything, it decides for you. My first ads looked fake because the only instruction in them was make an ad, and the model's honest reading of that is stock photography. Once I made the calls it was making by default, the same model produced work I'd run.\n\nThe other half I learned slowly. Making the expensive step cheap doesn't move the thing that was actually stuck. It shows you where the real queue was.",
    stack: [
      "Python",
      "Generative image model (photoreal)",
      "Site scraping for brand context",
      "ICP + visual trust profile method",
      "Human art-direction selection gate",
      "Meta ads",
    ],
  },
  {
    slug: "photo-to-3d-site-pipeline",
    title: "A scroll-driven 3D starter, and the spec that makes it repeatable",
    resultsPreview:
      "Premium 3D used to start with a blank editor and an hour of hunting for library versions that work together. Now it starts from a written spec that names a verified-compatible version set and a definition of done, a starter built against that spec, and a one-command path from a product photo to an optimized GLB. It's a starter and a demo. No client site runs on it yet.",
    problem:
      "The first version of my 3D-site playbook produced a single HTML file with Three.js off a CDN, plus a list of AI image prompts. It demoed fine. You couldn't build it, version it, or hand it to anyone.\n\nThe prompts were the tell. A premium product page needs a 3D model of the actual product. What a client has is photographs. So the playbook skipped the hard part and generated pictures instead.\n\nAnd every request started the same way: which versions of three, fiber, drei and postprocessing work together this month. That hunt ate the front of every build, and what I learned didn't survive to the next one.",
    context:
      "This is for Reykjawwwik, the web agency I run. It's aimed at premium and luxury brands who've seen an Apple product page and want that feeling on their own site. Nobody has commissioned one yet, so that's a target audience, not a client list.\n\nThe constraints did most of the design work. I'm the only one building, so there's no 3D artist to hand a modelling brief to. The client has product photos, not assets. And these get shown on a laptop in a meeting room where the wifi is whatever it is, so fetching an HDRI or a web font at runtime is a good way to look unprepared in front of someone paying you.\n\nIt also has to work as a business. If the second build costs what the first one did, it's a hobby with extra steps.",
    myRole:
      "Solo. I wrote the build spec and the definition of done, the React Three Fiber scene, the Node script that turns a photograph into an optimized GLB, and the routing rule that decides which of three techniques a given brief gets.\n\nNo contractors, no 3D artist. The version set is mine, and so is the decision to leave the most photoreal technique specified but unbuilt.",
    decisions: [
      {
        decision:
          "Split premium 3D into three tiers with a routing rule written down up front: a scroll-scrubbed video, a React Three Fiber model site, or a Gaussian splat capture. Pick before writing code.",
        why: "The right technique depends on budget, what asset the client actually has, mobile weight and deadline, not on which one is most fun. If there's already good product video, scrubbing it on scroll is lighter and cheaper than anything I'd model. Splats look the most real and are the heaviest thing you can put on a phone. Writing the choice down means it gets argued once, on the brief, instead of discovered halfway through a build.",
        rejected:
          "Defaulting every premium request to the React Three Fiber path, because it's the one I'd built. Simpler to remember, and it would have been fine most of the time.",
        tradeoff:
          "Three techniques to stay current on instead of one, and a decision I have to make before any code exists. I also have to tell a client early which tier their budget and their assets actually buy.",
      },
      {
        decision:
          "Write the stack down once as a verified-compatible version set (vite 6, react 19, three 0.184, fiber 9, drei 10, postprocessing 3) with a binary definition of done: clean install, and npm run build exits 0.",
        why: "The React Three Fiber ecosystem moves fast and the pieces are coupled. Three, fiber, drei and postprocessing each expect a specific major of the others, and getting it wrong throws errors that look like your scene code is broken when it isn't. Naming a set I'd actually built against turns the worst recurring time sink into a lookup. The green build is the gate, not a nice-to-have.",
        rejected:
          "Re-deriving the working combination at the start of every build. That's what I had been doing, and it's what ate the first hours each time.",
        tradeoff:
          "The set names majors with caret ranges, not exact pins, so minor and patch drift is still possible and a bad minor can still break a fresh install. Exact pins would close that and cost me deliberate upgrade work instead. I haven't done it, so the guarantee is weaker than the word 'verified' suggests. The set also goes stale on its own schedule.",
      },
      {
        decision:
          "Light the scene procedurally and fetch nothing at runtime. Lightformers inside drei's Environment with no preset and no HDRI file, a system font stack, no external model.",
        why: "These get demoed in rooms where the network is a coin flip, and a hero that loads as a grey blob because an HDRI didn't arrive is a bad thirty seconds in front of a client. It also removes the heaviest asset from the page. Four hand-placed lights (three rects for key, fill and rim, plus a ring for the top bounce) and one directional light get close enough to a studio look for a single glass object.",
        rejected:
          "drei's Environment with a studio preset, or a real HDRI file. It's one line, it looks better out of the box, and it's what most examples do.",
        tradeoff:
          "I place and tune the lights by hand for every look, and it's less photoreal than a captured environment. For one object turning under bloom that ceiling is fine. For a scene full of reflective surfaces it wouldn't be.",
      },
      {
        decision:
          "Generate the 3D asset from a product photograph through an image-to-3D model, then optimize the mesh automatically in the same script.",
        why: "The client has a photo. Commissioning a model is weeks and real money, and it kills the deal before the site exists. Generation is cheap enough not to think about, roughly five cents a run on Tripo against about sixteen on the sharper-geometry alternative I'd otherwise reach for. And raw output is always too heavy to ship, so dedup, prune, weld and quantize run in the same command and print the before and after byte sizes. An optimization step you have to remember is one that gets skipped.",
        rejected:
          "Hiring a 3D modeller, or buying a stock model that's approximately the product. Both give better geometry. Neither survives a small client's budget or a two-week timeline.",
        tradeoff:
          "You get whatever topology and materials the model decides to give you. Nobody art-directed the mesh. That's fine for a hero object catching light and turning on scroll. It's the wrong tool the moment a client needs the shape to be exactly right.",
      },
      {
        decision:
          "Keep the generated model optional. The starter ships with a procedural glass mesh as the default hero.",
        why: "The scene has to run and build green with zero assets and zero API keys, on a fresh machine, before anyone touches the pipeline. So a new build starts working immediately, and the asset step is something you add when you have a photo worth adding. It also keeps a binary out of the starter repo.",
        rejected:
          "Making the generated GLB the default hero and committing one, so the starter looks like a real product page from the first run. It demos better.",
        tradeoff:
          "Swapping the real model in is a hand edit in App.jsx, documented in the README rather than driven by config. For a project whose whole point is that the next build is a repeat, that's the wrong side of the line, and it's not the only place I ended up on that side.",
      },
    ],
    build:
      "The spec came first, before any scene code, because version drift was what kept killing these builds. It names the version set, the file tree, the brand constants to swap, and a definition of done that can only pass or fail: clean install, build exits 0, no localStorage, no runtime network fetch. Then I built against my own spec to check it was buildable rather than aspirational.\n\nThe scene came next, since that's what decides whether the thing reads premium or reads like a WebGL tutorial. A glass icosahedron under drei's transmission material, procedural studio lighting, contact shadows underneath, bloom and vignette over the top. The scroll choreography couples the object's rotation, vertical position, scale and a little lateral drift to a single scroll offset across four pages, so the object travels and reveals instead of just spinning in place.\n\nGSAP is declared in package.json for DOM timelines and kinetic type. The starter never imports it. The object runs off drei's scroll state and the type effects are CSS, so that dependency is dead weight in the current build.\n\nThen four HTML sections layered over the canvas, on a system font stack so nothing gets fetched. The spec says the brand name, accent colour and background should sit as constants at the top of App.jsx. Only the accent colour actually does. The brand string is hardcoded in two places, and the background is hardcoded inline and duplicated as a CSS variable, so a rebrand is still a find-and-replace.\n\nThe generator script went last, on purpose. I wanted the scene running and building green with no external service in the loop before I let one in. It reads the key from a local env file with a small hand-rolled parser instead of a dependency, uploads the image, runs the image-to-3D model, then finds the GLB in the response. That last part is more defensive than it looks: it checks five known response shapes and then walks the whole object graph for anything that looks like a GLB URL, because I didn't want a provider renaming one field to break the pipeline. It downloads the raw model, optimizes it, and prints raw against optimized with the percentage saved. Every failure path exits with a message that says what to do next: missing argument, missing key, missing file, dead download.\n\nThe routing rule went into the skill file at the end, once the Tier 1 path was real.",
    evals:
      "This isn't a project with a metric, and I'm not going to invent one. What it has is a pass/fail gate and a few honest proxies.\n\nThe gate is the definition of done, and it's binary: a clean install and a green production build. That's the check that catches the failure this whole thing exists to prevent, because a version mismatch shows up there and nowhere else. I verified it when I built the starter and recorded it as known-good in the routing skill. But I can't point at a build log now, there's no CI running it, and nothing re-checks it when the ecosystem moves. It's a gate I passed once, not a gate that stays passed.\n\nThe offline requirement I check by reading the source rather than by measuring. No preset and no files on the Environment, no web font, no external model, no runtime fetch, no storage. Writing it as a rule instead of a preference is what makes it checkable that way. I haven't put it in front of a network-throttling harness.\n\nThe asset pipeline instruments itself: every run prints raw bytes against optimized bytes and the percentage saved. I'm not quoting a figure because I don't have a completed end-to-end run to quote from. There's no generated model sitting in the project. The script is written and its failure paths are handled, but \"working\" here means written and reviewed, not exercised against a real photo.\n\nThe visual half is my eye. Whether a glass object turning under bloom reads as premium or reads as a screensaver is a judgment call, and I made it by looking at it and adjusting. No automated visual regression, no perf budget, no device lab.",
    limitations:
      "It's a starter and a demo. The README says so, and I'll say it here too: I can't point at a live premium client site running on this engine, and nobody has commissioned one.\n\nThe mobile rules are written down and not implemented. The routing doc has hard requirements: reduced 3D under 768px, honour prefers-reduced-motion, a preloader with real progress. The starter has none of them. Its responsive handling is a single media query below 640px that nudges type and spacing, and the transmission material driving the glass look is expensive enough that a weak phone will feel it. That gap is the first thing I'd close, and it matters most because phones are the audience most likely to open the site.\n\nTier 2, the Gaussian splat path, is specified and unbuilt. The technique I'd reach for when a client wants real photorealism is the one where I'd still be starting from scratch. I made that call on purpose, since Tier 1 covers most briefs and splats are the heaviest thing you can put on a phone. It's still a hole in a three-tier system.\n\nThe reusability is thinner than the pitch. The spec describes a scene engine configured per project through a config object, and the starter doesn't have one. Only the accent colour is a constant; the brand name and background are hardcoded. Swapping a generated model into the scene is a hand edit. So a new client is currently a careful edit of one file, not a config swap, which contradicts what the project is for.\n\nGSAP is a declared dependency the starter never imports. Small, but it's exactly the kind of drift a verified stack is supposed to prevent, and I only noticed it reading back over the code.\n\nDistribution is awkward too. The authoritative version of the routing skill is a file on my machine, and the installed copy sits in a plugin cache I don't edit. There's no clean install path.",
    results:
      "What changed is where a premium 3D build starts. It used to start with a blank editor and a compatibility hunt, and it produced a CDN HTML file that couldn't be built, versioned or handed over. Now it starts with a routing decision, a written stack I've built against, and a project that installs and builds green before any client-specific code exists.\n\nThe 3D asset stopped being the thing that ends the conversation. A product photograph goes in and an optimized GLB comes out in one command, for roughly five cents a run. That's the difference between telling a small client their budget doesn't reach 3D and being able to try it.\n\nWhat's reusable is the boring part: the spec, the version set, the definition of done, and a scene whose lighting and scroll choreography I don't have to re-derive. The config layer that would make a new client a true swap isn't built.\n\nSo the result is narrower than a launch, and I'd rather state it at its real size. The next build starts from a decision and a green project instead of a blank editor. I haven't proved that yet on a second build or a paying client.",
    principle:
      "The reusable part of a flashy build is never the flashy part. I can rebuild a glass hero from memory. I couldn't rebuild a working dependency tree from memory, and that was what ate the front of every project.\n\nSo the artifact that made this repeatable wasn't the scene. It was a written spec: a version set I'd actually built against, and a definition of done that can only pass or fail. Install clean, build exits 0, fetch nothing at runtime. Three checks, and the most expensive recurring problem turns into a lookup instead of an afternoon.",
    stack: [
      "React Three Fiber",
      "three.js",
      "GSAP",
      "Vite",
      "AI image-to-3D (tripo3d)",
      "gltf-transform",
    ],
  },
  {
    slug: "sleipnir-glacier-tours-zero-to-one",
    title: "Building a glacier-tour operator from zero, then handing it off",
    resultsPreview:
      "No brand, no booking page, no sales channels. By the time I left it was a well-reviewed glacier-tour operator with more than 1,000 five-star guests over my time there. The call that made it possible was renting the booking and distribution stack instead of building it, so we could sell inside the season instead of after it. It kept running after I moved on, which was the goal.",
    problem:
      "First season, I'm on a glacier in crampons running a tour for guests who found us through someone else's brand. Same week, back at a laptop, I'm trying to work out why we had almost no bookings of our own.\n\nThat was the problem in one image. Starting a tour operation from zero, you don't get to build demand first and the operation second, or the other way round. There's no brand anyone trusts and no page anyone can buy on. No channel pushing customers at you. And no reviews to convert the few people who do find you.\n\nA guest searching for a glacier tour has a dozen operators to pick from and no reason to pick the one nobody has heard of. So you manufacture all of it at once, with the season running, while also delivering the tours that earn the reviews you don't have yet.",
    context:
      "Sleipnir Glacier Tours was a glacier-hiking operation in Iceland, run out of the operating company Jöklaferðir ehf in Hafnarfjörður. I co-built it from scratch and I was there from 2022 to 2024. Everything here is past tense on purpose.\n\nFour constraints set the shape of it. Runway was short, because every month without sales burns cash a new operator doesn't have. The trust deficit was total: in tours the buying decision is dominated by reviews, and we had none.\n\nResellers and online travel agencies move a large share of the volume in Icelandic tourism, and they don't notice a brand with no track record. And the team was thin, so whatever we built had to eventually run without me sitting in every seat at once: the sales desk, the marketing, the glacier.",
    myRole:
      "Co-founder and operator. My title at the operating company was project and marketing manager, and the honest description of the work is that I co-built the commercial side and the operation, then delivered part of it myself.\n\nThat meant the storefront and booking setup on Bokun, the pricing model, the reseller and partner deals, trade-fair representation, influencer deals, the paid acquisition on Meta and Google, the sales newsletters, and the tour products themselves. I also guided on the glacier, with real guests.\n\nI want the boundary clear. This was not a one-person show and it was not a software build, so nobody should read it as evidence of technical depth. What it evidences is taking something from nothing to a running business, and being personally accountable for both the pricing sheet and the rope.",
    decisions: [
      {
        decision:
          "Put the storefront and booking on an established booking platform, Bokun, instead of building our own.",
        why: "The binding constraint was runway, not control. We needed to be taking money and reconciling payments in weeks, not building availability logic, a cart and a channel manager over a quarter. The platform also plugged us into the reseller and OTA network, so it solved the storefront and the distribution problem in one move.",
        rejected:
          "A custom booking stack on our own domain. Full control, lower cut per transaction, and a direct relationship with every customer.",
        tradeoff:
          "We never owned the stack, and we paid platform and channel commission on every sale out of margin. We rented speed and distribution, and we paid for that on every booking for as long as it ran. For zero to one that was the right side of the trade. For a mature operation the math flips, and we never got to the point where it did.",
      },
      {
        decision:
          "Grow through resellers, partners and trade fairs rather than direct-to-consumer ads alone.",
        why: "A new brand cannot manufacture trust fast enough on its own. Resellers and OTAs lend you their audience and their credibility, and trade fairs put us in front of the agents who actually move volume. That borrowed distribution is the one thing a no-name brand can't buy with ad spend.",
        rejected:
          "A direct-only model running on our own Meta and Google ads. Cleaner margins, and you own the customer.",
        tradeoff:
          "Reseller volume comes at a commission and at one remove from the guest. You own less of the relationship and less of the money. We took thinner per-sale economics in exchange for reach and credibility we had no other way to get in season one.",
      },
      {
        decision:
          "Standardize the tour products and the pricing instead of quoting and running each trip bespoke.",
        why: "The thin-team constraint meant the business had to survive me not being there. Fixed products, clear price tiers and written operating detail are what let another guide run a departure and another person work the sales desk without the whole thing depending on what was in my head.",
        rejected:
          "Keeping tours bespoke and pricing negotiated case by case. That squeezes more out of the bookings that would have paid more, and it feels more premium.",
        tradeoff:
          "Productizing flattens the top end. We left money on the table on the trips that could have carried a higher price, and lost some of the hand-made feel. I traded peak revenue per departure for an operation that could outlast me. The handoff was what we were building toward.",
      },
      {
        decision:
          "Hold the paid acquisition until the booking page, the distribution and the first reviews existed.",
        why: "Ads into a zero-review brand convert badly, and the money is gone either way. Every well-run departure produced a review, and the reviews are what make the traffic worth paying for. Spending first would have burned the runway that was buying us time to earn them.",
        rejected:
          "Turning on Meta and Google from day one to buy early volume and learn the channel sooner.",
        tradeoff:
          "We were more dependent on partners and platforms in the early months than I wanted to be, and we started building our own audience and email list later than we should have. That cost shows up again in the limitations.",
      },
    ],
    build:
      "I built it in the order that took risk off the table fastest. The first thing that had to be true was that we could take money for a booking, so the Bokun storefront and a pricing model I could defend came before anything else. No point driving traffic at a funnel that can't close.\n\nOnce we could sell, I went after the distribution a new brand can't generate on its own. Reseller and partner deals, and OTA listings through the platform's channel network, so inventory we listed once showed up where buyers already were. Trade-fair representation ran alongside that as the partner-facing top of the funnel.\n\nOnly then did the paid acquisition go on. Meta and Google, plus a sales newsletter, and influencer deals for reach a cold brand can't buy with credibility attached.\n\nRunning underneath all of it were the tours themselves. Every departure that went well was both the product and the marketing asset, so I treated the guiding as part of the growth engine rather than something separate from it.\n\nThe last piece was the dull one. Standardizing the tour products and writing down how they run, so a departure didn't need me. The artifacts were unglamorous: a live booking page, a pricing sheet, signed reseller agreements, ad accounts and a newsletter list, and tours documented well enough that another guide could take them out.",
    evals:
      "There was no dashboard here worth the name, so I'll be plain about what I actually watched. One operational proxy, one hard cumulative number, and one final test.\n\nThe proxy was channel mix. How much of the volume arrived through resellers and OTAs rather than from someone I'd personally spoken to. That answered the first question, which was whether a stranger could find us, trust us and book with me nowhere in the loop. When that share started carrying real weight, the distribution bet had worked. I tracked it as a shape, not as an instrumented metric, and I won't dress it up as one.\n\nThe number is reviews. We went from nothing at all, no reviews, nothing to convert a cold visitor with, to more than 1,000 five-star guests accumulated over my time there. I'm deliberately not quoting a current rating or review count. I left, and that number isn't mine to claim.\n\nThe last test was the handoff, and it's the only one that can't be talked around. Does it run when I stop holding it up? It kept operating after I moved on.",
    limitations:
      "This is past work, and it's a tourism operation, not an engineering build. Anyone reading for evidence that I can architect a system should look at a different case study.\n\nRenting the stack was right for the cold start and it permanently capped how much of the customer relationship and the margin we owned. We never reached the maturity where building our own would have paid that back, so what I'm describing is a trade I made, not a win I collected.\n\nLeaning on resellers and OTAs is the same coin. It bought reach and credibility we couldn't generate, at the cost of commission and of standing one step behind our own guests. That makes a brand more fragile than it looks from the booking numbers.\n\nStandardizing the tours did leave revenue on the table, and some of the bespoke feel with it. If the goal had been maximum revenue per departure rather than a business that survives a handoff, it was the wrong call.\n\nThe thing I'd change: start the owned channel earlier. A direct booking path and a real email relationship with past guests, built in parallel from month one instead of after the partner channels were working. We ended up more dependent on platforms we didn't control than we needed to be, and that was a sequencing mistake, not an unavoidable one.",
    results:
      "We took it from nothing, no brand, no booking page, no channels, to a well-reviewed glacier-tour operator with more than 1,000 five-star guests over my time there. Then it kept operating after I moved on.\n\nThat last clause is the result. The moment I remember isn't a revenue figure I can't share anyway. It's realising a departure I'd had nothing to do with had gone out that morning: sold through a channel I'd set up, guided by someone I'd trained, on a product standard enough that nobody needed to call me.\n\nA new operator's usual failure mode is being a business that is really just one person, so when that person stops, it stops. What we built was the opposite of that, and the proof only arrived after I left.",
    principle:
      "At zero, speed and distribution beat ownership. Rent the stack, borrow someone else's trust, and standardize the product so it can run without you.\n\nYou pay for all of that out of margin, on every sale, for as long as the business runs. That's a real cost and I'd make the same call again, because the alternative is owning a beautiful stack you built during a season you didn't sell in.\n\nAnd a zero-to-one build gets tested after you let go of it, not while you're holding it together.",
    stack: [
      "Bokun (booking platform and channel manager)",
      "Reseller / OTA distribution network",
      "Meta Ads",
      "Google Ads",
      "Email / sales newsletter",
      "Trade-fair partner sales",
      "Tour productization and pricing",
    ],
  },
  {
    slug: "spreadsheet-order-desk-apps-script",
    title: "An order desk that runs entirely inside a spreadsheet",
    resultsPreview:
      "A consumer parts-import channel needed quoting, invoices, SMS and shipping labels — and the person running it works in Google Sheets. So the whole back office is a spreadsheet: an Apps Script system with a pricing sidebar, an accept-by-email flow, VAT invoices generated to Drive, and Twilio SMS. It carried about twenty real customer orders through its first quarter. Total infrastructure cost: zero.",
    problem:
      "The B2B platform I built for the parts business is the wrong tool for walk-in consumer requests. A private customer sends one plate number and one part request from a landing page. They don't need an account. They need a price, a yes/no, an invoice and a text message when the part lands.\n\nHandling that in the big platform meant forcing a heavyweight flow onto a lightweight channel. Handling it by hand meant re-typing every order into email, invoices assembled in a document editor, and nobody remembering which customer had accepted which price.\n\nAnd the person running this channel day to day isn't a developer. Their whole working world is a spreadsheet.",
    context:
      "This is the consumer side of the Icelandic auto-parts operation: a landing-page funnel feeds requests into a back office, parts get sourced from Poland, priced in ISK, and delivered locally. Low volume, real money, a non-technical person running the desk.\n\nThe constraints were blunt. Zero budget for infrastructure — this channel had to prove itself before it earned any. The operator must be able to see and fix everything without me. Prices need PLN-to-ISK conversion with shipping and customs baked in. Invoices must carry Icelandic VAT (VSK 24%). And customers expect an SMS, not an email they won't read.\n\nSo the architecture question wasn't 'what's the best stack'. It was 'what's the best system that lives where the operator already works'.",
    myRole:
      "I built all of it: the sheet structure, the seven Apps Script modules, the pricing sidebar, the accept-link web app, the PDF generation, the SMS integration and the automated data-hygiene triggers. I also run the funnel end of it — the landing page that feeds the sheet.\n\nIt's a small system and I want to be honest about its size: this is a few hundred lines of Apps Script, not a platform. The reason it's worth writing up is the judgment call, not the line count.",
    decisions: [
      {
        decision:
          "Use Google Sheets as the entire back office — database, admin UI and operator workflow in one — with Apps Script as the server.",
        why: "The operator already lives in Sheets. Every admin panel I could build would be a worse version of the grid they use daily: filtering, sorting, bulk edits, comments — all free. The database being visible is a feature, not a leak: when something looks wrong, the operator sees it and fixes the cell.",
        rejected:
          "A small web app on the usual stack (Supabase, hosting, auth). Cleaner engineering, and completely wrong for a channel with one non-technical operator and zero proven volume.",
        tradeoff:
          "No real access control inside the sheet, concurrency held together by LockService, and Apps Script quotas as the ceiling. I accepted all three because the volume is dozens of orders, not thousands. If the channel outgrows the sheet, that's a good problem and a planned migration.",
      },
      {
        decision:
          "Make price acceptance a one-click link in the offer email: the click hits an Apps Script web app that flips the order's status and stamps the time.",
        why: "The acceptance moment is the legal and operational pivot — it has to be recorded by the system, not inferred from an email thread. One click writes 'Cennik zaakceptowany' plus a timestamp into the row, and the customer sees a branded confirmation page.",
        rejected:
          "Asking customers to reply to the email, with the operator updating the sheet by hand. That's how orders quietly rot: the reply arrives, the sheet doesn't change.",
        tradeoff:
          "The link is the authentication — anyone holding it can accept that one order. For this risk profile (accepting a quote you were sent), that's proportionate. I wouldn't ship the same trade-off for anything that moves money on click.",
      },
      {
        decision:
          "Generate documents inside Google's own stack: VAT invoices rendered from HTML to PDF into Drive, shipping labels from a Docs template with placeholder replacement.",
        why: "The invoice needs VSK 24%, the company's details and a clean layout; the label needs name, phone and order number in a fixed format. Both are template problems, and Drive gives versioned storage plus sharing for free.",
        rejected:
          "An invoicing SaaS. Monthly cost against zero-budget, another login for the operator, and an API dependency for documents this simple.",
        tradeoff:
          "Layout and tax-rule upkeep are mine now. When VSK rules or company details change, I edit a template instead of a vendor doing it. At this volume that's minutes per year.",
      },
      {
        decision:
          "Clean data at the point of entry with an edit trigger: phone numbers normalized and customer details auto-filled by kennitala the moment a cell changes.",
        why: "SMS delivery dies on badly formatted numbers, and the same repeat customers kept getting re-typed. The trigger fixes both silently, guarded by LockService so two edits can't race.",
        rejected:
          "A validation pass before send, or trusting the operator to format correctly — which just moves the failure to the moment you can least afford it.",
        tradeoff:
          "Logic buried in triggers is invisible until you know it's there, so the sheet behaves 'magically'. I documented it in the script and accepted the surprise factor as the price of clean rows.",
      },
    ],
    build:
      "The system is seven Apps Script modules behind a custom menu in the orders sheet: config, utilities, the web app, triggers and UI, order logic, integrations and a sidebar template.\n\nThe daily flow runs left to right. A request lands from the funnel. The operator opens the pricing sidebar — a small HTML app inside Sheets — which reads the parts database sheet, applies PLN-to-ISK conversion with shipping and customs, and writes the priced lines back to the order. One button sends the offer email with the accept link. The click flips the status and stamps the time. From there: invoice PDF into Drive with VSK 24%, a Twilio SMS to the customer's cleaned-up number, and a shipping label generated from the Docs template.\n\nOrder numbering starts at 1000 and increments per row — boring, visible, and impossible to get confused about. Test rows stay in the sheet, struck through, which is exactly the audit trail a spreadsheet gives you for free.",
    evals:
      "Operationally, the same way every system here gets judged: it runs, with real customers, and the operator hasn't needed me to babysit it. About twenty real orders moved through it in the first quarter — Icelandic customers, real deliveries — with roughly ten struck-through test rows sitting right next to them in the sheet as the manual test log. The volume is small, and I'd rather say that plainly than dress it up: the point of this build was to prove a channel cheaply, not to carry scale.\n\nThere's no automated test suite and I'm not going to pretend otherwise. The honest quality mechanism is visibility: every row, status and timestamp is inspectable by the operator, and a wrong price or a stuck order is caught by the person whose money it is.",
    limitations:
      "The trade-offs are the architecture. Access control is Google-account sharing, not roles — anyone with edit rights can edit anything. The accept endpoint authenticates by unguessable link, which is proportionate here and unacceptable anywhere money moves on click. Apps Script quotas cap daily throughput far below a real backend. And business logic in a spreadsheet's script editor is harder to version and review than code in a repo.\n\nAll of that is fine at dozens of orders and wrong at thousands. The system's job is to prove the channel cheaply; if volume arrives, the exit path is folding it into the main platform, and the sheet becomes the archive.",
    results:
      "The consumer channel runs end to end — request, quote, acceptance, invoice, SMS, label — on infrastructure that costs nothing and lives entirely where the operator already works. About twenty real customer orders went through it in its first quarter, from the first request in January to the spring — quoted, accepted, invoiced and messaged without me in the loop.\n\nAnd the part I find quietly satisfying: when something does look off, the fix is a person editing a cell, not a support ticket to me.",
    principle:
      "Architecture isn't a taste contest — it's a fit problem. The same business runs a 13-stage Postgres state machine on one side and a spreadsheet on the other, and both are right: one carries a team through thousands of B2B orders, the other lets a single operator run a zero-cost channel from the tool they already trust. Choosing the boring system that meets the operator where they are is the senior move, not the junior one.",
    stack: [
      "Google Apps Script",
      "Google Sheets",
      "Twilio SMS",
      "Google Drive + Docs (PDF)",
      "Apps Script web app (accept link)",
      "systeme.io funnel",
    ],
  },
  {
    slug: "engineered-learning-system",
    title: "I built my own training system, then made it grade me",
    resultsPreview:
      "Learning by watching tutorials didn't stick, so I built the loop instead: a daily agent that prepares one lesson, an app that makes me predict the answer before it shows me anything and grades what I typed, a bank of verified exercises that keeps every lesson replayable, and a job-market scanner that edits my own curriculum when real listings drift. Every code output is executed before it can become an answer key. The system also improves itself weekly.",
    problem:
      "I'd done the tutorial thing. Watch a video, nod along, feel productive, retain almost nothing. The failure was obvious once I named it: I was consuming explanations instead of making predictions, so I never found out what I actually didn't know.\n\nThe second failure was worse. My learning plan was a guess about what the market wants. I was picking topics from intuition while real job listings sat right there, unread, telling me exactly which skills kept showing up.\n\nAnd the third: whatever I did learn evaporated. A lesson happened once, lived in a note, and was never seen again. Forgetting is the default state, and I had nothing engineered against it.",
    context:
      "This is my own learning infrastructure, built for a specific target: moving from AI automation and implementation work toward solutions engineering and eventually a forward-deployed role. It runs on the same agent runtime as the rest of my automations.\n\nThe constraints are personal and unforgiving. I run several businesses, so study time is whatever survives the day, and any system that needs an hour of setup gets abandoned in week two. I'm honest that I retain by doing, not by reading. And motivation is unreliable by design, so the system had to keep producing value on the days I don't show up.\n\nOne deliberate scope decision shaped everything: at this stage the goal is reading and understanding code, not writing it from scratch. Prediction is cheap to test and it exposes false confidence immediately.",
    myRole:
      "I designed and built all of it: the daily agent, the training app, the exercise bank format, the grading and scheduling rules, and the market-signal bridge. I also wrote the guardrails that stop the system from wandering off, which turned out to matter more than the features.\n\nI'm the only user, so I'm also the one who finds every flaw the hard way.",
    decisions: [
      {
        decision:
          "Split the system in two: a scheduled agent that only prepares and feeds material, and an app that owns all scoring. The agent is explicitly forbidden from awarding progress.",
        why: "If the thing that writes the lesson also grants the points, it can quietly reward me for showing up instead of for knowing something. Separating them means progress can only be earned live, by typing an answer that gets judged. The agent can run every day whether I show up or not; my score only moves when I actually do the work.",
        rejected:
          "One agent doing everything, which is simpler and what I built first. It made streaks and points meaningless because they accrued from automation, not from recall.",
        tradeoff:
          "Two components that must agree on an exact file format, and a parser that breaks if either side drifts. I keep the format frozen and version it rather than letting each side improvise.",
      },
      {
        decision:
          "Never show the answer before the prediction. The app forces a written guess, then grades it with a model against a verified key.",
        why: "Recognition feels like knowledge and isn't. Forcing a commitment first turns every exercise into a real test of understanding, and the gap between what I predicted and what actually ran is the only useful signal in the whole system.",
        rejected:
          "Reading annotated code with the output alongside it, the way most tutorials work. It's more comfortable and it produces the illusion of competence I was trying to escape.",
        tradeoff:
          "It's slower and it stings. Sessions where I'm wrong three times in a row are the ones that teach most and feel worst, and there's no way to have the first without the second.",
      },
      {
        decision:
          "Execute every code snippet before its output can become an answer key, and re-verify the oldest exercises on a weekly cycle.",
        why: "A training system that teaches wrong answers is worse than none. So the expected output isn't reasoned about, it's produced: the code runs, and the real output is what gets stored. The weekly pass re-runs the oldest exercises and corrects the bank if reality has drifted, logging every correction.",
        rejected:
          "Trusting the model's predicted output. Models are confidently wrong about execution order and edge cases exactly where the interesting exercises live.",
        tradeoff:
          "Every exercise costs an execution step to create and another to maintain, which caps how fast the bank can grow. I'd rather have a smaller bank I can trust than a large one I can't.",
      },
      {
        decision:
          "Bank every lesson as a structured object instead of leaving it in a progress note, and top up the weakest topic by one extra exercise a day.",
        why: "A lesson that only exists in a running log is gone the moment the log rotates. Banked as data, it can be served again in a practice round, upgraded later, or turned into a harder variant. The daily top-up targets whichever topic has the fewest exercises, so coverage evens out instead of pooling around whatever I found interesting that week.",
        rejected:
          "Keeping lessons in the narrative progress file only, which is what I did at first and why early material became unusable.",
        tradeoff:
          "A schema to maintain and a real risk of corrupting a growing JSON file. I write to it only through a script that parses, appends to the right array, re-reads and reports counts, after an incident where lessons landed in the wrong bucket.",
      },
      {
        decision:
          "Let real job listings edit the curriculum, but only through hard guardrails: never a topic from my explicit skip list, at most one new topic a week, mastery gates untouchable, append-only.",
        why: "My plan is a hypothesis about the market; listings are evidence. A separate scanner reads real postings and, when the same requirement keeps appearing, adds it to the curriculum and records why. The guardrails exist because an unconstrained feedback loop would chase every trend and rewrite the plan weekly, which is just a slower way of learning nothing.",
        rejected:
          "Reviewing the market myself every few months. I don't, reliably, and by the time I notice a shift I've spent a quarter on the wrong thing.",
        tradeoff:
          "The curriculum grows from two directions, mine and the market's, so it needs a referee. The rules are that referee: weakest-topic-first ordering and the mastery gates always win over a fresh market signal.",
      },
    ],
    build:
      "The daily agent reads the current state, picks the next concept with the weakest topic first, builds one exercise with a themed scenario, two code snippets, a diagram, a prediction question and a three-question quiz, runs the code to capture the real output, and writes it into the progress file in a fixed format. Then it banks the same exercise as a structured object and tops up whichever topic is thinnest.\n\nThe app is where the actual session happens. It reads the prepared lesson, refuses to reveal anything before I commit to a prediction, grades what I typed, and writes back the result itself: points, level, streak, and new cards scheduled by spaced repetition. Six tabs, progress rings, ranks and boss fights, because the boring version is the one I stop opening.\n\nMastery gates sit between phases: every fifth completed session is a mixed checkpoint, and a new phase only opens after it's passed. Advancing a rung on the role ladder requires a real artifact — a link, a repo, something that exists — not a claim that I've learned it.\n\nThe weekly improvement cycle is the part I'd defend hardest. It re-verifies the three oldest exercises, rewrites the weak ones, and promotes anything I've passed twice into a harder variant while keeping the original. Nothing is ever deleted, only versioned.",
    evals:
      "The honest measure is whether the material survives contact with me, and there the system is doing its job: exercises are banked with executed outputs, the weakest topics get filled first, and the coverage numbers are visible rather than assumed — the bank sat at 32 exercises across seven topics after one consolidation batch, with an explicit target of at least six per topic before difficulty rises.\n\nThe sharper eval is the one I didn't design for: the failures it caught. A run once wrote to a progress file in overwrite mode and destroyed hundreds of lines of archive; the game state was rebuildable from context, the archived detail was not. Another run appended new lessons into the wrong array of the bank, so they surfaced as boss fights instead of practice. Both produced permanent rules — append-only writes on state files, and a script-mediated write that re-reads and reports counts.\n\nWhat I can't claim is an outcome metric. There's no score that proves this made me employable; it's a system for retention and honest self-assessment, and the only real verdict will be whether the work I ship keeps getting harder.",
    limitations:
      "The obvious one: this is self-directed practice, not a credential, and nobody outside my own setup has audited what I've actually learned. Grading by model is good enough to catch a wrong prediction; it is not an examiner.\n\nThe scope is narrow on purpose. At this stage it trains reading and predicting code, not writing production code from a blank file, and those are different skills. I chose the one that exposes false confidence fastest, but I'm not going to pretend it covers both.\n\nAnd automation can't make me sit down. The agent prepares a lesson whether I show up or not, which keeps the material flowing but also means a long quiet stretch is entirely possible; the bank exists precisely so those weeks don't waste the material. Two incidents also proved that a system writing to its own state files is one careless mode flag away from destroying its own history — that risk is managed now, not eliminated.",
    results:
      "I have a learning loop that runs without me maintaining it, and that fails loudly instead of quietly. Every lesson is executed before it's taught, banked so it can be replayed, and scheduled to come back before I forget it. The curriculum answers to real job listings rather than my guesses, inside rules that stop it from chasing noise.\n\nThe part I actually care about: it removed the comfortable illusion. I can't nod along to my own system, because it makes me commit to an answer before it shows me anything, and it keeps a list of the things I keep getting wrong.\n\nIt's also the clearest evidence of how I work. I applied the same discipline to my own learning that I apply to production systems — verified outputs, versioned material, guardrails written from real incidents, append-only writes on anything that holds state.",
    principle:
      "If something matters and depends on willpower, it will fail — so engineer it. Separate the thing that produces work from the thing that scores it, or you'll reward attendance instead of understanding. Verify before you teach, because a confident wrong answer is worse than no answer. And write your guardrails from the incidents you actually had, not the ones you imagined.",
    stack: [
      "Scheduled agent (daily lesson feeder)",
      "Self-built training app (in-app grading)",
      "Spaced repetition (SM-2)",
      "Structured exercise bank (JSON, versioned)",
      "Node / Python execution for verified outputs",
      "Job-market scanner feeding the curriculum",
      "Append-only state files with recovery rules",
    ],
  },
];

export const SECONDARY: SecondaryStudy[] = [];
