"use client";
import React, { useState } from "react";
import { cn } from "@/utils/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function NavMenu({
  hasScrolled,
  menuRoutes,
  activeTab,
  setActiveTab,
}: {
  hasScrolled: boolean;
  menuRoutes: { key: string; link: string; name: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const t = useTranslations();
  return (
    <div className="w-fit hidden md:block">
      <div className={cn("mx-auto flex w-full items-center justify-center")}>
        <div
          className={cn(
            "relative flex w-fit overflow-hidden items-center p-1",
            //"rounded-2xl overflow-hidden border-2 border-solid border-secondary",
            "squircle squircle-7xl squircle-transparent squircle-border-2 squircle-border-secondary"
          )}
        >
          {menuRoutes.map((item) => (
            <Link
              key={item.key}
              href={item.link}
              onClick={() => setActiveTab(item.key)}
              className={cn(
                "relative transition-all duration-200",
                "px-4 py-2"
                //hasScrolled ? "px-4 py-2" : "px-5 py-3",
                //activeTab === item.name ? "z-1" : "z-0"
              )}
            >
              {activeTab === item.key && (
                <motion.div
                  layoutId="active-tab"
                  className={cn(
                    "absolute inset-0 rounded-xl bg-secondary squircle-secondary",
                    "squircle squircle-7xl"
                  )}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <span
                className={cn(
                  "relative block text-sm font-medium transition-colors duration-200 hover:text-primary tracking-tight",
                  activeTab === item.key ? "text-primary" : "text-primary/60"
                )}
              >
                {t("common.menu." + item.key)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
