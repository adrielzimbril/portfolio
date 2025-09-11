import React from "react";
import { ResourceCard } from "@/components/shared/pages/resources/page/card";
import { SectionLayout } from "@/components/shared/sections/layout";

export function ProjectStatementSection({
  description,
  statements,
}: {
  description: string;
  statements: { icon: string; number: string; description: string }[];
}) {
  return (
    <>
      <SectionLayout
        title="Recherche utilisateur"
        description={description}
        className="p-0"
        contentClassName="md:grid-cols-3"
      >
        {statements.map((stat, index) => (
          <ResourceCard key={index} details={stat} />
        ))}
      </SectionLayout>
    </>
  );
}
