"use client";
import React from "react";
import {
  Bell,
  Database,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  PanelLeft,
  RefreshCw,
  ShieldCheck,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { landlordRoutes } from "@/data/landlordRoutes";
import { cn } from "@/utils/utils";
import type { AdminUser, AdminView, NavItem } from "./admin-types";

export const adminNavItems: NavItem[] = [
  {
    key: "overview",
    label: "Dashboard",
    description: "Vue globale",
    icon: LayoutDashboard,
  },
  {
    key: "quests",
    label: "Quests",
    description: "Inscriptions et rendus",
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
    key: "hubRequests",
    label: "Hub Requests",
    description: "Demandes produits",
    icon: Database,
  },
  {
    key: "reactions",
    label: "Reactions",
    description: "Engagement contenu",
    icon: Database,
  },
];

export function AdminShell({
  user,
  activeView,
  sidebarOpen,
  onViewChange,
  onSidebarOpenChange,
  onRefresh,
  onSignOut,
  children,
}: {
  user: AdminUser;
  activeView: AdminView;
  sidebarOpen: boolean;
  onViewChange: (view: AdminView) => void;
  onSidebarOpenChange: (open: boolean) => void;
  onRefresh: () => void;
  onSignOut: () => void;
  children: React.ReactNode;
}) {
  const activeItem = adminNavItems.find((item) => item.key === activeView);

  return (
    <div className="flex h-dvh overflow-hidden bg-[#f4f2e8] p-3 text-[#11191f] md:p-6">
      <aside
        className={cn(
          "fixed inset-y-3 left-3 z-40 w-72 -translate-x-[calc(100%+1rem)] rounded-[28px] bg-[#11191f] p-4 text-white transition-transform duration-300 md:static md:inset-auto md:translate-x-0",
          sidebarOpen && "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-[#11191f]">
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
              onClick={() => onSidebarOpenChange(false)}
              aria-label="Fermer la navigation"
            >
              <X size={18} />
            </Button>
          </div>

          <nav className="grid gap-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.key;
              const isTablePage = [
                "newsletter",
                "users",
                "submissions",
                "hubRequests",
                "reactions",
              ].includes(item.key);
              const route = isTablePage ? `/landlord/tables/${item.key}` : null;

              if (isTablePage && route) {
                return (
                  <a
                    key={item.key}
                    href={route}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition",
                      isActive
                        ? "bg-white text-[#11191f]"
                        : "text-white/62 hover:bg-white/8 hover:text-white",
                    )}
                  >
                    <Icon size={18} />
                    <span className="flex flex-col">
                      <span className="font-medium">{item.label}</span>
                      <span
                        className={cn(
                          "text-xs",
                          isActive ? "text-black/45" : "text-white/35",
                        )}
                      >
                        {item.description}
                      </span>
                    </span>
                  </a>
                );
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    onViewChange(item.key);
                    onSidebarOpenChange(false);
                  }}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition",
                    isActive
                      ? "bg-white text-[#11191f]"
                      : "text-white/62 hover:bg-white/8 hover:text-white",
                  )}
                >
                  <Icon size={18} />
                  <span className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    <span
                      className={cn(
                        "text-xs",
                        isActive ? "text-black/45" : "text-white/35",
                      )}
                    >
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/8 p-4">
            <p className="text-sm font-medium">Panel privé</p>
            <p className="mt-2 text-xs leading-5 text-white/50">
              Gère les entrées du site, les messages publics et les tables
              utiles sans passer par Supabase.
            </p>
          </div>

          <div className="mt-auto grid gap-2">
            <a
              href="/"
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/55 hover:bg-white/8 hover:text-white"
            >
              <Home size={17} />
              Retour au site
            </a>
            <button
              type="button"
              onClick={onSignOut}
              className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/55 hover:bg-white/8 hover:text-white"
            >
              <LogOut size={17} />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 cursor-pointer bg-black/20 md:hidden"
          aria-label="Fermer la navigation"
          onClick={() => onSidebarOpenChange(false)}
        />
      )}

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden md:pl-6">
        <header className="mb-4 flex items-center gap-3 rounded-[26px] border border-black/8 bg-white/92 p-3 shadow-sm backdrop-blur-xl">
          <Button
            variant="outline"
            size="icon"
            asPointer
            className="md:hidden"
            onClick={() => onSidebarOpenChange(true)}
            aria-label="Ouvrir la navigation"
          >
            <PanelLeft size={18} />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-black/45">Admin panel</p>
            <h1 className="truncate text-xl font-semibold tracking-[-0.02em] md:text-2xl">
              {activeItem?.label}
            </h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            asPointer
            onClick={onRefresh}
            aria-label="Rafraîchir"
          >
            <RefreshCw size={17} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            asPointer
            aria-label="Notifications"
          >
            <Bell size={17} />
          </Button>
          <div className="hidden items-center gap-3 rounded-2xl bg-[#f7f6f1] px-3 py-2 md:flex">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || user.email}
                className="size-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-9 items-center justify-center rounded-full bg-[#ffed90]">
                <UserRound size={17} />
              </div>
            )}
            <div className="max-w-44">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-black/45">{user.email}</p>
            </div>
          </div>
        </header>

        <section className="min-h-0 flex-1 overflow-y-auto rounded-[30px] border border-black/8 bg-[#fbfaf6] p-4 md:p-6">
          {children}
        </section>
      </main>
    </div>
  );
}
