"use client";
import React, { useState } from "react";
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
import { Locale } from "@/types";
import { toast } from "@/lib/toast";
import logger from "@/utils/logger";
import type { CommunityMessage, QuestSummary } from "./admin-types";
import { normalizeMessage } from "./admin-utils";

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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (open) {
      setForm((current) => ({
        ...current,
        challenge_slug: selectedQuest !== "all" ? selectedQuest : "",
      }));
    }
  }, [open, selectedQuest]);

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
                  setForm((current) => ({ ...current, name: event.target.value }))
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

export function MessageModal({
  open,
  message,
  onOpenChange,
  onSaved,
}: {
  open: boolean;
  message?: CommunityMessage | null;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    creator_name: "",
    creator_avatar_url: "",
    messages: {} as Record<string, string>,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (!open) return;
    setForm({
      creator_name: message?.creator_name || "",
      creator_avatar_url: message?.creator_avatar_url || "",
      messages: message ? { ...normalizeMessage(message) } : {},
    });
  }, [open, message]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const url = message
        ? landlordApiRoutes.community.messageById(message.id)
        : landlordApiRoutes.community.messages;
      const response = await fetch(url, {
        method: message ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to save message");
      }

      toast.success(message ? "Message mis à jour." : "Message ajouté.");
      onSaved();
      onOpenChange(false);
    } catch (error) {
      logger.error("Failed to save message:", error);
      toast.error("Impossible d'enregistrer le message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xl" variant="modern" scrollArea>
        <DialogHeader>
          <DialogTitle>
            {message ? "Modifier le message" : "Ajouter un message"}
          </DialogTitle>
          <DialogDescription>
            Renseigne le créateur et les variantes utiles du message.
          </DialogDescription>
        </DialogHeader>
        <DialogSeparator />
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="creator-name">Nom du créateur</Label>
              <Input
                id="creator-name"
                value={form.creator_name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    creator_name: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creator-avatar">Avatar URL</Label>
              <Input
                id="creator-avatar"
                value={form.creator_avatar_url}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    creator_avatar_url: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="grid gap-4">
            {Object.values(Locale).map((locale) => (
              <div key={locale} className="space-y-2">
                <Label htmlFor={`message-${locale}`}>
                  Message ({locale.toUpperCase()})
                </Label>
                <Textarea
                  id={`message-${locale}`}
                  value={form.messages[locale] || ""}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      messages: {
                        ...current.messages,
                        [locale]: event.target.value,
                      },
                    }))
                  }
                  rows={3}
                />
              </div>
            ))}
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
              {message ? "Mettre à jour" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
