import { getAbsolutePathUrl } from "@/utils/base-url";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/config";
import logger from "@/utils/logger";
import { LogoIcon } from "@/components/shared/icons/logo/logo-icon";

interface Props {
  title?: string;
  alt?: string;
  description?: string;
  params?: {
    locale?: string;
  };
}
export const contentType = "image/png";

export const size = {
  width: 1200,
  height: 630,
};

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]!);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export default async function OpenGraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title, alt, description, params } = props || {};
  const { locale } = params || {};
  const fontFormated = {
    title: title || alt || "",
    alt: alt || title || "",
    description: description || alt || title || "",
  };
  const fonts = [
    {
      name: "Hanken+Grotesk",
      data: await loadGoogleFont("Hanken+Grotesk", fontFormated.title),
    },
    {
      name: "Bricolage+Grotesque",
      data: await loadGoogleFont("Bricolage+Grotesque", fontFormated.alt),
    },
  ];
  try {
    return new ImageResponse(
      (
        <div tw="flex flex-col p-8 h-full w-full bg-white items-center justify-center">
          <div tw="flex flex-col gap-4 py-4 px-16 h-full w-full bg-white items-center justify-center border-8 border-stone-200 rounded-3xl">
            <div tw="flex flex-none items-center justify-center border-4 border-stone-200 rounded-2xl h-[250px] w-[50%] overflow-hidden mb-4">
              <img
                src={getAbsolutePathUrl({
                  type: "s3",
                  path: "/agent-template-og.png",
                })}
                alt={title || alt}
                tw="h-full w-full object-contain"
              />
            </div>
            <div
              tw="flex flex-none justify-center items-center rounded-xl bg-stone-200 mb-4"
              //style={{ transform: "scale(1.5)" }}
            >
              <LogoIcon
                tw="flex-shrink-0"
                style={{ transform: "scale(1.5)" }}
              />
            </div>
            <div tw="flex flex-col gap-2 flex-none items-center justify-center text-center max-w-[100%]">
              {title && (
                <p tw="text-6xl font-bold text-black">{fontFormated.title}</p>
              )}
              {(description || alt) && (
                <p tw="text-2xl font-normal text-black/80">
                  {fontFormated.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ),
      { ...size, fonts }
    );
  } catch (error) {
    logger.error("Error generating OpenGraph image:", error);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
