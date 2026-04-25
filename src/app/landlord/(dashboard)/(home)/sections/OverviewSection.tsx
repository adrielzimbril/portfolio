"use client";
import React, { useMemo } from "react";
import useSWR from "swr";
import { Clock, MessageSquareText, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import {
  AdminCard,
  EmptyState,
  MetricCard,
  StatusPill,
} from "@/components/landlord/components/AdminPrimitives";
import {
  fetchMessages,
  fetchParticipants,
  formatDate,
  participantsKey,
} from "@/components/landlord/admin-utils";
import type {
  CommunityMessage,
  Participant,
} from "@/components/landlord/admin-types";

export function OverviewSection() {
  const { data: participantsData, error: participantsError } = useSWR(
    participantsKey("all", 1, 1000),
    fetchParticipants,
  );
  const participants = (participantsData?.rows || []) as Participant[];

  const { data: messagesData, error: messagesError } = useSWR(
    landlordApiRoutes.community.messages,
    fetchMessages,
  );
  const messages = (messagesData?.rows || []) as CommunityMessage[];

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
      subtitle: message.message?.fr || "",
      date: message.created_at,
      icon: MessageSquareText,
    }));

    return [...participantRows, ...messageRows]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [messages, participants]);

  return (
    <div className="grid gap-5">
      <div className="mb-2">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-black/45">
          Vue globale de l'activité du site shirofolio.
        </p>
      </div>
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
              <h3 className="text-lg font-semibold">Activité récente</h3>
              <p className="text-sm text-black/45">
                Inscriptions, soumissions et messages publics.
              </p>
            </div>
            <Badge className="squircle-[#ffed90]" variant="colored">
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
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-black/4">
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
          <h3 className="text-lg font-semibold">État du panel</h3>
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
