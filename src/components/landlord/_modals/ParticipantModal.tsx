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
  type = "register",
  initialData,
}: {
  open: boolean;
  quests: QuestSummary[];
  selectedQuest: string;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
  type?: "register" | "submission";
  initialData?: any;
}) {
  const isEditing = Boolean(initialData);

  const [form, setForm] = useState({
    challenge_slug: selectedQuest !== "all" ? selectedQuest : "",
    name: "",
    email: "",
    message: "",
    source: "admin",
    sendEmail: false,
    language: Locale.EN,
    type: type,
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
      if (initialData) {
        setForm({
          challenge_slug: initialData.challenge_slug || "",
          name: initialData.name || "",
          email: initialData.email || "",
          message: initialData.message || "",
          source: initialData.meta?.source || "admin",
          sendEmail: false,
          language: initialData.language || Locale.EN,
          type: type,
          work_url: initialData.work_url || "",
        });
      } else {
        setForm({
          challenge_slug: selectedQuestValue,
          name: "",
          email: "",
          message: "",
          source: "admin",
          sendEmail: false,
          language: Locale.EN,
          type,
          work_url: "",
        });
      }
    }
  }, [open, selectedQuestValue, type, initialData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.challenge_slug) {
      toast.error("Choisis d'abord une quest.");
      return;
    }

    setIsSubmitting(true);
    try {
      const baseUrl = type === "submission" 
        ? landlordApiRoutes.quests.submissions 
        : landlordApiRoutes.quests.registrations;
      
      const url = isEditing ? `${baseUrl}/${initialData.id}` : baseUrl;
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to process request");
      }

      toast.success(isEditing ? "Modifié avec succès." : "Participant ajouté.");
      onCreated();
      onOpenChange(false);
    } catch (error) {
      logger.error(`Failed to ${isEditing ? 'edit' : 'add'} participant:`, error);
      toast.error(`Impossible de ${isEditing ? 'modifier' : 'ajouter'} le participant.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xl" variant="modern" scrollArea>
        <DialogHeader>
          <DialogTitle>
            {isEditing 
              ? (type === "submission" ? "Modifier la soumission" : "Modifier l'inscription")
              : (type === "submission" ? "Ajouter une soumission" : "Ajouter un participant")
            }
          </DialogTitle>
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
              disabled={isEditing}
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
                disabled={isEditing}
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
              rows={2}
            />
          </div>
          {type === "submission" && (
            <div className="space-y-2">
              <Label htmlFor="participant-work-url">URL du travail</Label>
              <Input
                id="participant-work-url"
                value={form.work_url}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    work_url: event.target.value,
                  }))
                }
                placeholder="https://..."
                required
              />
            </div>
          )}
          {!isEditing && (
            <div className="flex items-center justify-between rounded-2xl border border-black/8 bg-black/2 p-4">
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
          )}
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
              {isEditing ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
