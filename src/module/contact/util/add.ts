import logger from "@/utils/logger";
import type { ContactInput } from "@/module/contact/types/types";
import {
  addWithBrevo,
  addWithCustom,
  addWithResend,
} from "@/module/contact/provider";

export type ContactProvider = "brevo" | "resend" | "custom";

function resolveProvider(input?: ContactProvider): ContactProvider {
  const fromEnv = (process.env.CONTACTS_PROVIDER || "").toLowerCase();
  const envProvider =
    fromEnv === "brevo" || fromEnv === "resend" || fromEnv === "custom"
      ? (fromEnv as ContactProvider)
      : undefined;
  return input || envProvider || "brevo";
}

export async function addContact(
  input: ContactInput & { provider?: ContactProvider }
) {
  const provider = resolveProvider(input.provider);
  try {
    if (provider === "brevo") {
      return await addWithBrevo(input);
    }
    if (provider === "resend") {
      return await addWithResend(input);
    }
    return await addWithCustom(input);
  } catch (e) {
    logger.error("addContact failed", e);
    throw e;
  }
}
