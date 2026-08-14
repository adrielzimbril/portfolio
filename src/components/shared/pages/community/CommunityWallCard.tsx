"use client"

import React from "react"
import { cn } from "@/utils/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import BoringAvatar from "boring-avatars"
import { getImageUrl, pickRandomColorCode } from "@/utils"
import { useMemo } from "react"
import { patterns } from "@/components/shared/pages/community/pattern"
import { useLocale } from "next-intl"
import { Locale } from "@/types"

type CommunityWallCardProps = {
  patternIndex: number
  message?: string | Record<Locale, string>
  rotation?: number
  author?: string
  profilePicture?: string
  className?: string
  language?: Locale
}

export function CommunityWallCard({
  patternIndex,
  message = "",
  rotation = 0,
  author = "",
  profilePicture = "",
  className = "",
  language,
}: CommunityWallCardProps) {
  const pattern = patterns[patternIndex % patterns.length]
  const locale: Locale = useLocale() as Locale

  // Generate random colors for BoringAvatar
  const avatarColors = useMemo(() => {
    return Array.from({ length: 8 }).map(() => pickRandomColorCode() ?? "#ffffff")
  }, [])

  // Extract message based on format (string or JSON)
  const displayMessage = useMemo(() => {
    if (typeof message === "string") {
      return message
    }
    if (typeof message === "object" && message !== null) {
      // Use provided language, current locale, or fallback language
      const lang = language || locale || Locale.EN
      return message[lang] || message[Locale.EN] || Object.values(message)[0] || ""
    }
    return ""
  }, [message, language, locale])

  return (
    <Card
      className={cn(
        "bg-b-base squircle-3xl/80  border-2 border-b-base-accent cursor-pointer pointer-events-none",
        "transition-all duration-300 group cursor-pointer",
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <CardContent className="flex flex-col items-start justify-between gap-3 p-4 h-full">
        <div
          className={cn(
            "relative size-full flex flex-col items-center gap-2 squircle-2xl/80 bg-sh-white p-2 overflow-hidden",
          )}
        >
          <div
            className={cn(
              "relative size-full flex flex-row items-center justify-center p-4 min-h-[200px]",
              " squircle-2xl/80 bg-b-base overflow-hidden",
            )}
          >
            {pattern?.content}
            <p className="w-full z-10 line-clamp-6 text-center text-xl font-bold text-b-white-invert whitespace-pre-line wrap-break-word">
              {displayMessage}
            </p>
          </div>
          <div className="flex w-full items-center gap-2">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={getImageUrl(profilePicture ?? "")} />
              <AvatarFallback className="relative pointer-events-none">
                <BoringAvatar
                  name={author || (profilePicture?.slice(8)?.replace(".png", "") ?? "")}
                  colors={avatarColors}
                  variant="beam"
                />
              </AvatarFallback>
            </Avatar>
            <p className="truncate text-b-white-invert-sec text-sm">{author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
