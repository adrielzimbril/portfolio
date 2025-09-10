import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Use is dark mode.
 *
 * @returns {boolean} Whether the current theme is dark.
 */
export function useIsDarkMode(): boolean {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  return isDarkMode;
}

/**
 * Use change theme.
 *
 * @param {string} theme - The theme to set.
 *
 * @example
 * useChangeTheme("dark");
 *
 * @example
 * useChangeTheme("light");
 *
 * @example
 * useChangeTheme("system");
 */
export function useChangeTheme(theme?: "dark" | "light" | "system"): void {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (theme) setTheme(theme);
  }, [theme]);
}
