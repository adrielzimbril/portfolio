import { siteConfig } from "@/data/config";

export const SEO = {
  pages: {
    // Default configuration
    default: {
      title:
        "Weseemba | Banque d'Images Africaine Premium - Photos & Vidéos HD",
      description:
        "Découvrez des millions de photos et vidéos libres de droits de haute qualité. Des images professionnelles pour tous vos projets créatifs, marketing et commerciaux.",
    },

    // Home page
    home: {
      title: "Images, vidéos et musiques de stock",
      description:
        "Découvrez des millions de photos et vidéos libres de droits de haute qualité. Des images professionnelles pour tous vos projets créatifs, marketing et commerciaux.",
    },

    // Pages légales
    terms: {
      title: "Conditions d'Utilisation | Weseemba - Banque d'Images Africaine",
      description:
        "Consultez nos conditions d'utilisation pour l'utilisation de nos photos et vidéos libres de droits.",
    },

    privacy: {
      title:
        "Politique de Confidentialité | Weseemba - Banque d'Images Africaine",
      description:
        "Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée.",
    },

    // Pages d'erreur
    notFound: {
      title: "Page Non Trouvée | Weseemba - Banque d'Images Africaine",
      description:
        "La page que vous recherchez n'existe pas ou a été déplacée.",
    },
  },

  // Configuration OpenGraph
  openGraph: {
    type: "website",
    locale: "fr_FR",
    site_name: siteConfig.details.nameShared,
  },

  // Configuration Twitter
  twitter: {
    handle: "@weseemba",
    site: "@weseemba",
    cardType: "summary_large_image",
  },
};
