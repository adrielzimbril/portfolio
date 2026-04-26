"use client";
import React from "react";
import { DataTable } from "@/components/landlord/components/tables/data-table";
import { useTranslations } from "next-intl";

export function SubmissionsSection() {
  const t = useTranslations("admin.landlord.submissions");
  return (
    <DataTable tableKey="submissions" label={t("label")} detail={t("detail")} />
  );
}
