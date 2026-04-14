"use client";

import * as React from "react";
import { Sun, Moon, MoonSparkle, SolarEclipseTwo } from "@aurthle/icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { flushSync } from "react-dom";
import { cn } from "@/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const changeTheme = async () => {
    if (!buttonRef.current) return;

    // Cycle through light -> dark -> system -> light
    const newTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

    // Check if the browser supports the View Transition API
    const supportsViewTransition = "startViewTransition" in document;

    if (supportsViewTransition) {
      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(newTheme);
        });
      }).ready;

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const y = top + height / 2;
      const x = left + width / 2;

      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRad}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } else {
      // Fallback simple : just change the theme without animation
      setTheme(newTheme);
    }
  };

  return (
    <Button
      //variant="secondary"
      size="icon"
      asIcon
      asPointer
      ref={buttonRef}
      onClick={changeTheme}
      aria-label={theme}
      className="md:size-auto md:p-3 aspect-square"
    >
      <Sun
        size={24}
        variant="duotone"
        className={cn(
          "rotate-0 scale-100 transition-all",
          theme === "dark" && "-rotate-90 scale-0",
          theme === "system" && "-rotate-90 scale-0",
        )}
      />
      <MoonSparkle
        size={24}
        variant="duotone"
        className={cn(
          "absolute rotate-90 scale-0 transition-all",
          theme === "dark" && "rotate-0 scale-100",
          theme === "system" && "-rotate-90 scale-0",
        )}
      />
      <SolarEclipseTwo
        size={24}
        variant="duotone"
        className={cn(
          "absolute rotate-180 scale-0 transition-all",
          theme === "system" && "rotate-0 scale-100",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
