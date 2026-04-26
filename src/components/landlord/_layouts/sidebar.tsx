"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Database,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  PanelLeftClose,
  ShieldCheck,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { landlordRoutes } from "@/data/landlordRoutes";
import { cn } from "@/utils/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { adminNavItems, adminNavGroups } from "./nav-items";
import Image from "next/image";
import { getImageUrl } from "@/utils";
import { siteConfig } from "@/data/config";
import { routes } from "@/data/routes";
import { Link } from "@/components/ui/link";

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  onSignOut,
  collapsed,
  setCollapsed,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onSignOut: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) {
  const t = useTranslations("admin.sidebar");
  const pathname = usePathname();
  const [questsOpen, setQuestsOpen] = useState(pathname.includes("/quests"));
  const [hubOpen, setHubOpen] = useState(pathname.includes("/hub/"));

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
      case "hub-requests":
        return pathname.startsWith(landlordRoutes.hub.requests.link);
      case "hub-product-links":
        return pathname.startsWith(landlordRoutes.hub.productLinks.link);
      case "newsletter":
        return pathname.startsWith(landlordRoutes.tables.newsletter.link);
      case "users":
        return pathname.startsWith(landlordRoutes.tables.users.link);
      case "submissions":
        return pathname.startsWith(landlordRoutes.tables.submissions.link);
      case "reactions":
        return pathname.startsWith(landlordRoutes.tables.reactions.link);
      default:
        return false;
    }
  };

  const isQuestsGroupActive = pathname.includes("/quests");
  const isHubGroupActive = pathname.includes("/hub/");

  return (
    <aside
      className={cn(
        "fixed inset-y-3 left-3 z-40 bg-[#11191f] p-4 text-white transition-all duration-300 md:static md:inset-auto md:translate-x-0 flex flex-col h-full rounded-2xl overflow-hidden",
        !sidebarOpen && "-translate-x-[calc(100%+1rem)]",
        collapsed ? "w-0 opacity-0 p-0" : "w-72 opacity-100",
      )}
    >
      {/* Logo */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex size-10 lg:size-12 items-center justify-center rounded-xl bg-white text-[#11191f] shrink-0">
            <Link
              href={routes.home.link}
              variant="none"
              size="none"
              className="flex items-center gap-1 md:gap-2 aspect-square "
            >
              <Image
                className="size-10! lg:size-12! rounded-2xl aspect-square overflow-hidden object-cover pointer-events-none"
                src={getImageUrl("icon.png")}
                alt={siteConfig.description}
                width={256}
                height={256}
              />
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold">{t("title")}</p>
            <p className="text-xs text-white/45">{t("subtitle")}</p>
          </div>
        </div>
        <Button
          variant="none"
          size="icon"
          asPointer
          className="text-white md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label={t("close_nav")}
        >
          <X size={18} />
        </Button>
        <Button
          variant="none"
          size="icon"
          asPointer
          className="hidden md:flex text-white/55 hover:text-white"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? t("expand") : t("collapse")}
        >
          <PanelLeftClose size={18} className={collapsed ? "rotate-180" : ""} />
        </Button>
      </div>

      {/* Scrollable nav area */}
      <ScrollArea
        className="flex-1 -mx-2 px-2"
        scrollbarGutter
        scrollbarThumbClassName="bg-white/20"
      >
        <nav className="grid content-start gap-1 pb-4">
          {/* Dashboard */}
          <NavLink
            href={landlordRoutes.landlord.link}
            active={isActive("overview")}
            icon={LayoutDashboard}
            label={t("items.dashboard.label")}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Quest group */}
          <NavGroup
            group={adminNavGroups[0]!}
            isOpen={questsOpen}
            setIsOpen={setQuestsOpen}
            isActive={isQuestsGroupActive}
            onNavClick={() => setSidebarOpen(false)}
            isActiveCheck={isActive}
          />

          {/* Hub group */}
          <NavGroup
            group={adminNavGroups[1]!}
            isOpen={hubOpen}
            setIsOpen={setHubOpen}
            isActive={isHubGroupActive}
            onNavClick={() => setSidebarOpen(false)}
            isActiveCheck={isActive}
          />

          {/* Community */}
          <NavLink
            href={landlordRoutes.community.link}
            active={isActive("community")}
            icon={MessageSquareText}
            label={t("items.community.label")}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Data tables */}
          <div className="mt-2 border-t border-white/8 pt-2">
            <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">
              {t("data_section")}
            </p>
            <div className="mt-1 grid gap-1">
              <NavLink
                href={landlordRoutes.tables.newsletter.link}
                active={isActive("newsletter")}
                icon={Database}
                label={t("items.newsletter.label")}
                onClick={() => setSidebarOpen(false)}
              />
              <NavLink
                href={landlordRoutes.tables.users.link}
                active={isActive("users")}
                icon={Users}
                label={t("items.users.label")}
                onClick={() => setSidebarOpen(false)}
              />
              <NavLink
                href={landlordRoutes.tables.submissions.link}
                active={isActive("submissions")}
                icon={Database}
                label={t("items.submissions.label")}
                onClick={() => setSidebarOpen(false)}
              />
              <NavLink
                href={landlordRoutes.tables.reactions.link}
                active={isActive("reactions")}
                icon={Database}
                label={t("items.reactions.label")}
                onClick={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        </nav>
      </ScrollArea>

      {/* Footer actions */}
      <div className="mt-4 shrink-0 grid gap-1 border-t border-white/10 pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/55 hover:bg-white/8 hover:text-white transition"
        >
          <Home size={17} />
          {t("back_to_site")}
        </Link>
        <Button
          variant="none"
          type="button"
          onClick={onSignOut}
          className="flex items-center justify-start gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/55 hover:bg-white/8 hover:text-white cursor-pointer transition"
        >
          <LogOut size={17} />
          {t("sign_out")}
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
  onClick,
  compact = false,
}: {
  href: string;
  active: boolean;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl text-left text-sm transition",
        compact ? "px-2 py-2" : "px-3 py-3",
        active
          ? "bg-white text-[#11191f]"
          : "text-white/62 hover:bg-white/8 hover:text-white",
      )}
    >
      <Icon size={compact ? 15 : 18} />
      <span className="flex flex-col min-w-0">
        <span className="font-medium truncate">{label}</span>
      </span>
    </Link>
  );
}

function NavGroup({
  group,
  isOpen,
  setIsOpen,
  isActive,
  onNavClick,
  isActiveCheck,
}: {
  group: {
    key: string;
    label: string;
    icon: React.ElementType;
    items: {
      key: string;
      label: string;
      icon: React.ElementType;
    }[];
  };
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isActive: boolean;
  onNavClick: () => void;
  isActiveCheck: (key: string) => boolean;
}) {
  const t = useTranslations("admin.sidebar");

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition cursor-pointer",
          isActive
            ? "text-white"
            : "text-white/62 hover:bg-white/8 hover:text-white",
        )}
      >
        <group.icon size={18} />
        <span className="flex flex-col flex-1 min-w-0">
          <span className="font-medium">{group.label}</span>
        </span>
        <ChevronDown
          size={15}
          className={cn(
            "shrink-0 text-white/40 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <div className="ml-4 mt-1 grid gap-1 border-l border-white/10 pl-3">
          {group.items.map((item) => (
            <NavLink
              key={item.key}
              href={
                item.key === "quests-registrations"
                  ? landlordRoutes.quests.registrations.link
                  : item.key === "quests-submissions"
                    ? landlordRoutes.quests.submissions.link
                    : item.key === "hub-requests"
                      ? landlordRoutes.hub.requests.link
                      : item.key === "hub-product-links"
                        ? landlordRoutes.hub.productLinks.link
                        : "#"
              }
              active={isActiveCheck(item.key)}
              icon={item.icon}
              label={item.label}
              onClick={onNavClick}
              compact
            />
          ))}
        </div>
      )}
    </div>
  );
}
