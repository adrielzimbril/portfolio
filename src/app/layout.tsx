import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/data/config";
import { ThemeProvider } from "next-themes";
import Dockbar from "@/components/shared/dockbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Navbar } from "@/components/shared/navbar";
import { SquircleProvider } from "@/components/shiro/providers/squircle-provider";
import SplashCursor from "@/components/shiro/builder/splash-cursor";
import { SmoothCursor } from "@/components/shiro/magicui/smooth-cursor";
import { SFProDisplay, SFProText } from "@/lib/fonts/fonts";

export const viewport: Viewport = {
  themeColor: "black",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: `${siteConfig.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${siteConfig.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`antialiased ${SFProDisplay.variable} ${SFProText.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SquircleProvider>
              <div className="max-w-7xl mx-auto relative">
                <Navbar />
                <Dockbar />
                {/* <SplashCursor /> */}
                {/* <SmoothCursor /> */}
                {children}
              </div>
            </SquircleProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

