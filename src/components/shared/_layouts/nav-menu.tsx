"use client";

import { routes } from "@/data/route";
import { cn } from "@/utils/utils";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getActivePathInArray } from "@/utils";

export function NavMenu({ hasScrolled }: { hasScrolled: boolean }) {
  const route = usePathname();
  const menuRoutes = Object.values(routes);
  const menuRoutesFiltered = menuRoutes.filter((item) => item.inHeader);

  const activePath = getActivePathInArray({
    path: route,
    array: menuRoutes.map((item) => item.link),
    withSlash: true,
  });

  // Find the current route directly from filtered menu routes
  const currentRoute = menuRoutesFiltered.find(
    (item) => item.link === activePath
  );
  const currentKey = currentRoute?.key || routes.home.key;

  const [activeTab, setActiveTab] = useState<string>(currentKey);

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
          {menuRoutesFiltered.map((item) => (
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
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
