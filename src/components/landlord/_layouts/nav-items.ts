import {
  IconDatabase,
  IconLayoutDashboard,
  IconMessage2,
  IconTrophy,
  IconUsers,
} from "@tabler/icons-react"
import type { NavItem } from "@/components/landlord/admin-types"

export const adminNavItems: NavItem[] = [
  {
    key: "overview",
    label: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    key: "quests-registrations",
    label: "Inscriptions",
    icon: IconUsers,
  },
  {
    key: "quests-submissions",
    label: "Soumissions",
    icon: IconTrophy,
  },
  {
    key: "community",
    label: "Community",
    icon: IconMessage2,
  },
  {
    key: "newsletter",
    label: "Newsletter",
    icon: IconDatabase,
  },
  {
    key: "users",
    label: "Users",
    icon: IconUsers,
  },
  {
    key: "submissions",
    label: "Submissions",
    icon: IconDatabase,
  },
  {
    key: "hub-requests",
    label: "Hub Requests",
    icon: IconDatabase,
  },
  {
    key: "hub-product-links",
    label: "Product Links",
    icon: IconDatabase,
  },
  {
    key: "reactions",
    label: "Reactions",
    icon: IconDatabase,
  },
]

export interface NavGroup {
  key: string
  label: string
  icon: React.ElementType
  items: NavItem[]
}

export const adminNavGroups: NavGroup[] = [
  {
    key: "quests",
    label: "Quest",
    icon: IconTrophy,
    items: [
      {
        key: "quests-registrations",
        label: "Inscriptions",
        icon: IconUsers,
      },
      {
        key: "quests-submissions",
        label: "Soumissions",
        icon: IconTrophy,
      },
    ],
  },
  {
    key: "hub",
    label: "Hub",
    icon: IconDatabase,
    items: [
      {
        key: "hub-requests",
        label: "Requests",
        icon: IconMessage2,
      },
      {
        key: "hub-product-links",
        label: "Product Links",
        icon: IconDatabase,
      },
    ],
  },
]

export const adminNavGroupKeys = {
  quests: "quests",
  hub: "hub",
} as const
