import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.
import { PageType } from "@/types";
import {
  getPostBySlug,
  getResourceBySlug,
  getProjectBySlug,
} from "@/module/content/utils/lib";
import { getLocale } from "next-intl/server";

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
          break;
        case PageType.HUB:
          data = await getResourceBySlug(slug, { locale });
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

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-indigo-100">
          <div tw="bg-orange-50 flex h-full w-full">
            <div tw="flex flex-col w-full text-center py-12 px-4 md:items-center justify-between h-full w-full p-8">
              <div tw="flex relative flex-col gap-12 md:gap-16 min-h-60 items-start justify-between px-6 py-8 md:px-8 md:py-8">
                <div tw="flex flex-col items-start gap-2 w-full max-w-[90%] mx-auto">
                  <h1 tw="text-4xl sm:text-5xl tracking-wide">{data?.title}</h1>

                  <p tw="text-b-white-invert-thr leading-[120%]">
                    {data?.excerpt}
                  </p>
                  <p tw="text-b-white-invert-thr leading-[120%]">{locale}</p>
                </div>
              </div>
              <h2 tw="flex flex-col text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 text-left">
                <span>{data?.title}</span>
                <span tw="text-indigo-600">
                  {type === "page" ? "Start your free trial today." : ""}
                </span>
              </h2>
              <div tw="text-3xl">👋 😄 🎉 🎄 🦋</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        debug: true,
        emoji: "fluent",
        status: 200,
      }
    );
  } catch (e: unknown) {
    console.log(`${(e as Error)?.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
