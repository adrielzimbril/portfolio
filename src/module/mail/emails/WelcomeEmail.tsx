import React from "react";
import { createTranslator } from "use-intl/core";
import Wrapper from "@/module/mail/components/Wrapper";
import { Heading, Text } from "@react-email/components";
import { defaultTranslations } from "@/module/mail/util/translations";
import { defaultLocale } from "@/module/mail/util/translations";
import { BaseMailProps } from "@/module/mail/types/types";

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

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: "#111" }}>
      <h1 style={{ fontSize: 24, margin: "0 0 12px" }}>
        {name ? `Bienvenue, ${name} !` : "Bienvenue !"}
      </h1>
      <p style={{ lineHeight: 1.6 }}>
        Merci de vous être inscrit. Vous recevrez bientôt vos ressources 🎁 et
        des conseils exclusifs.
      </p>
      <p style={{ fontSize: 12, color: "#666" }}>
        Si vous n'êtes pas à l'origine de cette inscription, ignorez ce message.
      </p>
    </div>
  );
}

WelcomeEmail.PreviewProps = {
  locale: defaultLocale,
  translations: defaultTranslations,
};

export default WelcomeEmail;