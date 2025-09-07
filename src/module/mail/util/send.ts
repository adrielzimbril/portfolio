import { appConfig } from "@/data/app-config";
import logger from "@/utils/logger";
import type { mailTemplates } from "@/module/mail/emails";
import { send } from "@/module/mail/provider";
import type { TemplateId } from "@/module/mail/util/templates";
import { getTemplate } from "@/module/mail/util/templates";

export async function sendEmail<T extends TemplateId>(
  params: {
    to: string;
    locale?: keyof typeof appConfig.i18n.locales;
  } & (
    | {
        templateId: T;
        context: Omit<
          Parameters<(typeof mailTemplates)[T]>[0],
          "locale" | "translations"
        >;
      }
    | {
        subject: string;
        text?: string;
        html?: string;
      }
  )
) {
  const { to, locale = appConfig.i18n.defaultLocale } = params;

  let html: string;
  let text: string;
  let subject: string;

  if ("templateId" in params) {
    const { templateId, context } = params;
    const template = await getTemplate({
      templateId,
      context,
      locale,
    });
    subject = template.subject;
    text = template.text;
    html = template.html;
  } else {
    subject = params.subject;
    text = params.text ?? "";
    html = params.html ?? "";
  }

  try {
    await send({
      to,
      subject,
      text,
      html,
    });
    return true;
  } catch (e) {
    logger.error(e);
    return false;
  }
}
