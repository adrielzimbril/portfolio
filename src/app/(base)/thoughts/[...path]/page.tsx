import { getBaseUrl } from "@/utils/base-url";
import { LocaleLink, localeRedirect } from "@i18n/routing";
import { getPostBySlug } from "@/module/content/utils/lib/posts";
import { getActivePathFromUrlParam } from "@/utils/content";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { HeaderSection } from "./sections/HeaderSection";
import { MorePreviewSection } from "./sections/MorePreviewSection";
import { ContentsSection } from "./sections/ContentSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { routes } from "@/data/route";
import { calculateReadingTime, formatTime } from "@/hooks/useReadingTime";

type Params = {
  path: string;
  locale: string;
};

export async function generateMetadata(props: { params: Promise<Params> }) {
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
        ? [
            post.cover.startsWith("http")
              ? post.cover
              : new URL(post.cover, getBaseUrl()).toString(),
          ]
        : [],
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const { path, locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const slug = getActivePathFromUrlParam(path);
  const post = await getPostBySlug(slug, { locale });

  if (!post) {
    return localeRedirect({ href: routes.thoughts.link, locale });
  }

  const { title, created_at, tags, cover, body } = post;
  const { minutes, seconds, totalSeconds } = calculateReadingTime({
    content: body,
  }) || {
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  };
  const formattedReadingTime = formatTime(
    { minutes, seconds, totalSeconds },
    "minutes"
  );

  return (
    <>
      <HeaderSection
        title={title}
        cover={cover || ""}
        tags={tags}
        date={created_at}
        readingTime={formattedReadingTime}
        views={0}
      />
      <ContentsSection content={body} />
      <MorePreviewSection pageSlug={slug} />
      <CallToAction isPage />
    </>
  );
}
