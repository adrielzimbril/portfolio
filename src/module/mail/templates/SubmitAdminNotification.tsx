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
} from "@/module/mail/util/translations";
import type { BaseMailProps } from "@/module/mail/types/types";

export function SubmitAdminNotification({
  locale,
  translations,
  name,
  email,
  intention,
  url,
  description,
  target,
}: BaseMailProps & {
  name: string;
  email: string;
  intention: string;
  url: string;
  description?: string;
  target?: string;
}) {
  const t = createTranslator({ locale, messages: translations });

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
      <Preview>{t("mail.submitAdminNotification.preview")}</Preview>
      <Tailwind>
        <Body className="bg-[#fafaf9] my-8 font-sans">
          <Container className="max-w-[600px] my-0 mx-auto bg-white border border-[#f0f0f0] rounded-xl">
            <Section className="px-10 pt-10 pb-5 bg-white text-center">
              <Heading
                as="h1"
                className="text-2xl font-medium leading-tight text-[#1a1a1a] mb-2"
              >
                {t("mail.submitAdminNotification.subject")} 🧑🏻‍🔬
              </Heading>
            </Section>

            <Section className="px-10 pb-10 bg-white text-left">
              <Text className="text-[#333333] text-base leading-relaxed mb-2">
                <strong>Nom</strong>: {name}
              </Text>
              <Text className="text-[#333333] text-base leading-relaxed mb-2">
                <strong>Email</strong>: {email}
              </Text>
              <Text className="text-[#333333] text-base leading-relaxed mb-2">
                <strong>Intention</strong>: {intention}
              </Text>
              {target && (
                <Text className="text-[#333333] text-base leading-relaxed mb-2">
                  <strong>Type</strong>: {target}
                </Text>
              )}
              <Text className="text-[#333333] text-base leading-relaxed mb-2">
                <strong>Lien</strong>: <Link href={url}>{url}</Link>
              </Text>
              {description && (
                <>
                  <Hr className="border-t border-[#e0e0e0] my-6" />
                  <Text className="text-[#333333] text-base leading-relaxed whitespace-pre-wrap">
                    {description}
                  </Text>
                </>
              )}
            </Section>

            <Section className="p-10 bg-[#f5f5f4]">
              <Hr className="border-t border-[#e0e0e0] mb-6" />
              <Text className="text-sm leading-relaxed text-[#666666] mb-6 text-center">
                {t("mail.common.signature")}
              </Text>
              <Text className="text-[#666666] text-center text-sm leading-relaxed">
                {t("mail.common.contactAdmin")}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

SubmitAdminNotification.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
  name: "John Doe",
  email: "john@example.com",
  intention: "ux_review",
  url: "https://example.com",
  description: "Un peu de contexte sur le projet…",
  target: "website",
};

export default SubmitAdminNotification;
