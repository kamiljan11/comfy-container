import { createServerFn } from '@tanstack/react-start'
import { sendEmail } from '../server/email.server'

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Contact form server function — receives form data and routes it through
 * the pluggable email transport (see ../server/email.server.ts). Validation
 * runs inside the handler so we stay compatible with the @tanstack/react-start
 * version pinned in this repo (which does not expose the chained .validator()).
 */
export const submitContactForm = createServerFn({ method: 'POST' }).handler(
  async ({ data }: { data: ContactPayload }) => {
    if (!data?.name?.trim()) throw new Error('Name is required')
    if (!data?.email?.includes('@')) throw new Error('Valid email is required')
    if (!data?.message?.trim()) throw new Error('Message is required')

    await sendEmail({
      to: 'hello@kamiljan.com',
      replyTo: data.email,
      subject: `[kamiljan.com] ${data.subject || 'Contact form'} — from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    })
    return { ok: true, receivedAt: new Date().toISOString() }
  },
)
