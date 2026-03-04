import { Feed } from "feed";
import {
  getAllPosts,
  getAllProjects,
  getAllQuests,
  getAllResources,
  getAllTalks,
} from "@/module/content/utils/lib";
import { Locale, PageType } from "@/types";
import {
  getAbsolutePathUrl,
  getImageUrl,
  getPathUrl,
  getResourcesUrl,
} from "@/utils";
import { siteConfig } from "@/data/config";
import { routes } from "@/data/routes";
import { getTranslations } from "next-intl/server";

/**
 * Normalize locale to be used in getTranslations
 *
 * @param locale
 * @returns
 *
 * @example
 * normalizeLocale("en") -> "en"
 * normalizeLocale("zh-cn") -> "zh-CN"
 */
function normalizeLocale(locale: string): string {
  const parts = locale.split("-");
  if (parts.length === 1) {
    // ex: "en"
    return parts[0] || "";
  }
  // ex: "zh-cn" -> "zh-CN"
  return `${parts[0]}-${parts[1]!.toUpperCase()}`;
}

export async function generateRssFeed({ locale }: { locale: Locale }) {
  const localeForTranslation = normalizeLocale(locale);

  const t = await getTranslations({ locale: localeForTranslation });
  const [posts, projects, resources, talks, quests] = await Promise.all([
    getAllPosts({ locale: localeForTranslation }),
    getAllProjects({ locale: localeForTranslation }),
    getAllResources({ locale: localeForTranslation }),
    getAllTalks({ locale: localeForTranslation }),
    getAllQuests({ locale: localeForTranslation }),
  ]);

  const feed = new Feed({
    title: siteConfig.details.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: localeForTranslation,
    image: getImageUrl("opengraph-image.png"),
    favicon: getAbsolutePathUrl({ type: "s3", path: "icon.svg" }),
    hub: getPathUrl(routes.hub.link),
    copyright: t("common.rss.copyright", {
      date: new Date().getFullYear(),
      siteName: siteConfig.details.name,
    }),
    updated: new Date(),
    feedLinks: {
      rss2: getPathUrl(routes.rss.link),
      json: getPathUrl(routes.rssJson.link),
      atom: getPathUrl(routes.rssAtom.link),
    },
    author: {
      name: siteConfig.details.name,
      email: siteConfig.links.contact.email,
      link: siteConfig.url,
      avatar: siteConfig.details.avatar,
    },
  });

  // Add posts
  posts.forEach((post) => {
    const url = getResourcesUrl(PageType.THOUGHT, post.slug);
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      image: getImageUrl(post.cover || routes.openGraphResource.link),
      description: post.excerpt || "",
      content: post.excerpt || "",
      date: new Date(post.updated_at || post.created_at),
      author: [
        {
          name: siteConfig.details.name,
          email: siteConfig.links.contact.email,
          link: siteConfig.url,
          avatar: siteConfig.details.avatar,
        },
      ],
      category: [
        {
          name: "Thought",
          domain: getPathUrl(routes.thoughts.link),
        },
      ],
    });
  });

  // Add projects
  projects.forEach((project) => {
    const url = getResourcesUrl(PageType.PROJECT, project.slug);
    feed.addItem({
      title: project.title,
      id: url,
      link: url,
      image: getImageUrl(
        project.image_thumbnail || routes.openGraphResource.link,
      ),
      description: project.excerpt || "",
      content: project.excerpt || "",
      date: new Date(project.updated_at || project.created_at),
      author: [
        {
          name: siteConfig.details.name,
          email: siteConfig.links.contact.email,
          link: siteConfig.url,
          avatar: siteConfig.details.avatar,
        },
      ],
      category: [
        {
          name: "Project",
          domain: getPathUrl(routes.projects.link),
        },
      ],
    });
  });

  // Add resources
  resources.forEach((resource) => {
    const url = getResourcesUrl(PageType.HUB, resource.slug);
    feed.addItem({
      title: resource.title,
      id: url,
      link: url,
      image: getImageUrl(resource.cover || routes.openGraphResource.link),
      description: resource.excerpt || "",
      content: resource.excerpt || "",
      date: new Date(resource.updated_at || resource.created_at),
      author: [
        {
          name: siteConfig.details.name,
          email: siteConfig.links.contact.email,
          link: siteConfig.url,
          avatar: siteConfig.details.avatar,
        },
      ],
      category: [
        {
          name: "Resource",
          domain: getPathUrl(routes.hub.link),
        },
      ],
    });
  });

  // Add talks
  talks.forEach((talk) => {
    const url = getResourcesUrl(PageType.TALKS);
    feed.addItem({
      title: talk.title,
      id: url,
      link: url,
      image: getImageUrl(talk.cover || routes.openGraphResource.link),
      description: talk.excerpt || "",
      content: talk.excerpt || "",
      date: new Date(talk.event_date),
      author: [
        {
          name: siteConfig.details.name,
          email: siteConfig.links.contact.email,
          link: siteConfig.url,
          avatar: siteConfig.details.avatar,
        },
      ],
      category: [
        {
          name: "Talk",
          domain: getPathUrl(routes.talks.link),
        },
      ],
    });
  });

  // Add quests
  quests.forEach((quest) => {
    const url = getResourcesUrl(PageType.QUESTS, quest.slug);
    feed.addItem({
      title: quest.title,
      id: url,
      link: url,
      image: getImageUrl(quest.cover || routes.openGraphResource.link),
      description: quest.excerpt || "",
      content: quest.excerpt || "",
      date: new Date(quest.updated_at || quest.created_at),
      author: [
        {
          name: siteConfig.details.name,
          email: siteConfig.links.contact.email,
          link: siteConfig.url,
          avatar: siteConfig.details.avatar,
        },
      ],
      category: [
        {
          name: "Quest",
          domain: getPathUrl(routes.quests.link),
        },
      ],
    });
  });

  // Generate the feed in both RSS 2.0 and Atom 1.0 formats
  return {
    rss2: feed.rss2(),
    atom: feed.atom1(),
    json: feed.json1(),
  };
}
