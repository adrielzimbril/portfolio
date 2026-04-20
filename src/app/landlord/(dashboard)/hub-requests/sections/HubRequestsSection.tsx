"use client";
import React from "react";
import { DataTable } from "@/landlord/components/tables/data-table";

export function HubRequestsSection() {
  return (
    <DataTable
      tableKey="hubRequests"
      label="Hub Requests"
      detail="Demandes produits soumises via le Hub."
    />
  );
}
