"use client";
import React from "react";

export function ConnectionName({
  name,
}: {
  name: string;
}) {
  return (
    <div className="text-center">
      <h6 className="font-semibold text-b-white-invert-sec text-sm md:text-base">
        {name}
      </h6>
    </div>
  );
}
