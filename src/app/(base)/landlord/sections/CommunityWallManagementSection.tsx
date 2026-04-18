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
import { adminApiRoutes } from "@/data/adminApiRoutes";
import logger from "@/utils/logger";

interface CommunityMessage {
  id: string;
  creator_name: string;
  creator_avatar_url?: string;
  message: string;
  created_at: string;
  user_id?: string;
  language?: string;
}

export function CommunityWallManagementSection() {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMessage, setNewMessage] = useState({
    creator_name: "",
    creator_avatar_url: "",
    message: "",
    language: "en",
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(adminApiRoutes.community.messages);
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
      const response = await fetch(adminApiRoutes.community.messages, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        setNewMessage({
          creator_name: "",
          creator_avatar_url: "",
          message: "",
          language: "en",
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
      const response = await fetch(adminApiRoutes.community.messageById(id), {
        method: "DELETE",
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      logger.error("Failed to delete message:", error);
    }
  };

  const handleUpdateLanguage = async (id: string, language: string) => {
    try {
      const response = await fetch(adminApiRoutes.community.messageById(id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      logger.error("Failed to update language:", error);
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
          <form onSubmit={handleAddMessage} className="space-y-4">
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
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newMessage.message}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, message: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select
                value={newMessage.language}
                onValueChange={(value) =>
                  setNewMessage({ ...newMessage, language: value })
                }
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Add Message</Button>
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
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{msg.creator_name}</h3>
                      <Select
                        value={msg.language || "en"}
                        onValueChange={(value) =>
                          handleUpdateLanguage(msg.id, value)
                        }
                      >
                        <SelectTrigger className="w-24 h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">EN</SelectItem>
                          <SelectItem value="fr">FR</SelectItem>
                          <SelectItem value="zh-CN">ZH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-sm">{msg.message}</p>
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
