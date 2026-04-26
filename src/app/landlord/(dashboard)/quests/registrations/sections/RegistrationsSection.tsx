"use client";
import React, { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import useSWR, { mutate } from "swr";
import {
  Filter,
  Loader2,
  Mail,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Users,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AdminCard,
  EmptyState,
  SearchBox,
  StatusPill,
  TablePager,
} from "@/components/landlord/components/AdminPrimitives";
import {
  ParticipantModal,
  DataDetailsModal,
} from "@/components/landlord/_modals";
import {
  fetchParticipants,
  fetchQuests,
  formatDate,
  formatTime,
  registrationsKey,
  deleteParticipant,
} from "@/components/landlord/admin-utils";
import type { Participant } from "@/components/landlord/admin-types";
import { toast } from "@/lib/toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RegistrationsSection() {
  const locale = useLocale();
  const t = useTranslations("admin.landlord.quests");
  const tShared = useTranslations("admin.landlord.shared");
  const [search, setSearch] = useState("");
  const [selectedQuest, setSelectedQuest] = useState("all");
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: quests = [] } = useSWR("landlord-quests", fetchQuests);

  const { data: tableData, isLoading: loading } = useSWR(
    registrationsKey(selectedQuest, page, pageSize),
    fetchParticipants,
  );

  const participants = useMemo(
    () => (tableData?.rows as unknown as Participant[]) || [],
    [tableData],
  );

  const filteredParticipants = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return participants;
    return participants.filter((participant) =>
      [
        participant.name,
        participant.email,
        participant.challenge_slug,
        participant.status,
        participant.meta?.source,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [search, participants]);

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            {t("registrations.title")}
          </h2>
          <p className="mt-1 text-sm text-black/45">
            {t("registrations.subtitle")}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            asIcon
            asPointer
            onClick={() =>
              mutate(registrationsKey(selectedQuest, page, pageSize))
            }
          >
            <RefreshCw size={16} />
            {t("actions.refresh")}
          </Button>
          <Button
            asIcon
            asPointer
            onClick={() => {
              setSelectedParticipant(null);
              setParticipantModalOpen(true);
            }}
          >
            <Plus size={16} />
            {t("actions.add")}
          </Button>
        </div>
      </div>

      <AdminCard className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchBox
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder={t("placeholders.search")}
          />
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-black/35" />
            <Select
              value={selectedQuest}
              onValueChange={(v) => {
                setSelectedQuest(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-10 w-full min-w-56 bg-white text-sm md:w-72">
                <SelectValue placeholder={t("placeholders.all_quests")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("placeholders.all_quests")}</SelectItem>
                {quests.map((quest) => (
                  <SelectItem key={quest.slug} value={quest.slug}>
                    {quest.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </AdminCard>

      <AdminCard className="overflow-hidden">
        <div className="flex flex-col h-[600px] xl:h-[calc(100dvh-380px)] overflow-hidden">
          {loading ? (
            <div className="flex flex-1 items-center justify-center gap-2 text-sm text-black/50">
              <Loader2 size={18} className="animate-spin" />
              {t("messages.loading_participants")}
            </div>
          ) : filteredParticipants.length > 0 ? (
            <>
              <ScrollArea className="flex-1 w-full" scrollbarGutter>
                <div className="min-w-full inline-block align-middle">
                  <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                    <thead className="sticky top-0 z-10 bg-white border-b border-black/8 text-xs text-black/45 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                      <tr>
                        <th className="px-5 py-4 font-medium">{t("fields.participant")}</th>
                        <th className="px-5 py-4 font-medium">{t("fields.quest")}</th>
                        <th className="px-5 py-4 font-medium">{t("fields.status")}</th>
                        <th className="px-5 py-4 font-medium">{t("fields.date")}</th>
                        <th className="px-5 py-4 text-right font-medium">
                          {tShared("actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/6">
                      {filteredParticipants.map((participant) => (
                        <tr
                          key={participant.id}
                          className="hover:bg-black/2 transition-colors"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex size-10 items-center justify-center rounded-full bg-[#ffed90] text-sm font-semibold">
                                {participant.name?.charAt(0)?.toUpperCase() ||
                                  "?"}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate font-medium">
                                  {participant.name}
                                </p>
                                <p className="truncate text-xs text-black/45">
                                  {participant.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="max-w-60 truncate text-black/70">
                              {participant.challenge_slug}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <StatusPill tone="warning">{t("fields.participant")}</StatusPill>
                          </td>
                          <td className="px-5 py-4 text-black/55">
                            <div>{formatDate(participant.created_at, locale)}</div>
                            <div className="text-xs text-black/35">
                              {formatTime(participant.created_at, locale)}
                            </div>
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
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedParticipant(participant);
                                    setDetailsOpen(true);
                                  }}
                                >
                                  <Eye size={14} />
                                  {t("actions.view_details")}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedParticipant(participant);
                                    setParticipantModalOpen(true);
                                  }}
                                >
                                  <Edit size={14} />
                                  {tShared("edit")}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-500 hover:text-white !focus:text-white"
                                  onClick={async () => {
                                    if (
                                      window.confirm(t("actions.delete_registration_confirm"))
                                    ) {
                                      try {
                                        await deleteParticipant(
                                          "register",
                                          participant.id,
                                        );
                                        toast.success(t("messages.success_deleted"));
                                        mutate(
                                          registrationsKey(
                                            selectedQuest,
                                            page,
                                            pageSize,
                                          ),
                                        );
                                      } catch (e) {
                                        toast.error(t("messages.error_delete"));
                                      }
                                    }
                                  }}
                                >
                                  <Trash2 size={14} />
                                  {t("actions.delete")}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    navigator.clipboard
                                      ?.writeText(participant.email)
                                      .then(() => toast.success(t("messages.email_copied")))
                                  }
                                >
                                  <Mail size={14} />
                                  {t("actions.copy_email")}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
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
                icon={Users}
                title={t("messages.empty_participants")}
                description={t("messages.empty_participants")}
              />
            </div>
          )}
        </div>
      </AdminCard>

      <ParticipantModal
        open={participantModalOpen}
        quests={quests}
        selectedQuest={selectedQuest}
        onOpenChange={setParticipantModalOpen}
        initialData={selectedParticipant}
        onCreated={() =>
          mutate(registrationsKey(selectedQuest, page, pageSize))
        }
      />

      <DataDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        data={selectedParticipant}
        title={tShared("participant_details")}
      />
    </div>
  );
}
