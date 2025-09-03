interface NavItem {
  name: string;
  link: string;
  inHeader?: boolean;
}

export const routes: Record<string, NavItem> = {
  home: {
    name: "Acceuil",
    link: "/",
    inHeader: true,
  },
  about: {
    name: "A propos",
    link: "/about",
    inHeader: true,
  },
  hub: {
    name: "Hub",
    link: "/hub",
    inHeader: true,
  },
  hubSub: {
    name: "Hub Sub",
    link: "/hub/SubShop",
    inHeader: false,
  },
  projects: {
    name: "Projets",
    link: "/projects",
    inHeader: true,
  },
  projectSub: {
    name: "Projet Sub",
    link: "/projects/SubProject",
    inHeader: false,
  },
  thoughts: {
    name: "Réflexions",
    link: "/thoughts",
    inHeader: true,
  },
  thoughtSub: {
    name: "Réflexion Sub",
    link: "/thoughts/SubThought",
    inHeader: false,
  },
  contact: {
    name: "Contact",
    link: "/contact",
    inHeader: false,
  },
};
