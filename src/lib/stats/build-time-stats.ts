import { getAllPosts } from "@/integrations/content/lib";
import type { BuildTimeStats, CategoryCount } from "./types";

function estimateWordCount(mdxCode: string): number {
  const stripped = mdxCode
    .replace(/<[^>]*>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return stripped.split(/\s+/).filter((word) => word.length > 0).length;
}

export async function getBuildTimeStats(): Promise<BuildTimeStats> {
  const posts = await getAllPosts({ published: true });

  const wordCounts = posts.map((post) => estimateWordCount(post.content));
  const totalWords = wordCounts.reduce((sum, count) => sum + count, 0);
  const avgWordsPerArticle =
    posts.length > 0 ? Math.round(totalWords / posts.length) : 0;

  const combinedReadingMinutes = Math.ceil(totalWords / 200);

  const categoryMap = new Map<string, number>();
  posts.forEach((post) => {
    post.categories.forEach((cat) => {
      categoryMap.set(cat.slug, (categoryMap.get(cat.slug) || 0) + 1);
    });
  });

  const categoryBreakdown: CategoryCount[] = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalArticles: posts.length,
    totalWords,
    combinedReadingMinutes,
    avgWordsPerArticle,
    changelogCount: 0, // TODO: Implement changelog counting when changelog is available
    categoryBreakdown,
  };
}
