"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "use-intl";
import { updateLocale } from "@/module/i18n/lib/update-locale";
import type { Locale } from "@i18n/types";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/components/ui/link";
import logger from "@/utils/logger";
import {
  getBestResourcesLink,
  ResourcePreview,
} from "@/module/content/utils/lib";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn, getResourcesUrl, getThisMonth } from "@/utils";
import { SectionBase } from "../pages/shared/section-base";
import { siteConfig } from "@/data/config";
import { ButtonCopy } from "@/components/ui/button-copy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USFlag } from "@/components/icons/flags/USFlag";
import { FRFlag } from "@/components/icons/flags/FRFlag";
import { CNFlag } from "@/components/icons/flags/CNFlag";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/data/routes";
import { PageType } from "@/types";
import { appConfig } from "@/data/app-config";
import { StatusBadge } from "@/components/ui/status-badge";
import { LinkOne } from "@aurthle/icons";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isMobile = useIsMobile();
  const [resources, setResources] = useState<ResourcePreview[]>([]);
  const config = {
    limit: 4,
  };

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await getBestResourcesLink({
          limit: config.limit,
          locale,
        });
        setResources(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadResources();
  }, []);

  return (
    <footer className="w-full">
      <SectionBase
        sectionClassName="w-full pt-0! pb-8!"
        sectionContentClassName="w-full"
        cardClassName="w-full rounded-4xl bg-stone-100 dark:bg-zinc-900"
        cardContentClassName="w-full p-6 md:p-8"
        className="squircle squircle-b-white squircle-xl md:squircle-3xl squircle-smooth-xl rounded-3xl border-0 overflow-hidden max-w-none"
      >
        <div className="flex relative flex-col w-full items-center justify-center p-4 md:p-16 gap-4 md:gap-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex-row justify-between items-start gap-8">
            <div className="flex flex-col gap-4 md:gap-6 w-full rounded-2xl">
              <div className="flex flex-col gap-6 rounded-3xl bg-b-bases bg-b-base py-4 px-4">
                <div className="flex flex-col gap-2">
                  <StatusBadge
                    mode="inline"
                    status="available"
                    primaryText={t(
                      "common.shared.planning-badge.available.title"
                    )}
                    className="squircle-b-white text-b-white-invert"
                    variant="colored"
                    size="md"
                  >
                    <Link href={routes.contact.link}>
                      <span className="flex items-center gap-2">
                        {t(
                          "common.shared.planning-badge.available.description-simple",
                          {
                            date: t("common.shared.months." + getThisMonth()),
                          }
                        )}
                        <LinkOne variant="bulk" size={20} />
                      </span>
                    </Link>
                  </StatusBadge>
                  <span className="relative text-base font-medium text-b-white-invert-sec px-2">
                    {t("common.shared.base.subtitle")}
                  </span>
                </div>
              </div>
              <div className="flex items-center flex-wrap content-center place-content-center md:place-content-start md:justify-start gap-3">
                {Object.entries(siteConfig.links.contact.social)
                  .filter(([_, social]) => social.available)
                  .map(([name, social]) => (
                    <Link
                      key={name}
                      href={social.url}
                      likeButton
                      whileTap
                      size="xs"
                      //variant="outline"
                      aria-label={name}
                    >
                      <span className="flex items-center size-full justify-center m-auto">
                        <span className="capsitalize">
                          {social.key != "email"
                            ? t("common.base." + social.key)
                            : social.name}
                        </span>
                      </span>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="flex flex-col justify-self-end gap-6 w-full md:max-w-md rounded-2xl bg-b-bases bg-b-base p-4">
              <div className="flex flex-col gap-4 max-w-sms">
                <h4 className="text-3xl">
                  {t("common.page-sections.newsletter.footer.title")}
                </h4>
                <p className="text-base text-b-white-invert-thr">
                  {t("common.page-sections.newsletter.footer.description")}
                </p>
                <div className="flex flex-col gap-2">
                  <Link href={routes.newsletter.link} likeButton asFull>
                    {t("common.page-sections.newsletter.footer.button")}
                  </Link>
                  <span className="relative text-base text-b-white-invert-sec bg-b-white p-2 rounded-xl">
                    {t("common.page-sections.newsletter.footer.subText")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full place-self-center rounded-3xl bg-b-base dark:bg-zinc-900 py-4 md:py-6">
            <div className="w-full flex flex-col md:flex-row justify-center place-content-center items-center gap-2">
              {resources.map((resource, index) => (
                <React.Fragment key={resource.slug ?? index}>
                  <Link
                    href={getResourcesUrl(PageType.HUB, resource.slug)}
                    className="text-base text-center md:text-left bg-b-white rounded-xl py-2 px-4"
                  >
                    {resource.title}
                  </Link>
                  {index < resources.length - 1 && (
                    <Separator
                      className={cn("bg-zinc-300", {
                        hidden: isMobile,
                        "h-5": !isMobile,
                      })}
                      orientation={isMobile ? "horizontal" : "vertical"}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full justify-center md:justify-between align-center place-content-center items-center gap-4 rounded-2xl py-4 md:px-6 bg-b-base dark:bg-zinc-900">
            <div className="flex items-center md:items-start gap-2 text-b-white-foreground dark:text-zinc-200">
              <p className="relative font-medium text-base text-center md:text-left">
                <span className="relative">
                  {t("common.shared.text.copyright", {
                    year: new Date().getFullYear(),
                    author: siteConfig.details.name,
                  })}
                </span>
              </p>
            </div>
            <div className="flex items-center md:items-end gap-2">
              <LocaleSwitch />
            </div>
          </div>
        </div>
      </SectionBase>
    </footer>
  );
};

export function LocaleSwitch() {
  const t = useTranslations();
  const router = useRouter();

  const currentLocale = useLocale();

  const [value, setValue] = useState<Locale>(currentLocale as Locale);

  const iconsMap = {
    FRFlag,
    USFlag,
    CNFlag,
  } as const;

  const { locales } = appConfig.i18n;

  const currentIcon = Object.entries(locales).find(
    ([locale]) => locale === currentLocale
  )?.[1].icon as keyof typeof iconsMap;

  const SelectedFlag = iconsMap[currentIcon];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-fit items-center gap-2 squircle-b-white! text-b-white-foreground min-w-10"
          size="xs"
          asIcon
          asPointer
          aria-label="Language"
        >
          {SelectedFlag && (
            <SelectedFlag className="transform scale-125 rounded-sm" />
          )}
          <span className="relative">{t("common.shared.text.language")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit min-w-32">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            setValue(value as Locale);

            updateLocale(value as Locale);
            router.refresh();
          }}
          className="flex flex-col w-fit items-start gap-1"
        >
          {Object.entries(locales).map(([locale, { label, icon }]) => {
            const IconComponent = iconsMap[icon as keyof typeof iconsMap];
            return (
              <DropdownMenuRadioItem
                className="flex gap-2 items-center justify-between text-b-white-unchanged data-[state=checked]:bg-indigo-100 focus:bg-indigo-200 focus:text-b-white-unchanged w-full"
                key={locale}
                value={locale}
              >
                {label}
                <span className="text-xl">
                  {
                    <IconComponent
                      width="20px"
                      height="15px"
                      className="rounded-xs"
                    />
                  }
                </span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
