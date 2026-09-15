import { type Lang } from "../i18n";

/**
 * The /kontakt form goes out through the same lead path as the chat
 * (submitLead → Resend), which takes one free-text message. This folds the
 * form's fields into that message so the email says where it came from and
 * which company is asking. Pure — exported for tests.
 */
export function consultMessage(input: { company: string; message: string; lang: Lang }): string {
  const company = input.company.trim();
  const head =
    input.lang === "pl"
      ? "Bezpłatna konsultacja: formularz /kontakt"
      : "Free consultation: /kontakt form";
  const companyLine = company ? `${input.lang === "pl" ? "Firma" : "Company"}: ${company}` : "";
  return [head, companyLine, "", input.message.trim()].filter((l, i) => i !== 1 || l).join("\n");
}
