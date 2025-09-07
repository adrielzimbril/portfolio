import { Locale } from "@/module/i18n";

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  text: string;
  body?: {
    html?: string;
    react?: string;
  };
}

export type SendEmailHandler = (params: SendEmailParams) => Promise<void>;

export interface MailProvider {
  send: SendEmailHandler;
}

export type BaseMailProps = {
  locale: Locale;
  translations: any;
};
