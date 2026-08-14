import localFont from "next/font/local"

export const SFProDisplay = localFont({
  src: [
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
  display: "swap",
  weight: "400 700",
  style: "normal",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
  adjustFontFallback: "Arial",
})

export const SFProText = localFont({
  src: [
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-text",
  display: "swap",
  weight: "400 700",
  style: "normal",
  preload: false,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
  adjustFontFallback: "Arial",
})

export const OpenRunde = localFont({
  src: [
    {
      path: "./fonts/open-runde/open-runde-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/open-runde/open-runde-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/open-runde/open-runde-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/open-runde/open-runde-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-open-runde",
  display: "swap",
  weight: "400 700",
  style: "normal",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
  adjustFontFallback: "Arial",
})
