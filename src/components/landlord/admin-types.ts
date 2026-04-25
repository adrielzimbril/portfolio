import type React from "react";

export type AdminUser = {
  email: string;
  name?: string;
  avatarUrl?: string;
};

export type AdminView =
  | "overview"
  | "quests-registrations"
  | "quests-submissions"
  | "community"
  | "newsletter"
  | "users"
  | "submissions"
  | "hub-requests"
  | "hub-product-links"
  | "reactions";

export type Participant = {
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
  meta?: {
    source?: string;
    silent_add?: boolean;
  };
};

export type CommunityMessage = {
  id: string;
  creator_name: string;
  creator_avatar_url?: string;
  message?: Record<string, string>;
  created_at: string;
  user_id?: string;
};

export type QuestSummary = {
  slug: string;
  title: string;
};

export type DataTableKey =
  | "users"
  | "newsletter"
  | "submissions"
  | "hub-requests"
  | "hub-product-links"
  | "reactions";

export type LandlordTableResponse = {
  rows: Array<Record<string, unknown>>;
  count: number;
  page: number;
  pageSize: number;
  table: DataTableKey;
  label: string;
};

export type NavItem = {
  key: AdminView;
  label: string;
  description: string;
  icon: React.ElementType;
};
