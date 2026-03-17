import { routes } from "@/data/routes";
import { SectionLayout } from "@/components/shared/sections/layout";
import { PreviewCardContainerSectionProps } from "@/types/type";
import { getAllPosts } from "@/module/content/utils/lib/posts";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { getLocale, getTranslations } from "next-intl/server";

const config: PreviewCardContainerSectionProps = {
  limit: 2,
};

export async function ThoughtsSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const { limit } = config;
  const posts = await getAllPosts({ limit, locale });

  return (
    <SectionLayout
      title={t("common.page-sections.thoughts.title")}
      description={t("common.page-sections.thoughts.description")}
      link={routes.thoughts.link}
      badge={t("common.page-sections.thoughts.badge")}
    >
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <ThoughtCard
              title={post.title}
              cover={post.cover}
              slug={post.slug}
              excerpt={post.excerpt || ""}
              tags={post.tags}
            />
          </div>
        );
      })}
    </SectionLayout>
  );
}
