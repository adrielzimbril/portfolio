import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/bones/registry";
import { ThemeProvider } from "next-themes";
import { metadata as metadataBase } from "@/app/metadata";
import type { PropsWithChildren } from "react";
import { ProgressProvider } from "@/components/providers/progress-provider";
import { siteConfig } from "@/data/config";
import { LayoutProvider } from "@/components/providers/layout-provider";
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
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          <LayoutProvider>
            <ProgressProvider>
              <main>
                <div className="container mx-auto relative min-h-dvh flex flex-col">
                  <Navbar />
                  {children}
                  <ScrollToTop />
                </div>
              </main>
            </ProgressProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
