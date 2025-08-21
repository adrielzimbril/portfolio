import React from "react";
import thoughtsData from "@/data/personal/thoughts.json";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";

export function MyThoughtsSection() {
  return (
    <SectionLayout className="p-0">
      {thoughtsData.map((thought) => (
        <ThoughtCard key={thought.id} details={thought} />
      ))}
    </SectionLayout>
  );
}
