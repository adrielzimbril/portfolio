import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PolicyContent } from "./sections/PolicyContent";
import { Skeleton } from "@/components/ui/skeleton";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("policy.title"),
    description: t("policy.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("policy.title"),
      description: t("policy.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("policy.title"),
      description: t("policy.description"),
    },
  };

  return metadata;
}

export default function Policy() {
  return (
    <Skeleton name="policy-content" loading={false}>
      <PolicyContent />
    </Skeleton>
  );
}
