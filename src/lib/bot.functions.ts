import { createServerFn } from '@tanstack/react-start'
import { runBot, type BotMessage, type BotResult } from '../server/bot.server'

/**
 * Server function the chat widget calls. Validation runs inside the handler to
 * stay compatible with the pinned @tanstack/react-start version (no chained
 * .validator()). Returns a discriminated result the client renders directly.
 */
export const askBot = createServerFn({ method: 'POST' }).handler(
  async ({ data }: { data: { messages: BotMessage[] } }): Promise<BotResult> => {
    const messages = Array.isArray(data?.messages) ? data.messages : []
    return runBot(messages)
  },
)
