"use client";
import React, { useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSeparator,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { Locale } from "@/types/enum";
import logger from "@/utils/logger";
import type { QuestSummary } from "@/components/landlord/admin-types";
import { toast } from "@/lib/toast";

export function ParticipantModal({
  open,
  quests,
  selectedQuest,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  quests: QuestSummary[];
  selectedQuest: string;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    challenge_slug: selectedQuest !== "all" ? selectedQuest : "",
    name: "",
    email: "",
    message: "",
    source: "admin",
    sendEmail: false,
    language: Locale.EN,
    type: "register",
    work_url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedQuestValue = useMemo(() => {
    if (selectedQuest !== "all") {
      return selectedQuest;
    }
    return "";
  }, [selectedQuest]);

  React.useEffect(() => {
    if (open) {
      setForm((current) => ({
        ...current,
        challenge_slug: selectedQuestValue,
      }));
    }
  }, [open, selectedQuestValue]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.challenge_slug) {
      toast.error("Choisis d'abord une quest.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(landlordApiRoutes.quests.participants, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to add participant");
      }

      toast.success("Participant ajouté.");
      setForm({
        challenge_slug: selectedQuest !== "all" ? selectedQuest : "",
        name: "",
        email: "",
        message: "",
        source: "admin",
        sendEmail: false,
        language: Locale.EN,
        type: "register",
        work_url: "",
      });
      onCreated();
      onOpenChange(false);
    } catch (error) {
      logger.error("Failed to add participant:", error);
      toast.error("Impossible d'ajouter le participant.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xl" variant="modern" scrollArea>
        <DialogHeader>
          <DialogTitle>Ajouter un participant</DialogTitle>
          <DialogDescription>
            Crée une inscription manuelle. Les soumissions gardent leur propre
            formulaire public.
          </DialogDescription>
        </DialogHeader>
        <DialogSeparator />
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="space-y-2">
            <Label htmlFor="quest">Quest</Label>
            <Select
              value={form.challenge_slug}
              onValueChange={(value) =>
                setForm((current) => ({ ...current, challenge_slug: value }))
              }
            >
              <SelectTrigger id="quest">
                <SelectValue placeholder="Sélectionner une quest" />
              </SelectTrigger>
              <SelectContent>
                {quests.map((quest) => (
                  <SelectItem key={quest.slug} value={quest.slug}>
                    {quest.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="participant-name">Nom</Label>
              <Input
                id="participant-name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="participant-email">Email</Label>
              <Input
                id="participant-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="participant-message">Message</Label>
            <Textarea
              id="participant-message"
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  message: event.target.value,
                }))
              }
              rows={4}
            />
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-black/8 bg-black/[0.02] p-4">
            <div>
              <p className="text-sm font-medium">Envoyer un email</p>
              <p className="text-xs text-black/45">
                Désactivé par défaut pour les ajouts manuels.
              </p>
            </div>
            <Switch
              checked={form.sendEmail}
              onCheckedChange={(checked) =>
                setForm((current) => ({ ...current, sendEmail: checked }))
              }
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              asPointer
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} asIcon asPointer>
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
