import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {NewsletterForm} from "./sections/NewsletterForm";

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    title: t("newsletter.title"),
    description: t("newsletter.description"),
  };

  return metadata;
}

export default async function Newsletter() {

  return (
    <>
      <NewsletterForm />
    </>
  );
};
