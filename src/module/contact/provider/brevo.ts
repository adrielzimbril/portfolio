import logger from "@/utils/logger";
import type { AddContactHandler } from "@/module/contact/types/types";
import { ContactsApi, CreateContact } from "@getbrevo/brevo";

// The SDK exports ApiKeys enums per API. We declare it here to avoid deep type import
export declare enum ContactsApiApiKeys {
  apiKey = 0,
  partnerKey = 1,
}

const CONTACT_PROVIDER_API_KEY = process.env.BREVO_API_KEY || "";

const provider = new ContactsApi();
provider.setApiKey(ContactsApiApiKeys.apiKey, CONTACT_PROVIDER_API_KEY);

export const add: AddContactHandler = async ({
  email,
  firstName,
  lastName,
  phone,
  listIds,
  tags,
}) => {
  if (!CONTACT_PROVIDER_API_KEY) {
    throw new Error("Missing BREVO_API_KEY env var");
  }

  try {
    const contact = new CreateContact();
    contact.email = email;
    contact.listIds =
      listIds && listIds.length > 0
        ? listIds.map((id) => Number(id))
        : undefined;
    // Brevo attributes are case-sensitive
    contact.attributes = {
      FIRST_NAME: firstName || undefined,
      LAST_NAME: lastName || undefined,
      SMS: phone || undefined,
      TAGS: tags || undefined,
    } as any;
    // Update when exists for idempotency
    contact.updateEnabled = true;

    const res = await provider.createContact(contact);
    logger.info("Brevo contact add response", res);
    return { ok: true };
  } catch (err: any) {
    const message =
      (err?.body?.message as string) || err?.message || "Unknown Brevo error";
    // Treat "exists" as success for idempotency
    if (
      typeof message === "string" &&
      message.toLowerCase().includes("exists")
    ) {
      logger.info("Brevo contact already exists", { email });
      return { ok: true, alreadyExists: true } as const;
    }
    logger.error("Brevo add contact failed", err);
    throw new Error(message);
  }
};
