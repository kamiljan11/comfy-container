/**
 * Sliding-window counters for the public lead form. Every accepted lead costs
 * an Anthropic call and a Resend send, and the server function behind the form
 * can be POSTed to directly, so the honeypot alone bounds nothing.
 *
 * In-memory on purpose: no new service to run. The limit is per serverless
 * instance, so it is a cost ceiling and a brake on a script loop, not a hard
 * guarantee — a distributed flood would need a shared store (KV / Edge Config).
 */

export type Limiter = {
  /** Records a hit for `key` at `now` (ms) and says whether it is within the limit. */
  hit(key: string, now: number): boolean;
  /** Number of keys currently tracked — exposed for tests of the memory cap. */
  size(): number;
};

export function createLimiter(opts: { windowMs: number; max: number; maxKeys?: number }): Limiter {
  const { windowMs, max } = opts;
  const maxKeys = opts.maxKeys ?? 5000;
  const hits = new Map<string, number[]>();

  return {
    hit(key, now) {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      const allowed = recent.length < max;
      if (allowed) recent.push(now);
      // re-insert so Map order tracks recency; evict the stalest key past the cap
      hits.delete(key);
      hits.set(key, recent);
      if (hits.size > maxKeys) {
        const oldest = hits.keys().next().value;
        if (oldest !== undefined) hits.delete(oldest);
      }
      return allowed;
    },
    size: () => hits.size,
  };
}

/** First address in an X-Forwarded-For chain (the client, as Vercel sets it). Pure. */
export function firstForwardedIp(header: string | null | undefined): string {
  const first = (header ?? "").split(",")[0]?.trim();
  return first || "unknown";
}
