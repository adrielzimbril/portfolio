"use client";
import React from "react";
import { DataTable } from "@/components/landlord/components/tables/data-table";

export function HubRequestsTableSection() {
  return (
    <DataTable
      tableKey="hub-requests"
      label="Hub Requests"
      detail="Demandes produits et ressources."
    />
  );
}
