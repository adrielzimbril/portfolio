import { appConfig } from "@/data/app-config";
import { logger } from "@/utils";
import type { SendEmailHandler } from "@/integrations/mail/types/types";
import { Resend } from "resend";
import { getResendConfig } from "@/config";

const { from, replyTo } = appConfig.mails;

const { apiKey: MAIL_PROVIDER_API_KEY } = getResendConfig();

const provider = new Resend(MAIL_PROVIDER_API_KEY!);

export const send: SendEmailHandler = async ({ to, subject, body }) => {
  if (!MAIL_PROVIDER_API_KEY) {
    throw new Error("Missing RESEND_API_KEY env var");
  }

  try {
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
  } catch (err: unknown) {
    const message =
      (err as { message?: string })?.message || "Unknown Resend error";
    logger.error("Resend send message failed", err);
    throw new Error(message);
  }
};
