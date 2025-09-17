import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/config";
import { ThemeProvider } from "next-themes";
import { Dockbar } from "@/components/shared/_layouts/dockbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/shared/_layouts/navbar";
import { SquircleProvider } from "@/components/shiro/providers/squircle-provider";
import { SFProDisplay, SFProText } from "@/lib/fonts/fonts";
import { metadata as metadataBase } from "./metadata";
import { ScrollToTop } from "@/components/shared/_layouts/scroll-to-top";
import { Footer } from "@/components/shared/_layouts/footer";
import { LayoutProvider } from "@/components/shiro/providers/layout-provider";
import { ReactLenis } from "lenis/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { appConfig } from "@/data/app-config";
import logger from "@/utils/logger";
import { Toaster } from "@/components/shiro/providers/toast-provider";
import { getUserLocale } from "@/module/i18n/lib/locale-cookie";
import { FooterSec } from "@/components/shared/_layouts/footer-se";

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

const locales = Object.keys(appConfig.i18n.locales);

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const locale = await getUserLocale();

  setRequestLocale(locale);

  if (!locales.includes(locale as any)) {
    //notFound();
    logger.error("Layout : Locale not found", locale);
  }

  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`antialiased ${SFProDisplay.variable} ${SFProText.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LayoutProvider>
              <TooltipProvider openDelay={0} closeDelay={0}>
                <SquircleProvider>
                  <ReactLenis root>
                    <main>
                      <div className="container mx-auto relative">
                        <Navbar />
                        <Dockbar asFade={false} />
                        {/* <SmoothCursor /> */}
                        {children}
                        <ScrollToTop />
                        <Toaster position="bottom-right" />
                        {/* <SplashCursor /> */}
                        {/* <Footer /> */}
                        <FooterSec />
                      </div>
                    </main>
                  </ReactLenis>
                </SquircleProvider>
              </TooltipProvider>
            </LayoutProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        {/* <AnalyticsScript /> */}
      </body>
    </html>
  );
}
