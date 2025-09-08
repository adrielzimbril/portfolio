import type { SendEmailHandler } from "@/module/mail/types/types";
import logger from "@/utils/logger";

export const send: SendEmailHandler = async ({ to, subject, text }) => {
  let formattedOutput = `Sending email to ${to} with subject ${subject}\n\n`;

  formattedOutput += `Text: ${text}\n\n`;

  logger.info(formattedOutput);
};
