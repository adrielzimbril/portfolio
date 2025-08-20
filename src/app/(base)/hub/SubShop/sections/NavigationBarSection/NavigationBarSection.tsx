import React from "react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Acceuil", active: true },
  { label: "A propos", active: false },
  { label: "Hub", active: false },
  { label: "Projets", active: false },
  { label: "Blog", active: false },
];

export const NavigationBarSection () {
  return (
    <nav className="relative w-full h-28 bg-greys-00">
      <div className="flex items-center gap-[61px] pt-14 pl-[153px]">
        <div className="flex items-center gap-2.5">
          <img className="w-14 h-14" alt="Icon" src="/icon.svg" />
          <img
            className="flex-shrink-0"
            alt="Adriel zimbril"
            src="/adriel-zimbril.svg"
          />
        </div>

        <div className="flex items-center justify-center gap-4 px-1 py-0 rounded-2xl overflow-hidden border-2 border-solid border-[#f9f9f9]">
          {navigationItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-[3px]">
              <div
                className={`flex items-center px-5 py-2.5 rounded-xl overflow-hidden ${
                  item.active ? "bg-[#f5f5f599] rounded-2xl" : ""
                }`}
              >
                <span
                  className={`[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap ${
                    item.active ? "text-[#000000de]" : "text-[#00000099]"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button className="h-auto px-6 py-[13px] rounded-xl bg-greys-08 hover:bg-greys-08/90 font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-text-iconsdark-high-emphasis text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] [font-style:var(--SF-pro-medium-17-m-font-style)]">
          Parler de SaaS 👋
        </Button>
      </div>
    </nav>
  );
};
