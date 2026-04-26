"use client";
import React from "react";
import { DataTable } from "@/components/landlord/components/tables/data-table";
import { useTranslations } from "next-intl";

export function ReactionsSection() {
  const t = useTranslations("admin.sidebar.items.reactions");

  return (
    <DataTable
      tableKey="reactions"
      label={t("label")}
      detail={t("description")}
    />
  );
}
