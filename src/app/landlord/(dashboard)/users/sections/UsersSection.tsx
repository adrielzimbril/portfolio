"use client";
import React from "react";
import { DataTable } from "@/components/landlord/components/tables/data-table";

export function UsersSection() {
  return (
    <DataTable
      tableKey="users"
      label="Users"
      detail="Contacts et comptes enregistrés."
    />
  );
}
