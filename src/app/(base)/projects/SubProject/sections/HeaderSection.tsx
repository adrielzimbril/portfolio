import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeaderSection() {
  const badges = [
    {
      text: "SaaS 🦄",
      bgColor: "bg-[#afffad]",
      hoverColor: "hover:bg-[#9fff9d]",
    },
    {
      text: "Go To Market 🎯",
      bgColor: "bg-[#ffe9ad]",
      hoverColor: "hover:bg-[#ffd99d]",
    },
    {
      text: "Web Application 📝",
      bgColor: "bg-[#ade9ff]",
      hoverColor: "hover:bg-[#9dd9ff]",
    },
    {
      text: "Design 🎨",
      bgColor: "bg-[#f9f9f9]",
      hoverColor: "hover:bg-[#e9e9e9]",
    },
    {
      text: "Mobile App 📱",
      bgColor: "bg-[#e2e4ff]",
      hoverColor: "hover:bg-[#d2d4ff]",
    },
  ];

  const handleBadgeClick = (badgeText: string) => {
    console.log(`Badge clicked: ${badgeText}`);
    // Ici vous pouvez ajouter la logique de navigation ou de filtrage
  };

  const handleCTAClick = () => {
    console.log("CTA clicked - Navigate to project details");
    // Ici vous pouvez ajouter la logique de navigation
  };

  return (
    <section className="h-[796px] relative w-full bg-greys-00">
      <div className="relative w-full max-w-[1440px] h-[751px] top-[45px] mx-auto">
        <div className="flex w-full max-w-[1136px] h-[670px] items-center justify-between px-12 py-16 absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#f9f9f9] rounded-[64px] overflow-hidden shadow-lg">
          {/* Contenu principal */}
          <div className="flex flex-col w-[541px] items-start gap-6 relative z-10">
            {/* Badges interactifs */}
            <div className="flex flex-wrap items-start gap-[6px] px-2 py-1 relative w-full bg-white rounded-lg overflow-hidden shadow-sm">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${badge.bgColor} ${badge.hoverColor} rounded-[10px] px-3 py-1.5 backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] border-0 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md active:scale-95`}
                  onClick={() => handleBadgeClick(badge.text)}
                >
                  <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
                    {badge.text}
                  </span>
                </Badge>
              ))}
            </div>

            {/* Titre principal */}
            <h1 className="relative w-full font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)] animate-fade-in">
              Shiroshop
            </h1>

            {/* Description */}
            <p className="relative w-full [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px] mb-4">
              Donnez à votre entreprise les moyens d&apos;une conception centrée
              sur l&apos;utilisateur et de l&apos;IA pour offrir des expériences
              client fluides et accélérer la croissance.
            </p>

            {/* Boutons d'action */}
            <div className="flex items-center gap-4 mt-4">
              <Button
                onClick={handleCTAClick}
                className="px-6 py-3 bg-greys-08 text-white rounded-xl hover:bg-greys-06 transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 font-medium"
              >
                Voir le projet
              </Button>

              <Button
                variant="outline"
                className="px-6 py-3 border-2 border-greys-02 text-greys-08 rounded-xl hover:bg-greys-01 hover:border-greys-06 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
              >
                En savoir plus
              </Button>
            </div>
          </div>

          {/* Mockup mobile */}
          <div className="absolute w-[368px] h-[743px] top-[77px] left-[707px] shadow-[0px_4.54px_2.65px_#12192202,0px_10.32px_6.03px_#12192203,0px_17.96px_10.49px_#12192203,0px_28.54px_16.66px_#12192204,0px_44.03px_25.71px_#12192204,0px_68.7px_40.12px_#12192205,0px_114.06px_66.61px_#12192206,0px_227.89px_133.09px_#12192208] transition-transform duration-300 hover:scale-105">
            <div className="h-[743px]">
              <div className="relative w-[368px] h-[743px]">
                <img
                  className="absolute w-[362px] h-[743px] top-0 left-[3px]"
                  alt="Iphone shape"
                  src="/iphone-shape.svg"
                />

                <img
                  className="absolute w-[368px] h-[180px] top-[118px] left-0"
                  alt="Hardware buttons"
                  src="/hardware-buttons.png"
                />

                <div className="absolute w-[327px] h-[708px] top-[17px] left-[21px] bg-greys-00 rounded-[20.93px] overflow-hidden">
                  <div className="flex flex-col w-[271px] items-start gap-[6.98px] relative top-[290px] left-7">
                    <h2 className="relative w-full mt-[-0.87px] font-SF-pro-title-02-34 font-[number:var(--SF-pro-title-02-34-font-weight)] text-[#000000de] text-[length:var(--SF-pro-title-02-34-font-size)] tracking-[var(--SF-pro-title-02-34-letter-spacing)] leading-[var(--SF-pro-title-02-34-line-height)] [font-style:var(--SF-pro-title-02-34-font-style)]">
                      😎
                      <br />I made you looked.
                    </h2>

                    <p className="relative w-full [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                      You can have the rest of the empty space here.
                    </p>
                  </div>
                </div>

                <img
                  className="absolute w-[350px] h-[731px] top-1.5 left-[9px]"
                  alt="Inner screen frame w"
                  src="/inner-screen-frame-w--notch.svg"
                />

                <div className="absolute w-[60px] h-[7px] top-6 left-[164px]">
                  <div className="absolute w-[41px] h-[7px] top-0 left-0 bg-greys-02 rounded-[53.78px]" />
                  <div className="absolute w-[7px] h-[7px] top-0 left-[53px] bg-greys-02 rounded-[3.37px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient de transition */}
        <div className="absolute w-full h-[249px] top-[502px] left-0 bg-[linear-gradient(0deg,rgba(249,249,249,1)_0%,rgba(249,249,249,0)_100%)]" />
      </div>
    </section>
  );
}
