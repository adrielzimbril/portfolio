import { NextRequest } from 'next/server';
import { IPData } from '@/lib/ip-lookup';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ip = searchParams.get('ip') || '';
  
  try {
    const response = await fetch(`https://api.oricodes.com/ip/${ip}`);
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch IP data' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const data: IPData = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('IP lookup error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
