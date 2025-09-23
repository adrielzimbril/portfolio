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

  const nameContact = new CreateContact();
  nameContact.email = email;
  nameContact.listIds =
    listIds && listIds.length > 0 ? listIds.map((id) => Number(id)) : undefined;
  // Update when exists for idempotency
  nameContact.updateEnabled = true;
  const phoneContact = new CreateContact();
  phoneContact.email = email;
  phoneContact.listIds =
    listIds && listIds.length > 0 ? listIds.map((id) => Number(id)) : undefined;
  phoneContact.updateEnabled = true;
  // Brevo attributes are case-sensitive
  nameContact.attributes = {
    FIRSTNAME: firstName || undefined,
    LASTNAME: lastName || undefined,
    SMS: undefined,
    TAGS: tags || undefined,
  } as unknown as Record<string, unknown>;
  phoneContact.attributes = {
    SMS: phone || undefined,
  } as unknown as Record<string, unknown>;

  try {
    const res = await provider.createContact(nameContact);
    // logger.info("Brevo contact add name response", {
    //   email,
    //   type: "name",
    //   status: res.response.statusCode,
    //   alreadyExists: false,
    //   step: "passed",
    // });
    const phoneRes = await provider.createContact(phoneContact);
    // logger.info("Brevo contact phone add response", {
    //   email,
    //   type: "phone",
    //   status: phoneRes.response.statusCode,
    //   alreadyExists: false,
    //   step: "passed",
    // });
    const alreadyExists: boolean = Boolean(res) || Boolean(phoneRes);
    return { ok: true, alreadyExists } as const;
  } catch (err: unknown) {
    if (err && (err as { status: number }).status === 400 && (err as { message: string }).message.includes("400")) {
      try {
        const updateRes = await provider.updateContact(email, nameContact);
        // logger.info("Brevo contact name update response", {
        //   email,
        //   type: "name",
        //   status: updateRes.response.statusCode,
        //   alreadyExists: true,
        //   step: "passed",
        // });
        const updatePhoneRes = await provider.updateContact(
          email,
          phoneContact
        );
        // logger.info("Brevo contact phone update response", {
        //   email,
        //   type: "phone",
        //   status: updatePhoneRes.response.statusCode,
        //   alreadyExists: true,
        //   step: "passed",
        // });
        const alreadyExists: boolean =
          Boolean(updateRes) || Boolean(updatePhoneRes);
        return {
          ok: true,
          alreadyExists,
        } as const;
      } catch (updateErr: unknown) {
        const message =
          (updateErr as { body: { message: string } })?.body?.message ||
          (updateErr as { message: string })?.message ||
          "Unknown Brevo error";
        // logger.error("Brevo update contact failed", JSON.stringify(updateErr));
        throw new Error(message);
      }
    }
    const message =
      (err as { body: { message: string } })?.body?.message ||
      (err as { message: string })?.message ||
      "Unknown Brevo error";

    // logger.error("Brevo add contact failed", JSON.stringify(err));
    throw new Error(message);
  }
};
