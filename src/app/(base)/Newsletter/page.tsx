import {
  CalendarIcon,
  ClockIcon,
  DribbbleIcon,
  EyeIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";
import React from "react";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { SubscriptionModal } from "../../components/SubscriptionModal";
import { useNewsletterStats } from "../../hooks/useNewsletterStats";

const navigationItems = [
  { label: "Acceuil", active: true },
  { label: "A propos", active: false },
  { label: "Hub", active: false },
  { label: "Projets", active: false },
  { label: "Blog", active: false },
];

const metaInfo = [
  { icon: CalendarIcon, text: "18, Jul 2024" },
  { icon: ClockIcon, text: "08 min read" },
];

const socialIcons = [
  { icon: LinkedinIcon, alt: "Linkedin" },
  { icon: InstagramIcon, alt: "Instagram" },
  { icon: GithubIcon, alt: "Github" },
  { icon: DribbbleIcon, alt: "Dribbble" },
  { icon: FacebookIcon, alt: "Facebook" },
  { icon: TwitterIcon, alt: "X twitter" },
  { icon: MailIcon, alt: "Mail" },
];

export const Newsletter () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { readerCount, isLoading } = useNewsletterStats();

  const formatReaderCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M reads`;
    } else if (count >= 1000) {
      return `${Math.floor(count / 1000)}K reads`;
    }
    return `${count} reads`;
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto items-start relative bg-white">
      <header className="relative self-stretch w-full h-28 bg-greys-00">
        <nav className="flex gap-[61px] top-14 left-[153px] items-center absolute">
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
                  className={`px-5 py-2.5 flex items-center rounded-xl overflow-hidden ${
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

          <Button className="px-6 py-[13px] bg-greys-08 rounded-xl h-auto">
            <span className="font-SF-pro-medium-17-m font-[number:var(--SF-pro-medium-17-m-font-weight)] text-text-iconsdark-high-emphasis text-[length:var(--SF-pro-medium-17-m-font-size)] tracking-[var(--SF-pro-medium-17-m-letter-spacing)] leading-[var(--SF-pro-medium-17-m-line-height)] [font-style:var(--SF-pro-medium-17-m-font-style)]">
              Parler de SaaS 👋
            </span>
          </Button>
        </nav>
      </header>

      <main className="relative self-stretch w-full h-[827px] bg-greys-00">
        <div className="flex flex-col w-[1136px] items-start justify-center gap-4 p-8 absolute top-[83px] left-[152px] bg-[#f9f9f9] rounded-[64px] overflow-hidden">
          <Card className="flex flex-col items-center justify-end p-4 self-stretch w-full bg-[#f9f9f9] rounded-[48px] overflow-hidden border-[16px] border-solid border-white">
            <CardContent className="flex flex-col justify-center gap-2.5 px-[34px] py-16 self-stretch w-full bg-white items-center">
              <div className="flex flex-col items-center gap-6 px-8 py-0 self-stretch w-full">
                <div className="absolute w-[339px] h-[69px] top-[62px] left-[558px] bg-white rounded-lg" />

                <h1 className="self-stretch mt-[-1.00px] font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] text-center tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
                  Trouve des clients en continu grâce à la méthode Tsunami 🌊
                </h1>

                <p className="self-stretch [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-[34px] text-center tracking-[0.02px] leading-[40.8px]">
                  Je te montre comment utiliser l&#39;IA et l&#39;AUTOMATISATION
                  pour trouver des missions en boucle.
                </p>

                <div className="flex flex-wrap items-start justify-center gap-[6px_6px] p-4 bg-white rounded-2xl">
                  {metaInfo.map((item, index) => (
                    <Badge
                      key={index}
                      className="justify-center gap-1 px-3 py-1.5 bg-[#e2e4ff] rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
                        {item.text}
                      </span>
                    </Badge>
                  ))}
                  <Badge className="justify-center gap-1 px-3 py-1.5 bg-[#e2e4ff] rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                    <EyeIcon className="w-4 h-4" />
                    <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
                      {isLoading ? "..." : formatReaderCount(readerCount)}
                    </span>
                  </Badge>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <Input
                    className="w-[660px] px-4 py-[13px] mt-[-2.00px] ml-[-2.00px] mr-[-2.00px] bg-[#f9f9f9] rounded-xl border-4 border-solid border-[#f5f5f599]"
                    defaultValue="😏 vous voulez recevoir des cadeaux ?"
                    style={{
                      fontSize: "24px",
                      fontFamily: "SF_Pro_Text-Regular, Helvetica",
                      fontWeight: "normal",
                      color: "var(--text-iconslight-disabled)",
                      textAlign: "center",
                      letterSpacing: "0.10px",
                      lineHeight: "22px",
                    }}
                  />

                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-4 py-[13px] self-stretch w-full bg-greys-08 rounded-xl h-auto hover:bg-gray-700 transition-colors"
                  >
                    <span className="[font-family:'SF_Pro_Text-Bold',Helvetica] font-bold text-text-iconsdark-high-emphasis text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                      Recevoir !
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="flex h-[155.62px] items-center justify-center gap-2.5 self-stretch w-full bg-white">
        <div className="flex items-center justify-center gap-2.5 px-[152px] py-[45px] flex-1 self-stretch bg-[#f9f9f9] rounded-[32px_32px_0px_0px] overflow-hidden">
          <div className="flex flex-col w-[718px] justify-center gap-[7px] items-center">
            <p className="[font-family:'SF_Pro_Text-Bold',Helvetica] font-bold text-[#000000de] text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
              Copyright Holder © 2025 - All Right Reserved - Designed with ❤ by
              Adriel ZIMBRIL.
            </p>

            <div className="flex items-start gap-1 p-1 bg-white rounded-lg overflow-hidden">
              {socialIcons.map((social, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-center gap-[11.45px_11.45px] p-[5.72px] bg-black rounded-[29.03px] overflow-hidden"
                >
                  <social.icon className="w-[17.17px] h-[17.17px] text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
