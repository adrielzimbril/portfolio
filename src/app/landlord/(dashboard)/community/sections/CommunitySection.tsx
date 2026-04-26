"use client";
import React, { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { useLocale, useTranslations } from "next-intl";
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
  TablePager,
} from "@/components/landlord/components/AdminPrimitives";
import { MessageModal, DataDetailsModal } from "@/components/landlord/_modals";
import type { CommunityMessage } from "@/components/landlord/admin-types";
import {
  fetchMessages,
  formatDate,
  formatTime,
  messagesKey,
  normalizeMessage,
} from "@/components/landlord/admin-utils";
import { toast } from "@/lib/toast";
import logger from "@/utils/logger";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CommunitySection() {
  const locale = useLocale();
  const t = useTranslations("admin.landlord.community");
  const tShared = useTranslations("admin.landlord.shared");
  const [search, setSearch] = useState("");
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<CommunityMessage | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<CommunityMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<CommunityMessage | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: tableData,
    isLoading: loading,
  } = useSWR(messagesKey(page, pageSize), fetchMessages);

  const messages = useMemo(() => (tableData?.rows as unknown as CommunityMessage[]) || [], [tableData]);

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter((message) => {
      const normalized = normalizeMessage(message);
      return [
        message.creator_name,
        ...Object.values(normalized),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
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
      toast.success(t("messages.success_deleted"));
      setMessageToDelete(null);
      mutate(messagesKey(page, pageSize));
    } catch (error) {
      logger.error("Failed to delete message:", error);
      toast.error(t("messages.error_delete"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-black/45">
            {t("description")}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            asIcon
            asPointer
            onClick={() => mutate(messagesKey(page, pageSize))}
          >
            <RefreshCw size={16} />
            {tShared("refresh")}
          </Button>
          <Button asIcon asPointer onClick={onOpenCreate}>
            <Plus size={16} />
            {tShared("add")}
          </Button>
        </div>
      </div>

      <AdminCard className="p-4">
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          placeholder={t("placeholders.search")}
        />
      </AdminCard>

      <AdminCard className="overflow-hidden">
        <div className="flex flex-col h-[600px] xl:h-[calc(100dvh-380px)] overflow-hidden">
          {loading ? (
            <div className="flex flex-1 items-center justify-center gap-2 text-sm text-black/50">
              <Loader2 size={18} className="animate-spin" />
              {tShared("loading_data")}
            </div>
          ) : filteredMessages.length > 0 ? (
            <>
              <ScrollArea className="flex-1 w-full" scrollbarGutter>
                <div className="min-w-full inline-block align-middle">
                  <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                    <thead className="sticky top-0 z-10 bg-white border-b border-black/8 text-xs text-black/45 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                      <tr>
                        <th className="px-5 py-4 font-medium">{t("fields.creatorName")}</th>
                        <th className="px-5 py-4 font-medium">{t("fields.messagesByLanguage")}</th>
                        <th className="px-5 py-4 font-medium">{tShared("fields.languages")}</th>
                        <th className="px-5 py-4 font-medium">{tShared("fields.date")}</th>
                        <th className="px-5 py-4 text-right font-medium">{tShared("actions")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/6">
                      {filteredMessages.map((message) => {
                        const normalized = normalizeMessage(message);
                        const entries = Object.entries(normalized);
                        return (
                          <tr key={message.id} className="hover:bg-black/[0.02] transition-colors">
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
                                <div className="min-w-0">
                                  <p className="font-medium truncate">{message.creator_name}</p>
                                  <p className="text-xs text-black/45">
                                    {message.user_id ? t("fields.linked_user") : t("fields.manual_add")}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="grid max-w-xl gap-1">
                                {entries.slice(0, 2).map(([locale, value]) => (
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
                              <div>{formatDate(message.created_at, locale)}</div>
                              <div className="text-xs text-black/35">{formatTime(message.created_at, locale)}</div>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    asPointer
                                    aria-label={tShared("actions")}
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
                                    {t("actions.view_details")}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => onOpenEdit(message)}>
                                    <Pencil size={14} />
                                    {tShared("edit")}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    variant="destructive"
                                    onClick={() => onAskDelete(message)}
                                  >
                                    <Trash2 size={14} />
                                    {tShared("delete")}
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
                icon={MessageSquareText}
                title={t("messages.empty_messages")}
                description={t("messages.empty_messages_desc")}
              />
            </div>
          )}
        </div>
      </AdminCard>

      <MessageModal
        open={messageModalOpen}
        message={editingMessage}
        onOpenChange={(open) => {
          setMessageModalOpen(open);
          if (!open) setEditingMessage(null);
        }}
        onSaved={() => mutate(messagesKey(page, pageSize))}
      />
      <ConfirmDialog
        open={!!messageToDelete}
        title={t("messages.delete_confirm_title")}
        description={t("messages.delete_confirm_desc")}
        confirmLabel={tShared("delete")}
        loading={isDeleting}
        onOpenChange={(open) => !open && setMessageToDelete(null)}
        onConfirm={handleDeleteMessage}
      />

      <DataDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        data={selectedMessage as any}
        title={t("details_title")}
      />
    </div>
  );
}
