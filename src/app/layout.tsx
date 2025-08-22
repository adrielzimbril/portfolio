import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/config";
import { ThemeProvider } from "next-themes";
import { Dockbar } from "@/components/shared/dockbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/shared/navbar";
import { SquircleProvider } from "@/components/shiro/providers/squircle-provider";
import { SFProDisplay, SFProText } from "@/lib/fonts/fonts";
import { metadata as metadataBase } from "./metadata";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "sonner";

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
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.languagePrimary} suppressHydrationWarning>
      <body
        className={`antialiased ${SFProDisplay.variable} ${SFProText.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider openDelay={0} closeDelay={0}>
            <SquircleProvider>
              <main>
                <div className="container mx-auto relative">
                  <Navbar />
                  <Dockbar asFade={false} />
                  {/* <SmoothCursor /> */}
                  {children}
                  <ScrollToTop />
                  <Toaster />
                  {/* <SplashCursor /> */}
                  <Footer />
                </div>
              </main>
            </SquircleProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
