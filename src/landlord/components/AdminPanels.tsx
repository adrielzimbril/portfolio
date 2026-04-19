"use client";
import React, { useMemo, useState } from "react";
import {
  Clock,
  ExternalLink,
  FileText,
  Filter,
  Loader2,
  Mail,
  MessageSquareText,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCw,
  Send,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";
import { mutate } from "swr";
import { Badge } from "@/components/ui/badge";
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
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { landlordRoutes } from "@/data/landlordRoutes";
import { Locale } from "@/integrations/i18n/config";
import logger from "@/utils/logger";
import {
  AdminCard,
  EmptyState,
  MetricCard,
  SearchBox,
  StatusPill,
  TablePager,
} from "@/landlord/components/AdminPrimitives";
import type {
  AdminUser,
  AdminView,
  CommunityMessage,
  DataTableKey,
  LandlordTableResponse,
  Participant,
  QuestSummary,
} from "@/landlord/components/admin-types";
import {
  dataTableKey,
  fetchLandlordTable,
  fetchMessages,
  fetchParticipants,
  fetchQuests,
  formatDate,
  formatTime,
  normalizeMessage,
  participantsKey,
} from "@/landlord/components/admin-utils";

export function OverviewPanel({
  participants,
  messages,
  participantsError,
  messagesError,
}: {
  participants: Participant[];
  messages: CommunityMessage[];
  participantsError?: unknown;
  messagesError?: unknown;
}) {
  const stats = useMemo(() => {
    const registrations = participants.filter(
      (item) => item.type === "register",
    );
    const submissions = participants.filter(
      (item) => item.type === "submission",
    );
    const today = new Date().toDateString();
    const todayActivity =
      participants.filter(
        (item) => new Date(item.created_at).toDateString() === today,
      ).length +
      messages.filter(
        (item) => new Date(item.created_at).toDateString() === today,
      ).length;

    return {
      registrations: registrations.length,
      submissions: submissions.length,
      messages: messages.length,
      todayActivity,
    };
  }, [messages, participants]);

  const recentActivity = useMemo(() => {
    const participantRows = participants.slice(0, 5).map((participant) => ({
      id: `participant-${participant.id}`,
      title: participant.name,
      subtitle: `${participant.type === "submission" ? "Soumission" : "Inscription"} · ${participant.challenge_slug}`,
      date: participant.created_at,
      icon: participant.type === "submission" ? Send : Users,
    }));
    const messageRows = messages.slice(0, 5).map((message) => ({
      id: `message-${message.id}`,
      title: message.creator_name,
      subtitle: "Message communauté",
      date: message.created_at,
      icon: MessageSquareText,
    }));

    return [...participantRows, ...messageRows]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [messages, participants]);

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Inscriptions"
          value={stats.registrations}
          detail="Entrées register"
          icon={Users}
          tone="dark"
        />
        <MetricCard
          label="Soumissions"
          value={stats.submissions}
          detail="Travaux envoyés"
          icon={Send}
          tone="yellow"
        />
        <MetricCard
          label="Messages"
          value={stats.messages}
          detail="Mur communautaire"
          icon={MessageSquareText}
          tone="green"
        />
        <MetricCard
          label="Aujourd'hui"
          value={stats.todayActivity}
          detail="Nouvelles entrées"
          icon={Clock}
          tone="white"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <AdminCard className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Activité récente</h2>
              <p className="text-sm text-black/45">
                Inscriptions, soumissions et messages publics.
              </p>
            </div>
            <Badge variant="white" className="bg-[#ffed90]">
              Live
            </Badge>
          </div>
          {recentActivity.length ? (
            <div className="grid gap-2">
              {recentActivity.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-2xl border border-black/6 bg-[#fbfaf6] px-4 py-3"
                  >
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-black/[0.04]">
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.title}
                      </p>
                      <p className="truncate text-xs text-black/45">
                        {item.subtitle}
                      </p>
                    </div>
                    <p className="text-xs text-black/45">
                      {formatDate(item.date)}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Clock}
              title="Aucune activité"
              description="Les prochaines entrées apparaîtront ici."
            />
          )}
        </AdminCard>

        <AdminCard className="p-5">
          <h2 className="text-lg font-semibold">État du panel</h2>
          <p className="mt-1 text-sm text-black/45">
            Contrôle rapide des modules utilisés.
          </p>
          <div className="mt-5 grid gap-3">
            {[
              ["Quests API", participantsError ? "À vérifier" : "OK"],
              ["Community API", messagesError ? "À vérifier" : "OK"],
              ["Session", "Admin"],
            ].map(([label, state]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl bg-[#fbfaf6] px-4 py-3"
              >
                <span className="text-sm">{label}</span>
                <StatusPill
                  tone={
                    state === "OK" || state === "Admin" ? "success" : "danger"
                  }
                >
                  {state}
                </StatusPill>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

export function QuestsPanel({
  quests,
  participants,
  loading,
  selectedQuest,
  search,
  onSearchChange,
  onSelectedQuestChange,
  onOpenParticipantModal,
}: {
  quests: QuestSummary[];
  participants: Participant[];
  loading: boolean;
  selectedQuest: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectedQuestChange: (value: string) => void;
  onOpenParticipantModal: () => void;
}) {
  const filteredParticipants = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return participants;
    return participants.filter((participant) =>
      [
        participant.name,
        participant.email,
        participant.challenge_slug,
        participant.type,
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
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Quests</h2>
          <p className="mt-1 text-sm text-black/45">
            Inscriptions et soumissions, avec accès direct aux rendus.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            asIcon
            asPointer
            onClick={() => mutate(participantsKey(selectedQuest))}
          >
            <RefreshCw size={16} />
            Rafraîchir
          </Button>
          <Button asIcon asPointer onClick={onOpenParticipantModal}>
            <Plus size={16} />
            Ajouter
          </Button>
        </div>
      </div>

      <AdminCard className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchBox
            value={search}
            onChange={onSearchChange}
            placeholder="Rechercher nom, email, quest..."
          />
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-black/35" />
            <Select value={selectedQuest} onValueChange={onSelectedQuestChange}>
              <SelectTrigger className="h-10 w-full min-w-56 bg-white text-sm md:w-72">
                <SelectValue placeholder="Toutes les quests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les quests</SelectItem>
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
        {loading ? (
          <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
            <Loader2 size={18} className="animate-spin" />
            Chargement des participants...
          </div>
        ) : filteredParticipants.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead className="border-b border-black/8 text-xs text-black/45">
                <tr>
                  <th className="px-5 py-4 font-medium">Participant</th>
                  <th className="px-5 py-4 font-medium">Quest</th>
                  <th className="px-5 py-4 font-medium">Type</th>
                  <th className="px-5 py-4 font-medium">Statut</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/6">
                {filteredParticipants.map((participant) => (
                  <tr
                    key={`${participant.type}-${participant.id}`}
                    className="hover:bg-black/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-[#ffed90] text-sm font-semibold">
                          {participant.name?.charAt(0)?.toUpperCase() || "?"}
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
                      <StatusPill
                        tone={
                          participant.type === "submission" ? "info" : "warning"
                        }
                      >
                        {participant.type === "submission"
                          ? "Soumission"
                          : "Inscription"}
                      </StatusPill>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-black/55">
                        {participant.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-black/55">
                      <div>{formatDate(participant.created_at)}</div>
                      <div className="text-xs text-black/35">
                        {formatTime(participant.created_at)}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            asPointer
                            aria-label="Actions participant"
                          >
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {participant.work_url ? (
                            <DropdownMenuItem asChild>
                              <a
                                href={participant.work_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink size={14} />
                                Voir le travail
                              </a>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem disabled>
                              <FileText size={14} />
                              Aucun travail
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard
                                ?.writeText(participant.email)
                                .then(() => toast.success("Email copié."))
                            }
                          >
                            <Mail size={14} />
                            Copier l'email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            <EmptyState
              icon={Users}
              title="Aucun participant"
              description="Aucune entrée ne correspond au filtre actuel."
            />
          </div>
        )}
      </AdminCard>
    </div>
  );
}

export function CommunityPanel({
  messages,
  loading,
  search,
  onSearchChange,
  onOpenCreate,
  onOpenEdit,
  onAskDelete,
}: {
  messages: CommunityMessage[];
  loading: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onOpenCreate: () => void;
  onOpenEdit: (message: CommunityMessage) => void;
  onAskDelete: (message: CommunityMessage) => void;
}) {
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
          onChange={onSearchChange}
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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead className="border-b border-black/8 text-xs text-black/45">
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
                              {message.creator_name?.charAt(0)?.toUpperCase() ||
                                "?"}
                            </div>
                          )}
                          <div>
                            <p className="font-medium">
                              {message.creator_name}
                            </p>
                            <p className="text-xs text-black/45">
                              {message.user_id
                                ? "Utilisateur lié"
                                : "Ajout manuel"}
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
                        <div>{formatDate(message.created_at)}</div>
                        <div className="text-xs text-black/35">
                          {formatTime(message.created_at)}
                        </div>
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
                              onClick={() => onOpenEdit(message)}
                            >
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
    </div>
  );
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
                <th key={column} className="px-5 py-4 font-medium">
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

function formatCell(value: unknown) {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return formatDate(value);
  }
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function UsersPanel({
  response,
  loading,
  page,
  pageSize,
  onPageChange,
}: {
  response?: LandlordTableResponse;
  loading: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Users</h2>
        <p className="mt-1 text-sm text-black/45">
          Contacts connus par le site, centralisés depuis les formulaires et
          inscriptions.
        </p>
      </div>
      <AdminCard className="overflow-hidden">
        {loading ? (
          <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
            <Loader2 size={18} className="animate-spin" />
            Chargement des users...
          </div>
        ) : (
          <DataTable
            response={response}
            page={page}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        )}
      </AdminCard>
    </div>
  );
}

const tableOptions: Array<{
  value: DataTableKey;
  label: string;
  detail: string;
}> = [
  { value: "newsletter", label: "Newsletter", detail: "Abonnés et sources" },
  {
    value: "submissions",
    label: "Submit entries",
    detail: "Demandes entrantes",
  },
  { value: "hubRequests", label: "Hub requests", detail: "Demandes produits" },
  { value: "reactions", label: "Reactions", detail: "Engagement contenu" },
];

export function TablesPanel({
  activeTable,
  response,
  loading,
  page,
  pageSize,
  onTableChange,
  onPageChange,
}: {
  activeTable: DataTableKey;
  response?: LandlordTableResponse;
  loading: boolean;
  page: number;
  pageSize: number;
  onTableChange: (table: DataTableKey) => void;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            Tables Supabase
          </h2>
          <p className="mt-1 text-sm text-black/45">
            Lecture rapide des tables utiles, paginée pour éviter les longues
            pages.
          </p>
        </div>
        <Select
          value={activeTable}
          onValueChange={(value) => onTableChange(value as DataTableKey)}
        >
          <SelectTrigger className="h-10 w-full bg-white text-sm md:w-72">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tableOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {tableOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onTableChange(option.value)}
            className={`cursor-pointer rounded-2xl border p-4 text-left transition ${
              activeTable === option.value
                ? "border-[#11191f] bg-[#11191f] text-white"
                : "border-black/8 bg-white hover:border-black/20"
            }`}
          >
            <p className="text-sm font-medium">{option.label}</p>
            <p
              className={`mt-1 text-xs ${
                activeTable === option.value ? "text-white/50" : "text-black/45"
              }`}
            >
              {option.detail}
            </p>
          </button>
        ))}
      </div>

      <AdminCard className="overflow-hidden">
        {loading ? (
          <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
            <Loader2 size={18} className="animate-spin" />
            Chargement de la table...
          </div>
        ) : (
          <DataTable
            response={response}
            page={page}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        )}
      </AdminCard>
    </div>
  );
}
