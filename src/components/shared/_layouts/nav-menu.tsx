"use client";

import { routes } from "@/data/route";
import { cn } from "@/utils/utils";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function NavMenu({ hasScrolled }: { hasScrolled: boolean }) {
  const router = usePathname();
const menuRoutes = Object.values(routes).filter((item) => item.inHeader);

// Create a copy of the sorted array (does not modify menuRoutes)
const menuRoutesSorted = [...menuRoutes].sort((a, b) =>
  b.name.localeCompare(a.name)
);

const [activeTab, setActiveTab] = useState<string>(
  menuRoutesSorted.find((item) => router.startsWith(item.link))?.name ||
    menuRoutesSorted.find((item) => item.link === router)?.name ||
    routes.home.name
);

useEffect(() => {
  const current =
    menuRoutesSorted.find((item) => router.startsWith(item.link)) ||
    menuRoutesSorted.find((item) => item.link === router);
  if (current) setActiveTab(current.name);
}, [router, menuRoutesSorted]);


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
              key={item.name}
              href={item.link}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative transition-all duration-200",
                "px-4 py-2"
                //hasScrolled ? "px-4 py-2" : "px-5 py-3",
                //activeTab === item.name ? "z-1" : "z-0"
              )}
            >
              {activeTab === item.name && (
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
                  activeTab === item.name ? "text-primary" : "text-primary/60"
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
