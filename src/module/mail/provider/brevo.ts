import { appConfig } from "@/data/app-config";
import logger from "@/utils/logger";
import type { SendEmailHandler } from "@/module/mail/types/types";
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@getbrevo/brevo";

const { from, replyTo } = appConfig.mails;

const MAIL_PROVIDER_API_KEY = process.env.BREVO_API_KEY || "";

const provider = new TransactionalEmailsApi();
provider.setApiKey(TransactionalEmailsApiApiKeys.apiKey, MAIL_PROVIDER_API_KEY);

export const send: SendEmailHandler = async ({ to, subject, body }) => {
  if (!MAIL_PROVIDER_API_KEY) {
    throw new Error("Missing BREVO_API_KEY env var");
  }

  try {
    const message = new SendSmtpEmail();
    message.subject = subject;
    message.htmlContent = body?.react ?? body?.html;
    message.sender = { name: from, email: from };
    message.to = to.map((t) => ({ email: t.email, name: t.name }));
    message.replyTo = { email: replyTo, name: from };

    await provider
      .sendTransacEmail(message)
      .then((res) => {
        logger.info("Email sent successfully", res);
        console.log("Email sent successfully", res);
        return res;
      })
      .catch((err) => {
        logger.error("Error sending email", err);
        console.error("Error sending email:", err.body);
        throw new Error("Could not send email");
      });
  } catch (err: any) {
    const message =
      (err?.body?.message as string) || err?.message || "Unknown Brevo error";
    // Treat "exists" as success for idempotency
    if (
      typeof message === "string" &&
      message.toLowerCase().includes("exists")
    ) {
      logger.info("Brevo sent message already exists", { email: from });
      console.log("Brevo sent message already exists", { email: from });
      return { ok: true, alreadyExists: true } as const;
    }
    logger.error("Brevo send message failed", err);
    console.error("Brevo send message failed", err);
    throw new Error(message);
  }
};
