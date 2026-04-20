import { Database, LayoutDashboard, MessageSquareText, Trophy, Users } from "lucide-react";
import type { NavItem } from "@/landlord/components/admin-types";

export const adminNavItems: NavItem[] = [
  { key: "overview", label: "Dashboard", description: "Vue globale", icon: LayoutDashboard },
  { key: "quests-registrations", label: "Inscriptions", description: "Inscriptions aux quests", icon: Users },
  { key: "quests-submissions", label: "Soumissions", description: "Rendus de quests", icon: Trophy },
  { key: "community", label: "Community", description: "Messages publics", icon: MessageSquareText },
  { key: "newsletter", label: "Newsletter", description: "Abonnés et sources", icon: Database },
  { key: "users", label: "Users", description: "Contacts et comptes", icon: Users },
  { key: "submissions", label: "Submissions", description: "Demandes entrantes", icon: Database },
  { key: "hubRequests", label: "Hub Requests", description: "Demandes produits", icon: Database },
  { key: "reactions", label: "Reactions", description: "Engagement contenu", icon: Database },
];
