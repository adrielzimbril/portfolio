import React, { JSX } from "react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Acceuil", isActive: true },
  { label: "A propos", isActive: false },
  { label: "Hub", isActive: false },
  { label: "Projets", isActive: false },
  { label: "Blog", isActive: false },
];

export const NavigationBarSection () {
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

        <div className="flex items-center justify-center gap-4 px-1 py-0 rounded-2xl border-2 border-[#f9f9f9]">
          {navigationItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-[3px]">
              <div
                className={`px-5 py-2.5 flex items-center rounded-xl ${
                  item.isActive ? "bg-[#f5f5f599]" : ""
                }`}
              >
                <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap text-text-iconslight-medium-emphasis">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button className="h-auto px-6 py-[13px] bg-greys-08 rounded-xl font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-text-iconsdark-high-emphasis text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] [font-style:var(--SF-pro-medium-17-m-font-style)] hover:bg-greys-08/90">
          Parler de SaaS 👋
        </Button>
      </div>
    </nav>
  );
};
