import type { BuildTimeStats, CategoryCount } from "./types";
import { getAllPosts } from "@/integrations/content/lib";
import { Locale } from "@/types";
import { allPostCategories } from "content-collections";

// Fonction pour calculer les statistiques au build time
// Basée sur le contenu local des posts
export async function getBuildTimeStats(): Promise<BuildTimeStats> {
  const posts = await getAllPosts({ published: true, locale: Locale.EN });

  // Calculer le nombre total de mots à partir du body MDX
  const totalWords = posts.reduce((sum, post) => {
    // Extraire le texte du body MDX compilé
    const textContent = stripHtmlTags(post.body || "");
    const wordCount = textContent
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return sum + wordCount;
  }, 0);

  const totalReadingTime = Math.ceil(totalWords / 200); // 200 mots par minute
  const totalPosts = posts.length;

  // Calculer les catégories
  const categoryMap = new Map<string, number>();
  posts.forEach((post) => {
    post.categories.forEach((category) => {
      const categoryName = category.name;
      categoryMap.set(categoryName, (categoryMap.get(categoryName) || 0) + 1);
    });
  });

  const categories: CategoryCount[] = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalWords,
    totalReadingTime,
    totalPosts,
    categories,
  };
}

// Fonction utilitaire pour extraire le texte du body MDX
function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ") // Supprimer les balises HTML
    .replace(/&nbsp;/g, " ") // Remplacer les espaces insécables
    .replace(/&amp;/g, "&") // Remplacer les entités HTML
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ") // Normaliser les espaces
    .trim();
}
