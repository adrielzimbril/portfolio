"use client"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionBase } from "@/components/shared/pages/shared/section-base"
import {
  CalendarIcon as Calendar,
  HourglassIcon as HourglassFill,
  EyeIcon as Eye,
} from "@solar-icons/react/bold-duotone"
import { cn } from "@/utils/utils"
import { PreviewContentType } from "@/types"
import {
  HeaderPreviewCard,
  PreviewContent,
  TextPreviewContent,
} from "@/components/shared/pages/shared/page/header-preview-card"
import { formatCount, getDate } from "@/utils"
import { useTranslations } from "use-intl"

interface HeaderSectionProps {
  // Preview Content
  previewContent?: PreviewContent

  // Main Title
  mainTitle?: string

  // Slug
  slug?: string

  // Tags
  tags?: { name: string }[]

  // Article details : Date  + Min read + Views
  thoughtDetails?: {
    date?: string
    readingTime?: string
    views?: number
  }

  // Optional custom node to display views (e.g., dynamic client badge)
  viewsNode?: React.ReactNode

  // Optional CSS Classes
  className?: string
  sectionClassName?: string
  cardClassName?: string
}

export function HeaderSection({
  previewContent: initPreviewContent,
  mainTitle,
  tags,
  thoughtDetails,
}: HeaderSectionProps) {
  const t = useTranslations()

  const basePreviewContent = {
    type: PreviewContentType.TEXT,
    emoji: t("common.page-sections.preview.emoji"),
    title: t("common.page-sections.preview.title"),
    subtitle: t("common.page-sections.preview.description"),
  } as TextPreviewContent

  const previewContent = initPreviewContent || basePreviewContent

  return (
    <SectionBase
      sectionClassName="p-0 md:pb-0 mt-16 mb-10 md:mb-20"
      isWide
      cardClassName="w-full"
      cardContentClassName="px-4 md:px-12 py-6 md:py-12"
    >
      {/* Header Preview Card */}
      <Card className="w-full bg-sh-white squircle-xl/100 md:squircle-4xl/100 overflow-hidden p-3 md:p-5">
        <CardContent
          className={cn(
            "w-full bg-b-base squircle-xl/100 md:squircle-3xl/100 overflow-hidden flex flex-col justify-center",
            previewContent.type === PreviewContentType.TEXT || previewContent.type === PreviewContentType.CUSTOM
              ? "text-center md:px-12 py-16 md:py-20 min-h-[300px]"
              : "p-0",
          )}
        >
          <HeaderPreviewCard content={previewContent} />
        </CardContent>
      </Card>

      <h1 className="h3 w-full font-normals relative">{mainTitle}</h1>

      {thoughtDetails && Object.keys(thoughtDetails).length > 0 && (
        <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full overflow-hidden [&_svg]:size-auto">
          {thoughtDetails.date && (
            <Badge className="bg-violet-100 squircle-3xl/100 md:squircle-5xl/100" variant="colored" size="md">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-indigo-400" />
                {getDate({ date: thoughtDetails.date })}
              </span>
            </Badge>
          )}

          <Badge className="bg-violet-100 squircle-3xl/100 md:squircle-5xl/100" variant="colored" size="md">
            <span className="flex items-center gap-2">
              <HourglassFill size={16} className="text-indigo-400" />
              {thoughtDetails.readingTime}
            </span>
          </Badge>

          <Badge className="bg-violet-100 squircle-3xl/100 md:squircle-5xl/100" variant="colored" size="md">
            <span className="flex items-center gap-2">
              <Eye size={16} className="text-indigo-400" />
              {formatCount(thoughtDetails.views ?? 0)} {t("common.stats.views")}
            </span>
          </Badge>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle-2xl/100 md:squircle-7xl/100 bg-sh-white overflow-hidden">
          {tags.map((tag, index) => (
            <Badge key={index} size="sm">
              {tag.name || (tag as unknown as string)}
            </Badge>
          ))}
        </div>
      )}
    </SectionBase>
  )
}
