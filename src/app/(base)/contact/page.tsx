import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "./sections/ContactForm";

export async function generateMetadata() {
  const t = await getTranslations();
  const metadata: Metadata = {
    title: t("contact.title"),
    description: t("contact.description"),
  };
  return metadata;
}

export default function Contact() {
  return <ContactForm />;
}
