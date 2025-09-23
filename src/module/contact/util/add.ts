import logger from "@/utils/logger";
import {
  ContactInput,
  ContactProvider,
  type ContactProviderType,
} from "@/module/contact/types/types";
import { add } from "@/module/contact/provider";

function resolveProvider(input?: ContactProviderType): ContactProvider {
  const fromEnv = (process.env.CONTACTS_PROVIDER || "").toLowerCase();
  const envProvider =
    fromEnv === "brevo" || fromEnv === "resend" || fromEnv === "custom"
      ? (fromEnv as ContactProvider)
      : undefined;
  return input || envProvider || ContactProvider.BREVO;
}

export async function addContact(
  input: ContactInput & { provider?: ContactProvider }
) {
  const provider = resolveProvider(input.provider);
  try {
    logger.info("addContact success", { provider });
    return await add(input);

    // if (provider === ContactProvider.BREVO) {
    //   return await addWithBrevo(input);
    // }
    // if (provider === ContactProvider.RESEND) {
    //   return await addWithResend(input);
    // }
    // return await addWithCustom(input);
  } catch (e) {
    logger.error("addContact failed", e);
    throw e;
  }
}
