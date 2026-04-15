"use client";
import React from "react";
import { ConnectionAvatar } from "@/components/shared/pages/connections/avatar";
import { ConnectionBadge } from "@/components/shared/pages/connections/badge";
import { ConnectionName } from "@/components/shared/pages/connections/name";
import { ReactionBar } from "@/components/shared/reactions/ReactionBar";
import { cn } from "@/utils/utils";
import { PageType } from "@/types/enum";

export function ConnectionCard({
  id,
  name,
  image,
  met,
}: {
  id: string;
  name: string;
  image: string;
  met: string | null;
}) {
  return (
    <div
      key={id}
      className="relative size-full flex flex-col items-center gap-4 group cursor-pointer"
    >
      <ConnectionAvatar image={image} name={name} met={met} />
      <ConnectionBadge met={met} />
      <ConnectionName name={name} />
      <ReactionBar
        pageType={PageType.CONNECTIONS}
        entityId={id}
        variant="dock"
        className="mt-2"
      />
    </div>
  );
}
