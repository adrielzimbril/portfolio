import { appConfig } from "@/data/app-config";
import logger from "@/utils/logger";
import type { SendEmailHandler } from "@/module/mail/types/types";
import { Resend } from "resend";

const { from, replyTo } = appConfig.mails;

const MAIL_PROVIDER_API_KEY = process.env.RESEND_API_KEY;

const provider = new Resend(MAIL_PROVIDER_API_KEY!);

export const send: SendEmailHandler = async ({ to, subject, body }) => {
  const response = await provider.emails.send({
    from,
    to: to.map((t) => t.email),
    subject,
    replyTo,
    react: body?.react,
    html: body?.html,
  });

  if (!response.data) {
    logger.error("Error sending email", response.error);
    throw new Error("Could not send email");
  }
};
