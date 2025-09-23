import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {NewsletterForm} from "./sections/NewsletterForm";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("newsletter.title"),
    description: t("newsletter.description"),
    keywords: t("newsletter.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("newsletter.title"),
      description: t("newsletter.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("newsletter.title"),
      description: t("newsletter.description"),
    },
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
