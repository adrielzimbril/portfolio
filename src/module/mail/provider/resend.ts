import { appConfig } from "@/data/app-config";
import logger from "@/utils/logger";
import type { SendEmailHandler } from "@/module/mail/types";

const { from } = appConfig.mails;

export const send: SendEmailHandler = async ({ to, subject, html }) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    logger.error(await response.json());
    throw new Error("Could not send email");
  }
};
