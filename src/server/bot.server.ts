/**
 * AI assistant backend — server-only. Uses Anthropic Claude directly (ANTHROPIC_API_KEY,
 * never shipped to browser). The system prompt (the bot's knowledge base) is in
 * bot.prompt.ts.
 */
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { SYSTEM } from "./bot.prompt";

const MODEL = "claude-haiku-4-5-20251001";

export type BotMessage = { role: "user" | "assistant"; content: string };
export type BotResult = { ok: true; text: string } | { ok: false; error: string };

/**
 * The chat bubble renders raw text, so any markdown the model emits shows up as
 * literal `**asterisks**`. The system prompt forbids it; this makes it true
 * regardless of whether the model obeys.
 */
function plain(s: string): string {
  return s
    .replace(/```[\s\S]*?```/g, (b) => b.replace(/```\w*\n?/g, "")) // fenced code
    .replace(/(\*\*\*|___)(.+?)\1/g, "$2") // bold+italic
    .replace(/(\*\*|__)(.+?)\1/g, "$2") // bold
    .replace(/(?<![\w*])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![\w*])/g, "$1") // italic
    .replace(/(?<![\w_])_(?!\s)([^_\n]+?)(?<!\s)_(?![\w_])/g, "$1") // italic, underscores
    .replace(/`([^`\n]+)`/g, "$1") // inline code
    .replace(/^\s{0,3}#{1,6}\s+/gm, "") // headings
    .replace(/^\s{0,3}[-*+]\s+/gm, "") // bullets
    .replace(/^\s{0,3}>\s?/gm, "") // block quotes
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1 ($2)") // links
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function runBot(messages: BotMessage[]): Promise<BotResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("[bot] ANTHROPIC_API_KEY not set — assistant disabled");
    return { ok: false, error: "unconfigured" };
  }

  const clean = messages
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  if (!clean.length) return { ok: false, error: "empty" };

  try {
    const anthropic = createAnthropic({ apiKey });

    const res = await generateText({
      model: anthropic(MODEL),
      system: SYSTEM,
      messages: clean,
    });
    const text = plain(res.text || "");
    return { ok: true, text: text || "I am not certain — reach Kamil at hello@kamiljan.com." };
  } catch {
    return { ok: false, error: "api-error" };
  }
}
