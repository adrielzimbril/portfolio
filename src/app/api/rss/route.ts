import { NextResponse } from 'next/server';
import { generateRssFeed } from '@/lib/rss';
import { Locale } from "@/types";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'rss2';
    const locale = searchParams.get("locale") || Locale.FR;
    
    const feed = await generateRssFeed({ locale: locale as Locale });
    
    let contentType = 'application/xml';
    let content = feed.rss2;
    
    if (format === 'atom') {
      contentType = 'application/atom+xml';
      content = feed.atom;
    } else if (format === 'json') {
      contentType = 'application/feed+json';
      return new NextResponse(feed.json, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
        },
      });
    }
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
      },
    });
  } catch (error) {
    console.error('Error generating feed:', error);
    return new NextResponse('Error generating feed', { status: 500 });
  }
}
