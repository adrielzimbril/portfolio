import { IntentionForm } from "./sections/IntentionForm";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata() {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("submit.title"),
    description: t("submit.description"),
    keywords: t("submit.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("submit.title"),
      description: t("submit.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("submit.title"),
      description: t("submit.description"),
    },
  };

  return metadata;
}

export default async function ThoughtsSubmitPage() {
  return <IntentionForm />;
}
