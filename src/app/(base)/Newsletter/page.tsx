"use client";
import { CalendarIcon, ClockIcon, EyeIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { useNewsletterStats } from "@/hooks/useNewsletterStats";
import { cn } from "@/lib/utils";
import { Tags } from "@/components/shared/pages/resources/tags";
import { SectionLayout } from "@/components/shared/sections/layout";
import { SectionBase } from "@/components/shared/pages/shared/section-base";

const metaInfo = [
  { icon: CalendarIcon, text: "18, Jul 2024" },
  { icon: ClockIcon, text: "08 min read" },
];

const date = "18, Jul 2024";
const tags = ["Newsletter", "Shiro", "Tsunami", "IA", "Automatisation"];

export default function Newsletter() {
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
    <>
      <SectionBase
        sectionClassName="w-full"
        sectionContentClassName="w-full"
        cardClassName="w-full"
        cardContentClassName="w-full p-6 md:p-8"
        //cardContentClassName="squircle squircle-white squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60"
        className="squircle squircle-white squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
      >
        <div
          className={cn(
            "flex relative flex-col min-h-60 items-center justify-center text-center p-4 gap-4 max-w-4xl mx-auto"
            // isWide && "md:min-h-96"
          )}
        >
          <div
            className={
              "flex relative flex-col items-center justify-center text-center pb-2 gap-3 md:gap-4"
            }
          >
            <Badge className="relative text-base font-normal md:font-medium md:text-xl max-w-3xl leading-[120%] text-zinc-600">
              Pour les développeurs freelances qui galèrent à trouver des
              clients.
            </Badge>
            <h2 className="self-stretch">
              Trouve des clients en continu grâce à la méthode Tsunami 🌊
            </h2>
            <p className="relative text-base font-normal md:font-medium md:text-2xl max-w-3xl leading-[120%] text-zinc-600">
              Je te montre comment utiliser l&#39;IA et l&#39;AUTOMATISATION
              pour trouver des missions en boucle.
            </p>
          </div>
          <Tags primaryTag={date} tags={tags} isCentered />
          {/* <Badge className="justify-center gap-1 px-3 py-1.5 bg-[#e2e4ff] rounded-[10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
            <EyeIcon className="w-4 h-4" />
            <span className="[font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap">
              {isLoading ? "..." : formatReaderCount(readerCount)}
            </span>
          </Badge> */}

          <div className="flex flex-col items-start gap-4 w-full md:max-w-[80%]">
            <Input
              placeholder="😏 vous voulez recevoir des cadeaux ?"
              type="email"
            />

            <Button
              onClick={() => setIsModalOpen(true)}
              asFull
              whileTap
              asPointer
            >
              <span className="[font-family:'SF_Pro_Text-Bold',Helvetica] font-bold text-text-iconsdark-high-emphasis text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                Recevoir !
              </span>
            </Button>
          </div>
        </div>
      </SectionBase>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
