import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { getAllQuests } from "@/integrations/content/lib/quests";
import logger from "@/utils/logger";
import type {
  CommunityMessage,
  DataTableKey,
  LandlordTableResponse,
  Participant,
  QuestSummary,
} from "@/components/landlord/admin-types";
import { REACTION_EMOJIS, ReactionType } from "@/lib/stats/types";

export const registrationsKey = (
  selectedQuest: string,
  page: number,
  pageSize = 10,
) => {
  const params = new URLSearchParams();
  if (selectedQuest !== "all") params.set("slug", selectedQuest);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  return `${landlordApiRoutes.quests.registrations}?${params.toString()}`;
};

export const submissionsKey = (
  selectedQuest: string,
  page: number,
  pageSize = 10,
) => {
  const params = new URLSearchParams();
  if (selectedQuest !== "all") params.set("slug", selectedQuest);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  return `${landlordApiRoutes.quests.submissions}?${params.toString()}`;
};

export const participantsKey = (
  selectedQuest: string,
  page: number,
  pageSize = 10,
  type?: string,
) => {
  if (type === "submission")
    return submissionsKey(selectedQuest, page, pageSize);
  return registrationsKey(selectedQuest, page, pageSize);
};

export const messagesKey = (page: number, pageSize = 10) => {
  return `${landlordApiRoutes.community.messages}?page=${page}&pageSize=${pageSize}`;
};

export const dataTableKey = (
  table: DataTableKey,
  page: number,
  pageSize = 10,
) => {
  let base: string;
  if (table === "hub-requests") {
    base = landlordApiRoutes.hub.requests;
  } else if (table === "hub-product-links") {
    base = landlordApiRoutes.hub.productLinks;
  } else {
    base = landlordApiRoutes.data[table as keyof typeof landlordApiRoutes.data];
  }
  return `${base}?page=${page}&pageSize=${pageSize}`;
};

const formattersCache: Record<string, Intl.DateTimeFormat> = {};

function getFormatter(locale: string, options: Intl.DateTimeFormatOptions) {
  const key = `${locale}-${JSON.stringify(options)}`;
  if (!formattersCache[key]) {
    formattersCache[key] = new Intl.DateTimeFormat(locale, options);
  }
  return formattersCache[key];
}

export function formatDate(value?: string, locale: string = "fr-FR") {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return getFormatter(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatTime(value?: string, locale: string = "fr-FR") {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return getFormatter(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
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

export function formatDateTimePremium(
  value?: string,
  locale: string = "en-US",
) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  // Format: "Sunday, April 19, 2026, 01:18 AM"
  // Transform to: "Sunday, April 19, 2026 at 01:18 AM"
  const formatted = getFormatter(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  const parts = formatted.split(", ");
  if (parts.length >= 3) {
    const dayAndMonth = parts.slice(0, 2).join(", ");
    const yearAndTime = parts.slice(2).join(" at ");
    return `${dayAndMonth}, ${yearAndTime}`;
  }
  return formatted;
}

export function formatCell(
  value: unknown,
  key?: string,
  locale: string = "fr-FR",
) {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "string") {
    // Dates
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      return formatDate(value, locale);
    }
    // Reactions (text-only for table cells)
    if (
      key?.toLowerCase().includes("reaction") ||
      key?.toLowerCase() === "type"
    ) {
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

export async function fetchLandlordTable(
  url: string,
): Promise<LandlordTableResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export async function fetchParticipants(
  url: string,
): Promise<LandlordTableResponse> {
  return fetchLandlordTable(url);
}

export async function fetchMessages(
  url: string,
): Promise<LandlordTableResponse> {
  return fetchLandlordTable(url);
}

export async function deleteParticipant(
  type: "register" | "submission",
  id: string,
) {
  const baseUrl =
    type === "submission"
      ? landlordApiRoutes.quests.submissions
      : landlordApiRoutes.quests.registrations;
  const url = `${baseUrl}/${id}`;
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete participant");
  }
  return response.json();
}

export async function updateParticipant(
  type: "register" | "submission",
  id: string,
  data: any,
) {
  const baseUrl =
    type === "submission"
      ? landlordApiRoutes.quests.submissions
      : landlordApiRoutes.quests.registrations;
  const url = `${baseUrl}/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update participant");
  }
  return response.json();
}
