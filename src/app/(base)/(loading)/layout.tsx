import type { Metadata, Viewport } from "next";
import "../../globals.css";
import { siteConfig } from "@/data/config";
import { ThemeProvider } from "next-themes";
import { SFProDisplay, SFProText } from "@/lib/fonts/fonts";
import { metadata as metadataBase } from "../../metadata";

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
          <main className="h-screen">
            <div className="container mx-auto relative">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
