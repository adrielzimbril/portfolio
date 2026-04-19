import { landlordApiRoutes } from "@/data/landlordApiRoutes";
import { getAllQuests } from "@/integrations/content/lib/quests";
import logger from "@/utils/logger";
import type {
  CommunityMessage,
  DataTableKey,
  LandlordTableResponse,
  Participant,
  QuestSummary,
} from "./admin-types";

export const participantsKey = (selectedQuest: string) =>
  `${landlordApiRoutes.quests.participants}${selectedQuest !== "all" ? `?slug=${selectedQuest}` : ""}`;

export const dataTableKey = (
  table: DataTableKey,
  page: number,
  pageSize = 10,
) =>
  `${landlordApiRoutes.data.table}?table=${table}&page=${page}&pageSize=${pageSize}`;

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
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

export function formatCell(value: unknown) {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return formatDate(value);
  }
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function normalizeMessage(message: CommunityMessage) {
  return message.messages || message.message || {};
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
