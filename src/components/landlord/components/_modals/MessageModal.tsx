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
import { Textarea } from "@/components/ui/textarea";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { Locale } from "@/types/enum";
import logger from "@/utils/logger";
import type { CommunityMessage } from "@/components/landlord/components/admin-types";
import { normalizeMessage } from "@/components/landlord/components/admin-utils";
import { toast } from "@/lib/toast";

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
    message: {} as Record<string, string>,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (!open) return;
    setForm({
      creator_name: message?.creator_name || "",
      creator_avatar_url: message?.creator_avatar_url || "",
      message: message ? { ...normalizeMessage(message) } : {},
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
        <form
          onSubmit={handleSubmit}
          className="grid gap-5 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2"
        >
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
                  value={form.message[locale] || ""}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: {
                        ...current.message,
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
