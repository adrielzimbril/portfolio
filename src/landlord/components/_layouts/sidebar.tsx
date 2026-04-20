"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Database,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  ShieldCheck,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { landlordRoutes } from "@/data/landlordRoutes";
import { cn } from "@/utils/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  onSignOut,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onSignOut: () => void;
}) {
  const pathname = usePathname();
  const [questsOpen, setQuestsOpen] = useState(pathname.includes("/quests"));

  const isActive = (key: string): boolean => {
    switch (key) {
      case "overview":
        return pathname === landlordRoutes.landlord.link;
      case "community":
        return pathname.startsWith(landlordRoutes.community.link);
      case "quests-registrations":
        return pathname.startsWith(landlordRoutes.quests.registrations.link);
      case "quests-submissions":
        return pathname.startsWith(landlordRoutes.quests.submissions.link);
      case "newsletter":
        return pathname.startsWith(landlordRoutes.tables.newsletter.link);
      case "users":
        return pathname.startsWith(landlordRoutes.tables.users.link);
      case "submissions":
        return pathname.startsWith(landlordRoutes.tables.submissions.link);
      case "hubRequests":
        return pathname.startsWith(landlordRoutes.tables.hubRequests.link);
      case "reactions":
        return pathname.startsWith(landlordRoutes.tables.reactions.link);
      default:
        return false;
    }
  };

  const isQuestsGroupActive = pathname.includes("/quests");

  return (
    <aside
      className={cn(
        "fixed inset-y-3 left-3 z-40 w-72 -translate-x-[calc(100%+1rem)] rounded-[28px] bg-[#11191f] p-4 text-white transition-transform duration-300 md:static md:inset-auto md:translate-x-0 flex flex-col h-full",
        sidebarOpen && "translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="mb-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white text-[#11191f]">
            <ShieldCheck size={19} />
          </div>
          <div>
            <p className="text-sm font-semibold">Landlord</p>
            <p className="text-xs text-white/45">Admin Shirofolio</p>
          </div>
        </div>
        <Button
          variant="none"
          size="icon"
          asPointer
          className="text-white md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Fermer la navigation"
        >
          <X size={18} />
        </Button>
      </div>

      {/* Scrollable nav area */}
      <ScrollArea className="flex-1 -mx-2 px-2"  scrollbarGutter scrollbarThumbClassName="bg-white/20">
        <nav className="grid content-start gap-1 pb-4">
          {/* Dashboard */}
          <NavLink
            href={landlordRoutes.landlord.link}
            active={isActive("overview")}
            icon={LayoutDashboard}
            label="Dashboard"
            description="Vue globale"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Quest group */}
          <div>
            <button
              type="button"
              onClick={() => setQuestsOpen((o) => !o)}
              className={cn(
                "w-full flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition",
                isQuestsGroupActive
                  ? "text-white"
                  : "text-white/62 hover:bg-white/8 hover:text-white"
              )}
            >
              <Trophy size={18} />
              <span className="flex flex-col flex-1 min-w-0">
                <span className="font-medium">Quest</span>
                <span
                  className={cn(
                    "text-xs mt-0.5",
                    isQuestsGroupActive ? "text-white/35" : "text-white/35"
                  )}
                >
                  Inscriptions et soumissions
                </span>
              </span>
              <ChevronDown
                size={15}
                className={cn(
                  "flex-shrink-0 text-white/40 transition-transform duration-200",
                  questsOpen && "rotate-180"
                )}
              />
            </button>
            {questsOpen && (
              <div className="ml-4 mt-1 grid gap-1 border-l border-white/10 pl-3">
                <NavLink
                  href={landlordRoutes.quests.registrations.link}
                  active={isActive("quests-registrations")}
                  icon={Users}
                  label="Inscriptions"
                  description="Inscrits aux quests"
                  onClick={() => setSidebarOpen(false)}
                  compact
                />
                <NavLink
                  href={landlordRoutes.quests.submissions.link}
                  active={isActive("quests-submissions")}
                  icon={Trophy}
                  label="Soumissions"
                  description="Rendus de quests"
                  onClick={() => setSidebarOpen(false)}
                  compact
                />
              </div>
            )}
          </div>

          {/* Community */}
          <NavLink
            href={landlordRoutes.community.link}
            active={isActive("community")}
            icon={MessageSquareText}
            label="Community"
            description="Messages publics"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Data tables */}
          <div className="mt-2 border-t border-white/8 pt-2">
            <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">
              Données
            </p>
            <div className="mt-1 grid gap-1">
              <NavLink
                href={landlordRoutes.tables.newsletter.link}
                active={isActive("newsletter")}
                icon={Database}
                label="Newsletter"
                description="Abonnés"
                onClick={() => setSidebarOpen(false)}
              />
              <NavLink
                href={landlordRoutes.tables.users.link}
                active={isActive("users")}
                icon={Users}
                label="Users"
                description="Contacts et comptes"
                onClick={() => setSidebarOpen(false)}
              />
              <NavLink
                href={landlordRoutes.tables.submissions.link}
                active={isActive("submissions")}
                icon={Database}
                label="Submissions"
                description="Demandes entrantes"
                onClick={() => setSidebarOpen(false)}
              />
              <NavLink
                href={landlordRoutes.tables.hubRequests.link}
                active={isActive("hubRequests")}
                icon={Database}
                label="Hub Requests"
                description="Demandes produits"
                onClick={() => setSidebarOpen(false)}
              />
              <NavLink
                href={landlordRoutes.tables.reactions.link}
                active={isActive("reactions")}
                icon={Database}
                label="Reactions"
                description="Engagement contenu"
                onClick={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        </nav>
      </ScrollArea>

      {/* Footer actions */}
      <div className="mt-4 flex-shrink-0 grid gap-1 border-t border-white/10 pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/55 hover:bg-white/8 hover:text-white transition"
        >
          <Home size={17} />
          Retour au site
        </Link>
        <Button
          variant="none"
          type="button"
          onClick={onSignOut}
          className="flex items-center justify-start gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/55 hover:bg-white/8 hover:text-white cursor-pointer transition"
        >
          <LogOut size={17} />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}

function NavLink({
  href,
  active,
  icon: Icon,
  label,
  description,
  onClick,
  compact = false,
}: {
  href: string;
  active: boolean;
  icon: React.ElementType;
  label: string;
  description: string;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-2xl text-left text-sm transition",
        compact ? "px-2 py-2" : "px-3 py-3",
        active
          ? "bg-white text-[#11191f]"
          : "text-white/62 hover:bg-white/8 hover:text-white"
      )}
    >
      <Icon size={compact ? 15 : 18} />
      <span className="flex flex-col min-w-0">
        <span className="font-medium truncate">{label}</span>
        <span
          className={cn(
            "mt-0.5 truncate",
            compact ? "text-[10px]" : "text-xs",
            active ? "text-black/45" : "text-white/35"
          )}
        >
          {description}
        </span>
      </span>
    </Link>
  );
}
