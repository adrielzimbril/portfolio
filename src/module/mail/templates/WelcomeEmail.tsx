import React from "react";
import { createTranslator } from "use-intl/core";
import {
  Body,
  Container,
  Head,
  Font,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";
import { defaultTranslations } from "@/module/mail/util/translations";
import { defaultLocale } from "@/module/mail/util/translations";
import type { BaseMailProps } from "@/module/mail/types/types";

export function WelcomeEmail({
  locale,
  translations,
  ...props
}: BaseMailProps & { name?: string }) {
  const t = createTranslator({
    locale,
    messages: translations,
  });

  const { name } = props;

  const firstName: string = name?.split(" ")[0] ?? t("mail.common.defaultName");

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Hanken Grotesk"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/hankengrotesk/v12/ieVn2YZDLWuGJpnzaiwFXS9tYtpd59A.woff2",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="medium"
        />
      </Head>
      <Preview>{t("mail.welcome.preview")}</Preview>
      <Tailwind>
        <Body className="bg-[#fafaf9] my-8 font-sans">
          <Container className="max-w-[600px] my-0 mx-auto bg-white border border-[#f0f0f0] rounded-xl">
            {/* Simple Header */}
            <Section className="px-10 pt-10 pb-5 bg-white text-center">
              <Heading
                as="h1"
                className="text-2xl font-medium leading-tight text-[#1a1a1a] mb-2"
              >
                {t("mail.welcome.greeting", { firstName })} 👋
              </Heading>
              <Text className="text-[#666666] text-base m-0">
                {t("mail.welcome.tagline")}
              </Text>
            </Section>

            {/* Welcome Content */}
            <Section className="px-10 pb-10 bg-white">
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.welcome.content.intro")}
              </Text>

              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.welcome.content.nextSteps")}
              </Text>

              <Hr className="border-t border-[#e0e0e0] my-8" />

              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                <strong>
                  {t("mail.welcome.content.whatYouReceive.title")}
                </strong>
              </Text>

              <Section className="my-6">
                <Text className="text-[#555555] text-sm leading-relaxed mb-1.5 font-normal">
                  → {t("mail.welcome.content.whatYouReceive.item1")}
                </Text>
                <Text className="text-[#555555] text-sm leading-relaxed mb-1.5 font-normal">
                  → {t("mail.welcome.content.whatYouReceive.item2")}
                </Text>
                <Text className="text-[#555555] text-sm leading-relaxed mb-1.5 font-normal">
                  → {t("mail.welcome.content.whatYouReceive.item3")}
                </Text>
                <Text className="text-[#555555] text-sm leading-relaxed mb-1.5 font-normal">
                  → {t("mail.welcome.content.whatYouReceive.item4")}
                </Text>
              </Section>

              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.welcome.content.frequency")}
              </Text>

              <Hr className="border-t border-[#e0e0e0] my-8" />

              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                <strong>{t("mail.welcome.question.title")}</strong>
              </Text>

              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.welcome.question.text")}
              </Text>

              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.welcome.question.encouragement")}
              </Text>

              <Hr className="border-t border-[#e0e0e0] my-8" />

              {/* Simple reminder */}
              <Section className="bg-[#fafafa] p-6 rounded-2xl border border-[#f0f0f0] my-6">
                <Text className="text-[#333333] text-base leading-relaxed mb-5">
                  <strong>{t("mail.welcome.reminder.title")}</strong>
                </Text>

                <Text className="text-[#333333] text-base leading-relaxed mb-0">
                  {t("mail.welcome.reminder.text")}
                </Text>
              </Section>
            </Section>

            {/* Simple Footer */}
            <Section className="p-10 bg-[#f5f5f4]">
              <Hr className="border-t border-[#e0e0e0] mb-6" />

              <Text className="text-lg font-medium text-[#1a1a1a] mb-4 text-center">
                {t("mail.common.signature")}
              </Text>

              <Text className="text-sm leading-relaxed text-[#666666] mb-6 text-center">
                {t("mail.common.contact")}
              </Text>

              <Hr className="border-t border-[#e0e0e0] mb-6" />

              <Text className="text-xs text-[#999999] text-center mb-3">
                {t("mail.common.copyright")}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

WelcomeEmail.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
  name: "",
};

export default WelcomeEmail;
