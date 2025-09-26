import { NextResponse } from 'next/server';
import { generateRssFeed } from '@/lib/rss';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const feed = await generateRssFeed();
    
    return new NextResponse(feed.json, {
      status: 200,
      headers: {
        'Content-Type': 'application/feed+json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
      },
    });
  } catch (error) {
    console.error('Error generating JSON feed:', error);
    return new NextResponse('Error generating JSON feed', { status: 500 });
  }
}
