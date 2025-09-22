import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "./sections/ContactForm";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("contact.title"),
    description: t("contact.description"),
    keywords: t("contact.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("contact.title"),
      description: t("contact.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("contact.title"),
      description: t("contact.description"),
    },
  };

  return metadata;
}

export default function Contact() {
  return <ContactForm />;
}
