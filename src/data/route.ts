interface NavItem {
  name: string;
  link: string;
}

export const routes: Record<string, NavItem> = {
  home: {
    name: "Acceuil",
    link: "/",
  },
  about: {
    name: "A propos",
    link: "/about",
  },
  hub: {
    name: "Hub",
    link: "/hub",
  },
  projects: {
    name: "Projets",
    link: "/projects",
  },
  blog: {
    name: "Blog",
    link: "/blog",
  },
  contact: {
    name: "Contact",
    link: "/contact",
  },
};
