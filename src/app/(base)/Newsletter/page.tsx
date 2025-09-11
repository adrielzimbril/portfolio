"use client";
import posthog from 'posthog-js';
import { CalendarIcon, ClockIcon, EyeIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { cn } from "@/utils/utils";
import { Tags } from "@/components/shared/pages/resources/tags";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { NewsletterSubscribersBadge } from "@/components/SubscriberBadges";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const tags = ["Newsletter", "Shiro", "Tsunami", "IA", "Automatisation"];

export async function generateMetadata() {
  const t = await getTranslations();
  const metadata: Metadata = {
    title: t("newsletter.title"),
    description: t("newsletter.description"),
  };
  return metadata;
}

export default async function Newsletter() {
  const t = await getTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      <SectionBase
        sectionClassName="w-full"
        sectionContentClassName="w-full"
        cardClassName="w-full"
        cardContentClassName="w-full p-6 md:p-8"
        //cardContentClassName="squircle squircle-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60"
        className="squircle squircle-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
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
              {t("newsletter.page.badge")}
            </Badge>
            <h2 className="self-stretch">
              {t("newsletter.page.title")}
            </h2>
            <p className="relative text-base font-normal md:font-medium md:text-2xl max-w-3xl leading-[120%] text-zinc-600">
              {t("newsletter.page.desc")}
            </p>
          </div>
          <Tags tags={tags} isCentered />
          {/* <div className="mt-2"><NewsletterSubscribersBadge /></div> */}

          <div className="flex flex-col items-start gap-4 w-full md:max-w-[80%]">
            <Input
              placeholder="😏 vous voulez recevoir des cadeaux ?"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              onClick={() => {
                posthog.capture('newsletter_subscribe_clicked', { has_email_entered: !!email });
                setIsModalOpen(true);
              }}
              asFull
              whileTap
              asPointer
            >
              <span className="font-bold text-base">Recevoir !🦄</span>
            </Button>
          </div>
        </div>
      </SectionBase>

      <SubscriptionModal
        isOpen={isModalOpen}
        email={email || undefined}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
