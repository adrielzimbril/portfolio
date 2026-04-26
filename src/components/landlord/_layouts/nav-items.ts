import {
  Database,
  LayoutDashboard,
  MessageSquareText,
  Trophy,
  Users,
  ChevronDown,
} from "lucide-react";
import type { NavItem } from "@/components/landlord/admin-types";

export const adminNavItems: NavItem[] = [
  {
    key: "overview",
    label: "Dashboard",
    description: "Vue globale",
    icon: LayoutDashboard,
  },
  {
    key: "quests-registrations",
    label: "Inscriptions",
    description: "Inscriptions aux quests",
    icon: Users,
  },
  {
    key: "quests-submissions",
    label: "Soumissions",
    description: "Rendus de quests",
    icon: Trophy,
  },
  {
    key: "community",
    label: "Community",
    description: "Messages publics",
    icon: MessageSquareText,
  },
  {
    key: "newsletter",
    label: "Newsletter",
    description: "Abonnés et sources",
    icon: Database,
  },
  {
    key: "users",
    label: "Users",
    description: "Contacts et comptes",
    icon: Users,
  },
  {
    key: "submissions",
    label: "Submissions",
    description: "Demandes entrantes",
    icon: Database,
  },
  {
    key: "hub-requests",
    label: "Hub Requests",
    description: "Demandes produits",
    icon: Database,
  },
  {
    key: "hub-product-links",
    label: "Product Links",
    description: "Gestion ressources",
    icon: Database,
  },
  {
    key: "reactions",
    label: "Reactions",
    description: "Engagement contenu",
    icon: Database,
  },
];

export interface NavGroup {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  items: NavItem[];
}

export const adminNavGroups: NavGroup[] = [
  {
    key: "quests",
    label: "Quest",
    description: "Inscriptions et soumissions",
    icon: Trophy,
    items: [
      {
        key: "quests-registrations",
        label: "Inscriptions",
        description: "Inscrits aux quests",
        icon: Users,
      },
      {
        key: "quests-submissions",
        label: "Soumissions",
        description: "Rendus de quests",
        icon: Trophy,
      },
    ],
  },
  {
    key: "hub",
    label: "Hub",
    description: "Ressources et demandes",
    icon: Database,
    items: [
      {
        key: "hub-requests",
        label: "Requests",
        description: "Demandes produits",
        icon: MessageSquareText,
      },
      {
        key: "hub-product-links",
        label: "Product Links",
        description: "Gestion ressources",
        icon: Database,
      },
    ],
  },
];

export const adminNavGroupKeys = {
  quests: "quests",
  hub: "hub",
} as const;
