import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { metadata as metadataBase } from "@/app/metadata";
import { LayoutProvider } from "@/components/aurthle/providers/layout-provider";
import { SyncProvider } from "@/components/aurthle/providers/sync-provider";
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast";
// Front layout imports moved to (base)/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { PropsWithChildren } from "react";
import { appConfig } from "@/data/app-config";
import logger from "@/utils/logger";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SFProDisplay, SFProText } from "@/lib/fonts/fonts";
import { getUserLocale } from "@/integrations/i18n/lib/locale-cookie";
import { ProgressProvider } from "@/components/aurthle/providers/progress-provider";

import { notFound } from "next/navigation";

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

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getUserLocale();

  setRequestLocale(locale);

  if (!locales.includes(locale)) {
    logger.error("Locale not found", locale);
    setRequestLocale(appConfig.i18n.defaultLocale);
    return notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
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
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LayoutProvider>
              <ProgressProvider>
                <TooltipProvider openDelay={0} closeDelay={0}>
                  <SyncProvider>
                    <ToastProvider>
                      <AnchoredToastProvider>
                        <main>{children}</main>
                      </AnchoredToastProvider>
                    </ToastProvider>
                  </SyncProvider>
                </TooltipProvider>
              </ProgressProvider>
            </LayoutProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
