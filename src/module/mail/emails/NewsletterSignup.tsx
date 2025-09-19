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
} from "@react-email/components";
import { newsletterSignupStyles as styles } from "./static/styles";
import { defaultTranslations } from "@/module/mail/util/translations";
import { defaultLocale } from "@/module/mail/util/translations";
import type { BaseMailProps } from "@/module/mail/types/types";

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
      <Body style={styles.main}>
        <Container style={styles.container}>
          {/* Simple Header */}
          <Section style={styles.headerSection}>
            <Heading as="h1" style={styles.greeting}>
              {t("mail.newsletter-signup.greeting", {
                firstName,
              })}{" "}
              👋
            </Heading>
            <Text style={styles.tagline}>
              {t("mail.newsletter-signup.tagline")}
            </Text>
          </Section>

          {/* Story Content */}
          <Section style={styles.contentSection}>
            <Text style={styles.paragraph}>
              {t("mail.newsletter-signup.story.intro")}
            </Text>
            <Text style={styles.paragraph}>
              {t("mail.newsletter-signup.story.presentation")}
            </Text>
            <Text style={styles.paragraph}>
              {t("mail.newsletter-signup.story.philosophy")}
            </Text>
            <Hr style={styles.divider} />
            <Text style={styles.paragraph}>
              <strong>{t("mail.newsletter-signup.content.title")}</strong>
            </Text>
            <Text style={styles.paragraph}>
              {t("mail.newsletter-signup.content.subtitle")}
            </Text>
            <Section style={styles.listSection}>
              <Text style={styles.listItem}>
                → {t("mail.newsletter-signup.content.item1")}
              </Text>
              <Text style={styles.listItem}>
                → {t("mail.newsletter-signup.content.item2")}
              </Text>
              <Text style={styles.listItem}>
                → {t("mail.newsletter-signup.content.item3")}
              </Text>
              <Text style={styles.listItem}>
                → {t("mail.newsletter-signup.content.item4")}
              </Text>
            </Section>
            <Text style={styles.paragraph}>
              {t("mail.newsletter-signup.content.conclusion")}
            </Text>
            <Hr style={styles.divider} />
            <Text style={styles.paragraph}>
              <strong>{t("mail.newsletter-signup.why.title")}</strong>
            </Text>
            <Text style={styles.paragraph}>
              {t("mail.newsletter-signup.why.reason")}
            </Text>
            <Text style={styles.paragraph}>
              {t("mail.newsletter-signup.why.motivation")}
            </Text>
            <Hr style={styles.divider} />
            {/* Simple CTA */}
            <Section style={styles.ctaSection}>
              <Text style={styles.paragraph}>
                <strong>{t("mail.newsletter-signup.cta.title")}</strong>
              </Text>

              <Text style={styles.paragraph}>
                {t("mail.newsletter-signup.cta.description")}
              </Text>

              <Link
                href="https://adrielzimbril.com/guide-gratuit"
                style={styles.ctaLink}
              >
                → {t("mail.newsletter-signup.cta.button")}
              </Link>

              <Text style={styles.ctaNote}>
                {t("mail.newsletter-signup.cta.note")}
              </Text>
            </Section>
          </Section>

          {/* Simple Footer */}
          <Section style={styles.footer}>
            <Hr style={styles.footerDivider} />

            <Text style={styles.signature}>{t("mail.common.signature")}</Text>

            <Text style={styles.footerNote}>{t("mail.common.contact")}</Text>

            <Hr style={styles.footerDivider} />

            <Text style={styles.copyright}>{t("mail.common.copyright")}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

NewsletterSignup.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
  name: "John Doe",
};

export default NewsletterSignup;
