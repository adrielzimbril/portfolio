import {
  Database,
  LayoutDashboard,
  MessageSquareText,
  Trophy,
  Users,
} from "lucide-react";
import type { NavItem } from "@/components/landlord/admin-types";

export const adminNavItems: NavItem[] = [
  {
    key: "overview",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "quests-registrations",
    label: "Inscriptions",
    icon: Users,
  },
  {
    key: "quests-submissions",
    label: "Soumissions",
    icon: Trophy,
  },
  {
    key: "community",
    label: "Community",
    icon: MessageSquareText,
  },
  {
    key: "newsletter",
    label: "Newsletter",
    icon: Database,
  },
  {
    key: "users",
    label: "Users",
    icon: Users,
  },
  {
    key: "submissions",
    label: "Submissions",
    icon: Database,
  },
  {
    key: "hub-requests",
    label: "Hub Requests",
    icon: Database,
  },
  {
    key: "hub-product-links",
    label: "Product Links",
    icon: Database,
  },
  {
    key: "reactions",
    label: "Reactions",
    icon: Database,
  },
];

export interface NavGroup {
  key: string;
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

export const adminNavGroups: NavGroup[] = [
  {
    key: "quests",
    label: "Quest",
    icon: Trophy,
    items: [
      {
        key: "quests-registrations",
        label: "Inscriptions",
        icon: Users,
      },
      {
        key: "quests-submissions",
        label: "Soumissions",
        icon: Trophy,
      },
    ],
  },
  {
    key: "hub",
    label: "Hub",
    icon: Database,
    items: [
      {
        key: "hub-requests",
        label: "Requests",
        icon: MessageSquareText,
      },
      {
        key: "hub-product-links",
        label: "Product Links",
        icon: Database,
      },
    ],
  },
];

export const adminNavGroupKeys = {
  quests: "quests",
  hub: "hub",
} as const;
