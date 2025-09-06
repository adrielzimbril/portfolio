import { getBaseUrl, getImageUrl, getResourcesUrl } from "@/utils/base-url";
import { localeRedirect } from "@i18n/routing";
import {
  getPostBySlug,
  getPostWithAdjacent,
} from "@/module/content/utils/lib/posts";
import { getActivePathFromUrlParam } from "@/utils/content";
import { getLocale, setRequestLocale } from "next-intl/server";
import { HeaderSection } from "./sections/HeaderSection";
import { MorePreviewSection } from "./sections/MorePreviewSection";
import { ContentsSection } from "./sections/ContentSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { routes } from "@/data/route";
import { calculateReadingTime, formatTime } from "@/hooks/useReadingTime";
import { siteConfig } from "@/data/config";
import { PageParams, PageType } from "@/types";

export async function generateMetadata(props: { params: Promise<PageParams> }) {
  const params = await props.params;

  const { path } = params;

  const locale = await getLocale();
  const slug = getActivePathFromUrlParam(path);
  const post = await getPostBySlug(slug, { locale });

  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      images: post?.cover
        ? [getImageUrl(post.cover)]
        : [`${getBaseUrl()}/og?title=${encodeURIComponent(post?.title ?? "")}`],
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<PageParams>;
}) {
  const { path, locale } = await props.params;
  setRequestLocale(locale);

  const slug = getActivePathFromUrlParam(path);
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
  const viewPath = `/${locale}/thoughts/${slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.currentPost.title,
            datePublished: post.currentPost.created_at,
            dateModified:
              post.currentPost.updated_at || post.currentPost.created_at,
            description: post.currentPost.excerpt,
            image: post.currentPost.cover
              ? `${getImageUrl(post.currentPost.cover)}`
              : `${getBaseUrl()}/og?title=${encodeURIComponent(
                  post.currentPost.title
                )}`,
            url: `${getResourcesUrl("thoughts", post.currentPost.slug)}`,
            author: {
              "@type": "Person",
              name: siteConfig.details.nameShared,
              url: siteConfig.url,
              sameAs: [siteConfig.links.twitter],
            },
          }),
        }}
      />
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
