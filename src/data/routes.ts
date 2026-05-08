export type RouteType = {
  key: string;
  link: string;
  inHeader: boolean;
  inFooter: boolean;
  inSitemap: boolean;
};

type RouteKeys = "home" | "shop";

export const routes: { [K in RouteKeys]: RouteType } = {
  home: {
    key: "home",
    link: "/",
    inHeader: true,
    inFooter: false,
    inSitemap: true,
  },
  shop: {
    key: "shop",
    link: "/shop",
    inHeader: true,
    inFooter: false,
    inSitemap: true,
  },
};
