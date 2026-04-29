"use client";
import React from "react";
import { ConnectionAvatar } from "@/components/shared/pages/connections/avatar";
import { ConnectionBadge } from "@/components/shared/pages/connections/badge";
import { ConnectionName } from "@/components/shared/pages/connections/name";

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
      <div className="relative">
        <ConnectionAvatar image={image} name={name} met={met} />
        <ConnectionBadge met={met} />
      </div>
      <ConnectionName name={name} />
    </div>
  );
}
