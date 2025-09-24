"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { cn } from "@/utils/utils";
import { Tags } from "@/components/shared/pages/resources/tags";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { ProductAvatarsStats } from "@/components/SubscriberBadges";
import { generateSimpleClientToken, getDate } from "@/utils";
import { ResourceType } from "@/types";
import { useEmailValidator } from "@/hooks/useValidation/useEmailValidator";
import { toast } from "sonner";
import { useTranslations, useLocale } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { routes } from "@/data/routes";
import { getPathUrl } from "@/utils";

export function GetResource({
  id,
  title,
  tags,
  excerpt,
  type,
  created_at,
}: {
  id?: string | number;
  title: string;
  tags: { name: string; color: string }[];
  excerpt: string;
  type: ResourceType;
  created_at: string;
}) {
  const t = useTranslations();
  const locale = useLocale();

  usePageViews(
    routes.hubGet.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.hubGet.link),
    },
    false
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const emailValidator = useEmailValidator({
    value: email,
    label: "Email",
    required: true,
  });
  const isEmailValid = !Boolean(emailValidator(email));

  const productId = generateSimpleClientToken({
    action: "validate-product-id",
    id: id ?? "",
  });

  const productTypeMap: Record<ResourceType, string> = {
    [ResourceType.COURSE]: t(
      "common.page-sections.hub.base.resources-type.course.title"
    ),
    [ResourceType.EBOOK]: t(
      "common.page-sections.hub.base.resources-type.ebook.title"
    ),
    [ResourceType.VIDEO]: t(
      "common.page-sections.hub.base.resources-type.video.title"
    ),
    [ResourceType.MASTERCLASS]: t(
      "common.page-sections.hub.base.resources-type.masterclass.title"
    ),
    [ResourceType.FIGMA_TEMPLATE]: t(
      "common.page-sections.hub.base.resources-type.figma-template.title"
    ),
    [ResourceType.CODE]: t(
      "common.page-sections.hub.base.resources-type.code.title"
    ),
  };

  const productType = productTypeMap[type] ?? "";

  return (
    <>
      <SectionBase
        sectionClassName="w-full"
        sectionContentClassName="w-full"
        cardClassName="w-full"
        cardContentClassName="w-full px-4 py-6 md:p-8"
        //cardContentClassName="squircle squircle-sh-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60"
        className="squircle squircle-sh-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
      >
        <div
          className={cn(
            "flex relative flex-col min-h-60 items-center justify-center text-center p-4 gap-4 max-w-4xl mx-auto"
            // isWide && "md:min-h-96"
          )}
        >
          {/* {cover && (
            <div className="flex flex-col items-start gap-4 w-full mb-6 rounded-lg md:rounded-4xl overflow-hidden border-4 md:border-8 border-b-base-accent">
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
            <Badge className="relative text-base font-normal md:font-medium md:text-xl max-w-3xl leading-[120%] text-b-white-invert-sec">
              {productType}
            </Badge>
            <h2 className="self-stretch">{title}</h2>
            <p className="relative text-base font-normal md:font-medium md:text-2xl max-w-3xl leading-[120%] text-b-white-invert-thr">
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
            {/* <NewsletterSubscribersBadge />
            <ProductTypeSubscribersBadge type={type} /> */}
            {/* <ProductTitleRequestsBadge title={title} type={type} /> */}

            <ProductAvatarsStats title={title} type={type} />
          </div>
          <div className="flex flex-col items-start gap-4 w-full md:max-w-[80%]">
            <Input
              placeholder={t(
                "common.page-sections.newsletter.form.fields.email-page.placeholder"
              )}
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
                  toast.error(t("zod.errors.customized.email.invalid"));
                }
              }}
              asFull
              whileTap
              asPointer
            >
              <span className="font-bold text-base">
                {t("common.button.receive")} !🦄
              </span>
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
