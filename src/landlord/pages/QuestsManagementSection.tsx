"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
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
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { landlordRoutes } from "@/data/landlordRoutes";
import { getAllQuests } from "@/integrations/content/lib/quests";
import { Locale } from "@/integrations/i18n/config";
import { logger } from "@/utils";
import { AdminCard } from "../components/AdminPrimitives";
import { useTranslations } from "@/integrations/i18n/hooks";

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
        <Card className="p-6">
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
        </Card>
      )}

      {isLoading ? (
        <div>{t("common.button.loading")}</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="filterQuest">
              {t("admin.landlord.quests.filters.byQuest")}
            </Label>
            <Select value={selectedQuest} onValueChange={setSelectedQuest}>
              <SelectTrigger id="filterQuest" className="w-64">
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

          <div className="grid gap-4">
            {participants?.map((participant: Participant) => (
              <Card key={participant.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <h3 className="font-semibold">{participant.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {participant.email}
                      </span>
                      <span className="text-xs px-2 py-1 bg-secondary rounded">
                        {participant.type}
                      </span>
                      {participant.source && (
                        <span className="text-xs px-2 py-1 bg-muted rounded">
                          {t("admin.landlord.quests.source", {
                            source: participant.source,
                          })}
                        </span>
                      )}
                      <Select
                        value={participant.language || "en"}
                        onValueChange={(value) =>
                          handleUpdateLanguage(participant.id, value)
                        }
                      >
                        <SelectTrigger className="w-24 h-6 text-xs">
                          <SelectValue />
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
                    {participant.message && (
                      <p className="text-sm text-muted-foreground">
                        {participant.message}
                      </p>
                    )}
                    {participant.work_url && (
                      <a
                        href={participant.work_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        {t("admin.landlord.quests.actions.viewWork")}
                      </a>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(participant.created_at).toLocaleString()}
                    </p>
                  </div>
                  {participant.status && (
                    <span className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded">
                      {participant.status}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
