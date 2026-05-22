/**
 * Subscriber storage — pluggable.
 *
 * Default: in-memory store + console log (good enough to verify the flow
 * end-to-end). When you're ready to persist for real, drop a Cloudflare KV
 * binding into `wrangler.jsonc`, set `SUBSCRIBERS_KV` in the environment,
 * and the `kvTransport` below will start using it.
 */

export interface Subscriber {
  email: string
  name?: string
  source?: string
  tag?: string
  subscribedAt: string
}

export interface SubscriberStore {
  name: string
  save(s: Subscriber): Promise<void>
  list(): Promise<Subscriber[]>
}

// ── In-memory + console (default) ──────────────────────────────────────────
const memory: Subscriber[] = []
const memoryStore: SubscriberStore = {
  name: 'memory',
  async save(s) {
    memory.push(s)
    // eslint-disable-next-line no-console
    console.log('[subscribers:memory] saved', { email: s.email, tag: s.tag, source: s.source })
  },
  async list() {
    return [...memory]
  },
}

// ── Cloudflare KV (ready to wire) ────────────────────────────────────────────
// Bind a KV namespace in wrangler.jsonc as SUBSCRIBERS_KV and uncomment:
//
// const kvStore: SubscriberStore = {
//   name: 'cloudflare-kv',
//   async save(s) {
//     // @ts-expect-error — env binding type provided by wrangler types
//     await SUBSCRIBERS_KV.put(`sub:${s.email}`, JSON.stringify(s))
//   },
//   async list() {
//     // @ts-expect-error
//     const { keys } = await SUBSCRIBERS_KV.list({ prefix: 'sub:' })
//     // @ts-expect-error
//     const subs = await Promise.all(keys.map(k => SUBSCRIBERS_KV.get(k.name, 'json')))
//     return subs.filter(Boolean) as Subscriber[]
//   },
// }

function pickStore(): SubscriberStore {
  // When KV is bound, switch this to `process.env.SUBSCRIBERS_KV_ENABLED ? kvStore : memoryStore`.
  return memoryStore
}

export async function saveSubscriber(s: Subscriber): Promise<void> {
  await pickStore().save(s)
}

export async function listSubscribers(): Promise<Subscriber[]> {
  return pickStore().list()
}
