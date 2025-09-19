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
import { productDeliveryStyles } from "./static/styles";
import { defaultTranslations } from "@/module/mail/util/translations";
import { defaultLocale } from "@/module/mail/util/translations";
import type { BaseMailProps } from "@/module/mail/types/types";

export function ProductDeliveryEmail({
  locale,
  translations,
  ...props
}: BaseMailProps & {
  name?: string;
  productTitle: string;
  productType: "formation" | "masterclass" | "ebook";
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
    productType,
    features = [],
    coverImage,
    productUrl,
    customText,
  } = props;
  const firstName: string = name?.split(" ")[0] ?? t("mail.common.defaultName");

  const getProductTypeMessage = (type: string) => {
    return {
      intro: t(`productDelivery.productTypes.${type}.intro`),
      access: t(`productDelivery.productTypes.${type}.access`),
      feedback: t(`productDelivery.productTypes.${type}.feedback`),
      tip: t(`productDelivery.productTypes.${type}.tip`),
    };
  };

  const typeMessages = getProductTypeMessage(productType);

  return (
    <Html>
      <Head />
      <Preview>{t("mail.product-delivery.preview", { productType })}</Preview>
      <Body style={productDeliveryStyles.main}>
        <Container style={productDeliveryStyles.container}>
          {/* Header with greeting */}
          <Section style={productDeliveryStyles.headerSection}>
            <Text style={productDeliveryStyles.greeting}>
              {t("mail.product-delivery.greeting", { firstName })} 👋
            </Text>
            <Text style={productDeliveryStyles.intro}>
              {typeMessages.intro}
            </Text>
          </Section>

          {/* Product Section */}
          <Section style={productDeliveryStyles.productSection}>
            <Heading as="h1" style={productDeliveryStyles.productTitle}>
              {productTitle}
            </Heading>

            {coverImage && (
              <Img
                src={coverImage}
                alt={productTitle}
                width="100%"
                style={productDeliveryStyles.productImage}
              />
            )}

            {customText && (
              <Text style={productDeliveryStyles.productDescription}>
                {customText}
              </Text>
            )}

            {features && features.length > 0 && (
              <Section style={productDeliveryStyles.featuresSection}>
                <Text style={productDeliveryStyles.featureTitle}>
                  <strong>{t("mail.product-delivery.featuresTitle")}</strong>
                </Text>
                <Section style={productDeliveryStyles.featureList}>
                  {features.map((feature, index) => (
                    <Text key={index} style={productDeliveryStyles.featureItem}>
                      → {feature}
                    </Text>
                  ))}
                </Section>
              </Section>
            )}

            {productUrl && (
              <Section style={productDeliveryStyles.ctaSection}>
                <Button
                  href={productUrl}
                  style={productDeliveryStyles.ctaButton}
                >
                  {typeMessages.access}
                </Button>
              </Section>
            )}
          </Section>

          {/* Personal touch with feedback request */}
          <Section style={productDeliveryStyles.personalSection}>
            <Hr style={productDeliveryStyles.divider} />

            <Text style={productDeliveryStyles.paragraph}>
              <strong>{t("mail.product-delivery.thankYou")}</strong>
            </Text>

            <Text style={productDeliveryStyles.paragraph}>
              {t("mail.product-delivery.message1")}
            </Text>

            <Text style={productDeliveryStyles.tipText}>
              {typeMessages.tip}
            </Text>

            <Text style={productDeliveryStyles.paragraph}>
              {typeMessages.feedback}
            </Text>

            <Text style={productDeliveryStyles.paragraph}>
              {t("mail.product-delivery.message2")}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={productDeliveryStyles.footer}>
            <Hr style={productDeliveryStyles.footerDivider} />

            <Text style={productDeliveryStyles.signature}>
              {t("mail.common.signature")}
            </Text>

            <Text style={productDeliveryStyles.footerNote}>
              {t("mail.common.contact")}
            </Text>

            <Hr style={productDeliveryStyles.footerDivider} />

            <Text style={productDeliveryStyles.copyright}>
              {t("mail.common.copyright")}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

ProductDeliveryEmail.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
  name: "",
  productTitle: "",
  productType: "formation",
  features: [],
  coverImage: "",
  productUrl: "",
  customText: "",
};

export default ProductDeliveryEmail;
