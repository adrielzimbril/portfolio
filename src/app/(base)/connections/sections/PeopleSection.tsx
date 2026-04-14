"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { connections } from "@/data/personal/connections";
import { cn } from "@/utils/utils";
import {
  pickRandomColor,
  pickRandomColorCode,
} from "@/utils/pick-random-color";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types/default";
import {
  Checked,
  LoveTime,
} from "@aurthle/icons";
import { useTranslations } from "use-intl";

export function PeopleSection() {
  const t = useTranslations();

  return (
    <SectionLayout
      title={t("connections.page.people-section.title")}
      description={t("connections.page.people-section.description")}
      badge={t("connections.page.people-section.badge")}
      isFlex
    >
      <div className="relative mb-12 grid auto-rows-auto grid-cols-3 place-items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {connections
          .sort(
            (a, b) =>
              new Date(b.met ?? 0).getTime() - new Date(a.met ?? 0).getTime(),
          )
          .map((connection) => (
            <div
              key={connection.id}
              className="relative size-full flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="relative size-fit">
                <div
                  className={cn(
                    "relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-36 overflow-hidden transition-all duration-300",
                    connection.met
                      ? "squircle-border-[#8e8eff]"
                      : "squircle-border-b-base-accent group-hover:squircle-border-[#ffd3ad]",
                  )}
                >
                  <Image
                    src={connection.image}
                    alt={connection.name}
                    fill
                    className={cn(
                      "squircle squircle-mask squircle-background squircle-7xl max-w-[85%] max-h-[85%] m-auto object-cover transition-all ease-in-out duration-300 group-hover:scale-110",
                      !connection.met && "grayscale group-hover:grayscale-0",
                    )}
                  />
                </div>
                <div className="absolute top-0 right-0 ">
                  <Badge
                    className={cn(
                      pickRandomColor(
                        connection.met
                          ? DEFAULT_COLOR_CODE_NAME_LIST.VIOLET
                          : DEFAULT_COLOR_CODE_NAME_LIST.ORANGE,
                      ),
                      " p-1.5 rounded-full",
                    )}
                    variant="secondary"
                  >
                    {connection.met ? (
                      <Checked
                        className="text-primary-foreground"
                        size={24}
                        variant="outline"
                      />
                    ) : (
                      <LoveTime size={24} variant="outline" />
                    )}
                  </Badge>
                </div>
              </div>
              <div className="absolute bottom-6 right-1/2 translate-x-1/2">
                {connection.met ? (
                  <Badge
                    className={cn(
                      pickRandomColor(DEFAULT_COLOR_CODE_NAME_LIST.VIOLET),
                      "size-max text-primary-foreground",
                    )}
                    variant="colored"
                  >
                    Met on{" "}
                    {connection.met
                      ? new Date(connection.met).toLocaleDateString()
                      : "—"}
                  </Badge>
                ) : (
                  <Badge
                    className={cn(
                      pickRandomColor(DEFAULT_COLOR_CODE_NAME_LIST.ORANGE),
                      "size-max",
                    )}
                    variant="colored"
                  >
                    Not met yet
                  </Badge>
                )}
              </div>
              <div className="text-center">
                <h6 className="font-semibold text-b-white-invert-sec text-sm md:text-base">
                  {connection.name}
                </h6>
              </div>
            </div>
          ))}
      </div>
    </SectionLayout>
  );
}
