"use client"
import { Button } from "@/components/ui/button"
import { Sun2Icon as Sun, MoonStarsIcon as MoonSparkle } from "@solar-icons/react/bold-duotone"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"
import { useRef } from "react"
import { cn } from "@/utils"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const changeTheme = async () => {
    if (!buttonRef.current) return

    const newTheme = theme === "light" ? "dark" : "light"

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    }).ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const y = top + height / 2
    const x = left + width / 2

    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRad}px at ${x}px ${y}px)`],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    )
  }

  return (
    <Button
      variant="outline"
      ref={buttonRef}
      type="button"
      size="icon"
      data-space-click="sparkle"
      className="size-8 cursor-pointer"
      onClick={changeTheme}
    >
      <Sun
        size={24}
        className={cn(
          "rotate-0 scale-100 transition-all",
          theme === "dark" && "-rotate-90 scale-0",
          theme === "system" && "-rotate-90 scale-0",
        )}
      />
      <MoonSparkle
        size={24}
        className={cn(
          "absolute rotate-90 scale-0 transition-all",
          theme === "dark" && "rotate-0 scale-100",
          theme === "system" && "-rotate-90 scale-0",
        )}
      />
    </Button>
  )
}
