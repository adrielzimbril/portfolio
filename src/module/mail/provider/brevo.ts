import { appConfig } from "@/data/app-config";
import logger from "@/utils/logger";
import type { SendEmailHandler } from "@/module/mail/types";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

const { from, replyTo } = appConfig.mails;

const MAIL_PROVIDER_API_KEY = process.env.BREVO_API_KEY || "";

export declare enum TransactionalEmailsApiApiKeys {
  apiKey = 0,
  partnerKey = 1,
}

const provider = new TransactionalEmailsApi();
provider.setApiKey(TransactionalEmailsApiApiKeys.apiKey, MAIL_PROVIDER_API_KEY);

export const send: SendEmailHandler = async ({ to, subject, body }) => {
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
      return res;
    })
    .catch((err) => {
      logger.error("Error sending email", err);
      throw new Error("Could not send email");
    });
};
