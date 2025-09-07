import { appConfig } from "@/data/app-config";
import logger from "@/utils/logger";
import type { SendEmailHandler } from "@/module/mail/types";
import { Resend } from "resend";

const { from } = appConfig.mails;

const resend = new Resend(process.env.RESEND_API_KEY);

export const send: SendEmailHandler = async ({ to, subject, body }) => {
  const response = await resend.emails.send({
    from,
    to,
    subject,
    react: body?.react,
    html: body?.html,
  });

  if (!response.data) {
    logger.error(await response.error);
    throw new Error("Could not send email");
  }
};
