import { createServerFn } from '@tanstack/react-start'
import { runBot, type BotMessage, type BotResult } from '../server/bot.server'

export const askBot = createServerFn({ method: 'POST' })
  .inputValidator((data: { messages: BotMessage[] }) => ({
    messages: Array.isArray(data?.messages) ? data.messages : [],
  }))
  .handler(async ({ data }): Promise<BotResult> => runBot(data.messages))
