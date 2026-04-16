import { getBaseUrl, getImageUrl, getResourcesUrl } from "@/utils/base-url";
import { localeRedirect } from "@/integrations/i18n/routing";
import { getPostBySlug, getPostWithAdjacent } from "@/integrations/content/lib";
import { getLocale } from "next-intl/server";
import { HeaderSection } from "@/app/(base)/thoughts/[slug]/sections/HeaderSection";
import { MorePreviewSection } from "@/app/(base)/thoughts/[slug]/sections/MorePreviewSection";
import { ContentsSection } from "@/app/(base)/thoughts/[slug]/sections/ContentSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { routes } from "@/data/routes";
import { calculateReadingTime, formatTime } from "@/hooks/useReadingTime";
import { PageParams, PageType } from "@/types";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  const locale = await getLocale();
  const post = await getPostBySlug(slug, { locale });

  const metadata: Metadata = {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      ...baseMetadata.openGraph,
      title: post?.title,
      description: post?.excerpt,
      images: [getImageUrl("opengraph-image.png")],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: post?.title,
      description: post?.excerpt,
      images: [getImageUrl("opengraph-image.png")],
    },
  };

  return metadata;
}

export default async function BlogPostPage(props: {
  params: Promise<PageParams>;
}) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const post = await getPostWithAdjacent(slug, { locale });

  if (!post) {
    return localeRedirect({ href: routes.thoughts.link, locale });
  }

  const { title, created_at, tags, cover, body } = post.currentPost;
  const { minutes, seconds, totalSeconds } = calculateReadingTime({
    content: body,
  }) || {
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  };
  const formattedReadingTime = formatTime({ minutes, seconds, totalSeconds });

  return (
    <>
      <HeaderSection
        title={title}
        cover={cover || ""}
        tags={tags}
        date={created_at}
        readingTime={formattedReadingTime}
        pageViewsData={{ slug, locale }}
        slug={slug}
      />
      <ContentsSection content={body} />
      <MorePreviewSection data={post.adjacentPosts} />
      <CallToAction isPage />
    </>
  );
}
