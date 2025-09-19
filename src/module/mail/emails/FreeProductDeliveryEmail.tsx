import React from "react";
import { createTranslator } from "use-intl/core";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Button,
} from "@react-email/components";
import { freeProductDeliveryStyles } from "./static/styles/FreeProductDeliveryStyles";
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
      <Head />
      <Preview>
        {productTitle} - {t("mail.free-product-delivery.preview")}
      </Preview>
      <Body style={freeProductDeliveryStyles.main}>
        <Container style={freeProductDeliveryStyles.container}>
          {/* Header with greeting */}
          <Section style={freeProductDeliveryStyles.headerSection}>
            <Text style={freeProductDeliveryStyles.greeting}>
              {t("mail.free-product-delivery.greeting", { firstName })} 👋
            </Text>
            <Text style={freeProductDeliveryStyles.intro}>
              {t("mail.free-product-delivery.intro")}
            </Text>
          </Section>

          {/* Product Section */}
          <Section style={freeProductDeliveryStyles.productSection}>
            <Heading
              as="h1"
              style={freeProductDeliveryStyles.productTitleStyle}
            >
              {productTitle}
            </Heading>

            {coverImage && (
              <Img
                src={coverImage}
                alt={productTitle}
                width="100%"
                style={freeProductDeliveryStyles.productImage}
              />
            )}

            {customText && (
              <Text style={freeProductDeliveryStyles.productDescription}>
                {customText}
              </Text>
            )}

            {features && features.length > 0 && (
              <Section style={freeProductDeliveryStyles.featuresSection}>
                <Text style={freeProductDeliveryStyles.featuresTitle}>
                  <strong>
                    {t("mail.free-product-delivery.featuresTitle")}
                  </strong>
                </Text>
                <Section style={freeProductDeliveryStyles.featuresList}>
                  {features.map((feature, index) => (
                    <Text
                      key={index}
                      style={freeProductDeliveryStyles.featureItem}
                    >
                      → {feature}
                    </Text>
                  ))}
                </Section>
              </Section>
            )}

            {productUrl && (
              <Section style={freeProductDeliveryStyles.ctaSection}>
                <Button
                  href={productUrl}
                  style={freeProductDeliveryStyles.ctaButton}
                >
                  {t("mail.free-product-delivery.ctaButton")}
                </Button>
              </Section>
            )}
          </Section>

          {/* Personal touch */}
          <Section style={freeProductDeliveryStyles.personalSection}>
            <Hr style={freeProductDeliveryStyles.divider} />

            <Text style={freeProductDeliveryStyles.paragraph}>
              {t("mail.free-product-delivery.message1")}
            </Text>

            <Text style={freeProductDeliveryStyles.paragraph}>
              {t("mail.free-product-delivery.message2")}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={freeProductDeliveryStyles.footer}>
            <Hr style={freeProductDeliveryStyles.footerDivider} />

            <Text style={freeProductDeliveryStyles.signature}>
              {t("mail.common.signature")}
            </Text>

            <Text style={freeProductDeliveryStyles.footerNote}>
              {t("mail.common.contact")}
            </Text>

            <Hr style={freeProductDeliveryStyles.footerDivider} />

            <Text style={freeProductDeliveryStyles.copyright}>
              {t("mail.common.copyright")}
            </Text>
          </Section>
        </Container>
      </Body>
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
