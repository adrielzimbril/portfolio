import logger from "@/utils/logger";
import type { AddContactHandler } from "@/module/contact/types/types";
import { Resend } from "resend";

const CONTACT_PROVIDER_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || "*";

const provider = new Resend(CONTACT_PROVIDER_API_KEY!);

export const add: AddContactHandler = async (params) => {
  if (!CONTACT_PROVIDER_API_KEY) {
    throw new Error("Missing RESEND_API_KEY env var");
  }

  const listId: string[] = params.listIds as string[];
  listId?.forEach(async (id) => {
    const audienceId = id ?? CONTACT_AUDIENCE_ID;

    const audience = await provider.audiences.get(audienceId);

    if (!audience.data) {
      const err = audience.error;
      logger.error(
        "Resend provider requires an audienceId in input.metadata.audienceId; skipping",
        {
          id: audienceId,
          name: err?.name,
          message: err?.message,
        }
      );
      // no-op success to keep flow resilient
      return { ok: true } as const;
    }

    const response = await provider.contacts.create({
      email: params.email,
      audienceId: audienceId,
      firstName: params.firstName,
      lastName: params.lastName,
      unsubscribed: false,
    });

    if (!response.data) {
      const err = response.error;
      logger.error("Resend contacts error", {
        name: err?.name,
        message: err?.message,
      });
      throw new Error(err?.message || "Resend contacts error");
    }
  });

  return { ok: true } as const;
};
