import { createServerFn } from '@tanstack/react-start'
import { sendEmail, startWelcomeSequence } from '../server/email.server'
import { saveSubscriber } from '../server/subscribers.server'

export interface SubscribePayload {
  email: string
  name?: string
  source?: string
  tag?: string
}

/**
 * Newsletter opt-in server function.
 *
 * Flow:
 *   1. Validate email (inline, since this @tanstack/react-start version
 *      doesn't expose the chained .validator()).
 *   2. Persist subscriber (Cloudflare KV when wired up; in-memory stub for now).
 *   3. Notify Kamil that a new lead came in.
 *   4. Kick off the welcome sequence for the new subscriber.
 */
export const subscribeToNewsletter = createServerFn({ method: 'POST' })
  .inputValidator((data: SubscribePayload) => {
    if (!data?.email?.includes('@')) throw new Error('Valid email is required')
    return data
  })
  .handler(async ({ data }) => {
    const subscriber = {
      email: data.email.trim().toLowerCase(),
      name: data.name?.trim() || undefined,
      source: data.source || 'inline',
      tag: data.tag || undefined,
      subscribedAt: new Date().toISOString(),
    }

    await saveSubscriber(subscriber)

    await sendEmail({
      to: 'hello@kamiljan.com',
      subject: `[kamiljan.com] new subscriber — ${subscriber.email}`,
      text: `Source: ${subscriber.source}\nTag: ${subscriber.tag ?? '—'}\nName: ${subscriber.name ?? '—'}\nEmail: ${subscriber.email}\nAt: ${subscriber.subscribedAt}`,
    })

    await startWelcomeSequence({ email: subscriber.email, name: subscriber.name })

    return { ok: true, subscribedAt: subscriber.subscribedAt }
  })
