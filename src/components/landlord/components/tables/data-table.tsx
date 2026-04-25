"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { FileText, Loader2, RefreshCw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminCard, EmptyState, TablePager } from "@/components/landlord/components/AdminPrimitives";
import { DataDetailsModal } from "@/components/landlord/_modals/DataDetailsModal";
import { dataTableKey, fetchLandlordTable, formatCell, formatLabel } from "@/components/landlord/admin-utils";
import type { DataTableKey, LandlordTableResponse } from "@/components/landlord/admin-types";

const PAGE_SIZE = 10;


function DataRows({
  response,
  page,
  onPageChange,
}: {
  response?: LandlordTableResponse;
  page: number;
  onPageChange: (page: number) => void;
}) {
  const rows = response?.rows || [];
  const columns = rows[0] ? Object.keys(rows[0]).slice(0, 8) : [];

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);

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

  const onViewDetails = (row: Record<string, any>) => {
    setSelectedRow(row);
    setDetailsOpen(true);
  };

  return (
    <div className="flex flex-col h-[600px] xl:h-[calc(100dvh-270px)] overflow-hidden">
      <ScrollArea className="flex-1 w-full border-b border-black/5" scrollbarGutter>
        <div className="min-w-full inline-block align-middle">
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead className="sticky top-0 z-10 bg-white border-b border-black/8 text-xs text-black/45 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-5 py-4 font-medium capitalize">
                    {formatLabel(column)}
                  </th>
                ))}
                <th className="px-5 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/6">
              {rows.map((row, index) => (
                <tr
                  key={String(row.id || index)}
                  className="hover:bg-black/2 transition-colors group"
                >
                  {columns.map((column) => (
                    <td key={column} className="max-w-64 truncate px-5 py-4">
                      {formatCell(row[column], column)}
                    </td>
                  ))}
                  <td className="px-5 py-4 text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      asPointer
                      onClick={() => onViewDetails(row as Record<string, any>)}
                      className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
      <div className="shrink-0 bg-white/50 backdrop-blur-sm px-1 py-1">
        <TablePager
          page={page}
          pageSize={PAGE_SIZE}
          count={response?.count || 0}
          onPageChange={onPageChange}
        />
      </div>

      <DataDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        data={selectedRow}
      />
    </div>
  );
}

export function DataTable({
  tableKey,
  label,
  detail,
}: {
  tableKey: DataTableKey;
  label: string;
  detail: string;
}) {
  const [page, setPage] = useState(1);
  const { data: response, isLoading: loading, mutate } = useSWR(
    dataTableKey(tableKey, page, PAGE_SIZE),
    fetchLandlordTable,
  );

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">{label}</h2>
          <p className="mt-1 text-sm text-black/45">{detail}</p>
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
          <DataRows
            response={response}
            page={page}
            onPageChange={setPage}
          />
        )}
      </AdminCard>
    </div>
  );
}
