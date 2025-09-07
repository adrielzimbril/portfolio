import { Heading, Text } from "@react-email/components";
import React from "react";
import { createTranslator } from "use-intl/core";
import Wrapper from "@/module/mail/components/Wrapper";
import { defaultTranslations } from "@/module/mail/util/translations";
import { defaultLocale } from "@/module/mail/util/translations";
import type { BaseMailProps } from "@/module/mail/types";

export function NewsletterSignup({ locale, translations }: BaseMailProps) {
  const t = createTranslator({
    locale,
    messages: translations,
  });

  return (
    <Wrapper>
      <Heading className="text-xl">
        {t("mail.newsletterSignup.subject")}
      </Heading>
      <Text>{t("mail.newsletterSignup.body")}</Text>
    </Wrapper>
  );
}

NewsletterSignup.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
};

export default NewsletterSignup;
