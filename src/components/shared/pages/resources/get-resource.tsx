"use client";
import React, { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon, EyeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { cn } from "@/utils/utils";
import { Tags } from "@/components/shared/pages/resources/tags";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import {
  NewsletterSubscribersBadge,
  ProductTitleRequestsBadge,
  ProductTypeSubscribersBadge,
} from "@/components/SubscriberBadges";
import {
  generateJwtToken,
  generateSimpleClientToken,
  generateToken,
  getDate,
} from "@/utils";
import { ResourceType } from "@/types";
import logger from "@/utils/logger";
import { useEmailValidator } from "@/hooks/useValidation/useEmailValidator";
import { toast } from "sonner";

export function GetResource({
  id,
  title,
  cover,
  tags,
  features,
  excerpt,
  type,
  created_at,
  slug,
  path,
  locale,
}: {
  id?: string | number;
  title: string;
  cover?: string;
  tags: { name: string; color: string }[];
  features?: string[];
  excerpt: string;
  type: ResourceType;
  created_at: string;
  path?: string;
  locale?: string;
  slug?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const emailValidator = useEmailValidator({ label: "Email", required: true });
  const isEmailValid = !Boolean(emailValidator(email));

  const productId = generateSimpleClientToken({
    action: "validate-product-id",
    id: id ?? "",
  });

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
          {/* {cover && (
            <div className="flex flex-col items-start gap-4 w-full mb-6 rounded-lg md:rounded-4xl overflow-hidden border-4 md:border-8 border-zinc-200">
              <Image
                src={cover}
                alt={title}
                width={1200}
                height={630}
                className="size-full object-contain"
              />
            </div>
          )} */}

          <div className="flex relative flex-col items-center justify-center text-center pb-2 gap-3 md:gap-4">
            <Badge className="relative text-base font-normal md:font-medium md:text-xl max-w-3xl leading-[120%] text-zinc-600">
              {type === ResourceType.COURSE
                ? "Formation 🎥"
                : type === ResourceType.EBOOK
                  ? "E-book 📕"
                  : "Masterclass 🎬"}
            </Badge>
            <h2 className="self-stretch">{title}</h2>
            <p className="relative text-base font-normal md:font-medium md:text-2xl max-w-3xl leading-[120%] text-zinc-500">
              {excerpt}
            </p>
          </div>
          {/* <ProjectCategories
            categories={tags.map((tag) => ({
              name: tag.name,
              color: tag.color as DEFAULT_CATEGORY_COLOR_NAME,
            }))}
          /> */}
          <Tags
            primaryTag={getDate({ date: created_at })}
            tags={tags.map((tag) => tag.name)}
            isCentered
          />
          <div className="mt-2 flex items-center gap-2">
            <NewsletterSubscribersBadge />
            <ProductTypeSubscribersBadge type={type} />
            <ProductTitleRequestsBadge title={title} />
          </div>
          <div className="flex flex-col items-start gap-4 w-full md:max-w-[80%]">
            <Input
              placeholder="😏 vous voulez recevoir des cadeaux ?"
              type="email"
              //className="ml-auto rounded-s-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              onClick={() => {
                if (isEmailValid) {
                  setIsModalOpen(true);
                } else {
                  toast.error(
                    "Oups ! Veuillez entrer une adresse email valide, s'il vous plaît 🦄"
                  );
                }
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
        productId={productId}
        productType={type}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
