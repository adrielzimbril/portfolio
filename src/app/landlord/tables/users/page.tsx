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
    title: t("admin.title") + " - Users",
    description: t("admin.description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function UsersPage() {
  return (
    <>
      <Skeleton name="landlord-users-header" loading={false}>
        <TableSection activeTable="users" />
      </Skeleton>
    </>
  );
}
