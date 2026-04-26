import type { SendEmailHandler } from "@/integrations/mail/types/types";
import { logger } from "@/utils";

export const send: SendEmailHandler = async ({ to, subject, text }) => {
  try {
    // Basic validation
    if (!to) throw new Error("Missing recipient (to)");
    if (!subject) throw new Error("Missing subject");
    if (!text) throw new Error("Missing email content");

    const payload = {
      message: "Email sent successfully",
      to,
      subject,
      text,
      timestamp: new Date().toISOString(),
    };

    // Structured logging (better for debugging/monitoring)
    logger.info("📧 Sending email", payload);
  } catch (error) {
    logger.error("❌ Failed to send email", {
      message: "Email sending failed",
      error: error instanceof Error ? error.message : error,
      to,
      subject,
    });
  }
};
