"use client";
import React from "react";
import { DataTable } from "@/components/landlord/components/tables/data-table";
import { useTranslations } from "next-intl";

export function HubRequestsTableSection() {
  const t = useTranslations("admin.landlord.hub_requests");
  return (
    <DataTable
      tableKey="hub-requests"
      label={t("label")}
      detail={t("detail")}
    />
  );
}
