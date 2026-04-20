"use client";
import React from "react";
import { DataTable } from "@/landlord/components/tables/data-table";

export function ReactionsSection() {
  return (
    <DataTable
      tableKey="reactions"
      label="Reactions"
      detail="Engagement et réactions sur les contenus du site."
    />
  );
}
