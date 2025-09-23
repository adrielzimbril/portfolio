import { appConfig } from "@/data/app-config";
import logger from "@/utils/logger";
import type { SendEmailHandler } from "@/module/mail/types/types";
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@getbrevo/brevo";
import { siteConfig } from "@/data/config";

const { from, replyTo } = appConfig.mails;
const { details } = siteConfig;

const MAIL_PROVIDER_API_KEY = process.env.BREVO_API_KEY || "";

const provider = new TransactionalEmailsApi();
provider.setApiKey(TransactionalEmailsApiApiKeys.apiKey, MAIL_PROVIDER_API_KEY);

export const send: SendEmailHandler = async ({ to, subject, body }) => {
  if (!MAIL_PROVIDER_API_KEY) {
    throw new Error("Missing BREVO_API_KEY env var");
  }

  try {
    const message = new SendSmtpEmail();
    message.subject = subject || details.hook;
    message.htmlContent = body?.react ?? body?.html;
    message.sender = { email: from, name: details.nameShared };
    message.to = to.map((t) => ({ email: t.email, name: t.name }));
    message.replyTo = { email: replyTo, name: details.nameShared };

    await provider
      .sendTransacEmail(message)
      .then((res) => {
        // logger.info("Email sent successfully", JSON.stringify(res));
        return res;
      })
      .catch((err) => {
        logger.error("Error sending email", JSON.stringify(err));
        // throw new Error("Could not send email", { cause: err });
      });
  } catch (err: unknown) {
    const message =
      (err as { body?: { message: string } })?.body?.message || (err as { message: string })?.message || "Unknown Brevo error";
    // Treat "exists" as success for idempotency
    if (
      typeof message === "string" &&
      message.toLowerCase().includes("exists")
    ) {
      logger.info("Brevo sent message already exists", { email: from });
    }
    logger.error("Brevo send message failed", err);
    // throw new Error(message, { cause: err });
  }
};
