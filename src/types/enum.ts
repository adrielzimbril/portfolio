export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum Locale {
  FR = "fr",
}

export type LocaleKey = (typeof Locale)[keyof typeof Locale];
