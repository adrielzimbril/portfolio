import gameEn from "@/data/personal/translate/en/game.json";
import gameFr from "@/data/personal/translate/game.json";
import gameZhCN from "@/data/personal/translate/zh-CN/game.json";
import testimonialsEn from "@/data/personal/translate/en/testimonials.json";
import testimonialsFr from "@/data/personal/translate/testimonials.json";
import testimonialsZhCN from "@/data/personal/translate/zh-CN/testimonials.json";
import {
  ChangelogItemType,
  Locale,
  ToolboxSetupItemCategory,
  ToolboxToolCategory,
} from "@/types/enum";

export interface TestimonialItem {
  id: number;
  name: string;
  position: string;
  testimonial: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  avatar?: string;
}

export interface GameItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  subtitle: string;
  isTrue: boolean;
  funFact?: string;
  funnyTruthMessage?: string;
  funnyLieMessage?: string;
}

const testimonialsByLocale: Record<Locale, TestimonialItem[]> = {
  [Locale.FR]: testimonialsFr,
  [Locale.EN]: testimonialsEn,
  [Locale.ZH_CN]: testimonialsZhCN,
};

const gamesByLocale: Record<Locale, GameItem[]> = {
  [Locale.FR]: gameFr,
  [Locale.EN]: gameEn,
  [Locale.ZH_CN]: gameZhCN,
};

function resolveLocale(locale: string): Locale {
  const normalized = locale.toLowerCase();

  if (normalized === "en") {
    return Locale.EN;
  }

  if (normalized === "zh-cn" || normalized === "zh") {
    return Locale.ZH_CN;
  }

  return Locale.FR;
}

export function getTestimonialsByLocale(locale: string): TestimonialItem[] {
  return testimonialsByLocale[resolveLocale(locale)];
}

export function getGamesByLocale(locale: string): GameItem[] {
  return gamesByLocale[resolveLocale(locale)];
}

export interface ConnectionItem {
  id: string;
  platform: string;
  url: string;
  icon: string;
  description: string;
  active: boolean;
}

export interface ToolItem {
  id: string;
  name: string;
  category: ToolboxToolCategory;
  description: string;
  url?: string;
  icon?: string;
}

export interface SetupItem {
  id: string;
  name: string;
  category: ToolboxSetupItemCategory;
  tags: string[];
  description: string;
  imageUrl?: string;
  purchaseUrl?: string;
}

export interface ChangelogItem {
  id: string;
  version: string;
  date: string;
  changes: string[];
  type: ChangelogItemType;
}
