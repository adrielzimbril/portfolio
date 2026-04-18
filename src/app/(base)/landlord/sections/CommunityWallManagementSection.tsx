"use client";
import React, { useState, useEffect } from "react";
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
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import logger from "@/utils/logger";
import { locales } from "@/utils/locale";

interface CommunityMessage {
  id: string;
  creator_name: string;
  creator_avatar_url?: string;
  messages: Record<string, string>;
  created_at: string;
  user_id?: string;
}

export function CommunityWallManagementSection() {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState({
    creator_name: "",
    creator_avatar_url: "",
    messages: {} as Record<string, string>,
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(landlordApiRoutes.community.messages);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      logger.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

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
          messages: {},
        });
        setShowAddForm(false);
        fetchMessages();
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
        fetchMessages();
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
        fetchMessages();
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
      messages: { ...msg.messages },
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
          messages: {},
        });
        setShowAddForm(false);
        fetchMessages();
      }
    } catch (error) {
      logger.error("Failed to update message:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Community Wall Management</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "Add Message"}
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-6">
          <form
            onSubmit={editingMessage ? handleUpdateMessage : handleAddMessage}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="creatorName">Creator Name</Label>
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
              <Label htmlFor="avatarUrl">Avatar URL (optional)</Label>
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
              <Label>Messages by Language</Label>
              {locales.map((locale) => (
                <div key={locale}>
                  <Label htmlFor={`message-${locale}`}>
                    Message ({locale.toUpperCase()})
                  </Label>
                  <Textarea
                    id={`message-${locale}`}
                    placeholder={`Message in ${locale.toUpperCase()}`}
                    value={newMessage.messages[locale] || ""}
                    onChange={(e) =>
                      setNewMessage({
                        ...newMessage,
                        messages: {
                          ...newMessage.messages,
                          [locale]: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <Button type="submit">
              {editingMessage ? "Update Message" : "Add Message"}
            </Button>
          </form>
        </Card>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <Card key={msg.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {msg.creator_avatar_url && (
                    <img
                      src={msg.creator_avatar_url}
                      alt={msg.creator_name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{msg.creator_name}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditMessage(msg)}
                      >
                        Edit
                      </Button>
                    </div>
                    {msg.messages &&
                      Object.entries(msg.messages).map(([lang, message]) => (
                        <div key={lang} className="space-y-1">
                          <span className="text-xs text-muted-foreground font-medium">
                            {lang.toUpperCase()}
                          </span>
                          <p className="text-sm">{message}</p>
                        </div>
                      ))}
                    <p className="text-xs text-muted-foreground">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteMessage(msg.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
