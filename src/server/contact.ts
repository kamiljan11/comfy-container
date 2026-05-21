import { createServerFn } from '@tanstack/react-start'
import { sendEmail } from './email'

/**
 * Contact form server function — receives form data and routes it through
 * the pluggable email transport (see ./email.ts). When no real email provider
 * is wired up, this still resolves successfully and logs the submission so we
 * can verify the flow end-to-end without losing data.
 */
export const submitContactForm = createServerFn({ method: 'POST' })
  .validator((data: { name: string; email: string; subject: string; message: string }) => {
    if (!data.name?.trim()) throw new Error('Name is required')
    if (!data.email?.includes('@')) throw new Error('Valid email is required')
    if (!data.message?.trim()) throw new Error('Message is required')
    return data
  })
  .handler(async ({ data }) => {
    await sendEmail({
      to: 'hello@kamiljan.com',
      replyTo: data.email,
      subject: `[kamiljan.com] ${data.subject || 'Contact form'} — from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    })
    return { ok: true, receivedAt: new Date().toISOString() }
  })
