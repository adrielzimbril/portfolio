import logger from "@/utils/logger";
import type { AddContactHandler } from "@/module/contact/types/types";
import {
  ContactsApi,
  ContactsApiApiKeys,
  CreateContact,
} from "@getbrevo/brevo";

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

  const contact = new CreateContact();
  contact.email = email;
  contact.listIds =
    listIds && listIds.length > 0 ? listIds.map((id) => Number(id)) : undefined;
  const nameContact = contact;
  const phoneContact = contact;
  // Update when exists for idempotency
  contact.updateEnabled = true;
  // Brevo attributes are case-sensitive
  nameContact.attributes = {
    FIRSTNAME: firstName || undefined,
    LASTNAME: lastName || undefined,
    SMS: undefined,
    TAGS: tags || undefined,
  } as any;
  phoneContact.attributes = {
    SMS: phone || undefined,
  } as any;

  try {
    const res = await provider.createContact(nameContact);
    logger.info("Brevo contact add name response", {
      email,
      status: res.response.statusCode,
      alreadyExists: false,
      step: "passed",
    });
    logger.info(
      "Brevo contact added successfully | data details :",
      nameContact
    );
    const phoneRes = await provider.createContact(phoneContact);
    logger.info("Brevo contact phone add response", {
      email,
      status: phoneRes.response.statusCode,
      alreadyExists: false,
      step: "passed",
    });
    logger.info(
      "Brevo contact added successfully | data details :",
      phoneContact
    );
    return { ok: true, alreadyExists: false } as const;
  } catch (err: any) {
    if (err.status === 400 || err.message.includes("400")) {
      try {
        const updateRes = await provider.updateContact(email, nameContact);
        logger.info("Brevo contact name update response", {
          email,
          status: updateRes.response.statusCode,
          alreadyExists: true,
          step: "passed",
        });
        logger.info(
          "Brevo contact updated successfully | data details :",
          nameContact
        );
        const updatePhoneRes = await provider.updateContact(
          email,
          phoneContact
        );
        logger.info("Brevo contact phone update response", {
          email,
          status: updatePhoneRes.response.statusCode,
          alreadyExists: true,
          step: "passed",
        });
        logger.info(
          "Brevo contact updated successfully | data details :",
          phoneContact
        );
        return { ok: true, alreadyExists: true } as const;
      } catch (updateErr: any) {
        const message =
          (updateErr?.body?.message as string) ||
          updateErr?.message ||
          "Unknown Brevo error";
        logger.error("Brevo update contact failed", JSON.stringify(updateErr));
        throw new Error(message);
      }
    }
    const message =
      (err?.body?.message as string) || err?.message || "Unknown Brevo error";

    logger.error("Brevo add contact failed", JSON.stringify(err));
    throw new Error(message);
  }
};
