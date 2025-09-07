import { appConfig } from "@/data/app-config";
import type { SendEmailHandler } from "@/module/mail/types";

const { from } = appConfig.mails;

// biome-ignore lint/correctness/noUnusedFunctionParameters: This is to understand the available parameters
export const send: SendEmailHandler = async ({ to, subject, text, html }) => {
  // handle your custom email sending logic here
};
