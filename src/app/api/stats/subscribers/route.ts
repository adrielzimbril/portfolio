import { NextRequest } from 'next/server'
import { supabase } from "@/module/supabase/client";

// Supported:
// GET /api/stats/subscribers?scope=newsletter -> { count }
// GET /api/stats/subscribers?scope=productType&type=course|ebook|video -> { count }
// GET /api/stats/subscribers?scope=productTitle&title=My%20Product -> { count }
// GET /api/stats/subscribers?scope=summary -> { newsletter, byType: { course, ebook, video }, totalRequests }
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const scope = searchParams.get('scope') || 'newsletter'

  try {
    if (scope === 'newsletter') {
      const { count, error } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
      if (error) throw error
      return json({ count: count ?? 0 })
    }

    if (scope === 'productType') {
      const type = searchParams.get('type') || ''
      const { count, error } = await supabase
        .from('hub_product_requests')
        .select('*', { count: 'exact', head: true })
        .eq('product_type', type)
      if (error) throw error
      return json({ count: count ?? 0 })
    }

    if (scope === 'productTitle') {
      const title = searchParams.get('title') || ''
      const { count, error } = await supabase
        .from('hub_product_requests')
        .select('*', { count: 'exact', head: true })
        .eq('product_title', title)
      if (error) throw error
      return json({ count: count ?? 0 })
    }

    if (scope === "productUrl") {
      const url = searchParams.get("url") || "";
      const { count, error } = await supabase
        .from("hub_product_requests")
        .select("*", { count: "exact", head: true })
        .eq("product_url", url);
      if (error) throw error;
      return json({ count: count ?? 0 });
    }

    if (scope === 'summary') {
      const [{ count: newsletterCount, error: e1 }, cCourse, cEbook, cVideo, totalReq] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
        supabase.from('hub_product_requests').select('*', { count: 'exact', head: true }).eq('product_type', 'course'),
        supabase.from('hub_product_requests').select('*', { count: 'exact', head: true }).eq('product_type', 'ebook'),
        supabase.from('hub_product_requests').select('*', { count: 'exact', head: true }).eq('product_type', 'video'),
        supabase.from('hub_product_requests').select('*', { count: 'exact', head: true }),
      ])
      if (e1 || cCourse.error || cEbook.error || cVideo.error || totalReq.error) throw (e1 || cCourse.error || cEbook.error || cVideo.error || totalReq.error)

      return json({
        newsletter: newsletterCount ?? 0,
        byType: {
          course: cCourse.count ?? 0,
          ebook: cEbook.count ?? 0,
          video: cVideo.count ?? 0,
        },
        totalRequests: totalReq.count ?? 0,
      })
    }

    return json({ error: 'Invalid scope' }, 400)
  } catch (e: unknown) {
    return json({ error: (e as Error)?.message || 'Failed to fetch stats' }, 500)
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
