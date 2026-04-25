"use client";
import React, { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { Loader2, MessageSquareText, MoreHorizontal, Pencil, Plus, RefreshCw, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import {
  AdminCard,
  ConfirmDialog,
  EmptyState,
  SearchBox,
  StatusPill,
} from "@/components/landlord/components/AdminPrimitives";
import { MessageModal, DataDetailsModal } from "@/components/landlord/components/_modals";
import type { CommunityMessage } from "@/components/landlord/components/admin-types";
import {
  fetchMessages,
  formatDate,
  formatTime,
  normalizeMessage,
} from "@/components/landlord/components/admin-utils";
import { toast } from "@/lib/toast";
import logger from "@/utils/logger";

import { ScrollArea } from "@/components/ui/scroll-area";

export function CommunitySection() {
  const [search, setSearch] = useState("");
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<CommunityMessage | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<CommunityMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<CommunityMessage | null>(null);

  const {
    data: messages = [],
    isLoading: loading,
  } = useSWR(landlordApiRoutes.community.messages, fetchMessages);

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter((message) =>
      [
        message.creator_name,
        message.creator_avatar_url,
        ...Object.values(normalizeMessage(message)),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [search, messages]);

  const onOpenCreate = () => {
    setEditingMessage(null);
    setMessageModalOpen(true);
  };

  const onOpenEdit = (message: CommunityMessage) => {
    setEditingMessage(message);
    setMessageModalOpen(true);
  };

  const onAskDelete = (message: CommunityMessage) => {
    setMessageToDelete(message);
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        landlordApiRoutes.community.messageById(messageToDelete.id),
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error("Failed to delete message");
      toast.success("Message supprimé.");
      setMessageToDelete(null);
      mutate(landlordApiRoutes.community.messages);
    } catch (error) {
      logger.error("Failed to delete message:", error);
      toast.error("Impossible de supprimer le message.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            Mur communautaire
          </h2>
          <p className="mt-1 text-sm text-black/45">
            Messages visibles publiquement, avec édition et confirmation.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            asIcon
            asPointer
            onClick={() => mutate(landlordApiRoutes.community.messages)}
          >
            <RefreshCw size={16} />
            Rafraîchir
          </Button>
          <Button asIcon asPointer onClick={onOpenCreate}>
            <Plus size={16} />
            Ajouter
          </Button>
        </div>
      </div>

      <AdminCard className="p-4">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Rechercher créateur, message, langue..."
        />
      </AdminCard>

      <AdminCard className="overflow-hidden">
        {loading ? (
          <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
            <Loader2 size={18} className="animate-spin" />
            Chargement des messages...
          </div>
        ) : filteredMessages.length ? (
          <div className="flex flex-col max-h-[600px] xl:max-h-[calc(100dvh-270px)]">
            <ScrollArea className="flex-1" scrollbarGutter>
              <div className="min-w-full inline-block align-middle">
                <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-white border-b border-black/8 text-xs text-black/45 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                    <tr>
                      <th className="px-5 py-4 font-medium">Créateur</th>
                      <th className="px-5 py-4 font-medium">Messages</th>
                      <th className="px-5 py-4 font-medium">Langues</th>
                      <th className="px-5 py-4 font-medium">Date</th>
                      <th className="px-5 py-4 text-right font-medium">Action</th>
                    </tr>
                  </thead>
              <tbody className="divide-y divide-black/6">
                {filteredMessages.map((message) => {
                  const entries = Object.entries(normalizeMessage(message));
                  return (
                    <tr key={message.id} className="hover:bg-black/[0.02]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {message.creator_avatar_url ? (
                            <img
                              src={message.creator_avatar_url}
                              alt={message.creator_name}
                              className="size-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex size-10 items-center justify-center rounded-full bg-[#ffed90] text-sm font-semibold">
                              {message.creator_name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{message.creator_name}</p>
                            <p className="text-xs text-black/45">
                              {message.user_id ? "Utilisateur lié" : "Ajout manuel"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="grid max-w-xl gap-1">
                          {(entries as [string, string][]).slice(0, 2).map(([locale, value]) => (
                            <p key={locale} className="truncate text-black/65">
                              <span className="mr-2 text-xs font-semibold uppercase text-black/35">
                                {locale}
                              </span>
                              {value}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {entries.map(([locale]) => (
                            <StatusPill key={locale} tone="neutral">
                              {locale.toUpperCase()}
                            </StatusPill>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-black/55">
                        <div>{formatDate(message.created_at)}</div>
                        <div className="text-xs text-black/35">{formatTime(message.created_at)}</div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              asPointer
                              aria-label="Actions message"
                            >
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedMessage(message);
                                setDetailsOpen(true);
                              }}
                            >
                              <Eye size={14} />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onOpenEdit(message)}>
                              <Pencil size={14} />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => onAskDelete(message)}
                            >
                              <Trash2 size={14} />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
            <EmptyState
              icon={MessageSquareText}
              title="Aucun message"
              description="Aucun message ne correspond à ta recherche."
            />
          </div>
        )}
      </AdminCard>

      <MessageModal
        open={messageModalOpen}
        message={editingMessage}
        onOpenChange={(open) => {
          setMessageModalOpen(open);
          if (!open) setEditingMessage(null);
        }}
        onSaved={() => mutate(landlordApiRoutes.community.messages)}
      />
      <ConfirmDialog
        open={!!messageToDelete}
        title="Supprimer ce message ?"
        description="Cette action retire le message du mur communautaire. Elle ne peut pas être annulée depuis le dashboard."
        confirmLabel="Supprimer"
        loading={isDeleting}
        onOpenChange={(open) => !open && setMessageToDelete(null)}
        onConfirm={handleDeleteMessage}
      />

      <DataDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        data={selectedMessage as any}
        title="Détails du message"
      />
    </div>
  );
}
