"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminCard, TablePager } from "./AdminPrimitives";
import { dataTableKey, fetchLandlordTable, formatCell, formatDate } from "./admin-utils";
import type { LandlordTableResponse } from "./admin-types";

const pageSize = 10;

export function NewsletterTablePage() {
  const [page, setPage] = useState(1);
  const { data: tableData, isLoading, mutate } = useSWR(
    dataTableKey("newsletter", page, pageSize),
    fetchLandlordTable,
  );

  const rows = tableData?.rows || [];
  const columns = rows[0] ? Object.keys(rows[0]).slice(0, 8) : [];

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Newsletter</h2>
          <p className="mt-1 text-sm text-black/45">Abonnés et sources</p>
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
        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
            <Loader2 size={18} className="animate-spin" />
            Chargement de la table...
          </div>
        ) : rows.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                <thead className="border-b border-black/8 text-xs text-black/45">
                  <tr>
                    {columns.map((column) => (
                      <th key={column} className="px-5 py-4 font-medium">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/6">
                  {rows.map((row, index) => (
                    <tr key={String(row.id || index)} className="hover:bg-black/[0.02]">
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
              count={tableData?.count || 0}
              onPageChange={setPage}
            />
          </>
        ) : (
          <div className="p-6">
            <div className="text-center text-sm text-black/50">
              Aucune donnée dans cette table
            </div>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
