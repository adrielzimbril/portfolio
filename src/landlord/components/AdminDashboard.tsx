"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { landlordRoutes } from "@/data/landlordRoutes";
import { signOut } from "@/integrations/auth/provider/supabase";
import { toast } from "@/lib/toast";
import logger from "@/utils/logger";
import { AdminShell } from "./AdminShell";
import { AdminPrimitives, ConfirmDialog } from "./AdminPrimitives";
import { MessageModal, ParticipantModal } from "./AdminModals";
import {
  CommunityPanel,
  OverviewPanel,
  QuestsPanel,
  TablesPanel,
  UsersPanel,
} from "./AdminPanels";
import type {
  AdminUser,
  AdminView,
  CommunityMessage,
  DataTableKey,
} from "./admin-types";
import {
  dataTableKey,
  fetchLandlordTable,
  fetchMessages,
  fetchParticipants,
  fetchQuests,
  participantsKey,
} from "./admin-utils";

const pageSize = 10;

export function AdminDashboard({ user }: { user: AdminUser }) {
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState("all");
  const [participantSearch, setParticipantSearch] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<CommunityMessage | null>(
    null,
  );
  const [messageToDelete, setMessageToDelete] =
    useState<CommunityMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [usersPage, setUsersPage] = useState(1);
  const [activeTable, setActiveTable] = useState<DataTableKey>("newsletter");
  const [tablePage, setTablePage] = useState(1);

  const { data: quests = [] } = useSWR("landlord-quests", fetchQuests);
  const {
    data: participants = [],
    isLoading: participantsLoading,
    error: participantsError,
  } = useSWR(participantsKey(selectedQuest), fetchParticipants);
  const {
    data: messages = [],
    isLoading: messagesLoading,
    error: messagesError,
  } = useSWR(landlordApiRoutes.community.messages, fetchMessages);
  const { data: usersTable, isLoading: usersLoading } = useSWR(
    dataTableKey("users", usersPage, pageSize),
    fetchLandlordTable,
  );
  const { data: tableData, isLoading: tableLoading } = useSWR(
    dataTableKey(activeTable, tablePage, pageSize),
    fetchLandlordTable,
  );

  const refreshAll = () => {
    mutate(participantsKey(selectedQuest));
    mutate(landlordApiRoutes.community.messages);
    mutate(dataTableKey("users", usersPage, pageSize));
    mutate(dataTableKey(activeTable, tablePage, pageSize));
    mutate("landlord-quests");
    toast.success("Dashboard rafraîchi.");
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

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = landlordRoutes.login.link;
    } catch (error) {
      logger.error("Failed to sign out:", error);
      toast.error("Déconnexion impossible.");
    }
  };

  const changeActiveTable = (table: DataTableKey) => {
    setActiveTable(table);
    setTablePage(1);
  };

  return (
    <AdminShell
      user={user}
      activeView={activeView}
      sidebarOpen={sidebarOpen}
      onViewChange={setActiveView}
      onSidebarOpenChange={setSidebarOpen}
      onRefresh={refreshAll}
      onSignOut={handleSignOut}
    >
      {activeView === "overview" && (
        <OverviewPanel
          participants={participants}
          messages={messages}
          participantsError={participantsError}
          messagesError={messagesError}
        />
      )}

      {activeView === "quests" && (
        <QuestsPanel
          quests={quests}
          participants={participants}
          loading={participantsLoading}
          selectedQuest={selectedQuest}
          search={participantSearch}
          onSearchChange={setParticipantSearch}
          onSelectedQuestChange={setSelectedQuest}
          onOpenParticipantModal={() => setParticipantModalOpen(true)}
        />
      )}

      {activeView === "community" && (
        <CommunityPanel
          messages={messages}
          loading={messagesLoading}
          search={messageSearch}
          onSearchChange={setMessageSearch}
          onOpenCreate={() => {
            setEditingMessage(null);
            setMessageModalOpen(true);
          }}
          onOpenEdit={(message) => {
            setEditingMessage(message);
            setMessageModalOpen(true);
          }}
          onAskDelete={setMessageToDelete}
        />
      )}

      {activeView === "users" && (
        <UsersPanel
          response={usersTable}
          loading={usersLoading}
          page={usersPage}
          pageSize={pageSize}
          onPageChange={setUsersPage}
        />
      )}

      {activeView === "tables" && (
        <TablesPanel
          activeTable={activeTable}
          response={tableData}
          loading={tableLoading}
          page={tablePage}
          pageSize={pageSize}
          onTableChange={changeActiveTable}
          onPageChange={setTablePage}
        />
      )}

      <ParticipantModal
        open={participantModalOpen}
        quests={quests}
        selectedQuest={selectedQuest}
        onOpenChange={setParticipantModalOpen}
        onCreated={() => mutate(participantsKey(selectedQuest))}
      />
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
    </AdminShell>
  );
}
