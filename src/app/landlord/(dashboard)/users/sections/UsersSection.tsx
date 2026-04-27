"use client";
import React from "react";
import { DataTable } from "@/components/landlord/components/tables/data-table";
import { useTranslations } from "next-intl";

export function UsersSection() {
  const t = useTranslations("admin.sidebar.items.users");

  return (
    <DataTable tableKey="users" label={t("label")} detail={t("description")} />
  );
}
