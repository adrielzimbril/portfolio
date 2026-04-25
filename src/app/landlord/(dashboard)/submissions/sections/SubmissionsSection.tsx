"use client";
import React from "react";
import { DataTable } from "@/components/landlord/components/tables/data-table";

export function SubmissionsSection() {
  return (
    <DataTable
      tableKey="submissions"
      label="Submissions"
      detail="Demandes entrantes via le formulaire de contact."
    />
  );
}
