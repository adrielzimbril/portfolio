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
import { welcomeStyles } from "./static/styles";
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
      <Head />
      <Preview>{t("mail.welcome.preview")}</Preview>
      <Body style={welcomeStyles.main}>
        <Container style={welcomeStyles.container}>
          {/* Simple Header */}
          <Section style={welcomeStyles.headerSection}>
            <Heading as="h1" style={welcomeStyles.greeting}>
              {t("mail.welcome.greeting", { firstName })} 👋
            </Heading>
            <Text style={welcomeStyles.tagline}>
              {t("mail.welcome.tagline")}
            </Text>
          </Section>

          {/* Welcome Content */}
          <Section style={welcomeStyles.contentSection}>
            <Text style={welcomeStyles.paragraph}>
              {t("mail.welcome.content.intro")}
            </Text>

            <Text style={welcomeStyles.paragraph}>
              {t("mail.welcome.content.nextSteps")}
            </Text>

            <Hr style={welcomeStyles.divider} />

            <Text style={welcomeStyles.paragraph}>
              <strong>{t("mail.welcome.content.whatYouReceive.title")}</strong>
            </Text>

            <Section style={welcomeStyles.listSection}>
              <Text style={welcomeStyles.listItem}>
                → {t("mail.welcome.content.whatYouReceive.item1")}
              </Text>
              <Text style={welcomeStyles.listItem}>
                → {t("mail.welcome.content.whatYouReceive.item2")}
              </Text>
              <Text style={welcomeStyles.listItem}>
                → {t("mail.welcome.content.whatYouReceive.item3")}
              </Text>
              <Text style={welcomeStyles.listItem}>
                → {t("mail.welcome.content.whatYouReceive.item4")}
              </Text>
            </Section>

            <Text style={welcomeStyles.paragraph}>
              {t("mail.welcome.content.frequency")}
            </Text>

            <Hr style={welcomeStyles.divider} />

            <Text style={welcomeStyles.paragraph}>
              <strong>{t("mail.welcome.question.title")}</strong>
            </Text>

            <Text style={welcomeStyles.paragraph}>
              {t("mail.welcome.question.text")}
            </Text>

            <Text style={welcomeStyles.paragraph}>
              {t("mail.welcome.question.encouragement")}
            </Text>

            <Hr style={welcomeStyles.divider} />

            {/* Simple reminder */}
            <Section style={welcomeStyles.reminderSection}>
              <Text style={welcomeStyles.paragraph}>
                <strong>{t("mail.welcome.reminder.title")}</strong>
              </Text>

              <Text style={welcomeStyles.paragraph}>
                {t("mail.welcome.reminder.text")}
              </Text>
            </Section>
          </Section>

          {/* Simple Footer */}
          <Section style={welcomeStyles.footer}>
            <Hr style={welcomeStyles.footerDivider} />

            <Text style={welcomeStyles.signature}>
              {t("mail.common.signature")}
            </Text>

            <Text style={welcomeStyles.footerNote}>
              {t("mail.common.contact")}
            </Text>

            <Hr style={welcomeStyles.footerDivider} />

            <Text style={welcomeStyles.copyright}>
              {t("mail.common.copyright")}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

WelcomeEmail.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
  name: "",
};

export default WelcomeEmail;
