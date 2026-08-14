import React from "react"
import { getTranslations } from "next-intl/server"
import { Metadata } from "next"
import { metadata as baseMetadata } from "@/app/metadata"
import { HeaderSection } from "@/app/(base)/toolbox/sections/HeaderSection"
import { SetupSection } from "@/app/(base)/toolbox/sections/SetupSection"
import { ToolsSection } from "@/app/(base)/toolbox/sections/ToolsSection"
import { CallToAction } from "@/components/shared/pages/shared/call-to-action"
import { Skeleton } from "@/components/ui/skeleton"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    ...baseMetadata,
    title: t("toolbox.title"),
    description: t("toolbox.description"),
    keywords: t("toolbox.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("toolbox.title"),
      description: t("toolbox.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("toolbox.title"),
      description: t("toolbox.description"),
    },
  }
}

export default async function ToolsPage() {
  return (
    <>
      <Skeleton name="toolbox-header">
        <HeaderSection />
      </Skeleton>
      <Skeleton name="toolbox-tools">
        <ToolsSection />
      </Skeleton>
      <Skeleton name="toolbox-setup">
        <SetupSection />
      </Skeleton>
      <Skeleton name="toolbox-cta">
        <CallToAction isPage />
      </Skeleton>
    </>
  )
}
