"use client";
import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("admin.landlord.quests");
  const tShared = useTranslations("admin.landlord.shared");
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
      toast.error(t("messages.select_quest_first"));
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
        throw new Error(data?.error || t("messages.error_process"));
      }

      toast.success(isEditing ? t("messages.success_modified") : t("messages.success_added"));
      onCreated();
      onOpenChange(false);
    } catch (error) {
      logger.error(`Failed to ${isEditing ? 'edit' : 'add'} participant:`, error);
      toast.error(isEditing ? t("messages.error_process") : t("messages.error_process"));
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
              ? (type === "submission" ? t("actions.edit_submission") : t("actions.edit_registration"))
              : (type === "submission" ? t("actions.add_submission") : t("actions.add_registration"))
            }
          </DialogTitle>
        </DialogHeader>
        <DialogSeparator />
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="space-y-2">
            <Label htmlFor="quest">{t("fields.quest")}</Label>
            <Select
              value={form.challenge_slug}
              onValueChange={(value) =>
                setForm((current) => ({ ...current, challenge_slug: value }))
              }
              disabled={isEditing}
            >
              <SelectTrigger id="quest">
                <SelectValue placeholder={t("placeholders.select_quest")} />
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
              <Label htmlFor="participant-name">{t("fields.name")}</Label>
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
              <Label htmlFor="participant-email">{t("fields.email")}</Label>
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
          {!isEditing && (
            <div className="flex items-center justify-between rounded-2xl border border-black/8 bg-black/2 p-4">
              <div>
                <p className="text-sm font-medium">{t("fields.send_email")}</p>
                <p className="text-xs text-black/45">
                  {t("fields.send_email_hint")}
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
          <div className="space-y-2">
            <Label htmlFor="participant-message">{t("fields.message")}</Label>
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
              <Label htmlFor="participant-work-url">{t("fields.work_url")}</Label>
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
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              asPointer
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {tShared("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting} asIcon asPointer>
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isEditing ? tShared("save") : t("actions.add")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
