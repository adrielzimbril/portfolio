import { Locale } from "@/integrations/i18n";
import { z } from "zod";

const SendEmailParamsTo = z
  .object({
    email: z.email(),
    name: z.string().optional(),
  })
  .array();

const SendEmailParamsSubject = z.string();
const SendEmailParamsText = z.string();

const SendEmailParamsBody = z.object({
  html: z.string().optional(),
  react: z.string().optional(),
});

export interface SendEmailParams {
  to: z.infer<typeof SendEmailParamsTo>;
  subject: z.infer<typeof SendEmailParamsSubject>;
  text: z.infer<typeof SendEmailParamsText>;
  body?: z.infer<typeof SendEmailParamsBody>;
}

export type SendEmailHandler = (params: SendEmailParams) => Promise<void>;

export interface MailProvider {
  send: SendEmailHandler;
}

export type BaseMailProps = {
  locale: Locale;
  translations: any;
};
