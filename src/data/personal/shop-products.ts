export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  primaryTag: string;
  tags: string[];
  featured?: boolean;
  available: boolean;
  createdAt: string;
}

export const shopProducts: Product[] = [
  {
    id: "1",
    title: "ChatGPT Plus",
    description:
      "Abonnement ChatGPT Plus avec accès à GPT-4, réponses plus rapides et accès prioritaire aux nouvelles fonctionnalités. Économisez 40% sur le prix officiel.",
    image: "/img/shop/chatgpt.jpg",
    price: 12000,
    currency: "F.CFA",
    primaryTag: "IA",
    tags: ["ChatGPT", "GPT-4", "IA"],
    featured: true,
    available: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Gemini Pro",
    description:
      "Abonnement Gemini Pro de Google avec accès à l'IA multimodale avancée. Capacités de reasoning et de génération supérieures. Économisez 35%.",
    image: "/img/shop/gemini.jpg",
    price: 15000,
    currency: "F.CFA",
    primaryTag: "IA",
    tags: ["Gemini", "Google", "IA"],
    featured: true,
    available: true,
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    title: "Claude Pro",
    description:
      "Abonnement Claude Pro d'Anthropic avec accès à Claude 3 Opus. IA de nouvelle génération avec capacités de reasoning exceptionnelles. Économisez 45%.",
    image: "/img/shop/claude.jpg",
    price: 18000,
    currency: "F.CFA",
    primaryTag: "IA",
    tags: ["Claude", "Anthropic", "IA"],
    featured: true,
    available: true,
    createdAt: "2024-02-15",
  },
  {
    id: "4",
    title: "CapCut Pro",
    description:
      "Abonnement CapCut Pro pour l'édition vidéo. Effets premium, sans watermark, export HD illimité. Économisez 50% sur le prix officiel.",
    image: "/img/shop/capcut.jpg",
    price: 8000,
    currency: "F.CFA",
    primaryTag: "Vidéo",
    tags: ["CapCut", "Édition", "Mobile"],
    featured: false,
    available: true,
    createdAt: "2024-03-01",
  },
  {
    id: "5",
    title: "Figma Professional",
    description:
      "Abonnement Figma Professional pour le design collaboratif. Projets illimités, historique des versions, export haute résolution. Économisez 40%.",
    image: "/img/shop/figma.jpg",
    price: 25000,
    currency: "F.CFA",
    primaryTag: "Design",
    tags: ["Figma", "Design", "Collaboratif"],
    featured: true,
    available: true,
    createdAt: "2024-03-15",
  },
  {
    id: "6",
    title: "Canva Pro",
    description:
      "Abonnement Canva Pro pour la création graphique. Templates premium, Brand Kit, suppression du fond, millions de ressources. Économisez 45%.",
    image: "/img/shop/canva.jpg",
    price: 10000,
    currency: "F.CFA",
    primaryTag: "Design",
    tags: ["Canva", "Graphisme", "Templates"],
    featured: false,
    available: true,
    createdAt: "2024-04-01",
  },
  {
    id: "7",
    title: "Midjourney",
    description:
      "Abonnement Midjourney pour la génération d'images par IA. Créations artistiques de haute qualité, accès rapide, mode relax. Économisez 30%.",
    image: "/img/shop/midjourney.jpg",
    price: 20000,
    currency: "F.CFA",
    primaryTag: "IA",
    tags: ["Midjourney", "IA", "Images"],
    featured: true,
    available: true,
    createdAt: "2024-04-15",
  },
  {
    id: "8",
    title: "Notion Plus",
    description:
      "Abonnement Notion Plus pour la productivité. Uploads illimités, version history, collaboration avancée. Économisez 40%.",
    image: "/img/shop/notion.jpg",
    price: 12000,
    currency: "F.CFA",
    primaryTag: "Productivité",
    tags: ["Notion", "Productivité", "Organisation"],
    featured: false,
    available: true,
    createdAt: "2024-05-01",
  },
  {
    id: "9",
    title: "Adobe Creative Cloud",
    description:
      "Abonnement Adobe Creative Cloud complet. Photoshop, Illustrator, Premiere Pro, et plus de 20 applications. Économisez 35%.",
    image: "/img/shop/adobe.jpg",
    price: 45000,
    currency: "F.CFA",
    primaryTag: "Créatif",
    tags: ["Adobe", "Photoshop", "Illustrator"],
    featured: true,
    available: true,
    createdAt: "2024-05-15",
  },
  {
    id: "10",
    title: "Spotify Premium",
    description:
      "Abonnement Spotify Premium pour la musique. Écoute sans publicité, téléchargement hors ligne, haute qualité audio. Économisez 50%.",
    image: "/img/shop/spotify.jpg",
    price: 5000,
    currency: "F.CFA",
    primaryTag: "Musique",
    tags: ["Spotify", "Musique", "Streaming"],
    featured: false,
    available: true,
    createdAt: "2024-06-01",
  },
  {
    id: "11",
    title: "YouTube Premium",
    description:
      "Abonnement YouTube Premium pour les vidéos. Sans publicité, lecture en arrière-plan, YouTube Music inclus. Économisez 45%.",
    image: "/img/shop/youtube.jpg",
    price: 6000,
    currency: "F.CFA",
    primaryTag: "Vidéo",
    tags: ["YouTube", "Streaming", "Vidéo"],
    featured: false,
    available: true,
    createdAt: "2024-06-15",
  },
  {
    id: "12",
    title: "Netflix Premium",
    description:
      "Abonnement Netflix Premium pour les films et séries. 4K Ultra HD, 4 écrans simultanés, téléchargement illimité. Économisez 40%.",
    image: "/img/shop/netflix.jpg",
    price: 8000,
    currency: "F.CFA",
    primaryTag: "Streaming",
    tags: ["Netflix", "Films", "Séries"],
    featured: true,
    available: true,
    createdAt: "2024-07-01",
  },
  {
    id: "13",
    title: "Microsoft 365",
    description:
      "Abonnement Microsoft 365 pour la bureautique. Word, Excel, PowerPoint, Outlook, 1TB OneDrive. Économisez 35%.",
    image: "/img/shop/microsoft.jpg",
    price: 15000,
    currency: "F.CFA",
    primaryTag: "Bureautique",
    tags: ["Microsoft", "Office", "Cloud"],
    featured: false,
    available: true,
    createdAt: "2024-07-15",
  },
  {
    id: "14",
    title: "GitHub Copilot",
    description:
      "Abonnement GitHub Copilot pour les développeurs. IA pour le code, autocomplétion intelligente, support multi-langages. Économisez 40%.",
    image: "/img/shop/github.jpg",
    price: 12000,
    currency: "F.CFA",
    primaryTag: "Développement",
    tags: ["GitHub", "IA", "Code"],
    featured: false,
    available: true,
    createdAt: "2024-08-01",
  },
  {
    id: "15",
    title: "DALL-E Plus",
    description:
      "Abonnement DALL-E Plus pour la génération d'images. Créations haute qualité, rapidité, accès prioritaire. Économisez 35%.",
    image: "/img/shop/dalle.jpg",
    price: 15000,
    currency: "F.CFA",
    primaryTag: "IA",
    tags: ["DALL-E", "OpenAI", "Images"],
    featured: false,
    available: true,
    createdAt: "2024-08-15",
  },
];
