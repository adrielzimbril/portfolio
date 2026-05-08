import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { metadata as metadataBase } from "@/app/metadata";
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast";
// Front layout imports moved to (base)/layout.tsx
import type { PropsWithChildren } from "react";
import { SFProDisplay, SFProText } from "@/lib/fonts/fonts";
import { ProgressProvider } from "@/components/aurthle/providers/progress-provider";
import { siteConfig } from "@/data/config";

import ReactLenis from "lenis/react";
import { ScrollToTop } from "@/components/shared/_layouts/scroll-to-top";
import { Navbar } from "@/components/shared/_layouts/navbar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "white",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "black",
    },
  ],
};

export const metadata: Metadata = {
  ...metadataBase,
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={siteConfig.languagePrimary} suppressHydrationWarning>
      <body
        className={`antialiased ${SFProDisplay.variable} ${SFProText.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          <ReactLenis root>
            <ProgressProvider>
              <ToastProvider>
                <AnchoredToastProvider>
                  <main>
                    <div className="container mx-auto relative min-h-dvh flex flex-col">
                      <Navbar />
                      {children}
                      <ScrollToTop />
                    </div>
                  </main>
                </AnchoredToastProvider>
              </ToastProvider>
            </ProgressProvider>
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
