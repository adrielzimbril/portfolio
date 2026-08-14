"use client"
import { useEffect, useState, createContext, useContext } from "react"
import { GenericLoadingPage } from "@/components/shared/pages/page-loader"
import { useTranslations } from "use-intl"
import { usePathname } from "next/navigation"
import { routes } from "@/data/routes"
import { getActivePathInArray, sleep } from "@/utils"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AnalyticsScript } from "@/integrations/analytics"
import ReactLenis from "lenis/react"
import { useCompareIOSVersion } from "@/hooks/useIsMobile"
import { initSquircle } from "@usespaceui/squircle"

type LayoutContextType = {
  isLoaded: boolean
}

const LayoutContext = createContext<LayoutContextType>({ isLoaded: false })

export const useLayout = () => useContext(LayoutContext)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const asLoader = true
  const isBadIOS = useCompareIOSVersion()
  const t = useTranslations()

  const route = usePathname()
  const menuRoutes = Object.values(routes)
  const menuRoutesFiltered = menuRoutes.filter((item) => item.inHeader)

  const activePath = getActivePathInArray({
    path: route,
    array: menuRoutes.map((item) => item.link),
    withSlash: true,
  })

  const currentRoute = menuRoutesFiltered.find((item) => item.link === activePath)
  const currentKey = currentRoute?.key || routes.home.key

  const isHomePage = currentRoute?.key === routes.home.key || currentRoute === undefined
  const isAdminRoute = route.startsWith("/landlord")

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      initSquircle()
      await sleep(50)

      if (!cancelled) {
        setIsLoaded(true)
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [route, currentRoute, currentKey])

  const pageLoader = (key: string) => ({
    emoji: t(`common.shared.page-loader.${key}.emoji`),
    title: t(`common.shared.page-loader.${key}.title`),
    subtitle: t(`common.shared.page-loader.${key}.subtitle`),
  })

  const loader = pageLoader(currentKey)
  const showLoader = !isAdminRoute && asLoader && !isLoaded

  const content = isBadIOS ? (
    showLoader ? (
      <GenericLoadingPage title={loader.title} emoji={loader.emoji} subtitle={loader.subtitle} isPage={isHomePage} />
    ) : (
      children
    )
  ) : showLoader ? (
    <GenericLoadingPage title={loader.title} emoji={loader.emoji} subtitle={loader.subtitle} isPage={isHomePage} />
  ) : isAdminRoute ? (
    children
  ) : (
    <ReactLenis root>{children}</ReactLenis>
  )

  return (
    <LayoutContext.Provider value={{ isLoaded }}>
      <SpeedInsights />
      <AnalyticsScript />
      {/* {content} */}
      {isAdminRoute ? children : <ReactLenis root>{children}</ReactLenis>}
    </LayoutContext.Provider>
  )
}
