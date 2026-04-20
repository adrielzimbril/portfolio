import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { Skeleton } from "@/components/ui/skeleton";
import { TableSection } from "@/app/landlord/sections/TableSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("admin.title") + " - Newsletter",
    description: t("admin.description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function NewsletterPage() {
  return (
    <>
      <Skeleton name="landlord-newsletter-header" loading={false}>
        <TableSection activeTable="newsletter" />
      </Skeleton>
    </>
  );
}
