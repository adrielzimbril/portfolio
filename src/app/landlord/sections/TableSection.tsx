"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { FileText, Loader2, RefreshCw } from "lucide-react";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Button } from "@/components/ui/button";
import { AdminCard, EmptyState, TablePager } from "@/landlord/components/AdminPrimitives";
import { dataTableKey, fetchLandlordTable, formatDate } from "@/landlord/components/admin-utils";
import type { DataTableKey, LandlordTableResponse } from "@/landlord/components/admin-types";

const pageSize = 10;

function formatCell(value: unknown) {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return formatDate(value);
  }
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function DataTable({
  response,
  page,
  pageSize,
  onPageChange,
}: {
  response?: LandlordTableResponse;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const rows = response?.rows || [];
  const columns = rows[0] ? Object.keys(rows[0]).slice(0, 8) : [];

  if (!rows.length) {
    return (
      <div className="p-6">
        <EmptyState
          icon={FileText}
          title="Aucune donnée"
          description="Cette table ne contient aucune entrée pour le moment."
        />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead className="border-b border-black/8 text-xs text-black/45">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-4 font-medium capitalize">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/6">
            {rows.map((row, index) => (
              <tr
                key={String(row.id || index)}
                className="hover:bg-black/[0.02]"
              >
                {columns.map((column) => (
                  <td key={column} className="max-w-64 truncate px-5 py-4">
                    {formatCell(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePager
        page={page}
        pageSize={pageSize}
        count={response?.count || 0}
        onPageChange={onPageChange}
      />
    </>
  );
}

const tableOptions: Record<DataTableKey, { label: string; detail: string }> = {
  newsletter: { label: "Newsletter", detail: "Abonnés et sources" },
  submissions: { label: "Submit entries", detail: "Demandes entrantes" },
  hubRequests: { label: "Hub requests", detail: "Demandes produits" },
  reactions: { label: "Reactions", detail: "Engagement contenu" },
  users: { label: "Users", detail: "Contacts et comptes" },
};

export function TableSection({ activeTable }: { activeTable: DataTableKey }) {
  const [page, setPage] = useState(1);
  const { data: response, isLoading: loading, mutate } = useSWR(
    dataTableKey(activeTable, page, pageSize),
    fetchLandlordTable,
  );

  const info = tableOptions[activeTable] || { label: activeTable, detail: "" };

  return (
    <SectionBase isWide>
      <div className="grid gap-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">{info.label}</h2>
            <p className="mt-1 text-sm text-black/45">{info.detail}</p>
          </div>
          <Button
            variant="outline"
            asIcon
            asPointer
            onClick={() => mutate()}
          >
            <RefreshCw size={16} />
            Rafraîchir
          </Button>
        </div>
        
        <AdminCard className="overflow-hidden">
          {loading ? (
            <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
              <Loader2 size={18} className="animate-spin" />
              Chargement des données...
            </div>
          ) : (
            <DataTable
              response={response}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          )}
        </AdminCard>
      </div>
    </SectionBase>
  );
}
