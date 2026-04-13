import React from "react";
import { createTranslator } from "use-intl/core";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Button,
  Tailwind,
  Font,
} from "@react-email/components";
import { defaultTranslations } from "@/module/mail/util/translations";
import { defaultLocale } from "@/module/mail/util/translations";
import type { BaseMailProps } from "@/module/mail/types/types";

export function FreeProductDeliveryEmail({
  locale,
  translations,
  ...props
}: BaseMailProps & {
  name?: string;
  productTitle: string;
  features?: string[];
  coverImage?: string;
  productUrl?: string;
  customText?: string;
}) {
  const t = createTranslator({
    locale,
    messages: translations,
  });

  const {
    name,
    productTitle,
    features = [],
    coverImage,
    productUrl,
    customText,
  } = props;

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
      <Preview>
        {productTitle} - {t("mail.freeProductDelivery.preview")}
      </Preview>
      <Tailwind>
        <Body className="bg-[#fafaf9] my-8 font-sans">
          <Container className="max-w-[600px] my-0 mx-auto bg-white border border-[#f0f0f0] rounded-xl">
            {/* Header with greeting */}
            <Section className="px-10 pt-10 pb-5 bg-white text-center">
              <Text className="text-2xl font-medium leading-tight text-[#1a1a1a] mb-2">
                {t("mail.freeProductDelivery.greeting", { firstName })} 👋
              </Text>
              <Text className="text-[#666666] text-base m-0">
                {t("mail.freeProductDelivery.intro")}
              </Text>
            </Section>

            {/* Product Section */}
            <Section className="p-5 bg-white">
              <Heading
                as="h1"
                className="text-2xl font-medium leading-tight text-[#1a1a1a] text-center mb-5"
              >
                {productTitle}
              </Heading>

              {coverImage && (
                <Img
                  src={coverImage}
                  alt={productTitle}
                  width="100%"
                  className="w-full max-h-[360px] object-cover rounded-xl my-5 border border-[#f0f0f0]"
                />
              )}

              {customText && (
                <Text className="text-[#333333] text-base leading-relaxed mb-6">
                  {customText}
                </Text>
              )}

              {features && features.length > 0 && (
                <Section className="text-center my-6">
                  <Text className="text-[#333333] text-base leading-relaxed mb-3">
                    <strong>
                      {t("mail.freeProductDelivery.featuresTitle")}
                    </strong>
                  </Text>
                  <Section className="my-3">
                    {features.map((feature, index) => (
                      <Text
                        key={index}
                        className="text-[#555555] text-sm leading-relaxed mb-1.5 font-normal"
                      >
                        → {feature}
                      </Text>
                    ))}
                  </Section>
                </Section>
              )}

              {productUrl && (
                <Section className="text-center my-8">
                  <Button
                    href={productUrl}
                    className="bg-[#1a1a1a] text-white text-base font-medium py-3.5 px-7 rounded-2xl no-underline inline-block border-none"
                  >
                    {t("mail.freeProductDelivery.ctaButton")}
                  </Button>
                </Section>
              )}
            </Section>

            {/* Personal touch */}
            <Section className="p-5 bg-white">
              <Hr className="border-t border-[#e0e0e0] my-8" />

              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.freeProductDelivery.message1")}
              </Text>

              <Text className="text-[#333333] text-base leading-relaxed mb-5">
                {t("mail.freeProductDelivery.message2")}
              </Text>
            </Section>

            {/* Footer */}
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

FreeProductDeliveryEmail.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
  name: "",
  productTitle: "",
  features: [],
  coverImage: "",
  productUrl: "",
  customText: "",
};

export default FreeProductDeliveryEmail;
