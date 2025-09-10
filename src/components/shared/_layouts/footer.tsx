"use client";

import { useState } from "react";
import { updateLocale } from "@/module/i18n/lib/update-locale";
import { useLocaleRouter, useLocalePathname } from "@/module/i18n/routing";
import { LanguagesIcon } from "lucide-react";
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
import { LangSwitcherIcon } from "@/components/icons/lang-switcher-icon";
import { LangIcon } from "@/components/icons/lang-icon";

export function Footer() {
  return (
    <footer className="relative w-full py-6 bg-zinc-100 rounded-2xl mb-4">
      <LocaleSwitch />
      <div className="text-center mt-8">
        <p className="w-full relative font-medium text-zinc-700">
          Copyright Holder © {new Date().getFullYear()} - All Right Reserved -
          Designed with ❣️ by Adriel ZIMBRIL.
        </p>
      </div>
    </footer>
  );
}

const { locales } = appConfig.i18n;

export function LocaleSwitch() {
  const router = useRouter();
  const currentLocale = useLocale();
  const [value, setValue] = useState<Locale>(currentLocale as Locale);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center"
          size="icon"
          aria-label="Language"
        >
          <LanguagesIcon className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            setValue(value as Locale);

            updateLocale(value as Locale);
            router.refresh();
          }}
        >
          {Object.entries(locales).map(
            ([locale, { label, icon, iconMobile }]) => {
              return (
                <DropdownMenuRadioItem key={locale} value={locale}>
                  {label}
                  {icon}
                  {iconMobile}
                </DropdownMenuRadioItem>
              );
            }
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
