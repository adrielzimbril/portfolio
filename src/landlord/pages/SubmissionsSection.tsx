"use client";
import React, { useState } from "react";
import useSWR from "swr/mutation";
import { Plus, Loader2, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminCard } from "@/landlord/components/AdminPrimitives";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { Locale } from "@/types/enum";
import { logger } from "@/utils";
import { getAllQuests } from "@/integrations/content/lib/quests";

const pageSize = 10;

export function SubmissionsSection() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<string>("all");
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    message: "",
    source: "admin",
    sendEmail: false,
    language: Locale.EN,
    type: "submission" as const,
    work_url: "",
  });

  const { data: quests } = useSWR("quests", () =>
    getAllQuests().catch((err) => {
      logger.error("Failed to fetch quests:", err);
      return [];
    }),
  );

  const { data: participants } = useSWR(
    () =>
      `${landlordApiRoutes.quests.participants}${selectedQuest !== "all" ? `?slug=${selectedQuest}` : ""}`,
    async (url) => {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch participants");
      const data = await response.json();
      return data.participants || [];
    },
  );

  const { trigger: addParticipant, isMutating } = useSWR(
    landlordApiRoutes.quests.participants,
    async (url) => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newParticipant,
          challenge_slug:
            selectedQuest === "all" ? quests?.[0]?.slug || "" : selectedQuest,
        }),
      });
      return response;
    },
  );

  const handleAddParticipant = async () => {
    if (
      !newParticipant.name ||
      !newParticipant.email ||
      !newParticipant.work_url
    )
      return;
    if (selectedQuest === "all" && !quests?.[0]?.slug) return;

    try {
      const response = await addParticipant();
      if (response?.ok) {
        setNewParticipant({
          name: "",
          email: "",
          message: "",
          source: "admin",
          sendEmail: false,
          language: Locale.EN,
          type: "submission",
          work_url: "",
        });
        setShowAddForm(false);
      }
    } catch (error) {
      logger.error("Failed to add participant:", error);
    }
  };

  const filteredParticipants =
    participants?.filter((p: any) => p.type === "submission") || [];

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            Soumissions
          </h2>
          <p className="mt-1 text-sm text-black/45">
            Gérer les rendus de quests
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedQuest} onValueChange={setSelectedQuest}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Toutes les quests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les quests</SelectItem>
              {quests?.map((quest) => (
                <SelectItem key={quest.slug} value={quest.slug}>
                  {quest.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            asIcon
            asPointer
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={16} />
            Ajouter
          </Button>
        </div>
      </div>

      {showAddForm && (
        <AdminCard>
          <div className="grid gap-4 p-6">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={newParticipant.name}
                onChange={(e) =>
                  setNewParticipant({ ...newParticipant, name: e.target.value })
                }
                placeholder="Nom du participant"
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
                placeholder="email@example.com"
              />
            </div>
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
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newParticipant.message}
                onChange={(e) =>
                  setNewParticipant({
                    ...newParticipant,
                    message: e.target.value,
                  })
                }
                placeholder="Message optionnel"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="sendEmail"
                checked={newParticipant.sendEmail}
                onCheckedChange={(checked) =>
                  setNewParticipant({ ...newParticipant, sendEmail: checked })
                }
              />
              <Label htmlFor="sendEmail">
                Envoyer un email de confirmation
              </Label>
            </div>
            <div>
              <Label htmlFor="language">Langue</Label>
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
            <div className="flex gap-2">
              <Button onClick={handleAddParticipant} disabled={isMutating}>
                {isMutating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Ajouter"
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </AdminCard>
      )}

      <AdminCard className="overflow-hidden">
        {filteredParticipants.length ? (
          <div className="flex flex-col h-[600px] xl:h-[calc(100dvh-270px)] overflow-hidden">
            <ScrollArea className="flex-1 w-full" scrollbarGutter>
              <div className="min-w-full inline-block align-middle">
                <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-white border-b border-black/8 text-xs text-black/45 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                    <tr>
                      <th className="px-5 py-4 font-medium">Nom</th>
                      <th className="px-5 py-4 font-medium">Email</th>
                      <th className="px-5 py-4 font-medium">Quest</th>
                      <th className="px-5 py-4 font-medium">URL du travail</th>
                      <th className="px-5 py-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/6">
                    {filteredParticipants.map((participant: any) => (
                      <tr key={participant.id} className="hover:bg-black/[0.02] transition-colors">
                        <td className="px-5 py-4">{participant.name}</td>
                        <td className="px-5 py-4">{participant.email}</td>
                        <td className="px-5 py-4">{participant.challenge_slug}</td>
                        <td className="px-5 py-4">
                          {participant.work_url ? (
                            <a
                              href={participant.work_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:underline"
                            >
                              <ExternalLink size={14} />
                              Voir
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="px-5 py-4 text-black/45">
                          {new Date(participant.created_at).toLocaleDateString(
                            "fr-FR",
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex flex-col items-center gap-3 text-center text-sm text-black/50">
              <FileText size={32} />
              <div>
                <p className="font-medium">Aucune soumission</p>
                <p className="text-xs">Aucune soumission pour le moment.</p>
              </div>
            </div>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
