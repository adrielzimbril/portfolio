import React from "react";
import { createTranslator } from "use-intl/core";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";
import { defaultTranslations } from "@/module/mail/util/translations";
import { defaultLocale } from "@/module/mail/util/translations";
import type { BaseMailProps } from "@/module/mail/types/types";
import { getResourceAskUrl } from "@/utils";

export function NewsletterSignup({
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
      <Head />
      <Preview>{t("mail.newsletter-signup.preview")}</Preview>
      <Tailwind>
        <Body className="bg-[#f5f5f5] font-sans">
          <Container className="max-w-[600px] my-0 mx-auto bg-white">
            {/* Simple Header */}
            <Section className="px-10 pt-10 pb-5 bg-white">
              <Heading
                as="h1"
                className="text-2xl font-medium leading-tight text-[#1a1a1a] mb-2"
              >
                {t("mail.newsletter-signup.greeting", { firstName })} 👋
              </Heading>
              <Text className="text-[#666666] text-base m-0">
                {t("mail.newsletter-signup.tagline")}
              </Text>
            </Section>

            {/* Story Content */}
            <Section className="px-10 pb-10 bg-white">
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.newsletter-signup.story.intro")}
              </Text>
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.newsletter-signup.story.presentation")}
              </Text>
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.newsletter-signup.story.philosophy")}
              </Text>
              <Hr className="border-t border-[#e0e0e0] my-8" />
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                <strong>{t("mail.newsletter-signup.content.title")}</strong>
              </Text>
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.newsletter-signup.content.subtitle")}
              </Text>
              <Section className="my-6">
                <Text className="text-[#555555] text-sm leading-relaxed mb-1.5 font-normal">
                  → {t("mail.newsletter-signup.content.item1")}
                </Text>
                <Text className="text-[#555555] text-sm leading-relaxed mb-1.5 font-normal">
                  → {t("mail.newsletter-signup.content.item2")}
                </Text>
                <Text className="text-[#555555] text-sm leading-relaxed mb-1.5 font-normal">
                  → {t("mail.newsletter-signup.content.item3")}
                </Text>
                <Text className="text-[#555555] text-sm leading-relaxed mb-1.5 font-normal">
                  → {t("mail.newsletter-signup.content.item4")}
                </Text>
              </Section>
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.newsletter-signup.content.conclusion")}
              </Text>
              <Hr className="border-t border-[#e0e0e0] my-8" />
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                <strong>{t("mail.newsletter-signup.why.title")}</strong>
              </Text>
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.newsletter-signup.why.reason")}
              </Text>
              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.newsletter-signup.why.motivation")}
              </Text>
              <Hr className="border-t border-[#e0e0e0] my-8" />

              {/* Simple CTA */}
              <Section className="text-center my-8 bg-[#fafafa] p-6 rounded-2xl border border-[#f0f0f0]">
                <Text className="text-[#333333] text-base leading-relaxed mb-5">
                  <strong>{t("mail.newsletter-signup.cta.title")}</strong>
                </Text>

                <Text className="text-[#333333] text-base leading-relaxed mb-5">
                  {t("mail.newsletter-signup.cta.description")}
                </Text>

                <Link
                  href={getResourceAskUrl("guide-gratuit")}
                  className="bg-[#1a1a1a] text-white font-medium py-3 px-8 rounded-2xl text-base no-underline inline-block"
                >
                  → {t("mail.newsletter-signup.cta.button")}
                </Link>

                <Text className="text-[#777777] text-sm mt-4 italic">
                  {t("mail.newsletter-signup.cta.note")}
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

NewsletterSignup.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
  name: "John Doe",
};

export default NewsletterSignup;
