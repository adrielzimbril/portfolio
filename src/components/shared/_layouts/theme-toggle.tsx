"use client";

import * as React from "react";
import { SunOne } from "@aurthle/icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { flushSync } from "react-dom";
import { MoonIcon } from "@radix-ui/react-icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const changeTheme = async () => {
    if (!buttonRef.current) return;

    // Check if the browser supports the View Transition API
    const supportsViewTransition = "startViewTransition" in document;

    if (supportsViewTransition) {
      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(theme === "light" ? "dark" : "light");
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
      setTheme(theme === "light" ? "dark" : "light");
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
      className="md:size-auto md:p-3 aspect-square"
    >
      <SunOne className="md:size-5! rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute md:size-5! rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
