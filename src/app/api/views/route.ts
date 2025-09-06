import { NextRequest } from 'next/server'
import { supabase } from '@/module/supabase/supabase'

// API: GET ?path=/some/path -> returns { count }
//      POST { path } -> increments and returns { count }
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path') || '/'

  const { data, error } = await supabase
    .from('page_views')
    .select('count')
    .eq('path', path)
    .maybeSingle()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  const count = data?.count ?? 0
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(req: NextRequest) {
  const { path } = await req.json().catch(() => ({ path: '/' }))
  const now = new Date().toISOString()

  // Upsert and increment count atomically using RPC via PostgREST
  // Fallback: get current and update
  const { data: existing, error: readError } = await supabase
    .from('page_views')
    .select('count')
    .eq('path', path)
    .maybeSingle()

  if (readError && readError.code !== 'PGRST116') {
    return new Response(JSON.stringify({ error: readError.message }), { status: 500 })
  }

  const nextCount = (existing?.count ?? 0) + 1

  const { error: upsertError } = await supabase
    .from('page_views')
    .upsert({ path, count: nextCount, updated_at: now })

  if (upsertError) {
    return new Response(JSON.stringify({ error: upsertError.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ count: nextCount }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
