import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestsSection } from "@/app/landlord/sections/QuestsSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("admin.title") + " - Registrations",
    description: t("admin.description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function RegistrationsPage() {
  return (
    <>
      <Skeleton name="landlord-registrations-header" loading={false}>
        <QuestsSection filterType="register" />
      </Skeleton>
    </>
  );
}
