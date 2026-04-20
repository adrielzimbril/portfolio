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
    title: t("admin.title") + " - Hub Requests",
    description: t("admin.description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function HubRequestsPage() {
  return (
    <>
      <Skeleton name="landlord-hubrequests-header" loading={false}>
        <TableSection activeTable="hubRequests" />
      </Skeleton>
    </>
  );
}
