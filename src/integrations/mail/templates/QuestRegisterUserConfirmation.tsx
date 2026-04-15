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
  Link,
} from "@react-email/components";
import {
  defaultTranslations,
  defaultLocale,
} from "@/integrations/mail/util/translations";
import type { BaseMailProps } from "@/integrations/mail/types/types";
import { siteConfig } from "@/data/config";

export function QuestRegisterUserConfirmation({
  locale,
  translations,
  name,
  questTitle,
  challengeUrl,
}: BaseMailProps & {
  name?: string;
  questTitle: string;
  challengeUrl: string;
}) {
  const t = createTranslator({ locale, messages: translations });
  const firstName: string = name?.split(" ")[0] ?? "";

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
      <Preview>{t("mail.questRegisterUserConfirmation.preview")}</Preview>
      <Tailwind>
        <Body className="bg-[#fafaf9] my-8 font-sans">
          <Container className="max-w-[600px] my-0 mx-auto bg-white border border-[#f0f0f0] rounded-xl">
            <Section className="px-10 pt-10 pb-5 bg-white text-center">
              <Heading
                as="h1"
                className="text-2xl font-medium leading-tight text-[#1a1a1a] mb-2"
              >
                {t("mail.questRegisterUserConfirmation.subject")} ?
              </Heading>
            </Section>

            <Section className="px-10 pb-10 bg-white text-left">
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.questRegisterUserConfirmation.greeting", { firstName })}
              </Text>
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.questRegisterUserConfirmation.content.intro", {
                  questTitle,
                })}
              </Text>
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.questRegisterUserConfirmation.content.challengeLinkLabel")}: <Link href={challengeUrl}>{challengeUrl}</Link>
              </Text>
              <Hr className="border-t border-[#e0e0e0] my-8" />
              <Text className="text-[#666666] text-sm leading-relaxed">
                {t("mail.questRegisterUserConfirmation.content.wait")}
              </Text>
            </Section>

            <Section className="p-10 bg-[#f5f5f4]">
              <Hr className="border-t border-[#e0e0e0] mb-6" />
              <Text className="text-sm leading-relaxed text-[#666666] mb-6 text-center">
                {t("mail.common.signature")}
              </Text>
              <Text className="text-[#666666] text-sm leading-relaxed">
                {t("mail.common.contact")}: {" "}
                <Link href={`mailto:${siteConfig.links.contact.email}`}>
                  {siteConfig.links.contact.email}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

QuestRegisterUserConfirmation.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
  name: "Adriel",
  questTitle: "SaaS Landing Breakdown",
  challengeUrl: "https://example.com/quests/saas-landing-breakdown",
};

export default QuestRegisterUserConfirmation;
