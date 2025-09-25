import { getBaseUrl, getImageUrl, getResourcesUrl } from "@/utils/base-url";
import { localeRedirect } from "@i18n/routing";
import {
  getPostBySlug,
  getPostWithAdjacent,
} from "@/module/content/utils/lib/posts";
import { getLocale } from "next-intl/server";
import { HeaderSection } from "./sections/HeaderSection";
import { MorePreviewSection } from "./sections/MorePreviewSection";
import { ContentsSection } from "./sections/ContentSection";
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
      images: [
        getImageUrl("/opengraph-image"),
        getImageUrl(
          `/api/og?type=${PageType.THOUGHT}&slug=${slug}&title=${post?.title}`
        ),
        post?.cover ? getImageUrl(post?.cover ?? "") : "",
        getResourcesUrl(
          PageType.THOUGHT,
          `${slug}/opengraph-image?${new Date().getTime()}`
        ),
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: post?.title,
      description: post?.excerpt,
      images: [
        getImageUrl("/opengraph-image"),
        getImageUrl(
          `/api/og?type=${PageType.THOUGHT}&slug=${slug}&title=${post?.title}`
        ),
        post?.cover ? getImageUrl(post?.cover ?? "") : "",
        getResourcesUrl(
          PageType.THOUGHT,
          `${slug}/opengraph-image?${new Date().getTime()}`
        ),
      ],
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
      />
      <ContentsSection content={body} />
      <MorePreviewSection data={post.adjacentPosts} />
      <CallToAction isPage />
    </>
  );
}
