"use client";
import React, { useMemo, useState } from "react";
import useSWR from "swr";
import {
  RefreshCw,
  Loader2,
  Save,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminCard, TablePager, EmptyState } from "@/components/landlord/components/AdminPrimitives";
import { dataTableKey, fetchLandlordTable } from "@/components/landlord/admin-utils";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { toast } from "@/lib/toast";
import { useTranslations } from "next-intl";

interface ProductLinkRow {
  id: number;
  title: string;
  slug: string;
  private_url: string;
  type: string;
  published: boolean;
}

const pageSize = 10;

export function HubProductLinksSection() {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  
  const swrKey = useMemo(() => dataTableKey("hub-product-links", page, pageSize), [page]);
  
  const {
    data: tableData,
    isLoading,
    mutate,
  } = useSWR(swrKey, fetchLandlordTable);

  const [updatingSlugs, setUpdatingSlugs] = useState<Set<string>>(new Set());
  const [localUrls, setLocalUrls] = useState<Record<string, string>>({});

  const rows = useMemo(() => (tableData?.rows as ProductLinkRow[]) || [], [tableData]);

  const handleUpdate = async (slug: string) => {
    const private_url =
      localUrls[slug] ?? rows.find((r) => r.slug === slug)?.private_url;

    setUpdatingSlugs((prev) => new Set(prev).add(slug));
    try {
      const response = await fetch(landlordApiRoutes.hub.productLinks, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, private_url }),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast.success(`Lien mis à jour pour ${slug}`);
      mutate();
    } catch (error) {
      toast.error(`Erreur lors de la mise à jour de ${slug}`);
    } finally {
      setUpdatingSlugs((prev) => {
        const next = new Set(prev);
        next.delete(slug);
        return next;
      });
    }
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            Hub Product Links
          </h2>
          <p className="mt-1 text-sm text-black/45">
            Gérer les liens privés envoyés par mail pour chaque ressource du Hub.
          </p>
        </div>
        <Button variant="outline" asIcon asPointer onClick={() => mutate()}>
          <RefreshCw size={16} />
          Rafraîchir
        </Button>
      </div>

      <AdminCard className="overflow-hidden">
        <div className="flex flex-col h-[600px] xl:h-[calc(100dvh-270px)] overflow-hidden">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center gap-2 text-sm text-black/50">
              <Loader2 size={18} className="animate-spin" />
              Chargement des ressources...
            </div>
          ) : rows.length > 0 ? (
            <>
              <ScrollArea className="flex-1 w-full" scrollbarGutter>
                <div className="min-w-full inline-block align-middle">
                  <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                    <thead className="sticky top-0 z-10 bg-white border-b border-black/8 text-xs text-black/45 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                      <tr>
                        <th className="px-5 py-4 font-medium">Ressource</th>
                        <th className="px-5 py-4 font-medium">Slug</th>
                        <th className="px-5 py-4 font-medium">
                          Lien Privé (Email)
                        </th>
                        <th className="px-5 py-4 font-medium w-32 text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/6">
                      {rows.map((row) => {
                        const isUpdating = updatingSlugs.has(row.slug);
                        const currentValue =
                          localUrls[row.slug] ?? row.private_url;
                        const hasChanged =
                          localUrls[row.slug] !== undefined &&
                          localUrls[row.slug] !== row.private_url;

                        return (
                          <tr
                            key={row.slug}
                            className="hover:bg-black/[0.02] transition-colors group"
                          >
                            <td className="px-5 py-4">
                              <div className="font-medium text-black/85">
                                {row.title}
                              </div>
                              <div className="text-xs text-black/40 capitalize">
                                {t.has(`common.page-sections.hub.base.resources-type.${row.type}.title`)
                                  ? t(`common.page-sections.hub.base.resources-type.${row.type}.title`)
                                  : row.type}
                              </div>
                            </td>
                            <td className="px-5 py-4 font-mono text-xs text-black/50">
                              {row.slug}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <Input
                                  value={currentValue}
                                  onChange={(e) =>
                                    setLocalUrls((prev) => ({
                                      ...prev,
                                      [row.slug]: e.target.value,
                                    }))
                                  }
                                  placeholder="https://docs.google.com/..."
                                  className="text-sm border-black/8 focus-visible:ring-black/10 h-9"
                                  disabled={isUpdating}
                                />
                              </div>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <Button
                                variant={hasChanged ? "default" : "outline"}
                                size="xs"
                                asIcon
                                asPointer
                                disabled={!hasChanged || isUpdating}
                                onClick={() => handleUpdate(row.slug)}
                                className="ml-auto"
                              >
                                {isUpdating ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : hasChanged ? (
                                  <Save size={14} />
                                ) : (
                                  <Check size={14} className="text-emerald-500" />
                                )}
                                <span>
                                  {isUpdating
                                    ? "..."
                                    : hasChanged
                                      ? "Sauvegarder"
                                      : "À jour"}
                                </span>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
              <div className="shrink-0 bg-white/50 backdrop-blur-sm px-1 py-1 border-t border-black/5">
                <TablePager
                  page={page}
                  pageSize={pageSize}
                  count={tableData?.count || 0}
                  onPageChange={setPage}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6">
              <EmptyState
                icon={AlertCircle}
                title="Aucune ressource trouvée"
                description="Vérifiez vos content collections ou contactez l'admin."
              />
            </div>
          )}
        </div>
      </AdminCard>
    </div>
  );
}
