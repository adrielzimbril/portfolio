"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { RefreshCw, Loader2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminCard, TablePager } from "@/landlord/components/AdminPrimitives";
import {
  dataTableKey,
  fetchLandlordTable,
  formatCell,
  formatLabel,
} from "@/landlord/components/admin-utils";

const pageSize = 10;

export function ReactionsTableSection() {
  const [page, setPage] = useState(1);
  const {
    data: tableData,
    isLoading,
    mutate,
  } = useSWR(dataTableKey("reactions", page, pageSize), fetchLandlordTable);

  const rows = tableData?.rows || [];
  const columns = rows[0] ? Object.keys(rows[0]).slice(0, 8) : [];

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            Reactions
          </h2>
          <p className="mt-1 text-sm text-black/45">Engagement contenu</p>
        </div>
        <Button variant="outline" asIcon asPointer onClick={() => mutate()}>
          <RefreshCw size={16} className="mr-2" />
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
          <div className="flex flex-col h-[600px] overflow-hidden">
            <ScrollArea className="flex-1 w-full border-b border-black/5" scrollbarGutter>
              <div className="min-w-full inline-block align-middle">
                <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-white border-b border-black/8 text-xs text-black/45 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                    <tr>
                      {columns.map((column) => (
                        <th key={column} className="px-5 py-4 font-medium">
                          {formatLabel(column)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/6">
                    {rows.map((row, index) => (
                      <tr
                        key={String(row.id || index)}
                        className="hover:bg-black/2 transition-colors"
                      >
                        {columns.map((column) => (
                          <td
                            key={column}
                            className="max-w-64 truncate px-5 py-4"
                          >
                            {formatCell(row[column], column)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
            <div className="shrink-0 bg-white/50 backdrop-blur-sm px-1 py-1">
              <TablePager
                page={page}
                pageSize={pageSize}
                count={tableData?.count || 0}
                onPageChange={setPage}
              />
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex flex-col items-center gap-3 text-center text-sm text-black/50">
              <Heart size={32} />
              <div>
                <p className="font-medium">Aucune donnée</p>
                <p className="text-xs">
                  Cette table ne contient aucune entrée pour le moment.
                </p>
              </div>
            </div>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
