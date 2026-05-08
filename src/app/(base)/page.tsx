import React from "react";
import { HeaderSection } from "@/app/(base)/sections/HeaderSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { ShopListing } from "@/app/(base)/sections/ShopListing";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("shop.title"),
    description: t("shop.description"),
    keywords: t("shop.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("shop.title"),
      description: t("shop.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("shop.title"),
      description: t("shop.description"),
    },
  };

  return metadata;
}

export default function ShopPage() {
  return (
    <>
      <HeaderSection />
      <ShopListing />
    </>
  );
}
