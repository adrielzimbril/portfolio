"use client";
import React, { useEffect, useState } from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { getLegalByPath } from "@/integrations/content/lib";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale } from "use-intl";

export function PolicyContent() {
  const [policy, setPolicy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        const data = await getLegalByPath("policy", { locale });
        setPolicy(data);
      } catch (error) {
        console.error("Failed to load policy:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPolicy();
  }, [locale]);

  if (isLoading) {
    return (
      <SectionLayout isFlex>
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout isFlex>
      <div className="max-w-3xl mx-auto">
        {policy?.body && <MarkdownContentRender content={policy.body} />}
      </div>
    </SectionLayout>
  );
}
