"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import useSWR, { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Edit, Trash2 } from "lucide-react";
import { AdminCard } from "@/landlord/components/AdminPrimitives";
import type { CommunityMessage } from "@/landlord/components/admin-types";
import { normalizeMessage } from "@/landlord/components/admin-utils";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { landlordRoutes } from "@/data/landlordRoutes";
import logger from "@/utils/logger";
import { Locale } from "@/types";

export function CommunityWallManagementSection() {
  const t = useTranslations();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState({
    creator_name: "",
    creator_avatar_url: "",
    message: {} as Record<string, string>,
  });

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      logger.error("Failed to fetch messages");
      return [];
    }
    const data = await response.json();
    return data.messages || [];
  };

  const {
    data: messages,
    error,
    isLoading,
  } = useSWR(landlordApiRoutes.community.messages, fetcher);

  const handleAddMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(landlordApiRoutes.community.messages, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        setNewMessage({
          creator_name: "",
          creator_avatar_url: "",
          message: {},
        });
        setShowAddForm(false);
        mutate(landlordApiRoutes.community.messages);
      }
    } catch (error) {
      logger.error("Failed to add message:", error);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const response = await fetch(
        landlordApiRoutes.community.messageById(id),
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        mutate(landlordApiRoutes.community.messages);
      }
    } catch (error) {
      logger.error("Failed to delete message:", error);
    }
  };

  const handleUpdateLanguage = async (id: string, language: string) => {
    try {
      const response = await fetch(
        landlordApiRoutes.community.messageById(id),
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language }),
        },
      );

      if (response.ok) {
        mutate(landlordApiRoutes.community.messages);
      }
    } catch (error) {
      logger.error("Failed to update language:", error);
    }
  };

  const handleEditMessage = (msg: CommunityMessage) => {
    setEditingMessage(msg.id);
    setNewMessage({
      creator_name: msg.creator_name,
      creator_avatar_url: msg.creator_avatar_url || "",
      message: { ...msg.message },
    });
    setShowAddForm(true);
  };

  const handleUpdateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMessage) return;

    try {
      const response = await fetch(
        landlordApiRoutes.community.messageById(editingMessage),
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        },
      );

      if (response.ok) {
        setEditingMessage(null);
        setNewMessage({
          creator_name: "",
          creator_avatar_url: "",
          message: {},
        });
        setShowAddForm(false);
        mutate(landlordApiRoutes.community.messages);
      }
    } catch (error) {
      logger.error("Failed to update message:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {t("admin.landlord.community.title")}
        </h2>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm
            ? t("common.confirmation.cancel")
            : t("admin.landlord.community.actions.add")}
        </Button>
      </div>

      {showAddForm && (
        <AdminCard className="p-6">
          <form
            onSubmit={editingMessage ? handleUpdateMessage : handleAddMessage}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="creatorName">
                {t("admin.landlord.community.fields.creatorName")}
              </Label>
              <Input
                id="creatorName"
                value={newMessage.creator_name}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, creator_name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="avatarUrl">
                {t("admin.landlord.community.fields.avatarUrl")}
              </Label>
              <Input
                id="avatarUrl"
                value={newMessage.creator_avatar_url}
                onChange={(e) =>
                  setNewMessage({
                    ...newMessage,
                    creator_avatar_url: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-4">
              <Label>
                {t("admin.landlord.community.fields.messagesByLanguage")}
              </Label>
              {Object.values(Locale).map((locale) => (
                <div key={locale}>
                  <Label htmlFor={`message-${locale}`}>
                    {t("admin.landlord.community.fields.messageLanguage", {
                      locale: locale.toUpperCase(),
                    })}
                  </Label>
                  <Textarea
                    id={`message-${locale}`}
                    placeholder={t(
                      "admin.landlord.community.fields.messagePlaceholder",
                      { locale: locale.toUpperCase() },
                    )}
                    value={newMessage.message[locale] || ""}
                    onChange={(e) =>
                      setNewMessage({
                        ...newMessage,
                        message: {
                          ...newMessage.message,
                          [locale]: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <Button type="submit">
              {editingMessage
                ? t("admin.landlord.community.actions.update")
                : t("admin.landlord.community.actions.add")}
            </Button>
          </form>
        </AdminCard>
      )}

      {isLoading ? (
        <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
          <Loader2 size={18} className="animate-spin" />
          {t("common.button.loading")}
        </div>
      ) : (
        <AdminCard className="overflow-hidden">
          <div className="flex flex-col h-[600px] xl:h-[calc(100dvh-270px)] overflow-hidden">
            <ScrollArea className="flex-1 w-full" scrollbarGutter>
              <div className="grid gap-4 p-5">
                {messages?.map((msg: CommunityMessage) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl border border-black/5 bg-black/[0.01] hover:bg-black/[0.02] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        {msg.creator_avatar_url && (
                          <img
                            src={msg.creator_avatar_url}
                            alt={msg.creator_name}
                            className="w-10 h-10 rounded-full border border-black/10"
                          />
                        )}
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-black/85 truncate">
                              {msg.creator_name}
                            </h3>
                            <Button
                              variant="outline"
                              size="xs"
                              asIcon
                              asPointer
                              onClick={() => handleEditMessage(msg)}
                            >
                              <Edit size={14} />
                            </Button>
                          </div>
                          {msg.message &&
                            Object.entries(msg.message).map(
                              ([lang, message]: [string, string]) => (
                                <div key={lang} className="space-y-1">
                                  <span className="text-[10px] text-black/45 font-medium uppercase tracking-wider">
                                    {lang}
                                  </span>
                                  <p className="text-sm text-black/70 leading-relaxed">
                                    {message}
                                  </p>
                                </div>
                              ),
                            )}
                          <p className="text-[10px] text-black/40">
                            {new Date(msg.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="xs"
                        asIcon
                        asPointer
                        onClick={() => handleDeleteMessage(msg.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </AdminCard>
      )}
    </div>
  );
}
