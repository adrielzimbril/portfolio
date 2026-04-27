import localFont from "next/font/local";

export const SFProDisplay = localFont({
  src: [
    // Thin
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-thinitalic.woff",
      weight: "100",
      style: "italic",
    },

    // Ultralight
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-ultralight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-ultralightitalic.woff",
      weight: "200",
      style: "italic",
    },

    // Light
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-lightitalic.woff",
      weight: "300",
      style: "italic",
    },

    // Regular
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-regularitalic.woff",
      weight: "400",
      style: "italic",
    },

    // Medium
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-mediumitalic.woff",
      weight: "500",
      style: "italic",
    },

    // Semibold
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-semibolditalic.woff",
      weight: "600",
      style: "italic",
    },

    // Bold
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-bolditalic.woff",
      weight: "700",
      style: "italic",
    },

    // Heavy
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-heavy.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-heavyitalic.woff",
      weight: "800",
      style: "italic",
    },

    // Black
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-black.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-display-blackitalic.woff",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro-display",
  display: "swap",
  weight: "100 900",
  style: "normal italic",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const SFProText = localFont({
  src: [
    // Light
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-lightitalic.woff",
      weight: "300",
      style: "italic",
    },

    // Regular
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-regularitalic.woff",
      weight: "400",
      style: "italic",
    },

    // Medium
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-mediumitalic.woff",
      weight: "500",
      style: "italic",
    },

    // Semibold
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-semibolditalic.woff",
      weight: "600",
      style: "italic",
    },

    // Bold
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-bolditalic.woff",
      weight: "700",
      style: "italic",
    },

    // Heavy
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-heavy.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/san-francisco-pro/sf-pro-text-heavyitalic.woff",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro-text",
  display: "swap",
  weight: "300 800",
  style: "normal italic",
  preload: false,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
  adjustFontFallback: "Arial",
});
