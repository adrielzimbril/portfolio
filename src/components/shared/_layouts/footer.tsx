"use client";
import { useState } from "react";
import { updateLocale } from "@/module/i18n/lib/update-locale";
import type { Locale } from "@i18n/types";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { appConfig } from "@/data/app-config";
import { Button } from "@/components/ui/button";
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
import { useTranslations } from "use-intl";

export function Footer() {
  return (
    <footer className="relative w-full py-6 bg-b-base rounded-2xl mb-4">
      <LocaleSwitch />
      <div className="text-center mt-8">
        <p className="w-full relative font-medium text-b-white-foreground">
          Copyright Holder © {new Date().getFullYear()} - All Right Reserved -
          Designed with ❣️ by Adriel ZIMBRIL.
        </p>
      </div>
    </footer>
  );
}

const { locales } = appConfig.i18n;

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

  const currentIcon = Object.entries(locales).find(
    ([locale]) => locale === currentLocale
  )?.[1].icon as keyof typeof iconsMap;

  const SelectedFlag = iconsMap[currentIcon];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-fit items-center gap-2 squircle-b-white text-b-white-foreground min-w-10"
          size="xs"
          asIcon
          asPointer
          aria-label="Language"
        >
          {/* <LanguagesIcon className="size-4" aria-hidden="true" /> */}
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
                {/* <span className="text-xl">{iconMobile}</span> */}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
