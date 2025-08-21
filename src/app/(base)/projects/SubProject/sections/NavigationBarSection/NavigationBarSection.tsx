import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const NavigationBarSection () {
  const navigationItems = [
    { label: "Acceuil", isActive: true },
    { label: "A propos", isActive: false },
    { label: "Hub", isActive: false },
    { label: "Projets", isActive: false },
    { label: "Blog", isActive: false },
  ];

  return (
    <nav className="relative self-stretch w-full h-28 bg-greys-00">
      <div className="inline-flex items-center gap-[61px] relative top-14 left-[153px]">
        <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
          <img className="relative w-14 h-14" alt="Icon" src="/icon.svg" />
          <img
            className="relative flex-[0_0_auto]"
            alt="Adriel zimbril"
            src="/adriel-zimbril.svg"
          />
        </div>

        <NavigationMenu>
          <NavigationMenuList className="inline-flex items-center justify-center gap-4 px-1 py-0 relative flex-[0_0_auto] rounded-2xl overflow-hidden border-2 border-solid border-[#f9f9f9] bg-transparent">
            {navigationItems.map((item, index) => (
              <NavigationMenuItem
                key={index}
                className="inline-flex flex-col items-center gap-[3px] relative flex-[0_0_auto]"
              >
                <NavigationMenuLink
                  className={`inline-flex items-center px-5 py-2.5 relative flex-[0_0_auto] rounded-xl overflow-hidden ${
                    item.isActive ? "bg-[#f5f5f599] rounded-2xl" : ""
                  }`}
                >
                  <span
                    className={`relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap ${
                      item.isActive ? "text-[#000000de]" : "text-[#00000099]"
                    }`}
                  >
                    {item.label}
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button className="px-6 py-[13px] h-auto inline-flex items-center relative flex-[0_0_auto] bg-greys-08 rounded-xl overflow-hidden hover:bg-greys-08/90">
          <span className="relative w-fit mt-[-1.00px] font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-text-iconsdark-high-emphasis text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] whitespace-nowrap [font-style:var(--SF-pro-medium-17-m-font-style)]">
            Parler de SaaS 👋
          </span>
        </Button>
      </div>
    </nav>
  );
};
