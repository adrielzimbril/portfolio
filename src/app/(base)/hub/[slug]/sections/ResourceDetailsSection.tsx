import React from "react";
import { PageDetails } from "@/components/shared/pages/shared/page/page-details";

export function ResourceDetailsSection({ content }: { content: string }) {
  return <PageDetails content={content} />;
}
