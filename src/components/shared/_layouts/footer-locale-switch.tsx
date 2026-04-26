"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "use-intl";
import { updateLocale } from "@/integrations/i18n/lib/update-locale";
import type { Locale } from "@/integrations/i18n/types";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USFlag } from "@/components/shared/icons/flags/USFlag";
import { FRFlag } from "@/components/shared/icons/flags/FRFlag";
import { CNFlag } from "@/components/shared/icons/flags/CNFlag";
import { appConfig } from "@/data/app-config";

export function FooterLocaleSwitch() {
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
    ([locale]) => locale === currentLocale,
  )?.[1].icon as keyof typeof iconsMap;
  const SelectedFlag = iconsMap[currentIcon];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="colored"
          className="flex w-fit items-center gap-2 squircle-sh-white! squircle-7xl squircle-border-2 squircle-border-b-base-accent text-b-white-foreground min-w-10"
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
          onValueChange={(nextValue) => {
            setValue(nextValue as Locale);
            updateLocale(nextValue as Locale);
            router.refresh();
          }}
          className="flex flex-col w-fit items-start gap-1"
        >
          {Object.entries(locales).map(([locale, { label, icon }]) => {
            const IconComponent = iconsMap[icon as keyof typeof iconsMap];
            return (
              <DropdownMenuRadioItem
                className="flex gap-2 items-center justify-between text-b-white-foreground data-[state=checked]:text-b-white-unchanged data-[state=checked]:bg-indigo-100 focus:bg-indigo-200 focus:text-b-white-unchanged w-full"
                key={locale}
                value={locale}
              >
                {label}
                <span className="text-xl">
                  <IconComponent
                    width="20px"
                    height="15px"
                    className="rounded-xs"
                  />
                </span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
