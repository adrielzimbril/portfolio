import React from "react";
import { Button } from "../../../../components/ui/button";

export const NavigationBarSection = (): JSX.Element => {
  const navigationItems = [
    { label: "Acceuil", isActive: true },
    { label: "A propos", isActive: false },
    { label: "Hub", isActive: false },
    { label: "Projets", isActive: false },
    { label: "Blog", isActive: false },
  ];

  return (
    <header className="relative w-full h-28 bg-greys-00">
      <nav className="flex items-center gap-[61px] pt-14 pl-[153px]">
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
                  item.isActive ? "bg-[#f5f5f599]" : ""
                }`}
              >
                <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                  <span
                    className={
                      item.isActive
                        ? "text-[#000000de]"
                        : "text-text-iconslight-medium-emphasis"
                    }
                  >
                    {item.label}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button className="px-6 py-[13px] bg-greys-08 rounded-xl h-auto hover:bg-greys-08/90">
          <span className="font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-text-iconsdark-high-emphasis text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] whitespace-nowrap [font-style:var(--SF-pro-medium-17-m-font-style)]">
            Parler de SaaS 👋
          </span>
        </Button>
      </nav>
    </header>
  );
};
