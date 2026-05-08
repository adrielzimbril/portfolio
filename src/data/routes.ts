export type RouteType = {
  key: string;
  link: string;
  inHeader: boolean;
  inFooter: boolean;
  inSitemap: boolean;
};

type RouteKeys =
  | "home"
  | "about"
  | "hub"
  | "hubGet"
  | "projects"
  | "talks"
  | "quests"
  | "submit"
  | "thoughts"
  | "contact"
  | "newsletter"
  | "rss"
  | "rssAtom"
  | "rssJson"
  | "icon"
  | "openGraphImage"
  | "openGraphResource"
  | "avatar"
  | "avatarReal"
  | "community"
  | "stats"
  | "toolbox"
  | "connections"
  | "changelog"
  | "privacy"
  | "terms"
  | "routes"
  | "shop";

export const routes: { [K in RouteKeys]: RouteType } = {
  home: {
    key: "home",
    link: "/",
    inHeader: true,
    inFooter: false,
    inSitemap: true,
  },
  about: {
    key: "about",
    link: "/about",
    inHeader: true,
    inFooter: false,
    inSitemap: true,
  },
  hub: {
    key: "hub",
    link: "/hub",
    inHeader: true,
    inFooter: false,
    inSitemap: true,
  },
  hubGet: {
    key: "hub-get",
    link: "/hub/get",
    inHeader: false,
    inFooter: false,
    inSitemap: false,
  },
  // playground: {
  //   name: "Playground",
  //   key: "playground",
  //   link: "/playground",
  //   inHeader: true,
  // },
  projects: {
    key: "projects",
    link: "/projects",
    inHeader: true,
    inFooter: false,
    inSitemap: true,
  },
  talks: {
    key: "talks",
    link: "/talks",
    inHeader: false,
    inFooter: true,
    inSitemap: true,
  },
  quests: {
    key: "quests",
    link: "/quests",
    inHeader: true,
    inFooter: false,
    inSitemap: true,
  },
  submit: {
    key: "submit",
    link: "/submit",
    inHeader: false,
    inFooter: false,
    inSitemap: false,
  },
  thoughts: {
    key: "thoughts",
    link: "/thoughts",
    inHeader: true,
    inFooter: false,
    inSitemap: true,
  },
  contact: {
    key: "contact",
    link: "/contact",
    inHeader: false,
    inFooter: false,
    inSitemap: true,
  },
  newsletter: {
    key: "newsletter",
    link: "/newsletter",
    inHeader: false,
    inFooter: false,
    inSitemap: true,
  },
  rss: {
    key: "rss",
    link: "/rss/rss",
    inHeader: false,
    inFooter: false,
    inSitemap: true,
  },
  rssAtom: {
    key: "rss-atom",
    link: "/rss/atom",
    inHeader: false,
    inFooter: false,
    inSitemap: true,
  },
  rssJson: {
    key: "rss-json",
    link: "/rss/json",
    inHeader: false,
    inFooter: false,
    inSitemap: true,
  },
  icon: {
    key: "icon",
    link: "/icon",
    inHeader: false,
    inFooter: false,
    inSitemap: false,
  },
  openGraphImage: {
    key: "open-graph-image",
    link: "/open-graph-image",
    inHeader: false,
    inFooter: false,
    inSitemap: false,
  },
  openGraphResource: {
    key: "open-graph-resource",
    link: "opengraph-image.png",
    inHeader: false,
    inFooter: false,
    inSitemap: false,
  },
  avatar: {
    key: "avatar",
    link: "/img/me/avatar.png",
    inHeader: false,
    inFooter: false,
    inSitemap: false,
  },
  avatarReal: {
    key: "avatar-real",
    link: "/img/me/avatar-real.png",
    inHeader: false,
    inFooter: false,
    inSitemap: false,
  },
  community: {
    key: "community",
    link: "/community",
    inHeader: false,
    inFooter: true,
    inSitemap: true,
  },
  stats: {
    key: "stats",
    link: "/stats",
    inHeader: false,
    inFooter: true,
    inSitemap: true,
  },
  toolbox: {
    key: "toolbox",
    link: "/toolbox",
    inHeader: false,
    inFooter: true,
    inSitemap: true,
  },
  connections: {
    key: "connections",
    link: "/connections",
    inHeader: false,
    inFooter: true,
    inSitemap: true,
  },
  changelog: {
    key: "changelog",
    link: "/changelog",
    inHeader: false,
    inFooter: false,
    inSitemap: true,
  },
  privacy: {
    key: "privacy",
    link: "/legal/privacy",
    inHeader: false,
    inFooter: false,
    inSitemap: true,
  },
  terms: {
    key: "terms",
    link: "/legal/terms",
    inHeader: false,
    inFooter: false,
    inSitemap: true,
  },
  routes: {
    key: "routes",
    link: "/routes",
    inHeader: false,
    inFooter: true,
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
