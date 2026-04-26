"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { PanelLeft, RefreshCw, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminUser } from "@/components/landlord/admin-types";
import { adminNavItems } from "./nav-items";
import { useTranslations } from "next-intl";

export function Header({
  user,
  setSidebarOpen,
  onRefresh,
}: {
  user: AdminUser;
  setSidebarOpen: (open: boolean) => void;
  onRefresh: () => void;
}) {
  const t = useTranslations("admin.header");
  const pathname = usePathname();

  const getActiveLabel = (): string => {
    if (pathname.includes("/quests/registrations"))
      return t("nav_labels.quests_registrations");
    if (pathname.includes("/quests/submissions"))
      return t("nav_labels.quests_submissions");
    if (pathname.includes("/newsletter")) return t("nav_labels.newsletter");
    if (pathname.includes("/users")) return t("nav_labels.users");
    if (pathname.includes("/hub-requests")) return t("nav_labels.hub_requests");
    if (pathname.includes("/reactions")) return t("nav_labels.reactions");
    if (pathname.includes("/submissions")) return t("nav_labels.submissions");
    if (pathname.includes("/community")) return t("nav_labels.community");
    return t("nav_labels.dashboard");
  };
  const activeLabel = getActiveLabel();

  return (
    <header className="mb-4 flex items-center gap-3 rounded-2xl border border-black/8 bg-white p-3 shadow-sm">
      <Button
        variant="outline"
        size="icon"
        asPointer
        className="md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label={t("open_nav")}
      >
        <PanelLeft size={18} />
      </Button>
      <div className="min-w-0 flex-1 ml-2">
        <p className="text-xs text-black/45 font-medium uppercase tracking-wider">
          {t("subtitle")}
        </p>
        <h1 className="truncate text-xl font-semibold tracking-[-0.02em] md:text-2xl">
          {activeLabel}
        </h1>
      </div>
      <Button
        variant="outline"
        size="icon"
        asPointer
        onClick={onRefresh}
        aria-label={t("refresh")}
        className="hidden md:flex"
      >
        <RefreshCw size={17} />
      </Button>
      <div className="hidden items-center gap-3 rounded-2xl bg-[#f7f6f1] px-4 py-2.5 md:flex ml-2">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name || user.email}
            className="size-9 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="flex size-9 items-center justify-center rounded-full bg-[#ffed90] shadow-sm">
            <UserRound size={17} />
          </div>
        )}
        <div className="max-w-44">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-black/45">{user.email}</p>
        </div>
      </div>
    </header>
  );
}
