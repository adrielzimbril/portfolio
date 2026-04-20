"use client";
import React, { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { ExternalLink, FileText, Filter, Loader2, Mail, MoreHorizontal, Plus, RefreshCw, Send, Eye } from "lucide-react";
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
import { AdminCard, EmptyState, SearchBox, StatusPill } from "@/landlord/components/AdminPrimitives";
import { ParticipantModal, DataDetailsModal } from "@/landlord/components/_modals";
import { fetchParticipants, fetchQuests, formatDate, formatTime, participantsKey } from "@/landlord/components/admin-utils";
import { toast } from "@/lib/toast";

import { ScrollArea } from "@/components/ui/scroll-area";

export function QuestSubmissionsSection() {
  const [search, setSearch] = useState("");
  const [selectedQuest, setSelectedQuest] = useState("all");
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);

  const { data: quests = [] } = useSWR("landlord-quests", fetchQuests);

  const {
    data: participants = [],
    isLoading: loading,
  } = useSWR(participantsKey(selectedQuest), fetchParticipants);

  const filteredParticipants = useMemo(() => {
    let filtered = participants.filter((p) => p.type === "submission");

    const query = search.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter((participant) =>
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
    }
    return filtered;
  }, [search, participants]);

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Soumissions des Quests</h2>
          <p className="mt-1 text-sm text-black/45">
            Rendus de participants, avec accès direct aux travaux.
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
          <Button asIcon asPointer onClick={() => setParticipantModalOpen(true)}>
            <Plus size={16} />
            Ajouter
          </Button>
        </div>
      </div>

      <AdminCard className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Rechercher nom, email, quest..."
          />
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-black/35" />
            <Select value={selectedQuest} onValueChange={setSelectedQuest}>
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
            Chargement des soumissions...
          </div>
        ) : filteredParticipants.length ? (
          <div className="flex flex-col max-h-[600px] xl:max-h-[calc(100dvh-270px)]">
            <ScrollArea className="flex-1" scrollbarGutter>
              <div className="min-w-full inline-block align-middle">
                <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-white border-b border-black/8 text-xs text-black/45 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                    <tr>
                      <th className="px-5 py-4 font-medium">Participant</th>
                      <th className="px-5 py-4 font-medium">Quest</th>
                      <th className="px-5 py-4 font-medium">Statut</th>
                      <th className="px-5 py-4 font-medium">Date</th>
                      <th className="px-5 py-4 text-right font-medium">Action</th>
                    </tr>
                  </thead>
              <tbody className="divide-y divide-black/6">
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="hover:bg-black/2">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-[#ffed90] text-sm font-semibold">
                          {participant.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{participant.name}</p>
                          <p className="truncate text-xs text-black/45">{participant.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="max-w-60 truncate text-black/70">{participant.challenge_slug}</span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill tone="info">Soumission</StatusPill>
                    </td>
                    <td className="px-5 py-4 text-black/55">
                      <div>{formatDate(participant.created_at)}</div>
                      <div className="text-xs text-black/35">{formatTime(participant.created_at)}</div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" asPointer aria-label="Actions soumission">
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
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {participant.work_url ? (
                            <DropdownMenuItem asChild>
                              <a href={participant.work_url} target="_blank" rel="noopener noreferrer">
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
        </ScrollArea>
      </div>
        ) : (
          <div className="p-6">
            <EmptyState
              icon={Send}
              title="Aucune soumission"
              description="Aucun rendu ne correspond au filtre actuel."
            />
          </div>
        )}
      </AdminCard>

      <ParticipantModal
        open={participantModalOpen}
        quests={quests}
        selectedQuest={selectedQuest}
        onOpenChange={setParticipantModalOpen}
        onCreated={() => mutate(participantsKey(selectedQuest))}
      />

      <DataDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        data={selectedParticipant}
        title="Détails du participant"
      />
    </div>
  );
}
