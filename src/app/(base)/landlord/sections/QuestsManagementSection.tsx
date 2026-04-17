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
import { Switch } from "@/components/ui/switch";

interface Participant {
  id: string;
  challenge_slug: string;
  name: string;
  email: string;
  message?: string;
  source?: string;
  created_at: string;
  type: "register" | "submission";
  work_url?: string;
  status?: string;
  language?: string;
}

export function QuestsManagementSection() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<string>("");
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    message: "",
    source: "admin",
    sendEmail: false,
    language: "en",
  });

  useEffect(() => {
    fetchParticipants();
  }, [selectedQuest]);

  const fetchParticipants = async () => {
    try {
      const response = await fetch(
        `/api/admin/quests/participants${selectedQuest ? `?slug=${selectedQuest}` : ""}`,
      );
      if (response.ok) {
        const data = await response.json();
        setParticipants(data.participants || []);
      }
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/quests/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newParticipant,
          challenge_slug: selectedQuest,
        }),
      });

      if (response.ok) {
        setNewParticipant({
          name: "",
          email: "",
          message: "",
          source: "admin",
          sendEmail: false,
          language: "en",
        });
        setShowAddForm(false);
        fetchParticipants();
      }
    } catch (error) {
      console.error("Failed to add participant:", error);
    }
  };

  const handleUpdateLanguage = async (id: string, language: string) => {
    try {
      const response = await fetch(`/api/admin/quests/participants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });

      if (response.ok) {
        fetchParticipants();
      }
    } catch (error) {
      console.error("Failed to update language:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quest Participants Management</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "Add Participant"}
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-6">
          <form onSubmit={handleAddParticipant} className="space-y-4">
            <div>
              <Label htmlFor="quest">Quest</Label>
              <Select
                value={selectedQuest}
                onValueChange={setSelectedQuest}
                required
              >
                <SelectTrigger id="quest">
                  <SelectValue placeholder="Select a quest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quest-1">Quest 1</SelectItem>
                  <SelectItem value="quest-2">Quest 2</SelectItem>
                  <SelectItem value="quest-3">Quest 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newParticipant.name}
                onChange={(e) =>
                  setNewParticipant({ ...newParticipant, name: e.target.value })
                }
                required
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
                required
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
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="sendEmail"
                checked={newParticipant.sendEmail}
                onCheckedChange={(checked) =>
                  setNewParticipant({ ...newParticipant, sendEmail: checked })
                }
              />
              <Label htmlFor="sendEmail">Send email notification</Label>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select
                value={newParticipant.language}
                onValueChange={(value) =>
                  setNewParticipant({ ...newParticipant, language: value })
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
            <Button type="submit">Add Participant</Button>
          </form>
        </Card>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="filterQuest">Filter by Quest</Label>
            <Select value={selectedQuest} onValueChange={setSelectedQuest}>
              <SelectTrigger id="filterQuest" className="w-64">
                <SelectValue placeholder="All quests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All quests</SelectItem>
                <SelectItem value="quest-1">Quest 1</SelectItem>
                <SelectItem value="quest-2">Quest 2</SelectItem>
                <SelectItem value="quest-3">Quest 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {participants.map((participant) => (
              <Card key={participant.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <h3 className="font-semibold">{participant.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {participant.email}
                      </span>
                      <span className="text-xs px-2 py-1 bg-secondary rounded">
                        {participant.type}
                      </span>
                      {participant.source && (
                        <span className="text-xs px-2 py-1 bg-muted rounded">
                          from {participant.source}
                        </span>
                      )}
                      <Select
                        value={participant.language || "en"}
                        onValueChange={(value) =>
                          handleUpdateLanguage(participant.id, value)
                        }
                      >
                        <SelectTrigger className="w-24 h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">EN</SelectItem>
                          <SelectItem value="fr">FR</SelectItem>
                          <SelectItem value="es">ES</SelectItem>
                          <SelectItem value="de">DE</SelectItem>
                          <SelectItem value="pt">PT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {participant.message && (
                      <p className="text-sm text-muted-foreground">
                        {participant.message}
                      </p>
                    )}
                    {participant.work_url && (
                      <a
                        href={participant.work_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        View Work
                      </a>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(participant.created_at).toLocaleString()}
                    </p>
                  </div>
                  {participant.status && (
                    <span className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded">
                      {participant.status}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
