"use client";
import React from "react";
import { DataTable } from "@/components/landlord/components/tables/data-table";
import { useTranslations } from "next-intl";

export function NewsletterSection() {
  const t = useTranslations("admin.landlord.newsletter");
  return (
    <DataTable tableKey="newsletter" label={t("label")} detail={t("detail")} />
  );
}
