import { createServerFn } from "@tanstack/react-start";
import { sendLead, type LeadInput, type LeadResult } from "../server/lead.server";

/**
 * Server function the chat's "message Kamil" form calls. Validation runs in the
 * input validator; the actual send (Resend + AI brief) stays server-only so no
 * key ever reaches the browser.
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: LeadInput) => ({
    name: typeof data?.name === "string" ? data.name : "",
    email: typeof data?.email === "string" ? data.email : "",
    message: typeof data?.message === "string" ? data.message : "",
    transcript: Array.isArray(data?.transcript) ? data.transcript : [],
    hp: typeof data?.hp === "string" ? data.hp : "",
  }))
  .handler(async ({ data }): Promise<LeadResult> => sendLead(data));
