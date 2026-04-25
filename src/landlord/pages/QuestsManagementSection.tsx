"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, UserPlus, Mail, Edit, Trash2 } from "lucide-react";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { landlordRoutes } from "@/data/landlordRoutes";
import { getAllQuests } from "@/integrations/content/lib/quests";
import { Locale } from "@/types/enum";
import { logger } from "@/utils";
import { AdminCard } from "@/landlord/components/AdminPrimitives";
import { useTranslations } from "next-intl";

interface Participant {
  id: string;
  challenge_slug: string;
  name: string;
  email: string;
  message?: string;
  source?: string;
  created_at: string;
  type: "register" | "submission";
  work_url?: string;
  status?: string;
  language?: string;
}

export function QuestsManagementSection() {
  const t = useTranslations();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<string>("all");
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    message: "",
    source: "admin",
    sendEmail: false,
    language: Locale.EN,
    type: "register" as "register" | "submission",
    work_url: "",
  });

  const fetchQuests = async () => {
    try {
      return await getAllQuests();
    } catch (error) {
      logger.error("Failed to fetch quests:", error);
      return [];
    }
  };

  const fetchParticipants = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      logger.error("Failed to fetch participants");
      return [];
    }
    const data = await response.json();
    return data.participants || [];
  };

  const { data: quests } = useSWR("quests", fetchQuests);
  const { data: participants, isLoading } = useSWR(
    () =>
      `${landlordApiRoutes.quests.participants}${selectedQuest !== "all" ? `?slug=${selectedQuest}` : ""}`,
    fetchParticipants,
  );

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(landlordApiRoutes.quests.participants, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newParticipant,
          challenge_slug: selectedQuest,
        }),
      });

      if (response.ok) {
        setNewParticipant({
          name: "",
          email: "",
          message: "",
          source: "admin",
          sendEmail: false,
          language: Locale.EN,
          type: "register",
          work_url: "",
        });
        setShowAddForm(false);
        mutate(
          () =>
            `${landlordApiRoutes.quests.participants}${selectedQuest !== "all" ? `?slug=${selectedQuest}` : ""}`,
        );
      }
    } catch (error) {
      logger.error("Failed to add participant:", error);
    }
  };

  const handleUpdateLanguage = async (id: string, language: string) => {
    try {
      const response = await fetch(
        landlordApiRoutes.quests.participantById(id),
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language }),
        },
      );

      if (response.ok) {
        mutate(
          () =>
            `${landlordApiRoutes.quests.participants}${selectedQuest !== "all" ? `?slug=${selectedQuest}` : ""}`,
        );
      }
    } catch (error) {
      logger.error("Failed to update language:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {t("admin.landlord.quests.title")}
        </h2>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm
            ? t("common.confirmation.cancel")
            : t("admin.landlord.quests.actions.add")}
        </Button>
      </div>

      {showAddForm && (
        <AdminCard className="p-6">
          <form onSubmit={handleAddParticipant} className="space-y-4">
            <div>
              <Label htmlFor="quest">
                {t("admin.landlord.quests.fields.quest")}
              </Label>
              <Select
                value={selectedQuest}
                onValueChange={setSelectedQuest}
                required
              >
                <SelectTrigger id="quest">
                  <SelectValue placeholder="Sélectionner un challenge" />
                </SelectTrigger>
                <SelectContent>
                  {quests?.map((quest) => (
                    <SelectItem key={quest.slug} value={quest.slug}>
                      {quest.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">
                {t("admin.landlord.quests.fields.name")}
              </Label>
              <Input
                id="name"
                value={newParticipant.name}
                onChange={(e) =>
                  setNewParticipant({ ...newParticipant, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newParticipant.email}
                onChange={(e) =>
                  setNewParticipant({
                    ...newParticipant,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="message">
                {t("admin.landlord.quests.fields.message")}
              </Label>
              <Textarea
                id="message"
                value={newParticipant.message}
                onChange={(e) =>
                  setNewParticipant({
                    ...newParticipant,
                    message: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="sendEmail"
                checked={newParticipant.sendEmail}
                onCheckedChange={(checked) =>
                  setNewParticipant({ ...newParticipant, sendEmail: checked })
                }
              />
              <Label htmlFor="sendEmail">
                {t("admin.landlord.quests.fields.sendEmail")}
              </Label>
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={newParticipant.type}
                onValueChange={(value: "register" | "submission") =>
                  setNewParticipant({ ...newParticipant, type: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="register">Inscription</SelectItem>
                  <SelectItem value="submission">Soumission</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newParticipant.type === "submission" && (
              <div>
                <Label htmlFor="work_url">URL du travail</Label>
                <Input
                  id="work_url"
                  type="url"
                  value={newParticipant.work_url}
                  onChange={(e) =>
                    setNewParticipant({
                      ...newParticipant,
                      work_url: e.target.value,
                    })
                  }
                  placeholder="https://..."
                />
              </div>
            )}
            <div>
              <Label htmlFor="language">
                {t("admin.landlord.quests.fields.language")}
              </Label>
              <Select
                value={newParticipant.language}
                onValueChange={(value: Locale) =>
                  setNewParticipant({ ...newParticipant, language: value })
                }
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Locale).map((locale) => (
                    <SelectItem key={locale} value={locale}>
                      {locale.toLocaleUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">
              {t("admin.landlord.quests.actions.addSubmit")}
            </Button>
          </form>
        </AdminCard>
      )}

      <AdminCard className="overflow-hidden">
        <div className="flex flex-col h-[600px] xl:h-[calc(100dvh-270px)] overflow-hidden">
          <div className="p-4 border-b border-black/5 bg-black/[0.01]">
            <div className="flex items-center space-x-4">
              <Label htmlFor="filterQuest" className="text-xs text-black/45">
                {t("admin.landlord.quests.filters.byQuest")}
              </Label>
              <Select value={selectedQuest} onValueChange={setSelectedQuest}>
                <SelectTrigger id="filterQuest" className="w-64 h-9">
                  <SelectValue
                    placeholder={t("admin.landlord.quests.filters.allQuests")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("admin.landlord.quests.filters.allQuests")}
                  </SelectItem>
                  {quests?.map((quest) => (
                    <SelectItem key={quest.slug} value={quest.slug}>
                      {quest.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center gap-2 text-sm text-black/50">
              <Loader2 size={18} className="animate-spin" />
              Chargement des participants...
            </div>
          ) : (
            <ScrollArea className="flex-1 w-full" scrollbarGutter>
              <div className="grid gap-4 p-5">
                {participants?.length ? (
                  participants.map((participant: Participant) => (
                    <div
                      key={participant.id}
                      className="p-4 rounded-xl border border-black/5 bg-black/[0.01] hover:bg-black/[0.02] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <h3 className="font-semibold text-black/85">
                              {participant.name}
                            </h3>
                            <span className="text-xs text-black/45 bg-black/5 px-2 py-0.5 rounded-full">
                              {participant.email}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded">
                              {participant.type}
                            </span>
                            {participant.source && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-black/5 text-black/45 rounded">
                                {participant.source}
                              </span>
                            )}
                            <Select
                              value={participant.language || "en"}
                              onValueChange={(value) =>
                                handleUpdateLanguage(participant.id, value)
                              }
                            >
                              <SelectTrigger className="w-20 h-6 text-[10px] uppercase font-bold">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(Locale).map((locale) => (
                                  <SelectItem key={locale} value={locale}>
                                    {locale.toUpperCase()}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {participant.message && (
                            <p className="text-sm text-black/70 leading-relaxed">
                              {participant.message}
                            </p>
                          )}
                          {participant.work_url && (
                            <a
                              href={participant.work_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                            >
                              {t("admin.landlord.quests.actions.viewWork")}
                            </a>
                          )}
                          <p className="text-[10px] text-black/40">
                            {new Date(participant.created_at).toLocaleString()}
                          </p>
                        </div>
                        {participant.status && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-black text-white rounded">
                            {participant.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-black/45">
                    <Mail size={32} className="mb-2 opacity-20" />
                    <p className="text-sm font-medium">Aucun participant</p>
                    <p className="text-xs">
                      Ajustez vos filtres ou ajoutez un participant manuellement.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      </AdminCard>
    </div>
  );
}
