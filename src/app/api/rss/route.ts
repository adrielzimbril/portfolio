import { NextResponse } from 'next/server';
import { generateRssFeed } from '@/lib/rss';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const feed = await generateRssFeed();
    
    return new NextResponse(feed, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
