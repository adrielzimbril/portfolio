"use client";
import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { MyThoughtsSection } from "./sections/MyThoughtsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";

export async function generateMetadata() {
  const metadata: Metadata = {
    title: "Thoughts",
  };
  return metadata;
}

export default function MyThoughts() {
  return (
    <>
      <HeaderSection />
      <MyThoughtsSection />
      <CallToAction isPage />
    </>
  );
}
