"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { RefreshCw, Loader2, Link as LinkIcon, Save, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminCard } from "@/landlord/components/AdminPrimitives";
import { fetchLandlordTable } from "@/landlord/components/admin-utils";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { toast } from "sonner";

interface ProductLinkRow {
  id: number;
  title: string;
  slug: string;
  private_url: string;
  type: string;
  published: boolean;
}

export function HubProductLinksSection() {
  const {
    data: tableData,
    isLoading,
    mutate,
  } = useSWR(landlordApiRoutes.hub.productLinks, fetchLandlordTable);

  const [updatingSlugs, setUpdatingSlugs] = useState<Set<string>>(new Set());
  const [localUrls, setLocalUrls] = useState<Record<string, string>>({});

  const rows = (tableData?.rows as ProductLinkRow[]) || [];

  const handleUpdate = async (slug: string) => {
    const private_url = localUrls[slug] ?? rows.find((r) => r.slug === slug)?.private_url;

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
        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
            <Loader2 size={18} className="animate-spin" />
            Chargement des ressources...
          </div>
        ) : rows.length ? (
          <div className="flex flex-col h-[600px] xl:h-[calc(100dvh-270px)] overflow-hidden">
            <ScrollArea className="flex-1 w-full" scrollbarGutter>
              <div className="min-w-full inline-block align-middle">
                <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-white border-b border-black/8 text-xs text-black/45 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                    <tr>
                      <th className="px-5 py-4 font-medium">Ressource</th>
                      <th className="px-5 py-4 font-medium">Slug</th>
                      <th className="px-5 py-4 font-medium">Lien Privé (Email)</th>
                      <th className="px-5 py-4 font-medium w-32 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/6">
                    {rows.map((row) => {
                      const isUpdating = updatingSlugs.has(row.slug);
                      const currentValue = localUrls[row.slug] ?? row.private_url;
                      const hasChanged = localUrls[row.slug] !== undefined && localUrls[row.slug] !== row.private_url;

                      return (
                        <tr
                          key={row.slug}
                          className="hover:bg-black/[0.02] transition-colors group"
                        >
                          <td className="px-5 py-4">
                            <div className="font-medium text-black/85">{row.title}</div>
                            <div className="text-xs text-black/40 capitalize">{row.type.replace("_", " ")}</div>
                          </td>
                          <td className="px-5 py-4 font-mono text-xs text-black/50">
                            {row.slug}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <LinkIcon size={14} className="shrink-0 text-black/30" />
                              <Input
                                value={currentValue}
                                onChange={(e) => setLocalUrls(prev => ({ ...prev, [row.slug]: e.target.value }))}
                                placeholder="https://docs.google.com/..."
                                className="h-9 text-sm border-black/8 focus-visible:ring-black/10"
                                disabled={isUpdating}
                              />
                            </div>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <Button
                              variant={hasChanged ? "primary" : "outline"}
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
                              <span>{isUpdating ? "..." : hasChanged ? "Sauver" : "À jour"}</span>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex flex-col items-center gap-3 text-center text-sm text-black/50">
              <AlertCircle size={32} />
              <div>
                <p className="font-medium">Aucune ressource trouvée</p>
                <p className="text-xs">
                  Vérifiez vos content collections.
                </p>
              </div>
            </div>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
