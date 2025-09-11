export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export enum Locale {
  EN = "en",
  FR = "fr",
  CN = "cn",
}

export enum ResourceType {
  COURSE = "course",
  EBOOK = "ebook",
  VIDEO = "video",
}

export type ResourceTypeKey = (typeof ResourceType)[keyof typeof ResourceType];

export enum PageType {
  PROJECT = "projects",
  HUB = "hub",
  THOUGHT = "thoughts",
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
