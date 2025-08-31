"use client";

import { cn } from "@/utils/utils";
import { motion } from "motion/react";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
}

const navs: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [activeTab, setActiveTab] = useState<string>(navs[0].name);

  return (
    <header className="mx-auto max-w-5xl py-10">
      <div className={cn("mx-auto flex w-full items-center justify-center")}>
        <div className="relative flex w-fit items-center rounded-full border p-1.5">
          {navs.map((option) => (
            <button
              key={option.name}
              onClick={() => setActiveTab(option.name)}
              className={cn("relative z-[1] px-4 py-2", {
                "z-0": activeTab === option.name,
              })}
            >
              {activeTab === option.name && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-full bg-secondary"
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    velocity: 2,
                  }}
                />
              )}
              <span
                className={cn(
                  "relative block text-sm font-medium transition-colors duration-200 hover:text-primary tracking-tight",
                  activeTab === option.name ? "text-primary" : "text-primary/60"
                )}
              >
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
