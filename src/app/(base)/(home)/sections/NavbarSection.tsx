"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function NavbarSection() {
  const [activeTab, setActiveTab] = useState("Acceuil");

  const navigationItems = [
    { label: "Acceuil", value: "Acceuil" },
    { label: "A propos", value: "A propos" },
    { label: "Hub", value: "Hub" },
    { label: "Projets", value: "Projets" },
    { label: "Blog", value: "Blog" },
  ];

  return (
    <nav className="w-full h-28 bg-greys-00">
      <div className="flex items-center justify-between px-[153px] pt-14">
        <div className="flex items-center gap-2.5">
          <img className="w-14 h-14" alt="Icon" src="/icon.svg" />
          <img
            className="flex-shrink-0"
            alt="Adriel zimbril"
            src="/adriel-zimbril.svg"
          />
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-center gap-4 px-1 py-0 rounded-2xl overflow-hidden border-2 border-solid border-[#f9f9f9]">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.value}>
                <NavigationMenuLink
                  className={`flex flex-col items-center gap-[3px] ${
                    activeTab === item.value ? "bg-[#f5f5f599] rounded-2xl" : ""
                  }`}
                  onClick={() => setActiveTab(item.value)}
                >
                  <div className="flex items-center px-5 py-2.5 rounded-xl overflow-hidden cursor-pointer">
                    <span
                      className={`[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap ${
                        activeTab === item.value
                          ? "text-[#000000de]"
                          : "text-text-iconslight-medium-emphasis"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button
          className="px-6 py-[13px] bg-greys-08 rounded-xl h-auto hover:bg-greys-06"
          variant="secondary"
        >
          <span className="font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-text-iconsdark-high-emphasis text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] whitespace-nowrap [font-style:var(--SF-pro-medium-17-m-font-style)]">
            Parler de SaaS 👋
          </span>
        </Button>
      </div>
    </nav>
  );
}
