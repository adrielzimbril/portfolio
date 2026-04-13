import logger from "@/utils/logger";
import type { AddContactHandler } from "@/integrations/contact/types/types";

export const add: AddContactHandler = async ({
  email,
  firstName,
  lastName,
  phone,
  tags,
  metadata,
}) => {
  // This is a stub you can adapt to your own CRM or database
  logger.info("Custom contact provider - received contact", {
    email,
    firstName,
    lastName,
    phone,
    tags,
    metadata,
  });
  // Implement your own persistence here if needed
  return { ok: true } as const;
};
