import React from "react";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import thoughtsData from "@/data/personal/thoughts.json";

export function MoreInfoSection() {
  return (
    <SectionLayout title="Autres articles" layoutStart>
      {thoughtsData.slice(0, 2).map((thought) => (
        <ThoughtCard key={thought.id} details={thought} />
      ))}
    </SectionLayout>
  );
};
