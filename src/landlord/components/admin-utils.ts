import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { getAllQuests } from "@/integrations/content/lib/quests";
import logger from "@/utils/logger";
import type {
  CommunityMessage,
  DataTableKey,
  LandlordTableResponse,
  Participant,
  QuestSummary,
} from "@/landlord/components/admin-types";
import { REACTION_EMOJIS, ReactionType } from "@/lib/stats/types";

export const participantsKey = (selectedQuest: string) =>
  `${landlordApiRoutes.quests.participants}${selectedQuest !== "all" ? `?slug=${selectedQuest}` : ""}`;

export const dataTableKey = (
  table: DataTableKey,
  page: number,
  pageSize = 10,
) => {
  const base = landlordApiRoutes.data[table as keyof typeof landlordApiRoutes.data];
  return `${base}?page=${page}&pageSize=${pageSize}`;
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});

const premiumDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export function formatDate(value?: string) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return dateFormatter.format(date);
}

export function formatTime(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return timeFormatter.format(date);
}

export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatLabel(str: string) {
  if (!str) return "";
  return str.split(/[_\s]/).map(capitalize).join(" ");
}

export function formatReaction(reaction: string) {
  const emoji = REACTION_EMOJIS[reaction.toLowerCase() as ReactionType];
  return emoji ? `${emoji} ${capitalize(reaction)}` : capitalize(reaction);
}

export function formatDateTimePremium(value?: string) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  // Format: "Sunday, April 19, 2026, 01:18 AM"
  // Transform to: "Sunday, April 19, 2026 at 01:18 AM"
  const formatted = premiumDateTimeFormatter.format(date);
  const parts = formatted.split(", ");
  if (parts.length >= 3) {
    const dayAndMonth = parts.slice(0, 2).join(", ");
    const yearAndTime = parts.slice(2).join(" at ");
    return `${dayAndMonth}, ${yearAndTime}`;
  }
  return formatted;
}

export function formatCell(value: unknown, key?: string) {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "string") {
    // Dates
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      return formatDate(value);
    }
    // Reactions (text-only for table cells)
    if (key?.toLowerCase().includes("reaction") || key?.toLowerCase() === "type") {
       if (REACTION_EMOJIS[value.toLowerCase() as ReactionType]) {
        return formatReaction(value);
      }
    }
  }
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function normalizeMessage(message: CommunityMessage) {
  return message.message || {};
}

export async function fetchQuests(): Promise<QuestSummary[]> {
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

export async function fetchParticipants(url: string): Promise<Participant[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch participants");
  }
  const data = await response.json();
  return data.participants || [];
}

export async function fetchMessages(url: string): Promise<CommunityMessage[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  const data = await response.json();
  return data.messages || [];
}

export async function fetchLandlordTable(
  url: string,
): Promise<LandlordTableResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch landlord table");
  }
  return response.json();
}
