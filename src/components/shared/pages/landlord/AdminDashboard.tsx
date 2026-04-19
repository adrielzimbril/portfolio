"use client";
import React, { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import {
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Filter,
  Globe2,
  Home,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  MessageSquareText,
  MoreHorizontal,
  PanelLeft,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Trash2,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSeparator,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { landlordRoutes } from "@/data/landlordRoutes";
import { getAllQuests } from "@/integrations/content/lib/quests";
import { signOut } from "@/integrations/auth/provider/supabase";
import { Locale } from "@/types";
import { cn } from "@/utils/utils";
import { toast } from "@/lib/toast";
import logger from "@/utils/logger";

type AdminUser = {
  email: string;
  name?: string;
  avatarUrl?: string;
};

type AdminView = "overview" | "quests" | "community";

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
  meta?: {
    source?: string;
    silent_add?: boolean;
  };
}

interface CommunityMessage {
  id: string;
  creator_name: string;
  creator_avatar_url?: string;
  messages: Record<string, string>;
  created_at: string;
  user_id?: string;
}

type QuestSummary = {
  slug: string;
  title: string;
};

const participantsKey = (selectedQuest: string) =>
  `${landlordApiRoutes.quests.participants}${selectedQuest !== "all" ? `?slug=${selectedQuest}` : ""}`;

const navItems: Array<{
  key: AdminView;
  label: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    key: "overview",
    label: "Dashboard",
    description: "Vue globale",
    icon: LayoutDashboard,
  },
  {
    key: "quests",
    label: "Quests",
    description: "Participants",
    icon: Trophy,
  },
  {
    key: "community",
    label: "Community",
    description: "Mur public",
    icon: MessageSquareText,
  },
];

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});

async function fetchQuests(): Promise<QuestSummary[]> {
  try {
    const quests = await getAllQuests();
    return quests.map((quest) => ({
      slug: quest.slug,
      title: quest.title,
    }));
  } catch (error) {
    logger.error("Failed to fetch quests:", error);
    return [];
  }
}

async function fetchParticipants(url: string): Promise<Participant[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch participants");
  }
  const data = await response.json();
  return data.participants || [];
}

async function fetchMessages(url: string): Promise<CommunityMessage[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  const data = await response.json();
  return data.messages || [];
}

function formatDate(value?: string) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return dateFormatter.format(date);
}

function formatTime(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return timeFormatter.format(date);
}

function AdminCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className={cn(
        "rounded-[24px] border border-black/8 bg-white/85 shadow-[0_1px_0_rgba(17,25,31,0.04)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </Card>
  );
}

function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
}) {
  const tones = {
    neutral: "bg-black/5 text-black/60",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-[#ffed90] text-[#11191f]",
    danger: "bg-red-50 text-red-700",
    info: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-[22px] border border-dashed border-black/10 bg-black/[0.02] p-8 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-white text-black/70 shadow-sm">
        <Icon size={20} />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-black/50">
        {description}
      </p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: React.ElementType;
  tone: "dark" | "yellow" | "green" | "white";
}) {
  const toneClass = {
    dark: "bg-[#11191f] text-white",
    yellow: "bg-[#ffed90] text-[#11191f]",
    green: "bg-emerald-50 text-emerald-800",
    white: "bg-white text-[#11191f]",
  };

  return (
    <AdminCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-black/50">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
            {value}
          </p>
          <p className="mt-2 text-xs text-black/45">{detail}</p>
        </div>
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-2xl",
            toneClass[tone],
          )}
        >
          <Icon size={19} />
        </div>
      </div>
    </AdminCard>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative w-full min-w-0 md:max-w-xs">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35"
      />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 rounded-xl border-black/8 bg-white pl-9 text-sm"
      />
    </div>
  );
}

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  loading,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" variant="modern">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogSeparator />
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            asIcon
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ParticipantModal({
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
    language: Locale.FR,
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
        language: Locale.FR,
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
            Ajoute une inscription manuelle à une quest. L'envoi email reste
            optionnel.
          </DialogDescription>
        </DialogHeader>
        <DialogSeparator />
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
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
            <div className="space-y-2">
              <Label htmlFor="participant-language">Langue</Label>
              <Select
                value={form.language}
                onValueChange={(value: Locale) =>
                  setForm((current) => ({ ...current, language: value }))
                }
              >
                <SelectTrigger id="participant-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Locale).map((locale) => (
                    <SelectItem key={locale} value={locale}>
                      {locale.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                Désactivé par défaut pour les ajouts silencieux.
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
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} asIcon>
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function MessageModal({
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
      messages: message?.messages ? { ...message.messages } : {},
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
            Renseigne le créateur et les variantes de message par langue.
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
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} asIcon>
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {message ? "Mettre à jour" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AdminDashboard({ user }: { user: AdminUser }) {
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState("all");
  const [participantSearch, setParticipantSearch] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [participantModalOpen, setParticipantModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<CommunityMessage | null>(
    null,
  );
  const [messageToDelete, setMessageToDelete] = useState<CommunityMessage | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: quests = [] } = useSWR("landlord-quests", fetchQuests);
  const {
    data: participants = [],
    isLoading: participantsLoading,
    error: participantsError,
  } = useSWR(participantsKey(selectedQuest), fetchParticipants);
  const {
    data: messages = [],
    isLoading: messagesLoading,
    error: messagesError,
  } = useSWR(landlordApiRoutes.community.messages, fetchMessages);

  const filteredParticipants = useMemo(() => {
    const query = participantSearch.trim().toLowerCase();
    if (!query) return participants;
    return participants.filter((participant) =>
      [
        participant.name,
        participant.email,
        participant.challenge_slug,
        participant.type,
        participant.source,
        participant.meta?.source,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [participantSearch, participants]);

  const filteredMessages = useMemo(() => {
    const query = messageSearch.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter((message) =>
      [
        message.creator_name,
        message.creator_avatar_url,
        ...Object.values(message.messages || {}),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [messageSearch, messages]);

  const stats = useMemo(() => {
    const registrations = participants.filter((item) => item.type === "register");
    const submissions = participants.filter((item) => item.type === "submission");
    const today = new Date().toDateString();
    const todayActivity =
      participants.filter((item) => new Date(item.created_at).toDateString() === today)
        .length +
      messages.filter((item) => new Date(item.created_at).toDateString() === today)
        .length;

    return {
      registrations: registrations.length,
      submissions: submissions.length,
      messages: messages.length,
      todayActivity,
    };
  }, [messages, participants]);

  const recentActivity = useMemo(() => {
    const participantRows = participants.slice(0, 5).map((participant) => ({
      id: `participant-${participant.id}`,
      title: participant.name,
      subtitle: `${participant.type === "submission" ? "Soumission" : "Inscription"} · ${participant.challenge_slug}`,
      date: participant.created_at,
      icon: participant.type === "submission" ? Send : Users,
    }));
    const messageRows = messages.slice(0, 5).map((message) => ({
      id: `message-${message.id}`,
      title: message.creator_name,
      subtitle: "Message communauté",
      date: message.created_at,
      icon: MessageSquareText,
    }));

    return [...participantRows, ...messageRows]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [messages, participants]);

  const refreshAll = () => {
    mutate(participantsKey(selectedQuest));
    mutate(landlordApiRoutes.community.messages);
    mutate("landlord-quests");
    toast.success("Dashboard rafraîchi.");
  };

  const handleUpdateLanguage = async (id: string, language: string) => {
    try {
      const response = await fetch(landlordApiRoutes.quests.participantById(id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });
      if (!response.ok) throw new Error("Failed to update language");
      toast.success("Langue mise à jour.");
      mutate(participantsKey(selectedQuest));
    } catch (error) {
      logger.error("Failed to update language:", error);
      toast.error("Impossible de mettre à jour la langue.");
    }
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        landlordApiRoutes.community.messageById(messageToDelete.id),
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error("Failed to delete message");
      toast.success("Message supprimé.");
      setMessageToDelete(null);
      mutate(landlordApiRoutes.community.messages);
    } catch (error) {
      logger.error("Failed to delete message:", error);
      toast.error("Impossible de supprimer le message.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = landlordRoutes.login.link;
    } catch (error) {
      logger.error("Failed to sign out:", error);
      toast.error("Déconnexion impossible.");
    }
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-[#ece8d8] p-3 md:p-6">
      <aside
        className={cn(
          "fixed inset-y-3 left-3 z-40 w-72 -translate-x-[calc(100%+1rem)] rounded-[28px] bg-[#11191f] p-4 text-white transition-transform duration-300 md:static md:inset-auto md:translate-x-0",
          sidebarOpen && "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-[#11191f]">
                <ShieldCheck size={19} />
              </div>
              <div>
                <p className="text-sm font-semibold">Landlord</p>
                <p className="text-xs text-white/45">Shirofolio admin</p>
              </div>
            </div>
            <Button
              variant="none"
              size="icon"
              className="text-white md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Fermer la navigation"
            >
              <X size={18} />
            </Button>
          </div>

          <nav className="grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveView(item.key);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition",
                    isActive
                      ? "bg-white text-[#11191f]"
                      : "text-white/62 hover:bg-white/8 hover:text-white",
                  )}
                >
                  <Icon size={18} />
                  <span className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    <span
                      className={cn(
                        "text-xs",
                        isActive ? "text-black/45" : "text-white/35",
                      )}
                    >
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/8 p-4">
            <p className="text-sm font-medium">Admin standards</p>
            <p className="mt-2 text-xs leading-5 text-white/50">
              Actions sensibles confirmées, données filtrables et feedback par
              toast.
            </p>
          </div>

          <div className="mt-auto grid gap-2">
            <a
              href="/"
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/55 hover:bg-white/8 hover:text-white"
            >
              <Home size={17} />
              Retour au site
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/55 hover:bg-white/8 hover:text-white"
            >
              <LogOut size={17} />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          aria-label="Fermer la navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden md:pl-6">
        <header className="mb-4 flex items-center gap-3 rounded-[26px] border border-black/8 bg-[#f8f7f1]/90 p-3 shadow-sm backdrop-blur-xl">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Ouvrir la navigation"
          >
            <PanelLeft size={18} />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-black/45">Admin panel</p>
            <h1 className="truncate text-xl font-semibold tracking-[-0.02em] md:text-2xl">
              {navItems.find((item) => item.key === activeView)?.label}
            </h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={refreshAll}
            aria-label="Rafraîchir"
          >
            <RefreshCw size={17} />
          </Button>
          <Button variant="outline" size="icon" aria-label="Notifications">
            <Bell size={17} />
          </Button>
          <div className="hidden items-center gap-3 rounded-2xl bg-white px-3 py-2 md:flex">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || user.email}
                className="size-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-9 items-center justify-center rounded-full bg-[#ffed90]">
                <UserRound size={17} />
              </div>
            )}
            <div className="max-w-44">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-black/45">{user.email}</p>
            </div>
          </div>
        </header>

        <section className="min-h-0 flex-1 overflow-y-auto rounded-[30px] border border-black/8 bg-[#f8f7f1] p-4 md:p-6">
          {activeView === "overview" && (
            <div className="grid gap-5">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  label="Inscriptions"
                  value={stats.registrations}
                  detail="Toutes quests confondues"
                  icon={Users}
                  tone="dark"
                />
                <MetricCard
                  label="Soumissions"
                  value={stats.submissions}
                  detail="Travaux envoyés"
                  icon={Send}
                  tone="yellow"
                />
                <MetricCard
                  label="Messages"
                  value={stats.messages}
                  detail="Mur communautaire"
                  icon={MessageSquareText}
                  tone="green"
                />
                <MetricCard
                  label="Aujourd'hui"
                  value={stats.todayActivity}
                  detail="Nouvelles entrées"
                  icon={Clock}
                  tone="white"
                />
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
                <AdminCard className="p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">Activité récente</h2>
                      <p className="text-sm text-black/45">
                        Dernières inscriptions, soumissions et messages.
                      </p>
                    </div>
                    <Badge variant="white" className="bg-[#ffed90]">
                      Live
                    </Badge>
                  </div>
                  {recentActivity.length ? (
                    <div className="grid gap-2">
                      {recentActivity.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 rounded-2xl border border-black/6 bg-white px-4 py-3"
                          >
                            <div className="flex size-10 items-center justify-center rounded-2xl bg-black/[0.04]">
                              <Icon size={17} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">
                                {item.title}
                              </p>
                              <p className="truncate text-xs text-black/45">
                                {item.subtitle}
                              </p>
                            </div>
                            <p className="text-xs text-black/45">
                              {formatDate(item.date)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <EmptyState
                      icon={Clock}
                      title="Aucune activité"
                      description="Les prochaines inscriptions et messages apparaîtront ici."
                    />
                  )}
                </AdminCard>

                <AdminCard className="p-5">
                  <h2 className="text-lg font-semibold">Health check</h2>
                  <p className="mt-1 text-sm text-black/45">
                    État rapide des modules du dashboard.
                  </p>
                  <div className="mt-5 grid gap-3">
                    {[
                      ["Quests API", participantsError ? "À vérifier" : "OK"],
                      ["Community API", messagesError ? "À vérifier" : "OK"],
                      ["Auth", "Admin"],
                    ].map(([label, state]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-2xl bg-white px-4 py-3"
                      >
                        <span className="text-sm">{label}</span>
                        <StatusPill tone={state === "OK" || state === "Admin" ? "success" : "danger"}>
                          {state}
                        </StatusPill>
                      </div>
                    ))}
                  </div>
                </AdminCard>
              </div>
            </div>
          )}

          {activeView === "quests" && (
            <div className="grid gap-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                    Participants quests
                  </h2>
                  <p className="mt-1 text-sm text-black/45">
                    Suis les inscriptions et soumissions sans quitter le panel.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    asIcon
                    onClick={() => mutate(participantsKey(selectedQuest))}
                  >
                    <RefreshCw size={16} />
                    Rafraîchir
                  </Button>
                  <Button asIcon onClick={() => setParticipantModalOpen(true)}>
                    <Plus size={16} />
                    Ajouter
                  </Button>
                </div>
              </div>

              <AdminCard className="p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <SearchBox
                    value={participantSearch}
                    onChange={setParticipantSearch}
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
                {participantsLoading ? (
                  <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
                    <Loader2 size={18} className="animate-spin" />
                    Chargement des participants...
                  </div>
                ) : filteredParticipants.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                      <thead className="border-b border-black/8 text-xs text-black/45">
                        <tr>
                          <th className="px-5 py-4 font-medium">Participant</th>
                          <th className="px-5 py-4 font-medium">Quest</th>
                          <th className="px-5 py-4 font-medium">Type</th>
                          <th className="px-5 py-4 font-medium">Langue</th>
                          <th className="px-5 py-4 font-medium">Date</th>
                          <th className="px-5 py-4 text-right font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/6">
                        {filteredParticipants.map((participant) => (
                          <tr key={`${participant.type}-${participant.id}`} className="hover:bg-black/[0.02]">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-[#ffed90] text-sm font-semibold">
                                  {participant.name?.charAt(0)?.toUpperCase() || "?"}
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate font-medium">
                                    {participant.name}
                                  </p>
                                  <p className="truncate text-xs text-black/45">
                                    {participant.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="max-w-60 truncate text-black/70">
                                {participant.challenge_slug}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <StatusPill
                                tone={participant.type === "submission" ? "info" : "warning"}
                              >
                                {participant.type === "submission"
                                  ? "Soumission"
                                  : "Inscription"}
                              </StatusPill>
                            </td>
                            <td className="px-5 py-4">
                              <Select
                                value={participant.language || Locale.EN}
                                onValueChange={(value) =>
                                  handleUpdateLanguage(participant.id, value)
                                }
                              >
                                <SelectTrigger className="h-9 w-24 bg-white text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values(Locale).map((locale) => (
                                    <SelectItem key={locale} value={locale}>
                                      {locale.toUpperCase()}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-5 py-4 text-black/55">
                              <div>{formatDate(participant.created_at)}</div>
                              <div className="text-xs text-black/35">
                                {formatTime(participant.created_at)}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="icon" aria-label="Actions participant">
                                    <MoreHorizontal size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  {participant.work_url ? (
                                    <DropdownMenuItem asChild>
                                      <a
                                        href={participant.work_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
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
                ) : (
                  <div className="p-6">
                    <EmptyState
                      icon={Users}
                      title="Aucun participant"
                      description="Aucune entrée ne correspond au filtre actuel."
                    />
                  </div>
                )}
              </AdminCard>
            </div>
          )}

          {activeView === "community" && (
            <div className="grid gap-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                    Mur communautaire
                  </h2>
                  <p className="mt-1 text-sm text-black/45">
                    Ajoute, corrige et supprime les messages visibles publiquement.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    asIcon
                    onClick={() => mutate(landlordApiRoutes.community.messages)}
                  >
                    <RefreshCw size={16} />
                    Rafraîchir
                  </Button>
                  <Button
                    asIcon
                    onClick={() => {
                      setEditingMessage(null);
                      setMessageModalOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    Ajouter
                  </Button>
                </div>
              </div>

              <AdminCard className="p-4">
                <SearchBox
                  value={messageSearch}
                  onChange={setMessageSearch}
                  placeholder="Rechercher créateur, message, langue..."
                />
              </AdminCard>

              <AdminCard className="overflow-hidden">
                {messagesLoading ? (
                  <div className="flex min-h-72 items-center justify-center gap-2 text-sm text-black/50">
                    <Loader2 size={18} className="animate-spin" />
                    Chargement des messages...
                  </div>
                ) : filteredMessages.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                      <thead className="border-b border-black/8 text-xs text-black/45">
                        <tr>
                          <th className="px-5 py-4 font-medium">Créateur</th>
                          <th className="px-5 py-4 font-medium">Messages</th>
                          <th className="px-5 py-4 font-medium">Langues</th>
                          <th className="px-5 py-4 font-medium">Date</th>
                          <th className="px-5 py-4 text-right font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/6">
                        {filteredMessages.map((message) => {
                          const entries = Object.entries(message.messages || {});
                          return (
                            <tr key={message.id} className="hover:bg-black/[0.02]">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  {message.creator_avatar_url ? (
                                    <img
                                      src={message.creator_avatar_url}
                                      alt={message.creator_name}
                                      className="size-10 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex size-10 items-center justify-center rounded-full bg-[#ffed90] text-sm font-semibold">
                                      {message.creator_name?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium">
                                      {message.creator_name}
                                    </p>
                                    <p className="text-xs text-black/45">
                                      {message.user_id ? "Utilisateur lié" : "Ajout manuel"}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="grid max-w-xl gap-1">
                                  {entries.slice(0, 2).map(([locale, value]) => (
                                    <p key={locale} className="truncate text-black/65">
                                      <span className="mr-2 text-xs font-semibold uppercase text-black/35">
                                        {locale}
                                      </span>
                                      {value}
                                    </p>
                                  ))}
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {entries.map(([locale]) => (
                                    <StatusPill key={locale} tone="neutral">
                                      {locale.toUpperCase()}
                                    </StatusPill>
                                  ))}
                                </div>
                              </td>
                              <td className="px-5 py-4 text-black/55">
                                <div>{formatDate(message.created_at)}</div>
                                <div className="text-xs text-black/35">
                                  {formatTime(message.created_at)}
                                </div>
                              </td>
                              <td className="px-5 py-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" aria-label="Actions message">
                                      <MoreHorizontal size={16} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-44">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setEditingMessage(message);
                                        setMessageModalOpen(true);
                                      }}
                                    >
                                      <Pencil size={14} />
                                      Modifier
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      variant="destructive"
                                      onClick={() => setMessageToDelete(message)}
                                    >
                                      <Trash2 size={14} />
                                      Supprimer
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6">
                    <EmptyState
                      icon={MessageSquareText}
                      title="Aucun message"
                      description="Aucun message ne correspond à ta recherche."
                    />
                  </div>
                )}
              </AdminCard>
            </div>
          )}
        </section>
      </main>

      <ParticipantModal
        open={participantModalOpen}
        quests={quests}
        selectedQuest={selectedQuest}
        onOpenChange={setParticipantModalOpen}
        onCreated={() => mutate(participantsKey(selectedQuest))}
      />
      <MessageModal
        open={messageModalOpen}
        message={editingMessage}
        onOpenChange={(open) => {
          setMessageModalOpen(open);
          if (!open) setEditingMessage(null);
        }}
        onSaved={() => mutate(landlordApiRoutes.community.messages)}
      />
      <ConfirmDialog
        open={!!messageToDelete}
        title="Supprimer ce message ?"
        description="Cette action supprimera le message du mur communautaire. Elle ne peut pas être annulée depuis le dashboard."
        confirmLabel="Supprimer"
        loading={isDeleting}
        onOpenChange={(open) => !open && setMessageToDelete(null)}
        onConfirm={handleDeleteMessage}
      />
    </div>
  );
}
