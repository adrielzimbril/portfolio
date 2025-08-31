import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function DetailsCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="squircle squircle-stone-100 squircle-6xl squircle-smooth-xl border-0 overflow-hidden h-full md:max-w-xl">
      <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
        <div
          className={cn(
            "flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-4xl squircle-white overflow-hidden"
          )}
        >
          <div className="flex flex-col items-start gap-4 w-full max-w-[90%] py-12 mx-auto">
            <Badge
              className="aspect-square p-4 rounded-full"
              contentClassName="size-12"
            >
              <Image
                className="w-full h-full object-cover pointer-events-none"
                src={icon}
                alt={title}
                width={100}
                height={100}
              />
            </Badge>
            <h3 className="text-3xl tracking-wide leading-[120%]">{title}</h3>

            <p className="text-zinc-500 text-xl leading-[140%]">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
