import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export const NavigationBarSection () {
  const [activeTab, setActiveTab] = useState("Acceuil");

  const navigationItems = [
    { label: "Acceuil", key: "Acceuil" },
    { label: "A propos", key: "A propos" },
    { label: "Hub", key: "Hub" },
    { label: "Projets", key: "Projets" },
    { label: "Blog", key: "Blog" },
  ];

  return (
    <nav className="w-full h-28 bg-greys-00 flex items-center justify-center">
      <div className="flex items-center gap-[61px]">
        <div className="flex items-center gap-2.5">
          <img className="w-14 h-14" alt="Icon" src="/icon.svg" />
          <img
            className="flex-shrink-0"
            alt="Adriel zimbril"
            src="/adriel-zimbril.svg"
          />
        </div>

        <div className="flex items-center justify-center gap-4 px-1 py-0 rounded-2xl border-2 border-solid border-[#f9f9f9]">
          {navigationItems.map((item) => (
            <div
              key={item.key}
              className={`flex flex-col items-center gap-[3px] ${
                activeTab === item.key ? "bg-[#f5f5f599] rounded-2xl" : ""
              }`}
            >
              <button
                onClick={() => setActiveTab(item.key)}
                className="flex items-center px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span
                  className={`[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap ${
                    activeTab === item.key
                      ? "text-[#000000de]"
                      : "text-[#00000099]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </div>
          ))}
        </div>

        <Button className="px-6 py-[13px] bg-greys-08 rounded-xl h-auto hover:bg-greys-06 transition-colors">
          <span className="font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-text-iconsdark-high-emphasis text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] whitespace-nowrap [font-style:var(--SF-pro-medium-17-m-font-style)]">
            Parler de SaaS 👋
          </span>
        </Button>
      </div>
    </nav>
  );
};
