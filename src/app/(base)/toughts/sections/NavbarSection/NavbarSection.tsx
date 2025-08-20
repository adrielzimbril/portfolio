import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const NavbarSection = (): JSX.Element => {
  const navigationItems = [
    { label: "Acceuil", isActive: true },
    { label: "A propos", isActive: false },
    { label: "Hub", isActive: false },
    { label: "Projets", isActive: false },
    { label: "Blog", isActive: false },
  ];

  return (
    <nav className="relative w-full h-28 bg-greys-00">
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
          <NavigationMenuList className="flex items-center gap-4 px-1 py-0 rounded-2xl border-2 border-[#f9f9f9] bg-transparent">
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className={`flex flex-col items-center gap-[3px] px-5 py-2.5 rounded-xl transition-colors ${
                    item.isActive
                      ? "bg-[#f5f5f599] text-[#000000de]"
                      : "text-text-iconslight-medium-emphasis hover:bg-[#f5f5f533]"
                  }`}
                >
                  <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                    {item.label}
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button className="h-auto px-6 py-[13px] bg-greys-08 rounded-xl text-text-iconsdark-high-emphasis hover:bg-greys-06 font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] [font-style:var(--SF-pro-medium-17-m-font-style)]">
          Parler de SaaS 👋
        </Button>
      </div>
    </nav>
  );
};
