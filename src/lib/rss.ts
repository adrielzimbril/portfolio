import {
  getAllPosts,
  getAllProjects,
  getAllResources,
} from "@/module/content/utils/lib";
import { PageType } from "@/types";
import { getResourcesUrl } from "@/utils";
import { siteConfig } from "@/data/config";

const SITE_URL = siteConfig.url;
const AUTHOR = siteConfig.details.name;
const DESCRIPTION = siteConfig.description;

function escapeCdata(s: string): string {
  return s.replace(/[&<>']/g, (m) => {
    switch (m) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "'":
        return "&apos;";
      default:
        return m;
    }
  });
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function generateRssFeed() {
  const [posts, projects, resources] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
    getAllResources(),
  ]);

  // Sort all items by date of publication
  const allItems = [
    ...posts.map((post) => ({
      ...post,
      type: PageType.THOUGHT,
      date: new Date(post.updated_at || post.created_at),
    })),
    ...projects.map((project) => ({
      ...project,
      type: PageType.PROJECT,
      date: new Date(project.updated_at || project.created_at),
    })),
    ...resources.map((resource) => ({
      ...resource,
      type: PageType.HUB,
      date: new Date(resource.updated_at || resource.created_at),
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const items = allItems
    .map((item) => {
      const url = getResourcesUrl(item.type, item.slug);

      const content = item.excerpt || "";

      return `
      <item>
        <title><![CDATA[${escapeCdata(item.title)}]]></title>
        <link>${escapeHtml(url)}</link>
        <guid isPermaLink="true">${escapeHtml(url)}</guid>
        <pubDate>${item.date.toUTCString()}</pubDate>
        <description><![CDATA[${escapeCdata(content)}]]></description>
        <content:encoded><![CDATA[${escapeCdata(content)}]]></content:encoded>
        <category>${item.type}</category>
      </item>
    `;
    })
    .join("");

  const pubDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:content="http://purl.org/rss/1.0/modules/content/"
      xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title><![CDATA[${escapeCdata(AUTHOR)}]]></title>
        <link>${escapeHtml(SITE_URL)}</link>
        <description><![CDATA[${escapeCdata(DESCRIPTION)}]]></description>
        <language>fr</language>
        <lastBuildDate>${pubDate}</lastBuildDate>
        <atom:link href="${escapeHtml(SITE_URL)}/rss.xml" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>
  `;
}
