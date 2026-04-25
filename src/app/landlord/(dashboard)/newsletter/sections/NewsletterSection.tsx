"use client";
import React from "react";
import { DataTable } from "@/components/landlord/components/tables/data-table";

export function NewsletterSection() {
  return (
    <DataTable
      tableKey="newsletter"
      label="Newsletter"
      detail="Abonnés et sources d'inscription."
    />
  );
}
