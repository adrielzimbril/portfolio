import { ReactionType } from "@/lib/stats/types";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum Locale {
  EN = "en",
  FR = "fr",
  ZH_CN = "zh-CN",
}

export type LocaleKey = (typeof Locale)[keyof typeof Locale];

export enum ResourceType {
  COURSE = "course",
  EBOOK = "ebook",
  VIDEO = "video",
  MASTERCLASS = "masterclass",
  FIGMA_TEMPLATE = "figma_template",
  CODE = "code",
}

export type ResourceTypeKey = (typeof ResourceType)[keyof typeof ResourceType];

export enum PageType {
  PROJECT = "projects",
  HUB = "hub",
  THOUGHT = "thoughts",
  QUESTS = "quests",
  TALKS = "talks",
  COMMUNITY = "community",
  CONNECTIONS = "connections",
  CHANGELOG = "changelog",
  STATS = "stats",
  TOOLBOX = "toolbox",
}

export enum TopThoughtsListType {
  VIEWED = "viewed",
  REACTED = "reacted",
}

export enum QuestAskType {
  ENROLL = "register",
  SUBMIT = "submit",
}

export enum AttendanceType {
  IN_PERSON = "in_person",
  ONLINE = "online",
}

export enum PreviewContentType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  CUSTOM = "custom",
}

export enum PortfolioProjectType {
  WORK = "work",
  PERSONAL = "personal",
}

export enum PortfolioProjectCategory {
  DESIGN = "design",
  DEVELOPMENT = "development",
  OTHER = "other",
}

export enum PortfolioProjectResearchScope {
  WHO = "who",
  WHEN = "when",
  WHERE = "where",
  WHY = "why",
  HOW = "how",
  WHAT = "what",
}

export enum PortfolioProjectMethodology {
  PERSONA = "persona",
  EMPATHY_MAP = "empathy_map",
  JOURNEY_MAP = "journey_map",
  VALUE_PROPOSITION_MAP = "value_proposition_map",
}

export enum PortfolioProjectStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  ON_HOLD = "on_hold",
  DRAFT = "draft",
  ARCHIVED = "archived",
}

export enum ToolboxToolCategory {
  FRONTEND = "frontend",
  BACKEND = "backend",
  DESIGN = "design",
  TOOLS = "tools",
  OTHER = "other",
  CODE = "code",
  PRODUCTIVITY = "productivity",
}

export enum ToolboxSetupItemCategory {
  HARDWARE = "hardware",
  ACCESSORIES = "accessories",
  SOFTWARE = "software",
  AUDIO = "audio",
}

export enum ChangelogItemType {
  FEATURE = "feature",
  FIX = "fix",
  IMPROVEMENT = "improvement",
  MILESTONE = "milestone",
}
