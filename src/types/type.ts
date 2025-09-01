import { ResourceType } from "./enum";

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  permissions: string[];
  role: string;
}

export interface ResourcePreview {
  id: string | number;
  title: string;
  type: ResourceType;
  description: string;
  details: string;
  icon: string;
  iconAlt: string;
  primaryTag: string;
  tags: string[];
  avatars: Array<{ bg: string }>;
  userCount: string;
  buttonText: string;
}

export interface ResourcePreviewCardInfoProps {
  details: ResourcePreview;
}

export interface ResourceInnerStatementPreview {
  icon: string;
  number: string;
  description: string;
}

export interface ResourceInnerStatementPreviewCardInfoProps {
  details: ResourceInnerStatementPreview;
}

export interface ProjectPreview {
  id: string | number;
  title: string;
  description: string;
  tags: string[];
  categories: {
    name: string;
    color: number;
  }[];
  buttonText: string;
}

export interface ProjectPreviewCardInfoProps {
  details: ProjectPreview;
  isWide?: boolean;
}

export interface PreviewCardContainerSectionProps {
  /**
   * Number of cards to display
   * @default 0 - All cards
   */
  limit?: number;
}

export interface ProjectPreviewCardContainerSectionProps
  extends PreviewCardContainerSectionProps {
  /**
   * Force all cards to be wide on desktop
   * @default false
   */
  allWide?: boolean;

  /**
   * Number of cards to display in wide format on desktop
   * The others will be in vertical format (preview on top, info on bottom)
   * @default 0 - All cards in vertical format
   * @minimum 0
   */
  wideCardsCount?: number;
}

export interface ThoughtPreview {
  id: string | number;
  date: string;
  primaryTag: string;
  tags: string[];
  title: string;
  description: string;
  buttonText: string;
}

export interface ThoughtPreviewCardInfoProps {
  details: ThoughtPreview;
}

/**
 * Types for better security
 *
 * @template T - The type of the data
 */
export type JsonData<T = unknown> = Record<string, unknown> | unknown[] | T;


export type GetServerMode = {
  mode?: "server" | "client" | "auto";
};
