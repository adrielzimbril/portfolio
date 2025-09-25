import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.
import { PageType } from "@/types";
import {
  getPostBySlug,
  getResourceBySlug,
  getProjectBySlug,
  getAllPosts,
} from "@/module/content/utils/lib";
import { getLocale } from "next-intl/server";
import { getPathUrl } from "@/utils";
import OpenGraphImage from "@/components/shared/_layouts/opengraph-image";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // url?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";
    // url?description=<description>
    const hasDescription = searchParams.has("description");
    const excerpt = hasDescription
      ? searchParams.get("description")?.slice(0, 100)
      : "My default description";
    // url?type=<type>
    const hasType = searchParams.has("type");
    const type = hasType ? searchParams.get("type") : "page";
    const hasSlug = searchParams.has("slug");
    const slug = hasSlug ? searchParams.get("slug") : "";

    let data;
    const locale = await getLocale();

    if (hasSlug && slug && hasType && type) {
      switch (type) {
        case PageType.PROJECT:
          data = await getProjectBySlug(slug, { locale });
          console.log(`type: ${PageType.PROJECT} | ${type}`);
          break;
        case PageType.HUB:
          data = await getResourceBySlug(slug, { locale });
          console.log(`type: ${PageType.HUB} | ${type}`);
          break;
        case PageType.THOUGHT:
          data = await getPostBySlug(slug, { locale });
          break;
        default:
          data = {
            title,
            excerpt,
            type,
            slug,
          };
          break;
      }
    }

    if (!data) {
      return new ImageResponse(
        (
          <div tw="flex flex-col w-full h-full items-center justify-center bg-indigo-100">
            <img
              src={getPathUrl("/opengraph-image")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    return await OpenGraphImage({
      title: data?.title,
      alt: data?.title,
      description: data?.excerpt,
      withCover: false,
    });
  } catch (e: unknown) {
    console.log(`${(e as Error)?.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
