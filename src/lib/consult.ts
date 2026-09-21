import { type Lang } from "../i18n";

/**
 * The consultation form (on /kontakt and on every service and area page) goes out through the same lead path as the chat
 * (submitLead → Resend), which takes one free-text message. This folds the
 * form's fields into that message so the email says where it came from and
 * which company is asking. Pure — exported for tests.
 */
export function consultMessage(input: {
  company: string;
  message: string;
  lang: Lang;
  /** The page the form sat on, so the email says which service brought them. */
  source?: string;
}): string {
  const company = input.company.trim();
  const source = input.source ?? "/kontakt";
  const head =
    input.lang === "pl"
      ? `Bezpłatna konsultacja: formularz ${source}`
      : `Free consultation: ${source} form`;
  const companyLine = company ? `${input.lang === "pl" ? "Firma" : "Company"}: ${company}` : "";
  return [head, companyLine, "", input.message.trim()].filter((l, i) => i !== 1 || l).join("\n");
}
