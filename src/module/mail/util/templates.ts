import { render } from "@react-email/render";
import { Locale, Messages, getMessagesForLocale } from "@/module/i18n";
import { mailTemplates } from "@/module/mail/emails";

export async function getTemplate<T extends TemplateId>({
  templateId,
  context,
  locale,
}: {
  templateId: T;
  context: Omit<
    Parameters<(typeof mailTemplates)[T]>[0],
    "locale" | "translations"
  >;
  locale: Locale;
}) {
  const template = mailTemplates[templateId];
  const translations = await getMessagesForLocale(locale);

  const email = template({
    ...(context as any),
    locale,
    translations,
  });

  const mailTranslations = translations.mail;
  // Exclure 'common' et 'basic' des clés
  const templateKey = templateId as Exclude<
    keyof typeof mailTranslations,
    "common" | "basic"
  >;
  const templateTranslations = mailTranslations[templateKey];

  const subject =
    templateTranslations && "subject" in templateTranslations
      ? templateTranslations.subject
      : "";

  const react = await render(email);
  const text = await render(email, { plainText: true });
  return { react, text, subject };
}

export type TemplateId = keyof typeof mailTemplates;
