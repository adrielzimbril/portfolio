"use client";
import React, { useEffect, useState } from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { getLegalByPath } from "@/integrations/content/lib";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale } from "use-intl";

export function PageContent() {
  const [terms, setTerms] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    const loadTerms = async () => {
      try {
        const data = await getLegalByPath("terms", { locale });
        setTerms(data);
      } catch (error) {
        console.error("Failed to load terms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTerms();
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
        {terms?.body && <MarkdownContentRender content={terms.body} />}
      </div>
    </SectionLayout>
  );
}
