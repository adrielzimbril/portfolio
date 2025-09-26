import { NextResponse } from 'next/server';
import { generateRssFeed } from '@/lib/rss';
import { Locale } from "@/types";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || Locale.FR;
    const feed = await generateRssFeed({ locale: locale as Locale });

    return new NextResponse(feed.atom, {
      status: 200,
      headers: {
        "Content-Type": "application/atom+xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    console.error("Error generating Atom feed:", error);
    return new NextResponse("Error generating Atom feed", { status: 500 });
  }
}
